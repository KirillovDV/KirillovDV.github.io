const FORM_ENDPOINT = "https://formsubmit.co/ajax/mail@deniskirillov.com";

export function validateSupportMessage({ name, email, social, message }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Укажите ваше имя.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Укажите корректный адрес электронной почты.";
  }

  try {
    const socialUrl = new URL(social.trim());
    if (!social.trim() || !["http:", "https:"].includes(socialUrl.protocol)) {
      errors.social = "Укажите полную ссылку на профиль в соцсети.";
    }
  } catch {
    errors.social = "Укажите полную ссылку на профиль в соцсети.";
  }

  if (!message.trim()) {
    errors.message = "Введите сообщение.";
  }

  return errors;
}

function setFieldErrors(form, errors) {
  form.querySelectorAll("[data-error-for]").forEach((element) => {
    const error = errors[element.dataset.errorFor];
    element.textContent = error || "";
  });

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.setAttribute("aria-invalid", String(Boolean(errors[field.name])));
  });
}

function setStatus(status, message) {
  status.textContent = message;
}

function initialiseSupportForm() {
  const form = document.querySelector("[data-support-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    if (fields._honey) {
      setStatus(status, "Не удалось отправить сообщение. Повторите попытку чуть позже.");
      return;
    }

    const errors = validateSupportMessage(fields);
    setFieldErrors(form, errors);

    if (Object.keys(errors).length) {
      setStatus(status, "Исправьте поля, отмеченные ошибкой.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Отправляем…";
    setStatus(status, "");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          social: fields.social.trim(),
          message: fields.message.trim(),
          _subject: "Новое сообщение с deniskirillov.com/support",
          _template: "table",
          _captcha: "true",
        }),
      });

      if (!response.ok) throw new Error("Form delivery failed");

      form.reset();
      setFieldErrors(form, {});
      setStatus(status, "Спасибо! Ваше сообщение отправлено.");
    } catch {
      setStatus(status, "Не удалось отправить сообщение. Повторите попытку чуть позже.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Отправить сообщение";
    }
  });
}

if (typeof document !== "undefined") {
  initialiseSupportForm();
}
