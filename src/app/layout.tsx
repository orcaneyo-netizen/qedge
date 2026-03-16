import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "QuantEdge | Quant Alpha. Zero PhD. Real Returns.",
  description: "A futuristic quantitative finance SaaS platform with live signals, AI co-pilot, and strategy backtesting.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="antialiased overflow-x-hidden selection:bg-lime selection:text-ink">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
