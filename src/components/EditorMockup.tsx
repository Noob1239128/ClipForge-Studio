import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  Film,
  Flame,
  Maximize2,
  Pause,
  Play,
  Scissors,
  Sliders,
  Sparkles,
  Subtitles,
  Volume2,
  Zap,
} from 'lucide-react';

import GAMEPLAY_IMAGE from '../assets/images/editor_gameplay_scene_1795153138920.jpg';
import FACECAM_IMAGE from '../assets/images/editor_streamer_facecam_1795153138915.jpg';

interface HighlightClip {
  id: string;
  title: string;
  timestamp: string;
  baseDuration: number;
  viralityScore: number;
  hookScore: number;
  pacingScore: number;
  retentionScore: number;
  memeLabel: string;
  captions: { at: number; text: string; highlight?: string }[];
  transcript: { id: string; text: string; isFiller?: boolean; savedSec?: number }[];
  sfxMarkers: { pos: number; label: string; type: 'boom' | 'zoom' | 'meme' }[];
}

const CLIPS: HighlightClip[] = [
  {
    id: 'clutch-1v4',
    title: '1v4 Arena Clutch + Chat dreht durch',
    timestamp: '01:42:18',
    baseDuration: 34.0,
    viralityScore: 96,
    hookScore: 98,
    pacingScore: 94,
    retentionScore: 95,
    memeLabel: 'VINE BOOM + 1.25× ZOOM',
    captions: [
      { at: 0, text: 'WAIT – ER SIEHT MICH', highlight: 'NICHT?!' },
      { at: 28, text: 'EINS... ZWEI... NO WAY', highlight: 'BRO!' },
      { at: 56, text: 'DAS WAR DER KRANKSTE', highlight: 'FLICK!' },
      { at: 80, text: 'CHAT CLIPT DAS SOFORT!', highlight: 'CLIPT DAS' },
    ],
    transcript: [
      { id: 'w1', text: 'Okay warte mal,' },
      { id: 'w2', text: 'ähm', isFiller: true, savedSec: 1.4 },
      { id: 'w3', text: 'er sieht mich einfach nicht!' },
      { id: 'w4', text: 'also quasi', isFiller: true, savedSec: 1.8 },
      { id: 'w5', text: 'Eins, zwei — NO WAY BRO!' },
      { id: 'w6', text: 'warte kurz', isFiller: true, savedSec: 1.3 },
      { id: 'w7', text: 'Das war der krankste Flick heute!' },
    ],
    sfxMarkers: [
      { pos: 24, label: 'Vine Boom', type: 'boom' },
      { pos: 52, label: 'Zoom 1.25×', type: 'zoom' },
      { pos: 76, label: 'Meme Pop', type: 'meme' },
    ],
  },
  {
    id: 'rage-fail',
    title: 'Unerwarteter Fail beim Endboss',
    timestamp: '02:19:04',
    baseDuration: 45.0,
    viralityScore: 91,
    hookScore: 93,
    pacingScore: 90,
    retentionScore: 89,
    memeLabel: 'RECORD SCRATCH + FREEZE',
    captions: [
      { at: 0, text: 'TRUST ME, ICH HAB', highlight: 'DAS SAFE.' },
      { at: 32, text: 'EIN HP... NUR NOCH', highlight: 'EIN HIT!' },
      { at: 62, text: 'WARUM SPRINGT ER DA', highlight: 'RUNTER?!' },
      { at: 84, text: 'ICH DEINSTALLIERE', highlight: 'HEUTE NOCH.' },
    ],
    transcript: [
      { id: 'r1', text: 'Trust me, ich hab das komplett safe.' },
      { id: 'r2', text: 'äh', isFiller: true, savedSec: 1.1 },
      { id: 'r3', text: 'Ein HP, nur noch ein Hit!' },
      { id: 'r4', text: 'halt irgendwie', isFiller: true, savedSec: 1.6 },
      { id: 'r5', text: 'Warum springt er da einfach runter?!' },
    ],
    sfxMarkers: [
      { pos: 30, label: 'Zoom 1.25×', type: 'zoom' },
      { pos: 60, label: 'Vine Boom', type: 'boom' },
      { pos: 82, label: 'Sad Violin', type: 'meme' },
    ],
  },
  {
    id: 'hot-take',
    title: 'Hot Take zum neuen Season-Patch',
    timestamp: '00:54:41',
    baseDuration: 58.0,
    viralityScore: 87,
    hookScore: 89,
    pacingScore: 86,
    retentionScore: 86,
    memeLabel: 'WHOOSH + B-ROLL CUT',
    captions: [
      { at: 0, text: 'NIEMAND REDET ÜBER', highlight: 'DIESEN NERF.' },
      { at: 35, text: 'DIE META IST AB HEUTE', highlight: 'TOT.' },
      { at: 68, text: 'SCHREIB DEINE MEINUNG', highlight: 'IN DIE KOMMIS.' },
    ],
    transcript: [
      { id: 'h1', text: 'Niemand redet über diesen Nerf.' },
      { id: 'h2', text: 'sozusagen', isFiller: true, savedSec: 1.5 },
      { id: 'h3', text: 'Die komplette Meta ist ab heute tot.' },
      { id: 'h4', text: 'ähm ja', isFiller: true, savedSec: 1.2 },
      { id: 'h5', text: 'Schreib deine Meinung in die Kommis.' },
    ],
    sfxMarkers: [
      { pos: 20, label: 'Whoosh Cut', type: 'zoom' },
      { pos: 55, label: 'Vine Boom', type: 'boom' },
    ],
  },
];

