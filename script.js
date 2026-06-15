const chapters = [
  {
    title: "Jerry Mixon <span>Jr.</span>",
    copy: "Today the world celebrates your graduation. I celebrate every step, every sacrifice, and every moment that made you the man you are.",
    kicker: "From Dad, with pride.",
    images: [["IMG_2501.JPG", "Family. Purpose. Legacy."]],
    className: "cover"
  },
  {
    title: "The story started <span>early.</span>",
    copy: "Before the awards, the crowds, and the college lights, you were my son with a future bigger than both of us could imagine. I saw greatness in you from day one.",
    layout: "stack",
    images: [["IMG_2517.JPG", "The beginning"], ["IMG_2515.JPG", "Growing together"]]
  },
  {
    title: "Built step by <span>step.</span>",
    copy: "Honor roll to graduation day, you kept leveling up. Every achievement proved that discipline, heart, and consistency will always speak louder than words.",
    images: [["IMG_2516.JPG", "Honor roll"], ["IMG_2512.JPG", "Back to the future"]]
  },
  {
    title: "Courtside <span>lessons.</span>",
    copy: "That basketball was never just a ball. It taught us teamwork, patience, toughness, and how to keep shooting after a miss.",
    images: [["IMG_1965.JPG", "Father and son"], ["IMG_2514.JPG", "Always in your corner"]]
  },
  {
    title: "I always <span>believed.</span>",
    copy: "Through every challenge and every season, my message stayed the same: follow your dreams and never quit. You turned that belief into a way of life.",
    images: [["IMG_2511.JPG", "Follow your dreams"], ["IMG_2508.JPG", "Keep moving forward"]]
  },
  {
    title: "The work <span>spoke.</span>",
    copy: "The numbers told part of the story, but your character told the rest. Athlete of the Year was earned long before your name reached the plaque.",
    images: [["IMG_2509.JPG", "The stats"], ["IMG_2502.JPG", "Athlete of the year"]]
  },
  {
    title: "Champion <span>mindset.</span>",
    copy: "Championships are won by people who show up when nobody is watching. You learned to compete with confidence, lead with purpose, and represent the Mixteam.",
    images: [["IMG_2505.JPG", "Champions"], ["IMG_2506.JPG", "The Mixteam"]]
  },
  {
    title: "More than the <span>moment.</span>",
    copy: "Prom nights, sharp suits, big games, and unforgettable memories. You carried yourself with style, but your heart has always been your greatest look.",
    images: [["IMG_2503.JPG", "Senior prom"], ["IMG_2510.JPG", "A proud moment"]]
  },
  {
    title: "Dreams require <span>work.</span>",
    copy: "Dreams only work when you do, and you put the work in. You stayed focused, trusted the process, and kept moving forward when the road got heavy.",
    images: [["IMG_2504.JPG", "Dreams only work if you do"]]
  },
  {
    title: "Family is <span>everything.</span>",
    copy: "Wherever life takes you, remember the team that has always stood beside you. Our love is your foundation, and your success belongs to everyone you inspire.",
    layout: "stack",
    images: [["IMG_2507.JPG", "Love"], ["IMG_2513.JPG", "Our roots"]]
  },
  {
    title: "A legacy in <span>motion.</span>",
    copy: "You are carrying our name into a new chapter with strength, intelligence, and purpose. This is not the finish line. This is your launch.",
    layout: "stack",
    images: [["IMG_2501.JPG", "The next chapter"], ["IMG_2502.JPG", "Built different"]]
  },
  {
    title: "Go change the <span>world.</span>",
    copy: "Son, I may not be there in person, but my pride, love, and spirit are standing beside you. Congratulations, Jerry Mixon Jr. Keep rising, keep leading, and keep making history.",
    kicker: "Love always, Dad.",
    images: [["IMG_1965.JPG", "Then"], ["IMG_2507.JPG", "Now"], ["IMG_2502.JPG", "Next"]],
    className: "final"
  }
];

const book = document.querySelector("#book");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const pageNumber = document.querySelector("#pageNumber");
const chapterName = document.querySelector("#chapterName");
const progressFill = document.querySelector("#progressFill");
const progressTrack = document.querySelector("#progressTrack");
const soundButton = document.querySelector("#soundButton");
const soundLabel = document.querySelector("#soundLabel");
const fullscreenButton = document.querySelector("#fullscreenButton");
let current = 0;
let touchStartX = 0;

function pageTitle(title) {
  return title.replace(/<[^>]*>/g, "");
}

