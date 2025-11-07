"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search products...",
  className = ""
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const searchValue = searchParams.get("search") || "";
    setQuery(searchValue);
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!mounted) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!mounted) return;
      
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      } else {
        params.delete("search");
      }

      const newUrl = params.toString() 
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      
      router.push(newUrl);
      
      if (onSearch) {
        onSearch(searchQuery.trim());
      }
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleClear = () => {
    if (!mounted) return;
    
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

