const slides = {
  iphone: [
    { src: "../Static/accord-manual/iphone/01-manual.jpg", ru: "Полное руководство по системам Accord VII", en: "Complete Accord VII manual" },
    { src: "../Static/accord-manual/iphone/02-search.jpg", ru: "Поиск по всем разделам", en: "Search across every section" },
    { src: "../Static/accord-manual/iphone/03-diagnostics.jpg", ru: "Пошаговая диагностика и ремонт", en: "Step-by-step diagnostics and repair" },
    { src: "../Static/accord-manual/iphone/04-links.jpg", ru: "Переход от схемы к нужной инструкции", en: "Jump from a diagram to the right instruction" },
    { src: "../Static/accord-manual/iphone/05-catalog.jpg", ru: "Подробные схемы и каталоги деталей", en: "Detailed diagrams and parts catalogues" },
    { src: "../Static/accord-manual/iphone/06-diagrams.jpg", ru: "Связанные схемы и статьи", en: "Connected diagrams and articles" },
  ],
  ipad: [
    { src: "../Static/accord-manual/ipad/01-manual.jpg", ru: "Полное руководство на большом экране", en: "The complete manual on a larger screen" },
    { src: "../Static/accord-manual/ipad/02-search.jpg", ru: "Поиск по всем разделам", en: "Search across every section" },
    { src: "../Static/accord-manual/ipad/03-diagnostics.jpg", ru: "Пошаговая диагностика и ремонт", en: "Step-by-step diagnostics and repair" },
    { src: "../Static/accord-manual/ipad/04-catalog.jpg", ru: "Схемы и каталоги деталей", en: "Diagrams and parts catalogues" },
  ],
};

function getSlidesForDevice(device) {
  return slides[device] || slides.iphone;
}

function getNextIndex(index, total, direction) {
  return (index + direction + total) % total;
}

