(function () {
    'use strict';
  
    var FORM_SELECTOR = '#form-demo';
    var EMAIL_INPUT_SELECTOR = '#id-email';
    var REFERRAL_INPUT_ID = 'codigo-referido';
    var ORIGINAL_BUTTON_SELECTOR = '#hmac-form-id';
    var NEW_BUTTON_ID = 'nuevo-hmac-form-id';
    var DEFAULT_DOCUMENT_TYPE = 'DNI';
    var DEFAULT_DOCUMENT_NUMBER = '77777777';
  
    var IFRAME_URL = 'https://interbank.pe/referidos-tc';
    var IFRAME_CLASS = 'referral-iframe';
    var IFRAME_FORM_SELECTOR = '#dinamic-form';
    var ORIGINAL_BUTTON_DELAY_MS = 5500;
    var VALIDATION_STYLE_ID = 'referral-validation-styles';

    var IFRAME_TYPE_DOC_SELECTOR = '#idSelectTypeDoc';
    var IFRAME_NUM_DOC_SELECTOR = '#idNumDocumento';
    var IFRAME_REFERRAL_SELECTOR = '#cdr';
    var IFRAME_TYC_SELECTOR = '#idtyc';
    var IFRAME_SUBMIT_SELECTOR = '.a-button-wrapper button';
    var SOURCE_DNI_SELECTOR = '#idni';
  
    var REQUIRED_FIELDS = [
      { selector: '#idni', message: 'Ingresa tu número de DNI' },
      { selector: '#po-input', message: 'Ingresa tu número de celular' },
      { selector: '#id-email', message: 'Ingresa tu email' },
      { selector: '#' + REFERRAL_INPUT_ID, message: 'Ingresa tu código referido' },
      { selector: '#checkboxPrivacyPolicy', message: 'Debe aceptar la política de privacidad' },
      { selector: '#a-input-checkbox__input-2', message: 'Debe aceptar el derecho de endoso' }
    ];
  
    function findFormGroup(input, form) {
      var element = input.parentElement;
  
      while (element && element !== form) {
        if (element.classList.contains('form-group')) {
          return element;
        }
        element = element.parentElement;
      }
  
      return null;
    }
  
    function clearValidationAttributes(input) {
      var attributes = Array.prototype.slice.call(input.attributes);
  
      attributes.forEach(function (attribute) {
        if (attribute.name.indexOf('data-pristine-') === 0) {
          input.removeAttribute(attribute.name);
        }
      });
  
      input.removeAttribute('name');
      input.removeAttribute('required');
      input.removeAttribute('maxlength');
      input.removeAttribute('minlength');
      input.removeAttribute('pattern');
      input.removeAttribute('data-allowed-keys');
    }
  
    function injectValidationStyles() {
      var style;

      if (document.getElementById(VALIDATION_STYLE_ID)) {
        return;
      }

      style = document.createElement('style');
      style.id = VALIDATION_STYLE_ID;
      style.textContent =
        '#form-demo .custom-field-invalid .a-input-text__field{' +
        'border-color:#eb0046!important; }' +
        '#form-demo .custom-field-invalid .m-checkbox__label{' +
        'color:#eb0046;}' +
        '#form-demo .custom-required-error{' +
        'color:#eb0046;font-size:14px;font-weight:600;' +
        'line-height:20px;margin-top:8px; }' +
        '#' + NEW_BUTTON_ID + '{position:relative;}' +
        '#' + NEW_BUTTON_ID + '.is-loading,' +
        '#' + NEW_BUTTON_ID + '.is-loading:disabled,' +
        '#' + NEW_BUTTON_ID + '.is-loading[disabled]{' +
        'pointer-events:none;background-color:#37cb73!important;' +
        'border-color:#37cb73!important;opacity:1!important;}' +
        '#' + NEW_BUTTON_ID + '.is-loading .a-button__text{opacity:0;}' +
        '#' + NEW_BUTTON_ID + ' .referral-btn-spinner{' +
        'display:none;position:absolute;left:50%;top:50%;' +
        'width:22px;height:22px;margin:-11px 0 0 -11px;' +
        'border:2px solid rgba(255,255,255,.35);border-top-color:#fff;' +
        'border-radius:50%;animation:referral-btn-spin .7s linear infinite;}' +
        '#' + NEW_BUTTON_ID + '.is-loading .referral-btn-spinner{display:block;}' +
        '@keyframes referral-btn-spin{to{transform:rotate(360deg);}}';
      document.head.appendChild(style);
    }

    function setButtonLoading(button, isLoading) {
      var spinner;

      if (!button) {
        return;
      }

      if (isLoading) {
        button.classList.add('is-loading');
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');

        if (!button.querySelector('.referral-btn-spinner')) {
          spinner = document.createElement('span');
          spinner.className = 'referral-btn-spinner';
          spinner.setAttribute('aria-hidden', 'true');
          button.appendChild(spinner);
        }
        return;
      }

      button.classList.remove('is-loading');
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  
    function isFieldFilled(field) {
      if (field.type === 'checkbox' || field.type === 'radio') {
        return field.checked;
      }
      return field.value.trim() !== '';
    }
  
    function removeInheritedValidationMessages(formGroup) {
      var messages = formGroup.querySelectorAll(
        '.pristine-error, .text-help, .custom-required-error'
      );
      Array.prototype.forEach.call(messages, function (message) {
        message.remove();
      });
    }
  
    function clearFieldError(field) {
      var form = document.querySelector(FORM_SELECTOR);
      var formGroup = form && findFormGroup(field, form);
  
      if (!formGroup) {
        return;
      }
  
      formGroup.classList.remove('has-danger');
      formGroup.classList.remove('custom-field-invalid');
      field.removeAttribute('aria-invalid');
  
      removeInheritedValidationMessages(formGroup);
    }
  
    function showFieldError(field, message) {
      var form = document.querySelector(FORM_SELECTOR);
      var formGroup = form && findFormGroup(field, form);
      var error;
  
      if (!formGroup) {
        return;
      }
  
      formGroup.classList.add('has-danger');
      formGroup.classList.add('custom-field-invalid');
      field.setAttribute('aria-invalid', 'true');
  
      removeInheritedValidationMessages(formGroup);
      error = document.createElement('div');
      error.className = 'custom-required-error';
      formGroup.appendChild(error);
      error.textContent = message;
  
      if (!field.getAttribute('data-required-validation-bound')) {
        field.setAttribute('data-required-validation-bound', 'true');
        field.addEventListener(
          field.type === 'checkbox' ? 'change' : 'input',
          function () {
            if (isFieldFilled(field)) {
              clearFieldError(field);
            }
          }
        );
      }
    }
  
    function validateRequiredFields(form) {
      var firstInvalidField = null;
  
      REQUIRED_FIELDS.forEach(function (fieldConfig) {
        var field = form.querySelector(fieldConfig.selector);
  
        if (!field) {
          return;
        }
  
        if (isFieldFilled(field)) {
          clearFieldError(field);
          return;
        }
  
        showFieldError(field, fieldConfig.message);
        firstInvalidField = firstInvalidField || field;
      });
  
      if (firstInvalidField) {
        firstInvalidField.focus();
        return false;
      }
  
      return true;
    }
  
    function mountReferralCodeField() {
      var form = document.querySelector(FORM_SELECTOR);
      var emailInput;
      var emailGroup;
      var referralGroup;
      var referralLabel;
      var referralInput;
  
      if (!form || document.getElementById(REFERRAL_INPUT_ID)) {
        return Boolean(document.getElementById(REFERRAL_INPUT_ID));
      }
  
      emailInput = form.querySelector(EMAIL_INPUT_SELECTOR);
      emailGroup = emailInput && findFormGroup(emailInput, form);
  
      if (!emailGroup) {
        return false;
      }
      
      referralGroup = emailGroup.cloneNode(true);
      referralLabel = referralGroup.querySelector('label');
      referralInput = referralGroup.querySelector('input');
  
      if (!referralLabel || !referralInput) {
        return false;
      }
  
      referralLabel.textContent = 'Código referido';
      referralLabel.setAttribute('for', REFERRAL_INPUT_ID);
  
      referralInput.id = REFERRAL_INPUT_ID;
      referralInput.type = 'text';
      referralInput.value = '';
      referralInput.setAttribute('autocomplete', 'off');
      clearValidationAttributes(referralInput);
      removeInheritedValidationMessages(referralGroup);
      referralGroup.classList.remove('has-danger');
      referralGroup.classList.remove('custom-field-invalid');
      referralInput.removeAttribute('aria-invalid');
  
      emailGroup.parentNode.insertBefore(referralGroup, emailGroup.nextSibling);
      return true;
    }
  
    function mountNewSubmitButton() {
      var form = document.querySelector(FORM_SELECTOR);
      var originalButton;
      var originalWrapper;
      var newWrapper;
      var newButton;
  
      if (!form) {
        return false;
      }
  
      originalButton = form.querySelector(ORIGINAL_BUTTON_SELECTOR);
      newButton = document.getElementById(NEW_BUTTON_ID);
  
      if (newButton) {
        return true;
      }
  
      if (!originalButton) {
        return false;
      }
  
      originalWrapper = originalButton.parentElement;
      newWrapper = originalWrapper.cloneNode(true);
      newButton = newWrapper.querySelector(ORIGINAL_BUTTON_SELECTOR);
  
      if (!newButton) {
        return false;
      }
  
      newWrapper.removeAttribute('data-form-action');
      newWrapper.setAttribute('data-new-button-wrapper', 'true');
  
      newButton.id = NEW_BUTTON_ID;
      newButton.type = 'button';
      newButton.addEventListener('click', function (event) {
        var dniInput = form.querySelector(SOURCE_DNI_SELECTOR);
        var referralInput = document.getElementById(REFERRAL_INPUT_ID);
        var values = {
          tipoDocumento: DEFAULT_DOCUMENT_TYPE,
          numeroDocumento: dniInput ? dniInput.value.trim() : '',
          codigoReferido: referralInput ? referralInput.value.trim() : ''
        };

        event.preventDefault();
        event.stopPropagation();

        if (newButton.classList.contains('is-loading')) {
          return;
        }

        if (!validateRequiredFields(form)) {
          return;
        }

        console.log('valores para enviar al iframe', values);
        setButtonLoading(newButton, true);

        sendValuesToIframe(values, function (error) {
          if (error) {
            console.error(error.message);
            setButtonLoading(newButton, false);
            return;
          }

          setTimeout(function () {
            originalButton.click();
          }, ORIGINAL_BUTTON_DELAY_MS);
        });
      });
  
      originalWrapper.style.display = 'none';
      originalWrapper.parentNode.insertBefore(newWrapper, originalWrapper.nextSibling);
      return true;
    }
  
    function mountFormChanges() {
      var referralFieldMounted;
      var newButtonMounted;

      injectValidationStyles();
      referralFieldMounted = mountReferralCodeField();
      newButtonMounted = mountNewSubmitButton();

      if (referralFieldMounted && newButtonMounted) {
        ensureIframe();
        return true;
      }

      return false;
    }
  
    function observeForm() {
      var observer;
  
      if (mountFormChanges()) {
        return;
      }
  
      observer = new MutationObserver(function () {
        if (mountFormChanges()) {
          observer.disconnect();
        }
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  
    function ensureIframe() {
      var iframe = document.querySelector('iframe.' + IFRAME_CLASS);
  
      if (iframe) {
        return iframe;
      }
  
      iframe = document.createElement('iframe');
      iframe.className = IFRAME_CLASS;
      iframe.src = IFRAME_URL;
      iframe.hidden = true;
      iframe.setAttribute('aria-hidden', 'true');
      iframe.setAttribute('title', 'Envío de código referido');
      document.body.appendChild(iframe);
  
      return iframe;
    }
  
    function getIframeForm(iframe) {
      var iframeDocument;
  
      try {
        iframeDocument =
          iframe.contentDocument ||
          (iframe.contentWindow && iframe.contentWindow.document);
  
        if (!iframeDocument) {
          return null;
        }
  
        return {
          document: iframeDocument,
          form: iframeDocument.querySelector(IFRAME_FORM_SELECTOR)
        };
      } catch (error) {
        return null;
      }
    }
  
    function prepareIframeForm(callback) {
      var iframe = ensureIframe();
      var startedAt = Date.now();
      var timer = setInterval(function () {
        var iframeContext = getIframeForm(iframe);
  
        if (iframeContext && iframeContext.form) {
          clearInterval(timer);
          callback(null, iframeContext);
          return;
        }
  
        if (Date.now() - startedAt >= 20000) {
          clearInterval(timer);
          callback(new Error('No se pudo cargar el formulario del iframe.'));
        }
      }, 200);
    }
  
    function sendValuesToIframe(values, callback) {
      prepareIframeForm(function (error, iframeContext) {
        var typeDocument;
        var documentNumber;
        var referralCode;
        var termsCheckbox;
        var submitButton;

        if (error) {
          callback(error);
          return;
        }

        typeDocument = iframeContext.form.querySelector(IFRAME_TYPE_DOC_SELECTOR);
        documentNumber = iframeContext.form.querySelector(IFRAME_NUM_DOC_SELECTOR);
        referralCode = iframeContext.form.querySelector(IFRAME_REFERRAL_SELECTOR);
        termsCheckbox = iframeContext.form.querySelector(IFRAME_TYC_SELECTOR);
        submitButton = iframeContext.form.querySelector(IFRAME_SUBMIT_SELECTOR);

        if (
          !typeDocument ||
          !documentNumber ||
          !referralCode ||
          !termsCheckbox ||
          !submitButton
        ) {
          callback(new Error('No se encontraron los campos del iframe.'));
          return;
        }

        typeDocument.value = values.tipoDocumento;
        documentNumber.disabled = false;
        documentNumber.value = values.numeroDocumento;
        referralCode.value = values.codigoReferido;
        termsCheckbox.checked = true;
        submitButton.click();
        callback(null);
      });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeForm);
    } else {
      observeForm();
    }
    
  })();
  