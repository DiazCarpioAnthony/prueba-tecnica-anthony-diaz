(function() {

    var DESKTOP_BREAK = 1024;
  
    if (!document.querySelector('link[data-adc-poppins]')) {
        var poppinsLink = document.createElement('link');
        poppinsLink.rel = 'stylesheet';
        poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
        poppinsLink.setAttribute('data-adc-poppins', '1');
        document.head.appendChild(poppinsLink);
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
  height: 48px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  }
  
  /* Navbar mobile: fixed en la parte superior */
  .joh-navbar.joh-mobile-only {
  position: fixed;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  }
  .joh-navbar-logo { width:131px; height:24px; object-fit:contain; flex-shrink:0; }
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
  width:114px; height:32px; border-radius:16px; border:2px solid #fff;
  background-color:transparent; cursor:pointer; display:flex; align-items:center;
  justify-content:center; gap:6px; padding:0 10px; flex-shrink:0;
  transition:background-color 0.2s ease, border-color 0.2s ease;
  }
  .joh-tab.joh-tab--active { background-color:#fff; border-color:#fff; }
  .joh-tab img { width:20px; height:20px; object-fit:contain; flex-shrink:0; }
  .joh-tab span { color:#fff; font-size:14px; font-weight:500; white-space:nowrap; }
  .joh-tab.joh-tab--active span { color:#000; }
  
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
  .joh-promo-img { width:273px; height:159px; object-fit:cover; border-radius:12px; }
  
  /* Card CTA mobile 327x136 */
  .joh-cta-card {
  width:327px; border-radius:20px;
  border: 1px solid  #FFFFFF; background:rgba(255,255,255,0.15);
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
  margin-top:12px; margin-bottom:44px; display:none; flex-direction:column;
  align-items:center; justify-content:  center; gap:16px; padding:20px;
  }
  .joh-cta-card.joh-visible { display:flex; }
  .joh-cta-text { color:#fff; font-size:16px; font-weight:500; text-align:center; line-height:1.4; }
  .joh-cta-btn {
  width:236px; height:56px; border-radius:80px; background-color:#fff;
  border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .joh-cta-btn span { color:#000; font-size:15px; font-weight:500; white-space:nowrap; }
  .joh-cta-btn-icon { width:15px; height:15px; object-fit:contain; flex-shrink:0; }

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
  .joh-c-btn { width:159px; height:49px; border-radius:80px; border:2px solid #fff; background-color:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
  .joh-c-btn span { color:#fff; font-size:14px; font-weight:500; white-space:nowrap; }
  .joh-c-btn-icon { width:16px; height:16px; object-fit:contain; flex-shrink:0; }
  
  /* DESKTOP — min-width: 1024px (tablet usa layout mobile) */
  @media (min-width: 1024px) {
  
  /* Ocultar bloque mobile, mostrar bloque desktop */
  .joh-mobile-only { display:none !important; }
  .joh-desktop-only { display:flex !important; }
  
  /* Hero full dekstop width border-radius */
  .joh-wrapper {
  width: 100%;
  height: 691px;
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
  display:flex; flex-direction:column; align-items:flex-start;
  padding:60px 0 0 10%; gap:0;
  }
  
  .joh-col-left .joh-navbar {
  width:327px; height:48px; margin-bottom:25px;
  justify-content:center; padding:0 16px;
  }
  
  .joh-col-left .joh-promo-img-wrap {
  display:flex; justify-content:flex-start;
  width:auto; margin-bottom:25px;
  }
  .joh-col-left .joh-promo-img { width:491px; height:287px; border-radius:16px; }
  
  .joh-col-left .joh-cta-card {
  display:flex; width:491px; height:140px; margin:0;
  }

  .joh-dots { bottom:24px; }
  
  /* Columna derecha */
  .joh-col-right {
  position:relative; z-index:2; flex:1;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:0;
  margin-top: 120px;
  }
  
  /* Card desktop: 320x92, arriba */
  .joh-col-right .joh-card { width:320px; height:92px; margin:0 0 20px 0; }
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
  src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5331982f-54f6-433f-8c83-e34921364cf9.png"
  alt="Hero background" />
  
  <div class="joh-hero-content">
  
  <!-- ── MOBILE ONLY ── -->
  <nav class="joh-navbar joh-mobile-only">
  <img class="joh-navbar-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Interbank_logo.svg/3840px-Interbank_logo.svg.png" alt="Interbank" />
  <div class="joh-navbar-divider"></div>
  <a href="https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:navbar:cs" target="_blank"><button class="joh-navbar-btn"><span>Quiero ser cliente</span></button></a>
  </nav>
  
  <div class="joh-tabs-track joh-mobile-only">
  <div class="joh-tabs">
    <button class="joh-tab joh-tab--active" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5a9a91f9-4f54-4c0b-b19d-cfb1a10674c2.png" data-card="viaje" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png">
      <span>Un viaje</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png" alt="Viaje" />
    </button>
    <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/faa2ef3b-8b83-411f-bf07-b0cc52f3af2f.png" data-card="hogar" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/650dd100-dd1b-4cdc-bad6-716673cb3970.png">
      <span>Tu hogar</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" alt="Hogar" />
    </button>
    <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/f8b3fa16-3cbf-463e-a294-351468a0c7b6.png" data-card="boda" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/13ecae72-11e0-49a7-ad5b-e1f1887fbe59.png">
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
      <img class="joh-cta-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/af4b2289-af11-4de4-9dc2-711c6f521e69.png" alt="Flecha" />
    </button>
  </a>
  </div>
  
  <!-- ── DESKTOP ONLY ── -->
  
  <!-- Columna izquierda -->
  <div class="joh-col-left joh-desktop-only">
  <nav class="joh-navbar">
    <img class="joh-navbar-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Interbank_logo.svg/3840px-Interbank_logo.svg.png" alt="Interbank" />
  </nav>
  <div class="joh-promo-img-wrap joh-visible">
    <img class="joh-promo-img" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/6684ac5d-64f5-4191-b4ca-d481a9edc292.png" alt="Promo" />
  </div>
  <div class="joh-cta-card joh-visible">
    <span class="joh-cta-text">Comienza a ser cliente y logra tus sueños</span>
    <a href="https://interbank.pe/solicitar/cuenta/simple/inicio?pcid=quiero:ser:cliente:hero:cs" target="_blank">
      <button class="joh-cta-btn">
        <span>Quiero ser cliente</span>
        <img class="joh-cta-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/af4b2289-af11-4de4-9dc2-711c6f521e69.png" alt="Flecha" />
      </button>
    </a>
  </div>
  </div>
  
  <!-- Columna derecha -->
  <div class="joh-col-right joh-desktop-only">
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
      <button class="joh-tab joh-tab--active" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5331982f-54f6-433f-8c83-e34921364cf9.png" data-card="viaje" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/a5d47285-2ef5-42d7-86d6-4b097b0c964b.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png">
        <span>Un viaje</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/3ad0083b-233f-4446-9d4e-fe594df589e5.png" alt="Viaje" />
      </button>
      <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/aaf3972b-dcb2-4488-8d20-c43f4f6708ce.png" data-card="hogar" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/650dd100-dd1b-4cdc-bad6-716673cb3970.png">
        <span>Tu hogar</span> <img src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e513b43-0c4f-4bab-bbbb-79ce8238a092.png" alt="Hogar" />
      </button>
      <button class="joh-tab" data-bg="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/b6830779-3375-4839-aa44-f82c340d6b27.png" data-card="boda" data-icon-white="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/2226aa18-00d8-4ea9-aaae-9758af5d38bc.png" data-icon-black="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/13ecae72-11e0-49a7-ad5b-e1f1887fbe59.png">
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
    <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/4d6c52c6-69f9-445b-b847-7f8e4e0f8524.png" alt="Card 1" />
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
          <img class="joh-c-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Flecha" />
        </button>
      </a>
    </div>
  </div>
  
  <div class="joh-c-card">
    <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/47628379-6349-4579-a18f-5da21a9da124.png" alt="Card 2" />
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
        <img class="joh-c-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Flecha" />
      </button>
      </a>
    </div>
  </div>
  
  <div class="joh-c-card">
    <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/879da7c2-afee-4a53-810d-946a4e8c1bc9.png" alt="Card 3" />
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
        <img class="joh-c-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Flecha" />
      </button>
      </a>
    </div>
  </div>
  
  <div class="joh-c-card">
    <img class="joh-c-card-bg" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/7e5b5376-5312-4bed-8f8e-42762e071b81.png" alt="Card 4" />
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
          <img class="joh-c-btn-icon" src="https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9a83a9f8-a339-4dc6-93bd-2be0901d19ae.png" alt="Flecha" />
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
                var iconSrc = isActive ? t.getAttribute('data-icon-black') : t.getAttribute('data-icon-white');
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
            'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5a9a91f9-4f54-4c0b-b19d-cfb1a10674c2.png' :
            'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5331982f-54f6-433f-8c83-e34921364cf9.png';
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
    var BENEFITS_IMG_SEGURIDAD = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1dc537dd-03b2-4186-9e39-74e7eb558b2d.png';
    var BENEFITS_IMG_ATENCION = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/08f381ab-2338-48ec-8dc4-411cdf1ad871.png';
    var BENEFITS_IMG_EXPERIENCIA = 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1dc537dd-03b2-4186-9e39-74e7eb558b2d.png';

    var benefitsConfig = {
        title: 'Elige Interbank y tendrás',
        imageAlt: 'Cliente Interbank',
        items: [{
                title: 'Rapidez',
                desc: 'Envía y recibe dinero en segundos desde donde estés y a toda hora',
                linkText: 'Prueba Plin Interbank',
                linkHref: 'https://interbank.pe/plin-whatsapp',
                icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/24ccd266-b9db-40d3-bd88-2696ce9a929b.png',
                image: BENEFITS_IMG_RAPIDEZ
            },
            {
                title: 'Seguridad',
                desc: 'Bloquea tu tarjeta, protege tus datos y oculta tus saldos',
                linkText: 'Descubre Modo Calle',
                linkHref: 'https://interbank.pe/',
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
                linkText: 'Descubre Interbank APP',
                linkHref: 'https://interbank.pe/',
                icon: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1f1f2383-4882-4cd3-a2b5-bb56600a26b3.png',
                image: BENEFITS_IMG_EXPERIENCIA
            }
        ]
    };
  
    var promotionsConfig = {
        subtitle: 'Te damos los mejores beneficios',
        title: 'Nuestros clientes ya disfrutan ser Interbank',
        cards: [{
                image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1dc537dd-03b2-4186-9e39-74e7eb558b2d.png',
                imageAlt: 'Maroon 5',
                badge: 'Conciertos',
                title: '15% dscto para Maroon 5',
                desc: 'Venta exclusiva con Tarjetas Interbank',
                btnText: 'Lo quiero',
                btnHref: 'https://interbank.pe/'
            },
            {
                image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/fe3bbf4b-a2de-43a1-9d37-87cf6a7b5523.png',
                imageAlt: 'Hiraoka',
                badge: 'Compras',
                title: 'Hiraoka',
                desc: 'Gana 1 de los 5 Smart TV y premios',
                btnText: 'Lo quiero',
                btnHref: 'https://interbank.pe/'
            },
            {
                image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9e8a2d8a-5c12-4d58-b5e2-f085cabc552c.png',
                imageAlt: 'Cineplanet',
                badge: 'Experiencias',
                title: 'Cineplanet',
                desc: 'Hasta 50% dscto. con Tarjetas Interbank Amex',
                btnText: 'Lo quiero',
                btnHref: 'https://interbank.pe/'
            },
            {
                image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/8f39a8c0-79a5-4031-bc2e-f3978fead1a3.png',
                imageAlt: 'Shopstar',
                badge: 'Online',
                title: 'Shopstar',
                desc: 'Todos los miercoles hasta 20% dscto. adicional',
                btnText: 'Lo quiero',
                btnHref: 'https://interbank.pe/'
            },
            {
                image: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/fe3bbf4b-a2de-43a1-9d37-87cf6a7b5523.png',
                imageAlt: 'Hiraoka',
                badge: 'Compras',
                title: 'Hiraoka',
                desc: 'Gana 1 de los 5 Smart TV y premios',
                btnText: 'Lo quiero',
                btnHref: 'https://interbank.pe/'
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
        mockup: 'https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/c5a4d2fe-b4a8-4983-ac62-3aca47e0b4c8.png',
        mockupAlt: 'Interbank App en iPhone',
        stores: [{
                name: 'App Store',
                href: 'https://apps.apple.com/pe/app/interbank/id447610376',
                image: 'https://interbank.pe/documents/20124/147356/pic-badge-apple%402x.png/38a363a8-7b94-c55b-8923-2e677b372a52?t=1636739163881'
            },
            {
                name: 'Google Play',
                href: 'https://play.google.com/store/apps/details?id=pe.com.interbank.mobilebanking',
                image: 'https://interbank.pe/documents/20124/147356/pic-badge-android%402x.png/2104af8c-2e7c-3501-669c-f68fa2fafdc9?t=1636741002286'
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
        ':root{--p-green:#008C37;--p-text:#000000;--p-gray:#878c8f;--adc-gradient-start:#C2FDB5;--adc-gradient-end:#38F066;--adc-blue:#0039A6;--adc-blue-hover:#3361B8;--adc-footer-gradient:linear-gradient(180deg,#05BE50 0%,#005F1E 100%);--transition:all 0.2s ease}',
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
        '.adc_section-promotions__dots{align-items:center;display:flex;gap:8px;justify-content:center;margin:0 0 24px;width:100%}',
        '.adc_section-promotions__dot{background:#D0D5DD;border:none;border-radius:999px;cursor:pointer;flex-shrink:0;height:8px;padding:0;transition:width .3s ease,background-color .3s ease;width:8px}',
        '.adc_section-promotions__dot.is-active{background:#181A1D;width:8px}',
        '.adc_section-promotions__actions{display:flex;flex-direction:column;gap:12px;width:100%}',
        '.adc_section-promotions__btn{align-items:center;border-radius:999px;cursor:pointer;display:inline-flex;font-size:16px;font-weight:500;gap:10px;justify-content:center;line-height:1;min-height:52px;padding:14px 24px;text-decoration:none;transition:var(--transition);width:100%}',
        '.adc_section-promotions__btn-icon{display:block;flex-shrink:0;height:15px;object-fit:contain;width:15px}',
        '.adc_section-promotions__btn--outline{background:#fff;border:2px solid var(--adc-blue);color:var(--adc-blue)}',
        '.adc_section-promotions__btn--outline:hover{background:rgba(0,49,146,.06)}',
        '.adc_section-promotions__btn--primary{background:var(--adc-blue);border:2px solid var(--adc-blue);color:#fff}',
        '.adc_section-promotions__btn--primary:hover{background-color:var(--adc-blue-hover);border-color:var(--adc-blue-hover)}',
        '.adc_section-promotions__btn--primary:active{background-color:var(--adc-blue);border-color:var(--adc-blue)}',
        '.adc_section-footer{background:var(--adc-footer-gradient);overflow:hidden;padding:40px 24px 0;width:100%}',
        '.adc_section-footer__container{margin:0 auto;max-width:100%;width:100%}',
        '.adc_section-footer__inner{align-items:center;display:flex;flex-direction:column;gap:24px;margin:0 auto;text-align:center;width:100%}',
        '.adc_section-footer__content{align-items:center;display:flex;flex-direction:column;gap:12px;width:100%}',
        '.adc_section-footer__logo{border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.22);display:block;height:40px;margin:0 auto;object-fit:contain;width:40px}',
        '.adc_section-footer__subtitle{color:#fff;font-size:16px;font-weight:500;line-height:1.3;margin:0}',
        '.adc_section-footer__title{color:#fff;font-size:24px;font-weight:500;line-height:1.15;margin:10px 0;max-width:300px}',
        '.adc_section-footer__cta{background:#fff;border:2px solid #fff;color:#181A1D;gap:10px;margin-top:4px;min-width:240px;width:100%}',
        '.adc_section-footer__cta:hover{background:#f5f5f5;border-color:#f5f5f5;color:#181A1D}',
        '.adc_section-footer__cta:active{background:#fff;border-color:#fff;color:#181A1D}',
        '.adc_section-footer__cta-icon{display:block;flex-shrink:0;height:20px;width:12px}',
        '.adc_section-footer__cta-icon path{fill:#181A1D}',
        '.adc_section-footer__stores{align-items:center;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px auto 0;max-width:320px;padding:0 4px;width:100%}',
        '.adc_section-footer__store{display:inline-flex;flex:0 0 calc(50% - 4px);justify-content:center;line-height:0;text-decoration:none;transition:var(--transition)}',
        '.adc_section-footer__store:hover{opacity:.88}',
        '.adc_section-footer__store-img{display:block;height:auto;max-width:152px;object-fit:contain;width:100%}',
        '.adc_section-footer__media{display:flex;flex-shrink:0;justify-content:center;line-height:0;margin:0 auto;overflow:visible;position:relative;width:100%}',
        '.adc_section-footer__mockup{-webkit-mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 12%,#000 22%,#000 100%);display:block;height:280px;margin:0 auto;mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 12%,#000 22%,#000 100%);width:auto}',
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
        '.adc_section-promotions__container{max-width:1120px;padding:0 48px}',
        '.adc_section-promotions__header{align-items:center;margin-bottom:32px;text-align:center}',
        '.adc_section-promotions__subtitle{font-size:14px}',
        '.adc_section-promotions__title{font-size:24px;margin-left:auto;margin-right:auto;max-width:800px}',
        '.adc_section-promotions__carousel{background:#fff;margin:0 -48px 20px;overflow-x:auto;padding:4px 48px 12px;-ms-overflow-style:none;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}',
        '.adc_section-promotions__carousel::-webkit-scrollbar{display:none}',
        '.adc_section-promotions__track{display:flex;gap:20px;width:max-content}',
        '.adc_promotion-card{border:1px solid #EEEFF1;box-shadow:0 5px 10px 0 #181A1D0A;flex:0 0 230px;max-width:230px;min-width:230px;width:230px;scroll-snap-align:start}',
        '.adc_promotion-card__body{padding:18px}',
        '.adc_promotion-card__title{font-size:15px}',
        '.adc_promotion-card__desc{font-size:13px}',
        '.adc_section-promotions__dots{margin:0 0 32px}',
        '.adc_section-promotions__dot.is-active{width:24px}',
        '.adc_section-promotions__actions{align-items:center;margin:0 auto;max-width:none;width:auto}',
        '.adc_section-promotions__btn{min-width:300px;padding:14px 48px;width:auto}',
        '.adc_section-footer{padding:0}',
        '.adc_section-footer__container{margin:0 auto;max-width:1300px;padding:0 40px}',
        '.adc_section-footer__inner{align-items:flex-end;display:flex;flex-direction:row;gap:0;justify-content:center;margin:0 auto;max-width:100%;min-height:435px;padding-left:48px;position:relative;width:100%}',
        '.adc_section-footer__content{flex:0 0 auto;margin-right:40px;max-width:380px;padding:32px 0;position:relative;width:auto;z-index:2}',
        '.adc_section-footer__subtitle{font-size:18px}',
        '.adc_section-footer__title{font-size:26px;max-width:340px}',
        '.adc_section-footer__cta{margin-top:8px;min-width:240px;width:auto}',
        '.adc_section-footer__stores{flex-wrap:nowrap;gap:10px;margin-top:12px;max-width:none;padding:0}',
        '.adc_section-footer__store{flex:0 0 auto}',
        '.adc_section-footer__store-img{height:40px;max-width:none;width:auto}',
        '.adc_section-footer__media{display:block;flex:0 0 auto;line-height:0;margin:0 0 0 -140px;position:relative;width:auto;z-index:1}',
        '.adc_section-footer__mockup{-webkit-mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 10%,#000 18%,#000 100%);display:block;height:435px;margin:0;mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 10%,#000 18%,#000 100%);width:auto}',
        '}',
        '@media (min-width:1200px){',
        '.adc_section-benefits{padding:56px 0}',
        '.adc_section-benefits__container{padding:0 10px}',
        '.adc_section-promotions__container{padding:0 64px}',
        '.adc_section-promotions__carousel{margin:0 -64px 20px;padding:4px 64px 12px}',
        '.adc_section-footer__container{padding:0 48px}',
        '.adc_section-footer__inner{padding-left:20%}',
        '.adc_section-footer__content{margin-right:48px;max-width:400px;padding:0 0 60px}',
        '.adc_section-footer__media{margin-left:-150px}',
        '.adc_section-footer__mockup{height:435px;width:auto}',
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
        '<img class="adc_section-footer__logo" src="' + footerConfig.logo + '" alt="' + footerConfig.logoAlt + '" width="40" height="40" loading="lazy">' +
        '<p class="adc_section-footer__subtitle">' + footerConfig.subtitle + '</p>' +
        '<h2 class="adc_section-footer__title">' + footerConfig.title + '</h2>' +
        '<a class="adc_section-promotions__btn adc_section-footer__cta" href="' + footerConfig.ctaHref + '" target="_blank" rel="noopener noreferrer">' + footerConfig.ctaText +
        '<svg class="adc_section-footer__cta-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C10.6569 4.00045e-07 12 1.34315 12 3V17C12 18.6569 10.6569 20 9 20H3C1.34315 20 8.04766e-08 18.6569 0 17V3C-7.24234e-08 1.34315 1.34315 1.11079e-07 3 0H9ZM3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H9C9.55228 18 10 17.5523 10 17V3C10 2.44772 9.55228 2 9 2H3Z" fill="#181A1D"/></svg></a>' +
        '<div class="adc_section-footer__stores">' + footerConfig.stores.map(adcFooterStore).join('') + '</div>' +
        '</div>' +
        '<div class="adc_section-footer__media"><img class="adc_section-footer__mockup" src="' + footerConfig.mockup + '" alt="' + footerConfig.mockupAlt + '" loading="lazy"></div>' +
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