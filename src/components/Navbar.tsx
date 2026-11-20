import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onDownloadClick: () => void;
}

export function BrandLogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="7"
        fill="#111115"
        stroke="url(#cf-border)"
        strokeWidth="1.5"
      />
      <path
        d="M9.5 8.5L19.5 14L9.5 19.5V8.5Z"
        fill="url(#cf-accent)"
      />
      <path
        d="M19.5 7.5V20.5"
        stroke="#22d3ee"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="cf-border" x1="1" y1="1" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" stopOpacity="0.85" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="cf-accent" x1="9.5" y1="8.5" x2="19.5" y2="19.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download-release' },
  { label: 'Preise / Trial', href: '#preise' },
  { label: 'Lizenz anfragen', href: '#lizenz-anfragen' },
];

export function Navbar({ onDownloadClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-md"
        >
          <BrandLogoMark />
          <span className="font-display text-[17px] tracking-tight">ClipForge Studio Pro</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Hauptnavigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-cyan-400 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDownloadClick}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.65)] transition-all duration-150 hover:brightness-110 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Kostenlos Downloaden</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-200 transition-colors hover:bg-white/[0.08] md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#09090b]/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadClick();
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Kostenlos Downloaden</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
