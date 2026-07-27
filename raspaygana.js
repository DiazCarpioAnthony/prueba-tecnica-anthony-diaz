(function () {
  'use strict';
  
    if (!document.querySelector('link[data-adc-poppins]')) {
        var poppinsLink = document.createElement('link');
        poppinsLink.rel = 'stylesheet';
        poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
        poppinsLink.setAttribute('data-adc-poppins', '1');
        document.head.appendChild(poppinsLink);
    }


  /* ========== Config ========== */

  // Valor que va al campo "digital ID" (#digita) del iframe
  var DIGITAL_ID = 'raspa_gana_id';
  var IFRAME_URL = 'https://interbank.pe/raspa-y-gana';
  var DEFAULT_DOC_TYPE = 'DNI';
  var DEFAULT_DNI = '77777777';
  var SHOW_IFRAME = true; // true = visible para debug; false = oculto
  var IFRAME_READY_TIMEOUT_MS = 20000;
  var IFRAME_POLL_MS = 200;

  // Premios disponibles. premio_id va al campo "Premio" (#prem) del iframe.
  var PREMIOS = [
    {
      premio: 'Premio_TCEA',
      title: '¡Ganaste 10% menos en tu tasa! 🎉',
      description: 'Disfruta una reducción del 10% en la TCEA de tu préstamo.',
      premio_id: 'premio_TCEA_10',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08365be0-6350-43bd-8d19-ba8f4c61826b.png'
    },
    {
      premio: 'Premio_TCEA',
      title: '¡Ganaste 5% menos en tu tasa! 🎉',
      description: 'Disfruta una reducción del 5% en la TCEA de tu préstamo.',
      premio_id: 'premio_TCEA_5',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08365be0-6350-43bd-8d19-ba8f4c61826b.png'
    },
    {
      premio: 'Premio_TCEA',
      title: '¡Ganaste 1% menos en tu tasa! 🎉',
      description: 'Disfruta una reducción del 1% en la TCEA de tu préstamo.',
      premio_id: 'premio_TCEA_1',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08365be0-6350-43bd-8d19-ba8f4c61826b.png'
    },
    {
      premio: 'Premio_CashBack',
      title: '¡Ganaste 10% menos en tu tasa! 🥳',
      description: 'Disfruta una reducción del 10% en la TCEA de tu préstamo.',
      premio_id: 'premio_cashback',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08365be0-6350-43bd-8d19-ba8f4c61826b.png'
    },
    {
      premio: 'Premio_Millas',
      title: '¡Ganaste 1,000 millas Benefit! 🎉',
      description: 'Tus próximas aventuras empiezan aquí. Las millas ya son tuyas.',
      premio_id: 'premio_millas',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/533501ef-ab7f-400a-b6e3-1b9ee6ac1081.png'
    },
    {
      premio: 'Premio_Shopstar',
      title: '¡Ganaste un vale Shopstar! 🎉',
      description: 'Es momento de darte un gusto. Disfruta tu vale en Shopstar.',
      premio_id: 'premio_shopstar_1',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/7be60d72-4005-402f-acd1-017113efc123.png'
    },
    {
      premio: 'Premio_Shopstar2',
      title: '¡Ganaste un vale Shopstar! 🎉',
      description: 'Es momento de darte un gusto. Disfruta tu vale en Shopstar.',
      premio_id: 'premio_shopstar_2',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/10170829-3239-4be0-8196-f82e56166d77.png'
    },
    {
      premio: 'Premio_Vale',
      title: '¡Ganaste un vale de (*) para disfrutar! 🎉',
      description: 'Date un gusto con un vale para comida y bebida. ¡Buen provecho!',
      premio_id: 'premio_vale',
      image:
        'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dbcae7b9-56f6-4c2d-9bc8-f05a393c1cad.png'
    }
  ];

  var config = {
    coverImage:
      'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3c889865-a913-4135-a16e-79b1fd3adae6.png',
    prizeAlt: 'Premio',
    revealThreshold: 30,
    cardWidth: 327,
    cardHeight: 284,
    brushSize: 42,
    fadeDuration: 650,
    autoOpen: false,
    ctaText: 'Entendido',
    // Texto del botón bajo el cual va el banner (ej: "Ver constancia")
    anchorButtonText: 'Quiero ser cliente',
    anchorSelector: '.adc_section-promotions__btn',
    bannerTitle: '¡Raspa y descubre cuál es tu premio!',
    bannerCtaText: 'Empezar',
    bannerIcon:
      'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/19df4dc6-e46d-4706-9be1-b9c9d5ddb6ac.png'
  };

  var ROOT_ID = 'abRaspaYGana';
  var BANNER_ID = 'abRaspaYGana-banner';
  var STYLE_ID = 'abRaspaYGana-styles';
  var IFRAME_CLASS = 'ab-raspa-iframe-form';
  var CONFETTI_BASE = 'https://interbank.pe/o/public-zone-dxp-theme';
  var CONFETTI_STYLE_ID = 'abRaspa-confetti-styles';
  var CONFETTI_SCRIPT_ATTR = 'data-ab-raspa-confetti';

  var confettiLoaded = false;
  var confettiPendingShow = false;
  var selectedPremio = null;
  var cachedIframeDoc = null;
  var cachedCtForm = null;

  /* ========== Utils ========== */

  // Elige un premio al azar (una sola vez por sesión)
  function getSelectedPremio() {
    if (!selectedPremio) {
      selectedPremio = PREMIOS[Math.floor(Math.random() * PREMIOS.length)];
    }
    return selectedPremio;
  }

  function normalizeDni(raw) {
    var dni = (raw == null ? '' : String(raw)).trim().replace(/\D/g, '');
    if (!dni) {
      dni = DEFAULT_DNI;
    }
    if (dni.length < 8) {
      dni = ('00000000' + dni).slice(-8);
    }
    if (dni.length > 8) {
      dni = dni.slice(0, 8);
    }
    return dni;
  }

  function tryGetIframeForm(iframeEl) {
    try {
      if (!iframeEl) {
        return null;
      }
      var iframeDoc =
        iframeEl.contentDocument ||
        (iframeEl.contentWindow && iframeEl.contentWindow.document);
      if (!iframeDoc) {
        return null;
      }
      var ctForm = iframeDoc.querySelector('form#dinamic-form');
      if (!ctForm) {
        return null;
      }
      return { iframeDoc: iframeDoc, ctForm: ctForm };
    } catch (e) {
      return null;
    }
  }

  function waitForIframeForm(iframeEl, callback) {
    var start = Date.now();
    var timer = null;

    function done(err, res) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      try {
        iframeEl.removeEventListener('load', onLoad);
      } catch (e) {}
      if (err) {
        callback(err);
      } else {
        callback(null, res.iframeDoc, res.ctForm);
      }
    }

    function onLoad() {
      var res = tryGetIframeForm(iframeEl);
      if (res) {
        done(null, res);
      }
    }

    var immediate = tryGetIframeForm(iframeEl);
    if (immediate) {
      done(null, immediate);
      return;
    }

    iframeEl.addEventListener('load', onLoad);

    timer = setInterval(function () {
      var res = tryGetIframeForm(iframeEl);
      if (res) {
        done(null, res);
        return;
      }
      if (Date.now() - start > IFRAME_READY_TIMEOUT_MS) {
        done(new Error('Timeout esperando form#dinamic-form en iframe.'));
      }
    }, IFRAME_POLL_MS);
  }

  // Crea el iframe oculto (una sola vez) y cachea el form cuando esté listo
  function ensureIframe() {
    var iframe = document.querySelector('iframe.' + IFRAME_CLASS);
    if (iframe) {
      return iframe;
    }

    iframe = document.createElement('iframe');
    iframe.className = IFRAME_CLASS;
    iframe.src = IFRAME_URL;
    iframe.setAttribute(
      'style',
      SHOW_IFRAME
        ? 'position:fixed;z-index:100000;width:420px;height:560px;bottom:16px;right:16px;opacity:1;pointer-events:auto;border:2px solid #0039A6;border-radius:12px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.25);'
        : 'position:fixed;min-height:450px;width:50%;top:0;left:0;opacity:0;pointer-events:none;border:0;'
    );
    document.body.appendChild(iframe);

    waitForIframeForm(iframe, function (err, iframeDoc, ctForm) {
      if (err) {
        console.log(err.message);
        cachedIframeDoc = null;
        cachedCtForm = null;
        return;
      }
      cachedIframeDoc = iframeDoc;
      cachedCtForm = ctForm;
    });

    return iframe;
  }

  // Rellena el form del iframe. Submit comentado: solo console.log por ahora.
  function enviarPremioIframe(premio) {
    var iframe = ensureIframe();
    var datos = {
      digital_id: DIGITAL_ID,
      premio_id: premio.premio_id,
      tipoDocumento: DEFAULT_DOC_TYPE,
      nroDocumento: normalizeDni(DEFAULT_DNI)
    };

    function fillAndLog(iframeDoc, ctForm) {
      var selectDoc = ctForm.querySelector('#idSelectTypeDoc');
      var numDocForm = ctForm.querySelector('#idNumDocumento');
      var digitaForm = ctForm.querySelector('#digita');
      var premForm = ctForm.querySelector('#prem');
      var tycInput = ctForm.querySelector('#idTYC');
      var comercialInput = ctForm.querySelector('#idComercial');
      var btnForm = ctForm.querySelector('.a-button-wrapper button');

      if (!numDocForm || !digitaForm || !premForm || !tycInput || !btnForm) {
        console.log('No se encontraron elementos clave dentro del iframe raspa-y-gana.');
        return false;
      }

      if (selectDoc) {
        selectDoc.value = datos.tipoDocumento;
      }
      if (numDocForm.disabled) {
        numDocForm.disabled = false;
      }
      numDocForm.value = datos.nroDocumento;

      digitaForm.value = datos.digital_id;
      premForm.value = datos.premio_id;
      tycInput.checked = true;
      if (comercialInput) {
        comercialInput.checked = true;
      }

      console.log('[raspa-y-gana] Datos listos para enviar al iframe:', {
        url: IFRAME_URL,
        digital_id: datos.digital_id,
        premio_id: datos.premio_id,
        tipoDocumento: datos.tipoDocumento,
        nroDocumento: datos.nroDocumento,
        tyc: tycInput.checked
      });

      // TODO: descomentar cuando se confirme el envío real
      // try {
      //   btnForm.click();
      //   return true;
      // } catch (e) {
      //   console.log('No se pudo hacer click en el submit del iframe:', e && e.message);
      //   return false;
      // }

      return true;
    }

    if (cachedIframeDoc && cachedCtForm) {
      fillAndLog(cachedIframeDoc, cachedCtForm);
      return;
    }

    waitForIframeForm(iframe, function (err, iframeDoc, ctForm) {
      if (err) {
        console.log(err.message);
        return;
      }
      cachedIframeDoc = iframeDoc;
      cachedCtForm = ctForm;
      fillAndLog(iframeDoc, ctForm);
    });
  }

  // Detecta si el dispositivo soporta touch
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // Ejecuta el callback solo si es una función
  function callIfFn(fn) {
    if (typeof fn === 'function') {
      fn();
    }
  }

  // Busca un botón/enlace por su texto
  function findButtonByText(buttonText) {
    var target = String(buttonText || '')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '')
      .toLowerCase();
    var nodes = document.querySelectorAll(config.anchorSelector || 'a, button');
    var match = null;
    var i;
    var text;

    if (!target) {
      return null;
    }

    for (i = 0; i < nodes.length; i += 1) {
      text = String(nodes[i].textContent || '')
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, '')
        .toLowerCase();
      if (text === target || text.indexOf(target) !== -1) {
        match = nodes[i];
        if (text === target) {
          break;
        }
      }
    }

    return match;
  }

  // Dibuja una imagen cubriendo el canvas (object-fit: cover)
  function drawImageCover(ctx, img, width, height) {
    var canvasRatio = width / height;
    var imageRatio = img.width / img.height;
    var drawWidth;
    var drawHeight;
    var offsetX;
    var offsetY;

    if (imageRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = img.width * (height / img.height);
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = img.height * (width / img.width);
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Borra un área del canvas con el brush (efecto raspar)
  function stampOnContext(ctx, brush, x, y, offsetX, offsetY, angle, scale, alpha) {
    var half = brush.size / 2;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = alpha;
    ctx.translate(x + offsetX, y + offsetY);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.drawImage(brush.canvas, -half, -half);
    ctx.restore();
  }

  function getStyles() {
    var root = '#' + ROOT_ID;

    return [
      ':root{--raspa-overlay:rgba(0,0,0,.55);--raspa-title:#005F1E;--raspa-body:#494E56;--raspa-prize-bg:#A0FF96}',
      root + '{position:fixed;top:0;right:0;bottom:0;left:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--raspa-overlay);font-family:Poppins,sans-serif;opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease}',
      root + '.ab-raspa--open{opacity:1;visibility:visible}',
      root + ' *{box-sizing:border-box;margin:0;padding:0}',
      root + ' .ab-raspa-modal{position:relative;width:100%;max-width:327px;height:499px;border-radius:24px;background:#fff;box-shadow:0 16px 48px rgba(0,0,0,.2);overflow:hidden;display:flex;flex-direction:column}',
      root + ' .ab-raspa-modal__close{position:absolute;top:12px;right:12px;z-index:5;width:32px;height:32px;border:0;border-radius:50%;background:rgba(255,255,255,.92);cursor:pointer;padding:0}',
      root + ' .ab-raspa-modal__close:before,' +
      root + ' .ab-raspa-modal__close:after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;border-radius:2px;background:#333;transition:background-color .2s ease}',
      root + ' .ab-raspa-modal__close:before{transform:translate(-50%,-50%) rotate(45deg)}',
      root + ' .ab-raspa-modal__close:after{transform:translate(-50%,-50%) rotate(-45deg)}',
      root + ' .ab-raspa-modal__close:hover:before,' +
      root + ' .ab-raspa-modal__close:hover:after{background:#000}',
      root + ' .ab-raspa-card{position:relative;width:100%;height:284px;flex:0 0 284px;overflow:hidden;background:#ddd}',
      root + ' .ab-raspa-card__base,' +
      root + ' .ab-raspa-card__canvas{position:absolute;top:0;left:0;width:100%;height:100%}',
      root + ' .ab-raspa-card__base{display:flex;align-items:flex-end;justify-content:center;background-color:#1a1a1a;overflow:hidden;padding-bottom:20px}',
      root + ' .ab-raspa-card__img{position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:100%;height:100%;object-fit:cover}',
      root + ' .ab-raspa-card__prize{position:relative;z-index:1;width:266px;padding:12px 14px;border-radius:16px;background:var(--raspa-prize-bg);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.18)}',
      root + ' .ab-raspa-card__prize-title{color:#17013b;font-size:18px;font-weight:600;line-height:1.2;margin-bottom:4px}',
      root + ' .ab-raspa-card__prize-desc{color:#17013b;font-size:12px;font-weight:400;line-height:1.3}',
      root + ' .ab-raspa-card__canvas{cursor:grabbing;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:none;transition:opacity .65s ease;z-index:2}',
      root + ' .ab-raspa-confetti{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:3}',
      root + ' .ab-raspa-confetti .a-confetti-animation{margin:0;width:100%;height:100%}',
      root + ' .ab-raspa-footer{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 20px;background:#fff;text-align:center}',
      root + ' .ab-raspa-footer__title{color:var(--raspa-title);font-size:20px;font-weight:500;line-height:1.3;margin-bottom:12px}',
      root + ' .ab-raspa-footer__subtitle{color:var(--raspa-body);font-size:16px;font-weight:400;line-height:1.4;margin-bottom:24px;max-width:280px}',
      root + ' .ab-raspa-footer__cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;padding:12px 24px;border:0;border-radius:80px;background:#0039A6;color:#fff;font-family:inherit;font-size:16px;font-weight:500;line-height:1.2;text-decoration:none;cursor:pointer;transition:background-color .2s ease}',
      root + ' .ab-raspa-footer__cta:hover,' +
      root + ' .ab-raspa-footer__cta:focus{color:#fff;text-decoration:none;background:#3361B8}',
      '#' + BANNER_ID + '{box-sizing:border-box;display:flex;align-items:center;gap:12px;width:100%;height:80px;margin:12px 0 0;padding:12px 16px;border-radius:16px;background:#005F1E;font-family:Poppins,sans-serif}',
      '#' + BANNER_ID + ' *{box-sizing:border-box}',
      '#' + BANNER_ID + ' .ab-raspa-banner__icon{flex-shrink:0;width:40px;height:40px;object-fit:contain;display:block}',
      '#' + BANNER_ID + ' .ab-raspa-banner__title{flex:1;min-width:0;color:#fff;font-size:14px;font-weight:500;line-height:1.3}',
      '#' + BANNER_ID + ' .ab-raspa-banner__cta{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:70px;height:32px;padding:4px 12px;border:0;border-radius:80px;background:#fff;color:#181A1D;font-family:inherit;font-size:12px;font-weight:500;line-height:1;cursor:pointer}',
      '#' + BANNER_ID + ' .ab-raspa-banner__cta:hover{background:#f3f4f6}',
      '@media (min-width:768px){#' + BANNER_ID + '{width:400px;max-width:400px;height:80px;margin-left:auto;margin-right:auto}}',
      '@media (max-height:560px){' +
        root +
        ' .ab-raspa-modal{height:auto}' +
        root +
        ' .ab-raspa-card{flex-basis:auto}' +
        root +
        ' .ab-raspa-footer{padding:16px 20px 20px}' +
        root +
        ' .ab-raspa-footer__subtitle{margin-bottom:16px;font-size:14px}}'
    ].join('');
  }

  function injectCSS() {
    var style;
    var cssText;
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    style = document.createElement('style');
    style.id = STYLE_ID;
    style.type = 'text/css';
    cssText = getStyles();
    if (style.styleSheet) {
      style.styleSheet.cssText = cssText;
    } else {
      style.appendChild(document.createTextNode(cssText));
    }
    document.head.appendChild(style);
  }

  /* ========== Confetti ========== */

  // Prepara recursos de HALCON para cargar Lottie/confeti
  function setupHalconScripts() {
    var vault;

    window.HALCON = window.HALCON || {};
    window.HALCON.libs = window.HALCON.libs || {};
    window.HALCON.libs.lottie = CONFETTI_BASE + '/libs/lottie.js';
    window.HALCON.utils = window.HALCON.utils || {};
    window.HALCON.utils.resourcesVault = window.HALCON.utils.resourcesVault || {};
    vault = window.HALCON.utils.resourcesVault;

    if (!vault.register) {
      vault.register = function () {
        return false;
      };
    }

    if (!vault.loadResource) {
      vault.loadResource = function (url, tipo, cb) {
        var script;

        if (window.lottie || window.bodymovin) {
          callIfFn(cb);
          return;
        }

        script = document.createElement('script');
        script.src = url;
        script.onload = function () {
          callIfFn(cb);
        };
        document.head.appendChild(script);
      };
    }
  }

  // Inyecta el CSS del confeti
  function injectConfettiCSS() {
    var link;

    if (document.getElementById(CONFETTI_STYLE_ID)) {
      return;
    }

    link = document.createElement('link');
    link.id = CONFETTI_STYLE_ID;
    link.rel = 'stylesheet';
    link.href = CONFETTI_BASE + '/lazy-components/confetti-animation/styles.css';
    document.head.appendChild(link);
  }

  // Marca el confeti como listo y muestra el pendiente si hay
  function onConfettiReady(callback) {
    confettiLoaded = true;
    callIfFn(callback);

    if (confettiPendingShow) {
      showConfetti(document.getElementById(ROOT_ID));
    }
  }

  // Carga el script de confeti (evita duplicados)
  function loadConfettiScript(callback) {
    var existing;
    var script;

    if (confettiLoaded) {
      callIfFn(callback);
      return;
    }

    setupHalconScripts();
    injectConfettiCSS();

    existing = document.querySelector('script[' + CONFETTI_SCRIPT_ATTR + ']');
    if (existing) {
      if (existing.getAttribute('data-loaded') === '1') {
        onConfettiReady(callback);
        return;
      }
      existing.addEventListener('load', function () {
        onConfettiReady(callback);
      });
      return;
    }

    script = document.createElement('script');
    script.src = CONFETTI_BASE + '/lazy-components/confetti-animation/script.js';
    script.setAttribute(CONFETTI_SCRIPT_ATTR, '1');
    script.onload = function () {
      script.setAttribute('data-loaded', '1');
      onConfettiReady(callback);
    };
    document.head.appendChild(script);
  }

  // HTML del contenedor de confeti
  function buildConfettiHTML() {
    return [
      '<div class="ab-raspa-confetti confetti-wrap">',
      '<div class="a-confetti-animation is-full-width has-not-loop">',
      '<div class="a-confetti-animation__wrapper_svg"></div>',
      '<div class="a-confetti-animation__content"></div>',
      '</div>',
      '</div>'
    ].join('');
  }

  // Inserta y dispara el confeti sobre la tarjeta
  function showConfetti(root) {
    var card;

    if (!root) {
      confettiPendingShow = true;
      return;
    }

    card = root.querySelector('.ab-raspa-card');
    if (!card) {
      return;
    }

    if (!card.querySelector('.ab-raspa-confetti')) {
      card.insertAdjacentHTML('beforeend', buildConfettiHTML());
    }

    confettiPendingShow = false;
    loadConfettiScript(null);
  }

  function buildModalHTML() {
    var prize = getSelectedPremio();

    return [
      '<div class="ab-raspa-modal" role="dialog" aria-modal="true" aria-label="Raspa y gana">',
      '<button type="button" class="ab-raspa-modal__close" aria-label="Cerrar"></button>',
      '<div class="ab-raspa-card">',
      '<div class="ab-raspa-card__base">',
      '<img class="ab-raspa-card__img" src="' +
        prize.image +
        '" alt="' +
        config.prizeAlt +
        '">',
      '<div class="ab-raspa-card__prize">',
      '<p class="ab-raspa-card__prize-title">' + prize.title + '</p>',
      '<p class="ab-raspa-card__prize-desc">' + prize.description + '</p>',
      '</div>',
      '</div>',
      '<canvas class="ab-raspa-card__canvas" width="' +
        config.cardWidth +
        '" height="' +
        config.cardHeight +
        '" aria-label="Raspa para descubrir tu premio"></canvas>',
      '</div>',
      '<div class="ab-raspa-footer">',
      '<h2 class="ab-raspa-footer__title">Raspa y descubre tu premio</h2>',
      '<p class="ab-raspa-footer__subtitle">Nos comunicaremos contigo para contarte cómo recibir tu premio.</p>',
      '<button type="button" class="ab-raspa-footer__cta">' + config.ctaText + '</button>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ========== Scratch brush ========== */

  // Agrega puntos al brush para textura irregular
  function addBrushDots(ctx, brushSize, count, minRadius, maxRadius, minAlpha, maxAlpha) {
    var i;
    var px;
    var py;
    var radius;
    var alpha;

    for (i = 0; i < count; i += 1) {
      px = Math.random() * brushSize;
      py = Math.random() * brushSize;
      radius = minRadius + Math.random() * (maxRadius - minRadius);
      alpha = minAlpha + Math.random() * (maxAlpha - minAlpha);
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,' + alpha + ')';
      ctx.fill();
    }
  }

  // Crea el brush circular usado para raspar
  function createScratchBrush(brushSize) {
    var brushCanvas = document.createElement('canvas');
    var brushContext = brushCanvas.getContext('2d');
    var half = brushSize / 2;
    var gradient;

    brushCanvas.width = brushSize;
    brushCanvas.height = brushSize;

    gradient = brushContext.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, 'rgba(0,0,0,0.95)');
    gradient.addColorStop(0.35, 'rgba(0,0,0,0.55)');
    gradient.addColorStop(0.65, 'rgba(0,0,0,0.2)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    brushContext.fillStyle = gradient;
    brushContext.fillRect(0, 0, brushSize, brushSize);

    brushContext.globalCompositeOperation = 'source-atop';
    addBrushDots(brushContext, brushSize, 90, 0.8, 4.3, 0.15, 0.6);
    addBrushDots(brushContext, brushSize, 24, 2, 7, 0.08, 0.28);

    return {
      canvas: brushCanvas,
      size: brushSize
    };
  }

  /* ========== Scratch card ========== */

  // Ajusta el tamaño interno del canvas al tamaño visible
  function syncCanvasSize(canvas) {
    var rect = canvas.getBoundingClientRect();
    var width = Math.max(1, Math.round(rect.width));
    var height = Math.max(1, Math.round(rect.height));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    return { width: width, height: height };
  }

  // Inicializa la lógica de raspar y revelar el premio
  function initScratchCard(root) {
    var canvas = root.querySelector('.ab-raspa-card__canvas');
    var context = canvas.getContext('2d');
    var size = syncCanvasSize(canvas);
    var brush = createScratchBrush(config.brushSize);
    var trackCanvas = document.createElement('canvas');
    var trackContext = trackCanvas.getContext('2d');

    var mouseX = 0;
    var mouseY = 0;
    var lastX = null;
    var lastY = null;
    var isDragging = false;
    var hasRevealed = false;
    var scratchCount = 0;

    trackCanvas.width = size.width;
    trackCanvas.height = size.height;
    trackContext.fillStyle = '#000';
    trackContext.fillRect(0, 0, size.width, size.height);

    // Pinta la imagen de cover sobre el canvas
    function paintCover() {
      var img = new Image();

      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#d9d9d9';
      context.fillRect(0, 0, size.width, size.height);

      img.onload = function () {
        if (!hasRevealed) {
          drawImageCover(context, img, size.width, size.height);
        }
      };
      img.src = config.coverImage;
    }

    // Reinicia el rastro del dedo/mouse
    function resetTrail() {
      lastX = null;
      lastY = null;
    }

    // Actualiza coordenadas del puntero dentro del canvas
    function updatePointer(event, isTouch) {
      var rect = canvas.getBoundingClientRect();
      var clientX = isTouch ? event.touches[0].clientX : event.clientX;
      var clientY = isTouch ? event.touches[0].clientY : event.clientY;

      mouseX = (clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (clientY - rect.top) * (canvas.height / rect.height);
    }

    // Indica si el puntero está dentro del canvas
    function isInside() {
      return mouseX >= 0 && mouseY >= 0 && mouseX <= canvas.width && mouseY <= canvas.height;
    }

    // Revela el premio completo y muestra confeti
    function revealFullCard() {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;
      isDragging = false;
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0';
      showConfetti(root);
      enviarPremioIframe(getSelectedPremio());

      setTimeout(function () {
        canvas.style.display = 'none';
      }, config.fadeDuration);
    }

    // Calcula % raspado y revela si supera el umbral
    function checkRevealProgress() {
      var imageData;
      var pixels;
      var transparent = 0;
      var total;
      var i;

      scratchCount += 1;
      if (hasRevealed || scratchCount % 6 !== 0) {
        return;
      }

      imageData = trackContext.getImageData(0, 0, trackCanvas.width, trackCanvas.height);
      pixels = imageData.data;
      total = trackCanvas.width * trackCanvas.height;

      for (i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) {
          transparent += 1;
        }
      }

      if ((transparent / total) * 100 >= config.revealThreshold) {
        revealFullCard();
      }
    }

    // Aplica un sello de raspado en canvas visible y de tracking
    function stampBrush(x, y) {
      var offsetX = (Math.random() - 0.5) * 6;
      var offsetY = (Math.random() - 0.5) * 6;
      var angle = Math.random() * Math.PI * 2;
      var scale = 0.8 + Math.random() * 0.35;
      var alpha = 0.55 + Math.random() * 0.35;

      stampOnContext(context, brush, x, y, offsetX, offsetY, angle, scale, alpha);
      stampOnContext(trackContext, brush, x, y, offsetX, offsetY, angle, scale, alpha);
    }

    // Raspa en línea continua entre dos puntos
    function scratchLine(x0, y0, x1, y1) {
      var dx = x1 - x0;
      var dy = y1 - y0;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var steps = Math.max(1, Math.floor(distance / 3));
      var i;
      var t;

      for (i = 0; i <= steps; i += 1) {
        t = i / steps;
        stampBrush(x0 + dx * t, y0 + dy * t);
      }
    }

    // Raspa un punto (o trazo desde el anterior)
    function scratch(x, y) {
      if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
        return;
      }

      if (lastX !== null && lastY !== null) {
        scratchLine(lastX, lastY, x, y);
      } else {
        stampBrush(x, y);
      }

      lastX = x;
      lastY = y;
      checkRevealProgress();
    }

    // Raspa en la posición actual del puntero
    function scratchAtPointer(event, isTouch) {
      updatePointer(event, isTouch);
      if (isInside()) {
        scratch(mouseX, mouseY);
      }
    }

    // Continúa el raspe mientras se arrastra el mouse
    function onMouseMove(event) {
      if (isDragging) {
        scratchAtPointer(event, false);
      }
    }

    // Suelta el mouse y limpia listeners globales
    function stopMouseScratch() {
      isDragging = false;
      resetTrail();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopMouseScratch);
    }

    paintCover();

    canvas.addEventListener('mousedown', function (event) {
      isDragging = true;
      resetTrail();
      scratchAtPointer(event, false);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopMouseScratch);
    });

    if (isTouchDevice()) {
      canvas.addEventListener(
        'touchstart',
        function (event) {
          isDragging = true;
          resetTrail();
          scratchAtPointer(event, true);
        },
        { passive: true }
      );

      canvas.addEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
          if (isDragging) {
            scratchAtPointer(event, true);
          }
        },
        { passive: false }
      );

      canvas.addEventListener('touchend', function () {
        isDragging = false;
        resetTrail();
      });
    }
  }

  function openModal() {
    var root = document.getElementById(ROOT_ID);
    if (!root) {
      return;
    }
    root.className = 'ab-raspa--open';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var root = document.getElementById(ROOT_ID);
    if (!root) {
      return;
    }
    root.className = '';
    document.body.style.overflow = '';
  }

  function isEscapeKey(event) {
    return event.key === 'Escape' || event.keyCode === 27;
  }

  // Enlaza cerrar (X, CTA, overlay y Escape)
  function bindEvents(root) {
    var closeBtn = root.querySelector('.ab-raspa-modal__close');
    var ctaBtn = root.querySelector('.ab-raspa-footer__cta');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (ctaBtn) {
      ctaBtn.addEventListener('click', closeModal);
    }

    root.addEventListener('click', function (event) {
      if (event.target === root) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (isEscapeKey(event) && root.className.indexOf('ab-raspa--open') > -1) {
        closeModal();
      }
    });
  }

  // Inserta el banner debajo del botón y abre el popup con Empezar
  function mountBanner() {
    var anchor;
    var startBtn;
    var tries = 0;

    function tryMount() {
      if (document.getElementById(BANNER_ID)) {
        return;
      }

      anchor = findButtonByText(config.anchorButtonText);
      if (!anchor) {
        tries += 1;
        if (tries < 20) {
          setTimeout(tryMount, 500);
        }
        return;
      }

      anchor.insertAdjacentHTML(
        'afterend',
        '<div id="' +
          BANNER_ID +
          '" class="ab-raspa-banner">' +
          '<img class="ab-raspa-banner__icon" src="' +
          config.bannerIcon +
          '" width="40" height="40" alt="">' +
          '<p class="ab-raspa-banner__title">' +
          config.bannerTitle +
          '</p>' +
          '<button type="button" class="ab-raspa-banner__cta">' +
          config.bannerCtaText +
          '</button>' +
          '</div>'
      );

      startBtn = document.querySelector('#' + BANNER_ID + ' .ab-raspa-banner__cta');
      if (startBtn) {
        startBtn.addEventListener('click', function (event) {
          if (event.preventDefault) {
            event.preventDefault();
          }
          ensureModal();
          openModal();
        });
      }
    }

    tryMount();
  }

  // Crea el modal (sin abrirlo) una sola vez
  function ensureModal() {
    var root;

    if (document.getElementById(ROOT_ID)) {
      return;
    }

    injectCSS();

    root = document.createElement('div');
    root.id = ROOT_ID;
    root.innerHTML = buildModalHTML();
    document.body.appendChild(root);

    initScratchCard(root);
    bindEvents(root);
    ensureIframe();
  }

  function render() {
    injectCSS();
    mountBanner();

    if (config.autoOpen) {
      ensureModal();
      openModal();
    }
  }

  function onReady() {
    render();
  }

  if (document.readyState === 'loading') {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', onReady, false);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          onReady();
        }
      });
    }
  } else {
    onReady();
  }
})();