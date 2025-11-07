"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isCollectionPage = pathname === "/collection" || pathname?.startsWith("/collection");
    setShowSearch(isCollectionPage);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4 sm:py-5 gap-4">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity duration-200">
          Aura
        </Link>
        
        <div className={`flex-1 max-w-md mx-4 hidden md:block ${mounted && showSearch ? "" : "hidden"}`}>
          {mounted && <SearchBar placeholder="Search products..." />}
        </div>

        <nav className="flex items-center gap-6 sm:gap-8 lg:gap-10 text-sm sm:text-base">
          <Link 
            href="/collection" 
            className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
          >
            Collection
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/inspiration" 
            className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
          >
            Inspiration
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/contact" 
            className="relative text-zinc-300 hover:text-white transition-all duration-300 group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
      
      <div className={`md:hidden px-6 sm:px-8 pb-4 ${mounted && showSearch ? "" : "hidden"}`}>
        {mounted && <SearchBar placeholder="Search products..." />}
      </div>
    </header>
  );
}

