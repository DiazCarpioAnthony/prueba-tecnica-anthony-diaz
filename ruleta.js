(function() {
    "use strict";

    /* ==========================================================================
     * ÍNDICE — ruleta.js
     * --------------------------------------------------------------------------
     *  0. CONFIG .............. Variables configurables (editar aquí)
     *  1. ESTILOS CSS ......... CSS del popup / ruleta
     *  2. POPUP ............... Clase base del modal
     *  3. INFO POPUP .......... Popup con template (ruleta)
     *  4. DEBUG ............... Logger [ROULETTE]
     *  5. IFRAME / ENVÍO ...... digital_id + envío premio (como raspaygana)
     *  6. CANVAS EVENTS ....... Clicks / regiones del canvas
     *  7. ASSET LOADER ........ Carga de imágenes
     *  8. ROULETTE GAME ....... Lógica, dibujo, giro, confeti
     *  9. INIT / BOOTSTRAP .... Arranque del popup + ruleta
     * ========================================================================== */


    /* ==========================================================================
     * 0. CONFIG — Variables configurables
     *    Cambia aquí URL del iframe, DNI por defecto, premios, etc.
     * ========================================================================== */

    // --- Iframe (envío de data) ---
    var IFRAME_URL = "https://interbank.pe/ruleta";
    var IFRAME_CLASS = "ab-ruleta-iframe-form";
    var DEFAULT_DOC_TYPE = "DNI";
    var DEFAULT_DNI = "77777777";
    var READY_TIMEOUT_MS = 20000;
    var POLL_INTERVAL_MS = 200;
    var ALLOW_IFRAME_RELOAD_ONCE = true;

    // --- Popup ---
    var POPUP_SIZE = "mediun"; // clase CSS: popup mediun
    var POPUP_OVERLAY_CLOSE = true;
    var DEBUG_ROULETTE = true;

    // --- Premios / sectores de la ruleta ---
    // premio_id  -> valor que se envía al iframe (#prem)
    // isWinner   -> true = confeti + console.log de envío
    // initSector -> casilla visible al cargar
    var SECTORS = [{
            name: "150",
            label: "S/ 150",
            premio_id: "premio_150",
            "1x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/b3/b368a34f-e913-4ec3-be17-0f11d2e4c092/premio-150x1.png",
            "2x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/a5/a510f6fd-4315-48ae-bde4-ade8830dd83e/premio-150x2.png",
            "3x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/94/943756b2-dc8c-4b35-82f3-963cd5119307/premio-150x3.png",
            isWinner: true,
            initSector: false,
        },
        {
            name: "50",
            label: "S/ 50",
            premio_id: "premio_50",
            "1x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/5b/5bc4f7c9-4772-471c-a4be-aace1e25f8a3/premio-50x1.png",
            "2x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/30/30bd77a7-3dbd-4ede-8678-23815f40d422/premio-50x2.png",
            "3x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/a4/a44c6bd2-a5ba-47f7-9855-52357de61ecf/premio-50x3.png",
            isWinner: true,
            initSector: false,
        },
        {
            name: "25",
            label: "S/ 25",
            premio_id: "premio_25",
            "1x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/aa/aa3ddb38-fe9a-412c-8bcc-dfa160424e83/premio-25x1.png",
            "2x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/a4/a465ac15-24c3-48d9-ad24-d6f75625fb0a/premio-25x2.png",
            "3x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/bf/bfe60455-2197-4450-911e-3c716257f116/premio-25x3.png",
            isWinner: true,
            initSector: true,
        },
        {
            name: "gira",
            label: "Gira otra vez",
            premio_id: "premio_gira_otra_vez",
            "1x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/dc/dcf91f57-27cb-4426-8fb3-ae8f615831b7/premio-un-giro-masx1.png",
            "2x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/37/37f4657d-5653-4343-a747-d544135cfded/premio-un-giro-masx2.png",
            "3x": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/58/582619a4-ffe1-49a0-acc8-368ec4ee73dd/premio-un-giro-masx3.png",
            isWinner: false,
            initSector: false,
        },
    ];

    // Template HTML del canvas dentro del popup
    var TPL_HTML =
        '<div class="popup__body">' +
        '<div class="popup__content">' +
        '<canvas id="roulette"></canvas>' +
        "</div>" +
        "</div>";


    /* ==========================================================================
     * 1. ESTILOS CSS
     * ========================================================================== */

    var styles = `:root{--p-primary:#0f191e;--p-secondary:#05be50;--p-tertiary:#fff;--p-bg:#fff;--p-header-bg:#05be50;--p-overlay:#000;--p-close:#fff;--p-border:#cbd5e0;--p-shadow:0 4px 12px rgba(0, 0, 0, 0.15);--transition:all 0.2s ease;--p-label-text:#878c8f;--p-button-outline:var(--p-secondary)}.popup-overlay{background:var(--p-overlay);display:grid;inset:0;opacity:.5;place-items:center;position:fixed;z-index:999}.popup{background:#fff;border-radius:8px;box-shadow:var(--p-shadow);font-family:Geometria,sans-serif;left:50%;overflow:hidden;position:fixed;top:50%;transform:translate(-50%,-50%);z-index:1000}@media (min-width:768px){.popup__title{font-size:20px}}.popup__wrapper{padding:20px;position:relative}.popup__header{background:var(--p-header-bg);background-position:100%;background-repeat:no-repeat;background-size:cover;color:var(--p-tertiary);display:flex;flex-direction:column;justify-content:center;margin:-20px;min-height:140px;padding:20px}.popup__close{cursor:pointer;height:20px;position:absolute;right:10px;top:10px;width:20px}.popup__close:after,.popup__close:before{background:var(--p-close);border-radius:3px;content:"";height:2px;left:50%;position:absolute;top:50%;transition:var(--transition);width:100%}.popup__close:before{transform:translate(-50%,-50%) rotate(45deg)}.popup__close:after{transform:translate(-50%,-50%) rotate(-45deg)}.popup__close:hover:after,.popup__close:hover:before{height:4px}.popup__title{color:inherit;font:600 18px/1.2 Geometria,sans-serif;margin-bottom:8px;max-width:70%}.popup__body .popup__title{color:var(--p-primary);font-size:16px}.popup__text--center,.popup__title--center{text-align:center}.popup__text--fullText,.popup__title--fullText{max-width:100%!important}.popup__text{color:var(--p-primary);font:14px/1.4 Geometria,sans-serif;max-width:70%;opacity:.8}.popup__content{display:grid;gap:12px}.popup__radio-list{list-style:none;margin:0;padding:0}.popup__radio-item:not(:last-child){margin-bottom:.75rem}.popup__radio-label{align-items:center;color:var(--p-label-text);cursor:pointer;display:flex;font:14px/1.5 Geometria,sans-serif;min-height:24px;padding-left:32px;position:relative}.popup__radio-label input{opacity:0;position:absolute}.popup__radio-indicator{background:var(--p-bg);border:2px solid var(--p-border);border-radius:50%;height:20px;left:0;position:absolute;transition:var(--transition);width:20px}.popup__radio-label:hover .popup__radio-indicator{border-color:var(--p-secondary)}.popup__radio-label input:checked~.popup__radio-indicator{background:var(--p-secondary);border-color:var(--p-secondary)}.popup__radio-label input:checked~.popup__radio-indicator:after{background:var(--p-bg);border-radius:50%;content:"";height:8px;inset:50% auto auto 50%;position:absolute;transform:translate(-50%,-50%);width:8px}.popup__radio-label input:focus~.popup__radio-indicator{box-shadow:0 0 0 3px rgba(5,190,82,.2)}.popup__button{background:var(--p-secondary);border:0;border-radius:4px;color:var(--p-tertiary);cursor:pointer;font:500 14px Geometria,sans-serif;padding:12px;transition:var(--transition);width:100%}.popup__button:hover{opacity:.9}.popup__button--outline{background:var(--p-tertiary);border:1px solid var(--p-button-outline);color:var(--p-button-outline)}.popup__button--outline:hover{background:rgba(5,190,82,.1);opacity:1}.roulette.popup__wrapper{padding:20px 20px 0}.roulette .popup__header{min-height:80px}.roulette .popup__body{padding-top:20px;height:270px}.canvas-container{position:relative;width:90vmin;height:90vmin}#roulette{background-color:#fff;width:100%;height:100%;display:block;margin:0 auto}.popup__close{display:none}.popup__close-svg{width:35px;height:35px;position:absolute;top:10px;right:10px;fill:#fff;cursor:pointer;z-index:10;transition:var(--transition)}.popup__close-svg:hover{opacity:.8;transform:scale(1.1)}.popup.mediun .popup__close-svg{top:15px;right:15px}@media (max-width:768px){.popup.mediun .popup__close-svg{top:10px;right:10px}.popup__close-svg{width:25px;height:25px}}@media (max-height:620px){.popup.mediun .popup__close-svg{top:10px;right:10px}.popup__close-svg{width:25px;height:25px}}`;


    /* ==========================================================================
     * 2. POPUP — Clase base del modal
     * ========================================================================== */

    function Popup(options) {
        this.options = options || {};
        this.documentBody = document.body;
        this.hasRendered = false;
        this.styleElement = null;
    }

    Popup.prototype = {
        start: function() {
            if (typeof this.options.onStart === "function") {
                this.options.onStart(this.digital_id);
            }
            // console.log("Popup initialized");
            this.render();
        },

        render: function() {
            // Clean up any existing popup first
            this.destroy();

            if (this.options.css) {
                this.setStyle(this.options.css);
            }

            this.documentBody.appendChild(this.createOverlay());
            this.documentBody.appendChild(this.createPopup());
            this.setEvents();
            this.hasRendered = true;
        },

        createOverlay: function() {
            const overlay = document.createElement("div");
            overlay.className = "popup-overlay";
            return overlay;
        },

        createPopup: function() {
            const popup = document.createElement("div");
            popup.className = "popup";

            // Add close button if not disabled in options
            if (this.options.showCloseButton !== false) {
                popup.innerHTML =
                    '<button class="popup__close" aria-label="Close popup">×</button>' +
                    (this.options.content || "");
            } else {
                popup.innerHTML = this.options.content || "";
            }

            return popup;
        },

        close: function() {
            if (typeof this.options.onClose === "function") {
                this.options.onClose();
            }
            this.destroy();
            console.log("Popup closed");
        },

        setStyle: function(styleText) {
            // Remove existing style if any
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
            }

            const style = document.createElement("style");
            style.type = "text/css";
            this.styleElement = style;

            if (style.styleSheet) {
                style.styleSheet.cssText = styleText; // For IE
            } else {
                style.appendChild(document.createTextNode(styleText)); // For other browsers
            }

            document.head.appendChild(style);
        },

        destroy: function() {
            const existingPopup = this.documentBody.querySelector(".popup");
            const existingOverlay = this.documentBody.querySelector(".popup-overlay");

            if (existingPopup) {
                this.documentBody.removeChild(existingPopup);
            }

            if (existingOverlay) {
                this.documentBody.removeChild(existingOverlay);
            }

            this.hasRendered = false;
        },

        setEvents: function() {
            const closeButton = this.documentBody.querySelector(".popup__close");
            const overlay = this.documentBody.querySelector(".popup-overlay");
            const overlayClose = this.options.overlayClose !== false; // Default true

            const closePopup = () => this.close();

            if (closeButton) {
                closeButton.addEventListener("click", closePopup);
            }

            if (overlay && overlayClose) {
                overlay.addEventListener("click", (event) => {
                    if (event.target === overlay) {
                        closePopup();
                    }
                });
            }

            // Add keyboard event for ESC key
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.hasRendered) {
                    closePopup();
                }
            });
        },

        getCookie: function(name) {
            var cookies = document.cookie.split(';').reduce(function (acc, cookie) {
                var parts = cookie.split('=');
                var k = (parts[0] || '').trim();
                var v = (parts[1] || '').trim();
                if (k) acc[k] = v;
                return acc;
            }, {});
            return cookies[name];
        },
    };


    /* ==========================================================================
     * 3. INFO POPUP — Popup con template (ruleta)
     * ========================================================================== */

    function Info(options) {
        Popup.call(this, options);
        this.options = options || {};
        this.digital_id =
            this.getCookie("digital_id") ||
            this.getCookie("audience.digital_id") ||
            "<NO digital_id>";
    }

    Info.prototype = Object.create(Popup.prototype);
    Info.prototype.constructor = Info;

    Info.prototype.render = function() {
        this.setStyle(this.options.css);
        this.documentBody.appendChild(this.createOverlay());
        this.documentBody.appendChild(this.createPopup());
        this.setEvents();
    };

    Info.prototype.createPopup = function() {
        var popup = document.createElement("div");
        var KlassName = this.options.size ? "popup " + this.options.size : "popup";
        popup.className = KlassName;

        var opts = this.options;

        if (opts.tpl) {
            var svgClose = '<svg viewBox="0 0 36 36" class="popup__close-svg icon-x" focusable="false" aria-hidden="true" role="img"><path fill-rule="evenodd" d="M26.48528,6.68629,18,15.17157,9.51472,6.68629a1,1,0,0,0-1.41421,0L6.68629,8.10051a1,1,0,0,0,0,1.41421L15.17157,18,6.68629,26.48528a1,1,0,0,0,0,1.41421l1.41422,1.41422a1,1,0,0,0,1.41421,0L18,20.82843l8.48528,8.48528a1,1,0,0,0,1.41421,0l1.41422-1.41422a1,1,0,0,0,0-1.41421L20.82843,18l8.48528-8.48528a1,1,0,0,0,0-1.41421L27.89949,6.68629A1,1,0,0,0,26.48528,6.68629Z"></path></svg>';
            popup.innerHTML = svgClose + opts.tpl;
            return popup;
        }

        var headerTitle = opts.headerTitle || "";
        var description = opts.description || "";
        var btnText_s = opts.btnText_s || false;
        var btnText_p = opts.btnText_p || "Continuar";
        var title = opts.title || "";
        var headerBackground = opts.headerBackground || "";

        var btnSecundary = btnText_s ?
            '<button id="btn-secundary" class="popup__button popup__button--outline">' +
            btnText_s +
            "</button>" :
            "";

        var btnPrimary = btnText_p ?
            '<button id="btn-primary" class="popup__button">' +
            btnText_p +
            "</button>" :
            "";

        var titleText = title ?
            '<h3 class="popup__title popup__title--center popup__title--fullText">' +
            title +
            "</h3>" :
            "";

        var svgClose = '<svg viewBox="0 0 36 36" class="popup__close-svg icon-x" focusable="false" aria-hidden="true" role="img"><path fill-rule="evenodd" d="M26.48528,6.68629,18,15.17157,9.51472,6.68629a1,1,0,0,0-1.41421,0L6.68629,8.10051a1,1,0,0,0,0,1.41421L15.17157,18,6.68629,26.48528a1,1,0,0,0,0,1.41421l1.41422,1.41422a1,1,0,0,0,1.41421,0L18,20.82843l8.48528,8.48528a1,1,0,0,0,1.41421,0l1.41422-1.41422a1,1,0,0,0,0-1.41421L20.82843,18l8.48528-8.48528a1,1,0,0,0,0-1.41421L27.89949,6.68629A1,1,0,0,0,26.48528,6.68629Z"></path></svg>';

        popup.innerHTML =
            svgClose +
            '<div class="popup__wrapper">' +
            '<div class="popup__close" aria-label="Cerrar popup"></div>' +
            '<div class="popup__header">' +
            '<div class="popup__title">' +
            headerTitle +
            "</div>" +
            "</div>" +
            '<div class="popup__body">' +
            '<div class="popup__content">' +
            titleText +
            '<div class="popup__text popup__text--center popup__text--fullText">' +
            description +
            "</div>" +
            btnPrimary +
            btnSecundary +
            "</div>" +
            "</div>" +
            "</div>";

        if (headerBackground) {
            var header = popup.querySelector(".popup__header");
            header.style.backgroundImage = "url(" + headerBackground + ")";
        }

        return popup;
    };

    Info.prototype.setEvents = function() {
        var popup = this.documentBody.querySelector(".popup");
        var closeButton = popup.querySelector(".popup__close");
        var closeSvg = popup.querySelector(".popup__close-svg");
        var overlay = this.documentBody.querySelector(".popup-overlay");
        var self = this;

        // Función para cerrar el popup
        var closePopup = function() {
            self.close();
            self.destroy();
        };

        // Evento para botón cerrar
        if (closeButton) {
            closeButton.addEventListener("click", closePopup);
        }

        if (closeSvg) {
            closeSvg.addEventListener("click", closePopup);
        }

        // Evento para overlay
        if (overlay && this.options.overlayClose) {
            overlay.addEventListener("click", function(e) {
                if (e.target === overlay) {
                    closePopup();
                }
            });
        }

        // Configurar eventos de botones
        var btnPrimary = popup.querySelector("#btn-primary");
        if (btnPrimary && typeof this.options.btnText_p_onClick === "function") {
            btnPrimary.addEventListener("click", function() {
                self.options.btnText_p_onClick();
            });
        }

        var btnSecundary = popup.querySelector("#btn-secundary");
        if (btnSecundary && typeof this.options.btnText_s_onClick === "function") {
            btnSecundary.addEventListener("click", function() {
                self.options.btnText_s_onClick(closeButton);
            });
        }

        // Evento para tecla Escape
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closePopup();
            }
        });

        if (typeof this.options.onRender === "function") {
            this.options.onRender(popup);
        }
    };


    /* ==========================================================================
     * 4. DEBUG — Logger [ROULETTE]
     * ========================================================================== */

    function Debug(tag, active) {
        this.tag = tag ? "[" + tag + "] " : "";
        this.active = active !== false;
    }

    Debug.prototype.on = function() {
        this.active = true;
        return this;
    };

    Debug.prototype.off = function() {
        this.active = false;
        return this;
    };

    Debug.prototype.log = function() {
        if (!this.active) return this;
        console.log.apply(console, [this.tag].concat([].slice.call(arguments)));
        return this;
    };

    var dbg = new Debug("ROULETTE", DEBUG_ROULETTE);

    /* ==========================================================================
     * 5. IFRAME / ENVÍO PREMIO — digital_id + envío (como raspaygana)
     *    Config: IFRAME_URL, DEFAULT_DOC_TYPE, DEFAULT_DNI (sección 0)
     * ========================================================================== */

    var cachedIframeDoc = null;
    var cachedCtForm = null;

    // --- Funciones de digital_id / userKey (copiadas tal cual de raspaygana.js) ---

    function safeLocalStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    function safeLocalStorageSet(key, val) {
        try {
            window.localStorage.setItem(key, val);
            return true;
        } catch (_) {
            return false;
        }
    }

    // ID persistente por dispositivo si no hay digital_id
    function getAnonId() {
        var k = 'ibk_anon_id';
        var existing = safeLocalStorageGet(k);
        if (existing) return existing;
        var id = 'anon_' + Math.random().toString(36).slice(2) + '_' + Date.now();
        safeLocalStorageSet(k, id);
        return id;
    }

    function getCookie(name) {
        var cookies = document.cookie.split(';').reduce(function (acc, cookie) {
            var parts = cookie.split('=');
            var k = (parts[0] || '').trim();
            var v = (parts[1] || '').trim();
            if (k) acc[k] = v;
            return acc;
        }, {});
        return cookies[name];
    }

    function resolveDigitalId() {
        var digital_id =
            getCookie('digital_id') || getCookie('audience.digital_id') || '<NO digital_id>';
        var userKey =
            digital_id && digital_id !== '<NO digital_id>' ? digital_id : getAnonId();
        return {
            digital_id: digital_id,
            userKey: userKey
        };
    }

    function normalizeDni(raw) {
        var dni = (raw == null ? '' : String(raw)).trim().replace(/D/g, '');
        if (!dni) dni = DEFAULT_DNI;
        if (dni.length < 8) dni = ('00000000' + dni).slice(-8);
        if (dni.length > 8) dni = dni.slice(0, 8);
        return dni;
    }

    // --- Fin funciones digital_id (raspaygana) ---

    function tryGetIframeForm(iframeEl) {
        try {
            if (!iframeEl) return null;
            var iframeDoc =
                iframeEl.contentDocument ||
                (iframeEl.contentWindow && iframeEl.contentWindow.document);
            if (!iframeDoc) return null;
            var ctForm = iframeDoc.querySelector("form#dinamic-form");
            if (!ctForm) return null;
            return {
                iframeDoc: iframeDoc,
                ctForm: ctForm,
            };
        } catch (e) {
            return null;
        }
    }

    function waitForIframeForm(iframeEl, cb, opts) {
        opts = opts || {};
        var timeoutMs = opts.timeoutMs || READY_TIMEOUT_MS;
        var intervalMs = opts.intervalMs || POLL_INTERVAL_MS;
        var allowReloadOnce = !!opts.allowReloadOnce;

        var start = Date.now();
        var didReload = false;
        var timer = null;

        function done(err, res) {
            cleanup();
            if (err) cb(err);
            else cb(null, res.iframeDoc, res.ctForm);
        }

        function cleanup() {
            if (timer) clearInterval(timer);
            timer = null;
            try {
                iframeEl &&
                    iframeEl.removeEventListener &&
                    iframeEl.removeEventListener("load", onLoad);
            } catch (_) {}
        }

        function onLoad() {
            var res = tryGetIframeForm(iframeEl);
            if (res) return done(null, res);
        }

        var immediate = tryGetIframeForm(iframeEl);
        if (immediate) return done(null, immediate);

        try {
            iframeEl.addEventListener("load", onLoad);
        } catch (_) {}

        timer = setInterval(function() {
            var res = tryGetIframeForm(iframeEl);
            if (res) return done(null, res);

            var elapsed = Date.now() - start;

            if (allowReloadOnce && !didReload && elapsed > Math.min(6000, timeoutMs / 2)) {
                try {
                    var d =
                        iframeEl.contentDocument ||
                        (iframeEl.contentWindow && iframeEl.contentWindow.document);
                    var url = d && d.URL;
                    if (url && String(url).indexOf("about:blank") === 0) {
                        didReload = true;
                        iframeEl.src = iframeEl.src || IFRAME_URL;
                    }
                } catch (_) {}
            }

            if (elapsed > timeoutMs) {
                return done(new Error("Timeout esperando form#dinamic-form en iframe."));
            }
        }, intervalMs);
    }

    // Crea el iframe oculto (una sola vez) y cachea el form cuando esté listo
    function ensureIframe() {
        var iframe = document.querySelector("iframe." + IFRAME_CLASS);
        if (iframe) {
            return iframe;
        }

        iframe = document.createElement("iframe");
        iframe.className = IFRAME_CLASS;
        iframe.src = IFRAME_URL;
        iframe.setAttribute(
            "style",
            "position:fixed;min-height:450px;width:50%;top:0;left:0;opacity:0;pointer-events:none;border:0;"
        );
        document.body.appendChild(iframe);

        waitForIframeForm(
            iframe,
            function(err, iframeDoc, ctForm) {
                if (err) {
                    console.log(err.message);
                    cachedIframeDoc = null;
                    cachedCtForm = null;
                    return;
                }
                cachedIframeDoc = iframeDoc;
                cachedCtForm = ctForm;
            },
            {
                timeoutMs: READY_TIMEOUT_MS,
                intervalMs: POLL_INTERVAL_MS,
                allowReloadOnce: ALLOW_IFRAME_RELOAD_ONCE,
            }
        );

        return iframe;
    }

    function enviarPremioIframe(premio) {
        var resolved = resolveDigitalId();

        // digInput: self.digital_id || ""  (NO TOCAR)
        var datos = {
            tipoDocumento: DEFAULT_DOC_TYPE,
            nroDocumento: normalizeDni(DEFAULT_DNI),
            digInput: resolved.digital_id || '',
            premInput: premio.premio_id || '',
            userKey: resolved.userKey
        };

        // Solo console.log — el envío real al iframe está comentado abajo
        console.log("[RULETA] Datos a enviar al iframe:", datos);
        console.log("[RULETA] URL iframe (comentado):", IFRAME_URL);

        /*
        var iframe = ensureIframe();

        function enviarDatos(datos, iframeDoc, ctForm) {
            if (!iframeDoc || !ctForm) {
                console.log("No se encontró el formulario dentro del iframe.");
                return false;
            }

            var btnForm = ctForm.querySelector(".a-button-wrapper button");
            var selectDoc = ctForm.querySelector("#idSelectTypeDoc");
            var numDocForm = ctForm.querySelector("#idNumDocumento");
            var digForm = ctForm.querySelector("#digita"); // digital ID
            var premForm = ctForm.querySelector("#prem"); // Premio
            var tycInput = ctForm.querySelector("#idTYC");
            var comercialInput = ctForm.querySelector("#idComercial");

            if (!btnForm || !numDocForm || !digForm || !premForm || !tycInput) {
                console.log("No se encontraron elementos clave dentro del iframe.");
                return false;
            }

            if (selectDoc) {
                selectDoc.value = datos.tipoDocumento;
            }
            if (numDocForm.disabled) {
                numDocForm.disabled = false;
            }
            numDocForm.value = datos.nroDocumento;

            digForm.value = datos.digInput || ""; // NO TOCAR
            premForm.value = datos.premInput || "";
            tycInput.checked = true;
            if (comercialInput) {
                comercialInput.checked = true;
            }

            try {
                btnForm.click();
                return true;
            } catch (e) {
                console.log("No se pudo hacer click en el submit del iframe:", e && e.message);
                return false;
            }
        }

        if (cachedIframeDoc && cachedCtForm) {
            enviarDatos(datos, cachedIframeDoc, cachedCtForm);
            return;
        }

        waitForIframeForm(
            iframe,
            function (err, iframeDoc, ctForm) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                cachedIframeDoc = iframeDoc;
                cachedCtForm = ctForm;
                enviarDatos(datos, iframeDoc, ctForm);
            },
            {
                timeoutMs: READY_TIMEOUT_MS,
                intervalMs: POLL_INTERVAL_MS,
                allowReloadOnce: ALLOW_IFRAME_RELOAD_ONCE,
            }
        );
        */
    }

    /* ==========================================================================
     * 6. CANVAS EVENTS — Clicks / regiones del canvas
     * ========================================================================== */

    function CanvasEventHandler(options) {
        this.config = options || {};
        this.canvas = document.getElementById(this.config.canvasId);

        if (!this.canvas) {
            throw new Error("Canvas no encontrado: " + this.config.canvasId);
        }

        this.regions = [];
        this._eventLocks = {};
    }

    CanvasEventHandler.prototype = {
        addRegion: function(id, x, y, width, height, type, radius) {
            this.regions.push({
                id: id,
                x: x,
                y: y,
                width: width,
                height: height,
                type: type || "rect",
                radius: radius || 0,
            });
        },

        getRegion: function(regionId) {
            for (var i = 0; i < this.regions.length; i++) {
                if (this.regions[i].id === regionId) {
                    return this.regions[i];
                }
            }
            return null;
        },

        lock: function(key) {
            this._eventLocks[key] = true;
        },

        unlock: function(key) {
            this._eventLocks[key] = false;
        },

        isLocked: function(key) {
            return this._eventLocks[key] === true;
        },

        enableHover: function() {
            var self = this;
            if (this._hoverHandler) {
                this.canvas.removeEventListener("mousemove", this._hoverHandler);
            }

            this._hoverHandler = function(e) {
                var pos = self.getMousePosition(e);
                var overRegion = false;

                for (var i = 0; i < self.regions.length; i++) {
                    if (self.isPointInRegion(pos, self.regions[i])) {
                        overRegion = true;
                        break;
                    }
                }
                self.canvas.style.cursor = overRegion ? "pointer" : "default";
            };

            this.canvas.addEventListener("mousemove", this._hoverHandler);
        },

        on: function(regionId, eventType, callback) {
            var self = this;
            var lockKey = regionId + ":" + eventType;

            this.canvas.addEventListener(eventType, function(e) {
                var region = self.getRegion(regionId);
                if (!region) return;

                try {
                    var pos = self.getMousePosition(e);

                    if (!self.isPointInRegion(pos, region)) return;

                    if (self.isLocked(lockKey)) return;

                    self.lock(lockKey);

                    function done() {
                        self.unlock(lockKey);
                    }

                    if (callback.length >= 3) {
                        callback(e, region, done);
                    } else {
                        callback(e, region);
                        done();
                    }
                } catch (error) {
                    dbg.log("Error en evento:", error);
                    self.unlock(lockKey);
                }
            });
        },

        isPointInRegion: function(point, region) {
            if (region.type === "circle") {
                var dx = point.x - region.x;
                var dy = point.y - region.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                return dist <= region.radius;
            } else {
                return (
                    point.x >= region.x &&
                    point.x <= region.x + region.width &&
                    point.y >= region.y &&
                    point.y <= region.y + region.height
                );
            }
        },

        getMousePosition: function(event) {
            var rect = this.canvas.getBoundingClientRect();
            var scaleX = this.canvas.width / rect.width;
            var scaleY = this.canvas.height / rect.height;

            return {
                x: ((event.clientX - rect.left) * scaleX) / (this.dpr || 1),
                y: ((event.clientY - rect.top) * scaleY) / (this.dpr || 1),
            };
        },
    };

    /* ==========================================================================
     * 7. ASSET LOADER — Carga de imágenes
     * ========================================================================== */

    function AssetLoader() {
        this.assets = [];
        this.loadedCount = 0;
        this.totalCount = 0;
        this.callback = null;
        this.images = {};
    }

    AssetLoader.prototype.add = function(key, url) {
        this.assets.push({
            key: key,
            url: url
        });
        this.totalCount++;
    };

    AssetLoader.prototype.start = function(callback) {
        this.callback = callback;

        if (this.totalCount === 0) {
            callback(this.images);
            return;
        }

        var self = this;

        this.assets.forEach(function(asset) {
            var img = new Image();
            img.crossOrigin = "Anonymous";

            img.onload = function() {
                self.loadedCount++;
                self.images[asset.key] = img;

                dbg.log("✓ Imagen cargada:", asset.key);

                if (self.loadedCount === self.totalCount) {
                    dbg.log("Todas las imágenes cargadas (" + self.totalCount + ")");
                    callback(self.images);
                }
            };

            img.onerror = function() {
                dbg.log("✗ Error cargando:", asset.url);
                self.loadedCount++;

                // Crear placeholder
                var canvas = document.createElement("canvas");
                canvas.width = 100;
                canvas.height = 100;
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "#f0f0f0";
                ctx.fillRect(0, 0, 100, 100);
                ctx.fillStyle = "#999";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("IMG", 50, 50);

                self.images[asset.key] = canvas;

                if (self.loadedCount === self.totalCount) {
                    dbg.log("Algunas imágenes fallaron, pero continuando...");
                    callback(self.images);
                }
            };

            dbg.log("⇩ Cargando:", asset.key);
            img.src = asset.url;
        });
    };

    /* ==========================================================================
     * 8. ROULETTE GAME — Lógica, dibujo, giro, confeti
     * ========================================================================== */

    function RouletteGame(options) {
        CanvasEventHandler.call(this, options);

        // En el constructor de RouletteGame, reemplaza el objeto settings por:
        this.settings = Object.assign({
                canvasId: "roulette",
                debugger: true,
                sectors: [],
                onInit: null,
                onWiningSector: null,

                // Configuración de diseño
                layout: {
                    desktopSize: 600,
                    maxMobileSize: 300,
                    minMobileSize: 200,
                    mobileBreakpoint: 768,
                    safetyMargin: 40,
                    rouletteScale: 0.6,
                    frameMargin: 20,
                    frameLineWidth: 16,
                },

                // Configuración de botones
                buttons: {
                    spin: {
                        baseWidth: 140,
                        baseHeight: 50,
                        marginBottomPercent: 0.1,
                        color: "#0039a6",
                        textColor: "#ffffff",
                        spinText: "Gírala ahora",
                        winningText: "Solicitar Tarjeta",
                    },
                },

                // Configuración de animación
                animation: {
                    spinTurns: 5,
                    spinDuration: 3000,
                },

                // Configuración del spinner - CORREGIDO
                spinner: {
                    loadingText: "Cargando...",
                    enabled: true,
                    showOnInit: true,
                    size: 70,
                    weight: 10,
                    length: 120,
                    spinSpeed: 12,
                    colors: {
                        first: "#066522",
                        second: "#02b84c",
                        text: "#333333",
                        background: "#ffffff", // <-- Este debe ser blanco, no negro
                    },
                },

                // Configuración de confeti
                confetti: {
                    enabled: true,
                    duration: 5000,
                    maxParticles: 200,
                    colors: ["#066522", "#02b84c"],
                    particleSize: {
                        min: 5,
                        max: 10
                    },
                },

                // URLs de recursos
                assets: {
                    pin: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/6d/6d3ab273-3e54-4a1e-b67c-2acdf2fee9e7/punterov2.png",
                    background: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/db/dbd63556-ca1f-4597-92df-aa3efc54c6c0/ruleta-fondo_1.png",
                    title: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/be/be9e51c9-7dbd-4d1e-890e-9d0e1fb60b2f/descubre-tu-premio.png",
                    winningText: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/cb/cbbf9c87-58d1-4f08-9e50-44a363c363e3/texto-instrucciones.png",
                    winningButtonUrl: "https://interbank.pe/solicitar/tarjeta/credito/inicio?pcid=popup-ruleta:home:btn",
                },

                // Colores de la ruleta
                colors: {
                    sector1: "#066522",
                    sector2: "#02b84c",
                    separator: "#ffffff",
                    centerButton: {
                        gradientStart: "#1d8a4a",
                        gradientEnd: "#0c491e",
                        border: "#ffffff",
                    },
                    outerFrame: {
                        inner: "#f1fbfa",
                        outer: "#dbe0e3",
                    },
                },
            },
            options || {}
        );
        if (!this.settings.debugger) {
            dbg.off();
        }

        this.ctx = this.canvas.getContext("2d");
        this.rotation = 0;
        this.images = {};
        this.indicatorImage = null;
        this.bgImg = null;
        this.titleImg = null;
        this.winningTextImg = null;

        // Variables del Spinner
        this.spinnerAngle = 0;
        this.spinnerAnimationId = null;
        this.isLoading = false;
        this.spinnerActive = false;
        this.isGameFinished = false;
        this.spinnerText = "";

        // Variables para Confeti
        this.confettiParticles = [];
        this.isConfettiActive = false;
        this.confettiAnimationId = null;
        this.winningSector = null;

        // Variables de estado
        this.isSpinning = false;

        // Dimensiones calculadas
        this.canvasLogicalSize = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;
        this.BUTTON_WIDTH = 0;
        this.BUTTON_HEIGHT = 0;
        this.dpr = 1;

        this._setupCanvas();
        this._setupResizeListener();
    }

    RouletteGame.prototype = Object.create(CanvasEventHandler.prototype);
    RouletteGame.prototype.constructor = RouletteGame;

    // --- 8.1 Responsive / resize ---

    RouletteGame.prototype._setupCanvas = function() {
        if (this.spinnerActive) return;

        var config = this.settings.layout;
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var canvasSize = config.desktopSize;

        if (viewportWidth < config.mobileBreakpoint) {
            canvasSize = Math.min(
                config.maxMobileSize,
                viewportWidth - config.safetyMargin
            );
            if (canvasSize < config.minMobileSize) canvasSize = config.minMobileSize;
        }

        if (viewportHeight < 620) {
            var maxSizeByHeight = Math.min(
                config.maxMobileSize,
                viewportHeight - 120
            );

            canvasSize = Math.min(canvasSize, maxSizeByHeight);

            if (canvasSize < config.minMobileSize) {
                canvasSize = config.minMobileSize;
            }

            dbg.log("Altura viewport < 620px, usando tamaño mobile:", canvasSize);
        }

        this.canvasLogicalSize = canvasSize;

        // Aplicar dimensiones CSS
        this.canvas.style.width = canvasSize + "px";
        this.canvas.style.height = canvasSize + "px";

        // Configurar alta resolución (Retina/DPI)
        var dpr = window.devicePixelRatio || 1;
        this.dpr = dpr;

        this.canvas.width = Math.round(canvasSize * dpr);
        this.canvas.height = Math.round(canvasSize * dpr);

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = "high";

        // Calcular centro
        this.centerX = canvasSize / 2;
        this.centerY = canvasSize / 2;

        // Escalar elementos proporcionalmente
        var scaleFactor = canvasSize / config.desktopSize;

        this.BUTTON_WIDTH = this.settings.buttons.spin.baseWidth * scaleFactor;
        this.BUTTON_HEIGHT = this.settings.buttons.spin.baseHeight * scaleFactor;

        var rouletteDiameter = canvasSize * config.rouletteScale;
        var rouletteRadius = rouletteDiameter / 2;
        var frameMargin = config.frameMargin * scaleFactor;

        this.radius = rouletteRadius - frameMargin;

        // Actualizar regiones de clic
        this._updateRegions();
    };

    RouletteGame.prototype._setupResizeListener = function() {
        var self = this;
        var resizeTimeout;

        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                self.resize();
            }, 200);
        }

        window.addEventListener("resize", handleResize);

        // Método para limpiar listener
        this._cleanupResizeListener = function() {
            window.removeEventListener("resize", handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    };

    RouletteGame.prototype.resize = function() {
        this._setupCanvas();
        this._updateRegions();

        // Si hay confeti activo, redibujar todo
        if (this.isConfettiActive) {
            if (this.isGameFinished && this.winningSector) {
                this.drawBackground();
                this.drawWinningText();
                this.drawWinningBtn();
                this.drawConfetti();
            } else {
                this.drawWithoutClear();
                this.drawConfetti();
            }
        } else if (!this.isGameFinished) {
            this.draw();
        } else {
            this.drawWinning();
        }
    };

    RouletteGame.prototype.startSpinner = function(text) {
        if (!this.settings.spinner.enabled) return;

        if (this.spinnerAnimationId) {
            cancelAnimationFrame(this.spinnerAnimationId);
        }

        this.spinnerActive = true;
        this.spinnerAngle = 0;
        this.spinnerText = text || this.settings.spinner.loadingText; // <-- Usar texto por defecto

        var self = this;

        function loop() {
            if (!self.spinnerActive) return;

            // LIMPIAR CORRECTAMENTE EL CANVAS
            self.ctx.save();
            self.ctx.setTransform(1, 0, 0, 1, 0, 0);
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.ctx.scale(self.dpr, self.dpr);
            self.ctx.globalAlpha = 1;

            self.spinnerAngle =
                (self.spinnerAngle + self.settings.spinner.spinSpeed) % 360;

            self._drawSpinnerInternal();
            self._drawSpinnerText();
            self.ctx.restore();

            self.spinnerAnimationId = requestAnimationFrame(loop);
        }

        this.spinnerAnimationId = requestAnimationFrame(loop);
    };

    RouletteGame.prototype._getCenter = function() {
        return {
            x: this.canvas.width / (2 * this.dpr),
            y: this.canvas.height / (2 * this.dpr),
        };
    };

    RouletteGame.prototype._drawSpinnerText = function() {
        if (!this.spinnerText) return;

        var ctx = this.ctx;
        var center = this._getCenter();

        var canvasHeight = this.canvas.height / this.dpr;
        var maxTextY = canvasHeight - 20;

        var fontSize = Math.min(16, canvasHeight * 0.06);

        ctx.save();
        ctx.fillStyle = this.settings.spinner.textColor || "#333";
        ctx.font = "600 " + fontSize + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        var textY = Math.min(center.y + fontSize * 1.5, maxTextY);

        ctx.fillText(this.spinnerText, center.x, textY);
        ctx.restore();
    };

    RouletteGame.prototype._drawSpinnerInternal = function() {
        var ctx = this.ctx;
        var colors = this.settings.spinner.colors;
        var size = this.canvasLogicalSize;
        var radius = size * 0.12;
        var center = this._getCenter();

        ctx.lineWidth = Math.max(4, size * 0.015);
        ctx.lineCap = "round";

        ctx.strokeStyle = colors.first;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = colors.second;
        ctx.beginPath();
        ctx.arc(
            center.x,
            center.y,
            radius,
            (this.spinnerAngle * Math.PI) / 180,
            ((this.spinnerAngle + 40) * Math.PI) / 180
        );
        ctx.stroke();
    };

    RouletteGame.prototype.stopSpinner = function() {
        this.spinnerActive = false;

        if (this.spinnerAnimationId) {
            cancelAnimationFrame(this.spinnerAnimationId);
            this.spinnerAnimationId = null;
        }

        this.draw();
    };

    RouletteGame.prototype.setSpinnerText = function(text) {
        this.spinnerText = text;
    };

    // --- 8.2 Init y carga de recursos ---

    RouletteGame.prototype.init = function() {
        var self = this;
        var sectors = this.settings.sectors;

        if (!sectors || !sectors.length) return;

        // IMPORTANTE: Primero calculamos el tamaño para que centerX/Y y dpr existan
        this._setupCanvas();

        // Iniciar el spinner ANTES de llamar a loadResources
        this.startSpinner(this.settings.spinner.loadingText);

        this.loadResources(sectors, function(images) {
            // Cuando las imágenes terminan de cargar:
            self.images = images;
            self.indicatorImage = images["__pin__"];
            self.bgImg = images["__bg__"];
            self.titleImg = images["__title__"];
            self.winningTextImg = images["__winning__"];

            // 1. Detener el bucle del spinner
            self.stopSpinner();

            // 2. Reiniciar rotación según el sector inicial
            self.rotation = self.getInitialRotation();

            // 3. Recalcular dimensiones después de un frame (fix para zoom)
            setTimeout(function() {
                self._setupCanvas();
                self._updateRegions();
                self.draw();
            }, 50);

            // 4. Dibujar el estado inicial del juego
            self._updateRegions();
            self.draw();
            self.enableHover();
            self.setupCenterButtonEvent();

            if (typeof self.settings.onInit === "function") {
                self.settings.onInit(self.canvas);
            }
        });
    };

    RouletteGame.prototype.loadResources = function(sectors, callback) {
        var loader = new AssetLoader();
        var self = this;

        self.dpr = Math.min(Math.max(self.dpr, 1), 3);

        var roundedDpr;
        if (self.dpr < 1.5) {
            roundedDpr = 1;
        } else if (self.dpr < 2.5) {
            roundedDpr = 2;
        } else {
            roundedDpr = 3;
        }

        var key = roundedDpr + "x";

        dbg.log("DPR original:", self.dpr);
        dbg.log("DPR redondeado:", roundedDpr);
        dbg.log("Key:", key);

        // Cargar imágenes de sectores
        sectors.forEach(function(sector) {
            var imageUrl = sector[key];
            if (!imageUrl) {
                dbg.log("[WARNING] No existe la propiedad '" + key + "' en el sector:", sector.name);
                imageUrl = sector["1x"];
            }
            dbg.log("Cargando sector", sector.name, "con URL:", imageUrl);
            loader.add(sector.name, imageUrl);
        });

        // Cargar recursos estáticos desde settings
        loader.add("__pin__", this.settings.assets.pin);
        loader.add("__bg__", this.settings.assets.background);
        loader.add("__title__", this.settings.assets.title);
        loader.add("__winning__", this.settings.assets.winningText);

        loader.start(callback);
    };

    // --- 8.3 Dibujo (canvas) ---

    RouletteGame.prototype.draw = function() {
        if (this.spinnerActive) return;

        // Si hay confeti activo, usa el bucle de confeti
        if (this.isConfettiActive) {
            return; // El dibujo lo maneja confettiLoop
        }

        // Dibujo normal (sin confeti)
        this.ctx.clearRect(0, 0, this.canvasLogicalSize, this.canvasLogicalSize);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);

        this.drawBackground();
        this.drawTitleImage();
        this.drawBtn();

        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);
        this.ctx.translate(-this.centerX, -this.centerY);

        this.drawOuterFrame();
        this.drawSectors();
        this.drawSeparators();
        this.drawSectorImages();
        this.ctx.restore();

        if (this.indicatorImage) this.drawIndicator();
        this.drawCenterButton();
    };

    RouletteGame.prototype.drawBackground = function() {
        var ctx = this.ctx;
        var drawSize = this.canvasLogicalSize;

        if (this.bgImg) {
            ctx.drawImage(this.bgImg, 0, 0, drawSize, drawSize);
        } else {
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, drawSize, drawSize);
        }
    };

    RouletteGame.prototype.drawTitleImage = function() {
        if (!this.titleImg) return;

        var drawSize = this.canvasLogicalSize;
        var titleWidth = drawSize * 0.5;
        var aspectRatio = this.titleImg.width / this.titleImg.height;
        var titleHeight = titleWidth / aspectRatio;

        var x = (drawSize - titleWidth) / 2;
        var y = drawSize * 0.05;

        this.ctx.drawImage(this.titleImg, x, y, titleWidth, titleHeight);
    };

    // RouletteGame.prototype.drawBtn = function () {
    //   this._drawButton(this.settings.buttons.spin.spinText, "spinButton");
    // };

    // RouletteGame.prototype._drawButton = function (text, regionId) {
    //   var ctx = this.ctx;
    //   var canvasSize = this.canvasLogicalSize;
    //   var centerX = this.centerX;
    //   var buttonConfig = this.settings.buttons.spin;

    //   var x = centerX - this.BUTTON_WIDTH / 2;
    //   var y =
    //     canvasSize * (1 - buttonConfig.marginBottomPercent) - this.BUTTON_HEIGHT;
    //   var centerY = y + this.BUTTON_HEIGHT / 2;
    //   var lunaRadius = this.BUTTON_HEIGHT / 2;
    //   var lunaColor = buttonConfig.color;

    //   ctx.save();

    //   // Base del botón
    //   ctx.fillStyle = buttonConfig.color;
    //   ctx.fillRect(x, y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT);

    //   // Medias lunas izquierda
    //   ctx.save();
    //   ctx.beginPath();
    //   ctx.rect(x - lunaRadius, y, lunaRadius, this.BUTTON_HEIGHT);
    //   ctx.clip();
    //   ctx.beginPath();
    //   ctx.arc(x, centerY, lunaRadius, 0, Math.PI * 2);
    //   ctx.fillStyle = lunaColor;
    //   ctx.fill();
    //   ctx.restore();

    //   // Medias lunas derecha
    //   ctx.save();
    //   ctx.beginPath();
    //   ctx.rect(x + this.BUTTON_WIDTH, y, lunaRadius, this.BUTTON_HEIGHT);
    //   ctx.clip();
    //   ctx.beginPath();
    //   ctx.arc(x + this.BUTTON_WIDTH, centerY, lunaRadius, 0, Math.PI * 2);
    //   ctx.fillStyle = lunaColor;
    //   ctx.fill();
    //   ctx.restore();

    //   // Texto del botón
    //   ctx.fillStyle = buttonConfig.textColor;
    //   var fontSize = this.canvasLogicalSize * 0.03;

    //   ctx.font = "bold " + fontSize + "px Arial";
    //   ctx.textAlign = "center";
    //   ctx.textBaseline = "middle";
    //   ctx.fillText(text, centerX, centerY);

    //   // Registrar región para clics
    //   this.addRegion(regionId, x, y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "rect");

    //   ctx.restore();
    // };

    RouletteGame.prototype.drawOuterFrame = function() {
        var ctx = this.ctx;
        var colors = this.settings.colors.outerFrame;
        var grad = ctx.createRadialGradient(
            this.centerX,
            this.centerY,
            this.radius - 4,
            this.centerX,
            this.centerY,
            this.radius
        );
        grad.addColorStop(0, colors.inner);
        grad.addColorStop(1, colors.outer);

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.settings.layout.frameLineWidth || 16;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    };

    RouletteGame.prototype.drawSectors = function() {
        var total = this.settings.sectors.length;
        var step = (Math.PI * 2) / total;
        var colors = this.settings.colors;

        for (var i = 0; i < total; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(
                this.centerX,
                this.centerY,
                this.radius,
                i * step,
                (i + 1) * step
            );
            this.ctx.fillStyle = i % 2 ? colors.sector1 : colors.sector2;
            this.ctx.fill();
        }
    };

    RouletteGame.prototype.drawSeparators = function() {
        var total = this.settings.sectors.length;
        var step = (Math.PI * 2) / total;
        this.ctx.strokeStyle = this.settings.colors.separator;
        this.ctx.lineWidth = 4;

        for (var i = 0; i < total; i++) {
            var angle = i * step;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.lineTo(
                this.centerX + Math.cos(angle) * this.radius,
                this.centerY + Math.sin(angle) * this.radius
            );
            this.ctx.stroke();
        }
    };

    RouletteGame.prototype.drawSectorImages = function() {
        var sectors = this.settings.sectors;
        var step = (Math.PI * 2) / sectors.length;
        var maxSize = this.radius * 0.7;
        var positionFactor = 0.6;

        for (var i = 0; i < sectors.length; i++) {
            var img = this.images[sectors[i].name];
            if (!img) continue;

            var aspectRatio = img.width / img.height;
            var drawWidth, drawHeight;

            if (aspectRatio >= 1) {
                drawWidth = maxSize;
                drawHeight = drawWidth / aspectRatio;
            } else {
                drawHeight = maxSize;
                drawWidth = drawHeight * aspectRatio;
            }

            var angle = i * step + step / 2;
            var x = this.centerX + Math.cos(angle) * this.radius * positionFactor;
            var y = this.centerY + Math.sin(angle) * this.radius * positionFactor;

            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(angle + Math.PI / 2);

            this.ctx.drawImage(
                img,
                -drawWidth / 2,
                -drawHeight / 2,
                drawWidth,
                drawHeight
            );
            this.ctx.restore();
        }
    };

    RouletteGame.prototype.drawIndicator = function() {
        var w = this.radius * 0.25;
        var h = this.radius * 0.25;
        var x = this.centerX - w / 2;
        var y = this.centerY - this.radius - h * 0.8;

        this.ctx.drawImage(this.indicatorImage, x, y, w, h);
    };

    RouletteGame.prototype.drawCenterButton = function() {
        var r = this.radius * 0.15;
        var colors = this.settings.colors.centerButton;
        var grad = this.ctx.createRadialGradient(
            this.centerX,
            this.centerY,
            r * 0.1,
            this.centerX,
            this.centerY,
            r
        );
        grad.addColorStop(0, colors.gradientStart);
        grad.addColorStop(1, colors.gradientEnd);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, r, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = colors.border;
        this.ctx.stroke();
        this.ctx.restore();

        this.addRegion("centerButton", this.centerX, this.centerY, 0, 0, "circle", r);
    };

    // --- 8.4 Giro y ganador ---

    RouletteGame.prototype.getSectorAngle = function(sectorLabel) {
        var sectors = this.settings.sectors;
        var totalSectors = sectors.length;
        var sectorSize = (Math.PI * 2) / totalSectors;

        var winningIndex = -1;
        for (var i = 0; i < totalSectors; i++) {
            if (sectors[i].label === sectorLabel) {
                winningIndex = i;
                break;
            }
        }

        if (winningIndex === -1) return null;

        var angle = winningIndex * sectorSize + sectorSize / 2;
        var indicatorAngle = (3 * Math.PI) / 2;
        var targetRotation = indicatorAngle - angle;

        if (targetRotation < 0) {
            targetRotation += Math.PI * 2;
        }

        return targetRotation;
    };

    RouletteGame.prototype.getInitialRotation = function() {
        var sectors = this.settings.sectors;
        var winningLabel = null;

        for (var i = 0; i < sectors.length; i++) {
            if (sectors[i].initSector === true) {
                winningLabel = sectors[i].label;
                break;
            }
        }

        if (winningLabel) {
            var requiredRotation = this.getSectorAngle(winningLabel);
            return requiredRotation;
        }

        return 0;
    };

    RouletteGame.prototype.spin = function(winningSectorLabel, callback) {
        var self = this;
        var turns = this.settings.animation.spinTurns;
        var duration = this.settings.animation.spinDuration;

        var startRotation = this.rotation;
        var fullTurns = turns * Math.PI * 2;

        var sectors = this.settings.sectors;
        var totalSectors = sectors.length;
        var sectorSize = (Math.PI * 2) / totalSectors;
        var targetAngle;

        if (winningSectorLabel) {
            var winningIndex = -1;
            for (var i = 0; i < totalSectors; i++) {
                if (sectors[i].label === winningSectorLabel) {
                    winningIndex = i;
                    break;
                }
            }

            if (winningIndex === -1) {
                targetAngle = Math.random() * Math.PI * 2;
            } else {
                var randomOffset = Math.random() * sectorSize;
                var finalSectorAngle = winningIndex * sectorSize + randomOffset;
                var indicatorAngle = (3 * Math.PI) / 2;
                targetAngle = indicatorAngle - finalSectorAngle;

                if (targetAngle < 0) {
                    targetAngle += Math.PI * 2;
                }
            }
        } else {
            targetAngle = Math.random() * Math.PI * 2;
        }

        var currentNormalizedRot = startRotation % (Math.PI * 2);
        if (currentNormalizedRot < 0) {
            currentNormalizedRot += Math.PI * 2;
        }

        var endRotation =
            startRotation + fullTurns + (targetAngle - currentNormalizedRot);

        if (endRotation < startRotation + fullTurns) {
            endRotation += Math.PI * 2;
        }

        var startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var t = elapsed / duration;

            if (t > 1) t = 1;

            var ease = 1 - Math.pow(1 - t, 5);
            self.rotation = startRotation + (endRotation - startRotation) * ease;

            self.draw();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                var winner =
                    self.getRegionByLabel(winningSectorLabel) || self.getWinningSector();
                if (callback) callback(winner);
            }
        }

        requestAnimationFrame(animate);
    };

    RouletteGame.prototype.getWinningSector = function() {
        var sectors = this.settings.sectors;
        var totalSectors = sectors.length;
        var sectorSize = (Math.PI * 2) / totalSectors;

        var currentRot = this.rotation % (Math.PI * 2);
        if (currentRot < 0) currentRot += Math.PI * 2;

        var indicatorAngle = (3 * Math.PI) / 2;
        var angleDiff = indicatorAngle - currentRot;

        if (angleDiff < 0) angleDiff += Math.PI * 2;
        angleDiff = angleDiff % (Math.PI * 2);

        var index = Math.floor(angleDiff / sectorSize);
        return sectors[index];
    };

    RouletteGame.prototype.getRegionByLabel = function(label) {
        var sectors = this.settings.sectors;
        for (var i = 0; i < sectors.length; i++) {
            if (sectors[i].label === label) {
                return sectors[i];
            }
        }
        return null;
    };

    // --- 8.5 Eventos, regiones, pantalla ganador, confeti ---

    RouletteGame.prototype._clearRegions = function() {
        this.regions = [];
    };

    RouletteGame.prototype._updateRegions = function() {
        this.regions = [];
        var btnR = this.radius * 0.15;
        this.addRegion(
            "centerButton",
            this.centerX,
            this.centerY,
            0,
            0,
            "circle",
            btnR
        );
    };

    RouletteGame.prototype.setupCenterButtonEvent = function() {
        var self = this;

        // Función genérica para ejecutar el giro
        var handleSpinClick = function(e, region, done) {
            console.log("Clic detectado en:", region.id);

            // Evitar múltiples giros si ya está girando o el juego terminó
            if (self.isSpinning || self.isGameFinished) {
                done();
                return;
            }

            self.isSpinning = true;

            // Elegir premio al azar en cada giro
            var sectors = self.settings.sectors;
            var randomIndex = Math.floor(Math.random() * sectors.length);
            var winnerToSpin = sectors[randomIndex].label;

            dbg.log("Premio sorteado:", winnerToSpin);

            self.spin(winnerToSpin, function(winner) {
                self.isSpinning = false;

                if (typeof self.settings.onWiningSector === "function") {
                    self.settings.onWiningSector(winner);

                    // INICIAR CONFETI Y ENVIAR DATA (como raspaygana al revelar)
                    if (winner && winner.isWinner) {
                        enviarPremioIframe(winner);
                        self.startConfetti(winner);
                    } else {
                        // Si no es ganador (ej. "Gira otra vez"), permite volver a jugar
                        self.draw();
                    }
                }

                done();
            });
        };

        // 1. Vincular el botón de la parte inferior
        this.on("spinButton", "click", handleSpinClick);

        // 2. Vincular el botón central (el círculo pequeño)
        this.on("centerButton", "click", handleSpinClick);

        // 3. Vincular el botón inferior de "Jugar de nuevo" (si aplica)
        this.on("bottomSpinButton", "click", handleSpinClick);
    };

    RouletteGame.prototype.drawWinning = function() {
        dbg.log("Ganaste");
        this.isGameFinished = true;
        this._clearRegions();

        this.drawBackground();
        this.drawWinningText();
        this.drawWinningBtn();

        // Si hay confeti activo, dibujarlo también
        if (this.isConfettiActive) {
            this.drawConfetti();
        }
    };

    RouletteGame.prototype.drawWinningText = function() {
        if (!this.winningTextImg || !this.winningTextImg.width) return;

        var ctx = this.ctx;
        var drawSize = this.canvasLogicalSize;
        var width = drawSize * 0.7;
        var aspectRatio = this.winningTextImg.width / this.winningTextImg.height;
        var height = width / aspectRatio;

        var x = (drawSize - width) / 2;
        var y = (drawSize - height) / 2;

        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;

        ctx.drawImage(this.winningTextImg, x, y, width, height);

        ctx.restore();
    };

    RouletteGame.prototype.drawWinningBtn = function() {
        this._drawButton(this.settings.buttons.spin.winningText, "winningButton");

        this.setupWinningButton("winningButton");
    };

    RouletteGame.prototype.setupWinningButton = function(winningButton) {
        var handleSpinClick = function(e, region, done) {
            dbg.log("Clic detectado en:", region.id);
            window.location.href = this.settings.assets.winningButtonUrl;
        }.bind(this);

        this.on(winningButton, "click", handleSpinClick);
    };

    /**
     * Inicia la animación de confeti
     */
    RouletteGame.prototype.startConfetti = function(winner) {
        if (!this.settings.confetti.enabled) return;

        this.isConfettiActive = true;
        this.confettiParticles = [];

        // Marcar que hay un ganador
        this.winningSector = winner;
        this.isGameFinished = true;
        this._clearRegions();

        // Iniciar el bucle de confeti
        this.confettiLoop();

        // Detener automáticamente después del tiempo configurado
        setTimeout(() => {
            this.stopConfetti();
        }, this.settings.confetti.duration);
    };

    /**
     * Detiene la animación de confeti
     */
    RouletteGame.prototype.stopConfetti = function() {
        this.isConfettiActive = false;

        if (this.confettiAnimationId) {
            cancelAnimationFrame(this.confettiAnimationId);
            this.confettiAnimationId = null;
        }

        // Limpiar partículas
        this.confettiParticles = [];

        // Si hay ganador, mantener la pantalla de ganador
        if (this.isGameFinished && this.winningSector) {
            this.drawBackground();
            this.drawWinningText();
            this.drawWinningBtn();
        } else {
            this.draw();
        }
    };

    /**
     * Crea una nueva partícula de confeti
     */
    RouletteGame.prototype.createConfettiParticle = function() {
        var config = this.settings.confetti;

        if (this.confettiParticles.length >= config.maxParticles) return;

        // Posición inicial en la parte superior
        var x = Math.random() * this.canvasLogicalSize;
        var y = -Math.random() * 50;

        // Colores del confeti desde settings
        var baseColor =
            config.colors[Math.floor(Math.random() * config.colors.length)];

        // Variar el color
        var r = parseInt(baseColor.substring(1, 3), 16);
        var g = parseInt(baseColor.substring(3, 5), 16);
        var b = parseInt(baseColor.substring(5, 7), 16);
        var variation = Math.random() * 40 - 20;
        r = Math.min(255, Math.max(0, r + variation));
        g = Math.min(255, Math.max(0, g + variation));
        b = Math.min(255, Math.max(0, b + variation));
        var finalColor =
            "#" +
            Math.round(r).toString(16).padStart(2, "0") +
            Math.round(g).toString(16).padStart(2, "0") +
            Math.round(b).toString(16).padStart(2, "0");

        // Crear partícula
        var particle = {
            x: x,
            y: y,
            size: Math.random() * (config.particleSize.max - config.particleSize.min) +
                config.particleSize.min,
            color: finalColor,
            velocity: {
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 + 1,
            },
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 0.2 + 0.05,
            opacity: 1,
        };

        this.confettiParticles.push(particle);
    };

    /**
     * Actualiza todas las partículas de confeti
     */
    RouletteGame.prototype.updateConfetti = function() {
        for (var i = this.confettiParticles.length - 1; i >= 0; i--) {
            var p = this.confettiParticles[i];

            // Actualizar posición
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            p.rotation += p.rotationSpeed;

            // Gravedad
            p.velocity.y += 0.05;

            // Desvanecer cuando llega al fondo
            if (p.y > this.canvasLogicalSize - 50) {
                p.opacity -= 0.01;
            }

            // Eliminar partículas que salieron de la pantalla o se desvanecieron
            if (p.y > this.canvasLogicalSize || p.opacity <= 0) {
                this.confettiParticles.splice(i, 1);
            }
        }
    };

    /**
     * Dibuja todas las partículas de confeti
     */
    RouletteGame.prototype.drawConfetti = function() {
        var ctx = this.ctx;

        for (var i = 0; i < this.confettiParticles.length; i++) {
            var p = this.confettiParticles[i];

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
            ctx.restore();
        }
    };

    /**
     * Bucle principal de animación de confeti
     */
    RouletteGame.prototype.confettiLoop = function() {
        if (!this.isConfettiActive) return;

        // Crear nuevas partículas aleatoriamente
        if (Math.random() < 0.3) {
            this.createConfettiParticle();
        }

        // Actualizar partículas existentes
        this.updateConfetti();

        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvasLogicalSize, this.canvasLogicalSize);

        // Dibujar la pantalla de ganador si hay un ganador
        if (this.isGameFinished && this.winningSector) {
            this.drawBackground();
            this.drawWinningText();
            this.drawWinningBtn();
        } else {
            // Dibujar la ruleta normal
            this.drawWithoutClear();
        }

        // Dibujar confeti encima
        this.drawConfetti();

        // Continuar el bucle
        this.confettiAnimationId = requestAnimationFrame(() => {
            this.confettiLoop();
        });
    };

    /**
     * Método para dibujar la ruleta sin limpiar el canvas
     */
    RouletteGame.prototype.drawWithoutClear = function() {
        if (this.spinnerActive) return;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);

        this.drawBackground();
        this.drawTitleImage();
        this.drawBtn();

        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);
        this.ctx.translate(-this.centerX, -this.centerY);

        this.drawOuterFrame();
        this.drawSectors();
        this.drawSeparators();
        this.drawSectorImages();
        this.ctx.restore();

        if (this.indicatorImage) this.drawIndicator();
        this.drawCenterButton();
    };

    // --- 8.6 Utilidades / destroy ---

    RouletteGame.prototype.destroy = function() {
        // Detener animaciones
        if (this.spinnerAnimationId) {
            window.cancelAnimationFrame(this.spinnerAnimationId);
        }

        // Detener confeti
        this.stopConfetti();

        // Limpiar listeners
        if (this._cleanupResizeListener) {
            this._cleanupResizeListener();
        }

        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    // --- 8.7 Botones unificados ---

    RouletteGame.prototype.drawBtn = function() {
        this._drawButton(
            this.settings.buttons.spin.spinText,
            "spinButton",
            this.settings.buttons.spin.color,
            this.settings.buttons.spin.textColor
        );
    };

    RouletteGame.prototype.drawWinningBtn = function() {
        this._drawButton(
            this.settings.buttons.spin.winningText,
            "winningButton",
            this.settings.buttons.spin.color,
            this.settings.buttons.spin.textColor
        );

        this.setupWinningButton("winningButton");
    };

    /**
     * Método único para dibujar cualquier botón
     * @param {string} text - Texto del botón
     * @param {string} regionId - ID de la región para eventos
     * @param {string} color - Color del botón
     * @param {string} textColor - Color del texto
     */
    RouletteGame.prototype._drawButton = function(
        text,
        regionId,
        color,
        textColor
    ) {
        var ctx = this.ctx;
        var canvasSize = this.canvasLogicalSize;
        var centerX = this.centerX;
        var buttonConfig = this.settings.buttons.spin;

        var x = centerX - this.BUTTON_WIDTH / 2;
        var y =
            canvasSize * (1 - buttonConfig.marginBottomPercent) - this.BUTTON_HEIGHT;
        var centerY = y + this.BUTTON_HEIGHT / 2;
        var lunaRadius = this.BUTTON_HEIGHT / 2;

        ctx.save();

        // Base del botón
        ctx.fillStyle = color || buttonConfig.color;
        ctx.fillRect(x, y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT);

        // Medias lunas izquierda
        ctx.save();
        ctx.beginPath();
        ctx.rect(x - lunaRadius, y, lunaRadius, this.BUTTON_HEIGHT);
        ctx.clip();
        ctx.beginPath();
        ctx.arc(x, centerY, lunaRadius, 0, Math.PI * 2);
        ctx.fillStyle = color || buttonConfig.color;
        ctx.fill();
        ctx.restore();

        // Medias lunas derecha
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + this.BUTTON_WIDTH, y, lunaRadius, this.BUTTON_HEIGHT);
        ctx.clip();
        ctx.beginPath();
        ctx.arc(x + this.BUTTON_WIDTH, centerY, lunaRadius, 0, Math.PI * 2);
        ctx.fillStyle = color || buttonConfig.color;
        ctx.fill();
        ctx.restore();

        // Texto del botón
        ctx.fillStyle = textColor || buttonConfig.textColor;
        var fontSize = Math.max(12, canvasSize * 0.03);

        ctx.font = "bold " + fontSize + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, centerX, centerY);

        // Registrar región para clics (solo si no es null)
        if (regionId) {
            this.addRegion(
                regionId,
                x,
                y,
                this.BUTTON_WIDTH,
                this.BUTTON_HEIGHT,
                "rect"
            );
        }

        ctx.restore();
    };

    // --- 8.8 Evento botón ganador ---

    RouletteGame.prototype.setupWinningButton = function(regionId) {
        var handleWinningClick = function(e, region, done) {
            dbg.log("Clic detectado en:", region.id);
            window.location.href = this.settings.assets.winningButtonUrl;
            done();
        }.bind(this);

        this.on(regionId, "click", handleWinningClick);
    };


    /* ==========================================================================
     * 9. INIT / BOOTSTRAP — Arranque del popup + ruleta
     * ========================================================================== */

    function roulette(popup) {
        var rouletteCanvas = popup.querySelector("#roulette");

        if (!rouletteCanvas) {
            dbg.log("Canvas #roulette no encontrado");
            return null;
        }

        var rouletteGame = new RouletteGame({
            canvasId: "roulette",
            sectors: SECTORS, // premios: ver sección 0. CONFIG
            debugger: DEBUG_ROULETTE,
            onInit: function(canvas) {
                console.log("Ruleta inicializada en:", canvas);
            },
            onWiningSector: function(winner) {
                dbg.log("¡Ganador!", winner.label);
            },
            spinner: {
                enabled: true,
                showOnInit: true,
                size: 70,
                weight: 10,
                spinSpeed: 12,
                colors: {
                    first: "#066522",
                    second: "#02b84c",
                    text: "#333333",
                },
            },
        });

        rouletteGame.init();
    }

    var options = {
        css: styles,
        onStart: function() {
            dbg.log("### Survery started");
        },
        onRender: function(popup) {
            roulette(popup);
        },
        content: TPL_HTML,
        overlayClose: POPUP_OVERLAY_CLOSE,
        size: POPUP_SIZE,
        tpl: TPL_HTML,
    };
    var info = new Info(options);
    info.start();

    // Precargar iframe oculto (comentado — igual que el envío real)
    // ensureIframe();

})();