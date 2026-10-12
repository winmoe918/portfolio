// Recreates Carrd's "onvisible" effects used on johan.co, plus count-up and card tilt.
//
// Markup API:
//   data-reveal="fade-up | fade-down | fade-left | fade-right | fade-in"
//   data-intensity="0..5"        distance = 1.5rem × intensity (default 1)
//   data-stagger="125"           ms between children (or words, with data-split)
//   data-split="words"           wraps each word so it can stagger
//   data-delay="200"             ms before the effect starts
//   data-count="290"             counts up from 0 (data-prefix / data-suffix)
//   data-tilt                    tilts toward the cursor (fine pointers only)

type Effect = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-in";

const SPEED = 1; // seconds, as on johan.co
const DIRECTION: Record<Effect, [number, number]> = {
  "fade-up": [0, 1],
  "fade-down": [0, -1],
  "fade-left": [1, 0],
  "fade-right": [-1, 0],
  "fade-in": [0, 0],
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitWords(el: HTMLElement): void {
  const walk = (node: Node): void => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(part);
          } else {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = part;
            frag.append(span);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        // A gradient phrase animates as one unit so its gradient runs across all its words
        if (el.classList.contains("grad")) el.classList.add("word");
        else if (!el.classList.contains("word")) walk(el);
      }
    }
  };
  walk(el);
}

function targetsOf(el: HTMLElement): HTMLElement[] {
  if (!el.dataset.stagger) return [el];
  if (el.dataset.split === "words") return Array.from(el.querySelectorAll<HTMLElement>(".word"));
  return Array.from(el.children) as HTMLElement[];
}

function rewind(el: HTMLElement): void {
  const effect = (el.dataset.reveal as Effect) || "fade-up";
  const intensity = Number(el.dataset.intensity ?? 1);
  const [dx, dy] = DIRECTION[effect] ?? DIRECTION["fade-up"];
  const delay = Number(el.dataset.delay ?? 0) / 1000;
  const stagger = Number(el.dataset.stagger ?? 0) / 1000;

  targetsOf(el).forEach((t, i) => {
    const d = delay + stagger * i;
    t.style.opacity = "0";
    t.style.transform = `translate(${dx * 1.5 * intensity}rem, ${dy * 1.5 * intensity}rem)`;
    t.style.transition = `opacity ${SPEED}s ease ${d}s, transform ${SPEED}s ease ${d}s`;
  });
}

function play(el: HTMLElement): void {
  targetsOf(el).forEach((t) => {
    t.style.opacity = "1";
    t.style.transform = "none";
  });
  el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
  if (el.dataset.count) countUp(el);
}

function format(n: number, el: HTMLElement): string {
  return `${el.dataset.prefix ?? ""}${Math.round(n).toLocaleString("en-US")}${el.dataset.suffix ?? ""}`;
}

function countUp(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (reduceMotion || el.dataset.counted) {
    el.textContent = format(target, el);
    return;
  }
  el.dataset.counted = "1";
  const duration = 1200;
  const start = performance.now();
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased, el);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initTilt(el: HTMLElement): void {
  const MAX = 4; // degrees
  el.style.transition = "transform 0.4s ease";
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
}

function init(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  els.filter((el) => el.dataset.split === "words").forEach(splitWords);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
  } else {
    els.forEach(rewind);
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      el.textContent = format(0, el);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          play(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));

    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(initTilt);
    }
  }

  // Reveal the page once images and fonts have loaded (Carrd's is-loading → is-playing).
  // Videos use preload="none", so they don't hold this up.
  const reveal = (): void => {
    requestAnimationFrame(() => document.documentElement.classList.remove("is-loading"));
  };
  if (document.readyState === "complete") reveal();
  else addEventListener("load", reveal, { once: true });
}

init();
