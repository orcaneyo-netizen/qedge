from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import httpx
import os
from pydantic import BaseModel
from typing import Optional

security = HTTPBearer()

# Pydantic model for User data
class User(BaseModel):
    id: Optional[str] = None
    clerk_id: str
    email: str
    name: Optional[str] = None
    plan: str = "free"

_jwks_cache = None

async def get_jwks():
    """Retrieve and cache Clerk JWKS for JWT verification"""
    global _jwks_cache
    if _jwks_cache is not None:
        return _jwks_cache
    
    jwks_url = os.getenv("CLERK_JWKS_URL")
    if not jwks_url:
        raise HTTPException(status_code=500, detail="CLERK_JWKS_URL environment variable is not set")
        
    async with httpx.AsyncClient() as client:
        response = await client.get(jwks_url)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch Clerk JWKS")
        _jwks_cache = response.json()
        return _jwks_cache

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Verify Clerk JWT and return user details from database"""
    token = credentials.credentials
    try:
        jwks = await get_jwks()
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        
        # Find corresponding key in JWKS
        rsa_key = {}
        for key in jwks.get("keys", []):
            if key["kid"] == kid:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break
                
        if not rsa_key:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token header")
            
        # Verify and decode
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            # Optional: verify audience and issuer if configured
        )
        
        clerk_id = payload.get("sub")
        # Clerk JWTs may include claims: email, name, etc., depending on template configuration
        email = payload.get("email") or ""
        
        if not clerk_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims")
            
        # --- DATABASE LOOKUP ---
        # Connect to Postgres and fetch the user matching clerk_id
        # Example using `asyncpg`:
        # async with pool.acquire() as conn:
        #     user_data = await conn.fetchrow("SELECT clerk_id, email, name, plan FROM users WHERE clerk_id = $1", clerk_id)
        #     if not user_data:
        #         raise HTTPException(status_code=404, detail="User not found in DB")
        #     return User(clerk_id=user_data['clerk_id'], email=user_data['email'], plan=user_data['plan'])
        
        # Fallback/Mock for initial setup without DB setup:
        return User(
            clerk_id=clerk_id,
            email=email or "syncing@accounts.clerk",
            plan="pro" # Defaulting for demonstration purposes, change to 'free' in prod
        )
        
    except JWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"JWT Validation Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Auth error: {str(e)}")

def require_plan(minimum_plan: str):
    """Enforce minimum tier required to access endpoint"""
    plan_levels = {'free': 0, 'pro': 1, 'firm': 2, 'consult': 3}
    def decorator(current_user: User = Depends(get_current_user)):
        if plan_levels[current_user.plan] < plan_levels[minimum_plan]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail=f"Upgrade required. Minimum tier: {minimum_plan.capitalize()}"
            )
        return current_user
    return decorator
