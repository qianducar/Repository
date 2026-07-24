// i18n - Language switching
let currentLang = localStorage.getItem("qiandu_lang") || "en";

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem("qiandu_lang", lang);
  document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "ru" ? "ru" : "en";
  
  // Translate elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[key] && translations[key][lang]) {
      el.innerHTML = translations[key][lang];
    }
  });
  
  // Translate form placeholders separately
  const formPlaceholders = {
    "form-name": { en: "John Smith", zh: "请输入姓名", ru: "Иван Иванов" },
    "form-email": { en: "john@example.com", zh: "请输入邮箱", ru: "ivan@example.com" },
    "form-country": { en: "e.g. Nigeria, Kenya, UAE", zh: "例如：尼日利亚、肯尼亚、阿联酋", ru: "напр. Нигерия, Кения, ОАЭ" },
    "form-msg": { en: "Tell us what vehicles you are looking for, budget range, and destination port...", zh: "请描述您需要的车型、预算范围和目的港...", ru: "Укажите какие авто нужны, бюджет и порт назначения..." },
  };
  
  // Settings section placeholders
  const settings = document.getElementById("contactForm");
  if (settings) {
    document.querySelector("#name").placeholder = formPlaceholders["form-name"][lang] || formPlaceholders["form-name"].en;
    document.querySelector("#email").placeholder = formPlaceholders["form-email"][lang] || formPlaceholders["form-email"].en;
    document.querySelector("#country").placeholder = formPlaceholders["form-country"][lang] || formPlaceholders["form-country"].en;
    document.querySelector("#message").placeholder = formPlaceholders["form-msg"][lang] || formPlaceholders["form-msg"].en;
    
    // Interest select options
    const sel = document.querySelector("#interest");
    if (sel) {
      const opts = sel.options;
      if (opts.length > 0) opts[0].text = translations["interest-opt0"][lang];
      if (opts.length > 1) opts[1].text = translations["interest-opt1"][lang];
      if (opts.length > 2) opts[2].text = translations["interest-opt2"][lang];
      if (opts.length > 3) opts[3].text = translations["interest-opt3"][lang];
      if (opts.length > 4) opts[4].text = translations["interest-opt4"][lang];
      if (opts.length > 5) opts[5].text = translations["interest-opt5"][lang];
    }
  }
  
  // Translate hero title (contains HTML)
  const heroTitle = document.querySelector(".hero-content h1");
  if (heroTitle && translations["hero-title"] && translations["hero-title"][lang]) {
    heroTitle.innerHTML = translations["hero-title"][lang];
  }
  
  // Translate contact title (contains <br>)
  const contactTitle = document.querySelector(".contact-info h2");
  if (contactTitle && translations["contact-title"] && translations["contact-title"][lang]) {
    contactTitle.innerHTML = translations["contact-title"][lang];
  }
  
  // Translate about title
  const aboutTitle = document.querySelector(".about-content h2");
  if (aboutTitle && translations["about-title"] && translations["about-title"][lang]) {
    aboutTitle.innerHTML = translations["about-title"][lang];
  }
  
  // Service card descriptions (matched by sibling h3)
  const svcDescs = {
    "svc1-title": "svc1-desc", "svc2-title": "svc2-desc", "svc3-title": "svc3-desc",
    "svc4-title": "svc4-desc", "svc5-title": "svc5-desc", "svc6-title": "svc6-desc",
  };
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (el.tagName === "H3") {
      const descKey = svcDescs[el.dataset.i18n];
      if (descKey && translations[descKey] && translations[descKey][lang]) {
        const p = el.parentElement.querySelector("p");
        if (p) p.innerHTML = translations[descKey][lang];
      }
    }
  });
  
  // Step descriptions
  const stepDescs = {
    "step1-title": "step1-desc", "step2-title": "step2-desc",
    "step3-title": "step3-desc", "step4-title": "step4-desc",
  };
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (el.tagName === "H3") {
      const descKey = stepDescs[el.dataset.i18n];
      if (descKey && translations[descKey] && translations[descKey][lang]) {
        const step = el.closest(".step");
        if (step) {
          const p = step.querySelector("p");
          if (p) p.innerHTML = translations[descKey][lang];
        }
      }
    }
  });
  
  // About features
  const featKeys = { "about-feat1": "about-feat2", "about-feat3": "about-feat4" };
  document.querySelectorAll(".about-feature span").forEach((span, i) => {
    const keys = ["about-feat1", "about-feat2", "about-feat3", "about-feat4"];
    if (i < keys.length && translations[keys[i]] && translations[keys[i]][lang]) {
      span.innerHTML = translations[keys[i]][lang];
    }
  });
  
  // About paragraphs
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) {
    const ps = aboutContent.querySelectorAll("p");
    if (ps.length >= 2 && translations["about-p1"] && translations["about-p1"][lang]) {
      ps[0].innerHTML = translations["about-p1"][lang];
    }
    if (ps.length >= 2 && translations["about-p2"] && translations["about-p2"][lang]) {
      ps[1].innerHTML = translations["about-p2"][lang];
    }
  }
  
  // Footer brand text
  const footerBrand = document.querySelector(".footer-brand p");
  if (footerBrand && translations["footer-brand"] && translations["footer-brand"][lang]) {
    footerBrand.innerHTML = translations["footer-brand"][lang];
  }
  
  // Inventory card buttons (if any rendered)
  document.querySelectorAll(".car-actions .btn-outline-sm").forEach(btn => {
    btn.textContent = translations["inv-inquire"][lang] || "Inquire";
  });
  document.querySelectorAll(".car-actions .btn-primary-sm").forEach(btn => {
    btn.textContent = translations["inv-details"][lang] || "Details";
  });
}

