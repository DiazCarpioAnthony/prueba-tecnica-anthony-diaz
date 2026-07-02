(function () {
  'use strict';

  var DESKTOP_BREAK = 1024;
  var TABLET_MIN = 600;

  var config = {
    ctaHref:
      'https://interbank.pe/solicitar/tarjeta/creditoinnominada/inicio?pcid=blog:califico-tarjeta-credito:sticky',
    cardsImage:
      'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/d52fe5ea-d94e-40a2-8f2a-219569f4af2e.png',
    handImage:
      'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6219c0a5-c812-473b-8d4a-873249d0618c.png',
    modalTitle: '¡Obtén tu Tarjeta de Crédito!',
    modalText: 'Descubre si tienes una Tarjeta de Crédito preaprobada.',
    modalCta: 'Solicítala aquí',
    bannerText: 'Solicita tu tarjeta de crédito hoy'
  };

  var arrowSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.172 4.50038L9.381 1.70738C8.992 1.31638 8.991 0.683375 9.382 0.292375C9.772 -0.0976249 10.406 -0.0976249 10.796 0.293375L16 5.50038L10.796 10.7054C10.406 11.0964 9.772 11.0964 9.382 10.7054C8.991 10.3144 8.991 9.68237 9.382 9.29138L12.172 6.50038H1C0.448 6.50038 0 6.05238 0 5.50038C0 4.94838 0.448 4.50038 1 4.50038H12.172Z" fill="#FBFBFB"/>' +
    '</svg>';

  var css =
    '#ibk-blog-tc-sticky *{box-sizing:border-box;margin:0;padding:0}' +
    '#ibk-blog-tc-sticky{font-family:Geometria,Poppins,sans-serif}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-desktop{display:none}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-mobile{display:block}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner{position:fixed;left:16px;right:16px;bottom:20px;z-index:9998;display:flex;align-items:center;justify-content:center;gap:12px;min-height:64px;padding:12px 20px 12px 16px;background:#0039A6;border-radius:16px;color:#fff;text-decoration:none;box-shadow:0 8px 24px rgba(0,57,166,.28);transition:background-color .2s ease}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner:hover,#ibk-blog-tc-sticky .ibk-blog-tc-banner:focus{color:#fff;text-decoration:none;background:#3361B8}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner__icon{width:36px;height:36px;object-fit:contain;flex-shrink:0}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner__text{flex:0 1 auto;min-width:0;font-size:14px;font-weight:500;line-height:1.25;color:#fff}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner__arrow{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:16px;height:11px}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal-wrap{position:fixed;bottom:20px;right:max(24px,calc((100vw - 1272px)/2 + 24px));z-index:9998;width:327px}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal{position:relative;width:100%;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.16)}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__close{position:absolute;top:12px;right:12px;z-index:2;width:32px;height:32px;border:0;border-radius:50%;background:rgba(255,255,255,.92);cursor:pointer;padding:0}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:before,#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;border-radius:2px;background:#333;transition:background-color .2s ease}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:before{transform:translate(-50%,-50%) rotate(45deg)}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:after{transform:translate(-50%,-50%) rotate(-45deg)}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:hover:before,#ibk-blog-tc-sticky .ibk-blog-tc-modal__close:hover:after{background:#000}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__header{height:200px;background:#05be50;overflow:hidden}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__header img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__body{padding:24px 20px 28px;text-align:center}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__title{color:#008C37;font-size:22px;font-weight:500;line-height:1.25;margin-bottom:12px}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__text{color:#6B7280;font-size:14px;font-weight:400;line-height:1.4;margin-bottom:20px}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__cta{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;padding:12px 24px;border:0;border-radius:80px;background:#0039A6;color:#fff;font-family:inherit;font-size:16px;font-weight:500;line-height:1.2;text-decoration:none;cursor:pointer;transition:background-color .2s ease}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-modal__cta:hover,#ibk-blog-tc-sticky .ibk-blog-tc-modal__cta:focus{color:#fff;text-decoration:none;background:#3361B8}' +
    '@media (min-width:' +
    TABLET_MIN +
    'px) and (max-width:' +
    (DESKTOP_BREAK - 1) +
    'px){' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner{left:24px;right:24px;padding:14px 28px}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-banner__text{font-size:16px}' +
    '}' +
    '@media (min-width:' +
    DESKTOP_BREAK +
    'px){' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-desktop{display:block}' +
    '#ibk-blog-tc-sticky .ibk-blog-tc-mobile{display:none}' +
    '}' +
    '@media (max-width:' +
    (DESKTOP_BREAK - 1) +
    'px){body.ibk-blog-tc-has-banner{padding-bottom:96px}}';

  function injectCSS() {
    if (document.getElementById('ibk-blog-tc-sticky-styles')) {
      return;
    }
    var style = document.createElement('style');
    style.id = 'ibk-blog-tc-sticky-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function buildDesktopHTML() {
    return (
      '<div class="ibk-blog-tc-desktop">' +
      '<div class="ibk-blog-tc-modal-wrap" role="complementary" aria-label="Promoción tarjeta de crédito">' +
      '<div class="ibk-blog-tc-modal">' +
      '<button type="button" class="ibk-blog-tc-modal__close" aria-label="Cerrar"></button>' +
      '<div class="ibk-blog-tc-modal__header">' +
      '<img src="' +
      config.cardsImage +
      '" alt="Tarjetas de crédito Interbank">' +
      '</div>' +
      '<div class="ibk-blog-tc-modal__body">' +
      '<h3 class="ibk-blog-tc-modal__title">' +
      config.modalTitle +
      '</h3>' +
      '<p class="ibk-blog-tc-modal__text">' +
      config.modalText +
      '</p>' +
      '<a class="ibk-blog-tc-modal__cta" href="' +
      config.ctaHref +
      '" target="_blank" rel="noopener noreferrer">' +
      config.modalCta +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function buildMobileHTML() {
    return (
      '<div class="ibk-blog-tc-mobile">' +
      '<a class="ibk-blog-tc-banner" href="' +
      config.ctaHref +
      '" target="_blank" rel="noopener noreferrer" title="' +
      config.bannerText +
      '">' +
      '<img class="ibk-blog-tc-banner__icon" src="' +
      config.handImage +
      '" alt="">' +
      '<span class="ibk-blog-tc-banner__text">' +
      config.bannerText +
      '</span>' +
      '<span class="ibk-blog-tc-banner__arrow">' +
      arrowSvg +
      '</span>' +
      '</a>' +
      '</div>'
    );
  }

  function bindEvents(root) {
    var closeBtn = root.querySelector('.ibk-blog-tc-modal__close');
    var desktopWrap = root.querySelector('.ibk-blog-tc-desktop');

    if (closeBtn && desktopWrap) {
      closeBtn.addEventListener('click', function () {
        desktopWrap.remove();
      });
    }

    if (window.matchMedia('(max-width: ' + (DESKTOP_BREAK - 1) + 'px)').matches) {
      document.body.classList.add('ibk-blog-tc-has-banner');
    }
  }

  function render() {
    if (document.getElementById('ibk-blog-tc-sticky')) {
      return;
    }

    injectCSS();

    var root = document.createElement('div');
    root.id = 'ibk-blog-tc-sticky';
    root.innerHTML = buildDesktopHTML() + buildMobileHTML();

    document.body.appendChild(root);
    bindEvents(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
