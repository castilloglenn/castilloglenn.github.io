/* ============================================================
   ✏️  EDIT ME — add, remove, or change any reason below.
   Just keep each one inside quotes, separated by commas.
   ============================================================ */
const reasons = [
  "The way you look at me when you think I can't see. Those eyes are my favorite place in the world.",
  "You make ordinary days feel like little adventures.",
  "The way you make me feel like I can do anything.",
  "Your kindness — to me, and to everyone around you.",
  "The way you believe in me, even when I don't.",
  "Every late-night talk that I never want to end.",
  "How safe and calm I feel just being next to you.",
  "Your smile. Honestly, that one could be the whole list.",
  "The way you make me want to be a little better every day.",
  "That you're you — and you chose me.",
];

const grid = document.getElementById("grid");

reasons.forEach((text, i) => {
  const card = document.createElement("button");
  card.className = "card relative cursor-pointer border-0 bg-transparent p-0";
  card.type = "button";
  card.style.animationDelay = 0.15 * i + 0.6 + "s";
  card.setAttribute("aria-pressed", "false");
  card.setAttribute("aria-label", "Reason number " + (i + 1) + ", tap to reveal");

  card.innerHTML =
    '<div class="card-inner">' +
    '<div class="face face-front flex flex-col items-center justify-center p-6 text-white">' +
    '<div class="mb-1 text-4xl drop-shadow">💗</div>' +
    '<div class="font-script text-5xl font-bold leading-none drop-shadow">No. ' +
    (i + 1) +
    "</div>" +
    '<div class="mt-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-85">tap me</div>' +
    "</div>" +
    '<div class="face face-back flex flex-col items-center justify-center border border-blush p-6 text-plum">' +
    '<div class="text-base font-medium leading-snug sm:text-lg">' +
    text +
    "</div>" +
    '<div class="mt-3 text-xl">💞</div>' +
    "</div>" +
    "</div>";

  card.addEventListener("click", () => {
    const open = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(open));
  });

  grid.appendChild(card);
});

document.getElementById("count").textContent = reasons.length;

/* ---------- floating hearts ---------- */
const heartsLayer = document.querySelector(".hearts");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glyphs = ["💕", "💖", "💗", "🩷", "💞", "🌸"];
if (!reduce) {
  for (let i = 0; i < 16; i++) {
    const h = document.createElement("span");
    h.textContent = glyphs[i % glyphs.length];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
    h.style.animationDuration = 9 + Math.random() * 10 + "s";
    h.style.animationDelay = -(Math.random() * 12) + "s";
    heartsLayer.appendChild(h);
  }
}
