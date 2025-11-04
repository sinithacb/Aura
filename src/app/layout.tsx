import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Surfaces",
  description: "Premium quartz surfaces reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}>
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-200/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <a href="/" className="text-2xl font-semibold tracking-tight">Aura</a>
            <nav className="flex items-center gap-6 text-sm">
              <a href="/collection" className="text-zinc-700 hover:text-black hover:underline underline-offset-4">Collection</a>
              <a href="/inspiration" className="text-zinc-700 hover:text-black hover:underline underline-offset-4">Inspiration</a>
              <a href="/contact" className="text-zinc-700 hover:text-black hover:underline underline-offset-4">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-24 border-t border-zinc-200 bg-zinc-50/60">
          <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-3 text-sm">
            <div>
              <div className="text-lg font-medium text-zinc-900">Aura</div>
              <p className="mt-2 text-zinc-600">Premium quartz surfaces engineered for modern living.</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Explore</div>
              <ul className="mt-3 space-y-2 text-zinc-600">
                <li><a href="/collection" className="hover:text-zinc-900">Collection</a></li>
                <li><a href="/inspiration" className="hover:text-zinc-900">Inspiration</a></li>
                <li><a href="/contact" className="hover:text-zinc-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Follow</div>
              <div className="mt-3 flex gap-4 text-zinc-600">
                <a href="#" className="hover:text-zinc-900">Instagram</a>
                <a href="#" className="hover:text-zinc-900">X</a>
                <a href="#" className="hover:text-zinc-900">Pinterest</a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200">
            <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-zinc-500 flex items-center justify-between">
              <p>© {new Date().getFullYear()} Aura Surfaces. All rights reserved.</p>
              <p>Crafted with Next.js</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
