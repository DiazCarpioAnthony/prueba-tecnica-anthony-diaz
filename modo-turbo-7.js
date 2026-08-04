(function (w, d) {

    var config = {
        heroSelector: ".o-hero__slide"
    };

    var options = {
        desktopImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/32d2f389-bd4a-4f88-8c50-c35633293ccb.png",
        tabletImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/4cc1145c-af6e-40b5-ba75-910ebbce19e1.png",
        mobileImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/d343345f-6256-466e-9f4a-98e685f30ce6.png",
        altImg: "Modo Turbo",
        ratesImage: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/01/0116fb0c-d549-42a9-af79-c2bf13999b27/img_turbo_tabla_tasa7_agosto.png",
        faqImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/1c150531-0de9-4bc4-8a5b-5992cadbbe43.png",
        benefits: [{
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9fbffdb9-5057-4931-bd38-e746b6607d6b.png",
            description: "Haz rendir más tus ahorros desde el primer día con <strong>7% TREA.</strong>"
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/d43901bc-4d28-4e46-bf7b-02388a89909f.png",
            description: "Obtén la tasa exclusiva por tus <strong>primeros S/5,000 ahorrados.</strong>"
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/77c4b6d4-8c58-47c7-a7b5-f8e3039ee65d.png",
            description: "Disfruta una tasa exclusiva por <strong>hasta 6 meses.</strong>"
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/00b45794-1026-4935-b791-86b5fffac653.png",
            description: "Abre tu Cuenta Simple de forma <strong>100% digital.</strong>"
        }],
        faqs: [{
            question: "¿Qué es la Campaña Turbo?",
            answer: "<p>La Campaña Turbo es un beneficio exclusivo que te permite obtener una tasa de interés promocional por los saldos que mantengas en tu Cuenta Simple en soles, siempre que cumplas con las condiciones de la promoción.</p>"
        }, {
            question: "¿Quiénes pueden acceder a la Campaña Turbo?",
            answer: "<p>La campaña está dirigida exclusivamente a personas que aún no son clientes de Interbank y que hayan sido previamente seleccionadas por Interbank para participar en esta promoción, de acuerdo con criterios comerciales definidos por el Banco.</p><p>La visualización de la publicidad o el acceso al enlace de la campaña no significa que la persona sea elegible para recibir el beneficio.</p>"
        }, {
            question: "¿Cómo sé si puedo acceder al beneficio?",
            answer: "<p>Si formas parte del grupo seleccionado para la campaña y cumples con las condiciones establecidas, podrás acceder a la tasa promocional al abrir una Cuenta Simple en soles a través de la página web de Interbank.</p>"
        }, {
            question: "¿Cómo funciona la tasa promocional?",
            answer: "<p>La tasa se aplica según el saldo que mantengas en tu cuenta. Cada parte de tu saldo recibe la tasa que le corresponde:</p><ul><li>Los primeros <strong>S/ 5,000</strong> reciben una tasa de <strong>7%</strong>.</li><li>El saldo desde más de <strong>S/ 5,000 hasta S/ 20,000</strong> recibe una tasa de <strong>5%</strong>.</li><li>El saldo desde más de <strong>S/ 20,000 hasta S/ 50,000</strong> recibe una tasa de <strong>3.5%</strong>.</li><li>El saldo que exceda los <strong>S/ 50,000</strong> aplica una tasa de <strong>0%</strong>.</li></ul>"
        }, {
            question: "Si tengo S/ 50,000 en mi cuenta, ¿qué tasa recibiré?",
            answer: "<p>La tasa se aplicará por partes de tu saldo. Por ejemplo:</p><ul><li>Los primeros S/ 5,000 recibirán 7%.</li><li>Los siguientes S/ 15,000 recibirán 5%.</li><li>Los siguientes S/ 30,000 recibirán 3.5%.</li></ul><p>Esto significa que no se aplica una sola tasa sobre todo tu saldo.</p>"
        }, {
            question: "¿Cuándo empieza a aplicarse la tasa promocional?",
            answer: "<p>La tasa promocional se activará dentro de los <strong>tres (3) días hábiles siguientes</strong> a la apertura de tu Cuenta Simple en soles realizada a través de la página web de Interbank.</p>"
        }, {
            question: "¿Cuándo recibiré los intereses generados?",
            answer: "<p>Los intereses serán abonados mensualmente, el <strong>primer día hábil del mes siguiente.</strong></p>"
        }, {
            question: "¿Qué pasa si cancelo mi cuenta antes de finalizar el mes?",
            answer: "<p>Si cancelas tu cuenta antes de que termine el mes, perderás los intereses acumulados de ese periodo y estos no serán abonados.</p>"
        }, {
            question: "¿Cuánto tiempo dura la tasa promocional?",
            answer: "<p>La tasa promocional tiene una vigencia de <strong>3 meses</strong>, contados desde la fecha de activación de la tasa.</p><p>Al finalizar este periodo, aplicará la tasa vigente según el tarifario de la Cuenta Simple, que actualmente es de <strong>0%</strong>.</p>"
        }, {
            question: "¿Cómo puedo extender la vigencia de mi tasa promocional?",
            answer: "<p>Si durante los primeros 3 meses de vigencia de la tasa promocional adquieres una Tarjeta de Crédito Interbank, una Cuenta Sueldo o una Cuenta Millonaria, podrás extender la vigencia de tu tasa promocional por 3 meses adicionales.</p><p>La extensión del beneficio se realiza por una única vez, por lo que la tasa promocional podrá tener una vigencia máxima de 6 meses, siempre que cumplas con las condiciones de la promoción.</p>"
        }, {
            question: "¿Qué pasa si retiro mi saldo por un día?",
            answer: "<p>Si retiras total o parcialmente el saldo de tu cuenta por un día, <strong>solo dejarás de generar intereses sobre el saldo retirado durante ese día.</strong></p><p>Esto se debe a que los intereses se calculan <strong>diariamente,</strong> según el saldo que mantengas cada día en tu cuenta. Cuando vuelvas a depositar el dinero, continuarás generando intereses de acuerdo con el saldo diario que mantengas.</p>"
        }]
    };

    var styles = [
        ".o-hero__slide{margin:0 auto;max-width:100%}",
        ".o-hero__slide img{height:auto;width:100%}",
        "@media (min-width:1024px){.o-hero__slide img{max-height:500px}}",
        "@media (min-width:48em){#forminLayoutForm{top:-102px;margin-top:36px}}",
        "@media (min-width:64em){#forminLayoutForm{top:-155px;margin-top:50px}}",
        "@media (min-width:48em){.o-hero.t-small.has-qr{padding-bottom:0!important}}",
        ".o-commitment>p.obs.obs-list{margin-left:3px}",
        ".xt-mt-rates{--p-text:#000;--adc-blue:#0039A6;--adc-blue-hover:#3361B8;--transition:all .2s ease;background:#fff;font-family:Poppins,sans-serif;padding:32px 0;position:relative;width:100%}",
        ".xt-mt-rates *,.xt-mt-rates *:before,.xt-mt-rates *:after{box-sizing:border-box;font-family:Poppins,sans-serif}",
        ".xt-mt-rates .adc_section-promotions__container{background:#fff;margin:0 auto;max-width:100%;padding:0 24px;position:relative;width:100%}",
        ".xt-mt-rates .adc_section-promotions__header{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}",
        ".xt-mt-rates .adc_section-promotions__title{color:#0F191E;font-family:Geometria,sans-serif;font-size:40px;font-weight:300;letter-spacing:-3px;line-height:44px;margin:0;text-align:center}",
        ".xt-mt-rates .xt-mt-rates__img{aspect-ratio:640/770;border-radius:16px;display:block;height:auto;margin:0 auto 24px;max-width:640px;object-fit:contain;width:100%}",
        ".xt-mt-rates .adc_section-promotions__actions{display:none}",
        ".xt-mt-rates .adc_section-promotions__btn{align-items:center;border-radius:999px;cursor:pointer;display:inline-flex;font-size:16px;font-weight:500;gap:10px;justify-content:center;line-height:1;min-height:52px;padding:14px 24px;text-decoration:none;transition:var(--transition);width:100%}",
        ".xt-mt-rates .adc_section-promotions__btn--primary{background:var(--adc-blue);border:2px solid var(--adc-blue);color:#fff}",
        ".xt-mt-rates .adc_section-promotions__btn--primary:hover{background-color:var(--adc-blue-hover);border-color:var(--adc-blue-hover);color:#fff}",
        ".xt-mt-rates .adc_section-promotions__btn--primary:active{background-color:var(--adc-blue);border-color:var(--adc-blue)}",
        "@media (min-width:1024px){",
        ".xt-mt-rates{padding:48px 0}",
        ".xt-mt-rates .adc_section-promotions__container{padding:0}",
        ".xt-mt-rates .adc_section-promotions__header{align-items:center;margin-bottom:32px;text-align:center}",
        ".xt-mt-rates .adc_section-promotions__title{margin-left:auto;margin-right:auto;max-width:632px}",
        ".xt-mt-rates .xt-mt-rates__img{height:770px;margin-bottom:32px;max-width:640px;width:640px}",
        ".xt-mt-rates .adc_section-promotions__actions{align-items:center;display:flex;flex-direction:column;gap:12px;margin:0 auto;max-width:none;width:auto}",
        ".xt-mt-rates .adc_section-promotions__btn{min-width:300px;padding:14px 48px;width:auto}",
        "}",
        ".xt-mt-faq{--p-text:#181A1D;--p-gray:#494E56;--p-green:#00A938;--p-border:#E5E7EA;background:#fff;font-family:Poppins,sans-serif;padding:32px 0;width:100%}",
        ".xt-mt-faq *,.xt-mt-faq *:before,.xt-mt-faq *:after{box-sizing:border-box;font-family:Poppins,sans-serif}",
        ".xt-mt-faq__container{display:flex;flex-direction:column;margin:0 auto;max-width:1120px;padding:0 24px;width:100%}",
        ".xt-mt-faq__title{color:#0F191E;font-family:Geometria,sans-serif;font-size:24px;font-weight:500;letter-spacing:-0.4px;line-height:24px;margin:0;text-align:center}",
        ".xt-mt-faq__body{display:flex;flex-direction:column;gap:28px;width:100%}",
        ".xt-mt-faq__media{line-height:0;width:100%}",
        ".xt-mt-faq__img{display: none; border-radius:16px;height:auto;object-fit:cover;width:100%}",
        ".xt-mt-faq__content{display:flex;flex-direction:column;min-width:0;width:100%}",
        ".xt-mt-faq__list{display:flex;flex-direction:column;width:100%}",
        ".xt-mt-faq__item{border-bottom:1px solid var(--p-border);width:100%}",
        ".xt-mt-faq__header{align-items:center;background:transparent;border:0;cursor:pointer;display:flex;gap:16px;justify-content:space-between;padding:18px 0;text-align:left;width:100%}",
        ".xt-mt-faq__question{color:#0F191E;flex:1;font-family:Geometria,sans-serif;font-size:14px;font-weight:500;letter-spacing:-0.4px;line-height:14px;margin:0}",
        ".xt-mt-faq__icon{border:1.5px solid var(--p-green);border-radius:50%;display:inline-block;flex-shrink:0;height:28px;position:relative;transition:transform .3s ease;width:28px}",
        ".xt-mt-faq__icon:before,.xt-mt-faq__icon:after{background:var(--p-green);content:\"\";left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:transform .3s ease}",
        ".xt-mt-faq__icon:before{height:2px;width:10px}",
        ".xt-mt-faq__icon:after{height:10px;width:2px}",
        ".xt-mt-faq__item.is-open .xt-mt-faq__icon{transform:rotate(180deg)}",
        ".xt-mt-faq__item.is-open .xt-mt-faq__icon:after{transform:translate(-50%,-50%) rotate(90deg)}",
        ".xt-mt-faq__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s ease}",
        ".xt-mt-faq__item.is-open .xt-mt-faq__panel{grid-template-rows:1fr}",
        ".xt-mt-faq__panel-inner{min-height:0;overflow:hidden}",
        ".xt-mt-faq__answer{color:var(--p-gray);font-size:14px;font-weight:400;line-height:1.5;margin:0;padding:0 44px 18px 0}",
        ".xt-mt-faq__answer p{margin:0 0 10px}",
        ".xt-mt-faq__answer p:last-child{margin-bottom:0}",
        ".xt-mt-faq__answer ul{margin:0 0 10px;padding-left:18px}",
        ".xt-mt-faq__answer ul:last-child{margin-bottom:0}",
        ".xt-mt-faq__answer li{margin:0 0 4px}",
        ".xt-mt-faq__answer li:last-child{margin-bottom:0}",
        "@media (min-width:1024px){",
        ".xt-mt-faq{padding:48px 0 64px}",
        ".xt-mt-faq__container{align-items:start;display:grid;gap:28px 48px;grid-template-columns:minmax(0,460px) minmax(0,1fr);grid-template-rows:auto auto;padding:0 40px}",
        ".xt-mt-faq__title{font-size:40px;font-weight:300;grid-column:2;grid-row:1;letter-spacing:-3px;line-height:44px;text-align:left}",
        ".xt-mt-faq__body{display:contents}",
        ".xt-mt-faq__media{grid-column:1;grid-row:2;max-width:460px;width:100%}",
        ".xt-mt-faq__img{display:block;height:auto;max-height:640px;object-fit:cover}",
        ".xt-mt-faq__content{grid-column:2;grid-row:2;width:auto}",
        ".xt-mt-faq__question{font-size:20px;letter-spacing:-0.5px;line-height:24px}",
        "}"
    ].join("");

    var memoryFallback = {};

    var Storage = {
        set: function set(key, value) {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                memoryFallback[key] = value;
            }
        },
        get: function get(key) {
            try {
                var item = sessionStorage.getItem(key);
                if (item === null) return null;
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return item;
                }
            } catch (e) {
                return memoryFallback[key] || null;
            }
        },
        remove: function remove(key) {
            try {
                sessionStorage.removeItem(key);
            } catch (e) {
                delete memoryFallback[key];
            }
        }
    };

    function injectStyles(css) {
        var styleTag = document.createElement("style");
        styleTag.type = "text/css";
        styleTag.appendChild(document.createTextNode(css));
        document.head.appendChild(styleTag);
    }

    function loadFonts() {
        if (document.querySelector('link[data-xt-mt-poppins]')) return;
        var poppinsLink = document.createElement("link");
        poppinsLink.rel = "stylesheet";
        poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
        poppinsLink.setAttribute("data-xt-mt-poppins", "1");
        document.head.appendChild(poppinsLink);
    }

    var removeHideMobile = function removeHideMobile() {
        var wrapperHero = document.querySelector(".o-hero__wrapper.o-hero--adobe-manager");
        if (!wrapperHero) return;
        wrapperHero.classList.remove("u-hide-xs");
        var slider = wrapperHero.previousElementSibling;
        if (slider) slider.remove();
    };

    var setupHero = function setupHero(heroSlide) {
        var heroSlideParent = heroSlide.parentElement;
        if (heroSlideParent) heroSlideParent.classList.remove("has-qr");

        heroSlide.innerHTML = "";
        var sourceDesktop = document.createElement("source");
        sourceDesktop.setAttribute("media", "(min-width: 1024px)");
        sourceDesktop.setAttribute("type", "image/png");
        sourceDesktop.setAttribute("srcset", options.desktopImage);

        var sourceTablet = document.createElement("source");
        sourceTablet.setAttribute("media", "(min-width: 768px)");
        sourceTablet.setAttribute("type", "image/png");
        sourceTablet.setAttribute("srcset", options.tabletImage);

        var img = document.createElement("img");
        img.src = options.mobileImage;
        img.alt = options.altImg;
        img.decoding = "async";
        img.loading = "eager";
        img.setAttribute("fetchpriority", "high");

        var picture = document.createElement("picture");
        picture.appendChild(sourceDesktop);
        picture.appendChild(sourceTablet);
        picture.appendChild(img);
        heroSlide.appendChild(picture);
    };

    var setBenefits = function setBenefits() {
        var title = document.querySelector(".m-card-benefits__body_title");
        if (title) {
            title.textContent = "Empieza a disfrutar estos beneficios:";
        }

        var items = document.querySelectorAll(".m-card-benefits__items__item");
        if (items.length === 0) return;

        for (var i = 0; i < items.length; i++) {
            if (!options.benefits[i]) continue;
            var img = items[i].querySelector(".m-card-benefits__items__item_img img");
            var description = items[i].querySelector(".m-card-benefits__items__item_description");
            if (img && options.benefits[i].img) {
                img.src = options.benefits[i].img;
            }
            if (description) {
                description.innerHTML = options.benefits[i].description;
            }
        }
    };

    var setupForm = function setupForm() {
        var formLayout = document.querySelector(".o-formin-layout");
        var qrElement = formLayout && formLayout.querySelector(".o-card-qr-benefits");
        if (qrElement) qrElement.style.display = "none";

        var forminLayoutForm = document.querySelector(".o-formin-layout__form");
        if (!forminLayoutForm) return;

        forminLayoutForm.id = "forminLayoutForm";
        var gTitle = forminLayoutForm.querySelector(".g-title");
        if (gTitle) gTitle.textContent = "Solicita tu cuenta 100% online";
    };

    var changeCtaButton = function changeCtaButton() {
        var buttonText = document.querySelector("#hmac-form-id .a-button__text");
        if (!buttonText) return false;
        buttonText.textContent = "Hazte Cliente Ya";
        return true;
    };

    var waitForCtaButton = function waitForCtaButton() {
        if (changeCtaButton()) return;

        var obs = new MutationObserver(function () {
            if (changeCtaButton()) obs.disconnect();
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });

        var tries = 0;
        var timer = setInterval(function () {
            tries += 1;
            if (changeCtaButton() || tries > 40) {
                clearInterval(timer);
                obs.disconnect();
            }
        }, 250);
    };

    var insertRatesSection = function insertRatesSection() {
        if (document.querySelector(".xt-mt-rates")) return;

        var formLayout = document.querySelector(".o-formin-layout");
        if (!formLayout || !formLayout.parentNode) return;

        var section = document.createElement("section");
        section.className = "adc_section adc_section-promotions xt-mt-rates";
        section.innerHTML =
            '<div class="adc_section-promotions__container">' +
            '<header class="adc_section-promotions__header">' +
            '<h2 class="adc_section-promotions__title">Conoce las tasas exclusivas que tenemos para ti</h2>' +
            "</header>" +
            '<img class="xt-mt-rates__img" src="' + options.ratesImage + '" alt="Tasas exclusivas Cuenta Simple" loading="lazy">' +
            '<div class="adc_section-promotions__actions">' +
            '<a class="adc_section-promotions__btn adc_section-promotions__btn--primary" href="#forminLayoutForm">Quiero abrir mi cuenta</a>' +
            "</div>" +
            "</div>";

        formLayout.parentNode.insertBefore(section, formLayout.nextSibling);

        var ctaBtn = section.querySelector(".adc_section-promotions__btn--primary");
        if (ctaBtn) {
            ctaBtn.addEventListener("click", function (e) {
                e.preventDefault();
                var target = document.getElementById("forminLayoutForm");
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
    };

    var buildFaqItem = function buildFaqItem(faq, index) {
        return (
            '<div class="xt-mt-faq__item" data-xt-mt-faq-item>' +
            '<button class="xt-mt-faq__header" type="button" aria-expanded="false" aria-controls="xt-mt-faq-panel-' + index + '" id="xt-mt-faq-btn-' + index + '">' +
            '<span class="xt-mt-faq__question">' + faq.question + "</span>" +
            '<span class="xt-mt-faq__icon" aria-hidden="true"></span>' +
            "</button>" +
            '<div class="xt-mt-faq__panel" id="xt-mt-faq-panel-' + index + '" role="region" aria-labelledby="xt-mt-faq-btn-' + index + '">' +
            '<div class="xt-mt-faq__panel-inner">' +
            '<div class="xt-mt-faq__answer">' + faq.answer + "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
    };

    var bindFaqAccordion = function bindFaqAccordion(section) {
        var items = section.querySelectorAll("[data-xt-mt-faq-item]");
        for (var i = 0; i < items.length; i++) {
            (function (item) {
                var header = item.querySelector(".xt-mt-faq__header");
                if (!header) return;
                header.addEventListener("click", function () {
                    var isOpen = item.classList.contains("is-open");
                    if (isOpen) {
                        item.classList.remove("is-open");
                        header.setAttribute("aria-expanded", "false");
                    } else {
                        item.classList.add("is-open");
                        header.setAttribute("aria-expanded", "true");
                    }
                });
            })(items[i]);
        }
    };

    var insertFaqSection = function insertFaqSection() {
        if (document.querySelector(".xt-mt-faq")) return;

        var ratesSection = document.querySelector(".xt-mt-rates");
        var formLayout = document.querySelector(".o-formin-layout");
        var anchor = ratesSection || formLayout;
        if (!anchor || !anchor.parentNode) return;

        var faqsHtml = "";
        for (var i = 0; i < options.faqs.length; i++) {
            faqsHtml += buildFaqItem(options.faqs[i], i);
        }

        var section = document.createElement("section");
        section.className = "xt-mt-faq";
        section.innerHTML =
            '<div class="xt-mt-faq__container">' +
            '<h2 class="xt-mt-faq__title">Preguntas Frecuentes</h2>' +
            '<div class="xt-mt-faq__body">' +
            '<div class="xt-mt-faq__media">' +
            '<img class="xt-mt-faq__img" src="' + options.faqImage + '" alt="Preguntas frecuentes Modo Turbo" loading="lazy">' +
            "</div>" +
            '<div class="xt-mt-faq__content">' +
            '<div class="xt-mt-faq__list">' + faqsHtml + "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        if (ratesSection) {
            ratesSection.parentNode.insertBefore(section, ratesSection.nextSibling);
        } else {
            formLayout.parentNode.insertBefore(section, formLayout.nextSibling);
        }

        bindFaqAccordion(section);
    };

    var changeLegal = function changeLegal() {
        var content = document.querySelector(".o-commitment");
        if (!content) return;

        var treaText = "TREA referencial: 0.0% en soles, considerando una TEA de 0.0% con saldo promedio mensual mayor o igual a S/ 1,000 durante un plazo de 12 meses, asumiendo que no existen transacciones adicionales a la apertura de la cuenta. Intereses: S/ 0.00. Saldo mínimo de equilibrio: S/ 0.00. Afecto a ITF: 0.005%. El monto máximo de cobertura del Fondo de Seguro de Depósitos (FSD), correspondiente al periodo junio 2026 - agosto 2026 es de: S/122,000.00 (varía trimestralmente). Más información sobre el FSD tasas de interés, comisiones y gastos y demás condiciones en el tarifario, en Tiendas Interbank o en www.interbank.pe, conforme a la normativa vigente.";

        var legalParagraphs = [
            "<strong>Términos y Condiciones de elegibilidad</strong>",
            "Campaña Turbo: Vigente del 4 de agosto al 30 de septiembre de 2026 o hasta alcanzar los primeros 3,000 beneficiarios, lo que ocurra primero.",
            "Esta campaña está dirigida exclusivamente a personas que aún no son clientes de Interbank (Hasta el 30 julio 2026) y que hayan sido previamente seleccionadas por Interbank para participar en esta promoción, conforme a criterios comerciales definidos por el Banco.",
            "La visualización de la publicidad o el acceso al enlace de la campaña no otorgan, por sí solos, el derecho a participar ni a acceder al beneficio.",
            "La promoción aplica únicamente para la apertura de una Cuenta Simple en soles realizada a través de la página web de Interbank. No aplica para aperturas realizadas por otros canales ni para cuentas en dólares u otros productos de ahorro.",
            "El beneficio se otorgará únicamente a quienes cumplan con todos los requisitos, condiciones y criterios de elegibilidad establecidos para la presente promoción.",
            "¿Cómo funciona la tasa promocional?",
            "La <strong>TREA promocional</strong> se calcula según el <strong>saldo diario</strong> que mantengas en tu cuenta durante la vigencia de la campaña. Cada parte de tu saldo recibe la tasa que le corresponde:",
            "- Los <strong>primeros</strong> S/ 5,000 reciben una TREA de 7%.",
            "- El saldo <strong>desde más</strong> de S/ 5,000 hasta S/ 20,000 recibe una TREA de 5%.",
            "- El saldo <strong>desde más</strong> de S/ 20,000 hasta S/ 50,000 recibe una TREA de 3.5%.",
            "- El saldo que <strong>exceda</strong> los S/ 50,000 aplica una TREA de 0%.",
            "Ejemplo: Si mantienes un saldo diario de S/ 50,000, los primeros S/ 5,000 recibirán una TREA de 7%; los siguientes S/ 15,000, una TREA de 5%; y los siguientes S/ 30,000, una TREA de 3.5%.",
            "<strong>Ejemplo:</strong> Si mantienes un saldo de S/ 50,000 durante la campaña, los primeros S/ 5,000 recibirán una TREA de 7%; los siguientes S/ 15,000 recibirán una TREA de 5%; y los siguientes S/ 30,000 recibirán una TREA de 3.5%.",
            "La tasa promocional se activará hasta el tercer día hábil siguiente a la apertura de la Cuenta Simple en soles realizada a través de la página web de Interbank.",
            "Los intereses se abonarán mensualmente, el primer día hábil del mes siguiente.",
            "La tasa promocional tendrá una vigencia de 3 meses, contados desde la fecha de su apertura. Finalizado este periodo, aplicará la tasa vigente según el tarifario de la Cuenta Simple, que actualmente es de 0%.",
            "Si durante la vigencia de la tasa promocional el cliente adquiere una Tarjeta de Crédito Interbank, una Cuenta Sueldo o una Cuenta Millonaria, la vigencia de la tasa promocional se extenderá por 3 meses adicionales.",
            "Si cancelas la cuenta antes de que finalice el mes, perderás los intereses acumulados de ese mes, por lo que no serán abonados.",
            "La promoción aplica para una (1) Cuenta Simple por cliente. En caso el cliente abra más de una Cuenta Simple, el beneficio de la tasa promocional aplicará únicamente a la primera cuenta que cumpla con las condiciones de la promoción."
        ];

        var textContainer = document.querySelector(".o-commitment__text.third");
        if (textContainer) {
            var innerPs = textContainer.querySelectorAll("p.obs, p.n");
            if (innerPs.length > 0) {
                innerPs[0].textContent = treaText;
                for (var i = 1; i < innerPs.length; i++) {
                    innerPs[i].parentNode.removeChild(innerPs[i]);
                }
            }
        }

        var toRemove = [];
        for (var c = 0; c < content.children.length; c++) {
            var child = content.children[c];
            if (child.tagName === "P" && (child.classList.contains("obs") || child.classList.contains("n"))) {
                toRemove.push(child);
            }
        }
        for (var r = 0; r < toRemove.length; r++) {
            content.removeChild(toRemove[r]);
        }

        var contentEl = content.querySelector(".o-commitment__content");
        var anchor = contentEl ? contentEl.nextSibling : null;
        for (var j = 0; j < legalParagraphs.length; j++) {
            var p = document.createElement("p");
            p.className = "obs";
            p.innerHTML = legalParagraphs[j];
            if (legalParagraphs[j].indexOf("- ") === 0) {
                p.className = "obs obs-list";
            }
            if (anchor) {
                content.insertBefore(p, anchor);
            } else {
                content.appendChild(p);
            }
        }
    };

    var start = function start(heroSlide) {
        if (!heroSlide) return;

        injectStyles(styles);
        loadFonts();
        removeHideMobile();
        setupHero(heroSlide);
        setBenefits();
        setupForm();
        waitForCtaButton();
        insertRatesSection();
        insertFaqSection();
        changeLegal();
        Storage.set("xt-modo-turbo", { viewed: true });
    };

    var heroSlide = document.querySelector(config.heroSelector);
    start(heroSlide);

}(window, document));
