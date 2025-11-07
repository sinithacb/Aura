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
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900 flex flex-col min-h-full`}>
        <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4 sm:py-5">
            <a href="/" className="text-2xl sm:text-3xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity duration-200">
              Aura
            </a>
            <nav className="flex items-center gap-8 sm:gap-10 text-sm sm:text-base">
              <a 
                href="/collection" 
                className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
              >
                Collection
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/inspiration" 
                className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
              >
                Inspiration
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/contact" 
                className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="mt-24 border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 grid gap-12 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="text-xl font-bold tracking-tight text-zinc-900">Aura</div>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">Premium quartz surfaces engineered for modern living.</p>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Explore</div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/collection" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                    Collection
                  </a>
                </li>
                <li>
                  <a href="/inspiration" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                    Inspiration
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Follow</div>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                  Instagram
                </a>
                <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                  X
                </a>
                <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200">
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
