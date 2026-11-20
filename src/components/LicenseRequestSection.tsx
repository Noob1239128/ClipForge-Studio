import { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Instagram,
  KeyRound,
  Mail,
  MessageSquare,
} from 'lucide-react';
import type { SiteConfig } from '../types';

interface LicenseRequestSectionProps {
  config: SiteConfig;
  onNotify: (message: string) => void;
}

const PAYMENT_OPTIONS = ['PayPal', 'Überweisung', 'Nach Absprache'] as const;
type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

export function LicenseRequestSection({ config, onNotify }: LicenseRequestSectionProps) {
  const [creatorName, setCreatorName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('PayPal');
  const [discordCopied, setDiscordCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  const preparedMessage = useMemo(() => {
    const nameLine = creatorName.trim() ? `Mein Creator-/Kanalname: ${creatorName.trim()}\n` : '';
    return `Hey! Ich möchte gerne einen Pro Lifetime Activation Code für ${config.appName} (${config.proPrice}) anfragen.\n${nameLine}Bevorzugte Zahlungsart: ${paymentMethod}\n\nDanke und viele Grüße!`;
  }, [creatorName, paymentMethod, config.appName, config.proPrice]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('ClipForge Pro – Anfrage Activation Code');
    const body = encodeURIComponent(preparedMessage);
    return `mailto:${config.email}?subject=${subject}&body=${body}`;
  }, [config.email, preparedMessage]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for restricted clipboard environments
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    }
  };

  const handleDiscordAction = async () => {
    await copyToClipboard(config.discordTag);
    setDiscordCopied(true);
    onNotify(
      `Discord-Tag „${config.discordTag}“ in die Zwischenablage kopiert! Du kannst mich jetzt direkt auf Discord anschreiben.`
    );
    window.setTimeout(() => setDiscordCopied(false), 3200);
  };

  const handleCopyMessage = async () => {
    await copyToClipboard(preparedMessage);
    setMessageCopied(true);
    onNotify('Vorbereitete Anfrage-Nachricht in die Zwischenablage kopiert!');
    window.setTimeout(() => setMessageCopied(false), 2600);
  };

  const handleInstagramAction = async () => {
    await copyToClipboard(preparedMessage);
    onNotify('Nachricht kopiert – füge sie einfach direkt in deine Instagram-DM ein.');
  };

  return (
    <section
      id="lizenz-anfragen"
      className="scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1260px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Explanation & Key Preview (5 cols) */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-cyan-400">
              Direkt-Kontakt ohne Umwege
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Activation Code anfragen
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              Wähle deinen bevorzugten Kanal aus. Deine Anfrage-Nachricht wird automatisch
              vorbereitet – nach kurzer Bestätigung sende ich dir deinen persönlichen
              Lifetime-Schlüssel direkt zu.
            </p>

            {/* Personal License Key Visual Preview */}
            <div className="mt-8 rounded-2xl border border-white/[0.09] bg-zinc-900/50 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-2 font-medium text-zinc-200">
                  <KeyRound className="h-4 w-4 text-violet-400" aria-hidden="true" />
                  <span>Dein persönlicher Lizenzschlüssel</span>
                </span>
                <span className="font-mono text-cyan-400">Lifetime</span>
              </div>

              <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#09090b] px-4 py-3.5 text-center font-mono text-base font-semibold tracking-[0.16em] text-white sm:text-lg">
                CLIP-7F9A-4K2M-9X8Q
              </div>

              <ol className="mt-5 space-y-2.5 text-xs leading-relaxed text-zinc-400">
                <li className="flex gap-2.5">
                  <span className="font-mono text-cyan-400 shrink-0">01.</span>
                  <span>Kanal wählen (Discord, E-Mail oder Instagram DM) und Anfrage senden.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono text-cyan-400 shrink-0">02.</span>
                  <span>Nach Abschluss erhältst du sofort deinen persönlichen Activation Code.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono text-cyan-400 shrink-0">03.</span>
                  <span>
                    Code in ClipForge Studio Pro unter{' '}
                    <strong className="font-medium text-zinc-200">Einstellungen → Lizenz</strong>{' '}
                    eingeben – fertig.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Select Contact & Order Widget (7 cols) */}
          <div className="rounded-2xl border border-white/[0.1] bg-zinc-900/45 p-6 backdrop-blur-xl sm:p-8 lg:col-span-7">
            <h3 className="font-display text-lg font-semibold text-white">
              Anfrage vorbereiten & Kanal wählen
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Optional deinen Creator-Namen & Wunsch-Zahlungsart angeben – wir füllen die Nachricht
              automatisch für dich vor.
            </p>

            {/* Optional Quick Personalizer */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="creator-name"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Dein Name / Kanalname (optional)
                </label>
                <input
                  id="creator-name"
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="z. B. LeonPlays / Twitch-Handle"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#09090b] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-zinc-300">
                  Bevorzugte Zahlungsart
                </span>
                <div
                  role="group"
                  aria-label="Bevorzugte Zahlungsart"
                  className="mt-1.5 grid grid-cols-3 gap-1.5 rounded-xl border border-white/10 bg-[#09090b] p-1"
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPaymentMethod(option)}
                      className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-colors whitespace-nowrap truncate cursor-pointer ${
                        paymentMethod === option
                          ? 'bg-violet-600 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Prepared Message Preview */}
            <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#09090b]/90 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">
                  Vorbereitete Nachricht
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300 whitespace-nowrap cursor-pointer"
                >
                  {messageCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Kopiert</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Text kopieren</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-300">
                {preparedMessage}
              </pre>
            </div>

            {/* 3 Quick-Select Contact Channel Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Button 1: Per Discord fragen */}
              <div className="flex flex-col gap-2">
                <a
                  href={config.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDiscordAction}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-4 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#4752C4] active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2]"
                >
                  {discordCopied ? (
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>Per Discord fragen</span>
                </a>
                <span className="text-center font-mono text-[11px] text-zinc-500 truncate">
                  Tag: {config.discordTag}
                </span>
              </div>

              {/* Button 2: Per E-Mail anfragen */}
              <div className="flex flex-col gap-2">
                <a
                  href={mailtoHref}
                  onClick={() =>
                    onNotify(
                      'E-Mail-Programm wird mit vorausgefülltem Betreff „ClipForge Pro – Anfrage Activation Code“ geöffnet.'
                    )
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Per E-Mail anfragen</span>
                </a>
                <span className="text-center font-mono text-[11px] text-zinc-500 truncate">
                  {config.email}
                </span>
              </div>

              {/* Button 3: Instagram / Social DM */}
              <div className="flex flex-col gap-2">
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInstagramAction}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/[0.12] active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-fuchsia-400" aria-hidden="true" />
                  <span>Instagram DM</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
                </a>
                <span className="text-center font-mono text-[11px] text-zinc-500 truncate">
                  {config.instagramHandle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
