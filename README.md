# FormSaver
Form-saving bookmarklet for saving and restoring forms, such as lengthy job applications or gov't forms

## Installation

To install the form saver & restorer, copy the following snippets into a new bookmark:

1. Create a new bookmark, call it form saver, and paste the following location
```js
javascript:(function(window, document) { const isSaver = true;function formSerialize(form) { const data = new FormData(form); return new URLSearchParams(data).toString(); } function formDeserialize(form, data) { const entries = (new URLSearchParams(data)).entries(); for(const [key, val] of entries) { const input = form.elements[key]; switch(input.type) { case 'checkbox': input.checked = !!val; break; default: input.value= val;break; } } }function getFormIndex(form) { return [...document.forms].findIndex(f => f === form); } function getActiveForm() { const formIndex = getFormIndex(document.activeElement.form); return formIndex > -1 ? document.forms[formIndex] : null; } function getFormStorageKey(form) { return `document.forms[${getFormIndex(form)}]`; }function persistStoredFormData(form) { const serialized = formSerialize(form); const key = getFormStorageKey(form); window.localStorage.setItem(key, serialized); } function populateFormDataFromStorage(form) { const key = getFormStorageKey(form); const data = window.localStorage.getItem(key); if (!data) return alert(`No form data stored for this page`); formDeserialize(form, data); }(function() { const form = getActiveForm(); if (!form) return alert('Your focus must be within a form.'); if (isSaver)persistStoredFormData(form); else populateFormDataFromStorage(form); })()})(window, document)
```
2. Create a second new bookmark, call it form restorer, and paste this. 

```js
javascript:(function(window, document) { const isSaver = false;function formSerialize(form) { const data = new FormData(form); return new URLSearchParams(data).toString(); } function formDeserialize(form, data) { const entries = (new URLSearchParams(data)).entries(); for(const [key, val] of entries) { const input = form.elements[key]; switch(input.type) { case 'checkbox': input.checked = !!val; break; default: input.value= val;break; } } }function getFormIndex(form) { return [...document.forms].findIndex(f => f === form); } function getActiveForm() { const formIndex = getFormIndex(document.activeElement.form); return formIndex > -1 ? document.forms[formIndex] : null; } function getFormStorageKey(form) { return `document.forms[${getFormIndex(form)}]`; }function persistStoredFormData(form) { const serialized = formSerialize(form); const key = getFormStorageKey(form); window.localStorage.setItem(key, serialized); } function populateFormDataFromStorage(form) { const key = getFormStorageKey(form); const data = window.localStorage.getItem(key); if (!data) return alert(`No form data stored for this page`); formDeserialize(form, data); }(function() { const form = getActiveForm(); if (!form) return alert('Your focus must be within a form.'); if (isSaver)persistStoredFormData(form); else populateFormDataFromStorage(form); })()})(window, document)
```
# Yes, I know both are the same code...

> Note that the two snippets are identical, except for the boolean value of isSaver. Ideally, the code would be split into two seperate files, with the commonalities abstracted out into utility/service libraries.
 
## Usage

To save a form, activate/focus an input or other interactive element within your form, and click the FormSaver bookmarklet. This will save the form's current state in local storage. Close your browser, take a swim, burn your house down, etc.. Then when you're ready to continue completing the form, activate/focus an input within the form, and click the FormRestorer bookmarklet. If you're lucky, and the form's developers created the form with best practices, your form should be repopulated to the last saved state.