// Sample inventory data — replace with your actual vehicles
const inventory = [
  { make: "Toyota Camry", year: 2021, mileage: "45,000 km", engine: "2.5L", price: "$15,800", tag: "In Stock", image: "toyota-camry" },
  { make: "Honda Accord", year: 2022, mileage: "32,000 km", engine: "1.5T", price: "$18,200", tag: "In Stock", image: "honda-accord" },
  { make: "BMW X5", year: 2020, mileage: "55,000 km", engine: "3.0T", price: "$32,500", tag: "Premium", image: "bmw-x5" },
  { make: "Mercedes C200", year: 2021, mileage: "38,000 km", engine: "1.5T", price: "$26,800", tag: "In Stock", image: "mercedes-c200" },
  { make: "Nissan Altima", year: 2022, mileage: "28,000 km", engine: "2.5L", price: "$14,500", tag: "Best Seller", image: "nissan-altima" },
  { make: "Volkswagen Passat", year: 2021, mileage: "42,000 km", engine: "2.0T", price: "$16,200", tag: "In Stock", image: "vw-passat" },
];

const carIcons = {
  "toyota-camry": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M9 6l1 2M15 6l-1 2"/></svg>',
  "honda-accord": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M9 6l1 2M15 6l-1 2"/></svg>',
  "bmw-x5": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M13 6l2 4M9 6l-2 4"/></svg>',
  "mercedes-c200": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M12 6v4"/></svg>',
  "nissan-altima": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M8 6l2 4M14 6l2 4"/></svg>',
  "vw-passat": '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M10 6l1 2M13 6l1 2"/></svg>'
};

// Render inventory
function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;
  grid.innerHTML = inventory.map(car => `
    <div class="car-card">
      <div class="car-image">
        ${carIcons[car.image] || carIcons["toyota-camry"]}
        <span class="car-tag">${car.tag}</span>
      </div>
      <div class="car-info">
        <h3>${car.year} ${car.make}</h3>
        <div class="car-specs">
          <span>${car.mileage}</span>
          <span>${car.engine}</span>
        </div>
        <div class="car-price">${car.price} <span class="car-price-note">FOB</span></div>
        <div class="car-actions">
          <button class="btn btn-outline-sm" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Inquire</button>
          <button class="btn btn-primary-sm" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  switchLang(currentLang);
  renderInventory();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  // Animate stats on scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0) {
      statsAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = current;
        }, 30);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats();

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const country = formData.get('country');
      const interest = formData.get('interest');
      const message = formData.get('message');

      // Build mailto link as fallback
      const subject = encodeURIComponent(`Inquiry from ${name} - ${country}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCountry: ${country}\nInterest: ${interest}\n\nMessage:\n${message}`
      );

      // Show toast
      showToast('Thank you! Your inquiry has been sent. We will get back to you within 24 hours.');

      // Open email client as fallback
      setTimeout(() => {
        window.location.href = `mailto:hello@qianduauto.me?subject=${subject}&body=${body}`;
        btn.textContent = 'Send Inquiry';
        btn.disabled = false;
      }, 1500);
    });
  }
});

// Toast notification
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
