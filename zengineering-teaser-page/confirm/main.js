const storageKey = "zengineering-contact-form";

const confirmData = sessionStorage.getItem(storageKey);

if (!confirmData) {
  window.location.replace("../#contact");
} else {
  const submission = JSON.parse(confirmData);
  const fieldFallback = "未入力";
  const listFallback = "未選択";

  document.querySelectorAll("[data-confirm-field]").forEach((element) => {
    const fieldName = element.dataset.confirmField;
    const value = submission[fieldName];
    element.textContent = value && String(value).trim() ? value : fieldFallback;
  });

  document.querySelectorAll("[data-confirm-list]").forEach((element) => {
    const groupName = element.dataset.confirmList;
    const values = Object.values(submission[groupName] || {});

    if (!values.length) {
      const item = document.createElement("li");
      item.className = "confirm-list__empty";
      item.textContent = listFallback;
      element.append(item);
      return;
    }

    values.forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      element.append(item);
    });
  });

  const form = document.querySelector(".confirm-submit-form");
  const hiddenFields = document.querySelector("[data-confirm-hidden-fields]");

  if (form && hiddenFields) {
    const redirectInput = form.querySelector('input[name="_redirect"]');
    const errorInput = form.querySelector('input[name="_error"]');

    if (redirectInput) {
      redirectInput.value = new URL("../success/", window.location.href).href;
    }

    if (errorInput) {
      errorInput.value = new URL("./?error=1", window.location.href).href;
    }

    const appendHiddenField = (name, value) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      hiddenFields.append(input);
    };

    Object.entries(submission).forEach(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue) {
            appendHiddenField(`${key}.${nestedKey}`, nestedValue);
          }
        });
        return;
      }

      if (value) {
        appendHiddenField(key, value);
      }
    });

  }
}