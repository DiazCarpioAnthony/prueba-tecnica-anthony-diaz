(() => {
  "use strict";

  // ====== CONFIGURABLE ======
  const CONFIG = {
    titulo: "Título del banner",
    descripcion: "Descripción del banner. Texto genérico editable.",
    textoBoton: "Conoce más",
    urlBoton: "https://interbank.pe/",
    urlBannerDesktop:
      "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/91/911ccfca-1556-4090-97d2-4c4f608dda13/img-hero_facturacion_educativo-pase-cuotas_desktop_2x.jpg",
    urlBannerMobile:
      "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/57/57f76b50-0937-472a-b1cb-685cf768943f/img-hero_facturacion_educativo-pase-cuotas_mobile_2x.jpg",
    // Tercer campo de imagen (el sitio también usa tablet ~768px). Por defecto = mobile.
    urlBannerTablet:
      "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/5d/5d953226-6d6c-43b8-9483-db79117b5cfe/img-hero_facturacion_educativo-pase-cuotas_tablet_2x.jpg",
  };

  const STYLE_ID = "ibk-hero-banner1-bg";
  const BG_CLASS = "o-hero__slide__bg--ibkcfg";

  function qs(root, sel) {
    try {
      return (root || document).querySelector(sel);
    } catch (_) {
      return null;
    }
  }

  function getFirstBanner() {
    const slider = qs(document, ".o-hero-slider");
    if (!slider) return null;
    return (
      qs(slider, ".o-hero__wrapper") ||
      qs(slider, ".o-hero.is-active") ||
      qs(slider, ".o-hero")
    );
  }

  function applyText(banner) {
    const title = qs(banner, ".o-hero__title");
    const desc = qs(banner, ".o-hero__description p") || qs(banner, ".o-hero__description");
    const cta = qs(banner, ".o-hero__cta a.a-button");
    const ctaText = cta && qs(cta, ".a-button__text");

    if (title) title.textContent = CONFIG.titulo;
    if (desc) desc.textContent = CONFIG.descripcion;

    if (cta) {
      cta.setAttribute("href", CONFIG.urlBoton);
      cta.setAttribute("title", CONFIG.textoBoton);
      if (ctaText) ctaText.textContent = CONFIG.textoBoton;
      else cta.textContent = CONFIG.textoBoton;
    }
  }

  function applyBackground(banner) {
    const bg = qs(banner, ".o-hero__slide__bg");
    if (!bg) return;

    // Quita clases de fondo originales (ej. o-hero__slide__bg--annno) y usa una propia
    Array.from(bg.classList).forEach((cls) => {
      if (cls.indexOf("o-hero__slide__bg--") === 0 && cls !== "o-hero__slide__bg") {
        bg.classList.remove(cls);
      }
    });
    bg.classList.add(BG_CLASS);

    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    const mobile = CONFIG.urlBannerMobile;
    const tablet = CONFIG.urlBannerTablet || mobile;
    const desktop = CONFIG.urlBannerDesktop;

    style.textContent =
      "." + BG_CLASS + "{background-image:url(\"" + mobile + "\") !important;}" +
      "@media screen and (min-width:768px){." + BG_CLASS + "{background-image:url(\"" + tablet + "\") !important;}}" +
      "@media screen and (min-width:1024px){." + BG_CLASS + "{background-image:url(\"" + desktop + "\") !important;}}";
  }

  function apply() {
    const banner = getFirstBanner();
    if (!banner) return false;
    if (banner.getAttribute("data-ibk-banner1") === "1") return true;

    applyText(banner);
    applyBackground(banner);
    banner.setAttribute("data-ibk-banner1", "1");
    return true;
  }

  function start() {
    if (apply()) return;

    const obs = new MutationObserver(() => {
      if (apply()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });

    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (apply() || tries > 40) {
        clearInterval(timer);
        obs.disconnect();
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
