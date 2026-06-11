/* =====================================================================
   WER SITZT WO? – Spiellogik
   Reines Vanilla-JS, keine Abhängigkeiten.
   ===================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "wsw-progress-v1";
  var LIVES_PER_LEVEL = 2;

  /* ---------- Zustand ---------- */
  var state = {
    idx: -1,            // Index des aktuellen Levels
    level: null,        // Level-Objekt
    lives: LIVES_PER_LEVEL,
    placed: {},         // personId -> true (richtig platziert)
    selected: null,     // per Tipp/Klick ausgewählte Person
    locked: false       // true, solange ein Overlay offen ist
  };

  var progress = loadProgress();

  /* ---------- Kurz-Helfer ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && Array.isArray(p.done)) {
          while (p.done.length < LEVELS.length) p.done.push(false);
          return p;
        }
      }
    } catch (e) { /* localStorage nicht verfügbar -> Sitzungsmodus */ }
    return { done: LEVELS.map(function () { return false; }) };
  }
  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* ok */ }
  }
  function isUnlocked(i) { return i === 0 || progress.done[i - 1] === true; }

  /* ===================================================================
     MENÜ
     =================================================================== */
  function showMenu() {
    state.idx = -1;
    state.level = null;
    $("#screen-game").hidden = true;
    $("#screen-menu").hidden = false;
    buildMenu();
    window.scrollTo(0, 0);
  }

  function buildMenu() {
    var grid = $("#level-grid");
    grid.innerHTML = "";
    LEVELS.forEach(function (lvl, i) {
      var unlocked = isUnlocked(i);
      var done = progress.done[i];

      var card = el("button", "level-card" + (unlocked ? "" : " locked") + (done ? " done" : ""));
      card.type = "button";
      card.disabled = !unlocked;

      var top = el("div", "lc-top");
      top.appendChild(el("span", "lc-icon", unlocked ? lvl.menuIcon : "🔒"));
      if (done) top.appendChild(el("span", "lc-check", "✓"));
      card.appendChild(top);

      card.appendChild(el("div", "lc-eyebrow", "Level " + lvl.id + " · " + lvl.difficulty));
      card.appendChild(el("div", "lc-title", lvl.title));
      var free = lvl.people.filter(function (p) { return !p.fixed; }).length;
      card.appendChild(el("div", "lc-meta",
        lvl.seats.length + " Plätze · " + free + " Gäste" + (unlocked ? "" : " · noch gesperrt")));

      if (unlocked) {
        card.addEventListener("click", function () { startLevel(i); });
        card.setAttribute("aria-label", "Level " + lvl.id + " starten: " + lvl.title);
      } else {
        card.setAttribute("aria-label", "Level " + lvl.id + " ist noch gesperrt");
      }
      grid.appendChild(card);
    });
  }

  /* ===================================================================
     LEVEL STARTEN & RENDERN
     =================================================================== */
  function startLevel(i) {
    state.idx = i;
    state.level = LEVELS[i];
    state.lives = LIVES_PER_LEVEL;
    state.placed = {};
    state.selected = null;
    state.locked = false;

    $("#screen-menu").hidden = true;
    $("#screen-game").hidden = false;
    $("#overlay").hidden = true;

    $("#hud-level").textContent = "Level " + state.level.id;
    $("#hud-title").textContent = state.level.title;
    renderLives();
    renderScene();
    renderBench();
    renderHints();
    updateSeatSize();
    window.scrollTo(0, 0);
  }

  function restartLevel() { if (state.idx >= 0) startLevel(state.idx); }

  function renderLives() {
    var s = "";
    for (var i = 0; i < LIVES_PER_LEVEL; i++) s += i < state.lives ? "❤️" : "🖤";
    var n = $("#hud-lives");
    n.textContent = s;
    n.title = state.lives + " von " + LIVES_PER_LEVEL + " Leben";
  }

  /* ---------- Szene (Schauplatz) ---------- */
  function renderScene() {
    var scene = $("#scene");
    scene.className = "scene scene--" + state.level.scene;
    scene.innerHTML = "";

    var plate = el("div", "scene-label", "Schauplatz: " + state.level.title);
    scene.appendChild(plate);

    (state.level.decor || []).forEach(function (d) { scene.appendChild(buildDecor(d)); });

    state.level.people.forEach(function (p) { void p; }); // (keine Vorberechnung nötig)

    state.level.seats.forEach(function (seat) {
      var s = el("div", "seat free");
      s.dataset.seat = seat.id;
      s.style.left = seat.x + "%";
      s.style.top = seat.y + "%";

      s.appendChild(el("div", "chair"));

      if (seat.prop) {
        var b = el("div", "prop", seat.prop.icon);
        b.title = seat.prop.label;
        s.appendChild(b);
        s.appendChild(el("div", "prop-label", seat.prop.label));
      }

      s.addEventListener("click", function () { onSeatClick(seat.id); });
      scene.appendChild(s);
    });

    /* Bereits sitzende Personen einsetzen */
    state.level.people.forEach(function (p) {
      if (p.fixed) occupySeat(p, true);
    });
  }

  function buildDecor(d) {
    var n;
    switch (d.type) {
      case "ellipse":
        n = el("div", "d-ellipse"); sizeBox(n, d); break;
      case "rect":
        n = el("div", "d-rect"); sizeBox(n, d); break;
      case "screen":
        n = el("div", "d-screen"); sizeBox(n, d);
        n.appendChild(el("span", "d-screen-text", d.text || "")); break;
      case "banner":
        n = el("div", "d-banner", d.text || "");
        n.style.left = d.x + "%"; n.style.top = d.y + "%"; break;
      case "podium":
        n = el("div", "d-podium"); sizeBox(n, d);
        n.appendChild(el("div", "d-podium-figure", d.icon || "🧑"));
        n.appendChild(el("div", "d-podium-stand"));
        n.appendChild(el("div", "d-podium-name", d.text || "")); break;
      default: /* emoji */
        n = el("div", "d-emoji", d.icon || "✨");
        n.style.left = d.x + "%"; n.style.top = d.y + "%";
        n.style.fontSize = (d.size || 24) + "px";
    }
    n.setAttribute("aria-hidden", "true");
    return n;
  }
  function sizeBox(n, d) {
    n.style.left = d.x + "%"; n.style.top = d.y + "%";
    n.style.width = d.w + "%"; n.style.height = d.h + "%";
  }

  function seatEl(seatId) { return $('#scene .seat[data-seat="' + seatId + '"]'); }

  function occupySeat(person, fixed) {
    var s = seatEl(person.seat);
    if (!s) return;
    s.classList.remove("free");
    s.classList.add("occupied");
    if (fixed) s.classList.add("fixed");
    var head = el("div", "head", person.icon);
    var name = el("div", "plate", person.name);
    s.appendChild(head);
    s.appendChild(name);
    s.title = person.full;
  }

  function seatIsOccupied(seatId) {
    var lvl = state.level;
    for (var i = 0; i < lvl.people.length; i++) {
      var p = lvl.people[i];
      if (p.seat === seatId && (p.fixed || state.placed[p.id])) return true;
    }
    return false;
  }

  /* ---------- Wartebank (noch ohne Platz) ---------- */
  function renderBench() {
    var bench = $("#bench-cards");
    bench.innerHTML = "";
    state.level.people.forEach(function (p) {
      if (p.fixed) return;
      var c = el("button", "pcard");
      c.type = "button";
      c.dataset.person = p.id;
      c.setAttribute("aria-label", p.full + " auswählen");
      c.appendChild(el("span", "pcard-head", p.icon));
      c.appendChild(el("span", "pcard-name", p.name));
      c.addEventListener("pointerdown", function (e) { onCardPointerDown(e, p.id, c); });
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSelect(p.id); }
      });
      bench.appendChild(c);
    });
    updateBenchEmpty();
  }

  function cardEl(personId) { return $('#bench-cards .pcard[data-person="' + personId + '"]'); }

  function updateBenchEmpty() {
    var left = state.level.people.filter(function (p) { return !p.fixed && !state.placed[p.id]; }).length;
    $("#bench-empty").hidden = left !== 0;
    $("#bench-count").textContent = left;
  }

  /* ---------- Hinweise ---------- */
  function renderHints() {
    $("#hint-intro").textContent = state.level.intro;
    var list = $("#hint-list");
    list.innerHTML = "";
    state.level.people.forEach(function (p) {
      var row = el("li", "hint" + (p.fixed ? " fixed" : ""));
      row.dataset.person = p.id;
      row.appendChild(el("span", "hint-head", p.icon));
      var body = el("div", "hint-body");
      var nameRow = el("div", "hint-name", p.full);
      if (p.fixed) nameRow.appendChild(el("span", "hint-tag", "sitzt schon"));
      body.appendChild(nameRow);
      body.appendChild(el("div", "hint-text", p.hint));
      row.appendChild(body);
      row.appendChild(el("span", "hint-check", "✓"));
      list.appendChild(row);
    });
  }

  function markHintDone(personId) {
    var row = $('#hint-list .hint[data-person="' + personId + '"]');
    if (row) row.classList.add("done");
  }

  /* ===================================================================
     AUSWÄHLEN & PLATZIEREN
     =================================================================== */
  function toggleSelect(personId) {
    if (state.locked || state.placed[personId]) return;
    var prev = state.selected;
    clearSelection();
    if (prev !== personId) {
      state.selected = personId;
      var c = cardEl(personId);
      if (c) c.classList.add("selected");
      $("#scene").classList.add("choosing");
      var p = personFor(personId);
      toast("Wohin mit " + p.full + "? Tippe einen Stuhl an.", "info");
    }
  }
  function clearSelection() {
    state.selected = null;
    var sel = $("#bench-cards .pcard.selected");
    if (sel) sel.classList.remove("selected");
    $("#scene").classList.remove("choosing");
  }

  function onSeatClick(seatId) {
    if (state.locked) return;
    if (state.selected) {
      var pid = state.selected;
      clearSelection();
      attemptPlace(pid, seatId);
    }
  }

  function personFor(id) {
    return state.level.people.filter(function (p) { return p.id === id; })[0] || null;
  }

  /**
   * Versucht, eine Person auf einen Platz zu setzen.
   * Rückgabe: "ok" | "wrong" | "occupied" | "invalid"
   */
  function attemptPlace(personId, seatId) {
    if (state.locked || !state.level) return "invalid";
    var p = personFor(personId);
    if (!p || p.fixed || state.placed[p.id]) return "invalid";
    var seatExists = state.level.seats.some(function (s) { return s.id === seatId; });
    if (!seatExists) return "invalid";

    if (seatIsOccupied(seatId)) {
      toast("Dieser Platz ist schon besetzt.", "info");
      bump(seatEl(seatId));
      return "occupied";
    }

    if (p.seat === seatId) {
      state.placed[p.id] = true;
      occupySeat(p, false);
      pop(seatEl(seatId));
      markHintDone(p.id);
      var c = cardEl(p.id);
      if (c) c.remove();
      updateBenchEmpty();
      toast(p.full + " sitzt richtig! ✨", "good");
      checkWin();
      return "ok";
    }

    /* Falsch -> ein Leben weniger */
    state.lives -= 1;
    renderLives();
    shake(cardEl(p.id));
    flashWrong(seatEl(seatId));
    if (state.lives > 0) {
      toast("Autsch – " + p.full + " gehört woanders hin! Noch " + state.lives + " Leben.", "bad");
    } else {
      toast("Das war leider der zweite Fehler …", "bad");
      window.setTimeout(showFail, reducedMotion() ? 80 : 650);
    }
    return "wrong";
  }

  function checkWin() {
    var open = state.level.people.filter(function (p) { return !p.fixed && !state.placed[p.id]; });
    if (open.length === 0) {
      progress.done[state.idx] = true;
      saveProgress();
      window.setTimeout(showWin, reducedMotion() ? 80 : 550);
    }
  }

  /* ===================================================================
     DRAG & DROP (Pointer Events) – mit Tipp-Auswahl als Fallback
     =================================================================== */
  var drag = null;

  function onCardPointerDown(e, personId, card) {
    if (state.locked || state.placed[personId]) return;
    if (e.button !== undefined && e.button !== 0) return;
    drag = {
      personId: personId,
      card: card,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      ghost: null,
      pointerId: e.pointerId
    };
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerCancel);
  }

  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var dx = e.clientX - drag.startX;
    var dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 7) {
      drag.moved = true;
      clearSelection();
      drag.ghost = makeGhost(drag.personId);
      drag.card.classList.add("dragging");
      $("#scene").classList.add("dropping");
    }
    if (drag.ghost) {
      e.preventDefault();
      drag.ghost.style.left = e.clientX + "px";
      drag.ghost.style.top = e.clientY + "px";
      highlightSeatAt(e.clientX, e.clientY);
    }
  }

  function onPointerUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var d = drag;
    cleanupDragListeners();
    if (!d.moved) {
      /* Kein Ziehen -> als Antippen werten (Auswahl-Modus) */
      drag = null;
      toggleSelect(d.personId);
      return;
    }
    var seatId = seatIdAt(e.clientX, e.clientY);
    removeGhost();
    d.card.classList.remove("dragging");
    $("#scene").classList.remove("dropping");
    clearSeatHighlight();
    drag = null;
    if (seatId) attemptPlace(d.personId, seatId);
  }

  function onPointerCancel(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    cleanupDragListeners();
    removeGhost();
    if (drag.card) drag.card.classList.remove("dragging");
    $("#scene").classList.remove("dropping");
    clearSeatHighlight();
    drag = null;
  }

  function cleanupDragListeners() {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerCancel);
  }

  function makeGhost(personId) {
    var p = personFor(personId);
    var g = el("div", "ghost");
    g.appendChild(el("span", "pcard-head", p.icon));
    g.appendChild(el("span", "pcard-name", p.name));
    document.body.appendChild(g);
    return g;
  }
  function removeGhost() {
    var g = $(".ghost");
    if (g) g.remove();
  }

  function seatIdAt(x, y) {
    if (document.elementsFromPoint) {
      var els = document.elementsFromPoint(x, y);
      for (var i = 0; i < els.length; i++) {
        var n = els[i];
        while (n && n !== document.body) {
          if (n.classList && n.classList.contains("seat")) return n.dataset.seat;
          n = n.parentElement;
        }
      }
      return null;
    }
    /* Fallback über Bounding-Boxen */
    var seats = document.querySelectorAll("#scene .seat");
    for (var j = 0; j < seats.length; j++) {
      var r = seats[j].getBoundingClientRect();
      if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6) {
        return seats[j].dataset.seat;
      }
    }
    return null;
  }

  var hoveredSeat = null;
  function highlightSeatAt(x, y) {
    var id = seatIdAt(x, y);
    if (id === hoveredSeat) return;
    clearSeatHighlight();
    hoveredSeat = id;
    if (id) {
      var s = seatEl(id);
      if (s && s.classList.contains("free")) s.classList.add("drop-hover");
    }
  }
  function clearSeatHighlight() {
    hoveredSeat = null;
    var s = $("#scene .seat.drop-hover");
    if (s) s.classList.remove("drop-hover");
  }

  /* ===================================================================
     OVERLAYS, TOASTS, EFFEKTE
     =================================================================== */
  function showWin() {
    state.locked = true;
    var lastLevel = state.idx === LEVELS.length - 1;
    var allDone = progress.done.every(Boolean);
    var title = lastLevel && allDone ? "Alle Level geschafft! 🏆" : "Level geschafft! 🎉";
    var msg = "„" + state.level.title + "“ gelöst";
    msg += state.lives === LIVES_PER_LEVEL ? " – und das ganz ohne Fehler!" : " mit " + state.lives + " ❤️.";
    if (!lastLevel) msg += " Level " + (state.level.id + 1) + " ist jetzt freigeschaltet.";
    else if (allDone) msg = "Du hast alle Gäste an die richtigen Plätze gebracht. " + msg;

    openOverlay("win", title, msg, [
      !lastLevel ? { label: "Weiter zu Level " + (state.level.id + 1), primary: true, action: function () { startLevel(state.idx + 1); } } : null,
      lastLevel ? { label: "Nochmal spielen", primary: true, action: restartLevel } : null,
      { label: "Zur Übersicht", action: showMenu }
    ]);
    if (!reducedMotion()) confetti();
  }

  function showFail() {
    state.locked = true;
    openOverlay("fail", "Level gescheitert 💔",
      "Zwei Gäste saßen falsch – die Tafel ist durcheinander. Kein Problem: Lies die Hinweise noch einmal in Ruhe und versuch es gleich nochmal.",
      [
        { label: "Nochmal versuchen", primary: true, action: restartLevel },
        { label: "Zur Übersicht", action: showMenu }
      ]);
  }

  function openOverlay(kind, title, msg, buttons) {
    var ov = $("#overlay");
    ov.className = "overlay " + kind;
    $("#ov-title").textContent = title;
    $("#ov-text").textContent = msg;
    var btns = $("#ov-buttons");
    btns.innerHTML = "";
    buttons.filter(Boolean).forEach(function (b) {
      var btn = el("button", "btn" + (b.primary ? " btn-primary" : ""), b.label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        ov.hidden = true;
        state.locked = false;
        b.action();
      });
      btns.appendChild(btn);
    });
    ov.hidden = false;
    var first = btns.querySelector("button");
    if (first) first.focus();
  }

  var toastTimer = null;
  function toast(msg, kind) {
    var t = $("#toast");
    t.textContent = msg;
    t.className = "toast show " + (kind || "info");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.className = "toast"; }, 2600);
  }

  function shake(n) { animateClass(n, "anim-shake"); }
  function pop(n) { animateClass(n, "anim-pop"); }
  function bump(n) { animateClass(n, "anim-bump"); }
  function flashWrong(n) { animateClass(n, "anim-wrong"); }
  function animateClass(n, cls) {
    if (!n || reducedMotion()) return;
    n.classList.remove(cls);
    void n.offsetWidth; /* Reflow erzwingen, damit die Animation neu startet */
    n.classList.add(cls);
  }

  function confetti() {
    var host = el("div", "confetti");
    var colors = ["#2F5D50", "#E0A91F", "#C2566B", "#5B7DB1", "#E8DCC3"];
    for (var i = 0; i < 70; i++) {
      var s = el("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = (Math.random() * 0.6) + "s";
      s.style.animationDuration = (2.2 + Math.random() * 1.4) + "s";
      s.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      host.appendChild(s);
    }
    document.body.appendChild(host);
    window.setTimeout(function () { host.remove(); }, 4200);
  }

  /* ---------- Sitzgröße an Szenenbreite anpassen ---------- */
  function updateSeatSize() {
    var scene = $("#scene");
    if (!scene || !state.level) return;
    var w = scene.clientWidth || 800;
    var base = Math.max(42, Math.min(70, w * 0.082));
    var size = Math.round(base * (state.level.seatScale || 1));
    scene.style.setProperty("--seat", size + "px");
  }

  /* ===================================================================
     START
     =================================================================== */
  function init() {
    $("#btn-back").addEventListener("click", showMenu);
    $("#btn-restart").addEventListener("click", restartLevel);
    $("#btn-reset").addEventListener("click", function () {
      if (window.confirm("Gesamten Spielfortschritt löschen?")) {
        progress = { done: LEVELS.map(function () { return false; }) };
        saveProgress();
        buildMenu();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") clearSelection();
    });
    /* Klick neben die Stühle hebt die Auswahl auf */
    $("#scene").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) clearSelection();
    });
    window.addEventListener("resize", updateSeatSize);
    showMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Kleine Test-/Debug-Schnittstelle */
  window.WSW = {
    startLevel: startLevel,
    attemptPlace: attemptPlace,
    showMenu: showMenu,
    get state() { return state; },
    get progress() { return progress; }
  };
})();
