"use client";

import Link from "next/link";
import ModeSwitcher from "./ModeSwitcher";

type UIMode = "simple" | "visual" | "pro";

interface HeaderProps {
  onModeChange?: (mode: UIMode) => void;
}

export default function Header({ onModeChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white font-bold text-xl">
              A
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              ApnaBazaar
            </h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/sellers" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Sell
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <ModeSwitcher onModeChange={onModeChange} />
          <Link
            href="/help"
            className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </Link>
        </div>
      </div>
    </header>
  );
}
