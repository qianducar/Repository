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
