(function() {

  var DESKTOP_BREAK = 1024;

  if (!document.querySelector('link[data-adc-poppins]')) {
      var poppinsLink = document.createElement('link');
      poppinsLink.rel = 'stylesheet';
      poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
      poppinsLink.setAttribute('data-adc-poppins', '1');
      document.head.appendChild(poppinsLink);
  }

  if (!document.querySelector('link[data-adc-montserrat]')) {
      var montserratLink = document.createElement('link');
      montserratLink.rel = 'stylesheet';
      montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap';
      montserratLink.setAttribute('data-adc-montserrat', '1');
      document.head.appendChild(montserratLink);
  }

  /* ---------- CSS ---------- */
  const css = `
body{overflow-x: hidden;}
.joh-wrapper,
.joh-section-divider,
.joh-section2,
.joh-navbar,
.joh-wrapper *,
.joh-section-divider *,
.joh-section2 *,
.joh-navbar * {
font-family: Poppins, sans-serif;
}

.joh-wrapper * {
box-sizing: border-box;
margin: 0;
padding: 0;
}

/* SECCION 1 MOBILE BASE */

.joh-wrapper {
width: 100%;
max-width: 100%;
height: 850px;
position: relative;
overflow: hidden;
border-radius: 0 0 20px 20px;
}

.joh-hero-bg {
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
object-position: center center;
z-index: 0;
}

.joh-hero-content {
position: relative;
z-index: 1;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 20px;
}

/* Navbar */
.joh-navbar {
width: 90%;
max-width: 370px;
height: 48px;
background-color: #ffffff;
border-radius: 16px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 12px;
}

/* Navbar mobile: solo logo desktop, centrado */
.joh-navbar.joh-mobile-only {
position: fixed;
top: 26px;
left: 50%;
transform: translateX(-50%);
z-index: 9999;
width: 169px;
max-width: 169px;
height: 48px;
padding: 0;
background-color: transparent;
border-radius: 0;
justify-content: center;
}
.joh-navbar-logo { width:131px; height:24px; object-fit:contain; flex-shrink:0; }
.joh-navbar-logo-link { display:inline-flex; line-height:0; text-decoration:none; }
.joh-navbar.joh-mobile-only .joh-navbar-logo {
width: 169px;
height: 38px;
display: block;
}
.joh-navbar-divider { width:1px; height:24px; background-color:#EEEFF1; flex-shrink:0; margin:0 10px; }
.joh-navbar-btn {
width:125px; height:24px; border-radius:16px; background-color:#0039A6;
border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;
transition:background-color 0.2s ease;
}
.joh-navbar-btn:hover,
a:hover .joh-navbar-btn { background-color:#3361B8; }
.joh-navbar-btn:active,
a:active .joh-navbar-btn { background-color:#0039A6; }
.joh-navbar-btn span { color:#fff; font-family:Poppins,sans-serif; font-size:12px; font-weight:500; white-space:nowrap; letter-spacing:0.2px; }

/* Tabs */
.joh-tabs-track {
width:100%; margin-top:82px; overflow-x:auto; overflow-y:hidden;
-webkit-overflow-scrolling:touch; scrollbar-width:none;
padding-right:16px; margin-left: 2%;
}
.joh-tabs-track::-webkit-scrollbar { display:none; }
.joh-tabs { display:flex; gap:8px; justify-content: center; margin-left: 10px;}
.joh-tab {
width:114px; height:32px; border-radius:80px; border:2px solid #05BE50;
background-color:rgba(255,255,255,0.15); cursor:pointer; display:flex; align-items:center;
justify-content:center; gap:6px; padding:0 10px; flex-shrink:0;
transition:background-color 0.2s ease, border-color 0.2s ease;
}
.joh-tab.joh-tab--active { background-color:#05BE50; border-color:#05BE50; }
.joh-tab img { width:20px; height:20px; object-fit:contain; flex-shrink:0; }
.joh-tab span { color:#fff; font-size:14px; font-weight:500; white-space:nowrap; }
.joh-tab.joh-tab--active span { color:#fff; }

/* Cards glassmorphism */
.joh-card {
width:344px; height:100px; border-radius:16px;
border:1px solid #fff; background:rgba(255,255,255,0.15);
backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
margin-top:16px; display:none; align-items:center; padding:0 16px; gap:12px;
}
.joh-card.joh-card--visible { display:flex; }
.joh-card-icon  { width:40px; height:40px; object-fit:contain; flex-shrink:0; }
.joh-card-body  { flex:1; display:flex; flex-direction:column; gap:2px; }
.joh-card-label  { color:#fff; font-size:14px; font-weight:400; line-height:1.3; }
.joh-card-amount { color:#fff; font-size:18px; font-weight:700; line-height:1.3; }
.joh-card-sub    { color:#fff; font-size:14px; font-weight:400; line-height:1.3; }
.joh-card-arrow  { width:15px; height:15px; object-fit:contain; flex-shrink:0; }

/* Spacer */
.joh-spacer { flex:1; }

/* Imagen promo mobile 273x159 */
.joh-promo-img-wrap { display:none; justify-content:center; width:100%; }
.joh-promo-img-wrap.joh-visible { display:flex; }
.joh-promo-img { width:350px; height:204px; object-fit:cover; border-radius:12px; }

/* Card CTA mobile 327x136 */
.joh-cta-card {
width:90%; max-width:370px; border-radius:20px;
border: 1px solid  #FFFFFF; background:rgba(255,255,255,0.15);
backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
margin-top:12px; margin-bottom:44px; display:none; flex-direction:column;
align-items:center; justify-content:  center; gap:16px; padding:20px;
}
.joh-cta-card.joh-visible { display:flex; }
.joh-cta-text { color:#fff; font-size:16px; font-weight:500; text-align:center; line-height:1.4; }
.joh-cta-btn {
width:236px; height:56px; border-radius:80px; background-color:#0039A6;
border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
transition:background-color 0.2s ease;
}
.joh-cta-btn:hover,
a:hover .joh-cta-btn { background-color:#3361B8; }
.joh-cta-btn:active,
a:active .joh-cta-btn { background-color:#0039A6; }
.joh-cta-btn span { color:#fff; font-size:15px; font-weight:500; white-space:nowrap; }
.joh-cta-btn-icon { width:8px; height:13px; flex-shrink:0; display:block; }

/* Pagination dots */
.joh-dots {
position:absolute; bottom:18px; left:50%; transform:translateX(-50%);
z-index:5; display:flex; align-items:center; justify-content:center; gap:8px;
}
.joh-dot {
width:11px; height:11px; border-radius:999px; border:none; padding:0;
background:rgba(255,255,255,0.55); cursor:pointer; flex-shrink:0;
transition:width 0.35s ease, background-color 0.35s ease, opacity 0.35s ease;
}
.joh-dot--active {
width:31px; background:#fff; opacity:1;
}

/* SEPARADOR */
.joh-section-divider {
width:100%; display:flex; justify-content:center;
align-items:center; padding:24px 0; background-color:#ffffff;
}
.joh-divider-inner {
align-items:center; display:flex; justify-content:center;
}
.joh-divider-btn {
background:none; border:none; cursor:pointer; padding:0; display:flex;
align-items:center; justify-content:center; flex-shrink:0;
}
.joh-divider-pill {
align-items:center; background:#00D13D; border-radius:30px;
display:flex; flex-direction:column; flex-shrink:0; height:55px;
justify-content:flex-start; overflow:hidden; padding-top:12px; width:34px;
}
.joh-divider-chevron {
animation:joh-divider-scroll 1.8s ease-in-out infinite;
display:block; flex-shrink:0; height:11px; margin-top:-1px; width:19px;
}
.joh-divider-chevron path { fill:#fff; }
.joh-divider-chevron:first-child { margin-top:0; }
.joh-divider-chevron:nth-child(1) { animation-delay:0s; }
.joh-divider-chevron:nth-child(2) { animation-delay:.35s; }
.joh-divider-chevron:nth-child(3) { animation-delay:.7s; }
@keyframes joh-divider-scroll {
0%, 100% { opacity:.25; }
50% { opacity:1; }
}

/* SECCIÓN 2 */
.joh-section2 {
width:100%; background-color:#ffffff;
padding:0px 0 40px 0; display:flex; flex-direction:column; align-items:stretch;
}
.joh-s2-label { box-sizing:border-box; font-size:14px; color:#008C37; font-weight:500; text-align:left; margin-bottom:6px; padding:0 24px; width:100%; }
.joh-s2-title { box-sizing:border-box; font-size:24px; color:#000; font-weight:500; text-align:left; line-height:1.3; margin-bottom:24px; padding:0 24px; width:100%; }
.joh-carousel-track { width:100%; overflow-x:auto; overflow-y:visible; -webkit-overflow-scrolling:touch; scrollbar-width:none; padding:0 24px; }
.joh-carousel-track::-webkit-scrollbar { display:none; }
.joh-carousel { display:flex; gap:16px; width:max-content; }
.joh-c-card { width:273px; height:560px; border-radius:20px; overflow:hidden; position:relative; flex-shrink:0; }
.joh-c-card-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
.joh-c-card-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.55) 60%,rgba(0,0,0,0.80) 100%); z-index:1; }
.joh-c-card-content { position:relative; z-index:2; width:100%; height:100%; display:flex; flex-direction:column; justify-content:flex-end; padding:20px 16px 28px 16px; gap:10px; }
.joh-c-flag { width:128px; height:24px; background-color:#EEFFEE; border-radius:20px; display:flex; align-items:center; gap:5px; padding:0 8px; flex-shrink:0; }
.joh-c-flag-icon { width:16px; height:16px; object-fit:contain; flex-shrink:0; }
.joh-c-flag-text { color:#008C37; font-size:12px; font-weight:500; white-space:nowrap; }
.joh-c-card-title { color:#fff; font-size:20px; font-weight:500; line-height:1.3; }
.joh-c-card-sub   { color:#fff; font-size:14px; font-weight:500; line-height:1.4; }
.joh-c-btn-link {width: fit-content;}
.joh-c-btn { width:159px; height:48px; border-radius:80px; border:none; background-color:#0039A6; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:12px; transition:background-color 0.2s ease; }
.joh-c-btn:hover,
a:hover .joh-c-btn { background-color:#3361B8; }
.joh-c-btn:active,
a:active .joh-c-btn { background-color:#0039A6; }
.joh-c-btn span { color:#fff; font-size:14px; font-weight:500; white-space:nowrap; }
.joh-c-btn-icon { width:8px; height:13px; flex-shrink:0; display:block; }

/* DESKTOP — min-width: 1024px (tablet usa layout mobile) */
@media (min-width: 1024px) {

/* Ocultar bloque mobile, mostrar bloque desktop */
.joh-mobile-only { display:none !important; }
.joh-desktop-only { display:flex !important; }

/* Hero full dekstop width border-radius */
.joh-wrapper {
width: 100%;
height: 661px;
overflow: hidden;
border-radius: 0 0 20px 20px;
}

/* Dos columnas */
.joh-hero-content {
flex-direction:row; align-items:stretch;
justify-content:flex-start; padding:0; overflow:hidden;
}

/* Columna izquierda */
.joh-col-left {
position:relative; z-index:2; flex-shrink:0;
display:flex; flex-direction:column; align-items:center;
padding:120px 0 0 10%; gap:0;
}

.joh-col-left .joh-promo-img-wrap {
display:flex; justify-content:flex-start;
width:auto; margin-bottom:25px;
}
.joh-col-left .joh-promo-img {
width:438px; height:250px; border-radius:0;
object-fit:contain; display:block;
}

.joh-col-left .joh-cta-card {
display:flex; width:100%; max-width:none; height:140px; margin:0;
}
.joh-cta-text { font-size:18px; }

.joh-dots { bottom:24px; }

/* Columna derecha: anclada a la derecha como en Figma */
.joh-col-right {
position:absolute; top:60px; right:10%; bottom:24px; z-index:2;
width:383px;
display:flex; flex-direction:column;
align-items:center; justify-content:center; gap:0;
margin:0; padding:0;
}

.joh-col-right .joh-navbar {
position:absolute; top:0; right:0;
width:169px; height:48px; margin:0; padding:0;
justify-content:flex-end;
background-color:transparent; border-radius:0;
}
.joh-col-right .joh-navbar-logo {
width:169px; height:48px; object-fit:contain; display:block;
}

/* Card desktop: 320x92, centrada respecto a los tabs */
.joh-col-right .joh-card { width:320px; height:92px; margin:0 0 20px; }
.joh-col-right .joh-card:not(.joh-card--visible) { display:none; }

/* Tabs desktop: 383px, debajo */
.joh-col-right .joh-tabs-track { width:383px; margin:0; }
.joh-col-right .joh-tabs { width:383px; justify-content:center; }

/* Sección 2 */
.joh-section2 { align-items:center; width:100%; }
.joh-s2-label { text-align:center; }
.joh-s2-title { text-align:center; }
.joh-carousel-track { width:100%; padding:0 40px; overflow-x:auto; overflow-y:visible; }
.joh-carousel { width:max-content; margin:0 auto; }
}

/* Desktop angosto: carousel scrolleable sin recortar cards */
@media (min-width: 1024px) and (max-width: 1219px) {
.joh-carousel-track { padding:0 24px; }
.joh-carousel { margin:0; }
}

/* Tablet: más altura y espacio para que las caras no queden tapadas */
@media (min-width: 600px) and (max-width: 1023px) {
.joh-wrapper {
height: clamp(880px, calc(700px + 30vw), 1050px);
}
.joh-hero-content .joh-spacer {
min-height: clamp(120px, 20vw, 260px);
}
.joh-promo-img-wrap.joh-mobile-only {
margin-top: 8px;
}
.joh-cta-card.joh-mobile-only {
margin-bottom: 48px;
}
}

/* Ocultar desktop-only en mobile */
.joh-desktop-only { display:none; }

/* Header Interbank por encima del landing al hacer scroll */
.o-top-header,
.o-header,
.o-header-sub-page,
.o-header-sub-page.is-sticky {
z-index: 100 !important;
}
.o-header__icons {
z-index: 101 !important;
}

/* Landing debajo del header del sitio */
.joh-wrapper,
.joh-section-divider,
.joh-section2 {
position: relative;
z-index: 0;
}
`;

  /* ---------- Helpers reutilizables ---------- */
  function cardHTML(dataFor, iconSrc, label, amount, sub) {
      return '<div class="joh-card' + (dataFor === 'viaje' ? ' joh-card--visible' : '') + '" data-for="' + dataFor + '">' +
          '<img class="joh-card-icon" src="' + iconSrc + '" alt="Icono" />' +
          '<div class="joh-card-body">' +
          '<span class="joh-card-label">' + label + '</span>' +
          '<span class="joh-card-amount">' + amount + '</span>' +
          '<span class="joh-card-sub">' + sub + '</span>' +
          '</div>' +
          '<img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />' +
          '</div>';
  }

  function tabsHTML(trackClass) {
      return '<div class="joh-tabs-track ' + trackClass + '">' +
          '<div class="joh-tabs">' +
          '<button class="joh-tab joh-tab--active" data-bg="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=750&q=80" data-card="viaje">' +
          '<img src="https://placehold.co/20x20/transparent/ffffff?text=" alt="Viaje" /><span>Un viaje</span></button>' +
          '<button class="joh-tab" data-bg="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=750&q=80" data-card="hogar">' +
          '<img src="https://placehold.co/20x20/transparent/ffffff?text=" alt="Hogar" /><span>Tu hogar</span></button>' +
          '<button class="joh-tab" data-bg="https://images.unsplash.com/photo-1519741497674-611481863552?w=750&q=80" data-card="boda">' +
          '<img src="https://placehold.co/20x20/transparent/ffffff?text=" alt="Boda" /><span>Tu boda</span></button>' +
          '</div></div>';
  }

  /* ---------- HTML ---------- */
  const html = `
<!--  SECCIÓN 1  -->
<div class="joh-wrapper">

<img class="joh-hero-bg"
src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a4c0a4b-2da5-4c9a-8d6d-0e2b2277cdee.png"
alt="Hero background" />

<div class="joh-hero-content">

<!-- ── MOBILE ONLY ── -->
<nav class="joh-navbar joh-mobile-only">
<a class="joh-navbar-logo-link" href="https://interbank.pe/?pcid=quiero:ser:cliente:logo:ibk" target="_blank" rel="noopener noreferrer" aria-label="Interbank">
<svg class="joh-navbar-logo" xmlns="http://www.w3.org/2000/svg" width="169" height="48" viewBox="0 0 169 48" fill="none" aria-hidden="true">
  <g clip-path="url(#joh-logo-clip-m)">
    <path d="M0 24C0 10.7452 10.7325 0 23.9716 0H145.028C158.268 0 169 10.7452 169 24C169 37.2548 158.268 48 145.028 48H23.9716C10.7325 48 0 37.2548 0 24Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M144.427 25.2906L144.356 25.2057L144.426 25.1228C145.766 23.4576 148.661 20.2161 149.75 19.2434H148.062C146.999 19.2458 146.264 19.3579 145.496 20.059C143.969 21.4881 142.705 23.1632 141.414 24.8232L141.167 25.1413L141.181 15.6364H138.09L138.092 32.113L141.167 32.1203V25.4363L141.415 25.7611C142.88 27.6869 144.367 29.632 146.071 31.3558C146.611 31.8872 147.456 32.2213 148.161 32.218C149.006 32.2149 149.486 32.0052 149.823 31.6067C148.974 30.6026 145.466 26.5463 144.427 25.2906ZM83.2852 18.9447C79.5348 18.9499 76.8748 21.6205 76.8652 25.957C76.8652 29.9046 80.0531 32.3612 83.3101 32.3636C85.247 32.3646 86.4544 32.0662 87.1542 31.5005V29.3047C86.156 29.7903 84.9757 29.9449 83.9305 29.9449C81.923 29.9498 80.3069 28.8635 80.0444 27.1253L80.0229 26.9701H82.3668C84.5705 26.971 86.1262 26.7718 87.1041 26.292C88.0795 25.8077 88.5052 25.0828 88.5102 23.9069C88.5102 20.8424 86.005 18.9475 83.2852 18.9447ZM84.8125 24.6274C84.2052 24.8377 83.2291 24.9199 81.6458 24.9215H80.0117L80.0213 24.7792L80.0434 24.3383C80.1182 22.7706 81.2929 21.4065 82.9881 21.4065C83.7767 21.4065 84.4388 21.5771 84.9147 21.9294C85.3902 22.281 85.6599 22.8273 85.6574 23.5149C85.6708 24.0168 85.4257 24.4242 84.8125 24.6274ZM90.125 23.9481L90.126 32.1398H93.203V24.536C93.2046 23.5167 93.4095 22.783 93.8315 22.2946C94.2544 21.8059 94.8813 21.5941 95.65 21.595C95.9627 21.595 96.2392 21.6205 96.4868 21.6637V19.2536C96.0997 19.0611 95.593 18.937 94.929 18.937C91.4829 18.9426 90.1378 21.357 90.125 23.9481ZM49.6612 32.1398H52.732V15.6379H49.6612V32.1398ZM61.0163 18.9447C56.9168 18.9499 55.1292 21.7209 55.1189 24.4436V32.1398H58.1735V24.6659C58.1735 23.7033 58.4264 22.9317 58.8811 22.3974C59.3364 21.8632 59.9879 21.5777 60.7438 21.5784C61.6261 21.5777 62.348 21.8312 62.8435 22.3879C63.335 22.9471 63.5857 23.7815 63.5857 24.9064L63.5897 32.1398H66.6394V24.6182C66.6328 20.953 64.108 18.9515 61.0163 18.9447ZM72.0376 15.6379H68.9995L69.0091 27.5444C69.0244 30.5669 70.5644 32.3482 73.8878 32.3636C75.2993 32.3618 76.1476 31.9094 76.4964 31.1837V29.3069C75.9486 29.5461 75.2058 29.6536 74.2855 29.6536C73.5954 29.6536 73.0208 29.4809 72.6259 29.0664C72.2334 28.6523 72.0376 28.0259 72.0376 27.1524V21.5793H74.7013C76.0016 21.5771 76.5478 20.7578 76.5513 20.1511V18.9447H72.0376V15.6379ZM130.08 18.9447C125.979 18.9499 124.19 21.7209 124.182 24.4436L124.199 32.1398H127.236V24.6668C127.236 23.7033 127.49 22.9317 127.943 22.3974C128.397 21.8632 129.052 21.5777 129.807 21.5784C130.687 21.5777 131.413 21.8312 131.905 22.3897C132.4 22.9471 132.651 23.7815 132.651 24.9073L132.657 32.1398H135.705V24.6172C135.698 20.9527 133.173 18.9515 130.08 18.9447ZM104.611 18.9447C102.891 18.9447 101.815 19.9553 101.168 20.8883L100.921 21.2443L100.93 15.6379H97.8983V25.8619C97.8983 30.2085 100.542 32.3636 103.979 32.3636C107.89 32.3636 110.361 29.3161 110.367 25.4218C110.361 21.6021 107.867 18.9466 104.611 18.9447ZM104.318 29.798H104.312C103.315 29.798 102.411 29.507 101.821 28.785C101.227 28.0604 100.945 26.9254 100.945 25.3963C100.95 23.2993 102.225 21.5811 103.979 21.5784C104.997 21.5777 105.836 21.8558 106.399 22.5662C106.966 23.2707 107.252 24.3694 107.252 25.9823C107.25 28.1473 106.048 29.7953 104.318 29.798ZM116.638 18.9466C114.78 18.9466 113.56 19.4402 112.708 20.1022V22.2228C113.575 21.8164 114.662 21.4798 116.141 21.4798C117.144 21.4808 118.015 21.619 118.53 22.0236C119.048 22.4279 119.279 23.085 119.278 24.0279V24.334H117.974C113.078 24.3524 111.462 26.0663 111.453 28.3234C111.455 30.6479 113.548 32.3587 116.68 32.3636H117.352C120.27 32.3572 122.275 30.4967 122.281 27.7876V24.7614C122.281 20.1471 119.576 18.966 116.638 18.9466ZM119.302 27.8104C119.302 28.5032 119.122 29.051 118.734 29.4233C118.346 29.7922 117.772 29.9698 117.033 29.9698H117.028C116.279 29.9698 115.672 29.8131 115.245 29.5089C114.816 29.2102 114.58 28.7496 114.582 28.2008C114.577 27.6364 114.786 27.1524 115.327 26.8503C115.864 26.5513 116.695 26.409 117.974 26.4063H119.302V27.8104Z" fill="#05BE50"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3723 12C20.6063 12 19.1773 13.442 19.1773 15.2211V36H39.9267C41.6934 36 43.1255 34.5577 43.1255 32.7789L43.129 12H22.3723ZM37.5321 29.322L24.7676 31.6339V18.7226L37.5321 16.4103V29.322Z" fill="#0039A6"/>
  </g>
  <defs>
    <clipPath id="joh-logo-clip-m">
      <rect width="169" height="48" fill="white"/>
    </clipPath>
  </defs>
</svg>
</a>
</nav>

<div class="joh-tabs-track joh-mobile-only">
<div class="joh-tabs">
  <button class="joh-tab joh-tab--active" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/87310f8d-41a6-4dee-bf1d-145e72af0433.png" data-card="viaje" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png">
    <span>Un viaje</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" alt="Viaje" />
  </button>
  <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/efc5df9d-64d3-4302-81af-4ebd9f5c1d79.png" data-card="hogar" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/650dd100-dd1b-4cdc-bad6-716673cb3970.png">
    <span>Tu hogar</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" alt="Hogar" />
  </button>
  <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f36743b4-aeed-4550-b79b-b497135bfea4.png" data-card="boda" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/13ecae72-11e0-49a7-ad5b-e1f1887fbe59.png">
    <span>Tu boda</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" alt="boda" />
  </button>
</div>
</div>

<div class="joh-card joh-card--visible joh-mobile-only" data-for="viaje">
<img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Cuenta" />
<div class="joh-card-body">
  <span class="joh-card-label">Cuenta Simple Dólares</span>
  <span class="joh-card-amount">$3,500.00</span>
  <span class="joh-card-sub">Vacaciones</span>
</div>
<img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>
<div class="joh-card joh-mobile-only" data-for="hogar">
<img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Hogar" />
<div class="joh-card-body">
  <span class="joh-card-label">Cuenta Millonaria</span>
  <span class="joh-card-amount">S/25,800.00</span>
  <span class="joh-card-sub">Inicial depa</span>
</div>
<img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>
<div class="joh-card joh-mobile-only" data-for="boda">
<img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Boda" />
<div class="joh-card-body">
  <span class="joh-card-label">Cuenta Simple Soles</span>
  <span class="joh-card-amount">S/10,800.00</span>
  <span class="joh-card-sub">Día soñado</span>
</div>
<img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>

<div class="joh-spacer joh-mobile-only"></div>

<div class="joh-promo-img-wrap joh-visible joh-mobile-only">
<img class="joh-promo-img" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6684ac5d-64f5-4191-b4ca-d481a9edc292.png" alt="Promo" />
</div>

<div class="joh-cta-card joh-visible joh-mobile-only">
<span class="joh-cta-text">Comienza a ser cliente y logra tus sueños</span>
<a href="https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:hero:cs" target="_blank">
  <button class="joh-cta-btn">
    <span>Quiero ser cliente</span>
    <svg class="joh-cta-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
  </button>
</a>
</div>

<!-- ── DESKTOP ONLY ── -->

<!-- Columna izquierda -->
<div class="joh-col-left joh-desktop-only">
<div class="joh-promo-img-wrap joh-visible">
  <img class="joh-promo-img" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6684ac5d-64f5-4191-b4ca-d481a9edc292.png" alt="Promo" />
</div>
<div class="joh-cta-card joh-visible">
  <span class="joh-cta-text">Comienza a ser cliente y logra tus sueños</span>
  <a href="https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:hero:cs" target="_blank">
    <button class="joh-cta-btn">
      <span>Quiero ser cliente</span>
      <svg class="joh-cta-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
    </button>
  </a>
</div>
</div>

<!-- Columna derecha -->
<div class="joh-col-right joh-desktop-only">
<nav class="joh-navbar">
  <a class="joh-navbar-logo-link" href="https://interbank.pe/?pcid=quiero:ser:cliente:logo:ibk" target="_blank" rel="noopener noreferrer" aria-label="Interbank">
  <svg class="joh-navbar-logo" xmlns="http://www.w3.org/2000/svg" width="169" height="48" viewBox="0 0 169 48" fill="none" aria-hidden="true">
    <g clip-path="url(#joh-logo-clip-d)">
      <path d="M0 24C0 10.7452 10.7325 0 23.9716 0H145.028C158.268 0 169 10.7452 169 24C169 37.2548 158.268 48 145.028 48H23.9716C10.7325 48 0 37.2548 0 24Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M144.427 25.2906L144.356 25.2057L144.426 25.1228C145.766 23.4576 148.661 20.2161 149.75 19.2434H148.062C146.999 19.2458 146.264 19.3579 145.496 20.059C143.969 21.4881 142.705 23.1632 141.414 24.8232L141.167 25.1413L141.181 15.6364H138.09L138.092 32.113L141.167 32.1203V25.4363L141.415 25.7611C142.88 27.6869 144.367 29.632 146.071 31.3558C146.611 31.8872 147.456 32.2213 148.161 32.218C149.006 32.2149 149.486 32.0052 149.823 31.6067C148.974 30.6026 145.466 26.5463 144.427 25.2906ZM83.2852 18.9447C79.5348 18.9499 76.8748 21.6205 76.8652 25.957C76.8652 29.9046 80.0531 32.3612 83.3101 32.3636C85.247 32.3646 86.4544 32.0662 87.1542 31.5005V29.3047C86.156 29.7903 84.9757 29.9449 83.9305 29.9449C81.923 29.9498 80.3069 28.8635 80.0444 27.1253L80.0229 26.9701H82.3668C84.5705 26.971 86.1262 26.7718 87.1041 26.292C88.0795 25.8077 88.5052 25.0828 88.5102 23.9069C88.5102 20.8424 86.005 18.9475 83.2852 18.9447ZM84.8125 24.6274C84.2052 24.8377 83.2291 24.9199 81.6458 24.9215H80.0117L80.0213 24.7792L80.0434 24.3383C80.1182 22.7706 81.2929 21.4065 82.9881 21.4065C83.7767 21.4065 84.4388 21.5771 84.9147 21.9294C85.3902 22.281 85.6599 22.8273 85.6574 23.5149C85.6708 24.0168 85.4257 24.4242 84.8125 24.6274ZM90.125 23.9481L90.126 32.1398H93.203V24.536C93.2046 23.5167 93.4095 22.783 93.8315 22.2946C94.2544 21.8059 94.8813 21.5941 95.65 21.595C95.9627 21.595 96.2392 21.6205 96.4868 21.6637V19.2536C96.0997 19.0611 95.593 18.937 94.929 18.937C91.4829 18.9426 90.1378 21.357 90.125 23.9481ZM49.6612 32.1398H52.732V15.6379H49.6612V32.1398ZM61.0163 18.9447C56.9168 18.9499 55.1292 21.7209 55.1189 24.4436V32.1398H58.1735V24.6659C58.1735 23.7033 58.4264 22.9317 58.8811 22.3974C59.3364 21.8632 59.9879 21.5777 60.7438 21.5784C61.6261 21.5777 62.348 21.8312 62.8435 22.3879C63.335 22.9471 63.5857 23.7815 63.5857 24.9064L63.5897 32.1398H66.6394V24.6182C66.6328 20.953 64.108 18.9515 61.0163 18.9447ZM72.0376 15.6379H68.9995L69.0091 27.5444C69.0244 30.5669 70.5644 32.3482 73.8878 32.3636C75.2993 32.3618 76.1476 31.9094 76.4964 31.1837V29.3069C75.9486 29.5461 75.2058 29.6536 74.2855 29.6536C73.5954 29.6536 73.0208 29.4809 72.6259 29.0664C72.2334 28.6523 72.0376 28.0259 72.0376 27.1524V21.5793H74.7013C76.0016 21.5771 76.5478 20.7578 76.5513 20.1511V18.9447H72.0376V15.6379ZM130.08 18.9447C125.979 18.9499 124.19 21.7209 124.182 24.4436L124.199 32.1398H127.236V24.6668C127.236 23.7033 127.49 22.9317 127.943 22.3974C128.397 21.8632 129.052 21.5777 129.807 21.5784C130.687 21.5777 131.413 21.8312 131.905 22.3897C132.4 22.9471 132.651 23.7815 132.651 24.9073L132.657 32.1398H135.705V24.6172C135.698 20.9527 133.173 18.9515 130.08 18.9447ZM104.611 18.9447C102.891 18.9447 101.815 19.9553 101.168 20.8883L100.921 21.2443L100.93 15.6379H97.8983V25.8619C97.8983 30.2085 100.542 32.3636 103.979 32.3636C107.89 32.3636 110.361 29.3161 110.367 25.4218C110.361 21.6021 107.867 18.9466 104.611 18.9447ZM104.318 29.798H104.312C103.315 29.798 102.411 29.507 101.821 28.785C101.227 28.0604 100.945 26.9254 100.945 25.3963C100.95 23.2993 102.225 21.5811 103.979 21.5784C104.997 21.5777 105.836 21.8558 106.399 22.5662C106.966 23.2707 107.252 24.3694 107.252 25.9823C107.25 28.1473 106.048 29.7953 104.318 29.798ZM116.638 18.9466C114.78 18.9466 113.56 19.4402 112.708 20.1022V22.2228C113.575 21.8164 114.662 21.4798 116.141 21.4798C117.144 21.4808 118.015 21.619 118.53 22.0236C119.048 22.4279 119.279 23.085 119.278 24.0279V24.334H117.974C113.078 24.3524 111.462 26.0663 111.453 28.3234C111.455 30.6479 113.548 32.3587 116.68 32.3636H117.352C120.27 32.3572 122.275 30.4967 122.281 27.7876V24.7614C122.281 20.1471 119.576 18.966 116.638 18.9466ZM119.302 27.8104C119.302 28.5032 119.122 29.051 118.734 29.4233C118.346 29.7922 117.772 29.9698 117.033 29.9698H117.028C116.279 29.9698 115.672 29.8131 115.245 29.5089C114.816 29.2102 114.58 28.7496 114.582 28.2008C114.577 27.6364 114.786 27.1524 115.327 26.8503C115.864 26.5513 116.695 26.409 117.974 26.4063H119.302V27.8104Z" fill="#05BE50"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3723 12C20.6063 12 19.1773 13.442 19.1773 15.2211V36H39.9267C41.6934 36 43.1255 34.5577 43.1255 32.7789L43.129 12H22.3723ZM37.5321 29.322L24.7676 31.6339V18.7226L37.5321 16.4103V29.322Z" fill="#0039A6"/>
    </g>
    <defs>
      <clipPath id="joh-logo-clip-d">
        <rect width="169" height="48" fill="white"/>
      </clipPath>
    </defs>
  </svg>
  </a>
</nav>
<div class="joh-card joh-card--visible" data-for="viaje">
  <img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Cuenta" />
  <div class="joh-card-body">
    <span class="joh-card-label">Cuenta Simple Dólares</span>
    <span class="joh-card-amount">$3,500.00</span>
    <span class="joh-card-sub">Vacaciones</span>
  </div>
  <img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>
<div class="joh-card" data-for="hogar">
  <img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Hogar" />
  <div class="joh-card-body">
    <span class="joh-card-label">Cuenta Millonaria</span>
    <span class="joh-card-amount">S/25,500.00</span>
    <span class="joh-card-sub">Inicial depa</span>
  </div>
  <img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>
<div class="joh-card" data-for="boda">
  <img class="joh-card-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f96a5a8e-3bb6-4d4e-9aa4-d5f0b8b959e5.png" alt="Boda" />
  <div class="joh-card-body">
    <span class="joh-card-label">Cuenta Simple Soles</span>
    <span class="joh-card-amount">S/10,800.00</span>
    <span class="joh-card-sub">Día soñado</span>
  </div>
  <img class="joh-card-arrow" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Ver" />
</div>
<div class="joh-tabs-track">
  <div class="joh-tabs">
    <button class="joh-tab joh-tab--active" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a4c0a4b-2da5-4c9a-8d6d-0e2b2277cdee.png" data-card="viaje" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png">
      <span>Un viaje</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" alt="Viaje" />
    </button>
    <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9b5d450a-bbb3-49a9-bd31-f8dc46a20093.png" data-card="hogar" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/650dd100-dd1b-4cdc-bad6-716673cb3970.png">
      <span>Tu hogar</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" alt="Hogar" />
    </button>
    <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/758255b2-3c00-4d09-97d8-0f33a51f5e37.png" data-card="boda" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/13ecae72-11e0-49a7-ad5b-e1f1887fbe59.png">
      <span>Tu boda</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" alt="Boda" />
    </button>
  </div>
</div>
</div>

</div>

<div class="joh-dots" role="tablist" aria-label="Paginación del banner">
<button type="button" class="joh-dot joh-dot--active" data-card="viaje" aria-label="Slide Un viaje" aria-current="true"></button>
<button type="button" class="joh-dot" data-card="hogar" aria-label="Slide Tu hogar"></button>
<button type="button" class="joh-dot" data-card="boda" aria-label="Slide Tu boda"></button>
</div>

</div>

<!--  SEPARADOR  -->
<div class="joh-section-divider">
<div class="joh-divider-inner">
<button class="joh-divider-btn" id="joh-divider-anchor" aria-label="Ver más">
<div class="joh-divider-pill" aria-hidden="true">
  <svg class="joh-divider-chevron" xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0134 0.96967C18.0134 0.721496 17.9184 0.473323 17.7294 0.284284C17.3503 -0.0947624 16.7377 -0.0947624 16.3586 0.284284L9.00163 7.64128L1.65433 0.293979C1.27625 -0.0850674 0.662604 -0.0850674 0.283558 0.293979C-0.0945193 0.672056 -0.0945192 1.2857 0.283558 1.66475L9.00163 10.3828L17.7294 1.65506C17.9184 1.46602 18.0134 1.21784 18.0134 0.96967Z"/></svg>
  <svg class="joh-divider-chevron" xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0134 0.96967C18.0134 0.721496 17.9184 0.473323 17.7294 0.284284C17.3503 -0.0947624 16.7377 -0.0947624 16.3586 0.284284L9.00163 7.64128L1.65433 0.293979C1.27625 -0.0850674 0.662604 -0.0850674 0.283558 0.293979C-0.0945193 0.672056 -0.0945192 1.2857 0.283558 1.66475L9.00163 10.3828L17.7294 1.65506C17.9184 1.46602 18.0134 1.21784 18.0134 0.96967Z"/></svg>
  <svg class="joh-divider-chevron" xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0134 0.96967C18.0134 0.721496 17.9184 0.473323 17.7294 0.284284C17.3503 -0.0947624 16.7377 -0.0947624 16.3586 0.284284L9.00163 7.64128L1.65433 0.293979C1.27625 -0.0850674 0.662604 -0.0850674 0.283558 0.293979C-0.0945193 0.672056 -0.0945192 1.2857 0.283558 1.66475L9.00163 10.3828L17.7294 1.65506C17.9184 1.46602 18.0134 1.21784 18.0134 0.96967Z"/></svg>
</div>
</button>
</div>
</div>

<!--  SECCIÓN 2  -->
<div class="joh-section2" id="joh-section2-anchor">
<p class="joh-s2-label">Siempre tenemos una opción para ti</p>
<p class="joh-s2-title">Somos flexibles con lo que necesites</p>
<div class="joh-carousel-track">
<div class="joh-carousel">

<div class="joh-c-card">
  <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6b6ba579-e9fa-4e01-b0b8-5774345191a5.png" alt="Card 1" />
  <div class="joh-c-card-overlay"></div>
  <div class="joh-c-card-content">
    <div class="joh-c-flag">
      <img class="joh-c-flag-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/c6bb7c45-59f9-48ed-8ed7-31b39cb0893d.png" alt="Icono" />
      <span class="joh-c-flag-text">Cuenta Simple</span>
    </div>
    <p class="joh-c-card-title">Paga con Plin desde Whatsapp</p>
    <p class="joh-c-card-sub">Afíliate y plinea a todas las billeteras</p>
    <a class="joh-c-btn-link" href="https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:flexcard:cs" target="_blank">
      <button class="joh-c-btn">
        <span>Lo quiero</span>
        <svg class="joh-c-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
      </button>
    </a>
  </div>
</div>

<div class="joh-c-card">
  <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/04bc93a3-c220-4f86-ad68-d177043c20ff.png" alt="Card 2" />
  <div class="joh-c-card-overlay"></div>
  <div class="joh-c-card-content">
    <div class="joh-c-flag" style="width:190px">
      <img class="joh-c-flag-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9608454e-c520-46e1-8ed7-86f8cc62c696.png" alt="Icono" />
      <span class="joh-c-flag-text">Tarjeta de Crédito + Plin</span>
    </div>
    <p class="joh-c-card-title">Tenemos una tarjeta para ti</p>
    <p class="joh-c-card-sub">Plinea con tu tarjeta sin cuotas y acumula millas</p>
    <a class="joh-c-btn-link" href="https://interbank.pe/solicitar/tarjeta/creditoinnominada/inicio?pcid=quiero:ser:cliente:flexcard:tc" target="_blank">
    <button class="joh-c-btn">
      <span>Lo quiero</span>
      <svg class="joh-c-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
    </button>
    </a>
  </div>
</div>

<div class="joh-c-card">
  <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/055a9461-0a65-47b6-a298-5db9cca5a98e.png" alt="Card 3" />
  <div class="joh-c-card-overlay"></div>
  <div class="joh-c-card-content">
    <div class="joh-c-flag" style="width:150px">
      <img class="joh-c-flag-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6cfccc41-71ce-4888-8498-4b3bc1434afe.png" alt="Icono" />
      <span class="joh-c-flag-text">Cuenta Millonaria</span>
    </div>
    <p class="joh-c-card-title">Gana con la Ruleta Millonaria</p>
    <p class="joh-c-card-sub">Vales de gasolina, efectivo y muchos premios más</p>
    <a class="joh-c-btn-link" href="https://interbank.pe/solicitar/cuenta/millonaria-premio/inicio?pcid=quiero:ser:cliente:flexcard:millo" target="_blank">
    <button class="joh-c-btn">
      <span>Lo quiero</span>
      <svg class="joh-c-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
    </button>
    </a>
  </div>
</div>

<div class="joh-c-card">
  <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/253bea85-a508-400d-a1ee-68846628c9b4.png" alt="Card 4" />
  <div class="joh-c-card-overlay"></div>
  <div class="joh-c-card-content">
    <div class="joh-c-flag" style="width:155px">
      <img class="joh-c-flag-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/c6bb7c45-59f9-48ed-8ed7-31b39cb0893d.png" alt="Icono" />
      <span class="joh-c-flag-text">Préstamo Personal</span>
    </div>
    <p class="joh-c-card-title">A mayor monto mejor tasa</p>
    <p class="joh-c-card-sub">Nos adaptamos a tus planes con Tasa Dinámica</p>
    <a class="joh-c-btn-link" href="https://interbank.pe/solicitar/prestamo/efectivo/inicio?pcid=quiero:ser:cliente:flexcard:pp" target="_blank">
      <button class="joh-c-btn">
        <span>Lo quiero</span>
        <svg class="joh-c-btn-icon" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true"><path d="M0.438818 0.439795C1.0243 -0.146231 1.97482 -0.146639 2.56089 0.438818L7.19858 5.07261C7.86331 5.73664 7.86332 6.81384 7.19858 7.47788L2.56089 12.1117C1.9748 12.6971 1.0243 12.6968 0.438818 12.1107C-0.146479 11.5247 -0.145831 10.5751 0.439795 9.9896L4.15757 6.27476L0.439795 2.56187C-0.146231 1.97638 -0.146639 1.02587 0.438818 0.439795Z" fill="white"/></svg>
      </button>
    </a>
  </div>
</div>

</div>
</div>
</div>
`;

  /* ---------- Inject ---------- */
  const styleTag = document.createElement('style');
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);

  const target = document.querySelector('#joh-landing-root') || document.body;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  target.prepend(wrapper);

  var mobileNav = wrapper.querySelector('.joh-navbar.joh-mobile-only');
  if (mobileNav) document.body.appendChild(mobileNav);

  /* ---------- Tab / dots / autoplay ---------- */
  const heroBg = wrapper.querySelector('.joh-hero-bg');
  var heroResizeTimer;
  var lastHeroMode = window.innerWidth < DESKTOP_BREAK ? 'mobile' : 'desktop';
  var SLIDE_KEYS = ['viaje', 'hogar', 'boda'];
  var AUTOPLAY_MS = 5000;
  var currentSlideKey = 'viaje';
  var autoplayTimer = null;
  var lastBgSrc = '';

  function getActiveHeroTab() {
      var isMobile = window.innerWidth < DESKTOP_BREAK;
      return wrapper.querySelector(
          isMobile ?
          '.joh-tabs-track.joh-mobile-only .joh-tab.joh-tab--active' :
          '.joh-col-right .joh-tab.joh-tab--active'
      );
  }

  function setHeroBackground(src) {
      if (!src || lastBgSrc === src) return;
      lastBgSrc = src;
      heroBg.src = src;
  }

  function preloadSlideImages() {
      var urls = {};
      wrapper.querySelectorAll('.joh-tab[data-bg]').forEach(function(tab) {
          var src = tab.getAttribute('data-bg');
          if (src) urls[src] = true;
      });
      Object.keys(urls).forEach(function(src) {
          var img = new Image();
          img.src = src;
      });
  }

  function goToSlide(key, options) {
      options = options || {};
      if (!key || SLIDE_KEYS.indexOf(key) === -1) return;

      var tabSelector = window.innerWidth < DESKTOP_BREAK ?
          '.joh-tabs-track.joh-mobile-only .joh-tab[data-card="' + key + '"]' :
          '.joh-col-right .joh-tab[data-card="' + key + '"]';
      var sourceTab = wrapper.querySelector(tabSelector) ||
          wrapper.querySelector('.joh-tab[data-card="' + key + '"]');
      var bg = sourceTab ? sourceTab.getAttribute('data-bg') : null;

      currentSlideKey = key;

      wrapper.querySelectorAll('.joh-tab').forEach(function(t) {
          var isActive = t.getAttribute('data-card') === key;
          t.classList.toggle('joh-tab--active', isActive);
          var img = t.querySelector('img');
          if (img) {
              var iconSrc = t.getAttribute('data-icon-white');
              if (iconSrc) img.src = iconSrc;
          }
      });

      wrapper.querySelectorAll('.joh-dot').forEach(function(dot) {
          var isActive = dot.getAttribute('data-card') === key;
          dot.classList.toggle('joh-dot--active', isActive);
          if (isActive) {
              dot.setAttribute('aria-current', 'true');
          } else {
              dot.removeAttribute('aria-current');
          }
      });

      if (bg) setHeroBackground(bg);

      wrapper.querySelectorAll('.joh-card').forEach(function(card) {
          card.classList.toggle('joh-card--visible', card.getAttribute('data-for') === key);
      });

      wrapper.querySelectorAll('.joh-promo-img-wrap.joh-mobile-only, .joh-cta-card.joh-mobile-only').forEach(function(el) {
          el.classList.add('joh-visible');
      });

      if (!options.skipRestart) restartAutoplay();
  }

  function nextSlide() {
      var idx = SLIDE_KEYS.indexOf(currentSlideKey);
      var nextKey = SLIDE_KEYS[(idx + 1) % SLIDE_KEYS.length];
      goToSlide(nextKey, { skipRestart: true });
  }

  function restartAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_MS);
  }

  function syncHeroBackground() {
      var activeTab = getActiveHeroTab();
      if (activeTab) {
          lastBgSrc = activeTab.getAttribute('data-bg');
          heroBg.src = lastBgSrc;
          return;
      }
      lastBgSrc = window.innerWidth < DESKTOP_BREAK ?
          'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/87310f8d-41a6-4dee-bf1d-145e72af0433.png' :
          'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a4c0a4b-2da5-4c9a-8d6d-0e2b2277cdee.png';
      heroBg.src = lastBgSrc;
  }

  syncHeroBackground();
  preloadSlideImages();
  restartAutoplay();

  window.addEventListener('resize', function() {
      clearTimeout(heroResizeTimer);
      heroResizeTimer = setTimeout(function() {
          var mode = window.innerWidth < DESKTOP_BREAK ? 'mobile' : 'desktop';
          if (mode !== lastHeroMode) {
              lastHeroMode = mode;
              goToSlide(currentSlideKey, { skipRestart: true });
          }
      }, 150);
  });

  wrapper.addEventListener('click', function(e) {
      var tab = e.target.closest('.joh-tab');
      var dot = e.target.closest('.joh-dot');
      if (!tab && !dot) return;

      var key = (tab || dot).getAttribute('data-card');
      goToSlide(key);
  });

  /* ---------- Secciones 3, 4, 5 (Benefits / Promotions / Footer) ---------- */

  var BENEFITS_IMG_RAPIDEZ = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08f381ab-2338-48ec-8dc4-411cdf1ad871.png';
  var BENEFITS_IMG_SEGURIDAD = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f3249e5f-980d-4827-9988-2041a98ee115.png';
  var BENEFITS_IMG_ATENCION = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/64ea9b72-8170-4a12-83ce-efd57ce8bc76.png';
  var BENEFITS_IMG_EXPERIENCIA = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/0715ea72-9f56-40c2-9c59-02cbb99ac068.png';

  var benefitsConfig = {
      title: 'Elige Interbank y tendrás',
      imageAlt: 'Cliente Interbank',
      items: [{
              title: 'Rapidez',
              desc: 'Envía y recibe dinero en segundos desde donde estés y a toda hora',
              linkText: 'Prueba Plin Interbank',
              linkHref: 'https://interbank.pe/plin-whatsapp?pcid=quiero:ser:cliente:dropdowncard:plin',
              icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/24ccd266-b9db-40d3-bd88-2696ce9a929b.png',
              image: BENEFITS_IMG_RAPIDEZ
          },
          {
              title: 'Seguridad',
              desc: 'Bloquea tu tarjeta, protege tus datos y oculta tus saldos',
              linkText: 'Descubre Modo Calle',
              linkHref: 'https://interbank.pe/modo-calle?pcid=quiero:ser:cliente:dropdowncard:calle',
              icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/93faaa8d-38b3-46be-8736-6f423fa221c1.png',
              image: BENEFITS_IMG_SEGURIDAD
          },
          {
              title: 'Atención 24/7',
              desc: 'Canales de atención disponibles en todo momento para tu tranquilidad',
              linkText: 'Solo con AVI Whatsapp',
              linkHref: 'https://api.whatsapp.com/send?phone=51993119000&text=Hola%20Avi,%20vengo%20de%20la%20web',
              icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a431a3ae-5aaa-4707-a155-1d75d3f8ee0d.png',
              image: BENEFITS_IMG_ATENCION
          },
          {
              title: 'La Mejor Experiencia',
              desc: 'Atención humana en todo momento, siempre listos para lo que necesites',
              linkText: '',
              linkHref: '',
              icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1f1f2383-4882-4cd3-a2b5-bb56600a26b3.png',
              image: BENEFITS_IMG_EXPERIENCIA
          }
      ]
  };

  var promotionsConfig = {
      subtitle: 'Te damos los mejores beneficios',
      title: 'Nuestros clientes ya disfrutan ser Interbank',
      cards: [{
              image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/4b515640-9d93-4103-a2a9-1d4e879f6c92.png',
              imageAlt: 'Rawayana',
              badge: 'Conciertos',
              title: '15% dscto en conciertos',
              desc: 'Venta exclusiva con Tarjetas Interbank',
              btnText: 'Lo quiero',
              btnHref: 'https://interbank.pe/promociones-catalogo/conciertos?pcid=quiero:ser:cliente:promocard:conciertos'
          },
          {
              image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/fe3bbf4b-a2de-43a1-9d37-87cf6a7b5523.png',
              imageAlt: 'Compras',
              badge: 'Compras',
              title: 'Compra en cuotas',
              desc: 'Grandes marcas con hasta 24 cuotas sin intereses ',
              btnText: 'Lo quiero',
              btnHref: 'https://interbank.pe/promociones-catalogo/cuotas-sin-intereses/tarjeta-de-credito?pcid=quiero:ser:cliente:promocard:tc'
          },
          {
              image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/03d328c2-8ba0-4461-860c-64bf1286ac0b.png',
              imageAlt: 'Restaurante',
              badge: 'Restaurantes',
              title: 'Disfruta ahorrando',
              desc: 'Descuentos exclusivos para clientes Interbank',
              btnText: 'Lo quiero',
              btnHref: 'https://interbank.pe/promociones-catalogo/restaurantes?pcid=quiero:ser:cliente:promocard:restaurantes'
          },
          {
              image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e8a2d8a-5c12-4d58-b5e2-f085cabc552c.png',
              imageAlt: 'Cineplanet',
              badge: 'Experiencias',
              title: 'Cineplanet',
              desc: 'Hasta 50% dscto. con Tarjetas Interbank Amex',
              btnText: 'Lo quiero',
              btnHref: 'https://interbank.pe/promociones-catalogo/entretenimiento?pcid=quiero:ser:cliente:promocard:entretenimiento'
          },
          {
              image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/8f39a8c0-79a5-4031-bc2e-f3978fead1a3.png',
              imageAlt: 'Shopstar',
              badge: 'Online',
              title: 'Shopstar',
              desc: 'Todos los miercoles hasta 20% dscto. adicional',
              btnText: 'Lo quiero',
              btnHref: 'https://www.shopstar.pe/?pcid=quiero:ser:cliente:promocard:shopstar'
          }
      ],
      ctaOutlineText: 'Ver beneficios cerca',
      ctaOutlineIcon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6cbcd27a-1024-481d-9226-11d8560bd457.png',
      ctaOutlineHref: 'https://interbank.pe/',
      ctaPrimaryText: 'Quiero ser cliente',
      ctaPrimaryHref: 'https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:promo:cs'
  };

  var footerConfig = {
      logo: 'https://interbank.pe/documents/20124/147356/ico-app%402x.webp/125aec62-9bcf-65f8-8766-4acfa63e60a6?t=1636737306572',
      logoAlt: 'Interbank APP',
      subtitle: 'La mejor App bancaria',
      title: 'Descubre Interbank App y sorpréndete',
      ctaText: 'Descargar APP',
      ctaHref: 'https://interbank.pe/',
      ctaIcon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/0aa663d5-261e-459c-8eec-239b7e94fc79.png',
      panelTitleHtml: 'Escanea el QR, descarga tu <strong>Interbank APP</strong>',
      panelDesc: 'Y empieza a realizar tus operaciones.',
      phone: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a1c05b87-ded4-4b8a-aa0e-d5ddac2a2074.png',
      phoneAlt: 'Interbank App en iPhone',
      qr: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1e180b50-f1c6-4bb1-9f75-cb309d0795bf.png',
      qrAlt: 'Código QR Interbank App',
      mockups: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/adddf543-9a6f-4ef7-99bb-4e02142f0641.png',
      mockupsAlt: 'Interbank App en smartphones',
      stores: [{
              name: 'Google Play',
              href: 'https://interbankapp.onelink.me/YSdS/qf0sfdcw',
              image: 'https://interbank.pe/documents/20124/147356/pic-badge-android%402x.png/2104af8c-2e7c-3501-669c-f68fa2fafdc9?t=1636741002286'
          },
          {
              name: 'App Store',
              href: 'https://apps.apple.com/pe/app/interbank/id447610376',
              image: 'https://interbank.pe/documents/20124/147356/pic-badge-apple%402x.png/38a363a8-7b94-c55b-8923-2e677b372a52?t=1636739163881'
          },
          {
              name: 'AppGallery',
              href: 'https://appgallery.huawei.com/#/app/C101943181',
              image: 'https://interbank.pe/documents/20124/147356/pic-badge-huawei%402x.webp/20ed0d8b-87d7-115d-5501-d465e40045fa?t=1636741096750'
          }
      ]
  };

  /* CSS nuevas secciones */
  var cssAdc = [
      ':root{--p-green:#008C37;--p-text:#000000;--p-gray:#878c8f;--adc-gradient-start:#C2FDB5;--adc-gradient-end:#38F066;--adc-blue:#0039A6;--adc-blue-hover:#3361B8;--adc-footer-base:#05BE50;--adc-footer-overlay:linear-gradient(180deg,rgba(0,95,30,0) 2.2%,#003317 95.6%);--adc-footer-phone-crop-left:25px;--adc-footer-phone-crop-right:100px;--transition:all 0.2s ease}',
      'body:has(.adc_landing){background-color:#fff!important}',
      '.adc_landing{box-sizing:border-box;background:#fff;font-family:Poppins,sans-serif;position:relative;width:100%;z-index:0}',
      '.adc_landing *,.adc_landing *:before,.adc_landing *:after{box-sizing:border-box;font-family:Poppins,sans-serif}',
      '.adc_section{position:relative;width:100%;z-index:0}',
      '.adc_section-benefits{background:linear-gradient(180deg,var(--adc-gradient-start) 0%,var(--adc-gradient-end) 100%);border-radius:16px;overflow:hidden;padding:24px 0;width:100%}',
      '.adc_section-benefits__container{background:transparent;border-radius:0;padding:28px 24px;width:100%}',
      '.adc_section-benefits__inner{display:flex;flex-direction:column;gap:24px;margin:0 auto;max-width:100%;width:100%}',
      '.adc_section-benefits__media{aspect-ratio:5/4;border-radius:16px;overflow:hidden;position:relative;width:100%}',
      '.adc_section-benefits__img{border-radius:16px;display:block;height:100%;left:0;object-fit:cover;object-position:center;opacity:0;position:absolute;top:0;transition:opacity .4s ease;width:100%}',
      '.adc_section-benefits__img.is-active{opacity:1}',
      '.adc_section-benefits__content{display:flex;flex-direction:column;gap:20px;min-width:0;width:100%}',
      '.adc_landing .adc_section-benefits__title{color:#005F1E;font-family:Geometria,sans-serif;font-size:26px;font-weight:500;line-height:1.25;margin:0}',
      '.adc_section-benefits__accordion{display:flex;flex-direction:column;gap:12px;width:100%}',
      '.adc_accordion__item{background:#fff;border-radius:16px;overflow:hidden;width:100%}',
      '.adc_accordion__header{align-items:center;background:transparent;border:0;cursor:pointer;display:flex;gap:12px;padding:14px 16px;text-align:left;width:100%}',
      '.adc_accordion__icon{align-items:center;display:flex;flex-shrink:0;height:32px;justify-content:center;width:32px}',
      '.adc_accordion__icon-img{display:block;height:25px;object-fit:contain;width:25px}',
      '.adc_accordion__title{color:var(--p-text);flex:1;font-size:18px;font-weight:500;line-height:1.3;margin:0}',
      '.adc_accordion__chevron{border-bottom:2px solid var(--p-text);border-right:2px solid var(--p-text);flex-shrink:0;height:8px;margin-right:4px;transform:rotate(45deg);transition:transform .25s ease;width:8px}',
      '.adc_accordion__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}',
      '.adc_accordion__item.is-open .adc_accordion__panel{grid-template-rows:1fr}',
      '.adc_accordion__panel-inner{min-height:0;overflow:hidden}',
      '.adc_accordion__panel-body{padding:0 16px 16px 16px}',
      '.adc_accordion__desc{font-weight:400;color:var(--p-gray);font-size:14px;line-height:1.45;margin:0 0 10px}',
      '.adc_accordion__link{color:var(--p-green);font-size:14px;font-weight:500;line-height:1.3;text-decoration:none}',
      '.adc_accordion__link:hover{text-decoration:underline}',
      '.adc_accordion__item.is-open .adc_accordion__chevron{transform:rotate(-135deg);margin-top:4px}',
      '.d-none{display:none!important}',
      '.adc_section-promotions{background:#fff;padding:32px 0;position:relative;width:100%}',
      '.adc_section-promotions::before{background:#fff;bottom:0;content:"";left:0;margin-left:calc(50% - 50vw);position:absolute;top:0;width:100vw;z-index:-1}',
      '.adc_section-promotions__container{background:#fff;margin:0 auto;max-width:100%;padding:0 24px;position:relative;width:100%}',
      '.adc_section-promotions__header{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}',
      '.adc_section-promotions__subtitle{color:var(--p-green);font-size:14px;font-weight:500;line-height:1.3;margin:0}',
      '.adc_section-promotions__title{color:var(--p-text);font-size:24px;font-weight:500;line-height:1.25;margin:0}',
      '.adc_section-promotions__carousel{background:#fff;-ms-overflow-style:none;margin:0 -24px 16px 0;overflow-x:auto;padding:4px 24px 8px 0;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}',
      '.adc_section-promotions__carousel::-webkit-scrollbar{display:none}',
      '.adc_section-promotions__track{background:#fff;display:flex;gap:16px;width:max-content}',
      '.adc_promotion-card{background:#fff;border-radius:16px;border: 1px solid #EEEFF1;box-shadow:0 2px 12px -4px rgba(0,0,0,.07);display:flex;flex:0 0 82%;flex-direction:column;max-width:300px;overflow:hidden;scroll-snap-align:start}',
      '.adc_promotion-card__media{line-height:0;position:relative;width:100%}',
      '.adc_promotion-card__img{border-radius:16px 16px 0 0;display:block;height:auto;object-fit:contain;vertical-align:top;width:100%}',
      '.adc_promotion-card__badge{background:var(--adc-blue);border-radius:999px;color:#fff;font-size:12px;font-weight:500;line-height:1;padding:6px 10px;position:absolute;right:12px;top:12px}',
      '.adc_promotion-card__body{display:flex;flex:1;flex-direction:column;gap:8px;padding:16px}',
      '.adc_promotion-card__title{color:var(--p-text);font-size:17px;font-weight:700;line-height:1.3;margin:0}',
      '.adc_promotion-card__desc{color:#494E56;flex:1;font-size:14px;line-height:1.4;margin:0}',
      '.adc_promotion-card__btn{align-self:flex-start;background:#fff;border:2px solid var(--adc-blue);border-radius:999px;color:var(--adc-blue);cursor:pointer;display:inline-block;font-size:13px;font-weight:500;line-height:1;padding:8px 18px;text-decoration:none;transition:var(--transition)}',
      '.adc_promotion-card__btn:hover{background:rgba(0,49,146,.06)}',
      '.adc_section-promotions__dots{align-items:center;background:#EEEFF1;border-radius:999px;display:flex;gap:6px;height:16px;justify-content:center;margin:0 auto 24px;padding:0 8px;width:fit-content}',
      '.adc_section-promotions__dot{background:#D0D5DD;border:none;border-radius:999px;cursor:pointer;flex-shrink:0;height:6px;padding:0;transition:width .3s ease,height .3s ease,background-color .3s ease;width:6px}',
      '.adc_section-promotions__dot.is-active{background:#181A1D;height:6px;width:14px}',
      '.adc_section-promotions__actions{display:flex;flex-direction:column;gap:12px;width:100%}',
      '.adc_section-promotions__btn{align-items:center;border-radius:999px;cursor:pointer;display:inline-flex;font-size:16px;font-weight:500;gap:10px;justify-content:center;line-height:1;min-height:52px;padding:14px 24px;text-decoration:none;transition:var(--transition);width:100%}',
      '.adc_section-promotions__btn-icon{display:block;flex-shrink:0;height:15px;object-fit:contain;width:15px}',
      '.adc_section-promotions__btn--outline{background:#fff;border:2px solid var(--adc-blue);color:var(--adc-blue)}',
      '.adc_section-promotions__btn--outline:hover{background:rgba(0,49,146,.06)}',
      '.adc_section-promotions__btn--primary{background:var(--adc-blue);border:2px solid var(--adc-blue);color:#fff}',
      '.adc_section-promotions__btn--primary:hover{background-color:var(--adc-blue-hover);border-color:var(--adc-blue-hover)}',
      '.adc_section-promotions__btn--primary:active{background-color:var(--adc-blue);border-color:var(--adc-blue)}',
      '.adc_section-footer{background:linear-gradient(180deg,#05BE50 0%,#005F1E 100%);overflow:hidden;padding:48px 24px 0;position:relative;width:100%}',
      '.adc_section-footer::after{display:none}',
      '.adc_section-footer__container{margin:0 auto;max-width:100%;position:relative;width:100%;z-index:1}',
      '.adc_section-footer__inner{align-items:center;display:flex;flex-direction:column;gap:16px;margin:0 auto;width:100%}',
      '.adc_section-footer__content{align-items:center;display:flex;flex-direction:column;gap:12px;text-align:center;width:100%}',
      '.adc_section-footer__logo{border-radius:7.64px;box-shadow:0 3.05px 3.05px 0 #00000040;display:block;height:42px;margin:0 auto;object-fit:contain;width:42px}',
      '.adc_section-footer__subtitle{color:#fff;font-size:16px;font-weight:500;line-height:1.3;margin:0}',
      '.adc_section-footer__title{color:#fff;font-size:24px;font-weight:500;line-height:1.2;margin:0;max-width:280px}',
      '.adc_section-footer__download{align-items:center;background:#fff;border-radius:999px;color:#494E56;display:inline-flex;font-size:16px;font-weight:500;gap:10px;justify-content:center;line-height:1;margin-top:4px;min-height:48px;padding:12px 28px;text-decoration:none;transition:var(--transition)}',
      '.adc_section-footer__download:hover{opacity:.92}',
      '.adc_section-footer__download-icon{display:block;flex-shrink:0;height:18px;object-fit:contain;width:18px}',
      '.adc_section-footer__stores{align-items:center;display:flex;flex-direction:row;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:4px;max-width:100%;width:100%}',
      '.adc_section-footer__store{display:inline-flex;flex:0 0 auto;line-height:0;text-decoration:none;transition:var(--transition)}',
      '.adc_section-footer__store:nth-child(1){order:2}',
      '.adc_section-footer__store:nth-child(2){order:1}',
      '.adc_section-footer__store:nth-child(3){order:3}',
      '.adc_section-footer__store:hover{opacity:.88}',
      '.adc_section-footer__store-img{display:block;height:40px;max-width:140px;object-fit:contain;width:auto}',
      '.adc_section-footer__panel{display:none}',
      '.adc_section-footer__mockups{display:block;line-height:0;margin:0 -24px;max-width:none;position:relative;width:calc(100% + 48px)}',
      '.adc_section-footer__mockups::after{background:linear-gradient(180deg,rgba(67,156,22,.1) 0%,#008C37 69.23%);bottom:0;content:"";height:173px;left:0;pointer-events:none;position:absolute;right:0;width:100%;z-index:1}',
      '.adc_section-footer__mockups-img{display:block;height:auto;margin:0 auto;max-width:420px;object-fit:contain;object-position:bottom center;position:relative;width:100%;z-index:0}',
      '.adc_section-footer__panel-phone-wrap{border-radius:12px;display:block;flex-shrink:0;height:180px;line-height:0;overflow:hidden;width:max-content}',
      '.adc_section-footer__panel-phone{clip-path:inset(0 var(--adc-footer-phone-crop-right) 0 var(--adc-footer-phone-crop-left));display:block;height:180px;margin-left:calc(-1 * var(--adc-footer-phone-crop-left));margin-right:calc(-1 * var(--adc-footer-phone-crop-right));max-width:none;width:auto}',
      '.adc_section-footer__panel-qr-wrap{align-items:center;display:flex;flex-direction:column;gap:12px;text-align:center;width:100%}',
      '.adc_section-footer__panel-qr{background:transparent;border-radius:0;display:block;flex-shrink:0;height:160px;object-fit:contain;width:160px}',
      '.adc_section-footer__panel-copy{display:flex;flex-direction:column;gap:4px}',
      '.adc_section-footer__panel-title{color:#fff;font-family:Geometria,sans-serif;font-size:18px;font-weight:400;letter-spacing:-0.5px;line-height:1.25;margin:0}',
      '.adc_section-footer__panel-title strong{font-weight:500}',
      '.adc_section-footer__panel-desc{color:#fff;font-family:Montserrat,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.1px;line-height:1.4;margin:0}',
      '@media (min-width:1024px){',
      '.adc_section-benefits{background:linear-gradient(90deg,var(--adc-gradient-start) 0%,var(--adc-gradient-end) 100%);padding:48px 0}',
      '.adc_section-benefits__container{margin:0 auto;max-width:928px;padding:0 40px}',
      '.adc_section-benefits__inner{align-items:flex-start;flex-direction:row;gap:40px}',
      '.adc_section-benefits__media{align-self:flex-start;aspect-ratio:auto;flex:0 0 47%;height:auto;margin:0;max-width:446px;overflow:hidden;position:relative;width:auto}',
      '.adc_section-benefits__img{border-radius:16px;display:block;height:100%;left:0;object-fit:cover;object-position:center;opacity:0;position:absolute;top:0;transition:opacity .4s ease;width:100%}',
      '.adc_section-benefits__img.is-active{opacity:1;position:absolute}',
      '.adc_section-benefits__content{flex:1;gap:24px}',
      '.adc_section-benefits__title{font-size:28px}',
      '.adc_accordion__header{padding:16px 20px}',
      '.adc_accordion__title{font-size:16px}',
      '.adc_accordion__panel-body{padding:0 20px 18px 20px}',
      '.adc_section-promotions{padding:48px 0}',
      '.adc_section-promotions__container{padding: 0}',
      '.adc_section-promotions__header{align-items:center;margin-bottom:32px;text-align:center}',
      '.adc_section-promotions__subtitle{font-size:14px}',
      '.adc_section-promotions__title{font-size:24px;margin-left:auto;margin-right:auto;max-width:800px}',
      '.adc_section-promotions__carousel{background:#fff;margin:0 calc((100% - 100vw) / 2) 20px 0;overflow-x:auto;padding:4px 0 12px;width:calc(100% + (100vw - 100%) / 2);-ms-overflow-style:none;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}',
      '.adc_section-promotions__carousel::-webkit-scrollbar{display:none}',
      '.adc_section-promotions__track{display:flex;gap:20px;padding-right:48px;width:max-content}',
      '.adc_promotion-card{border:1px solid #EEEFF1;box-shadow:0 5px 10px 0 #181A1D0A;flex:0 0 250px;max-width:250px;min-width:250px;width:250px;scroll-snap-align:start}',
      '.adc_promotion-card__img{height:154px;object-fit:cover}',
      '.adc_promotion-card__body{padding:18px}',
      '.adc_promotion-card__title{font-size:15px}',
      '.adc_promotion-card__desc{font-size:13px}',
      '.adc_section-promotions__dots{margin:0 auto 32px}',
      '.adc_section-promotions__actions{align-items:center;margin:0 auto;max-width:none;width:auto}',
      '.adc_section-promotions__btn{min-width:300px;padding:14px 48px;width:auto}',
      '.adc_section-footer{background: linear-gradient(161deg, #05BE50 0%, #005F1E 100%);padding:60px 0}',
      '.adc_section-footer::after{background:var(--adc-footer-overlay);bottom:0;content:"";display:block;height:91px;left:0;pointer-events:none;position:absolute;right:0;z-index:0}',
      '.adc_section-footer__container{margin:0 auto;max-width:1200px;padding:0 48px}',
      '.adc_section-footer__inner{align-items:center;display:grid;gap:40px;grid-template-columns:1fr 1fr;justify-content:initial;width:100%}',
      '.adc_section-footer__content{align-items:center;display:flex;flex:none;flex-direction:column;gap:12px;justify-content:center;margin:0 auto;max-width:360px;text-align:center;width:100%}',
      '.adc_section-footer__logo{height:42px;margin:0 auto;width:42px}',
      '.adc_section-footer__subtitle{font-size:16px}',
      '.adc_section-footer__title{font-size:26px;max-width:320px}',
      '.adc_section-footer__download{display:none}',
      '.adc_section-footer__stores{flex-wrap:nowrap;gap:10px;justify-content:center;margin-top:8px;max-width:none;overflow:visible;width:auto}',
      '.adc_section-footer__store:nth-child(1),.adc_section-footer__store:nth-child(2),.adc_section-footer__store:nth-child(3){order:0}',
      '.adc_section-footer__store-img{height:40px}',
      '.adc_section-footer__mockups{display:none}',
      '.adc_section-footer__panel{align-items:center;background:#0B1F14;border-radius:20px;display:flex;flex:none;flex-direction:row;gap:16px;height:auto;justify-content:flex-start;margin:0 auto;max-width:560px;min-height:180px;overflow:hidden;padding:20px 24px;width:100%}',
      '.adc_section-footer__panel-phone-wrap{border-radius:12px;display:block;flex-shrink:0;height:180px;line-height:0;overflow:hidden;width:max-content}',
      '.adc_section-footer__panel-phone{clip-path:inset(0 var(--adc-footer-phone-crop-right) 0 var(--adc-footer-phone-crop-left));display:block;height:180px;margin-left:calc(-1 * var(--adc-footer-phone-crop-left));margin-right:calc(-1 * var(--adc-footer-phone-crop-right));max-width:none;width:auto}',
      '.adc_section-footer__panel-qr-wrap{align-items:center;align-self:center;display:flex;flex:1;flex-direction:row;gap:14px;min-width:0;padding:0;text-align:left}',
      '.adc_section-footer__panel-qr{background:transparent;border-radius:0;flex-shrink:0;height:120px;object-fit:contain;padding:0;width:120px}',
      '.adc_section-footer__panel-copy{flex:0 1 215px;max-width:215px;min-width:0}',
      '.adc_section-footer__panel-title{font-family:Geometria,sans-serif;font-size:26px;font-weight:300;letter-spacing:-1px;line-height:32px}',
      '.adc_section-footer__panel-title strong{font-weight:500}',
      '.adc_section-footer__panel-desc{font-family:Montserrat,sans-serif;font-size:16px;font-weight:400;letter-spacing:-0.1px;line-height:24px}',
      '}',
      '@media (min-width:1200px){',
      '.adc_section-benefits{padding:56px 0}',
      '.adc_section-benefits__container{padding:0 10px}',
      '.adc_section-promotions__container{padding: 0 0 0 40px}',
      '.adc_section-promotions__track{padding-right:64px}',
      '.adc_section-footer__container{max-width:1280px;padding:0 56px}',
      '.adc_section-footer__inner{gap:48px}',
      '.adc_section-footer__content{max-width:380px}',
      '.adc_section-footer__title{font-size:26px}',
      '.adc_section-footer__panel{max-width:600px;padding:0 28px}',
      '.adc_section-footer__panel-phone-wrap{height:200px}',
      '.adc_section-footer__panel-phone{height:200px}',
      '.adc_section-footer__panel-qr{height:140px;width:140px}',
      '.adc_section-footer__panel-qr-wrap{gap:16px;padding:0}',
      '}'
  ].join('');

  var adcStyleTag = document.createElement('style');
  adcStyleTag.innerHTML = cssAdc;
  document.head.appendChild(adcStyleTag);

  /* HTML helpers */
  function adcAccordionItem(item) {
      return '<div class="adc_accordion__item" data-adc-accordion-item data-adc-image="' + item.image + '">' +
          '<button class="adc_accordion__header" type="button" aria-expanded="false">' +
          '<span class="adc_accordion__icon"><img class="adc_accordion__icon-img" src="' + item.icon + '" alt="" loading="lazy"></span>' +
          '<span class="adc_accordion__title">' + item.title + '</span>' +
          '<span class="adc_accordion__chevron" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="adc_accordion__panel"><div class="adc_accordion__panel-inner"><div class="adc_accordion__panel-body">' +
          '<p class="adc_accordion__desc">' + item.desc + '</p>' +
          '<a class="adc_accordion__link" href="' + item.linkHref + '" target="_blank" rel="noopener noreferrer">' + item.linkText + '</a>' +
          '</div></div></div>' +
          '</div>';
  }

  function adcPromotionCard(card) {
      return '<article class="adc_promotion-card">' +
          '<div class="adc_promotion-card__media">' +
          '<img class="adc_promotion-card__img" src="' + card.image + '" alt="' + card.imageAlt + '" loading="lazy">' +
          '<span class="adc_promotion-card__badge">' + card.badge + '</span>' +
          '</div>' +
          '<div class="adc_promotion-card__body">' +
          '<h3 class="adc_promotion-card__title">' + card.title + '</h3>' +
          '<p class="adc_promotion-card__desc">' + card.desc + '</p>' +
          '<a class="adc_promotion-card__btn" href="' + card.btnHref + '" target="_blank" rel="noopener noreferrer">' + card.btnText + '</a>' +
          '</div>' +
          '</article>';
  }

  function adcFooterStore(store) {
      return '<a class="adc_section-footer__store" href="' + store.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + store.name + '">' +
          '<img class="adc_section-footer__store-img" src="' + store.image + '" alt="' + store.name + '" loading="lazy">' +
          '</a>';
  }

  function adcGetFooterDownloadHref() {
      var ua = navigator.userAgent || navigator.vendor || window.opera || '';
      var platform = navigator.platform || '';
      var storeName = '';

      if (/HUAWEI|HONOR|HarmonyOS/i.test(ua)) {
          storeName = 'AppGallery';
      } else if (/Android/i.test(ua)) {
          storeName = 'Google Play';
      } else if (/iPad|iPhone|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
          storeName = 'App Store';
      }

      for (var i = 0; i < footerConfig.stores.length; i++) {
          if (footerConfig.stores[i].name === storeName) {
              return footerConfig.stores[i].href;
          }
      }

      return footerConfig.ctaHref;
  }

  var htmlAdc =
      '<div class="adc_landing">' +
      '<section id="joh-benefits-anchor" class="adc_section adc_section-benefits">' +
      '<div class="adc_section-benefits__container"><div class="adc_section-benefits__inner">' +
      '<div class="adc_section-benefits__media">' +
      '<img class="adc_section-benefits__img is-active" src="' + benefitsConfig.items[0].image + '" alt="' + benefitsConfig.imageAlt + '">' +
      '<img class="adc_section-benefits__img" src="' + benefitsConfig.items[0].image + '" alt="" aria-hidden="true">' +
      '</div>' +
      '<div class="adc_section-benefits__content">' +
      '<h2 class="adc_section-benefits__title">' + benefitsConfig.title + '</h2>' +
      '<div class="adc_section-benefits__accordion">' + benefitsConfig.items.map(adcAccordionItem).join('') + '</div>' +
      '</div>' +
      '</div></div>' +
      '</section>' +
      '<section class="adc_section adc_section-promotions">' +
      '<div class="adc_section-promotions__container">' +
      '<header class="adc_section-promotions__header">' +
      '<p class="adc_section-promotions__subtitle">' + promotionsConfig.subtitle + '</p>' +
      '<h2 class="adc_section-promotions__title">' + promotionsConfig.title + '</h2>' +
      '</header>' +
      '<div class="adc_section-promotions__carousel"><div class="adc_section-promotions__track">' + promotionsConfig.cards.map(adcPromotionCard).join('') + '</div></div>' +
      '<div class="adc_section-promotions__dots" role="tablist" aria-label="Paginación de promociones"></div>' +
      '<div class="adc_section-promotions__actions">' +
      '<a class="adc_section-promotions__btn adc_section-promotions__btn--outline d-none" href="' + promotionsConfig.ctaOutlineHref + '" target="_blank" rel="noopener noreferrer">' + promotionsConfig.ctaOutlineText + '<img class="adc_section-promotions__btn-icon" src="' + promotionsConfig.ctaOutlineIcon + '" alt="" loading="lazy"></a>' +
      '<a class="adc_section-promotions__btn adc_section-promotions__btn--primary" href="' + promotionsConfig.ctaPrimaryHref + '" target="_blank" rel="noopener noreferrer">' + promotionsConfig.ctaPrimaryText + '</a>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="adc_section adc_section-footer">' +
      '<div class="adc_section-footer__container"><div class="adc_section-footer__inner">' +
      '<div class="adc_section-footer__content">' +
      '<img class="adc_section-footer__logo" src="' + footerConfig.logo + '" alt="' + footerConfig.logoAlt + '" width="42" height="42" loading="lazy">' +
      '<p class="adc_section-footer__subtitle">' + footerConfig.subtitle + '</p>' +
      '<h2 class="adc_section-footer__title">' + footerConfig.title + '</h2>' +
      '<a class="adc_section-footer__download" href="' + adcGetFooterDownloadHref() + '" target="_blank" rel="noopener noreferrer">' +
      footerConfig.ctaText +
      '<img class="adc_section-footer__download-icon" src="' + footerConfig.ctaIcon + '" alt="" loading="lazy">' +
      '</a>' +
      '<div class="adc_section-footer__stores">' + footerConfig.stores.map(adcFooterStore).join('') + '</div>' +
      '</div>' +
      '<div class="adc_section-footer__panel">' +
      '<div class="adc_section-footer__panel-phone-wrap">' +
      '<img class="adc_section-footer__panel-phone" src="' + footerConfig.phone + '" alt="' + footerConfig.phoneAlt + '" loading="lazy">' +
      '</div>' +
      '<div class="adc_section-footer__panel-qr-wrap">' +
      '<img class="adc_section-footer__panel-qr" src="' + footerConfig.qr + '" alt="' + footerConfig.qrAlt + '" loading="lazy">' +
      '<div class="adc_section-footer__panel-copy">' +
      '<p class="adc_section-footer__panel-title">' + footerConfig.panelTitleHtml + '</p>' +
      '<p class="adc_section-footer__panel-desc">' + footerConfig.panelDesc + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="adc_section-footer__mockups">' +
      '<img class="adc_section-footer__mockups-img" src="' + footerConfig.mockups + '" alt="' + footerConfig.mockupsAlt + '" loading="lazy">' +
      '</div>' +
      '</div></div>' +
      '</section>' +
      '</div>';

  var adcContainer = document.createElement('div');
  adcContainer.innerHTML = htmlAdc;
  var adcRoot = adcContainer.firstElementChild;
  document.body.appendChild(adcRoot);

  /* Promotions carousel dots */
  (function() {
      var section = adcRoot.querySelector('.adc_section-promotions');
      if (!section) return;
      var carousel = section.querySelector('.adc_section-promotions__carousel');
      var track = section.querySelector('.adc_section-promotions__track');
      var dotsWrap = section.querySelector('.adc_section-promotions__dots');
      if (!carousel || !track || !dotsWrap) return;

      var cards = track.querySelectorAll('.adc_promotion-card');
      var resizeTimer;
      var currentIndex = 0;

      function isDesktop() {
          return window.innerWidth >= DESKTOP_BREAK;
      }

      function getDotCount() {
          if (!cards.length) return 0;
          if (!isDesktop()) return cards.length;
          var maxScroll = carousel.scrollWidth - carousel.clientWidth;
          if (maxScroll <= 4) return 1;
          return Math.max(2, Math.ceil(carousel.scrollWidth / carousel.clientWidth));
      }

      function getActiveIndex() {
          var maxScroll = carousel.scrollWidth - carousel.clientWidth;
          var count = getDotCount();
          if (count <= 1 || maxScroll <= 4) return 0;

          // Al final del scroll siempre marcar el último dot
          if (carousel.scrollLeft >= maxScroll - 12) return count - 1;

          if (!isDesktop()) {
              var scrollLeft = carousel.scrollLeft;
              var best = 0;
              var bestDist = Infinity;
              var i;
              for (i = 0; i < cards.length && i < count; i++) {
                  var dist = Math.abs(cards[i].offsetLeft - scrollLeft);
                  if (dist < bestDist) {
                      bestDist = dist;
                      best = i;
                  }
              }
              return best;
          }
          var progress = carousel.scrollLeft / maxScroll;
          return Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));
      }

      function setActiveDot(index) {
          currentIndex = index;
          var dots = dotsWrap.querySelectorAll('.adc_section-promotions__dot');
          dots.forEach(function(dot, i) {
              var active = i === index;
              dot.classList.toggle('is-active', active);
              if (active) dot.setAttribute('aria-current', 'true');
              else dot.removeAttribute('aria-current');
          });
      }

      function scrollToIndex(index) {
          var count = getDotCount();
          if (count <= 0) return;
          index = Math.max(0, Math.min(count - 1, index));
          var maxScroll = carousel.scrollWidth - carousel.clientWidth;

          if (!isDesktop()) {
              // Último card: ir al máximo scroll (el offsetLeft suele superar maxScroll)
              if (index >= count - 1) {
                  carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
                  return;
              }
              var cardLeft = cards[index] ? cards[index].offsetLeft : 0;
              carousel.scrollTo({ left: Math.min(cardLeft, maxScroll), behavior: 'smooth' });
              return;
          }
          var left = count === 1 ? 0 : (index / (count - 1)) * maxScroll;
          carousel.scrollTo({ left: left, behavior: 'smooth' });
      }

      function renderDots() {
          var count = getDotCount();
          var html = '';
          var i;
          for (i = 0; i < count; i++) {
              html += '<button type="button" class="adc_section-promotions__dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Página ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
          }
          dotsWrap.innerHTML = html;
          dotsWrap.querySelectorAll('.adc_section-promotions__dot').forEach(function(dot, i) {
              dot.addEventListener('click', function() {
                  scrollToIndex(i);
                  setActiveDot(i);
              });
          });
          setActiveDot(Math.min(currentIndex, Math.max(0, count - 1)));
      }

      carousel.addEventListener('scroll', function() {
          setActiveDot(getActiveIndex());
      }, { passive: true });

      window.addEventListener('resize', function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
              renderDots();
              setActiveDot(getActiveIndex());
          }, 150);
      });

      renderDots();
  })();

  /* Ancla del divider → sección flexibles (cards) */
  var dividerBtn = wrapper.querySelector('#joh-divider-anchor');
  if (dividerBtn) {
      dividerBtn.addEventListener('click', function() {
          var target = document.getElementById('joh-section2-anchor');
          if (target) target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  }

  /* Benefits accordion + image swap (altura fija = cerrados) */
  (function() {
      var section = adcRoot.querySelector('.adc_section-benefits');
      if (!section) return;
      var media = section.querySelector('.adc_section-benefits__media');
      var content = section.querySelector('.adc_section-benefits__content');
      var imgs = section.querySelectorAll('.adc_section-benefits__img');
      var items = section.querySelectorAll('[data-adc-accordion-item]');
      var resizeTimer;
      var lastSrc = benefitsConfig.items[0].image;
      if (!media || !content || imgs.length < 2 || !items.length) return;

      function lockImageToClosedHeight() {
          if (window.innerWidth < DESKTOP_BREAK) {
              media.style.height = '';
              return;
          }
          var opened = [];
          items.forEach(function(item) {
              if (item.classList.contains('is-open')) {
                  opened.push(item);
                  item.classList.remove('is-open');
              }
          });
          var h = content.offsetHeight;
          opened.forEach(function(item) {
              item.classList.add('is-open');
          });
          media.style.height = h + 'px';
      }

      function setBenefitsImage(src) {
          if (!src || lastSrc === src) return;
          lastSrc = src;

          var active = media.querySelector('.adc_section-benefits__img.is-active');
          var next = active === imgs[0] ? imgs[1] : imgs[0];

          function reveal() {
              next.classList.add('is-active');
              active.classList.remove('is-active');
          }

          if (next.getAttribute('src') === src && next.complete) {
              reveal();
              return;
          }

          next.onload = function() {
              next.onload = null;
              reveal();
          };
          next.src = src;
          if (next.complete) {
              next.onload = null;
              reveal();
          }
      }

      function openItem(item) {
          items.forEach(function(o) {
              o.classList.remove('is-open');
              o.querySelector('.adc_accordion__header').setAttribute('aria-expanded', 'false');
          });
          if (!item) return;
          item.classList.add('is-open');
          item.querySelector('.adc_accordion__header').setAttribute('aria-expanded', 'true');
          setBenefitsImage(item.getAttribute('data-adc-image') || benefitsConfig.items[0].image);
      }

      items.forEach(function(item) {
          var header = item.querySelector('.adc_accordion__header');
          header.addEventListener('click', function() {
              var isOpen = item.classList.contains('is-open');
              openItem(isOpen ? null : item);
          });
      });

      lockImageToClosedHeight();

      window.addEventListener('resize', function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(lockImageToClosedHeight, 150);
      });

      benefitsConfig.items.forEach(function(item) {
          if (!item.image) return;
          var preload = new Image();
          preload.src = item.image;
      });
  })();
  document.querySelector(".page.oldier").remove()
})();