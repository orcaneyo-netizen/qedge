import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-lime text-ink hover:bg-lime/90',
            card: 'bg-zinc-900 border border-zinc-800',
            headerTitle: 'text-white',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton: 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white',
            dividerText: 'text-zinc-500',
            formFieldLabel: 'text-zinc-400',
            formFieldInput: 'bg-zinc-800 border-zinc-700 text-white focus:border-lime',
            footerActionText: 'text-zinc-400',
            footerActionLink: 'text-lime hover:text-lime/90',
          }
        }}
      />
    </div>
  );
}
