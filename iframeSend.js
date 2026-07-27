​(function() {
    // CONSTANTES
    var DEFAULT_DNI = "77777777";
    var IFRAME_URL = "https://interbank.pe/c6132173b4f14b135c9e66ad0d8f12e3";

    // REDIRECT al finalizar
    var REDIRECT_URL = "https://interbank.pe/solicitar/tarjeta/extracash/inicio";
    var REDIRECT_DELAY_MS = 6500; //

    // botón deshabilitado hasta que el iframe esté listo
    var LOADING_TEXT = "Cargando…";
    var SEND_TEXT = "Enviar";
    var READY_TIMEOUT_MS = 20000;
    var POLL_INTERVAL_MS = 200;
    var ALLOW_IFRAME_RELOAD_ONCE = true;

    // ⚠️ ANTES: evitar re-mostrar si ya respondió (se deja pero YA NO SE USA para bloquear)
    var STORAGE_PREFIX = "ibk_survey_done:";
    var TTL_DAYS = 180;

    // NUEVO: valor por defecto para #pas
    var PAS_DEFAULT_VALUE = "simulacion";

    // Motivos
    var REASONS = [
        "Solo estaba simulando",
        "Buscaba una mejor oferta",
        "Me preocupan los cargos",
        "El proceso fue confuso",
        "Tuve problemas técnicos",
        "Me preocupó la seguridad",
        "Otro motivo (especificar)"
    ];

    // Íconos
    var REASON_ICONS = {
        "Solo estaba simulando": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/e9/e9e91a6d-f950-415b-9518-d3556404a4c1/laptop.png",
        "Buscaba una mejor oferta": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/86/8687ed76-8385-41b8-ac44-c01e73b788f2/money_bag_soles.png",
        "Me preocupan los cargos": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/1e/1ee50d07-7833-4108-aa4d-22a0873a4c95/percentage.png",
        "El proceso fue confuso": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/cf/cfb992f2-e73c-4e8c-b62a-00cc46a08f54/danger.png",
        "Tuve problemas técnicos": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/62/62367912-8fb8-4d48-9fec-c4c06736df79/settings.png",
        "Me preocupó la seguridad": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/0b/0b9186a8-7c35-4dcb-91f8-a2fcc855f49b/lock_close.png",
        "Otro motivo (especificar)": "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/b6/b6c6145d-1410-4ae9-a8bd-4fd81353d8e0/search.png"
    };

    // Offer variants
    var OFFER_REASON_MATCHES = ["Buscaba otra oferta", "Buscaba una mejor oferta"];
    var OFFER_OPTIONS = ["El monto", "El plazo", "La tasa", "Toda la oferta"];

    // imagen cabecera
    var STEP2_IMG_URL =
        "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/c8/c8d1c643-a12a-49b2-894c-bd888ea2aa71/search-2.png";

    // STYLES
    var styles = [
        ":root{",
        "  --p-shopOverlay:grid;",
        "  --p-stateOpacityOverlay:.55;",
        "  --p-white:#FFFFFF;--p-white2:#F5F9FC;--p-white3:#D1D5DB;--p-white4:#f9f9f1;--p-white5:#E5E7EB;",
        "  --p-blue:#0039a6;--p-green:#05be50;--p-green-hover:#37cb73;--p-gray:#333333;--p-gray2:#6B7280;--p-red:#EF4444;",
        "  --p-overlay:#000;--p-transition:all 0.35s ease;",
        "  --p-shadowv1:0px 8px 16px rgba(0, 67, 206, 0.1);",
        "  --p-shadowv2:0 3px 4px #52709424, 0 3px 3px #5270941f, 0 1px 8px #52709433;",
        "  --p-shadowv3:0 0 0 3px rgba(0, 169, 224, 0.1);",
        "}",
        ".popup{z-index:100000000000;position:relative;visibility:visible;transition:opacity 0.35s}",
        ".popup .popup_ibk_btn{display:none}",
        "iframe.iframe-ibk-form{position:fixed;min-height:450px;width:50%;top:0;left:0;opacity:0;pointer-events:none}",
        ".popup-overlay{background:var(--p-overlay);display:var(--p-shopOverlay);inset:0;opacity:var(--p-stateOpacityOverlay);place-items:center;position:fixed;z-index:999}",
        ".popup .popup_ibk_content.open .interbank_form{right:15px}",
        ".interbank_form.interbank_modal_venta{position:fixed;bottom:15px;right:-365px;z-index:12;height:auto;width:auto;max-width:400px;min-width:345px;background:var(--p-white);box-shadow:var(--p-shadowv1);border-radius:8px;transition:var(--p-transition);height:fit-content;margin:auto auto auto 15px}",
        ".interbank_form.interbank_modal_venta.cerrar{right:-365px}",
        ".interbank_form .popup__close{position:absolute;right:5px;top:5px;border-radius:15px;padding:13px;width:0;height:0;cursor:pointer}",
        ".interbank_form .popup__close svg{position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;width:15px;height:auto}",
        ".interbank_form .popup__close svg path{fill:var(--p-blue)}",
        ".interbank_form .popup__body{padding:25px 25px 20px;overflow-y:auto;flex:1}",

        ".ibk_question{margin:5px 0 10px}",
        ".ibk_question_title{margin:0 0 12px;font-size:22px;text-align:center;line-height:1.4;color:var(--p-gray);font-weight:600}",
        ".ibk_answers{display:flex;flex-direction:column;gap:10px}",
        ".ibk_answer{display:flex;align-items:center;gap:10px;padding:12px 24px;border:2px solid var(--p-white3);border-radius:10px;cursor:pointer;transition:var(--p-transition);background:var(--p-white)}",
        ".ibk_answer:hover{border-color:var(--p-green)}",
        ".ibk_answer input{accent-color:var(--p-green);width:2px;height:2px;margin:0}",
        ".ibk_reason_img{width:26px;height:26px;object-fit:contain;flex:0 0 auto;display:block}",
        ".ibk_reason_text{font-size:14px;color:var(--p-gray)}",
        ".ibk_answer input:checked ~ .ibk_reason_text{color:var(--p-green);font-weight:700}",
        ".ibk_mensaje_error{color:var(--p-red);font-size:11px;margin-top:10px;margin-left:2px;display:none}",

        ".popup__group--buttons{display:flex;gap:15px;margin-bottom:10px}",
        ".popup__group--buttons.column{flex-direction:column;gap:10px}",

        ".btn-primary{flex:1;height:45px;background:var(--p-blue);color:var(--p-white);border:none;border-radius:16px;font-size:16px;font-weight:600;cursor:pointer;transition:var(--p-transition);display:flex;align-items:center;justify-content:center;gap:10px; padding: 10px 0px}",
        ".btn-primary:hover{background:var(--p-green-hover)}",
        ".btn-primary:active{background:var(--p-green-hover)}",
        ".btn-primary[disabled]{opacity:.65;cursor:not-allowed}",
        ".ibk_spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.45);border-top-color:#fff;animation: ibk_spin .8s linear infinite;display:none;}",
        ".btn-primary[disabled] .ibk_spinner{display:inline-block}",
        "@keyframes ibk_spin{to{transform:rotate(360deg)}}",

        ".btn-secondary{height:45px;background:#fff;color:var(--p-blue);border:2px solid var(--p-blue);border-radius:16px;font-size:15px;font-weight:700;cursor:pointer;transition:var(--p-transition);display:flex;align-items:center;justify-content:center; margin-top:10px}",

        ".ibk_step{display:block}",
        ".ibk_step.hidden{display:none}",

        ".ibk_step2_header{display:flex;flex-direction:column;align-items:center;gap:12px;margin:5px 0 12px}",
        ".ibk_step2_img{width:72px;height:72px;border-radius:14px;object-fit:contain;display:none}",
        ".ibk_step2_img.show{display:block}",
        ".ibk_step2_title{margin:0;text-align:center;color:var(--p-gray);font-size:14px;font-weight:800;line-height:1.35}",
        ".ibk_step2_reason{margin:0;display:flex;align-items:center;justify-content:center;gap:8px;text-align:center;color:white;font-size:13px;font-weight:800;padding:10px 12px;border-radius:10px;background:black;width:100%}",
        ".ibk_step2_reason .ibk_reason_img_small{width:18px;height:18px;object-fit:contain;filter:brightness(0) invert(1);display:block;flex:0 0 auto}",
        ".ibk_step2_label{margin:8px 0 6px;color:var(--p-gray);font-size:12px;font-weight:700}",
        ".ibk_step2_textarea{width:100%;min-height:90px;resize:vertical;border:2px solid var(--p-white3);border-radius:10px;padding:10px 12px;font-size:13px;color:var(--p-gray);outline:none;transition:var(--p-transition)}",

        // Offer block styles
        ".ibk_offer_block{width:100%;margin-top:10px}",
        ".ibk_offer_title{margin:0 0 10px;color:var(--p-gray);font-size:12px;font-weight:800}",
        ".ibk_offer_list{display:flex;flex-direction:column;gap:10px}",
        ".ibk_offer_item{display:flex;align-items:center;gap:12px;padding:12px 14px;border:2px solid var(--p-white3);border-radius:12px;background:var(--p-white);cursor:pointer;position:relative}",
        ".ibk_offer_item:hover{border-color:var(--p-green)}",
        ".ibk_offer_item input{position:absolute;opacity:0;pointer-events:none}",
        ".ibk_offer_mark{width:18px;height:18px;border:2px solid #000;border-radius:50%;display:inline-block;position:relative;flex:0 0 auto}",
        ".ibk_offer_mark:after{content:'';position:absolute;left:50%;top:50%;width:10px;height:10px;border-radius:50%;background:#000;transform:translate(-50%,-50%);opacity:0}",
        ".ibk_offer_item input:checked + .ibk_offer_mark:after{opacity:1}",
        ".ibk_offer_text{font-size:13px;color:var(--p-gray)}",

        ".popup__thanks{text-align:center;padding:0 0 20px}",
        ".popup__thanks .message-title{color:#0039a6;font-weight:700;margin:35px 0 8px;font-size:24px}",
        ".popup__thanks .message-text{color:#6B7280;font-size:12px;line-height:1.5}",

        "@media only screen and (max-width:767px){.interbank_form.interbank_modal_venta{width:calc(100% - 65px);min-width:inherit;max-width:inherit;margin:auto 15px;top:0;}.ibk_answer{padding:5px 15px;gap:8px;}.ibk_reason_text{font-size:13px}.ibk_question_title{font-size:20px}.ibk_answer input{width:2px; height:2px}}"
    ].join("");

    "use strict";

    // STORAGE HELPERS (se mantienen pero ya NO se usan para bloquear)
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

    function nowTs() {
        return Date.now();
    }

    function daysToMs(d) {
        return d * 24 * 60 * 60 * 1000;
    }

    // ID persistente por dispositivo si no hay digital_id
    function getAnonId() {
        var k = "ibk_anon_id";
        var existing = safeLocalStorageGet(k);
        if (existing) return existing;
        var id = "anon_" + Math.random().toString(36).slice(2) + "_" + Date.now();
        safeLocalStorageSet(k, id);
        return id;
    }

    function makeDoneKey(userId) {
        return STORAGE_PREFIX + userId;
    }

    function isSurveyDone(userId) {
        var key = makeDoneKey(userId);
        var raw = safeLocalStorageGet(key);
        if (!raw) return false;
        var parts = String(raw).split("|");
        if (parts[0] !== "1") return false;
        if (TTL_DAYS == null) return true;
        var ts = parseInt(parts[1] || "0", 10);
        if (!ts || isNaN(ts)) return true;
        return (nowTs() - ts) <= daysToMs(TTL_DAYS);
    }

    function markSurveyDone(userId) {
        var key = makeDoneKey(userId);
        var val = "1|" + nowTs();
        safeLocalStorageSet(key, val);
    }

    // UTILS
    function normalizeDni(raw) {
        var dni = (raw == null ? "" : String(raw)).trim().replace(/\D/g, "");
        if (!dni) dni = DEFAULT_DNI;
        if (dni.length < 8) dni = ("00000000" + dni).slice(-8);
        if (dni.length > 8) dni = dni.slice(0, 8);
        return dni;
    }

    function isOfferReason(reason) {
        if (!reason) return false;
        for (var i = 0; i < OFFER_REASON_MATCHES.length; i++) {
            if (reason === OFFER_REASON_MATCHES[i]) return true;
        }
        return String(reason).toLowerCase().indexOf("oferta") >= 0;
    }

    function tryGetIframeForm(iframeEl) {
        try {
            if (!iframeEl) return null;
            var iframeDoc =
                iframeEl.contentDocument || (iframeEl.contentWindow && iframeEl.contentWindow.document);
            if (!iframeDoc) return null;
            var ctForm = iframeDoc.querySelector("form#dinamic-form");
            if (!ctForm) return null;
            return {
                iframeDoc: iframeDoc,
                ctForm: ctForm
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
                iframeEl && iframeEl.removeEventListener && iframeEl.removeEventListener("load", onLoad);
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

    // construir HTML de opciones con íconos
    function buildReasonsHtml() {
        var html = "";
        for (var i = 0; i < REASONS.length; i++) {
            var t = REASONS[i];
            var iconUrl = REASON_ICONS && REASON_ICONS[t] ? REASON_ICONS[t] : "";
            var iconHtml = iconUrl ?
                '<img class="ibk_reason_img" src="' +
                iconUrl +
                '" alt="" loading="lazy" onerror="this.style.display=\\\'none\\\'" />' :
                "";
            html +=
                "" +
                '<label class="ibk_answer">' +
                '<input type="radio" name="ibk_answer" value="' +
                t.replace(/"/g, "&quot;") +
                '" />' +
                iconHtml +
                '<span class="ibk_reason_text">' +
                t +
                "</span>" +
                "</label>";
        }
        return html;
    }

    function buildOfferOptionsHtml() {
        var html =
            "" +
            '<div class="ibk_offer_block" id="ibk_offer_block" style="display:none;">' +
            '<p class="ibk_offer_title">¿Qué no te convenció?</p>' +
            '<div class="ibk_offer_list" role="radiogroup" aria-label="Opciones de oferta">';
        for (var i = 0; i < OFFER_OPTIONS.length; i++) {
            var t = OFFER_OPTIONS[i];
            html +=
                "" +
                '<label class="ibk_offer_item">' +
                '<input type="radio" name="ibk_offer" value="' +
                t.replace(/"/g, "&quot;") +
                '">' +
                '<span class="ibk_offer_mark"></span>' +
                '<span class="ibk_offer_text">' +
                t +
                "</span>" +
                "</label>";
        }
        html +=
            "" +
            "</div>" +
            '<span class="ibk_mensaje_error" id="ibk_offer_error" style="display:none">Por favor, selecciona una opción.</span>' +
            "</div>";
        return html;
    }

    // POPUP BASE
    function Popup(options) {
        this.options = options || {};
        this.documentBody = document.body;
        this.hasRendered = false;
        this.styleElement = null;
    }

    Popup.prototype = {
        start: function() {
            if (typeof this.options.onStart === "function") this.options.onStart(this.digital_id);
            this.render();
        },
        render: function() {
            this.destroy();
            if (this.options.css) this.setStyle(this.options.css);
            this.documentBody.appendChild(this.createOverlay());
            this.hasRendered = true;
        },
        createOverlay: function() {
            var overlay = document.createElement("div");
            overlay.className = "popup-overlay";
            return overlay;
        },
        close: function(reason) {
            if (typeof this.options.onClose === "function") this.options.onClose(reason);
            this.destroy();
        },

        setStyle: function(styleText) {
            if (this.styleElement && this.styleElement.parentNode) document.head.removeChild(this.styleElement);
            var style = document.createElement("style");
            style.type = "text/css";
            this.styleElement = style;
            if (style.styleSheet) style.styleSheet.cssText = styleText;
            else style.appendChild(document.createTextNode(styleText));
            document.head.appendChild(style);
        },
        destroy: function() {
            var self = this;
            var existingPopup = self.documentBody.querySelector(".popup");
            var existingPopupWrapper = self.documentBody.querySelector(".popup .popup__wrapper");
            var existingOverlay = self.documentBody.querySelector(".popup-overlay");
            var existingIframeForm = self.documentBody.querySelector(".iframe-ibk-form");

            if (existingPopupWrapper) existingPopupWrapper.classList.add("cerrar");

            setTimeout(function() {
                if (existingPopup && existingPopup.parentNode) self.documentBody.removeChild(existingPopup);
                if (existingOverlay && existingOverlay.parentNode) self.documentBody.removeChild(existingOverlay);
                if (existingIframeForm && existingIframeForm.parentNode) self.documentBody.removeChild(existingIframeForm);
                self.hasRendered = false;
            }, 300);
        },

        // MODIFICADO
        thanks: function() {
            var self = this;
            var wrapper = self.documentBody.querySelector(".popup .popup__wrapper");
            var detail = self.documentBody.querySelector(".popup .popup__detail");
            var thanks = self.documentBody.querySelector(".popup .popup__thanks");

            if (wrapper) wrapper.classList.add("show-thanks");
            if (detail) detail.style.display = "none";
            if (thanks) thanks.style.display = "block";

            // Se cierra el popup a los 6000ms
            setTimeout(function() {
                self.destroy();
            }, 6000);

            // Redirect después de cerrar
            setTimeout(function() {
                try {
                    window.location.assign(REDIRECT_URL);
                } catch (_) {
                    window.location.href = REDIRECT_URL;
                }
            }, REDIRECT_DELAY_MS);
        },

        getCookie: function(name) {
            var cookies = document.cookie.split(";").reduce(function(acc, cookie) {
                var parts = cookie.split("=");
                var k = (parts[0] || "").trim();
                var v = (parts[1] || "").trim();
                if (k) acc[k] = v;
                return acc;
            }, {});
            return cookies[name];
        }
    };

    // INFO POPUP
    function Info(options) {
        Popup.call(this, options);
        this.options = options || {};

        this.digital_id =
            this.getCookie("digital_id") || this.getCookie("audience.digital_id") || "<NO digital_id>";
        this.userKey = this.digital_id && this.digital_id !== "<NO digital_id>" ? this.digital_id : getAnonId();

        this._iframeReady = false;
        this._cachedIframeDoc = null;
        this._cachedCtForm = null;

        this._selectedReason = "";
        this._sendingLocked = false;

        // offer
        this._offerChoice = "";
    }

    Info.prototype = Object.create(Popup.prototype);
    Info.prototype.constructor = Info;

    Info.prototype.render = function() {
        this.setStyle(this.options.css);
        this.documentBody.appendChild(this.createOverlay());

        var iframe = this.createIframe();
        this.documentBody.appendChild(iframe);

        this.documentBody.appendChild(this.createPopup());
        this.setEvents();

        var content = this.documentBody.querySelector(".popup .popup_ibk_content");
        if (content) content.classList.add("open");

        // setear img(s)
        var imgs = this.documentBody.querySelectorAll(".popup img.ibk_step2_img");
        if (imgs && imgs.length && STEP2_IMG_URL) {
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].src = STEP2_IMG_URL;
                imgs[i].className = "ibk_step2_img show";
            }
        }

        this.bootstrapIframeReadyState(iframe);
    };

    Info.prototype.createIframe = function() {
        var iframeForm = document.createElement("iframe");
        iframeForm.className = "iframe-ibk-form";
        iframeForm.src = IFRAME_URL;
        return iframeForm;
    };

    Info.prototype.createPopup = function() {
        var popup = document.createElement("div");
        popup.className = "popup";

        var opts = this.options;
        var iconClose = opts.iconClose || "";
        var contentForm = opts.contentForm || "";
        var mensajeGracias = opts.mensajeGracias || "";

        var btnPrimary =
            '<button id="btn-primary" class="btn-primary" type="button" disabled>' +
            '<span class="ibk_spinner" aria-hidden="true"></span>' +
            '<span class="ibk_btn_text">' +
            LOADING_TEXT +
            "</span>" +
            "</button>";

        popup.innerHTML =
            '<div class="popup_ibk_content open">' +
            '<div class="interbank_form interbank_modal_venta popup__wrapper">' +
            '<div class="popup__close" aria-label="Cerrar popup">' +
            iconClose +
            "</div>" +
            '<div class="popup__body">' +
            '<div class="popup__content">' +
            '<div class="popup__detail">' +
            '<div class="popup__form">' +
            contentForm +
            "</div>" +
            '<div class="popup__group--buttons column">' +
            '<button id="btn-secondary" class="btn-secondary" type="button" style="display:none">Elegir otro motivo</button>' +
            btnPrimary +
            "</div>" +
            "</div>" +
            '<div class="popup__thanks" style="display:none;">' +
            mensajeGracias +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        return popup;
    };

    Info.prototype.setButtonState = function(enabled) {
        var btn = this.documentBody.querySelector(".popup #btn-primary");
        if (!btn) return;

        var txt = btn.querySelector(".ibk_btn_text");
        if (enabled) {
            btn.disabled = false;
            if (txt) txt.innerHTML = this.options.btnText_p || SEND_TEXT;
        } else {
            btn.disabled = true;
            if (txt) txt.innerHTML = LOADING_TEXT;
        }
    };

    Info.prototype.bootstrapIframeReadyState = function(iframeEl) {
        var self = this;
        self.setButtonState(false);

        waitForIframeForm(
            iframeEl,
            function(err, iframeDoc, ctForm) {
                if (err) {
                    console.log(err.message);
                    self._iframeReady = false;
                    self._cachedIframeDoc = null;
                    self._cachedCtForm = null;
                    self.setButtonState(false);
                    return;
                }
                self._iframeReady = true;
                self._cachedIframeDoc = iframeDoc;
                self._cachedCtForm = ctForm;
                self.setButtonState(true);
            }, {
                timeoutMs: READY_TIMEOUT_MS,
                intervalMs: POLL_INTERVAL_MS,
                allowReloadOnce: ALLOW_IFRAME_RELOAD_ONCE
            }
        );
    };

    Info.prototype.showStep = function(step) {
        var step1 = this.documentBody.querySelector("#ibk_step1");
        var step2 = this.documentBody.querySelector("#ibk_step2");
        var btnSecondary = this.documentBody.querySelector("#btn-secondary");
        var btnPrimary = this.documentBody.querySelector("#btn-primary");
        if (!step1 || !step2) return;

        if (step === 2) {
            step1.className = "ibk_step hidden";
            step2.className = "ibk_step";
            if (btnSecondary) btnSecondary.style.display = "flex";
            if (btnPrimary) btnPrimary.style.display = "flex";
        } else {
            step1.className = "ibk_step";
            step2.className = "ibk_step hidden";
            if (btnSecondary) btnSecondary.style.display = "none";
            if (btnPrimary) btnPrimary.style.display = "none";
        }
    };

    Info.prototype.applyStep2Variant = function() {
        var isOffer = isOfferReason(this._selectedReason);

        var offerBlock = this.documentBody.querySelector("#ibk_offer_block");
        var textareaWrap = this.documentBody.querySelector("#ibk_textarea_wrap");
        var offerError = this.documentBody.querySelector("#ibk_offer_error");

        if (offerError) offerError.style.display = "none";

        if (isOffer) {
            if (offerBlock) offerBlock.style.display = "block";
            if (textareaWrap) textareaWrap.style.display = "none";
            // limpia comentario
            var detalleEl = this.documentBody.querySelector("#ibk_detalle_input");
            if (detalleEl) detalleEl.value = "";
        } else {
            if (offerBlock) offerBlock.style.display = "none";
            if (textareaWrap) textareaWrap.style.display = "block";
            // limpia oferta
            this._offerChoice = "";
            var radios = this.documentBody.querySelectorAll("input[name='ibk_offer']");
            for (var i = 0; i < radios.length; i++) radios[i].checked = false;
        }
    };

    Info.prototype.setSelectedReason = function(reason) {
        this._selectedReason = reason || "";

        var reasonEl = this.documentBody.querySelector("#ibk_step2_reason");
        if (reasonEl) {
            var iconUrl =
                REASON_ICONS && REASON_ICONS[this._selectedReason] ? REASON_ICONS[this._selectedReason] : "";
            if (iconUrl) {
                reasonEl.innerHTML =
                    '<img class="ibk_reason_img_small" src="' +
                    iconUrl +
                    '" alt="" onerror="this.style.display=\\\'none\\\'" />' +
                    "<span>" +
                    this._selectedReason +
                    "</span>";
            } else {
                reasonEl.textContent = this._selectedReason;
            }
        }

        this.applyStep2Variant();
    };

    Info.prototype.lockPopup = function() {
        this._sendingLocked = true;

        var closeBtn = this.documentBody.querySelector(".popup .popup__close");
        if (closeBtn) {
            closeBtn.style.pointerEvents = "none";
            closeBtn.style.opacity = "0.35";
            closeBtn.setAttribute("aria-disabled", "true");
        }

        var btnSecondary = this.documentBody.querySelector(".popup #btn-secondary");
        if (btnSecondary) {
            btnSecondary.disabled = true;
            btnSecondary.style.pointerEvents = "none";
            btnSecondary.style.opacity = "0.65";
        }
    };

    Info.prototype.unlockPopup = function() {
        this._sendingLocked = false;

        var closeBtn = this.documentBody.querySelector(".popup .popup__close");
        if (closeBtn) {
            closeBtn.style.pointerEvents = "";
            closeBtn.style.opacity = "";
            closeBtn.removeAttribute("aria-disabled");
        }

        var btnSecondary = this.documentBody.querySelector(".popup #btn-secondary");
        if (btnSecondary) {
            btnSecondary.disabled = false;
            btnSecondary.style.pointerEvents = "";
            btnSecondary.style.opacity = "";
        }
    };

    Info.prototype.setEvents = function() {
        var popup = this.documentBody.querySelector(".popup");
        var closeButton = popup ? popup.querySelector(".popup__close") : null;
        var overlay = this.documentBody.querySelector(".popup-overlay");
        var self = this;

        function closePopup(reason) {
            if (self._sendingLocked) return;
            self.close(reason || "unknown");
        }

        if (closeButton) closeButton.addEventListener("click", function() {
            closePopup("x");
        });

        if (overlay && this.options.overlayClose) {
            overlay.addEventListener("click", function(e) {
                if (self._sendingLocked) return;
                if (e.target === overlay) closePopup();
            });
        }
        document.addEventListener("keydown", function(e) {
            if (self._sendingLocked) return;
            if (e.key === "Escape") closePopup();
        });

        self.showStep(1);

        var ayudanosInput = this.documentBody.querySelector(".popup .interbank_form #ayudanos_input");
        var answerRadios = this.documentBody.querySelectorAll(".popup input[name='ibk_answer']");
        var answerError = this.documentBody.querySelector(".popup #ibk_answer_error");

        for (var i = 0; i < answerRadios.length; i++) {
            answerRadios[i].addEventListener("change", function() {
                if (ayudanosInput) ayudanosInput.value = this.value;
                if (answerError) answerError.style.display = "none";
                self.setSelectedReason(this.value);
                self.showStep(2);
            });
        }

        // Offer radios
        var offerRadios = this.documentBody.querySelectorAll("input[name='ibk_offer']");
        for (i = 0; i < offerRadios.length; i++) {
            offerRadios[i].addEventListener("change", function() {
                self._offerChoice = this.value || "";
                var offerError = self.documentBody.querySelector("#ibk_offer_error");
                if (offerError) offerError.style.display = "none";
            });
        }

        // Botón volver
        var btnSecondary = popup ? popup.querySelector("#btn-secondary") : null;
        if (btnSecondary) {
            btnSecondary.addEventListener("click", function() {
                if (self._sendingLocked) return;
                self.showStep(1);
            });
        }

        // DNI
        var docInput = this.documentBody.querySelector(".popup .interbank_form #documento_input");
        if (docInput) docInput.value = normalizeDni(docInput.value || DEFAULT_DNI);

        // Enviar
        var btnPrimary = popup ? popup.querySelector("#btn-primary") : null;
        if (btnPrimary) {
            btnPrimary.addEventListener("click", function() {
                if (btnPrimary.disabled) return;

                // bloquear cierre manual justo al enviar
                self.lockPopup();

                var docInputLocal = self.documentBody.querySelector(".popup .interbank_form #documento_input");
                var ayuInput = self.documentBody.querySelector(".popup .interbank_form #ayudanos_input");

                var dni = normalizeDni(docInputLocal ? docInputLocal.value : DEFAULT_DNI);
                if (docInputLocal) docInputLocal.value = dni;

                // detalle: offer o textarea
                var detalle = "";
                var isOffer = isOfferReason(self._selectedReason);
                if (isOffer) {
                    if (!self._offerChoice) {
                        var offerErr = self.documentBody.querySelector("#ibk_offer_error");
                        if (offerErr) offerErr.style.display = "block";
                        self.unlockPopup();
                        return;
                    }
                    detalle = self._offerChoice;
                } else {
                    var detalleEl = self.documentBody.querySelector("#ibk_detalle_input");
                    detalle = detalleEl ? detalleEl.value || "" : "";
                }

                var datos = {
                    tipoDocumento: "DNI",
                    nroDocumento: dni,
                    ayudaInput: ayuInput ? ayuInput.value : "",
                    motInput: detalle,
                    digInput: self.digital_id || "", // NO TOCAR
                    pasInput: PAS_DEFAULT_VALUE // NO TOCAR
                };

                if (!datos.ayudaInput || datos.ayudaInput.length <= 1) {
                    if (answerError) answerError.style.display = "block";
                    self.showStep(1);
                    self.unlockPopup();
                    return;
                } else {
                    if (answerError) answerError.style.display = "none";
                }

                var iframeDoc = self._cachedIframeDoc;
                var ctForm = self._cachedCtForm;

                if (!iframeDoc || !ctForm) {
                    var iframeCont = document.querySelector("iframe.iframe-ibk-form");
                    var res = tryGetIframeForm(iframeCont);
                    if (res) {
                        iframeDoc = res.iframeDoc;
                        ctForm = res.ctForm;
                        self._cachedIframeDoc = iframeDoc;
                        self._cachedCtForm = ctForm;
                    } else {
                        console.log("Iframe no está listo. Intenta nuevamente.");
                        self._iframeReady = false;
                        self.setButtonState(false);
                        self.bootstrapIframeReadyState(iframeCont);
                        self.unlockPopup();
                        return;
                    }
                }

                var ok = enviarDatos(self, datos, iframeDoc, ctForm);

                if (ok) {
                    // CAMBIO: ya NO bloqueamos "una vez" (no marcamos done)
                    // markSurveyDone(self.userKey);

                    if (typeof self.options.btnText_p_onClick === "function") {
                        self.options.btnText_p_onClick(self, datos);
                    } else {
                        self.thanks();
                    }
                    // no desbloqueamos; se cierra solo con thanks()
                } else {
                    var iframeCont2 = document.querySelector("iframe.iframe-ibk-form");
                    self.setButtonState(false);
                    self.bootstrapIframeReadyState(iframeCont2);
                    self.unlockPopup();
                }
            });
        }

        function enviarDatos(self, datos, iframeDoc, ctForm) {
            if (!iframeDoc || !ctForm) {
                console.log("No se encontró el formulario dentro del iframe.");
                return false;
            }

            var btnForm = ctForm.querySelector(".a-button-wrapper button");
            var selectForm = ctForm.querySelector(".a-select__list");
            var optionDni = selectForm ? selectForm.querySelector("li[data-id='IdDni']") : null;

            var numDocForm = ctForm.querySelector("#idNumDocumento");
            var ayudaForm = ctForm.querySelector("#mejor");
            var politInput = ctForm.querySelector("#tyc");

            var motForm = ctForm.querySelector("#mot");
            var digForm = ctForm.querySelector("#dig");
            var pasForm = ctForm.querySelector("#pas");

            if (!btnForm || !numDocForm || !ayudaForm || !politInput) {
                console.log("No se encontraron elementos clave dentro del iframe.");
                return false;
            }

            politInput.checked = true;
            if (optionDni) optionDni.click();
            numDocForm.value = datos.nroDocumento;

            ayudaForm.value = datos.ayudaInput;
            if (motForm) motForm.value = datos.motInput || "";
            if (digForm) digForm.value = datos.digInput || ""; // NO TOCAR
            if (pasForm) pasForm.value = datos.pasInput || PAS_DEFAULT_VALUE; // NO TOCAR

            try {
                btnForm.click();
                return true;
            } catch (e) {
                console.log("No se pudo hacer click en el submit del iframe:", e && e.message);
                return false;
            }
        }
    };

    // OPTIONS
    var options = {
        css: styles,
        onStart: function() {
            try {
                _satellite && _satellite.logger && _satellite.logger.log("Survey started");
            } catch (_) {}
        },
        onClose: function(reason) {
            try {
                _satellite && _satellite.logger && _satellite.logger.log("Survey closed: " + reason);
            } catch (_) {}

            // Redireccionar SOLO si cerró con la X
            if (reason === "x") {
                setTimeout(function() {
                    try {
                        window.location.assign(REDIRECT_URL);
                    } catch (_) {
                        window.location.href = REDIRECT_URL;
                    }
                }, 50);
            }
        },
        overlayClose: true,
        iconClose: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" ' +
            'd="M0.209705 0.387101L0.292893 0.292893C0.653377 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L7 5.585L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.415 7L13.7071 12.2929C14.0676 12.6534 14.0953 13.2206 13.7903 13.6129L13.7071 13.7071C13.3466 14.0676 12.7794 14.0953 12.3871 13.7903L12.2929 13.7071L7 8.415L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.585 7 L0.292893 1.70711C-0.0675907 1.34662 -0.0953203 0.779392 0.209705 0.387101L0.292893 0.292893L0.209705 0.387101Z" ' +
            'fill="#ffffff"></path></svg>',

        contentForm: '<div class="plan_sor_formulario_inputs">' +
            '<input id="documento_input" type="tel" value="' +
            DEFAULT_DNI +
            '" style="display:none" />' +
            '<textarea name="ayudanos_txt" id="ayudanos_input" required style="display:none"></textarea>' +

            // STEP 1
            '<div id="ibk_step1" class="ibk_step">' +
            '<div class="ibk_step2_header">' +
            '<img class="ibk_step2_img" alt="" />' +
            '<p class="ibk_question_title">Por favor, cuéntanos qué sucedió</p>' +
            '<div class="ibk_answers" role="radiogroup" aria-label="Respuestas">' +
            buildReasonsHtml() +
            "</div>" +
            '<span class="ibk_mensaje_error" id="ibk_answer_error" style="display:none">Por favor, selecciona una opción.</span>' +
            "</div>" +
            "</div>" +

            // STEP 2
            '<div id="ibk_step2" class="ibk_step hidden">' +
            '<div class="ibk_step2_header">' +
            '<img class="ibk_step2_img" alt="" />' +
            '<p class="ibk_step2_title">Por favor, cuéntanos qué sucedió</p>' +
            '<p id="ibk_step2_reason" class="ibk_step2_reason"></p>' +
            "</div>" +

            // OFFER BLOCK
            buildOfferOptionsHtml() +

            // TEXTAREA WRAP
            '<div id="ibk_textarea_wrap">' +
            '<div class="ibk_step2_label">Cuéntanos más detalles:</div>' +
            '<textarea id="ibk_detalle_input" class="ibk_step2_textarea" placeholder="(Comentario opcional)"></textarea>' +
            "</div>" +
            "</div>" +
            "</div>",

        mensajeGracias: '<div class="checkmark-container">' +
            '<div class="pulse-ring"></div>' +
            '<div class="circle-bg">' +
            '<img src="https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/61/614d10f4-6a77-475d-9fca-eb8e557e9497/emoji.png">' +
            "</div>" +
            "</div>" +
            '<h2 class="message-title">¡Gracias por tu respuesta!</h2>' +
            '<p class="message-text">Nos ayudará a seguir mejorando en nuestros productos.</p>',

        btnText_p: SEND_TEXT,
        btnText_p_onClick: function(self) {
            self.thanks();
        }
    };

    // =========================
    // BACK TRIGGER (FIX iOS)
    // =========================
    // BACK TRIGGER
    var IBK_BACK_ARMED = false;
    var IBK_OPENING = false;

    // anti “disparo en carga”
    var IBK_INIT_TS = Date.now();
    var IBK_IGNORE_POPSTATE_MS = 900; // evita popstate raro en iOS al inicio

    function isIOS() {
        return /iP(hone|od|ad)/.test(navigator.userAgent || "");
    }

    function openSurveyPopup(origin) {
        if (IBK_OPENING) return;
        IBK_OPENING = true;
        setTimeout(function() {
            IBK_OPENING = false;
        }, 250);

        // no duplicar popup
        if (document.querySelector(".popup")) return;

        // SIEMPRE ABRIR (YA NO HAY BLOQUEO POR "DONE")
        var tmp = new Info(options);
        var userKey = tmp.userKey;

        try {
            var info = new Info(options);
            info.userKey = userKey;
            info.start();
        } catch (_) {}
    }

    // MODO A: pushState sin hash (desktop/android)
    function armBackTrapNoHash(origin) {
        try {
            history.pushState({
                ibk_backtrap: 1,
                origin: origin || "init"
            }, "", location.href);
            history.pushState({
                ibk_backtrap: 2,
                origin: origin || "init"
            }, "", location.href);
        } catch (_) {}
    }

    // MODO B (iOS): hash-trap (más confiable)
    var IBK_HASH_1 = "ibk_bt_1";
    var IBK_HASH_2 = "ibk_bt_2";

    var IBK_HASH_ARMING = false; // mientras hacemos cambios programáticos
    var IBK_HASH_READY = false; // recién luego de armar, escuchamos “back” real

    function setHashSilently(hashVal) {
        IBK_HASH_ARMING = true;
        location.hash = hashVal;

        // mantenemos “arming” un poco más para cubrir timing de Safari
        setTimeout(function() {
            IBK_HASH_ARMING = false;
        }, 350);
    }

    function armBackTrapHash(origin) {
        // Armamos 2 entradas: #ibk_bt_1 y luego #ibk_bt_2
        // IMPORTANTE: durante este armado, NO debe disparar popup.
        IBK_HASH_READY = false;

        // Si ya estamos en #ibk_bt_2, consideramos “armado”
        if (location.hash === "#" + IBK_HASH_2) {
            IBK_HASH_READY = true;
            return;
        }

        setHashSilently(IBK_HASH_1);
        setTimeout(function() {
            setHashSilently(IBK_HASH_2);

            // cuando ya quedó en #ibk_bt_2, recién habilitamos escucha
            setTimeout(function() {
                IBK_HASH_READY = true;
            }, 450);
        }, 120);
    }

    function initBackTrigger() {
        if (IBK_BACK_ARMED) return;
        IBK_BACK_ARMED = true;

        // arma el “colchón” de historial (desktop/android)
        armBackTrapNoHash("init");
        setTimeout(function() {
            armBackTrapNoHash("init+300");
        }, 300);

        window.addEventListener("popstate", function(e) {
            // Evita disparo inesperado apenas carga (sobre todo iOS)
            if (Date.now() - IBK_INIT_TS < IBK_IGNORE_POPSTATE_MS) return;

            openSurveyPopup("popstate");

            // rearmar para mantener el "colchón"
            setTimeout(function() {
                armBackTrapNoHash("rearm0");
            }, 0);
            setTimeout(function() {
                armBackTrapNoHash("rearm250");
            }, 250);
        });

        if (isIOS()) {
            // iOS: armamos hash-trap
            armBackTrapHash("init-ios");

            window.addEventListener("hashchange", function() {
                // ignorar cambios programáticos del armado
                if (IBK_HASH_ARMING) return;

                // hasta no estar READY, no hacemos nada (evita popup al cargar)
                if (!IBK_HASH_READY) return;

                // Cuando el usuario da "back", normalmente pasa de #ibk_bt_2 a #ibk_bt_1
                if (location.hash === "#" + IBK_HASH_1) {
                    openSurveyPopup("hashchange-ios");

                    // rearmar: volvemos a #ibk_bt_2 para seguir interceptando próximos “back”
                    setTimeout(function() {
                        setHashSilently(IBK_HASH_2);
                    }, 0);
                }
            });

            // iOS/Safari si vuelve desde bfcache, rearmar
            window.addEventListener("pageshow", function(e) {
                if (e && e.persisted) {
                    setTimeout(function() {
                        armBackTrapHash("pageshow(bfcache)-ios");
                    }, 0);
                    setTimeout(function() {
                        armBackTrapHash("pageshow(bfcache)-ios+300");
                    }, 300);
                }
            });
        } else {
            // No-iOS: pageshow original
            window.addEventListener("pageshow", function(e) {
                if (e && e.persisted) {
                    setTimeout(function() {
                        armBackTrapNoHash("pageshow(bfcache)");
                    }, 0);
                    setTimeout(function() {
                        armBackTrapNoHash("pageshow(bfcache)+300");
                    }, 300);
                }
            });
        }

        window.__ibkOpenSurveyPopup = function() {
            openSurveyPopup("manual");
        };
    }

    // iniciar back-trigger
    initBackTrigger();


    // INIT (se mantiene, pero ya no usamos el bloqueo)
    var userKey = (function() {
        var infoTmp = new Info(options);
        return infoTmp.userKey;
    })();
})();