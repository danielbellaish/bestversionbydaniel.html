// Renders content from courses.js and runs the page's motion. No need to edit this file to add content.

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ARROW = '<i aria-hidden="true">←</i>';
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Content ---------- */

function courseCard(c) {
  const saving = c.oldPrice && c.price ? c.oldPrice - c.price : 0;
  const features = (c.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
  return `
    <article class="course" data-reveal>
      <div class="course-media">
        <div class="frame">${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">` : ""}</div>
        <div class="stamp" aria-hidden="true"><span><b>30</b><small>DAYS</small></span></div>
      </div>
      <div class="course-body">
        ${c.badge ? `<span class="badge">${esc(c.badge)}</span>` : ""}
        <h3>${esc(c.title)}</h3>
        ${c.description ? `<p class="desc">${esc(c.description)}</p>` : ""}
        ${features ? `<ul class="features">${features}</ul>` : ""}
        <div class="price-row">
          <span class="price">${esc(c.price)}<small>₪</small></span>
          ${c.oldPrice ? `<span class="old-price">${esc(c.oldPrice)} ₪</span>` : ""}
          ${saving > 0 ? `<span class="saving">חיסכון של ${saving} ₪</span>` : ""}
        </div>
        <a class="btn btn-pink" href="${esc(c.url || "#")}" target="_blank" rel="noopener">${esc(c.buttonText || "לפרטים על הקורס")} ${ARROW}</a>
        ${c.payUrl ? `<a class="pay-link" href="${esc(c.payUrl)}" target="_blank" rel="noopener">או מעבר ישיר לתשלום</a>` : ""}
      </div>
    </article>`;
}

function freeCard(g) {
  const tags = (g.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  return `
    <article class="card card-free" data-reveal>
      <span class="badge">${esc(g.badge || "חינם")}</span>
      <h3>${esc(g.title)}</h3>
      ${g.description ? `<p class="desc">${esc(g.description)}</p>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      <a class="btn btn-outline" href="${esc(g.url || "#")}" target="_blank" rel="noopener">${esc(g.buttonText || "למדריך")} ${ARROW}</a>
    </article>`;
}

const comingSoon = `
  <div class="coming" data-reveal>
    <p class="label">Coming soon</p>
    <h3>המדריכים החינמיים בדרך</h3>
    <p>עקבי אחריי כדי לקבל אותם ראשונה — טיפים, שגרות ותוכן חינמי עולים שם כל שבוע.</p>
    <div class="follow">
      <a data-link="instagram" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-instagram"/></svg>Instagram</a>
      <a data-link="tiktok" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-tiktok"/></svg>TikTok</a>
    </div>
  </div>`;

document.getElementById("paid-list").innerHTML = PAID_COURSES.map(courseCard).join("");
document.getElementById("free-list").innerHTML = FREE_GUIDES.length ? FREE_GUIDES.map(freeCard).join("") : comingSoon;
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Links ---------- */

document.querySelectorAll("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) a.href = url;
  else a.hidden = true;
});

const podcastLive = Boolean(LINKS.spotify || LINKS.applePodcasts);
document.querySelectorAll("[data-podcast]").forEach((a) => {
  const url = LINKS[a.dataset.podcast];
  if (url) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.classList.add("soon");
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
  }
});
if (podcastLive) {
  document.getElementById("announce-text").textContent = "הפודקאסט שלי באוויר — האזינו עכשיו";
  document.querySelector(".podcast h2").innerHTML = "הפודקאסט <em>באוויר</em>";
  document.getElementById("podcast-note").hidden = true;
}

/* ---------- Podcast waveform ---------- */

(function wave() {
  const el = document.getElementById("wave");
  const n = innerWidth < 760 ? 34 : 44;
  let html = "";
  for (let k = 0; k < n; k++) {
    const h = 0.25 + 0.75 * Math.abs(Math.sin(k * 0.55) * Math.cos(k * 0.21));
    html += `<i style="height:${Math.round(h * 100)}%;animation-delay:${(-Math.random() * 1.4).toFixed(2)}s;animation-duration:${(0.9 + Math.random() * 0.9).toFixed(2)}s"></i>`;
  }
  el.innerHTML = html;
})();

/* ---------- Scroll: progress path Day 01→30, marquee ---------- */

(function scrollFx() {
  const fill = document.querySelector(".path-fill");
  const day = document.getElementById("path-day");
  const stage = document.getElementById("path-stage");
  const stones = [...document.querySelectorAll(".path .ms")];
  const STAGES = ["מתחילה", "בונה הרגלים", "נכנסת לשגרה", "הגרסה הכי טובה שלך ✦"];
  const marquee = document.getElementById("marquee");
  let ticking = false;

  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    const d = 1 + Math.round(p * 29);
    fill.style.width = `${p * 100}%`;
    day.textContent = String(d).padStart(2, "0");
    const idx = d >= 30 ? 3 : d >= 20 ? 2 : d >= 10 ? 1 : 0;
    stage.textContent = STAGES[idx];
    stones.forEach((s, k) => {
      s.classList.toggle("done", k <= idx);
      s.classList.toggle("now", k === idx);
    });
  }

  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", update);
  update();
  if (!reduceMotion) {
    // marquee drifts on its own and speeds up with scrolling
    let t = 0;
    const drift = () => {
      t += 0.35;
      const half = marquee.scrollWidth / 2 || 1;
      marquee.style.transform = `translateX(${-((t + scrollY * 0.4) % half)}px)`;
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  }
})();

/* ---------- Reveal sections below the fold ---------- */

(function reveal() {
  if (!("IntersectionObserver" in window) || reduceMotion) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    const siblings = [...el.parentElement.children].filter((s) => s.hasAttribute("data-reveal"));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 3) * 0.12}s`;
    el.classList.add("pre");
    io.observe(el);
  });
})();
