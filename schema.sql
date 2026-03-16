-- Users (synced from Clerk via webhook)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free','pro','firm','consult')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strategies
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  config JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backtest runs
CREATE TABLE backtest_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  strategy_id UUID REFERENCES strategies(id) ON DELETE SET NULL,
  symbol VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','running','completed','failed')),
  config JSONB NOT NULL DEFAULT '{}',
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Signals
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) NOT NULL,
  signal_type VARCHAR(50) NOT NULL,
  direction VARCHAR(10) CHECK (direction IN ('long','short','neutral')),
  confidence DECIMAL(5,2),
  price_at_signal DECIMAL(12,4),
  metadata JSONB DEFAULT '{}',
  fired_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  holdings JSONB DEFAULT '[]',
  cash_balance DECIMAL(15,2) DEFAULT 100000.00,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course progress
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id VARCHAR(100) NOT NULL,
  lesson_id VARCHAR(100) NOT NULL,
  score INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id, lesson_id)
);

-- Price data (TimescaleDB hypertable for free tier, or regular table)
CREATE TABLE price_data (
  id BIGSERIAL,
  symbol VARCHAR(20) NOT NULL,
  timeframe VARCHAR(10) NOT NULL DEFAULT '1d',
  ts TIMESTAMPTZ NOT NULL,
  open DECIMAL(12,4),
  high DECIMAL(12,4),
  low DECIMAL(12,4),
  close DECIMAL(12,4),
  volume BIGINT,
  PRIMARY KEY (symbol, timeframe, ts)
);
CREATE INDEX idx_price_data_symbol_ts ON price_data(symbol, ts DESC);

-- API Keys (for firm/consult tier)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  permissions JSONB DEFAULT '["read"]',
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
