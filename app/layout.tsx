import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter,Outfit } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; 

const inter = Outfit({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "SocialSync",
  description: "SocialSync is a platform for creating and managing your social media content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <head>
         
        </head>
        <body
          className={inter.className}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
