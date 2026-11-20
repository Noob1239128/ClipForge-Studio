import { ArrowRight, Check, Download, KeyRound, ShieldCheck } from 'lucide-react';
import type { SiteConfig } from '../types';

interface PricingAndDownloadProps {
  config: SiteConfig;
  onDownloadTrigger: () => void;
}

const TRIAL_FEATURES = [
  'Sofortiger Windows-Installer (.exe) Download',
  '14 Tage voller Zugriff auf alle Pro-Funktionen',
  'Alle KI-Cuts, Untertitel, Soundboard & Meme-Overlays',
  'Kein Abo, kein Account-Zwang, keine Kreditkarte nötig',
  '100 % lokale Verarbeitung auf deiner GPU/CPU',
];

const LIFETIME_FEATURES = [
  'Einmalzahlung – dauerhaft nutzen ohne monatliches Abo',
  'Unbegrenzte Exporte in 1080p & 4K (9:16 & 16:9)',
  'Alle zukünftigen Updates & neuen Meme-Packs inklusive',
  'Persönlicher Activation Code (CLIP-XXXX-XXXX-XXXX)',
  'Direkter Creator-Support über Discord & E-Mail',
];

export function PricingAndDownload({ config, onDownloadTrigger }: PricingAndDownloadProps) {
  return (
    <section id="preise" className="scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-28">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        {/* Release Anchor Strip (#download-release) */}
        <div
          id="download-release"
          className="scroll-mt-24 mb-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.09] bg-zinc-900/45 p-6 backdrop-blur-md lg:flex-row lg:items-center lg:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-cyan-400">
              <span>Aktuelles Windows-Release</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{config.version}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">{config.fileSize}</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Direkt installieren und 14 Tage kostenlos testen
            </h2>
            <p className="mt-1.5 text-sm text-zinc-400">
              Kompatibel mit {config.osRequirement}. Kein Account nötig – nach der Installation
              startet deine {config.trialDays}-Tage-Testphase automatisch.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end shrink-0">
            <button
              type="button"
              onClick={onDownloadTrigger}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgba(139,92,246,0.6)] transition-all duration-150 hover:brightness-110 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>ClipForge_Setup_{config.version}.exe</span>
            </button>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/80" aria-hidden="true" />
              <span>Lokale Desktop-App · Keine Cloud-Pflicht</span>
            </span>
          </div>
        </div>

        {/* Pricing Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-violet-400">Preise & 14-Tage-Trial</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Fairer Einmalpreis statt teurer Abo-Falle.
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Teste jede Funktion 14 Tage lang völlig kostenlos. Wenn dir ClipForge Studio Pro
            gefällt, schaltest du deine Lifetime-Lizenz einfach per persönlichem Activation Code
            frei.
          </p>
        </div>

        {/* 2 Side-by-Side Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
          {/* Card 1: Free Trial (0 €) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-7 backdrop-blur-md">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">Free Trial</h3>
                <span className="font-mono text-xs text-zinc-400">14 Tage Vollzugriff</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-white tabular-nums">
                  0 €
                </span>
                <span className="text-sm text-zinc-400">für {config.trialDays} Tage</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                Perfekt zum Ausprobieren mit deinen eigenen Twitch-VODs oder YouTube-Aufnahmen –
                ohne Zahlungsdaten.
              </p>

              <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-6">
                {TRIAL_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={onDownloadTrigger}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/[0.12] active:scale-[0.99] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Jetzt .exe herunterladen</span>
            </button>
          </div>

          {/* Card 2: Pro Lifetime Lizenz */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-violet-500/45 bg-gradient-to-b from-violet-950/30 via-zinc-900/60 to-zinc-900/50 p-7 shadow-[0_0_50px_-20px_rgba(139,92,246,0.4)] backdrop-blur-md">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">
                  Pro Lifetime Lizenz
                </h3>
                <span className="font-mono text-xs text-cyan-300">Einmalzahlung</span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-white tabular-nums">
                  {config.proPrice}
                </span>
                <span className="text-sm text-zinc-400">einmalig · kein Abo</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                Einmal freischalten, für immer behalten. Inklusive aller kommenden Updates und
                deinem persönlichen Lizenzschlüssel.
              </p>

              {/* Activation Key Format Hint */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#09090b]/80 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-xs text-zinc-400">
                  <KeyRound className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                  <span>Lizenz-Format</span>
                </span>
                <code className="font-mono text-xs font-medium tracking-wider text-cyan-300">
                  CLIP-XXXX-XXXX-XXXX
                </code>
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6">
                {LIFETIME_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#lizenz-anfragen"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.65)] transition-all duration-150 hover:brightness-110 active:scale-[0.99] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Code anfragen & kaufen</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
