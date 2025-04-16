import type { Metadata } from "next";
import { Recursive } from "next/font/google";

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "./_components/ui/toaster";

import "./globals.css";
import Providers from "./_components/Providers";

const recursive = Recursive({ subsets: ["latin"] });

const title = "CaseCobra - custom high-quality phone cases";
const description = "Create custom high-quality phone cases in seconds";
const imageUrl = "/icon.ico";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: imageUrl }],
  },
  icons: imageUrl,
  metadataBase: new URL("https://casecobra-e-commerce-shop.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />

        <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex flex-col flex-1 h-full">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
