(function () {
  var GA_ID = "G-WLPY0DLWXF";
  var STORAGE_KEY = "at_consent_v1";

  var EU_TZ_PREFIXES = ["Europe/", "Atlantic/Azores", "Atlantic/Madeira", "Atlantic/Canary", "Atlantic/Faroe", "Atlantic/Reykjavik"];
  var NON_EU_EUROPE_TZ = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Europe/Volgograd", "Europe/Saratov", "Europe/Astrakhan", "Europe/Kirov", "Europe/Ulyanovsk", "Europe/Simferopol", "Europe/Minsk", "Europe/Istanbul"];

  function detectEU() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (NON_EU_EUROPE_TZ.indexOf(tz) !== -1) return false;
      for (var i = 0; i < EU_TZ_PREFIXES.length; i++) {
        if (tz.indexOf(EU_TZ_PREFIXES[i]) === 0) return true;
      }
      return false;
    } catch (e) {
      return true;
    }
  }

  function readConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  var isEU = detectEU();
  var stored = readConsent();
  var defaultGranted = !isEU || stored === "granted";

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: defaultGranted ? "granted" : "denied",
    wait_for_update: 500
  });

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  function updateConsent(granted) {
    gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
    writeConsent(granted ? "granted" : "denied");
  }

  function buildBanner() {
    if (document.getElementById("at-consent")) return;

    var wrap = document.createElement("div");
    wrap.id = "at-consent";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-live", "polite");
    wrap.setAttribute("aria-label", "Cookie consent");
    wrap.innerHTML =
      '<div class="at-consent__inner">' +
        '<p class="at-consent__text">' +
          'This site uses Google Analytics to understand how visitors use it. ' +
          'No personal data is shared with third parties beyond what GA collects. ' +
          '<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Learn more</a>.' +
        '</p>' +
        '<div class="at-consent__actions">' +
          '<button type="button" class="at-consent__btn at-consent__btn--reject" data-consent="reject">Reject</button>' +
          '<button type="button" class="at-consent__btn at-consent__btn--accept" data-consent="accept">Accept</button>' +
        '</div>' +
      '</div>';

    wrap.addEventListener("click", function (e) {
      var t = e.target.closest("[data-consent]");
      if (!t) return;
      var granted = t.getAttribute("data-consent") === "accept";
      updateConsent(granted);
      wrap.remove();
    });

    document.body.appendChild(wrap);
  }

  function showBannerIfNeeded() {
    if (!isEU) return;
    if (stored === "granted" || stored === "denied") return;
    if (document.body) {
      buildBanner();
    } else {
      document.addEventListener("DOMContentLoaded", buildBanner);
    }
  }

  function bindSettingsLinks() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-cookie-settings]");
      if (!link) return;
      e.preventDefault();
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
      stored = null;
      buildBanner();
    });
  }

  showBannerIfNeeded();
  bindSettingsLinks();
})();
