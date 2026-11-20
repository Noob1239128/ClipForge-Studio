/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { ArrowDownRight, CheckCircle2, Download, KeyRound, X } from 'lucide-react';
import { BentoFeatures } from './components/BentoFeatures';
import { EditorMockup } from './components/EditorMockup';
import { FaqAndFooter } from './components/FaqAndFooter';
import { LicenseRequestSection } from './components/LicenseRequestSection';
import { Navbar } from './components/Navbar';
import { PricingAndDownload } from './components/PricingAndDownload';
import type { SiteConfig } from './types';

// ============================================================================
// ZENTRALE KONFIGURATION – Hier einfach deine eigenen Links & Daten eintragen:
// ============================================================================
export const SITE_CONFIG: SiteConfig = {
  appName: 'ClipForge Studio Pro',
  version: 'v1.0.0',
  fileSize: '148 MB',
  osRequirement: 'Windows 10/11 (64-Bit)',
  trialDays: 14,
  proPrice: '19,99 €',
  // Link zu deiner GitHub-Release .exe Datei (z. B. https://github.com/DEIN-NAME/clipforge/releases/latest/download/ClipForge-Setup.exe)
  downloadUrl: '#download-release',
  // Dein Discord-Benutzername (wird per Klick in die Zwischenablage kopiert)
  discordTag: 'clipforge.studio',
  // Optionaler Discord-Profil- oder Server-Einladungslink
  discordUrl: 'https://discord.com/users/clipforge',
  // Deine Kontakt-E-Mail für Activation-Code-Anfragen
  email: 'lizenz@clipforge-studio.de',
  // Dein Instagram / Social DM Direktlink
  instagramUrl: 'https://instagram.com/clipforgestudio',
  instagramHandle: '@clipforgestudio',
};

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleDownloadClick = useCallback(() => {
    const isExternalDownload =
      SITE_CONFIG.downloadUrl.startsWith('http://') ||
      SITE_CONFIG.downloadUrl.startsWith('https://');

    if (isExternalDownload) {
      const link = document.createElement('a');
      link.href = SITE_CONFIG.downloadUrl;
      link.download = `ClipForge_Studio_Pro_${SITE_CONFIG.version}_Setup.exe`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(
        `Download von ClipForge Studio Pro (${SITE_CONFIG.version}) gestartet – viel Spaß mit deinem 14-Tage-Trial!`
      );
      return;
    }

    const target = document.getElementById('download-release');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast(
      `Release-Platzhalter aktiv: Hinterlege deinen .exe-Downloadlink einfach oben in SITE_CONFIG.downloadUrl.`
    );
  }, [showToast]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Sticky Top Navbar */}
      <Navbar onDownloadClick={handleDownloadClick} />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
          {/* Refined Radial Ambient Lighting (Purple & Cyan accents) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),rgba(6,182,212,0.08)_45%,transparent_72%)] blur-2xl"
          />

          <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
            {/* Hero Typography & CTAs */}
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium text-cyan-400">
                KI-Video-Editor & Auto-Meme-Generator für Streamer und Content Creator
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.25rem,4.3vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                Verwandle lange Streams in{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  virale Clips
                </span>{' '}
                – in Sekunden mit KI.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Auto-Cuts, dynamische Untertitel, Soundeffekte und Meme-Overlays.{' '}
                {SITE_CONFIG.trialDays} Tage komplett kostenlos testen.
              </p>

              {/* Primary + Secondary CTA Row */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <a
                  href={SITE_CONFIG.downloadUrl}
                  onClick={(e) => {
                    if (SITE_CONFIG.downloadUrl === '#download-release') {
                      e.preventDefault();
                      handleDownloadClick();
                    }
                  }}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_-6px_rgba(139,92,246,0.7)] transition-all duration-150 hover:brightness-110 active:scale-[0.98] sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Download für Windows (.exe)</span>
                </a>

                <a
                  href="#lizenz-anfragen"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-md transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.08] sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <KeyRound className="h-4 w-4 shrink-0 text-violet-400" aria-hidden="true" />
                  <span>Activation Code anfragen</span>
                  <ArrowDownRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                </a>
              </div>

              {/* Clean Unboxed Release Metadata */}
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-xs text-zinc-500">
                <span>{SITE_CONFIG.version}</span>
                <span aria-hidden="true">•</span>
                <span>{SITE_CONFIG.osRequirement}</span>
                <span aria-hidden="true">•</span>
                <span className="text-zinc-400">Free {SITE_CONFIG.trialDays}-Day Trial</span>
              </p>
            </div>

            {/* Interactive 3-Column Desktop Editor UI Mockup */}
            <EditorMockup onExportToast={showToast} />
          </div>
        </section>

        {/* BENTO FEATURE GRID */}
        <BentoFeatures />

        {/* DOWNLOAD RELEASE & PRICING / 14-DAY TRIAL */}
        <PricingAndDownload
          config={SITE_CONFIG}
          onDownloadTrigger={handleDownloadClick}
        />

        {/* ACTIVATION CODE REQUEST SECTION (DIRECT CONTACT WITHOUT BACKEND) */}
        <LicenseRequestSection config={SITE_CONFIG} onNotify={showToast} />

        {/* FAQ & FOOTER */}
        <FaqAndFooter config={SITE_CONFIG} />
      </main>

      {/* Non-intrusive Confirmation Toast Popup */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex max-w-md items-start gap-3 rounded-xl border border-cyan-400/35 bg-[#111116]/95 px-4 py-3.5 text-sm text-zinc-100 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
          <p className="leading-snug text-zinc-200">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Hinweis schließen"
            className="ml-1 rounded p-0.5 text-zinc-500 transition-colors hover:text-zinc-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
