// Renders the cards from courses.js — no need to edit this file to add courses.

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ARROW = '<i aria-hidden="true">←</i>';

function exampleRibbon(item) {
  return item.example ? '<span class="example">example</span>' : "";
}

function paidCard(c) {
  const media = c.image
    ? `<img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">`
    : `<div class="media-placeholder" aria-hidden="true"><span>Wellness</span></div>`;
  const features = (c.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
  const saving = c.oldPrice && c.price ? c.oldPrice - c.price : 0;
  return `
    <article class="card card-paid" data-reveal>
      ${exampleRibbon(c)}
      <div class="card-media">${media}</div>
      <div class="card-body">
        ${c.badge ? `<span class="badge">${esc(c.badge)}</span>` : ""}
        <h3>${esc(c.title)}</h3>
        ${c.description ? `<p class="desc">${esc(c.description)}</p>` : ""}
        ${features ? `<ul class="features">${features}</ul>` : ""}
        <div class="price-row">
          <span class="price">${esc(c.price)} <small>₪</small></span>
          ${c.oldPrice ? `<span class="old-price">${esc(c.oldPrice)} ₪</span>` : ""}
          ${saving > 0 ? `<span class="saving">חיסכון של ${saving} ₪</span>` : ""}
        </div>
        <a class="btn btn-pink" href="${esc(c.url || "#")}">${esc(c.buttonText || "לפרטים על הקורס")} ${ARROW}</a>
        ${c.payUrl ? `<a class="pay-link" href="${esc(c.payUrl)}">או מעבר ישיר לתשלום</a>` : ""}
      </div>
    </article>`;
}

function freeCard(g) {
  const tags = (g.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  return `
    <article class="card card-free" data-reveal>
      ${exampleRibbon(g)}
      <span class="badge">${esc(g.badge || "חינם")}</span>
      <h3>${esc(g.title)}</h3>
      ${g.description ? `<p class="desc">${esc(g.description)}</p>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      <a class="btn btn-outline" href="${esc(g.url || "#")}">${esc(g.buttonText || "למדריך")} ${ARROW}</a>
    </article>`;
}

function render(id, items, card, emptyText) {
  const el = document.getElementById(id);
  el.innerHTML = items.length ? items.map(card).join("") : `<div class="empty">${esc(emptyText)}</div>`;
}

render("paid-list", PAID_COURSES, paidCard, "קורסים חדשים בדרך");
render("free-list", FREE_GUIDES, freeCard, "מדריכים חינמיים יעלו בקרוב");
document.getElementById("year").textContent = new Date().getFullYear();

// Gentle fade-up for sections below the fold. Anything already on screen stays visible as is.
(function reveal() {
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
