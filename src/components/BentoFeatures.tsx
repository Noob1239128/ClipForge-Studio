import { useState } from 'react';
import {
  Clock,
  FileVideo,
  LayoutTemplate,
  Monitor,
  Scissors,
  Volume2,
} from 'lucide-react';

import ULTRAWIDE_IMAGE from '../assets/images/bento_ultrawide_desk_1795153139458.jpg';

const DEMO_SOUNDS = [
  { id: 'boom', label: 'Vine Boom', shortcut: 'F1', accent: 'violet' },
  { id: 'zoom', label: 'Zoom Punch', shortcut: 'F2', accent: 'cyan' },
  { id: 'whoosh', label: 'Whoosh Cut', shortcut: 'F3', accent: 'violet' },
  { id: 'meme', label: 'Meme Pop', shortcut: 'F4', accent: 'cyan' },
];

const DEMO_WORDS = [
  { id: 'b1', text: 'Leute,' },
  { id: 'b2', text: 'ähm', defaultCut: true },
  { id: 'b3', text: 'dieser' },
  { id: 'b4', text: 'Shot' },
  { id: 'b5', text: 'war', },
  { id: 'b6', text: 'halt irgendwie', defaultCut: true },
  { id: 'b7', text: 'komplett' },
  { id: 'b8', text: 'unreal!' },
];

