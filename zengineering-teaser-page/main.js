const contactForm = document.querySelector(".contact-form");
const confirmationStorageKey = "zengineering-contact-form";

if (contactForm) {
  const emailField = contactForm.querySelector('input[name="email"]');
  const confirmEmailField = contactForm.querySelector(
    'input[name="confirm-email"]',
  );

  const fieldMessages = {
    company: "会社名を入力してください。",
    name: "名前を入力してください。",
    email: {
      valueMissing: "メールアドレスを入力してください。",
      typeMismatch: "正しいメールアドレスの形式で入力してください。",
    },
    "confirm-email": {
      valueMissing: "確認用のメールアドレスを入力してください。",
      typeMismatch: "正しいメールアドレスの形式で入力してください。",
    },
    message: "お問い合わせ内容を入力してください。",
  };

  const confirmEmailMismatchMessage =
    "メールアドレスと確認用メールアドレスが一致しません。";

  const checkboxGroups = [
    {
      selector: 'input[name^="topics."]',
      message: "ご相談内容を1つ以上選択してください。",
    },
    {
      selector: 'input[name^="contactMethod."]',
      message: "返信方法のご希望を1つ選択してください。",
    },
  ];

  const setFieldValidityMessage = (field) => {
    const messageConfig = fieldMessages[field.name];

    if (!messageConfig) {
      return;
    }

    if (typeof messageConfig === "string") {
      field.setCustomValidity(field.validity.valueMissing ? messageConfig : "");
      return;
    }

    if (field.validity.valueMissing) {
      field.setCustomValidity(messageConfig.valueMissing || "");
      return;
    }

    if (field.validity.typeMismatch) {
      field.setCustomValidity(messageConfig.typeMismatch || "");
      return;
    }

    if (
      field === confirmEmailField &&
      emailField &&
      confirmEmailField &&
      emailField.value &&
      confirmEmailField.value &&
      emailField.value !== confirmEmailField.value
    ) {
      field.setCustomValidity(confirmEmailMismatchMessage);
      return;
    }

    field.setCustomValidity("");
  };

  const syncCheckboxGroupValidity = ({ selector, message }) => {
    const checkboxes = Array.from(contactForm.querySelectorAll(selector));
    const hasChecked = checkboxes.some((checkbox) => checkbox.checked);

    checkboxes.forEach((checkbox, index) => {
      checkbox.setCustomValidity(!hasChecked && index === 0 ? message : "");
    });
  };

  const localizedFields = Array.from(
    contactForm.querySelectorAll("input[required], textarea[required]"),
  );

  localizedFields.forEach((field) => {
    field.addEventListener("input", () => setFieldValidityMessage(field));
    field.addEventListener("invalid", () => setFieldValidityMessage(field));
    setFieldValidityMessage(field);
  });

  if (emailField && confirmEmailField) {
    emailField.addEventListener("input", () => {
      setFieldValidityMessage(emailField);
      setFieldValidityMessage(confirmEmailField);
    });

    confirmEmailField.addEventListener("input", () => {
      setFieldValidityMessage(confirmEmailField);
    });
  }

  checkboxGroups.forEach((group) => {
    const checkboxes = contactForm.querySelectorAll(group.selector);

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => syncCheckboxGroupValidity(group));
    });

    syncCheckboxGroupValidity(group);
  });

  contactForm.addEventListener("submit", (event) => {
    localizedFields.forEach(setFieldValidityMessage);
    checkboxGroups.forEach(syncCheckboxGroupValidity);

    if (!contactForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const formData = new FormData(contactForm);
    const submission = {
      company: (formData.get("company") || "").toString().trim(),
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      "confirm-email": (formData.get("confirm-email") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
      topics: {},
      contactMethod: {},
    };

    Array.from(contactForm.querySelectorAll('input[name^="topics."]:checked')).forEach(
      (checkbox) => {
        const [, key] = checkbox.name.split(".");
        submission.topics[key] = checkbox.value;
      },
    );

    Array.from(
      contactForm.querySelectorAll('input[name^="contactMethod."]:checked'),
    ).forEach((checkbox) => {
      const [, key] = checkbox.name.split(".");
      submission.contactMethod[key] = checkbox.value;
    });

    sessionStorage.setItem(confirmationStorageKey, JSON.stringify(submission));
    window.location.href = "confirm/";
  });
}