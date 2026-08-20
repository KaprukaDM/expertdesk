import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Inter is Kapruka's mandated brand typeface — used for both headings and body per brand
// guidelines, rather than mixing in a separate display face.
const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expert Desk",
  description: "The 3 things costing you sales — fixed, not just found.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
