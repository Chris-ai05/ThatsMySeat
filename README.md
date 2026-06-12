# 🪑 Wer sitzt wo? – Das Sitzplatz-Rätsel

Ein Logik-Rätselspiel für den Browser: In jedem Level siehst du einen Schauplatz mit Sitzplätzen – von Omas Esstisch über Kinosaal, Hochzeitstafel, Orchesterprobe und Geburtstagsfeier bis zu Reisebus, Raumstation, Krimi-Dinner, Riesenrad und dem Speisewagen eines Nachtzugs. Einige Personen sitzen schon. Die übrigen warten am Rand. Lies die Hinweise, kombiniere – und zieh jede Person auf ihren richtigen Stuhl

**Regeln**

- Zieh eine Person per Maus (oder Finger) auf einen Stuhl. Alternativ: Person antippen, dann den Stuhl antippen.
- Richtiger Platz → die Person nimmt Platz. ✨
- Falscher Platz → die Person bleibt am Rand und du verlierst **1 Leben**.
- Du hast **2 Leben pro Level**. Beim zweiten Fehler startet das Level neu.
- Die Level schalten sich nacheinander frei. Dein Fortschritt wird per `localStorage` im Browser gespeichert.

Alle 10 Level sind **eindeutig lösbar** – maschinell verifiziert per Constraint-Solver: Es gibt immer eine Reihenfolge, in der sich jeder Platz rein logisch aus den Hinweisen ergibt, ganz ohne Raten. Die Schwierigkeit steigt von Level zu Level; Level 10 ist die Meisterprüfung.

## Projektstruktur

```
wer-sitzt-wo/
├── index.html        # Startseite + Spielansicht (eine Seite, zwei Screens)
├── css/
│   └── style.css     # Komplettes Design ("Tischkarten"-Look)
└── js/
    ├── levels.js     # Alle Leveldaten (Sitzplätze, Personen, Hinweise, Deko)
    └── game.js       # Spiellogik (Drag & Drop, Leben, Fortschritt, Overlays)
```

Reines HTML/CSS/JavaScript – **kein Build-Schritt, keine Abhängigkeiten**.

## Lokal ausprobieren

Einfach `index.html` im Browser öffnen. Oder mit einem kleinen lokalen Server:

```bash
npx serve .
```

## Auf GitHub hochladen & mit Vercel veröffentlichen

1. **GitHub:** Neues Repository anlegen und alle Dateien dieses Ordners hochladen (per `git push` oder direkt über „Add file → Upload files" im Browser).
2. **Vercel:** Auf [vercel.com](https://vercel.com) einloggen → **Add New → Project** → dein GitHub-Repository importieren.
3. **Deploy:** Keine Einstellungen nötig – als Framework Preset passt **„Other"**, Build Command und Output Directory leer lassen. Auf **Deploy** klicken, fertig. 🎉

Da es eine rein statische Seite ist, funktioniert sie genauso auf GitHub Pages, Netlify & Co.

## Eigene Level bauen

Neue Level werden einfach ans `LEVELS`-Array in `js/levels.js` angehängt. Ein Level besteht aus:

| Feld | Bedeutung |
| --- | --- |
| `id`, `title`, `menuIcon`, `difficulty` | Anzeige auf der Levelkarte |
| `scene` | Hintergrund-Stil: `l1`–`l10` (oder eigenen in `style.css` ergänzen) |
| `seatScale` | Stuhlgröße relativ zur Standardgröße (kleiner bei vielen Plätzen) |
| `intro` | Einleitungstext über den Hinweisen |
| `decor` | Deko: `ellipse`, `rect`, `screen`, `banner`, `podium`, `emoji` |
| `seats` | Plätze mit `id`, Position `x`/`y` in % – optional `prop` (Gegenstand am Platz, z. B. 🥗) |
| `people` | Personen mit `seat` (= richtige Lösung), `hint` und optional `fixed: true` (sitzt von Anfang an) |

**Fairness-Checkliste für gute Rätsel**

- [ ] Gibt es genau **eine** gültige Gesamtlösung?
- [ ] Lässt sich jeder Platz in irgendeiner Reihenfolge **zwingend** ableiten (kein Raten nötig)?
- [ ] Mindestens eine Person mit `fixed: true` als Anker für relative Hinweise („neben", „gegenüber")?
- [ ] Mehrdeutige Begriffe im `intro` erklärt (z. B. was „direkt hinter" bedeutet)?
- [ ] Zwischen 5 und 20 Sitzplätzen?

## Lizenz

Frei verwendbar – viel Spaß beim Rätseln und Weiterbauen!
