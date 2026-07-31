(function (w, d) {

    var config = {
        heroSelector: ".o-hero__slide"
    };

    var options = {
        desktopImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/13164377-2027-4326-bfab-d0f97dfc80f0.png",
        mobileImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/51ee3b54-cf4c-470b-9e22-871ac827d6ca.png",
        altImg: "Modo Turbo",
        ratesImage: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/5095aea6-bf84-4930-9f91-d36ebd95583d.png",
        faqImage: "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/fe/fef2e115-7db2-4be3-8c47-941e5c1fe786/img_landing_mundial-visa-420x640_202601%202.png",
        benefits: [{
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/9fbffdb9-5057-4931-bd38-e746b6607d6b.png",
            description: "<strong>Haz rendir más tus ahorros</strong> desde el primer día con <strong>7% TREA.</strong>"
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/77c4b6d4-8c58-47c7-a7b5-f8e3039ee65d.png",
            description: "Disfruta una tasa preferencial por <strong>hasta 6 meses.</strong>"
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/d43901bc-4d28-4e46-bf7b-02388a89909f.png",
            description: "<strong>Obtén la tasa exclusiva</strong> por tus primeros S/5,000 ahorrados."
        }, {
            img: "https://content-us-1.static.content-cms.com/s3/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/00b45794-1026-4935-b791-86b5fffac653.png",
            description: "Abre tu <strong>Cuenta Simple 100% digital.</strong>"
        }],
        faqs: [{
            question: "¿Qué es la Campaña Turbo?",
            answer: "Es una promoción exclusiva de Interbank que te permite abrir una Cuenta Simple en soles y acceder a una tasa preferencial por un tiempo limitado."
        }, {
            question: "¿Quiénes pueden acceder a la Campaña Turbo?",
            answer: "Pueden participar personas que aún no son clientes de Interbank y que hayan sido previamente seleccionadas por el Banco para esta promoción."
        }, {
            question: "¿Cómo sé si puedo acceder al beneficio?",
            answer: "Si recibiste una invitación o llegaste a través del enlace de la campaña y cumples los criterios de elegibilidad, podrás activar el beneficio al abrir tu Cuenta Simple."
        }, {
            question: "¿Cómo funciona la tasa promocional?",
            answer: "La TREA promocional se calcula según el saldo diario de tu cuenta. Cada tramo de tu saldo recibe la tasa que le corresponde según la escala de la campaña."
        }, {
            question: "Si tengo S/50,000 en mi cuenta, ¿qué tasa recibiré?",
            answer: "Los primeros S/5,000 reciben 7% TREA; de S/5,000 a S/20,000 reciben 5%; de S/20,000 a S/50,000 reciben 3.5%; y el excedente aplica 0%."
        }, {
            question: "¿Cuándo empieza a aplicarse la tasa promocional?",
            answer: "Se activa hasta el tercer día hábil siguiente a la apertura de tu Cuenta Simple realizada por la web de Interbank."
        }, {
            question: "¿Cuándo recibiré los intereses generados?",
            answer: "Los intereses se abonan mensualmente, el primer día hábil del mes siguiente."
        }, {
            question: "¿Qué pasa si cancelo mi cuenta antes de finalizar el mes?",
            answer: "Si cancelas la cuenta antes de que termine el mes, perderás los intereses acumulados de ese periodo y no serán abonados."
        }, {
            question: "¿Cuánto tiempo dura la tasa promocional?",
            answer: "Tiene una vigencia de 3 meses desde la apertura. Luego aplica la tasa vigente del tarifario de la Cuenta Simple."
        }, {
            question: "¿Cómo puedo extender la vigencia de mi tasa promocional?",
            answer: "Si durante la vigencia adquieres una Tarjeta de Crédito Interbank, una Cuenta Sueldo o una Cuenta Millonaria, la tasa promocional se extiende por 3 meses adicionales."
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
        ".xt-mt-rates .adc_section-promotions__title{color:var(--p-text);font-size:24px;font-weight:500;line-height:1.25;margin:0}",
        ".xt-mt-rates .xt-mt-rates__img{aspect-ratio:640/770;border-radius:16px;display:block;height:auto;margin:0 auto 24px;max-width:640px;object-fit:contain;width:100%}",
        ".xt-mt-rates .adc_section-promotions__actions{display:flex;flex-direction:column;gap:12px;width:100%}",
        ".xt-mt-rates .adc_section-promotions__btn{align-items:center;border-radius:999px;cursor:pointer;display:inline-flex;font-size:16px;font-weight:500;gap:10px;justify-content:center;line-height:1;min-height:52px;padding:14px 24px;text-decoration:none;transition:var(--transition);width:100%}",
        ".xt-mt-rates .adc_section-promotions__btn--primary{background:var(--adc-blue);border:2px solid var(--adc-blue);color:#fff}",
        ".xt-mt-rates .adc_section-promotions__btn--primary:hover{background-color:var(--adc-blue-hover);border-color:var(--adc-blue-hover);color:#fff}",
        ".xt-mt-rates .adc_section-promotions__btn--primary:active{background-color:var(--adc-blue);border-color:var(--adc-blue)}",
        "@media (min-width:1024px){",
        ".xt-mt-rates{padding:48px 0}",
        ".xt-mt-rates .adc_section-promotions__container{padding:0}",
        ".xt-mt-rates .adc_section-promotions__header{align-items:center;margin-bottom:32px;text-align:center}",
        ".xt-mt-rates .adc_section-promotions__title{font-size:24px;margin-left:auto;margin-right:auto;max-width:800px}",
        ".xt-mt-rates .xt-mt-rates__img{height:770px;margin-bottom:32px;max-width:640px;width:640px}",
        ".xt-mt-rates .adc_section-promotions__actions{align-items:center;margin:0 auto;max-width:none;width:auto}",
        ".xt-mt-rates .adc_section-promotions__btn{min-width:300px;padding:14px 48px;width:auto}",
        "}",
        ".xt-mt-faq{--p-text:#181A1D;--p-gray:#494E56;--p-green:#00A938;--p-border:#E5E7EA;background:#fff;font-family:Poppins,sans-serif;padding:32px 0;width:100%}",
        ".xt-mt-faq *,.xt-mt-faq *:before,.xt-mt-faq *:after{box-sizing:border-box;font-family:Poppins,sans-serif}",
        ".xt-mt-faq__container{display:flex;flex-direction:column;gap:28px;margin:0 auto;max-width:1120px;padding:0 24px;width:100%}",
        ".xt-mt-faq__media{line-height:0;width:100%}",
        ".xt-mt-faq__img{display: none; border-radius:16px;height:auto;object-fit:cover;width:100%}",
        ".xt-mt-faq__content{display:flex;flex-direction:column;min-width:0;width:100%}",
        ".xt-mt-faq__title{color:var(--p-text);font-size:24px;font-weight:500;line-height:1.25;margin:0 0 8px}",
        ".xt-mt-faq__list{display:flex;flex-direction:column;width:100%}",
        ".xt-mt-faq__item{border-bottom:1px solid var(--p-border);width:100%}",
        ".xt-mt-faq__header{align-items:center;background:transparent;border:0;cursor:pointer;display:flex;gap:16px;justify-content:space-between;padding:18px 0;text-align:left;width:100%}",
        ".xt-mt-faq__question{color:var(--p-text);flex:1;font-size:16px;font-weight:500;line-height:1.35;margin:0}",
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
        "@media (min-width:1024px){",
        ".xt-mt-faq{padding:48px 0 64px}",
        ".xt-mt-faq__container{align-items:stretch;flex-direction:row;gap:48px;padding:0 40px}",
        ".xt-mt-faq__media{flex:0 0 42%;max-width:460px}",
        ".xt-mt-faq__img{display: block; height:100%;max-height:640px;object-fit:cover}",
        ".xt-mt-faq__content{flex:1}",
        ".xt-mt-faq__title{font-size:28px;margin-bottom:12px}",
        ".xt-mt-faq__question{font-size:16px}",
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
        sourceDesktop.setAttribute("type", "image/jpeg");
        sourceDesktop.setAttribute("srcset", options.desktopImage);

        var img = document.createElement("img");
        img.src = options.mobileImage;
        img.alt = options.altImg;
        img.decoding = "async";
        img.loading = "eager";
        img.setAttribute("fetchpriority", "high");

        var picture = document.createElement("picture");
        picture.appendChild(sourceDesktop);
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
        buttonText.textContent = "Activar Modo Turbo";
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
            '<p class="xt-mt-faq__answer">' + faq.answer + "</p>" +
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
            '<div class="xt-mt-faq__media">' +
            '<img class="xt-mt-faq__img" src="' + options.faqImage + '" alt="Preguntas frecuentes Modo Turbo" loading="lazy">' +
            "</div>" +
            '<div class="xt-mt-faq__content">' +
            '<h2 class="xt-mt-faq__title">Preguntas Frecuentes</h2>' +
            '<div class="xt-mt-faq__list">' + faqsHtml + "</div>" +
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

        var treaText = "TREA referencial: 0.0% en soles, considerando una TEA de 0.0% con saldo promedio mensual mayor o igual a S/ 1,000 durante un plazo de 12 meses, asumiendo que no existen transacciones adicionales a la apertura de la cuenta. Intereses: S/ 0.00. Saldo mínimo de equilibrio: S/ 0.00. Afecto a ITF: 0.005%. El monto máximo de cobertura del Fondo de Seguro de Depósitos (FSD), correspondiente al periodo Marzo 2026 - Mayo 2026 es de S/117,200 (varía trimestralmente). Más información sobre el FSD tasas de interés, comisiones y gastos y demás condiciones en el tarifario, en Tiendas Interbank o en www.interbank.pe, conforme a la normativa vigente.";

        var legalParagraphs = [
            "Términos y Condiciones de elegibilidad",
            "Campaña Turbo: Vigente del 4 de agosto al 30 de septiembre de 2026 o hasta alcanzar los primeros 3,000 beneficiarios, lo que ocurra primero.",
            "Esta campaña está dirigida exclusivamente a personas que aún no son clientes de Interbank (Hasta el 30 julio 2026) y que hayan sido previamente seleccionadas por Interbank para participar en esta promoción, conforme a criterios comerciales definidos por el Banco.",
            "La visualización de la publicidad o el acceso al enlace de la campaña no otorgan, por sí solos, el derecho a participar ni a acceder al beneficio.",
            "La promoción aplica únicamente para la apertura de una Cuenta Simple en soles realizada a través de la página web de Interbank. No aplica para aperturas realizadas por otros canales ni para cuentas en dólares u otros productos de ahorro.",
            "El beneficio se otorgará únicamente a quienes cumplan con todos los requisitos, condiciones y criterios de elegibilidad establecidos para la presente promoción.",
            "¿Cómo funciona la tasa promocional?",
            "La TREA promocional se calcula según el saldo diario que mantengas en tu cuenta durante la vigencia de la campaña. Cada parte de tu saldo recibe la tasa que le corresponde:",
            "- Los primeros S/ 5,000 reciben una TREA de 7%.",
            "- El saldo desde más de S/ 5,000 hasta S/ 20,000 recibe una TREA de 5%.",
            "- El saldo desde más de S/ 20,000 hasta S/ 50,000 recibe una TREA de 3.5%.",
            "- El saldo que exceda los S/ 50,000 aplica una TREA de 0%.",
            "Ejemplo: Si mantienes un saldo diario de S/ 50,000, los primeros S/ 5,000 recibirán una TREA de 7%; los siguientes S/ 15,000, una TREA de 5%; y los siguientes S/ 30,000, una TREA de 3.5%.",
            "Ejemplo: Si mantienes un saldo de S/ 50,000 durante la campaña, los primeros S/ 5,000 recibirán una TREA de 7%; los siguientes S/ 15,000 recibirán una TREA de 5%; y los siguientes S/ 30,000 recibirán una TREA de 3.5%.",
            "La tasa promocional se activará hasta el tercer día hábil siguiente a la apertura de la Cuenta Simple en soles realizada a través de la página web de Interbank.",
            "Los intereses se abonarán mensualmente, el primer día hábil del mes siguiente.",
            "La tasa promocional tendrá una vigencia de 3 meses, contados desde la fecha de su apertura. Finalizado este periodo, aplicará la tasa vigente según el tarifario de la Cuenta Simple, que actualmente es de 0%.",
            "Si durante la vigencia de la tasa promocional el cliente adquiere una Tarjeta de Crédito Interbank, una Cuenta Sueldo o una Cuenta Millonaria, la vigencia de la tasa promocional se extenderá por 3 meses adicionales.",
            "Si cancelas la cuenta antes de que finalice el mes, perderás los intereses acumulados de ese mes, por lo que no serán abonados.",
            "La promoción aplica para una (1) Cuenta Simple por cliente. En caso el cliente abra más de una Cuenta Simple, el beneficio de la tasa promocional aplicará únicamente a la primera."
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
            p.textContent = legalParagraphs[j];
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