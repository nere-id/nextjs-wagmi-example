import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from './providers'
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJs + Wagmi + Blast Mobile Auto Connect Example",
  description: "An example demonstrating Blast Mobile autoconnect functionality in a NextJS project using viem and wagmi v2.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>        
        <Script 
          src={
            process.env.NEXT_ENV === 'prod'
              ? "https://assets.blast.io/lib/pwa-sdk-1.0.1.umd.min.js"
              : "https://assets.blast.io/lib/pwa-debug-sdk-1.0.0.umd.min.js"
          }
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