function getSwipeDirection(startX, endX, startY = 0, endY = 0, threshold = 48) {
  const horizontalDistance = endX - startX;
  const verticalDistance = endY - startY;
  if (Math.abs(horizontalDistance) < threshold || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return 0;
  return horizontalDistance < 0 ? 1 : -1;
}

const copy = {
  ru: {
    navSupport: "Поддержка", eyebrow: "Accord VII · 2003–2008", title: "Всё руководство Accord VII — в вашем кармане",
    lede: "Accord Manual объединяет документацию, диагностику, схемы и каталоги деталей в одном быстром и понятном приложении.",
    appStore: "Скачать в App Store", testFlightButton: "Доступно в TestFlight", availability: "Скоро в App Store",
    overviewLabel: "Возможности", overviewTitle: "Нужная информация — без долгих поисков",
    featureOneTitle: "Полная документация", featureOneText: "Разделы по обслуживанию, двигателю, трансмиссии, тормозам, электрике, кузову и другим системам Accord VII.",
    featureTwoTitle: "Поиск по всем разделам", featureTwoText: "Быстро находите нужные статьи, компоненты и коды неисправностей по ключевым словам.",
    featureThreeTitle: "Диагностика по шагам", featureThreeText: "Понятные сценарии для DTC-кодов и процедур ремонта помогают двигаться от причины к решению.",
    featureFourTitle: "Схемы и детали", featureFourText: "Открывайте электрические схемы и каталоги деталей, переходя от изображения к нужной инструкции.",
    galleryLabel: "Интерфейс", galleryTitle: "Создано для iPhone и iPad", supportLabel: "Поддержка", supportTitle: "Нужна помощь с Accord Manual?",
    supportText: "Напишите мне, если есть вопрос по приложению или вы нашли ошибку. Для баг-репорта укажите версию приложения, iOS, устройство и шаги, после которых появилась проблема.",
    emailButton: "Написать на почту", telegramButton: "Написать в Telegram", privacy: "Политика конфиденциальности",
    previous: "Предыдущий скриншот", next: "Следующий скриншот", selectSlide: "Открыть скриншот",
  },
  en: {
    navSupport: "Support", eyebrow: "Accord VII · 2003–2008", title: "Your Accord VII manual — always within reach",
    lede: "Accord Manual brings documentation, diagnostics, diagrams, and parts catalogues together in one fast, clear app.",
    appStore: "Download on the App Store", testFlightButton: "Available on TestFlight", availability: "Coming soon to the App Store",
    overviewLabel: "Features", overviewTitle: "The information you need, without the search",
    featureOneTitle: "Complete documentation", featureOneText: "Explore maintenance, engine, transmission, brakes, electrics, bodywork, and other Accord VII systems.",
    featureTwoTitle: "Search every section", featureTwoText: "Find the right article, component, or diagnostic trouble code with a simple keyword search.",
    featureThreeTitle: "Guided diagnostics", featureThreeText: "Clear DTC and repair flows help you move from the symptom to the right next step.",
    featureFourTitle: "Diagrams and parts", featureFourText: "Open electrical diagrams and parts catalogues, then jump directly to the relevant instruction.",
    galleryLabel: "Interface", galleryTitle: "Designed for iPhone and iPad", supportLabel: "Support", supportTitle: "Need help with Accord Manual?",
    supportText: "Email me with any app question or issue. For a bug report, include the app version, iOS version, device model, and steps that led to the problem.",
    emailButton: "Email support", telegramButton: "Message on Telegram", privacy: "Privacy Policy",
    previous: "Previous screenshot", next: "Next screenshot", selectSlide: "Open screenshot",
  },
};

function initialiseLanding() {
  const image = document.querySelector("[data-carousel-image]");
  if (!image) return;

  const caption = document.querySelector("[data-carousel-caption]");
  const dots = document.querySelector("[data-carousel-dots]");
  const previous = document.querySelector("[data-carousel-previous]");
  const next = document.querySelector("[data-carousel-next]");
  const deviceButtons = document.querySelectorAll("[data-device-select] button");
  const languageButtons = document.querySelectorAll("[data-language]");
  const carouselStage = document.querySelector("[data-carousel-stage]");
  const carouselFrame = document.querySelector("[data-carousel-frame]");
  let device = "iphone";
  let index = 0;
  let language = "ru";
  let isAnimating = false;
  let touchStart = null;

  function renderCarousel() {
    const currentSlides = getSlidesForDevice(device);
    const slide = currentSlides[index];
    image.src = slide.src;
    image.alt = slide[language];
    caption.textContent = slide[language];
    dots.innerHTML = "";
    currentSlides.forEach((_, dotIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `carousel-dot${dotIndex === index ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `${copy[language].selectSlide} ${dotIndex + 1}`);
      dot.setAttribute("aria-pressed", String(dotIndex === index));
      dot.addEventListener("click", () => {
        const direction = dotIndex === index ? 0 : (dotIndex > index ? 1 : -1);
        transitionTo(dotIndex, direction);
      });
      dots.appendChild(dot);
    });
  }

  function resetSlideAnimation() {
    image.classList.remove("is-leaving-next");
    image.classList.remove("is-leaving-previous");
    image.classList.remove("is-entering-next");
    image.classList.remove("is-entering-previous");
  }

  function transitionTo(nextIndex, direction) {
    if (!direction || isAnimating) return;

    isAnimating = true;
    const directionName = direction > 0 ? "next" : "previous";
    image.classList.add(`is-leaving-${directionName}`);

    setTimeout(() => {
      index = nextIndex;
      resetSlideAnimation();
      image.classList.add(`is-entering-${directionName}`);
      renderCarousel();
      void image.offsetWidth;

      const revealSlide = () => image.classList.remove(`is-entering-${directionName}`);
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(revealSlide);
      else setTimeout(revealSlide, 0);

      setTimeout(() => { isAnimating = false; }, 360);
    }, 180);
  }

  function changeSlide(direction) {
    const nextIndex = getNextIndex(index, getSlidesForDevice(device).length, direction);
    transitionTo(nextIndex, direction);
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = copy[language][element.dataset.i18n];
    });
    previous.setAttribute("aria-label", copy[language].previous);
    next.setAttribute("aria-label", copy[language].next);
    languageButtons.forEach((button) => {
      const selected = button.dataset.language === language;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderCarousel();
  }

  function setDevice(nextDevice) {
    if (nextDevice === device) return;
    device = nextDevice;
    index = 0;
    deviceButtons.forEach((button) => {
      const selected = button.dataset.device === device;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    carouselStage.className = `carousel-stage is-${device}`;
    carouselFrame.className = `carousel-frame is-${device}`;
    carouselStage.classList.add("is-device-changing");
    renderCarousel();
    setTimeout(() => carouselStage.classList.remove("is-device-changing"), 460);
  }

  previous.addEventListener("click", () => changeSlide(-1));
  next.addEventListener("click", () => changeSlide(1));
  deviceButtons.forEach((button) => button.addEventListener("click", () => setDevice(button.dataset.device)));
  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  carouselFrame.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  carouselFrame.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const direction = getSwipeDirection(touchStart.x, touch.clientX, touchStart.y, touch.clientY);
    touchStart = null;
    changeSlide(direction);
  }, { passive: true });
  carouselFrame.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });
  document.querySelectorAll("[data-app-store]").forEach((button) => button.addEventListener("click", (event) => event.preventDefault()));
  document.querySelector("#year").textContent = new Date().getFullYear();
  renderCarousel();
}

globalThis.AccordManual = { getSlidesForDevice, getNextIndex, getSwipeDirection };

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseLanding, { once: true });
  } else {
    initialiseLanding();
  }
}
