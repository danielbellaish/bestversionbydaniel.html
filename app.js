// Renders content from courses.js and runs the page's motion. No need to edit this file to add content.

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ARROW = '<i aria-hidden="true">←</i>';
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Content ---------- */

function whatsappLink(text) {
  return LINKS.whatsapp ? `https://wa.me/${LINKS.whatsapp}?text=${encodeURIComponent(text || "")}` : "";
}

function courseCard(c) {
  const saving = c.oldPrice && c.price ? c.oldPrice - c.price : 0;
  const stats = (c.stats || []).map((s) => `<li>${esc(s)}</li>`).join("");
  const join = whatsappLink(c.whatsappText);
  const weeks = (c.weeks || []).map((w, i) => `<li><details class="week">
      <summary><span class="wk-n">שבוע ${i + 1}<small>ימים ${esc(w.days)}</small></span>
        <b class="wk-title">${esc(w.he)} <em>${esc(w.en)}</em></b><span class="wk-arrow" aria-hidden="true"></span></summary>
      <div class="wk-body"><span>${esc(w.text)}</span>
      ${(w.tags || []).length ? `<small class="wk-tags">${w.tags.map(esc).join(" · ")}</small>` : ""}</div></details></li>`).join("");
  const features = (c.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
  const faq = (c.faq || []).map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  return `
    <article class="course${c.image ? "" : " no-media"}" data-reveal>
      ${c.image ? `<div class="course-media">
        <div class="frame"><img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">
          <div class="stamp" aria-hidden="true"><span><b>30</b><small>DAYS</small></span></div></div>
      </div>` : ""}
      <div class="course-body">
        ${c.badge ? `<span class="badge">${esc(c.badge)}</span>` : ""}
        <h3${/^[A-Za-z]/.test(c.title) ? ' class="en-title"' : ""}>${esc(c.title)}</h3>
        ${c.subtitle ? `<p class="course-sub">${esc(c.subtitle)}</p>` : ""}
        ${c.description ? `<p class="desc">${esc(c.description)}</p>` : ""}
        ${stats ? `<ul class="stats">${stats}</ul>` : ""}
        ${features ? `<div class="block"><p class="block-h">${esc(c.featuresTitle || "מה בפנים")}</p><ul class="bonuses">${features}</ul></div>` : ""}
        ${weeks ? `<div class="block"><p class="block-h">המסע — 4 שבועות, 4 שלבים · לחצי על שבוע לפירוט</p><ol class="weeks">${weeks}</ol></div>` : ""}
        <div class="price-row">
          <span class="price">${esc(c.price)}<small>₪</small></span>
          ${c.oldPrice ? `<span class="old-price">${esc(c.oldPrice)} ₪</span>` : ""}
          ${saving > 0 ? `<span class="saving">חיסכון של ${saving} ₪</span>` : ""}
        </div>
        ${c.note ? `<p class="course-note">${esc(c.note)}</p>` : ""}
        <div class="course-ctas">
          ${join ? `<a class="btn btn-pink" href="${esc(join)}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whatsapp"/></svg>${esc(c.ctaText || "אני רוצה להצטרף")}</a>` : ""}
          ${c.detailsUrl ? `<a class="btn btn-ghost-pink" href="${esc(c.detailsUrl)}"${/^https?:/.test(c.detailsUrl) ? ' target="_blank" rel="noopener"' : ""}>לפרטים נוספים ${ARROW}</a>` : ""}
        </div>
        ${faq ? `<div class="faqs"><p class="block-h">שאלות נפוצות</p>${faq}</div>` : ""}
      </div>
    </article>`;
}

function freeCard(g) {
  const tags = (g.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const dl = g.download ? ` download="${esc(g.download)}"` : ' target="_blank" rel="noopener"';
  return `
    <article class="card card-free${g.image ? " has-cover" : ""}" data-reveal>
      ${g.image ? `<a class="guide-cover" href="${esc(g.url || "#")}"${dl} tabindex="-1" aria-hidden="true"><img src="${esc(g.image)}" alt="" loading="lazy"></a>` : ""}
      <div class="guide-body">
        <span class="badge">${esc(g.badge || "חינם")}</span>
        <h3>${esc(g.title)}</h3>
        ${g.subtitle ? `<p class="guide-sub">${esc(g.subtitle)}</p>` : ""}
        ${g.description ? `<p class="desc">${esc(g.description)}</p>` : ""}
        ${tags ? `<div class="tags">${tags}</div>` : ""}
        <a class="btn btn-outline" href="${esc(g.url || "#")}"${dl}>${esc(g.buttonText || "למדריך")} <i aria-hidden="true">↓</i></a>
      </div>
    </article>`;
}

const comingSoon = `
  <div class="coming" data-reveal>
    <p class="label">Coming soon</p>
    <h3>הטיפים והמדריכים בדרך</h3>
    <p>עקבי אחריי כדי לקבל אותם ראשונה — טיפים, שגרות ותוכן חינמי עולים שם כל שבוע.</p>
    <div class="follow">
      <a data-link="instagram" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-instagram"/></svg>Instagram</a>
      <a data-link="tiktok" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-tiktok"/></svg>TikTok</a>
    </div>
  </div>`;

document.getElementById("paid-list").innerHTML = PAID_COURSES.map(courseCard).join("");
document.getElementById("free-list").innerHTML = FREE_GUIDES.length ? FREE_GUIDES.map(freeCard).join("") : comingSoon;
const firstGuide = document.querySelector("#free-list .card");
if (firstGuide) firstGuide.id = "guide";
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

/* ---------- Hub counts + all-links list ---------- */

(function hub() {
  const n = PAID_COURSES.length;
  document.getElementById("hub-courses").textContent = n ? (n === 1 ? "אתגר אחד פתוח עכשיו" : `${n} פתוחים עכשיו`) : "בקרוב";
  document.getElementById("hub-tips").textContent = FREE_GUIDES.length ? (FREE_GUIDES.length === 1 ? "מדריך חינמי להורדה" : `${FREE_GUIDES.length} מדריכים להורדה`) : "בקרוב";
  document.getElementById("hub-podcast").textContent = podcastLive ? "באוויר" : "בקרוב";

  const rows = [
    { key: "instagram", icon: "#i-instagram", title: "Instagram", sub: "@daniel_bellaish" },
    { key: "tiktok", icon: "#i-tiktok", title: "TikTok", sub: "@daniel.bellaish" },
    { key: "spotify", icon: "#i-spotify", title: "הפודקאסט ב־Spotify", sub: "בקרוב" },
    { key: "applePodcasts", icon: "#i-apple-podcasts", title: "הפודקאסט ב־Apple Podcasts", sub: "בקרוב" },
  ].map((r) => {
    const url = LINKS[r.key];
    const live = Boolean(url);
    const sub = live && r.sub === "בקרוב" ? "האזינו עכשיו" : r.sub;
    return `<a class="link-row${live ? "" : " soon"}" ${live ? `href="${esc(url)}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>
      <span class="lr-ico"><svg aria-hidden="true"><use href="${r.icon}"/></svg></span>
      <span class="lr-text"><b>${esc(r.title)}</b><small>${esc(sub)}</small></span>
      <i aria-hidden="true">${live ? "←" : "בקרוב"}</i></a>`;
  });
  const courseRows = PAID_COURSES.map((c) => `<a class="link-row" href="${esc(c.detailsUrl || whatsappLink(c.whatsappText) || "#course")}"${!c.detailsUrl && c.whatsappText ? ' target="_blank" rel="noopener"' : ""}>
      <span class="lr-ico ico-star" aria-hidden="true">✦</span>
      <span class="lr-text"><b>${esc(c.title)}</b><small>${esc(c.badge || "אתגר")}${c.price ? ` · ${esc(c.price)} ₪` : ""}</small></span>
      <i aria-hidden="true">←</i></a>`);
  const guideRows = FREE_GUIDES.map((g) => `<a class="link-row" href="${esc(g.url || "#free")}"${g.download ? ` download="${esc(g.download)}"` : ' target="_blank" rel="noopener"'}>
      <span class="lr-ico ico-star" aria-hidden="true">↓</span>
      <span class="lr-text"><b>${esc(g.title)}</b><small>${esc(g.badge || "מדריך חינם")} · להורדה</small></span>
      <i aria-hidden="true">←</i></a>`);
  document.getElementById("links-list").innerHTML = courseRows.concat(guideRows, rows).join("");
})();

