const translations = {
  ru: {
    pageTitle: "Политика конфиденциальности — Accord Manual", backToApp: "К приложению", eyebrow: "Конфиденциальность", title: "Политика конфиденциальности",
    lead: "Accord Manual создан, чтобы руководство было всегда под рукой — без сбора персональных данных и отслеживания.", effectiveDate: "Дата вступления в силу: 15 августа 2026 г.",
    summaryLabel: "Кратко", summaryTitle: "Ваши данные остаются у вас", summaryText: "Accord Manual не собирает персональные данные пользователей, не использует рекламу, аналитику или технологии отслеживания.",
    localDataTitle: "Локальные данные", localDataText: "Содержимое руководства, изображения, поисковый индекс, избранное, заметки, история чтения, состояние чек-листов, профиль автомобиля и настройки хранятся только на вашем устройстве.",
    sharingTitle: "Передача данных", sharingText: "Приложение не отправляет ваши данные разработчику и не требует подключения к сети для работы руководства. Экспорт PDF, заметок и закладок запускается только вами через системное меню «Поделиться».",
    disclaimerLabel: "Важно", disclaimerTitle: "Независимое неофициальное приложение", disclaimerText: "Accord Manual — независимое неофициальное приложение. Оно не связано с Honda, не одобрено и не поддерживается брендом Honda или его аффилированными компаниями.",
    contactTitle: "Контакты", contactText: "Вопросы о конфиденциальности:", developer: "Разработчик: Денис Кириллов",
  },
  en: {
    pageTitle: "Privacy Policy — Accord Manual", backToApp: "Back to app", eyebrow: "Privacy", title: "Privacy Policy",
    lead: "Accord Manual keeps your manual within reach — without collecting personal data or tracking you.", effectiveDate: "Effective date: August 15, 2026",
    summaryLabel: "In brief", summaryTitle: "Your data stays with you", summaryText: "Accord Manual does not collect personal data and does not use advertising, analytics, or tracking technologies.",
    localDataTitle: "On-device data", localDataText: "Manual content, images, the search index, favourites, notes, reading history, checklist progress, vehicle profile, and settings are stored only on your device.",
    sharingTitle: "Data sharing", sharingText: "The app does not send your data to the developer and does not require a network connection for the manual to work. PDF, note, and bookmark exports are started only by you through the system Share menu.",
    disclaimerLabel: "Important", disclaimerTitle: "Independent, unofficial application", disclaimerText: "Accord Manual is an independent, unofficial application. It is not affiliated with, endorsed by, or supported by Honda or any of its affiliated companies.",
    contactTitle: "Contact", contactText: "Privacy questions:", developer: "Developer: Denis Kirillov",
  },
};

function initialisePrivacyPolicy() {
  const languageButtons = document.querySelectorAll("[data-language]");

  function setLanguage(language) {
    document.documentElement.lang = language;
    document.title = translations[language].pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translations[language][element.dataset.i18n];
    });
    languageButtons.forEach((button) => {
      const selected = button.dataset.language === language;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  document.querySelector("#year").textContent = new Date().getFullYear();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialisePrivacyPolicy, { once: true });
  } else {
    initialisePrivacyPolicy();
  }
}
