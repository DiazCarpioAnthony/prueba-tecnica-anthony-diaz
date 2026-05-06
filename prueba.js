(() => {
    const CONFIG = {
      SLIDE_INTERVAL_MS: 4000,
    };
   
    const UNIQUE_ID = "ibk-target-mobile-menu-carousel-v1";
    if (window._IBK_CAROUSEL_INITED) return;
    window._IBK_CAROUSEL_INITED = true;
   
    const SLIDES = [
      {
        title: "Tienes un préstamos preaprobado",
        subtitle: "Solo por tiempo limitado",
        cta: "Lo quiero.",
        href: "https://interbank.pe/solicitar/prestamo/efectivo/inicio",
        bg: "",
      },
      {
        title: "Participa por 20,000 millas.",
        subtitle: "Tienes un Extracash esperando",
        cta: "Pídelo ahora",
        href: "https://interbank.pe/solicitar/tarjeta/extracash/inicio",
        bg: "",
      },
    ];
   
    function qs(root, sel) {
      try {
        return root.querySelector(sel);
      } catch (_) {
        return null;
      }
    }
    function qsa(root, sel) {
      try {
        return Array.from(root.querySelectorAll(sel));
      } catch (_) {
        return [];
      }
    }
    function el(tag, attrs) {
      const n = document.createElement(tag);
      if (attrs) {
        Object.entries(attrs).forEach(([k, v]) => {
          if (k === "class") n.className = v;
          else if (k === "style") n.setAttribute("style", v);
          else if (k === "text") n.textContent = v;
          else n.setAttribute(k, v);
        });
      }
      return n;
    }
    function ensureStyles() {
      if (qs(document, `style[data-${UNIQUE_ID}]`)) return;
      const s = el("style", { [`data-${UNIQUE_ID}`]: "1" });
      s.textContent = `
        .${UNIQUE_ID} {
          width: 100%;
          box-sizing: border-box;
          margin: 14px 0 6px 0;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 6px 18px rgba(0,0,0,.08);
          background: #f5f7fb;
        }
        .${UNIQUE_ID} * { box-sizing: border-box; }
        .${UNIQUE_ID}__viewport {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 70%;
          overflow: hidden;
        }
        .${UNIQUE_ID}__track {
          position: absolute;
          inset: 0;
          display: flex;
          width: 200%;
          height: 100%;
          transform: translate3d(0,0,0);
          transition: transform 450ms ease;
          will-change: transform;
        }
        .${UNIQUE_ID}__slide {
          width: 50%;
          height: 100%;
          position: relative;
          color: #fff;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          display: flex;
          align-items: stretch;
        }
        .${UNIQUE_ID}__overlay {
          position: absolute;
          inset: 0;
          background: transparent;
        }
        .${UNIQUE_ID}__content {
          position: relative;
          z-index: 1;
          padding: 18px 16px 44px 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
        }
        .${UNIQUE_ID}__title {
          font-size: 18px;
          line-height: 1.15;
          font-weight: 800;
          margin: 0;
        }
        .${UNIQUE_ID}__subtitle {
          font-size: 14px;
          line-height: 1.25;
          font-weight: 600;
          opacity: .95;
          margin: 0;
        }
        .${UNIQUE_ID}__cta {
          margin-top: 6px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.92);
          color: #0b1f3a;
          font-weight: 800;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: .2px;
        }
        .${UNIQUE_ID}__cta:active { transform: translateY(1px); }
        .${UNIQUE_ID}__dots {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 10px;
          display: flex;
          gap: 8px;
          justify-content: center;
          z-index: 2;
          pointer-events: auto;
        }
        .${UNIQUE_ID}__dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.8);
          background: rgba(255,255,255,.35);
          padding: 0;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        .${UNIQUE_ID}__dot[aria-current="true"] {
          background: rgba(255,255,255,.95);
          border-color: rgba(255,255,255,.95);
        }
      `;
      document.head.appendChild(s);
    }
   
    function buildCarousel() {
      ensureStyles();
      //crea estructura base. root (contenedor principal), vw (area visible), tracks (donde se mueven los slides), dots (paginacion)
      const root = el("section", { class: UNIQUE_ID, id: UNIQUE_ID, role: "region", "aria-label": "Promociones" });
      const viewport = el("div", { class: `${UNIQUE_ID}__viewport` });
      const track = el("div", { class: `${UNIQUE_ID}__track` });
   
      const dots = el("div", { class: `${UNIQUE_ID}__dots`, role: "tablist", "aria-label": "Paginación" });
   
      SLIDES.forEach((s, idx) => {
        const slide = el("div", { class: `${UNIQUE_ID}__slide`, role: "group", "aria-roledescription": "slide" });
        slide.style.backgroundImage = `url("${String(s.bg).trim()}")`;
   
        const overlay = el("div", { class: `${UNIQUE_ID}__overlay` });
        const content = el("div", { class: `${UNIQUE_ID}__content` });
        const title = el("p", { class: `${UNIQUE_ID}__title`, text: s.title });
        const subtitle = el("p", { class: `${UNIQUE_ID}__subtitle`, text: s.subtitle });
        const cta = el("a", {
          class: `${UNIQUE_ID}__cta`,
          href: s.href,
          target: "_self",
          rel: "noopener",
          text: s.cta,
        });
   
        content.appendChild(title);
        content.appendChild(subtitle);
        content.appendChild(cta);
   
        slide.appendChild(overlay);
        slide.appendChild(content);
        track.appendChild(slide);
   
        const dot = el("button", {
          class: `${UNIQUE_ID}__dot`,
          type: "button",
          role: "tab",
          "aria-label": `Ir al slide ${idx + 1}`,
        });
        dot.addEventListener("click", () => setActive(idx, true));
        dots.appendChild(dot);
      });
   
      viewport.appendChild(track);
      root.appendChild(viewport);
      root.appendChild(dots);
   
      let active = 0;
      let timer = null;
      let paused = false;
   
      function render() { // mueve el carousel
        const x = active * -50;
        track.style.transform = `translate3d(${x}%, 0, 0)`;
        const dotEls = qsa(dots, `.${UNIQUE_ID}__dot`);
        dotEls.forEach((d, i) => d.setAttribute("aria-current", String(i === active)));
      }
      function stop() {
        if (timer) window.clearInterval(timer);
        timer = null;
      }
      function start() {
        stop();
        timer = window.setInterval(() => {
          if (paused) return;
          setActive((active + 1) % SLIDES.length, false);
        }, Math.max(800, Number(CONFIG.SLIDE_INTERVAL_MS) || 4000));
      }
      function setActive(idx, userInitiated) {
        // cambia de slide y reinicia el autoplay si el usuario interactua
        active = idx;
        render();
        if (userInitiated) start();
      }
   
      // Touch swipe mobile
      let touchStartX = 0;
      let touchStartY = 0;
      let touchActive = false;
      viewport.addEventListener(
        "touchstart",
        (e) => {
          if (!e.touches || !e.touches.length) return;
          touchActive = true;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );
      viewport.addEventListener(
        "touchmove",
        (e) => {
          if (!touchActive || !e.touches || !e.touches.length) return;
          const dx = e.touches[0].clientX - touchStartX;
          const dy = e.touches[0].clientY - touchStartY;
          if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            touchActive = false;
            setActive(dx < 0 ? (active + 1) % SLIDES.length : (active - 1 + SLIDES.length) % SLIDES.length, true);
          }
        },
        { passive: true }
      );
      viewport.addEventListener("touchend", () => {
        touchActive = false;
      });
   
      root.addEventListener("mouseenter", () => {
        paused = true;
      });
      root.addEventListener("mouseleave", () => {
        paused = false;
      });
      root.addEventListener("focusin", () => {
        paused = true;
      });
      root.addEventListener("focusout", () => {
        paused = false;
      });  
   
      render();
      start();
   
      return root;
    }
   
    function injectIfPossible() {
  
      if (document.getElementById(UNIQUE_ID)) return true;
  
      let menuList = document.querySelector(".m-header-menu ul");
      if (!menuList) {
          menuList = document.querySelector(".o-header_menu ul");
      }
  
      if (!menuList) return false;
  
      const carousel = buildCarousel();
      menuList.appendChild(carousel);
  
      return true;
    }
   
    function startObservers() {
      // Inyecta directamente y si observa cambios en el DOM tambien (por si el menu aparece despues)
      injectIfPossible();
   
      const obs = new MutationObserver(() => {
        injectIfPossible();
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }
   
    startObservers();
   })();
  
  