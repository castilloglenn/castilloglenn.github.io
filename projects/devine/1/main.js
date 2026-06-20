/* ============================================================
   ✏️  EDIT ME — your story, one moment at a time.

   Each moment becomes one full-screen slide.
   • date : the handwritten line on top (a date, milestone, or place)
   • text : the caption underneath
   • img  : path to your photo, e.g. "assets/photos/01.jpg"
            Leave it as "" to show a pretty placeholder for now.

   To add real photos later: drop them in projects/devine/1/assets/photos/
   and set each img to its path. That's it.
   ============================================================ */
const moments = [
  { date: "How it started", text: "The day our story began.", img: "assets/photos/0.jpeg" },
  { date: "Our first date", text: "I was so nervous — and so happy.", img: "" },
  { date: "That trip", text: "Everywhere feels like home with you.", img: "" },
  { date: "Just us", text: "My favorite kind of ordinary day.", img: "" },
  { date: "Lately", text: "Falling for you a little more, every day.", img: "" },
];

/* ---- inline SVGs from Heroicons (free, MIT) ---- */
const CAMERA_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>';
const CHEVRON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>';
const REPLAY_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>';

const story = document.getElementById("story");

/* ---------- build the slides: intro → photos → outro ---------- */
const slidesHTML = [];

// intro
slidesHTML.push(
  '<section class="slide intro">' +
    '<p class="text-sm font-semibold uppercase tracking-[0.28em] text-rose-deep">our story</p>' +
    '<h1 class="font-script text-6xl font-bold leading-none text-rose-deep">For Devine 💕</h1>' +
    '<p class="mt-3 max-w-xs text-base text-plum-soft">every moment of us, <span class="love-phrase">one at a time</span></p>' +
    '<div class="hint">swipe up' + CHEVRON_SVG + "</div>" +
    "</section>"
);

// photo moments
moments.forEach((m, i) => {
  const kb = "kb" + ((i % 4) + 1);
  let media;
  if (m.img) {
    // real photo: loaded lazily by the loader observer below; a shimmer
    // skeleton shows until the image is ready, then crossfades in.
    media =
      '<div class="photo lazy ' + kb + '" data-src="' + m.img + '"></div>' +
      '<div class="skeleton"><span>💞</span></div>';
  } else {
    const ph = "ph" + ((i % 4) + 1);
    media =
      '<div class="photo is-placeholder ' + kb + " " + ph + '">' +
      CAMERA_SVG +
      '<span class="text-sm font-medium">Photo ' + (i + 1) + " · add yours</span>" +
      "</div>";
  }
  slidesHTML.push(
    '<section class="slide">' +
      media +
      '<div class="scrim"></div>' +
      '<div class="caption">' +
      '<div class="date">' + m.date + "</div>" +
      '<div class="text">' + m.text + "</div>" +
      "</div>" +
      "</section>"
  );
});

// outro
slidesHTML.push(
  '<section class="slide outro">' +
    '<p class="text-sm font-semibold uppercase tracking-[0.28em] text-rose-deep">and so</p>' +
    '<h1 class="font-script text-7xl font-bold leading-none"><span class="love-phrase">I love you</span></h1>' +
    '<p class="mt-3 max-w-xs text-base text-plum-soft">…and this is only the beginning. 💌</p>' +
    '<button id="replay" class="replay" type="button">' + REPLAY_SVG + "play it again</button>" +
    "</section>"
);

story.innerHTML = slidesHTML.join("");

const slides = Array.from(story.querySelectorAll(".slide"));

/* ---------- progress bars ---------- */
const bars = document.getElementById("bars");
slides.forEach(() => bars.appendChild(document.createElement("i")));
const segments = Array.from(bars.children);

function setActive(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  segments.forEach((seg, i) => seg.classList.toggle("on", i <= index));
}

/* ---------- track the slide in view ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const index = slides.indexOf(entry.target);
        setActive(index);
        if (index > 0) story.classList.add("scrolled");
      }
    });
  },
  { root: story, threshold: [0.6] }
);
slides.forEach((s) => io.observe(s));
setActive(0);

/* ---------- lazy-load photos ~1.5 screens before they're reached ---------- */
const loader = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const slide = entry.target;
      const photo = slide.querySelector(".photo.lazy");
      loader.unobserve(slide);
      if (!photo) return;

      const img = new Image();
      // reveal the slide (crossfading skeleton → photo) once decoded, or
      // even on error, so a missing file never leaves a stuck shimmer.
      const reveal = () => {
        photo.style.backgroundImage = "url('" + photo.dataset.src + "')";
        slide.classList.add("loaded");
      };
      img.onload = reveal;
      img.onerror = reveal;
      img.src = photo.dataset.src;
    });
  },
  { root: story, rootMargin: "150% 0px" }
);
slides.forEach((s) => {
  if (s.querySelector(".photo.lazy")) loader.observe(s);
});

/* ---------- tap anywhere to advance (story-style) ---------- */
slides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    const next = slides[i + 1];
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------- replay: jump back to the first slide ---------- */
const replay = document.getElementById("replay");
if (replay) {
  replay.addEventListener("click", (e) => {
    e.stopPropagation();
    slides[0].scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- floating hearts ---------- */
const heartsLayer = document.querySelector(".hearts");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glyphs = ["💕", "💖", "💗", "🩷", "💞"];
if (!reduce) {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("span");
    h.textContent = glyphs[i % glyphs.length];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
    h.style.animationDuration = 9 + Math.random() * 9 + "s";
    h.style.animationDelay = -(Math.random() * 12) + "s";
    heartsLayer.appendChild(h);
  }
}