function renderChapters() {
  book.innerHTML = chapters.map((chapter, index) => {
    const gridClass = chapter.layout || (chapter.images.length === 1 ? "" : chapter.images.length === 2 ? "two" : "three");
    const photos = chapter.images.map(([file, label]) => `
      <figure class="photo">
        <img src="assets/photos/${file}" alt="${label}" loading="${index < 2 ? "eager" : "lazy"}">
        <figcaption class="photo-label">${label}</figcaption>
      </figure>`).join("");
    return `
      <section class="spread ${index === 0 ? "active" : ""} ${chapter.className || ""}" data-page="${index}" aria-hidden="${index !== 0}">
        <div class="page copy-page">
          <div class="chapter-index">Chapter ${String(index + 1).padStart(2, "0")}</div>
          <div class="copy-content">
            <h${index === 0 ? "1" : "2"}>${chapter.title}</h${index === 0 ? "1" : "2"}>
            <p>${chapter.copy}</p>
            ${chapter.kicker ? `<div class="signature">${chapter.kicker}</div>` : ""}
          </div>
          <div class="copy-footer">
            <span class="page-tag">Jerry Mixon Jr. / Graduation</span>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
          </div>
        </div>
        <div class="page media-page">
          <div class="photo-grid ${gridClass}">${photos}</div>
        </div>
      </section>`;
  }).join("");
}

function showPage(next, direction = 1) {
  if (next < 0 || next >= chapters.length || next === current) return;
  const spreads = [...document.querySelectorAll(".spread")];
  const old = spreads[current];
  const incoming = spreads[next];
  old.classList.add(direction > 0 ? "leaving-left" : "leaving-right");
  old.classList.remove("active");
  old.setAttribute("aria-hidden", "true");
  incoming.classList.add("active");
  incoming.setAttribute("aria-hidden", "false");
  window.setTimeout(() => old.classList.remove("leaving-left", "leaving-right"), 700);
  current = next;
  updateNav();
}

function updateNav() {
  prevButton.disabled = current === 0;
  nextButton.disabled = current === chapters.length - 1;
  pageNumber.textContent = `${String(current + 1).padStart(2, "0")} / ${chapters.length}`;
  chapterName.textContent = pageTitle(chapters[current].title);
  const percent = ((current + 1) / chapters.length) * 100;
  progressFill.style.width = `${percent}%`;
  progressTrack.setAttribute("aria-valuenow", String(current + 1));
}

prevButton.addEventListener("click", () => showPage(current - 1, -1));
nextButton.addEventListener("click", () => showPage(current + 1, 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") showPage(current + 1, 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") showPage(current - 1, -1);
});
book.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
book.addEventListener("touchend", event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 45) showPage(current + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
}, { passive: true });

fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
});

let audioContext;
let beatTimer;
let isPlaying = false;
const tempo = 90;

function noiseBuffer(ctx) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * .25, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function kick(ctx, time) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(140, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + .14);
  gain.gain.setValueAtTime(.55, time);
  gain.gain.exponentialRampToValueAtTime(.001, time + .22);
  osc.connect(gain).connect(ctx.destination);
  osc.start(time); osc.stop(time + .24);
}

function hat(ctx, time, level = .06) {
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = noiseBuffer(ctx);
  filter.type = "highpass"; filter.frequency.value = 6500;
  gain.gain.setValueAtTime(level, time);
  gain.gain.exponentialRampToValueAtTime(.001, time + .055);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(time); source.stop(time + .06);
}

function snare(ctx, time) {
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = noiseBuffer(ctx);
  filter.type = "bandpass"; filter.frequency.value = 1600;
  gain.gain.setValueAtTime(.16, time);
  gain.gain.exponentialRampToValueAtTime(.001, time + .16);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(time); source.stop(time + .17);
}

function chord(ctx, time, notes) {
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = i === 0 ? "triangle" : "sine";
    osc.frequency.value = freq;
    filter.type = "lowpass"; filter.frequency.value = 1100;
    gain.gain.setValueAtTime(.0001, time);
    gain.gain.exponentialRampToValueAtTime(.035, time + .04);
    gain.gain.exponentialRampToValueAtTime(.0001, time + 1.2);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(time); osc.stop(time + 1.25);
  });
}

function scheduleBar() {
  if (!isPlaying) return;
  const beat = 60 / tempo;
  const start = audioContext.currentTime + .06;
  const progression = [[110, 130.81, 164.81], [98, 123.47, 146.83], [82.41, 110, 130.81], [92.5, 116.54, 146.83]];
  const barIndex = Math.floor(start / (beat * 4)) % progression.length;
  chord(audioContext, start, progression[barIndex]);
  for (let step = 0; step < 8; step++) {
    const time = start + step * beat / 2;
    hat(audioContext, time, step % 2 ? .04 : .065);
    if (step === 0 || step === 5) kick(audioContext, time);
    if (step === 2 || step === 6) snare(audioContext, time);
  }
  beatTimer = window.setTimeout(scheduleBar, beat * 4 * 1000 - 80);
}

soundButton.addEventListener("click", () => {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  isPlaying = !isPlaying;
  soundButton.setAttribute("aria-pressed", String(isPlaying));
  soundLabel.textContent = isPlaying ? "Pause the beat" : "Play the beat";
  if (isPlaying) {
    const start = () => scheduleBar();
    if (audioContext.state === "suspended") audioContext.resume().then(start).catch(() => {});
    else start();
  } else {
    window.clearTimeout(beatTimer);
  }
});

renderChapters();
updateNav();