const WAVEFORM_BARS = [
  24, 42, 65, 38, 88, 95, 52, 34, 70, 82, 48, 92, 100, 62, 40, 58, 76, 89, 44, 30,
  68, 94, 78, 50, 35, 84, 96, 60, 45, 72, 90, 55, 38, 66, 80, 92, 49, 32, 74, 86,
  58, 40, 62, 95, 81, 46, 28, 64,
];

interface EditorMockupProps {
  onExportToast: (message: string) => void;
}

export function EditorMockup({ onExportToast }: EditorMockupProps) {
  const [selectedClipId, setSelectedClipId] = useState<string>(CLIPS[0].id);
  const [aspectMode, setAspectMode] = useState<'9:16' | '16:9'>('9:16');
  const [targetDuration, setTargetDuration] = useState<30 | 45 | 60>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playhead, setPlayhead] = useState<number>(34); // 0..100
  const [cutWords, setCutWords] = useState<Record<string, boolean>>({ w2: true });
  const [effects, setEffects] = useState({
    vineBoom: true,
    autoZoom: true,
    memeOverlay: true,
    captions: true,
  });
  const [gameplayImgError, setGameplayImgError] = useState(false);
  const [facecamImgError, setFacecamImgError] = useState(false);

  const activeClip = useMemo(
    () => CLIPS.find((c) => c.id === selectedClipId) ?? CLIPS[0],
    [selectedClipId]
  );

  // Playback loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setPlayhead((prev) => (prev >= 100 ? 0 : +(prev + 0.65).toFixed(2)));
    }, 80);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const savedSeconds = useMemo(() => {
    return activeClip.transcript.reduce((sum, w) => {
      if (cutWords[w.id]) {
        return sum + (w.savedSec ?? 1.2);
      }
      return sum;
    }, 0);
  }, [activeClip, cutWords]);

  const effectiveDuration = Math.max(12, +(Math.min(targetDuration, activeClip.baseDuration) - savedSeconds).toFixed(1));

  const currentSeconds = (playhead / 100) * effectiveDuration;
  const formattedTimecode = useMemo(() => {
    const mins = Math.floor(currentSeconds / 60);
    const secs = Math.floor(currentSeconds % 60);
    const frames = Math.floor((currentSeconds % 1) * 60);
    return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  }, [currentSeconds]);

  const activeCaption = useMemo(() => {
    let current = activeClip.captions[0];
    for (const cap of activeClip.captions) {
      if (playhead >= cap.at) {
        current = cap;
      }
    }
    return current;
  }, [activeClip, playhead]);

  const activeTrigger = useMemo(() => {
    return activeClip.sfxMarkers.find((m) => Math.abs(playhead - m.pos) < 5.5) ?? null;
  }, [activeClip, playhead]);

  const isZoomActive = effects.autoZoom && activeTrigger?.type === 'zoom';
  const isBoomActive = effects.vineBoom && activeTrigger?.type === 'boom';
  const isMemeActive = effects.memeOverlay && activeTrigger?.type === 'meme';

  const toggleWordCut = (wordId: string) => {
    setCutWords((prev) => ({ ...prev, [wordId]: !prev[wordId] }));
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setPlayhead(+pct.toFixed(1));
  };

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1260px]">
      {/* Subtle Ambient Glow behind workstation window */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -top-6 h-40 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl"
      />

      {/* Main Desktop Editor Shell */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c0c10]/95 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Window Top Title & Mode Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#111116] px-4 py-2.5">
          {/* Left: Window dots + Active project name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="truncate font-mono text-xs text-zinc-400">
              ClipForge Studio Pro — Twitch_VOD_2026_Highlight.mkv
            </span>
          </div>

          {/* Center: Format Mode & Target Duration Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Aspect Mode Segmented Control */}
            <div
              role="group"
              aria-label="Export-Format"
              className="inline-flex items-center rounded-lg border border-white/[0.08] bg-zinc-950 p-0.5"
            >
              <button
                type="button"
                onClick={() => setAspectMode('9:16')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  aspectMode === '9:16'
                    ? 'bg-violet-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                9:16 Short-Form
              </button>
              <button
                type="button"
                onClick={() => setAspectMode('16:9')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  aspectMode === '16:9'
                    ? 'bg-cyan-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                16:9 YouTube
              </button>
            </div>

            {/* Target Duration Segmented Control */}
            <div
              role="group"
              aria-label="Ziel-Dauer"
              className="hidden sm:inline-flex items-center rounded-lg border border-white/[0.08] bg-zinc-950 p-0.5"
            >
              {([30, 45, 60] as const).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setTargetDuration(sec)}
                  className={`rounded-md px-2 py-1 font-mono text-xs tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    targetDuration === sec
                      ? 'bg-zinc-800 text-cyan-300'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Ziel {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Right: Quick Export Demo Action */}
          <button
            type="button"
            onClick={() =>
              onExportToast(
                `Demo-Vorschau: „${activeClip.title}“ (${aspectMode}, ${effectiveDuration}s) bereit für den lokalen GPU-Export.`
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Film className="h-3.5 w-3.5" aria-hidden="true" />
            <span>MP4 Exportieren</span>
          </button>
        </div>

        {/* 3-Column Editor Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* COLUMN 1: AI Clips & Text-Based Editing (4 cols) */}
          <div className="flex flex-col justify-between bg-[#0d0d12] p-4 lg:col-span-4">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                  <span>KI-Clip-Vorschläge</span>
                </h3>
                <span className="font-mono text-[11px] tabular-nums text-zinc-500">
                  3 Highlights erkannt
                </span>
              </div>

              <div className="space-y-2">
                {CLIPS.map((clip) => {
                  const selected = clip.id === activeClip.id;
                  return (
                    <button
                      key={clip.id}
                      type="button"
                      onClick={() => {
                        setSelectedClipId(clip.id);
                        setPlayhead(12);
                      }}
                      className={`w-full rounded-xl border p-2.5 text-left transition-all duration-150 cursor-pointer ${
                        selected
                          ? 'border-violet-500/50 bg-violet-500/[0.08]'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-zinc-100 leading-snug">
                          {clip.title}
                        </span>
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums shrink-0 ${
                            selected ? 'text-cyan-300' : 'text-zinc-400'
                          }`}
                        >
                          {clip.viralityScore}/100
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-zinc-500 tabular-nums">
                        <span>{clip.timestamp}</span>
                        <span aria-hidden="true">·</span>
                        <span>{clip.baseDuration.toFixed(0)}s Roh</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-400">Virality</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Text-Based Editing Panel */}
            <div className="mt-4 border-t border-white/[0.08] pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                  <Scissors className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                  <span>Text-Based Editing</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-cyan-400">
                  {savedSeconds > 0 ? `-${savedSeconds.toFixed(1)}s gekürzt` : 'Wort anklicken'}
                </span>
              </div>
              <p className="mb-2 text-[11px] text-zinc-500">
                Klicke Wörter an, um sie direkt aus dem Video herauszuschneiden:
              </p>
              <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/[0.06] bg-zinc-950/90 p-2.5 leading-relaxed">
                {activeClip.transcript.map((word) => {
                  const isCut = !!cutWords[word.id];
                  return (
                    <button
                      key={word.id}
                      type="button"
                      onClick={() => toggleWordCut(word.id)}
                      title={isCut ? 'Schnitt rückgängig machen' : 'Aus Video herausschneiden'}
                      className={`rounded px-1.5 py-0.5 text-xs transition-colors cursor-pointer ${
                        isCut
                          ? 'bg-rose-500/15 text-rose-300/70 line-through'
                          : word.isFiller
                            ? 'bg-violet-500/15 text-violet-200 hover:bg-rose-500/20 hover:text-rose-200'
                            : 'text-zinc-200 hover:bg-white/10'
                      }`}
                    >
                      {word.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Center Video Monitor Preview (4 cols) */}
          <div className="flex flex-col items-center justify-between bg-[#08080b] p-4 lg:col-span-4">
            <div className="mb-2.5 flex w-full items-center justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
              <span>Vorschau · {aspectMode === '9:16' ? '1080×1920 Split-Screen' : '1920×1080 60fps'}</span>
              <span className="text-zinc-200">{formattedTimecode}</span>
            </div>

            {/* Aspect-aware Video Canvas */}
            <div className="flex w-full flex-1 items-center justify-center py-1">
              {aspectMode === '9:16' ? (
                <div className="relative aspect-[9/16] w-full max-w-[238px] overflow-hidden rounded-xl border border-white/15 bg-zinc-950 shadow-2xl">
                  {/* Top half: Facecam */}
                  <div className="relative h-[44%] w-full overflow-hidden border-b border-white/15 bg-zinc-900">
                    {!facecamImgError ? (
                      <img
                        src={FACECAM_IMAGE}
                        alt="Streamer Facecam Vorschau"
                        referrerPolicy="no-referrer"
                        onError={() => setFacecamImgError(true)}
                        className={`h-full w-full object-cover object-center transition-transform duration-200 ${
                          isZoomActive ? 'scale-125' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950 to-zinc-900 text-xs text-zinc-400">
                        Facecam Track
                      </div>
                    )}
                    <span className="absolute left-2 top-2 font-mono text-[10px] text-white/80 drop-shadow">
                      CAM · AUTO-TRACK
                    </span>
                  </div>

                  {/* Bottom half: Gameplay */}
                  <div className="relative h-[56%] w-full overflow-hidden bg-zinc-950">
                    {!gameplayImgError ? (
                      <img
                        src={GAMEPLAY_IMAGE}
                        alt="Gameplay Vorschau"
                        referrerPolicy="no-referrer"
                        onError={() => setGameplayImgError(true)}
                        className={`h-full w-full object-cover transition-transform duration-200 ${
                          isBoomActive ? 'scale-110 brightness-125' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-950 to-zinc-950 text-xs text-zinc-400">
                        Gameplay Track
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
                  </div>

                  {/* Active Meme / SFX Overlay Cue */}
                  {(isBoomActive || isMemeActive || isZoomActive) && (
                    <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-end">
                      <span className="rounded bg-black/75 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 backdrop-blur-sm">
                        {isBoomActive ? 'SFX: VINE BOOM' : isZoomActive ? 'ZOOM 1.25×' : 'MEME OVERLAY'}
                      </span>
                    </div>
                  )}

                  {/* Dynamic Synced Subtitle Overlay */}
                  {effects.captions && (
                    <div className="pointer-events-none absolute inset-x-2.5 top-[41%] -translate-y-1/2 text-center">
                      <p className="inline-block rounded-md bg-black/80 px-2.5 py-1 font-display text-[13px] font-bold leading-tight tracking-tight text-white shadow-lg">
                        {activeCaption.text}{' '}
                        {activeCaption.highlight && (
                          <span className="text-cyan-300">{activeCaption.highlight}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-zinc-950 shadow-2xl">
                  {!gameplayImgError ? (
                    <img
                      src={GAMEPLAY_IMAGE}
                      alt="16:9 YouTube Gameplay Vorschau"
                      referrerPolicy="no-referrer"
                      onError={() => setGameplayImgError(true)}
                      className={`h-full w-full object-cover transition-transform duration-200 ${
                        isZoomActive || isBoomActive ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-zinc-400">
                      16:9 Gameplay
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* PiP Facecam */}
                  <div className="absolute right-3 top-3 aspect-[4/3] w-[30%] overflow-hidden rounded-lg border border-white/25 bg-zinc-900 shadow-lg">
                    {!facecamImgError ? (
                      <img
                        src={FACECAM_IMAGE}
                        alt="Facecam PiP"
                        referrerPolicy="no-referrer"
                        onError={() => setFacecamImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-violet-950/60" />
                    )}
                  </div>

                  {/* Dynamic Caption on 16:9 */}
                  {effects.captions && (
                    <div className="pointer-events-none absolute inset-x-4 bottom-3.5 text-center">
                      <p className="inline-block rounded-md bg-black/80 px-3 py-1 font-display text-sm font-bold text-white shadow-lg">
                        {activeCaption.text}{' '}
                        {activeCaption.highlight && (
                          <span className="text-violet-300">{activeCaption.highlight}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Playback Transport Controls */}
            <div className="mt-3 flex w-full items-center justify-between border-t border-white/[0.08] pt-3">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.1] cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                    <span>Abspielen</span>
                  </>
                )}
              </button>

              <span className="font-mono text-xs tabular-nums text-zinc-400">
                Dauer: <strong className="text-zinc-100">{effectiveDuration.toFixed(1)}s</strong> / Ziel {targetDuration}s
              </span>
            </div>
          </div>

          {/* COLUMN 3: Virality-Score & Auto-Soundboard Inspector (4 cols) */}
          <div className="flex flex-col justify-between bg-[#0d0d12] p-4 lg:col-span-4">
            {/* Virality-Score Preview */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                  <Flame className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                  <span>Virality-Score-Vorschau</span>
                </h3>
                <span className="font-mono text-xs font-semibold tabular-nums text-cyan-300">
                  {activeClip.viralityScore} / 100
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-zinc-950/90 p-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-mono text-base font-semibold tabular-nums text-white">
                      {activeClip.hookScore}%
                    </div>
                    <div className="text-[11px] text-zinc-500">3s-Hook</div>
                  </div>
                  <div className="border-x border-white/[0.06]">
                    <div className="font-mono text-base font-semibold tabular-nums text-violet-300">
                      {activeClip.pacingScore}%
                    </div>
                    <div className="text-[11px] text-zinc-500">Pacing</div>
                  </div>
                  <div>
                    <div className="font-mono text-base font-semibold tabular-nums text-cyan-300">
                      {activeClip.retentionScore}%
                    </div>
                    <div className="text-[11px] text-zinc-500">Retention</div>
                  </div>
                </div>

                {/* Retention Curve SVG */}
                <div className="mt-3">
                  <svg viewBox="0 0 260 54" className="h-12 w-full" aria-label="Retention-Kurve Vorschau">
                    <defs>
                      <linearGradient id="retention-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="retention-stroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 10 C 40 8, 70 16, 110 14 C 155 12, 190 22, 260 18 L 260 54 L 0 54 Z"
                      fill="url(#retention-fill)"
                    />
                    <path
                      d="M0 10 C 40 8, 70 16, 110 14 C 155 12, 190 22, 260 18"
                      fill="none"
                      stroke="url(#retention-stroke)"
                      strokeWidth="2"
                    />
                    {/* Current playhead indicator on curve */}
                    <line
                      x1={(playhead / 100) * 260}
                      y1="0"
                      x2={(playhead / 100) * 260}
                      y2="54"
                      stroke="#22d3ee"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Auto-Soundboard & Meme Toggles */}
            <div className="mt-4 border-t border-white/[0.08] pt-4">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                  <Sliders className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                  <span>Auto-Soundboard & Effekte</span>
                </span>
                <span className="font-mono text-[11px] text-zinc-500">KI-Trigger</span>
              </div>

              <div className="space-y-1.5">
                {[
                  {
                    key: 'vineBoom' as const,
                    label: 'Vine Boom & SFX-Hits',
                    icon: Volume2,
                    meta: 'Auto-Beat',
                  },
                  {
                    key: 'autoZoom' as const,
                    label: 'Dynamischer Zoom (1.25×)',
                    icon: Maximize2,
                    meta: 'Reaktion',
                  },
                  {
                    key: 'memeOverlay' as const,
                    label: 'Auto-Meme-Overlays',
                    icon: Zap,
                    meta: '3 Trigger',
                  },
                  {
                    key: 'captions' as const,
                    label: 'Animierte Untertitel',
                    icon: Subtitles,
                    meta: 'DE / EN',
                  },
                ].map((item) => {
                  const active = effects[item.key];
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setEffects((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      aria-pressed={active}
                      className={`flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                        active
                          ? 'border-violet-500/35 bg-violet-500/[0.08] text-zinc-100'
                          : 'border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <Icon
                          className={`h-3.5 w-3.5 shrink-0 ${
                            active ? 'text-cyan-400' : 'text-zinc-600'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="truncate font-medium">{item.label}</span>
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[10px] text-zinc-500">{item.meta}</span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded ${
                            active
                              ? 'bg-cyan-500 text-zinc-950'
                              : 'border border-zinc-700 bg-zinc-900 text-transparent'
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FULL-WIDTH TIMELINE */}
        <div className="border-t border-white/[0.08] bg-[#0a0a0e] px-4 py-3.5">
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Multi-Track Timeline · Klicke zum Scrubben</span>
            <span className="tabular-nums text-zinc-400">
              00:00 · 00:10 · 00:20 · 00:{Math.round(effectiveDuration).toString().padStart(2, '0')}
            </span>
          </div>

          <div
            onClick={handleTimelineClick}
            role="slider"
            tabIndex={0}
            aria-label="Timeline Position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(playhead)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setPlayhead((p) => Math.min(100, p + 5));
              if (e.key === 'ArrowLeft') setPlayhead((p) => Math.max(0, p - 5));
            }}
            className="relative cursor-pointer select-none space-y-1.5 rounded-xl border border-white/[0.07] bg-zinc-950/90 p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {/* Playhead Needle */}
            <div
              style={{ left: `calc(${playhead}% )` }}
              className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            >
              <div className="absolute -left-[4px] top-0 h-2.5 w-2.5 rounded-b-sm bg-cyan-400" />
            </div>

            {/* Track V1: Video & Auto-Cuts */}
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-500">V1</span>
              <div className="grid h-6 flex-1 grid-cols-12 gap-1">
                <div className="col-span-4 rounded bg-violet-600/25 border border-violet-500/40 px-2 flex items-center text-[10px] font-mono text-violet-200 truncate">
                  Hook Cut
                </div>
                <div className="col-span-5 rounded bg-violet-600/25 border border-violet-500/40 px-2 flex items-center text-[10px] font-mono text-violet-200 truncate">
                  Main Action (Auto-Trim)
                </div>
                <div className="col-span-3 rounded bg-violet-600/25 border border-violet-500/40 px-2 flex items-center text-[10px] font-mono text-violet-200 truncate">
                  Payoff
                </div>
              </div>
            </div>

            {/* Track T1: Dynamic Captions & Meme SFX Markers */}
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-500">SFX</span>
              <div className="relative h-5 flex-1 rounded bg-white/[0.03] border border-white/[0.05]">
                {activeClip.sfxMarkers.map((marker) => {
                  const enabled =
                    (marker.type === 'boom' && effects.vineBoom) ||
                    (marker.type === 'zoom' && effects.autoZoom) ||
                    (marker.type === 'meme' && effects.memeOverlay);
                  return (
                    <div
                      key={`${activeClip.id}-${marker.pos}`}
                      style={{ left: `${marker.pos}%` }}
                      className={`absolute top-0.5 bottom-0.5 -translate-x-1/2 rounded px-1.5 flex items-center font-mono text-[10px] whitespace-nowrap transition-opacity ${
                        enabled
                          ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 opacity-100'
                          : 'bg-zinc-800/40 text-zinc-600 opacity-40'
                      }`}
                    >
                      {marker.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Track A1: Audio Waveform */}
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-500">A1</span>
              <div className="flex h-6 flex-1 items-end gap-[2px] overflow-hidden rounded bg-white/[0.02] px-1 py-1">
                {WAVEFORM_BARS.map((height, idx) => {
                  const barPct = (idx / WAVEFORM_BARS.length) * 100;
                  const passed = barPct <= playhead;
                  return (
                    <span
                      key={idx}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-[1px] transition-colors duration-100 ${
                        passed
                          ? 'bg-gradient-to-t from-violet-500 to-cyan-400'
                          : 'bg-zinc-700/70'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
