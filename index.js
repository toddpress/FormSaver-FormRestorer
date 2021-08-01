
// all on one line-- copy into new bookmark for installation
// javascript:(function(window, document) { const isSaver = true;function formSerialize(form) { const data = new FormData(form); return new URLSearchParams(data).toString(); } function formDeserialize(form, data) { const entries = (new URLSearchParams(data)).entries(); for(const [key, val] of entries) { const input = form.elements[key]; switch(input.type) { case 'checkbox': input.checked = !!val; break; default: input.value= val;break; } } }function getFormIndex(form) { return [...document.forms].findIndex(f => f === form); } function getActiveForm() { const formIndex = getFormIndex(document.activeElement.form); return formIndex > -1 ? document.forms[formIndex] : null; } function getFormStorageKey(form) { return `document.forms[${getFormIndex(form)}]`; }function persistStoredFormData(form) { const serialized = formSerialize(form); const key = getFormStorageKey(form); window.localStorage.setItem(key, serialized); } function populateFormDataFromStorage(form) { const key = getFormStorageKey(form); const data = window.localStorage.getItem(key); if (!data) return alert(`No form data stored for this page`); formDeserialize(form, data); }(function() { const form = getActiveForm(); if (!form) return alert('Your focus must be within a form.'); if (isSaver)persistStoredFormData(form); else populateFormDataFromStorage(form); })()})(window, document)

javascript:(function (window, document) {
  const isSaver = true;
  function formSerialize(form) {
    const data = new FormData(form);
    return new URLSearchParams(data).toString();
  }
  function formDeserialize(form, data) {
    const entries = new URLSearchParams(data).entries();
    for (const [key, val] of entries) {
      const input = form.elements[key];
      switch (input.type) {
        case "checkbox":
          input.checked = !!val;
          break;
        default:
          input.value = val;
          break;
      }
    }
  }
  function getFormIndex(form) {
    return [...document.forms].findIndex((f) => f === form);
  }
  function getActiveForm() {
    const formIndex = getFormIndex(document.activeElement.form);
    return formIndex > -1 ? document.forms[formIndex] : null;
  }
  function getFormStorageKey(form) {
    return `document.forms[${getFormIndex(form)}]`;
  }
  function persistStoredFormData(form) {
    const serialized = formSerialize(form);
    const key = getFormStorageKey(form);
    window.localStorage.setItem(key, serialized);
  }
  function populateFormDataFromStorage(form) {
    const key = getFormStorageKey(form);
    const data = window.localStorage.getItem(key);
    if (!data) return alert(`No form data stored for this page`);
    formDeserialize(form, data);
  }
  (function () {
    const form = getActiveForm();
    if (!form) return alert("Your focus must be within a form.");
    if (isSaver) persistStoredFormData(form);
    else populateFormDataFromStorage(form);
  })();
})(window, document);
