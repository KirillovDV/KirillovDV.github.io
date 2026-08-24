const copy = {
  ru: {
    kicker: "Резюме · Москва", role: "Senior Fullstack QA Engineer", downloadCV: "Скачать резюме в DOCX",
    summary: "Senior Fullstack QA Engineer с 5+ годами опыта тестирования backend-, web- и mobile-систем. Тестирую API и интеграции, разрабатываю API-автотесты на Java и Python, работаю с CI/CD, PostgreSQL, Kafka, Redis, Docker/Kubernetes, логами и нагрузочным тестированием.",
    experienceTitle: "Опыт", vkPeriod: "март 2024 — настоящее время", vkRole: "Ведущий инженер по тестированию",
    vkDescription: "Внутренние CX-продукты: рабочее место оператора, обработка обращений, интеграции с внешними сервисами и ML-модули маршрутизации и фильтрации тикетов.",
    vkOne: "Координирую QA-работы в продуктовой команде 20+ человек с 3+ тестировщиками: распределяю задачи, помогаю с приоритизацией проверок и менторю коллег.",
    vkAssessor: "Выступал ассессором образовательного проекта «Продуктовый буткемп»: проводил ревью экзаменационных работ продакт-менеджеров.",
    vkTwo: "Поддерживаю еженедельный цикл поставки — около 4 релизов в месяц; организую функциональные, интеграционные и регрессионные проверки, подсвечиваю риски команде.",
    vkThree: "Разрабатываю API-автотесты на Java для backend-сервисов и автоматизировал до 40% критичных API-сценариев.",
    vkFour: "Настраиваю GitLab CI/CD, Allure-отчёты и уведомления в Telegram, чтобы результаты тестирования были прозрачными.",
    vkFive: "Создал бота мониторинга дежурных, сократив ручную координацию дежурств на 90%, и AI-агента n8n для разбора фидбека и подготовки Jira-багрепортов — первичная обработка стала быстрее на 50–70%.",
    vkSix: "Расследую инциденты по логам и метрикам (ELK/Kibana, Grafana), работаю с Kafka, Redis, PostgreSQL и API-контрактами; веду QA-процесс, тестовую стратегию, RCA и postmortem.",
    brokenSunPeriod: "ноябрь 2024 — июнь 2025", brokenSunRole: "Music & SFX QA Engineer", brokenSunDescription: "Проектная работа параллельно с VK: тестирование звука и визуальных эффектов, диагностика проблем в SRDebugger и контроль тестовых сборок в TeamCity.",
    ldeCompany: "Лига Цифровой Экономики", ldePeriod: "сентябрь 2022 — март 2024", ldeRole: "Специалист по тестированию", ldeDescription: "Комплексно тестировал web-приложения на frontend- и backend-уровнях, автоматизировал проверки и подготовку окружений с Docker и Jenkins, вёл документацию в Confluence.",
    okenPeriod: "август 2021 — сентябрь 2022", okenRole: "QA Engineer", okenDescription: "Тестировал web- и mobile-приложения: функциональные сценарии, интерфейсы и интеграции; использовал Android Debug Bridge, Xcode и логи для локализации дефектов.",
    skillsTitle: "Навыки", skillLeadTitle: "QA-процессы и качество", skillLeadText: "QA strategy · risk-based testing · DoR / DoD · quality gates · release readiness · RCA / postmortem · Agile / Scrum · QA-координация · менторство",
    skillTestingTitle: "Тестирование", skillTestingText: "Backend · web · mobile · функциональное · регрессионное · интеграционное · API · контрактное · security · accessibility · нагрузочное · тест-дизайн",
    skillAutomationTitle: "Автоматизация и CI/CD", skillAutomationText: "Java · Python · pytest · requests · n8n · GitLab CI/CD · Jenkins · Allure · Git · code review · запуск проверок в CI/CD",
    skillPlatformTitle: "Данные и инфраструктура", skillPlatformText: "REST / SOAP · JSON / XML · Swagger / OpenAPI · Postman · PostgreSQL · SQL · Kafka · Redis · Docker · Kubernetes · ELK / Kibana · Grafana · Linux · Nginx",
    educationTitle: "Образование", universityLabel: "Высшее образование", universityTitle: "Московский технический университет связи и информатики", universityText: "«Информационные системы и технологии» (инженер), неоконченное высшее. Окончание — 2027 год.", coursesTitle: "Профессиональные курсы", coursesText: "QA Lead, 2025 · Java QA Engineer, 2025",
    footer: "Открыт к профессиональным предложениям",
  },
  en: {
    kicker: "Résumé · Moscow", role: "Senior Fullstack QA Engineer", downloadCV: "Download CV as DOCX",
    summary: "Senior Fullstack QA Engineer with 5+ years of experience testing backend, web, and mobile systems. Test APIs and integrations, build API automated tests in Java and Python, and work with CI/CD, PostgreSQL, Kafka, Redis, Docker/Kubernetes, logs, and performance testing.",
    experienceTitle: "Experience", vkPeriod: "March 2024 — present", vkRole: "Leading QA Engineer",
    vkDescription: "Internal CX products: operator workspace, request processing, integrations with external services, and ML modules for ticket routing and filtering.",
    vkOne: "Coordinate QA work in a 20+ person product team with 3+ testers: distribute work, help prioritise validation, and mentor colleagues.",
    vkAssessor: "Acted as an assessor for the Product Bootcamp educational project, reviewing product managers’ examination work.",
    vkTwo: "Support a weekly delivery cadence of around four releases a month; organise functional, integration, and regression testing while making delivery risks visible to the team.",
    vkThree: "Build API automated tests in Java for backend services and automated up to 40% of critical API scenarios.",
    vkFour: "Configure GitLab CI/CD, Allure reports, and Telegram notifications to make test results transparent.",
    vkFive: "Built an on-call monitoring bot that reduced manual rota coordination by 90%, plus an n8n AI agent for feedback triage and Jira bug-report preparation that cut initial handling time by 50–70%.",
    vkSix: "Investigate incidents through logs and metrics (ELK/Kibana, Grafana); work with Kafka, Redis, PostgreSQL, and API contracts; lead QA process, test strategy, RCA, and postmortems.",
    brokenSunPeriod: "November 2024 — June 2025", brokenSunRole: "Music & SFX QA Engineer", brokenSunDescription: "Contract work alongside VK: tested audio and visual effects, diagnosed issues in SRDebugger, and monitored test builds in TeamCity.",
    ldeCompany: "Digital Economy League", ldePeriod: "September 2022 — March 2024", ldeRole: "QA Specialist", ldeDescription: "Performed end-to-end testing of web applications at frontend and backend levels; automated checks and environment preparation with Docker and Jenkins; maintained documentation in Confluence.",
    okenPeriod: "August 2021 — September 2022", okenRole: "QA Engineer", okenDescription: "Tested web and mobile applications across functional flows, interfaces, and integrations; used Android Debug Bridge, Xcode, and logs to localise mobile defects.",
    skillsTitle: "Skills", skillLeadTitle: "QA process & quality", skillLeadText: "QA strategy · risk-based testing · DoR / DoD · quality gates · release readiness · RCA / postmortems · Agile / Scrum · QA coordination · mentoring",
    skillTestingTitle: "Testing", skillTestingText: "Backend · web · mobile · functional · regression · integration · API · contract · security · accessibility · performance · test design",
    skillAutomationTitle: "Automation & CI/CD", skillAutomationText: "Java · Python · pytest · requests · n8n · GitLab CI/CD · Jenkins · Allure · Git · code review · CI/CD test execution",
    skillPlatformTitle: "Data & infrastructure", skillPlatformText: "REST / SOAP · JSON / XML · Swagger / OpenAPI · Postman · PostgreSQL · SQL · Kafka · Redis · Docker · Kubernetes · ELK / Kibana · Grafana · Linux · Nginx",
    educationTitle: "Education", universityLabel: "Higher education", universityTitle: "Moscow Technical University of Communications and Informatics", universityText: "Information Systems and Technologies (Engineering), incomplete higher education. Expected graduation: 2027.", coursesTitle: "Professional courses", coursesText: "QA Lead, 2025 · Java QA Engineer, 2025",
    footer: "Open to professional opportunities",
  },
};

function setLanguage(language) {
  const languageCopy = copy[language];
  if (!languageCopy) return;

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = languageCopy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    const selected = button.dataset.language === language;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  try { localStorage.setItem("cv-language", language); } catch (_) { /* Storage is optional. */ }
}

function initialiseCV() {
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  let initialLanguage = "ru";
  try { initialLanguage = localStorage.getItem("cv-language") || initialLanguage; } catch (_) { /* Storage is optional. */ }
  setLanguage(initialLanguage);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialiseCV, { once: true });
  else initialiseCV();
}
