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
  },

  /* ------------------------------------------------------------------
     LEVEL 6 · Klassenfahrt im Reisebus (12 Plätze, 3 Reihen à 2+2)
     Spalten: A Fenster links · B Gang links · C Gang rechts · D Fenster rechts
     Lösung: 1A Yara · 1B Finn · 1C Sommer* · 1D Olli
             2A Pia  · 2B Deniz · 2C Kim   · 2D Selma
             3A Robin · 3B Ayla · 3C Juri  · 3D Mats
     ------------------------------------------------------------------ */
  {
    id: 6,
    title: "Klassenfahrt im Reisebus",
    menuIcon: "🚌",
    difficulty: "Knifflig",
    scene: "l6",
    seatScale: 0.95,
    intro:
      "Der Bus von oben, vorn ist oben – der Fahrer sitzt links. „Direkt neben“ meint das eigene Sitzpaar, " +
      "der Gang dazwischen zählt nicht. „Direkt hinter“ heißt: gleiche Spalte, eine Reihe weiter hinten.",
    decor: [
      { type: "rect", x: 50, y: 55, w: 84, h: 80 },
      { type: "podium", x: 21, y: 17, w: 13, h: 10, icon: "🧑‍✈️", text: "Fahrer Bodo" },
      { type: "banner", x: 58, y: 9, text: "Klasse 7b unterwegs 🎉" },
      { type: "emoji", icon: "🛞", x: 31, y: 14, size: 22 },
      { type: "emoji", icon: "🎒", x: 5, y: 92, size: 28 },
      { type: "emoji", icon: "🥪", x: 95, y: 92, size: 26 }
    ],
    seats: [
      { id: "1A", x: 20, y: 38 },
      { id: "1B", x: 36, y: 38 },
      { id: "1C", x: 64, y: 38 },
      { id: "1D", x: 80, y: 38 },
      { id: "2A", x: 20, y: 60 },
      { id: "2B", x: 36, y: 60 },
      { id: "2C", x: 64, y: 60 },
      { id: "2D", x: 80, y: 60 },
      { id: "3A", x: 20, y: 82 },
      { id: "3B", x: 36, y: 82 },
      { id: "3C", x: 64, y: 82 },
      { id: "3D", x: 80, y: 82, prop: { icon: "🎸", label: "Gitarrenkoffer" } }
    ],
    people: [
      { id: "sommer", name: "Fr. Sommer", full: "Frau Sommer", icon: "👩‍🏫", seat: "1C", fixed: true,
        hint: "Frau Sommer sitzt vorn rechts am Gang – von hier zählt sie durch, ob alle da sind." },
      { id: "olli", name: "Olli", full: "Olli", icon: "👦", seat: "1D",
        hint: "Olli wird beim Lesen schlecht. Frau Sommer setzt ihn direkt neben sich – ans Fenster." },
      { id: "finn", name: "Finn", full: "Finn", icon: "🧒", seat: "1B",
        hint: "Finn sitzt in derselben Reihe wie Frau Sommer, auf dem Gangplatz der anderen Seite." },
      { id: "yara", name: "Yara", full: "Yara", icon: "👧🏽", seat: "1A",
        hint: "Yara sitzt direkt neben Finn am Fenster." },
      { id: "deniz", name: "Deniz", full: "Deniz", icon: "👦🏽", seat: "2B",
        hint: "Deniz sitzt direkt hinter Finn." },
      { id: "ayla", name: "Ayla", full: "Ayla", icon: "👧🏻", seat: "3B",
        hint: "Ayla sitzt direkt hinter Deniz – die drei bilden eine Gang-Kolonne." },
      { id: "kim", name: "Kim", full: "Kim", icon: "🧒🏼", seat: "2C",
        hint: "Kim sitzt in derselben Reihe wie Deniz, aber auf dem Gangplatz der anderen Seite." },
      { id: "selma", name: "Selma", full: "Selma", icon: "👧", seat: "2D",
        hint: "Selma sitzt direkt neben Kim." },
      { id: "mats", name: "Mats", full: "Mats", icon: "👦🏼", seat: "3D",
        hint: "Mats’ Gitarrenkoffer liegt schon auf seinem Platz – Klassenfahrt ohne Lagerfeuer-Songs? Niemals." },
      { id: "pia", name: "Pia", full: "Pia", icon: "👩🏻", seat: "2A",
        hint: "Pia liebt Fensterplätze auf der linken Seite – nur die erste Reihe mag sie nicht." },
      { id: "robin", name: "Robin", full: "Robin", icon: "🧑‍🦰", seat: "3A",
        hint: "Robin sitzt direkt hinter Pia." },
      { id: "juri", name: "Juri", full: "Juri", icon: "👦🏻", seat: "3C",
        hint: "Juri pennt fast den Abfahrtstermin weg und kriegt den letzten freien Platz." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 7 · Notfallübung auf Station Aurora (12 Plätze im Ring)
     P1 oben, im Uhrzeigersinn. Gegenüber: Pi ↔ Pi+6. P11/P12 ohne Konsole.
     Lösung: P1 Vega* · P2 Quentin · P3 Tarek · P4 Chen · P5 R0B-7 · P6 Aiko
             P7 Kosmo · P8 Ronja · P9 Lasse · P10 Soraya · P11 Wanda · P12 Milo
     ------------------------------------------------------------------ */
  {
    id: 7,
    title: "Notfallübung auf Station Aurora",
    menuIcon: "🛰️",
    difficulty: "Richtig knifflig",
    scene: "l7",
    seatScale: 0.85,
    intro:
      "Notfallübung: Heute tauscht die Crew die Plätze – fast niemand sitzt an der eigenen Konsole! " +
      "„Gegenüber“ heißt: über den Kern hinweg auf der anderen Seite des Rings. " +
      "„Neben“ heißt: der nächste Platz im Ring. Zwei Plätze haben gar keine Konsole.",
    decor: [
      { type: "ellipse", x: 50, y: 53, w: 26, h: 32 },
      { type: "emoji", icon: "⚛️", x: 50, y: 53, size: 32 },
      { type: "emoji", icon: "🌍", x: 91, y: 88, size: 38 },
      { type: "emoji", icon: "☄️", x: 7, y: 12, size: 26 }
    ],
    seats: [
      { id: "P1", x: 50, y: 15, prop: { icon: "🧭", label: "Navigation" } },
      { id: "P2", x: 69, y: 21, prop: { icon: "📡", label: "Funkkonsole" } },
      { id: "P3", x: 84, y: 36, prop: { icon: "🔬", label: "Labor" } },
      { id: "P4", x: 88, y: 54, prop: { icon: "🌱", label: "Gewächskammer" } },
      { id: "P5", x: 84, y: 72, prop: { icon: "🩺", label: "MedBay" } },
      { id: "P6", x: 69, y: 85, prop: { icon: "🔧", label: "Antrieb" } },
      { id: "P7", x: 50, y: 90, prop: { icon: "🔭", label: "Teleskop" } },
      { id: "P8", x: 31, y: 85, prop: { icon: "🍳", label: "Kombüse" } },
      { id: "P9", x: 16, y: 72, prop: { icon: "⚡", label: "Reaktor" } },
      { id: "P10", x: 12, y: 54, prop: { icon: "🛰️", label: "Andockschleuse" } },
      { id: "P11", x: 16, y: 36 },
      { id: "P12", x: 31, y: 21 }
    ],
    people: [
      { id: "vega", name: "Vega", full: "Kommandantin Vega", icon: "👩‍🚀", seat: "P1", fixed: true,
        hint: "Kommandantin Vega bleibt, wo Chefinnen sitzen: an der Navigationskonsole." },
      { id: "milo", name: "Milo", full: "Funker Milo", icon: "👨🏽‍🚀", seat: "P12",
        hint: "Funker Milo sitzt direkt neben Vega – aber ausdrücklich NICHT an seiner geliebten Funkkonsole." },
      { id: "wanda", name: "Wanda", full: "Geologin Wanda", icon: "👩‍🔬", seat: "P11",
        hint: "Geologin Wanda sitzt direkt neben Milo, an einem der beiden Plätze ganz ohne Konsole." },
      { id: "quentin", name: "Quentin", full: "Astronom Quentin", icon: "🧑🏿‍🚀", seat: "P2",
        hint: "Astronom Quentin übernimmt heute den Funk – sein Platz ist an der großen Antenne." },
      { id: "kosmo", name: "Kosmo", full: "Stationskatze Kosmo", icon: "🐈", seat: "P7",
        hint: "Stationskatze Kosmo hat sich auf dem Teleskop-Sessel zusammengerollt. Sterne glotzen kann sie auch." },
      { id: "chen", name: "Dr. Chen", full: "Dr. Chen", icon: "👩🏻‍⚕️", seat: "P4",
        hint: "Dr. Chen sitzt der Andockschleuse genau gegenüber – falls beim Andocken jemandem schwindelig wird." },
      { id: "aiko", name: "Aiko", full: "Pilotin Aiko", icon: "👩🏻‍✈️", seat: "P6",
        hint: "Pilotin Aiko sitzt Funker Milo genau gegenüber." },
      { id: "rob", name: "R0B-7", full: "Wartungsroboter R0B-7", icon: "🤖", seat: "P5",
        hint: "Wartungsroboter R0B-7 parkt zwischen Dr. Chen und Aiko – dort lädt sein Akku." },
      { id: "tarek", name: "Tarek", full: "Koch Tarek", icon: "👨🏾‍🍳", seat: "P3",
        hint: "Koch Tarek sitzt zwischen Quentin und Dr. Chen und schnippelt heute Laborproben statt Gemüse." },
      { id: "soraya", name: "Soraya", full: "Botanikerin Soraya", icon: "🧕", seat: "P10",
        hint: "Botanikerin Soraya sitzt ihrer Gewächskammer genau gegenüber und schaut sehnsüchtig zu den Tomaten hinüber." },
      { id: "ronja", name: "Ronja", full: "Ingenieurin Ronja", icon: "👷‍♀️", seat: "P8",
        hint: "Ingenieurin Ronja sitzt direkt neben der Stationskatze – und zwar am Platz mit der Bratpfanne." },
      { id: "lasse", name: "Lasse", full: "Azubi Lasse", icon: "🧑🏼", seat: "P9",
        hint: "Azubi Lasse bekommt, was übrig bleibt: den letzten freien Platz." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 8 · Krimi-Dinner auf Burg Rabenfels (10 Plätze, lange Tafel)
     Oben = Fensterseite (Gewitter), unten = Kaminseite. Gegenüber: Oi ↔ Ui.
     Lösung: K1 Gräfin* · O1 James · O2 Brand · O3 Lindqvist · O4 Polly ·
             K10 Falk · U1 Berta · U2 Viktoria · U3 Elfie · U4 Anton
     ------------------------------------------------------------------ */
  {
    id: 8,
    title: "Krimi-Dinner auf Burg Rabenfels",
    menuIcon: "🕯️",
    difficulty: "Sehr knifflig",
    scene: "l8",
    seatScale: 0.95,
    intro:
      "Mörderspiel auf Burg Rabenfels – alles nur Theater! Die Seite mit den Gewitterfenstern (oben) ist die " +
      "Fensterseite, die Seite am Kamin (unten) die Kaminseite. „Gegenüber“ gilt quer über die Tafel; " +
      "wer am Kopfende sitzt, ist mit beiden Seiten direkt benachbart.",
    decor: [
      { type: "banner", x: 50, y: 7, text: "🔎 Krimi-Dinner – jeder ist verdächtig" },
      { type: "rect", x: 50, y: 52, w: 84, h: 22 },
      { type: "emoji", icon: "🕯️", x: 40, y: 51, size: 22 },
      { type: "emoji", icon: "🕯️", x: 60, y: 51, size: 22 },
      { type: "emoji", icon: "🌩️", x: 8, y: 16, size: 30 },
      { type: "emoji", icon: "🌩️", x: 92, y: 16, size: 30 },
      { type: "emoji", icon: "🔥", x: 50, y: 94, size: 30 },
      { type: "emoji", icon: "🐈‍⬛", x: 93, y: 89, size: 26 }
    ],
    seats: [
      { id: "K1", x: 7, y: 52, prop: { icon: "🔔", label: "Tischglocke" } },
      { id: "O1", x: 24, y: 33 },
      { id: "O2", x: 41.3, y: 33 },
      { id: "O3", x: 58.7, y: 33, prop: { icon: "🍷", label: "das berüchtigte Weinglas" } },
      { id: "O4", x: 76, y: 33 },
      { id: "K10", x: 93, y: 52 },
      { id: "U1", x: 24, y: 71 },
      { id: "U2", x: 41.3, y: 71, prop: { icon: "🗝️", label: "alter Schlüssel" } },
      { id: "U3", x: 58.7, y: 71 },
      { id: "U4", x: 76, y: 71 }
    ],
    people: [
      { id: "graefin", name: "Gräfin", full: "Gräfin von Rabenfels", icon: "👸🏼", seat: "K1", fixed: true,
        hint: "Gastgeberin Gräfin von Rabenfels eröffnet das Spiel vom Kopfende aus – ihre Tischglocke steht bereit." },
      { id: "falk", name: "Falk", full: "Detektiv Falk", icon: "🕵️", seat: "K10",
        hint: "Detektiv Falk will alle im Blick haben und wählt das andere Tischende – möglichst weit weg von dieser Glocke." },
      { id: "james", name: "James", full: "Butler James", icon: "🤵🏻", seat: "O1",
        hint: "Butler James sitzt direkt neben der Gräfin, auf der Fensterseite. Einschenken muss schließlich jemand." },
      { id: "berta", name: "Berta", full: "Köchin Berta", icon: "👩‍🍳", seat: "U1",
        hint: "Köchin Berta sitzt ebenfalls direkt neben der Gräfin – auf der Kaminseite, der Küchentür am nächsten." },
      { id: "lindqvist", name: "Lindqvist", full: "Professor Lindqvist", icon: "👨🏼‍🏫", seat: "O3",
        hint: "Professor Lindqvist doziert über das „berüchtigte Weinglas“. Es steht direkt vor ihm." },
      { id: "brand", name: "Brand", full: "Major Brand", icon: "👨🏽‍✈️", seat: "O2",
        hint: "Major Brand sitzt auf der Fensterseite – aber weder neben der Gräfin noch neben dem Detektiv." },
      { id: "polly", name: "Polly", full: "Sekretärin Polly", icon: "👩🏻‍💼", seat: "O4",
        hint: "Sekretärin Polly stenografiert jedes Wort. Sie sitzt direkt neben Detektiv Falk, auf der Fensterseite." },
      { id: "viktoria", name: "Viktoria", full: "Erbin Viktoria", icon: "💃🏼", seat: "U2",
        hint: "Erbin Viktoria sitzt Major Brand genau gegenüber. Den alten Schlüssel trägt sie immer bei sich …" },
      { id: "elfie", name: "Elfie", full: "Nichte Elfie", icon: "👩🏼‍🦱", seat: "U3",
        hint: "Nichte Elfie tuschelt mit Viktoria – sie sitzt direkt neben ihr, natürlich auch auf der Kaminseite." },
      { id: "anton", name: "Anton", full: "Gärtner Anton", icon: "🧑🏽‍🌾", seat: "U4",
        hint: "Gärtner Anton kommt als Letzter – Lehm an den Stiefeln – und nimmt den letzten freien Stuhl." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 9 · Riesenrad bei Nacht (6 Gondeln à 2 Plätze)
     G1 oben, im Uhrzeigersinn. Gegenüber: Gi ↔ Gi+3.
     Gleiche Höhe: G2↔G6 und G3↔G5. a = linker Platz, b = rechter Platz.
     Lösung: G1 Janne+Ferdi · G2 Lotte+Hamid · G3 Ivo+Carla ·
             G4 Mette+Ruben* · G5 Pepe+Zofia · G6 Smilla*+Theo
     ------------------------------------------------------------------ */
  {
    id: 9,
    title: "Riesenrad bei Nacht",
    menuIcon: "🎡",
    difficulty: "Sehr knifflig",
    scene: "l9",
    seatScale: 0.8,
    intro:
      "Das Rad steht für den Einstieg still. „Gegenüber“ heißt: die Gondel auf der exakt anderen Seite des Rads. " +
      "„Direkt unter/über“ meint die Nachbargondel auf derselben Radseite. Links und rechts gelten aus deiner Sicht.",
    decor: [
      { type: "ellipse", x: 50, y: 50, w: 78, h: 78 },
      { type: "emoji", icon: "⚙️", x: 50, y: 50, size: 26 },
      { type: "rect", x: 50, y: 13, w: 15, h: 11 },
      { type: "rect", x: 81, y: 31.5, w: 15, h: 11 },
      { type: "rect", x: 81, y: 68.5, w: 15, h: 11 },
      { type: "rect", x: 50, y: 87, w: 15, h: 11 },
      { type: "rect", x: 19, y: 68.5, w: 15, h: 11 },
      { type: "rect", x: 19, y: 31.5, w: 15, h: 11 },
      { type: "emoji", icon: "🌙", x: 92, y: 9, size: 34 },
      { type: "emoji", icon: "🎪", x: 6, y: 91, size: 30 },
      { type: "emoji", icon: "🍭", x: 94, y: 91, size: 24 }
    ],
    seats: [
      { id: "G1a", x: 45, y: 12 },
      { id: "G1b", x: 55, y: 12 },
      { id: "G2a", x: 76, y: 30.5 },
      { id: "G2b", x: 86, y: 30.5, prop: { icon: "🎈", label: "Luftballon" } },
      { id: "G3a", x: 76, y: 67.5 },
      { id: "G3b", x: 86, y: 67.5 },
      { id: "G4a", x: 45, y: 86, prop: { icon: "🧸", label: "Schießbuden-Teddy" } },
      { id: "G4b", x: 55, y: 86 },
      { id: "G5a", x: 14, y: 67.5 },
      { id: "G5b", x: 24, y: 67.5 },
      { id: "G6a", x: 14, y: 30.5, prop: { icon: "📷", label: "Kamera" } },
      { id: "G6b", x: 24, y: 30.5 }
    ],
    people: [
      { id: "smilla", name: "Smilla", full: "Fotografin Smilla", icon: "👩🏻‍🦰", seat: "G6a", fixed: true,
        hint: "Fotografin Smilla hat die Kamera schon im Anschlag – aus ihrer Gondel ist das Licht am besten." },
      { id: "ruben", name: "Ruben", full: "Ruben", icon: "🧑🏽", seat: "G4b", fixed: true,
        hint: "Ruben sitzt ganz unten in der Einstiegsgondel und überlegt noch, ob das alles eine gute Idee war." },
      { id: "mette", name: "Mette", full: "Mette", icon: "👩🏼", seat: "G4a",
        hint: "Mette steigt zu Ruben in die Gondel – ihr frisch gewonnener Teddy bekommt den Fensterplatz." },
      { id: "theo", name: "Theo", full: "Theo", icon: "👦🏻", seat: "G6b",
        hint: "Theo quetscht sich zu Smilla in die Gondel. Er will unbedingt mit aufs Foto." },
      { id: "janne", name: "Janne", full: "Janne", icon: "🧑🏼‍🦱", seat: "G1a",
        hint: "Janne hängt genau gegenüber von Ruben – einmal quer übers ganze Rad." },
      { id: "ferdi", name: "Ferdi", full: "Ferdi", icon: "👨🏻", seat: "G1b",
        hint: "Ferdi sitzt bei Janne in der Gondel, auf dem rechten Platz. Mutprobe!" },
      { id: "lotte", name: "Lotte", full: "Lotte", icon: "👵🏼", seat: "G2a",
        hint: "Lottes Gondel hängt genauso hoch wie Smillas – aber auf der anderen Seite des Rads." },
      { id: "hamid", name: "Hamid", full: "Hamid", icon: "👨🏾", seat: "G2b",
        hint: "Hamid sitzt bei Lotte in der Gondel – sein Luftballon ist am rechten Platz festgeknotet." },
      { id: "zofia", name: "Zofia", full: "Zofia", icon: "👩🏻", seat: "G5b",
        hint: "Zofias Gondel hängt direkt unter Smillas, auf derselben Seite des Rads." },
      { id: "pepe", name: "Pepe", full: "Pepe", icon: "👶", seat: "G5a",
        hint: "Der kleine Pepe sitzt bei Zofia in der Gondel, auf dem linken Platz." },
      { id: "ivo", name: "Ivo", full: "Ivo", icon: "🧔🏻", seat: "G3a",
        hint: "Ivo hängt genau gegenüber von Smilla – und sitzt links." },
      { id: "carla", name: "Carla", full: "Carla", icon: "👩🏽", seat: "G3b",
        hint: "Carla erwischt den letzten freien Platz, kurz bevor sich das Rad dreht." }
    ]
  },

  /* ------------------------------------------------------------------
     LEVEL 10 · Speisewagen im Nachtzug nach Wien (16 Plätze, 4 Tische)
     Lok rechts. Pro Tisch: f = Fensterzeile, g = Gangzeile;
     v = blickt in Fahrtrichtung (linke Tischhälfte), r = entgegen.
     Tisch 1 (A, hinten oben) · 2 (B, vorn oben) · 3 (C, hinten unten) · 4 (D, vorn unten)
     Lösung: Afv Leokadia · Afr Mio · Agv Samu · Agr Adler*
             Bfv Sorel · Bfr Falter · Bgv Tomma · Bgr Tilda
             Cgv Nora · Cgr Jo · Cfv Ewald* · Cfr Waldi
             Dgv Wieser · Dgr Knopp · Dfv Viggo · Dfr Ines
     ------------------------------------------------------------------ */
  {
    id: 10,
    title: "Speisewagen im Nachtzug nach Wien",
    menuIcon: "🚆",
    difficulty: "Meisterprüfung",
    scene: "l10",
    seatScale: 0.72,
    intro:
      "Das Meisterstück! Die Lok ist rechts – wer in Fahrtrichtung blickt, schaut nach rechts. " +
      "„Gegenüber“ und „diagonal“ gelten am eigenen Tisch. Wer am Gang sitzt, hat jenseits des Mittelgangs " +
      "ein direktes Gegenüber auf gleicher Höhe. „Einen Tisch weiter hinten“ heißt: von der Lok weg. " +
      "Tisch 1 und 2 stehen oben, Tisch 3 und 4 unten.",
    decor: [
      { type: "banner", x: 50, y: 6, text: "Nachtzug → Wien" },
      { type: "rect", x: 50, y: 53, w: 93, h: 76, cls: "wagen" },
      { type: "rect", x: 28, y: 31, w: 13, h: 17, cls: "tisch" },
      { type: "rect", x: 72, y: 31, w: 13, h: 17, cls: "tisch" },
      { type: "rect", x: 28, y: 73, w: 13, h: 17, cls: "tisch" },
      { type: "rect", x: 72, y: 73, w: 13, h: 17, cls: "tisch" },
      { type: "emoji", icon: "1️⃣", x: 28, y: 31, size: 15 },
      { type: "emoji", icon: "2️⃣", x: 72, y: 31, size: 15 },
      { type: "emoji", icon: "3️⃣", x: 28, y: 73, size: 15 },
      { type: "emoji", icon: "4️⃣", x: 72, y: 73, size: 15 },
      { type: "emoji", icon: "🚂", x: 97, y: 52, size: 30 },
      { type: "emoji", icon: "🌙", x: 4, y: 9, size: 22 }
    ],
    seats: [
      { id: "Afv", x: 20, y: 23.5 },
      { id: "Afr", x: 36, y: 23.5 },
      { id: "Agv", x: 20, y: 38.5 },
      { id: "Agr", x: 36, y: 38.5, prop: { icon: "☕", label: "Pausenkaffee" } },
      { id: "Bfv", x: 64, y: 23.5, prop: { icon: "🍰", label: "Sachertorte" } },
      { id: "Bfr", x: 80, y: 23.5 },
      { id: "Bgv", x: 64, y: 38.5 },
      { id: "Bgr", x: 80, y: 38.5 },
      { id: "Cgv", x: 20, y: 65.5 },
      { id: "Cgr", x: 36, y: 65.5 },
      { id: "Cfv", x: 20, y: 80.5 },
      { id: "Cfr", x: 36, y: 80.5, prop: { icon: "🦴", label: "Kauknochen" } },
      { id: "Dgv", x: 64, y: 65.5 },
      { id: "Dgr", x: 80, y: 65.5 },
      { id: "Dfv", x: 64, y: 80.5, prop: { icon: "♟️", label: "Schachbrett" } },
      { id: "Dfr", x: 80, y: 80.5 }
    ],
    people: [
      { id: "adler", name: "Fr. Adler", full: "Schaffnerin Adler", icon: "👮‍♀️", seat: "Agr", fixed: true,
        hint: "Schaffnerin Adler macht Kaffeepause: Gangplatz an Tisch 1, Blick zur hinteren Wagentür." },
      { id: "ewald", name: "Ewald", full: "Pensionär Ewald", icon: "👴🏻", seat: "Cfv", fixed: true,
        hint: "Pensionär Ewald sitzt seit Salzburg am Fenster von Tisch 3 und blickt in Fahrtrichtung." },
      { id: "waldi", name: "Waldi", full: "Dackel Waldi", icon: "🐕", seat: "Cfr",
        hint: "Dackel Waldi reist mit eigener Fahrkarte. Er sitzt Herrchen Ewald direkt gegenüber, der Kauknochen liegt bereit." },
      { id: "jo", name: "Jo", full: "Backpacker Jo", icon: "🧑🏾‍🦱", seat: "Cgr",
        hint: "Backpacker Jo sitzt jenseits des Mittelgangs auf gleicher Höhe wie Schaffnerin Adler – Rucksack zwischen den Füßen." },
      { id: "nora", name: "Nora", full: "Studentin Nora", icon: "👩🏼‍🎓", seat: "Cgv",
        hint: "Studentin Nora sitzt Jo direkt gegenüber und löchert ihn mit Fragen zu seiner Weltreise." },
      { id: "sorel", name: "Mme Sorel", full: "Madame Sorel", icon: "👩🏽‍🎤", seat: "Bfv",
        hint: "Madame Sorel hat als Einzige Sachertorte vorbestellt. Serviert wird sie selbstverständlich mit Blick in Fahrtrichtung." },
      { id: "falter", name: "Falter", full: "Krimiautor Falter", icon: "🧑🏻‍💻", seat: "Bfr",
        hint: "Krimiautor Falter beobachtet Madame Sorel unauffällig über den Rand seines Notizbuchs – er sitzt ihr direkt gegenüber." },
      { id: "tilda", name: "Tilda", full: "Zwilling Tilda", icon: "👱🏻‍♀️", seat: "Bgr",
        hint: "Die Zwillinge sitzen an Madame Sorels Tisch am Gang, einander direkt gegenüber. Tilda ist eine von ihnen." },
      { id: "tomma", name: "Tomma", full: "Zwilling Tomma", icon: "👱🏼‍♀️", seat: "Bgv",
        hint: "Tomma ist der Zwilling, der in Fahrtrichtung blickt. (Anders erkennt die beiden sowieso niemand.)" },
      { id: "wieser", name: "Dr. Wieser", full: "Richterin Dr. Wieser", icon: "👩🏻‍⚖️", seat: "Dgv",
        hint: "Richterin Dr. Wieser sitzt jenseits des Mittelgangs auf gleicher Höhe wie Tomma." },
      { id: "knopp", name: "Knopp", full: "Herr Knopp", icon: "👨🏼‍💼", seat: "Dgr",
        hint: "Herr Knopp sitzt Dr. Wieser direkt gegenüber – das Ohr mal wieder am Telefon." },
      { id: "ines", name: "Ines", full: "Ines", icon: "👩🏾", seat: "Dfr",
        hint: "Ines sitzt diagonal gegenüber von Dr. Wieser. So sieht die Richterin ihre Schachzüge nicht." },
      { id: "viggo", name: "Viggo", full: "Viggo", icon: "👨🏻‍🦳", seat: "Dfv",
        hint: "Viggo sitzt Ines direkt gegenüber – das Schachbrett wartet zwischen ihnen am Fenster." },
      { id: "samu", name: "Samu", full: "Azubi Samu", icon: "🧑🏽‍🎓", seat: "Agv",
        hint: "Azubi Samu sitzt seiner Chefin direkt gegenüber, den Notizblock gezückt." },
      { id: "mio", name: "Mio", full: "Mio", icon: "🧒🏻", seat: "Afr",
        hint: "Der kleine Mio sitzt auf demselben Platz wie Autor Falter – nur einen Tisch weiter hinten." },
      { id: "leokadia", name: "Leokadia", full: "Oma Leokadia", icon: "👵🏽", seat: "Afv",
        hint: "Oma Leokadia nimmt den allerletzten freien Platz im Wagen. Zum Glück ein Fensterplatz!" }
    ]
  }
];

/* Für Tests in Node bzw. Debugging im Browser verfügbar machen */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LEVELS };
}
if (typeof window !== "undefined") {
  window.LEVELS = LEVELS;
}