/* ---------- Intro: 0→100%, arrow hits the gold target, it bursts, brand name, then the site ---------- */

(function intro() {
  const root = document.documentElement;
  const loader = document.getElementById("loader");
  if (!root.classList.contains("is-loading")) { loader.remove(); return; }

  const fill = document.getElementById("loader-fill");
  const arrow = document.getElementById("loader-arrow");
  const pct = document.getElementById("loader-pct");
  const burst = document.getElementById("burst");
  const DURATION = 2600;
  let loaded = document.readyState === "complete";
  addEventListener("load", () => { loaded = true; });

  // gold + pink particles for the burst
  const colors = ["var(--gold)", "var(--gold)", "var(--pink-deep)", "var(--pink)", "#d9b56a"];
  let parts = "";
  for (let k = 0; k < 44; k++) {
    const a = (k / 44) * Math.PI * 2 + Math.random() * 0.3;
    const d = 90 + Math.random() * 170;
    parts += `<span style="--x:${(Math.cos(a) * d).toFixed(0)}px;--y:${(Math.sin(a) * d).toFixed(0)}px;--s:${(5 + Math.random() * 8).toFixed(1)}px;--c:${colors[k % colors.length]};animation-delay:${(Math.random() * 0.12).toFixed(2)}s"></span>`;
  }
  burst.innerHTML = parts;

  const start = performance.now();
  let finished = false;
  function frame(now) {
    let p = Math.min(1, (now - start) / DURATION);
    p = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   // ease-in-out
    if (!loaded) p = Math.min(p, 0.99);      // hold at 99% until the page has loaded
    const v = Math.round(p * 100);
    pct.textContent = v;
    fill.style.width = `${p * 100}%`;
    arrow.style.right = `${p * 100}%`;
    if (v >= 100) return hit();
    requestAnimationFrame(frame);
  }
  function hit() {
    if (finished) return;
    finished = true;
    loader.classList.add("hit");
    setTimeout(() => loader.classList.add("done"), 1000);
    setTimeout(leave, 3200);
  }
  function leave() {
    loader.classList.add("out");
    root.classList.remove("is-loading");
    try { sessionStorage.setItem("fwp-intro", "1"); } catch (e) {}
    setTimeout(() => loader.remove(), 1100);
  }
  // tap / key skips the intro
  loader.addEventListener("click", () => { finished = true; leave(); });
  addEventListener("keydown", function skip() { if (!finished) { finished = true; leave(); } removeEventListener("keydown", skip); });
  requestAnimationFrame(frame);
})();

/* ---------- Scroll: side arrow travels to the target, marquee ---------- */

(function scrollFx() {
  const fill = document.getElementById("ab-fill");
  const head = document.getElementById("ab-head");
  const label = document.getElementById("ab-pct");
  const target = document.getElementById("ab-target");
  const marquee = document.getElementById("marquee");
  let ticking = false;

  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    fill.style.height = `${p * 100}%`;
    head.style.top = `${p * 100}%`;
    label.textContent = `${Math.round(p * 100)}%`;
    target.classList.toggle("hit", p > 0.995);
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

/* ---------- Deep links (e.g. #guide): jump there once the cards are on the page ---------- */

(function deepLink() {
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  target.classList.remove("pre");
  target.classList.add("in");
  const go = () => {
    const header = document.querySelector(".topbar");
    const y = target.getBoundingClientRect().top + scrollY - (header ? header.offsetHeight : 0) - 24;
    scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };
  setTimeout(go, 300);
  addEventListener("load", () => setTimeout(go, 100), { once: true });
})();
