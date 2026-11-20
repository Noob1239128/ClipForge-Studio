import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BrandLogoMark } from './Navbar';
import type { SiteConfig } from '../types';

interface FaqAndFooterProps {
  config: SiteConfig;
}

const FAQ_ITEMS = [
  {
    question: 'Wie aktiviere ich meinen Code in der App?',
    answer:
      'Öffne ClipForge Studio Pro, klicke oben rechts auf „Lizenz aktivieren“ (oder Einstellungen → Lizenz) und füge deinen persönlichen Schlüssel im Format CLIP-XXXX-XXXX-XXXX ein. Deine Lifetime-Vollversion wird sofort ohne Neustart freigeschaltet.',
  },
  {
    question: 'Welche Windows-Version wird benötigt?',
    answer:
      'ClipForge Studio Pro läuft nativ auf Windows 10 und Windows 11 (64-Bit). Empfohlen werden mindestens 8 GB RAM sowie eine moderne Grafikkarte (NVIDIA, AMD oder Intel) für hardwarebeschleunigtes Rendern und flüssiges Timeline-Scrubbing.',
  },
  {
    question: 'Wie funktioniert der 14-Tage-Trial?',
    answer:
      'Lade einfach die Windows-.exe herunter und starte die App. Deine 14-tägige Testphase beginnt automatisch beim ersten Start – komplett ohne Account, ohne Kreditkarte und ohne automatische Verlängerung. Nach Ablauf kannst du jederzeit per Activation Code auf Pro Lifetime wechseln.',
  },
  {
    question: 'Werden meine Videos in eine Cloud hochgeladen?',
    answer:
      'Nein. ClipForge Studio Pro verarbeitet deine MP4-, MKV-, MOV- und WebM-Dateien zu 100 % lokal auf deinem eigenen Rechner. Dadurch sparst du dir stundenlange Uploads riesiger OBS-VODs und behältst die volle Kontrolle über dein Rohmaterial.',
  },
];

export function FaqAndFooter({ config }: FaqAndFooterProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-violet-400">Häufige Fragen</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kurz & klar beantwortet
            </h2>
          </div>

          <div className="mt-10 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-zinc-900/35 backdrop-blur-md">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
                  >
                    <span className="font-display text-base font-semibold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="border-t border-white/[0.08] bg-[#070709] py-12">
        <div className="mx-auto flex max-w-[1260px] flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-white"
            >
              <BrandLogoMark />
              <span className="font-display text-base">{config.appName}</span>
            </a>
            <p className="mt-2 text-xs text-zinc-500">
              KI-Video-Editor & Auto-Meme-Generator für Windows · {config.version}
            </p>
          </div>

          <nav
            aria-label="Footer-Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400"
          >
            <a href="#features" className="transition-colors hover:text-white">
              Features
            </a>
            <a href="#download-release" className="transition-colors hover:text-white">
              Download
            </a>
            <a href="#preise" className="transition-colors hover:text-white">
              Preise / Trial
            </a>
            <a href="#lizenz-anfragen" className="transition-colors hover:text-white">
              Lizenz anfragen
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              FAQ
            </a>
          </nav>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1260px] flex-col items-start justify-between gap-2 border-t border-white/[0.06] px-5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:px-8">
          <span>© {new Date().getFullYear()} {config.appName}. Alle Rechte vorbehalten.</span>
          <span>Statische Produktseite · Lokal für Windows 10/11 (64-Bit)</span>
        </div>
      </footer>
    </>
  );
}
