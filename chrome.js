// Active-link highlight + dynamic year counters.
// Nav and footer markup are static-rendered in each HTML file (see Section 8).
(function () {
  const rawPath = location.pathname.replace(/\/$/, "") || "/";
  const last = rawPath.split("/").pop();
  const pathKey = !last || last === "index" || last === "index.html"
    ? "home"
    : last.replace(/\.html$/, "");

  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === pathKey) a.classList.add("is-active");
  });

  const currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-years-since]").forEach((el) => {
    const start = parseInt(el.dataset.yearsSince, 10);
    if (!isNaN(start)) el.textContent = currentYear - start;
  });
})();
