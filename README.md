# ClipForge Studio Pro – Produkt-Landingpage

Statische Landingpage für **ClipForge Studio Pro** (KI-Video-Editor & Auto-Meme-Generator für Windows), vorbereitet für kostenloses Hosting auf **GitHub Pages**.

## Eigene Links anpassen

Öffne `src/App.tsx` und trage ganz oben in `SITE_CONFIG` deine eigenen Links ein:

- `downloadUrl`: Direkter Link zu deiner `.exe`-Datei (z. B. über **GitHub Releases**)
- `discordTag` & `discordUrl`: Dein Discord-Benutzername und Einladungs-/Profillink
- `email`: Deine E-Mail-Adresse für Activation-Code-Anfragen
- `instagramUrl` & `instagramHandle`: Dein Instagram-/Social-DM-Link

## Auf GitHub Pages aktivieren (einmalig)

1. Öffne dein GitHub-Repository → **Settings** → **Pages**.
2. Wähle unter **Build and deployment → Source** die Option **GitHub Actions**.
3. Fertig! Bei jedem Push auf `main` oder `master` baut und veröffentlicht GitHub die Seite automatisch.
