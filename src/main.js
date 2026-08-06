const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", () => {
  mainNav.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
});

const categoryFilter = document.querySelector("#categoryFilter");
const productGrid = document.querySelector("#productGrid");
const solutionGrid = document.querySelector("#solutionGrid");
const downloadList = document.querySelector("#downloadList");
const factoryGallery = document.querySelector("#factoryGallery");
const langToggle = document.querySelector("[data-lang-toggle]");

let products = [];
let solutions = [];
let downloads = [];
let factoryMedia = [];
let categories = ["All"];
let activeCategory = "All";

async function loadSiteData() {
  const [siteResponse, translationsResponse] = await Promise.all([fetch("./data/site-data.json"), fetch("./data/translations.json")]);
  if (!siteResponse.ok) throw new Error(`Unable to load site data: ${siteResponse.status}`);
  if (!translationsResponse.ok) throw new Error(`Unable to load translations: ${translationsResponse.status}`);
  const data = await siteResponse.json();
  translations = await translationsResponse.json();
  products = data.products || [];
  solutions = data.solutions || [];
  downloads = data.downloads || [];
  factoryMedia = data.factoryMedia || [];
  categories = ["All", ...new Set(products.map((product) => product.category))];
}

function renderFilters() {
  categoryFilter.innerHTML = categories
    .map(
      (category) =>
        `<button class="filter-btn ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">${category}</button>`,
    )
    .join("");
}

function renderProducts() {
  const visibleProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-body">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="spec-list">
              ${product.specs.map((spec) => `<span>${spec}</span>`).join("")}
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

categoryFilter?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProducts();
});

function renderSolutions() {
  solutionGrid.innerHTML = solutions
    .map(
      (solution) => `
        <article class="solution-card">
          <h3>${solution.title}</h3>
          <p>${solution.description}</p>
        </article>
      `,
    )
    .join("");
}

function renderDownloads() {
  const brochureDownloads = downloads.filter((download) => download.type === "Catalog / Brochure");
  downloadList.innerHTML = brochureDownloads
    .map(
      (download) => `
        <article class="download-card">
          <div>
            <span class="download-type">${download.type}</span>
            <h3>${download.title}</h3>
            <p>${download.description}</p>
          </div>
          <a href="${download.url}" download>Download</a>
        </article>
      `,
    )
    .join("");
}

function renderFactoryGallery() {
  if (!factoryMedia.length) return;
  factoryGallery.innerHTML = factoryMedia
    .map((item) => {
      const media =
        item.type === "video"
          ? `<video src="${item.src}" controls muted playsinline preload="metadata"></video>`
          : `<img src="${item.src}" alt="${item.title}" data-fit="${item.fit || "cover"}" style="object-position: ${item.position || "center"}" />`;

      return `
        <article class="factory-card">
          <div class="factory-media">${media}</div>
          <div class="factory-caption">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

let translations = {};

let currentLang = "en";

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key] || translations.en[key] || element.textContent;
  });
  if (langToggle) langToggle.textContent = lang === "zh" ? "EN" : "中文";
}

langToggle?.addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "zh" : "en");
});

async function init() {
  try {
    await loadSiteData();
    renderFilters();
    renderProducts();
    renderSolutions();
    renderDownloads();
    renderFactoryGallery();
    applyLanguage("en");
  } catch (error) {
    console.error(error);
    if (downloadList) {
      downloadList.innerHTML =
        '<article class="download-card"><div><h3>Site data could not be loaded.</h3><p>Please refresh the page or contact HPMN.</p></div></article>';
    }
  }
}

init();
