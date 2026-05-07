// Shared chrome (nav + footer) injected client-side so the three pages stay in sync.
(function () {
  const path = location.pathname.split("/").pop() || "index.html";

  const navHTML = `
    <nav class="nav" aria-label="Primary">
      <div class="shell nav-inner">
        <a class="nav-name" href="index.html" aria-label="Ademar Tutor — home">
          <span class="sigil" aria-hidden="true"></span>
          <span>Ademar Tutor</span>
        </a>
        <div class="nav-links">
          <a href="projects.html" data-page="projects.html">projects</a>
          <a href="https://blog.ademartutor.com" target="_blank" rel="noopener">writing</a>
          <a href="about.html" data-page="about.html">about</a>
          <a href="mailto:hey@ademartutor.com">email</a>
        </div>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer class="footer shell" role="contentinfo">
      <div class="left">
        <span>© 2026 Ademar Tutor</span>
        <span>Hamilton · NZ</span>
      </div>
      <div class="left">
        <a href="https://github.com/iamademar" target="_blank" rel="noopener">github</a>
        <a href="https://nz.linkedin.com/in/ademar-tutor-0a95972a" target="_blank" rel="noopener">linkedin</a>
        <a href="https://blog.ademartutor.com" target="_blank" rel="noopener">writing</a>
        <a href="mailto:hey@ademartutor.com">email</a>
      </div>
    </footer>
  `;

  // inject nav at top of body
  const navMount = document.getElementById("nav-mount");
  if (navMount) navMount.outerHTML = navHTML;

  const footerMount = document.getElementById("footer-mount");
  if (footerMount) footerMount.outerHTML = footerHTML;

  // active link
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === path) a.classList.add("is-active");
  });

  // dynamic year counters (data-years-since="YYYY")
  const currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-years-since]").forEach((el) => {
    const start = parseInt(el.dataset.yearsSince, 10);
    if (!isNaN(start)) el.textContent = currentYear - start;
  });
})();
