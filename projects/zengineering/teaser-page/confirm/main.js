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

  const sendButton = document.getElementById("confirm-send");

  if (sendButton) {
    sendButton.addEventListener("click", () => {
      // Prevent posting to the third-party endpoint. Clear stored data and
      // navigate to the local success page instead.
      sessionStorage.removeItem(storageKey);
      window.location.href = new URL("../success/", window.location.href).href;
    });
  }
}