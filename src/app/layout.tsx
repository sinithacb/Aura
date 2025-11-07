import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white text-zinc-900`}>
        <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
            <a href="/" className="select-none">
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">Aura</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="/collection" className="group relative text-zinc-700 hover:text-zinc-900 transition-colors">
                <span>Collection</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="/inspiration" className="group relative text-zinc-700 hover:text-zinc-900 transition-colors">
                <span>Inspiration</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="/contact" className="group relative text-zinc-700 hover:text-zinc-900 transition-colors">
                <span>Contact</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-28 border-t border-zinc-200 bg-zinc-50/70">
          <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 sm:grid-cols-3 text-sm">
            <div>
              <div className="font-serif text-xl font-semibold text-zinc-900">Aura</div>
              <p className="mt-3 text-zinc-600 leading-relaxed">Premium quartz surfaces engineered for modern living.</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Explore</div>
              <ul className="mt-4 space-y-2 text-zinc-600">
                <li><a href="/collection" className="hover:text-zinc-900 transition-colors">Collection</a></li>
                <li><a href="/inspiration" className="hover:text-zinc-900 transition-colors">Inspiration</a></li>
                <li><a href="/contact" className="hover:text-zinc-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Follow</div>
              <div className="mt-4 flex gap-4 text-zinc-600">
                <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">X</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">Pinterest</a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200/80">
            <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-zinc-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Aura Surfaces. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-zinc-700">Privacy</a>
                <a href="#" className="hover:text-zinc-700">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