export function BentoFeatures() {
  const [targetSec, setTargetSec] = useState(45);
  const [activePad, setActivePad] = useState<string>('boom');
  const [formatDemo, setFormatDemo] = useState<'9:16' | '16:9'>('9:16');
  const [deletedWords, setDeletedWords] = useState<Record<string, boolean>>({
    b2: true,
    b6: true,
  });
  const [deskImgError, setDeskImgError] = useState(false);

  const toggleDemoWord = (id: string) => {
    setDeletedWords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="features" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-cyan-400">
            Entwickelt für maximale Watchtime
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Alles, was du für virale Clips brauchst – direkt auf deinem PC.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Keine langsame Browser-Cloud, keine Wasserzeichen im Workflow. ClipForge Studio Pro
            kombiniert präzise KI-Automatisierung mit dem Tempo einer nativen Desktop-Timeline.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Card 1: Short- & Long-Form Modi (7 cols) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.15] md:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                  <LayoutTemplate className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Short- & Long-Form Modi
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  Wechsle mit einem Klick zwischen 9:16 Split-Screen mit automatischem
                  Facecam-Tracking für TikTok, Reels & Shorts oder klassischem 16:9 für YouTube.
                </p>
              </div>

              <div className="inline-flex rounded-lg border border-white/[0.08] bg-zinc-950 p-0.5">
                <button
                  type="button"
                  onClick={() => setFormatDemo('9:16')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    formatDemo === '9:16'
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  9:16 Split
                </button>
                <button
                  type="button"
                  onClick={() => setFormatDemo('16:9')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    formatDemo === '16:9'
                      ? 'bg-cyan-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  16:9 YouTube
                </button>
              </div>
            </div>

            {/* Visual Framing Preview */}
            <div className="mt-6 flex items-center justify-center gap-6 rounded-xl border border-white/[0.06] bg-zinc-950/80 p-5">
              {formatDemo === '9:16' ? (
                <div className="flex items-center gap-6">
                  <div className="flex h-32 w-20 flex-col overflow-hidden rounded-lg border border-violet-400/50 bg-zinc-900">
                    <div className="flex h-[44%] items-center justify-center border-b border-white/15 bg-violet-500/15 font-mono text-[10px] text-violet-200">
                      Facecam
                    </div>
                    <div className="flex h-[56%] items-center justify-center bg-cyan-500/15 font-mono text-[10px] text-cyan-200">
                      Gameplay
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <p className="font-medium text-zinc-100">9:16 Split-Screen Aktiv</p>
                    <p>TikTok · YouTube Shorts · Instagram Reels</p>
                    <p className="font-mono text-[11px] text-cyan-400">
                      1080×1920 · Auto-Reframe aktiv
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="relative flex h-24 w-40 items-center justify-center rounded-lg border border-cyan-400/50 bg-cyan-500/10 font-mono text-[11px] text-cyan-200">
                    16:9 Gameplay
                    <span className="absolute right-2 top-2 rounded border border-violet-400/50 bg-violet-500/25 px-1.5 py-0.5 text-[9px] text-violet-100">
                      Cam
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <p className="font-medium text-zinc-100">16:9 Long-Form Aktiv</p>
                    <p>YouTube Highlights · Stream-Zusammenschnitte</p>
                    <p className="font-mono text-[11px] text-violet-300">
                      1920×1080 / 4K · 60fps nativ
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Exakte Ziel-Dauer (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.15] md:col-span-5">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Exakte Ziel-Dauer
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Du brauchst exakt 58 Sekunden für Shorts oder 30 Sekunden für Reels? Die KI
                verdichtet Pausen und schneidet deinen Clip auf die Sekunde genau.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-zinc-950/80 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-400">Gewünschte Clip-Länge</span>
                <span className="font-mono text-2xl font-semibold tabular-nums text-cyan-300">
                  {targetSec}.0s
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={90}
                step={5}
                value={targetSec}
                onChange={(e) => setTargetSec(Number(e.target.value))}
                aria-label="Ziel-Dauer in Sekunden testen"
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-cyan-400"
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-zinc-500">
                <span>15s Hook</span>
                <span>45s Viral</span>
                <span>90s Story</span>
              </div>
            </div>
          </div>

          {/* Card 3: Auto-Soundboard & Memes (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.15] md:col-span-5">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Auto-Soundboard & Memes
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Vine Boom, dynamische Zoom-Effekte und passende Meme-Overlays werden automatisch an
                Lacher, Fails und Punchlines gesetzt.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {DEMO_SOUNDS.map((pad) => {
                const isSelected = activePad === pad.id;
                return (
                  <button
                    key={pad.id}
                    type="button"
                    onClick={() => setActivePad(pad.id)}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? pad.accent === 'violet'
                          ? 'border-violet-400/60 bg-violet-500/15 text-white'
                          : 'border-cyan-400/60 bg-cyan-500/15 text-white'
                        : 'border-white/[0.07] bg-zinc-950/80 text-zinc-400 hover:border-white/15 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-medium">{pad.label}</span>
                    <span className="font-mono text-[10px] text-zinc-500">{pad.shortcut}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 4: Text-Based Editing (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.15] md:col-span-7">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <Scissors className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Text-Based Editing
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
                Bearbeite dein Video so einfach wie ein Textdokument: Füllwörter, Versprecher oder
                ganze Sätze im Transkript löschen – und die Timeline schneidet sie sofort sauber
                heraus.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-zinc-950/80 p-4">
              <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Interaktive Demo · Wörter zum Schneiden anklicken</span>
                <span className="tabular-nums text-cyan-400">
                  {Object.values(deletedWords).filter(Boolean).length} Schnitte aktiv
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEMO_WORDS.map((word) => {
                  const isCut = !!deletedWords[word.id];
                  return (
                    <button
                      key={word.id}
                      type="button"
                      onClick={() => toggleDemoWord(word.id)}
                      className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors cursor-pointer ${
                        isCut
                          ? 'bg-rose-500/15 text-rose-300/70 line-through'
                          : 'bg-white/[0.05] text-zinc-100 hover:bg-violet-500/20'
                      }`}
                    >
                      {word.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 5: Alle Formate lokal (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.15] md:col-span-5">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                <FileVideo className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Alle Formate – 100 % lokal
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Ziehe stundenlange OBS-Aufnahmen direkt per Drag & Drop hinein. Alles wird lokal auf
                deiner Hardware verarbeitet – ohne Gigabyte-Uploads.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { ext: 'MP4', note: 'H.264 / H.265' },
                { ext: 'MKV', note: 'OBS Multi-Track' },
                { ext: 'MOV', note: 'ProRes & Alpha' },
                { ext: 'WebM', note: 'VP9 / AV1' },
              ].map((fmt) => (
                <div
                  key={fmt.ext}
                  className="rounded-xl border border-white/[0.06] bg-zinc-950/80 px-3.5 py-2.5"
                >
                  <div className="font-mono text-sm font-semibold text-white">{fmt.ext}</div>
                  <div className="text-[11px] text-zinc-500">{fmt.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: 21:9 Ultrawide Cockpit (7 cols) */}
          <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 transition-colors duration-200 hover:border-white/[0.15] md:col-span-7">
            {!deskImgError ? (
              <img
                src={ULTRAWIDE_IMAGE}
                alt="21:9 Ultrawide Video-Editing Workstation mit ClipForge Studio Pro Timeline"
                referrerPolicy="no-referrer"
                onError={() => setDeskImgError(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-zinc-950 to-cyan-950/40" />
            )}

            {/* Measured contrast scrim for WCAG AA legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent"
            />

            <div className="relative z-10 max-w-lg">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-[#09090b]/80 text-cyan-300 backdrop-blur-md">
                <Monitor className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                21:9 Ultrawide Cockpit
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                Entwickelt für breite Monitore und flüssige 60fps-Vorschauen. Eine GPU-beschleunigte
                Profi-Timeline ohne Ruckeln – selbst bei mehrstündigen 1440p-VODs.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
                <span>NVIDIA NVENC & AMD VCN</span>
                <span aria-hidden="true">·</span>
                <span>Native 21:9 Skalierung</span>
                <span aria-hidden="true">·</span>
                <span>Zero-Lag Scrubbing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
