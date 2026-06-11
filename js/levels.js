/* =====================================================================
   WER SITZT WO? – Leveldaten
   ---------------------------------------------------------------------
   Jedes Level besteht aus:
   - seats:  Sitzplätze mit Position (x/y in % der Szene) und optional
             einem "prop" (Gegenstand am Platz, Teil des Rätsels)
   - people: Personen. "seat" ist die richtige Lösung.
             fixed:true  -> Person sitzt von Anfang an (Anker für Hinweise)
   - decor:  reine Deko (Tische, Banner, Leinwand, Emojis ...)

   Alle Level sind von Hand auf eine EINDEUTIGE Lösung geprüft:
   Es gibt immer eine Reihenfolge, in der sich jeder Platz rein
   logisch aus den Hinweisen ableiten lässt.
   ===================================================================== */

const LEVELS = [

  /* ------------------------------------------------------------------
     LEVEL 1 · Familienessen bei Oma (6 Plätze, runder Tisch)
     Lösung: S1 Hilde* · S2 Max · S3 Bernd · S4 Karl · S5 Lena · S6 Anna
     ------------------------------------------------------------------ */
  {
    id: 1,
    title: "Familienessen bei Oma",
    menuIcon: "🍽️",
    difficulty: "Zum Aufwärmen",
    scene: "l1",
    seatScale: 1.12,
    intro:
      "Zieh jede Person vom Rand auf ihren richtigen Stuhl – oder tippe erst die Person, dann den Platz. " +
      "Die Hinweise unten verraten dir, wer wohin gehört. Achtung: Zwei falsche Stühle und das Level beginnt von vorn!",
    decor: [
      { type: "ellipse", x: 50, y: 52, w: 44, h: 54 },
      { type: "emoji", icon: "🍽️", x: 50, y: 44, size: 26 },
      { type: "emoji", icon: "🕯️", x: 50, y: 58, size: 24 },
      { type: "emoji", icon: "🪴", x: 6, y: 14, size: 34 },
      { type: "emoji", icon: "🖼️", x: 93, y: 12, size: 32 }
    ],
    seats: [
      { id: "S1", x: 50, y: 15 },
      { id: "S2", x: 78, y: 33 },
      { id: "S3", x: 78, y: 71, prop: { icon: "🥗", label: "Salat" } },
      { id: "S4", x: 50, y: 89 },
      { id: "S5", x: 22, y: 71 },
      { id: "S6", x: 22, y: 33 }
    ],
    people: [
      { id: "hilde", name: "Hilde", full: "Oma Hilde", icon: "👵", seat: "S1", fixed: true,
        hint: "Oma Hilde hat als Gastgeberin schon Platz genommen." },
      { id: "anna", name: "Anna", full: "Mama Anna", icon: "👩", seat: "S6",
        hint: "Mama Anna sitzt direkt neben Oma Hilde." },
      { id: "max", name: "Max", full: "Max", icon: "👦", seat: "S2",
        hint: "Max kommt wie immer als Letzter – er nimmt den übrig gebliebenen Stuhl." },
      { id: "karl", name: "Karl", full: "Opa Karl", icon: "👴", seat: "S4",
        hint: "Opa Karl sitzt seiner Frau Hilde genau gegenüber." },
      { id: "lena", name: "Lena", full: "Lena", icon: "👧", seat: "S5",
        hint: "Lena sitzt zwischen Opa Karl und Mama Anna." },
      { id: "bernd", name: "Bernd", full: "Papa Bernd", icon: "👨", seat: "S3",
        hint: "Papa Bernd isst kein Fleisch – sein Essen steht schon an seinem Platz bereit." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 2 · Kinoabend (8 Plätze, 2 Reihen)
     Lösung: A1 Jonas · A2 Mia* · A3 Paul · A4 Ruth
             B1 Tom   · B2 Sara · B3 Emma · B4 Leon*
     ------------------------------------------------------------------ */
  {
    id: 2,
    title: "Kinoabend",
    menuIcon: "🎬",
    difficulty: "Leicht",
    scene: "l2",
    seatScale: 1.05,
    intro:
      "Reihe 1 ist vorn an der Leinwand. „Direkt hinter“ heißt: gleiche Position, eine Reihe weiter hinten. " +
      "„Direkt neben“ heißt: Nachbarplatz in derselben Reihe.",
    decor: [
      { type: "screen", x: 50, y: 11, w: 72, h: 12, text: "LEINWAND" },
      { type: "emoji", icon: "🍿", x: 6, y: 90, size: 30 },
      { type: "emoji", icon: "🥤", x: 94, y: 90, size: 28 }
    ],
    seats: [
      { id: "A1", x: 20, y: 47 },
      { id: "A2", x: 40, y: 47 },
      { id: "A3", x: 60, y: 47 },
      { id: "A4", x: 80, y: 47 },
      { id: "B1", x: 20, y: 80 },
      { id: "B2", x: 40, y: 80 },
      { id: "B3", x: 60, y: 80 },
      { id: "B4", x: 80, y: 80 }
    ],
    people: [
      { id: "mia", name: "Mia", full: "Mia", icon: "👩‍🦰", seat: "A2", fixed: true,
        hint: "Mia hat die Karten besorgt und sitzt schon auf ihrem Lieblingsplatz." },
      { id: "leon", name: "Leon", full: "Leon", icon: "🧑‍🦱", seat: "B4", fixed: true,
        hint: "Leon lümmelt bereits ganz außen in der hinteren Reihe." },
      { id: "tom", name: "Tom", full: "Tom", icon: "🧔", seat: "B1",
        hint: "Tom ist 2,02 m groß. Aus Rücksicht setzt er sich in die hintere Reihe." },
      { id: "ruth", name: "Ruth", full: "Tante Ruth", icon: "👵🏻", seat: "A4",
        hint: "Tante Ruth sitzt in derselben Reihe wie Mia – aber nicht direkt neben ihr." },
      { id: "paul", name: "Paul", full: "Paul", icon: "👨🏽", seat: "A3",
        hint: "Paul will genau in die Mitte der ersten Reihe. Zum Glück ist einer der beiden Mittelplätze noch frei." },
      { id: "sara", name: "Sara", full: "Sara", icon: "👱‍♀️", seat: "B2",
        hint: "Sara kuschelt sich direkt neben ihren Freund Tom." },
      { id: "jonas", name: "Jonas", full: "Jonas", icon: "🧑", seat: "A1",
        hint: "Jonas sitzt direkt vor Tom." },
      { id: "emma", name: "Emma", full: "Emma", icon: "👩🏼", seat: "B3",
        hint: "Emma sitzt direkt hinter Paul." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 3 · Hochzeitstafel (8 Plätze in einer Reihe)
     Lösung: H1 Heinz · H2 Ole · H3 Steffi · H4 Julia* ·
             H5 Markus · H6 Timo · H7 Frieda · H8 Petra
     ------------------------------------------------------------------ */
  {
    id: 3,
    title: "Hochzeitstafel",
    menuIcon: "💒",
    difficulty: "Mittel",
    scene: "l3",
    seatScale: 0.98,
    intro:
      "Achte auf die Gegenstände an den Plätzen – sie sind Teil des Rätsels. " +
      "Und denk daran, wer bei einer Hochzeit traditionell wo sitzt …",
    decor: [
      { type: "banner", x: 50, y: 8, text: "Julia ♥ Markus" },
      { type: "rect", x: 50, y: 68, w: 92, h: 18 },
      { type: "emoji", icon: "🎂", x: 37, y: 66, size: 28 },
      { type: "emoji", icon: "💐", x: 63, y: 66, size: 26 },
      { type: "emoji", icon: "🌸", x: 5, y: 20, size: 26 },
      { type: "emoji", icon: "🌸", x: 95, y: 20, size: 26 }
    ],
    seats: [
      { id: "H1", x: 9, y: 44, prop: { icon: "🎤", label: "Mikrofon" } },
      { id: "H2", x: 20.7, y: 44 },
      { id: "H3", x: 32.4, y: 44 },
      { id: "H4", x: 44.1, y: 44 },
      { id: "H5", x: 55.9, y: 44 },
      { id: "H6", x: 67.6, y: 44, prop: { icon: "🖍️", label: "Kindermenü mit Buntstiften" } },
      { id: "H7", x: 79.3, y: 44 },
      { id: "H8", x: 91, y: 44 }
    ],
    people: [
      { id: "julia", name: "Julia", full: "Braut Julia", icon: "👰", seat: "H4", fixed: true,
        hint: "Braut Julia strahlt schon auf ihrem Platz." },
      { id: "frieda", name: "Frieda", full: "Oma Frieda", icon: "👵", seat: "H7",
        hint: "Oma Frieda sitzt zwischen Timo und Brautmutter Petra – falls jemand beim Essen Hilfe braucht." },
      { id: "markus", name: "Markus", full: "Markus", icon: "🤵", seat: "H5",
        hint: "Markus ist der Bräutigam." },
      { id: "heinz", name: "Heinz", full: "Brautvater Heinz", icon: "👨‍🦳", seat: "H1",
        hint: "Brautvater Heinz hält gleich die erste Rede – er sitzt direkt am Mikrofon." },
      { id: "steffi", name: "Steffi", full: "Trauzeugin Steffi", icon: "👩🏻", seat: "H3",
        hint: "Trauzeugin Steffi sitzt zwischen der Braut und ihrem Freund Ole." },
      { id: "timo", name: "Timo", full: "Timo", icon: "👦", seat: "H6",
        hint: "Der kleine Timo (5) bekommt natürlich das Kindermenü mit den Buntstiften." },
      { id: "petra", name: "Petra", full: "Brautmutter Petra", icon: "👩‍🦳", seat: "H8",
        hint: "Brautmutter Petra sitzt am anderen Ende der Tafel als das Mikrofon." },
      { id: "ole", name: "Ole", full: "Ole", icon: "👨🏼", seat: "H2",
        hint: "Ole sitzt direkt neben seiner Freundin Steffi." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 4 · Orchesterprobe (12 Plätze, 2 Bögen + Dirigentenpult)
     Lösung: F1 Greta · F2 Linus · F3 Clara · F4 Jakob · F5 Nele · F6 Ben
             B1 Ida · B2 Otto · B3 Hannes* · B4 Czerny · B5 Yusuf · B6 Maren
     ------------------------------------------------------------------ */
  {
    id: 4,
    title: "Orchesterprobe",
    menuIcon: "🎻",
    difficulty: "Knifflig",
    scene: "l4",
    seatScale: 0.92,
    intro:
      "An jedem Platz wartet ein Instrument. Wer spielt was? " +
      "Die erste Reihe ist vorn bei der Dirigentin; „direkt vor“ heißt: gleiche Position, eine Reihe weiter vorn.",
    decor: [
      { type: "podium", x: 50, y: 88, w: 14, h: 9, icon: "👩‍🦰", text: "Dirigentin Viola" },
      { type: "emoji", icon: "🎵", x: 7, y: 12, size: 26 },
      { type: "emoji", icon: "🎶", x: 93, y: 14, size: 26 }
    ],
    seats: [
      { id: "F1", x: 10, y: 64, prop: { icon: "🎻", label: "Geige" } },
      { id: "F2", x: 26, y: 60, prop: { icon: "🎻", label: "Geige" } },
      { id: "F3", x: 42, y: 58, prop: { icon: "🎻", label: "Geige" } },
      { id: "F4", x: 58, y: 58, prop: { icon: "🎻", label: "Geige" } },
      { id: "F5", x: 74, y: 60, prop: { icon: "🪈", label: "Querflöte" } },
      { id: "F6", x: 90, y: 64, prop: { icon: "🪈", label: "Querflöte" } },
      { id: "B1", x: 10, y: 32, prop: { icon: "🎺", label: "Trompete" } },
      { id: "B2", x: 26, y: 28, prop: { icon: "🎺", label: "Trompete" } },
      { id: "B3", x: 42, y: 26, prop: { icon: "🥁", label: "Schlagzeug" } },
      { id: "B4", x: 58, y: 26, prop: { icon: "🎹", label: "Klavier" } },
      { id: "B5", x: 74, y: 28, prop: { icon: "🎷", label: "Saxofon" } },
      { id: "B6", x: 90, y: 32, prop: { icon: "🎷", label: "Saxofon" } }
    ],
    people: [
      { id: "hannes", name: "Hannes", full: "Schlagzeuger Hannes", icon: "🧔", seat: "B3", fixed: true,
        hint: "Schlagzeuger Hannes trommelt sich schon warm." },
      { id: "linus", name: "Linus", full: "Linus", icon: "👨‍🦱", seat: "F2",
        hint: "Geiger Linus sitzt zwischen den beiden Geigerinnen Greta und Clara." },
      { id: "czerny", name: "Fr. Czerny", full: "Frau Czerny", icon: "👵🏻", seat: "B4",
        hint: "Frau Czerny spielt das einzige Tasteninstrument der Kapelle." },
      { id: "nele", name: "Nele", full: "Nele", icon: "👧", seat: "F5",
        hint: "Flötistin Nele sitzt direkt vor Yusuf." },
      { id: "otto", name: "Otto", full: "Otto", icon: "👴", seat: "B2",
        hint: "Trompeter Otto sitzt direkt neben Schlagzeuger Hannes." },
      { id: "greta", name: "Greta", full: "Konzertmeisterin Greta", icon: "👩‍🦱", seat: "F1",
        hint: "Konzertmeisterin Greta spielt Geige und sitzt ganz außen in der ersten Reihe." },
      { id: "yusuf", name: "Yusuf", full: "Yusuf", icon: "👨🏾", seat: "B5",
        hint: "Saxofonist Yusuf sitzt zwischen Frau Czerny und seiner Schwester Maren." },
      { id: "ben", name: "Ben", full: "Ben", icon: "👦", seat: "F6",
        hint: "Ben spielt die andere Querflöte." },
      { id: "ida", name: "Ida", full: "Ida", icon: "👩‍🦳", seat: "B1",
        hint: "Ida spielt die zweite Trompete." },
      { id: "clara", name: "Clara", full: "Clara", icon: "👩", seat: "F3",
        hint: "Clara sitzt mit ihrer Geige direkt neben Linus." },
      { id: "maren", name: "Maren", full: "Maren", icon: "👩🏽", seat: "B6",
        hint: "Maren spielt wie ihr Bruder Yusuf Saxofon." },
      { id: "jakob", name: "Jakob", full: "Jakob", icon: "🧑‍🦰", seat: "F4",
        hint: "Jakob hat fast verschlafen – er nimmt den letzten freien Geigenplatz." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 5 · Opas 80. Geburtstag (14 Plätze, große Tafel)
     Lösung: E1 Hans* · E2 Krause
             T1 Else · T2 Nils · T3 Gisela · T4 Rosi* · T5 Monika · T6 Walter
             U1 Caro · U2 Frida · U3 Dieter · U4 Egon · U5 Sabine · U6 Kunze
     ------------------------------------------------------------------ */
  {
    id: 5,
    title: "Opas 80. Geburtstag",
    menuIcon: "🎂",
    difficulty: "Sehr knifflig",
    scene: "l5",
    seatScale: 0.8,
    intro:
      "Das Meisterstück! Lies alle Hinweise genau – auch die der Gäste, die schon sitzen. " +
      "Manche Hinweise ergeben erst zusammen einen Sinn. Plätze direkt gegenüber liegen sich über den Tisch hinweg gegenüber.",
    decor: [
      { type: "banner", x: 50, y: 7, text: "Opa Hans wird 80! 🎉" },
      { type: "rect", x: 50, y: 54, w: 82, h: 22 },
      { type: "emoji", icon: "🎈", x: 5, y: 18, size: 32 },
      { type: "emoji", icon: "🎈", x: 95, y: 18, size: 32 },
      { type: "emoji", icon: "🥂", x: 50, y: 54, size: 24 }
    ],
    seats: [
      { id: "E1", x: 6.5, y: 54, prop: { icon: "🎂", label: "Geburtstagstorte" } },
      { id: "T1", x: 19, y: 31 },
      { id: "T2", x: 31.4, y: 31 },
      { id: "T3", x: 43.8, y: 31 },
      { id: "T4", x: 56.2, y: 31 },
      { id: "T5", x: 68.6, y: 31 },
      { id: "T6", x: 81, y: 31 },
      { id: "E2", x: 93.5, y: 54 },
      { id: "U1", x: 19, y: 77 },
      { id: "U2", x: 31.4, y: 77 },
      { id: "U3", x: 43.8, y: 77 },
      { id: "U4", x: 56.2, y: 77, prop: { icon: "🥘", label: "Gemüseauflauf" } },
      { id: "U5", x: 68.6, y: 77 },
      { id: "U6", x: 81, y: 77 }
    ],
    people: [
      { id: "hans", name: "Hans", full: "Opa Hans", icon: "👴", seat: "E1", fixed: true,
        hint: "Das Geburtstagskind thront am Tischende. Sein Wunsch: Der jüngste Gast darf heute direkt neben ihm sitzen!" },
      { id: "rosi", name: "Rosi", full: "Tante Rosi", icon: "👵🏼", seat: "T4", fixed: true,
        hint: "Tante Rosi, Hansens Schwester, hat sich ihren Lieblingsplatz längst gesichert." },
      { id: "caro", name: "Caro", full: "Caro", icon: "🧒", seat: "U1",
        hint: "Caro kam erst nach ihrer Schwester Frida zur Welt." },
      { id: "monika", name: "Monika", full: "Monika", icon: "👩‍🦳", seat: "T5",
        hint: "Monika sitzt zwischen Tante Rosi und ihrem Mann Walter." },
      { id: "egon", name: "Egon", full: "Nachbar Egon", icon: "🧔", seat: "U4",
        hint: "Nachbar Egon isst kein Fleisch – sein Gemüseauflauf steht schon bereit." },
      { id: "else", name: "Else", full: "Oma Else", icon: "👵", seat: "T1",
        hint: "Oma Else sitzt natürlich direkt neben ihrem Hans – und zwar auf derselben Tischseite wie ihre Schwägerin Rosi." },
      { id: "dieter", name: "Dieter", full: "Dieter", icon: "👨‍🦲", seat: "U3",
        hint: "Dieter sitzt seiner Frau Gisela genau gegenüber." },
      { id: "frida", name: "Frida", full: "Frida", icon: "👧", seat: "U2",
        hint: "Frida ist die Zweitjüngste der Runde und sitzt direkt neben ihrer Schwester Caro." },
      { id: "kunze", name: "Fr. Kunze", full: "Pfarrerin Kunze", icon: "👩‍🦱", seat: "U6",
        hint: "Pfarrerin Kunze sitzt direkt neben Sabine." },
      { id: "nils", name: "Nils", full: "Nils", icon: "👦", seat: "T2",
        hint: "Nils sitzt Frida genau gegenüber." },
      { id: "walter", name: "Walter", full: "Walter", icon: "👨‍🦳", seat: "T6",
        hint: "Walter weicht seiner Frau Monika nicht von der Seite." },
      { id: "gisela", name: "Gisela", full: "Gisela", icon: "👩‍🦰", seat: "T3",
        hint: "Gisela sitzt auf derselben Tischseite wie Oma Else." },
      { id: "sabine", name: "Sabine", full: "Sabine", icon: "👩", seat: "U5",
        hint: "Sabine sitzt zwischen Nachbar Egon und Pfarrerin Kunze." },
      { id: "krause", name: "Krause", full: "Bäckermeister Krause", icon: "👨‍🍳", seat: "E2",
        hint: "Bäckermeister Krause hat die Torte gebracht und nimmt den letzten freien Platz am Tischende." }
    ]
  }
];

/* Für Tests in Node verfügbar machen (im Browser ohne Wirkung) */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LEVELS };
}
