// Inventory data — real vehicles
const inventory = [
  { make: "Land Cruiser 2012, 4.0L Auto VX", year: "2014年07月", mileage: "5.2万公里", engine: "自动 / 4L", price: "USD 63,038", tag: "In Stock", image: "images/land-cruiser-2012-1.jpg" },
  { make: "2016 Toyota Land Cruiser 4.0L Auto VX-R", year: "2016年09月", mileage: "11.1万公里", engine: "自动 / 4L", price: "USD 61,738.60", tag: "In Stock", image: "images/land-cruiser-2016-vxr-1.jpg" },
  { make: "2025 Toyota Prado 2.4T Flagship VX 5-Seat", year: "2026年01月", mileage: "0.9万公里", engine: "自动 / 2.4T", price: "USD 75,034", tag: "Premium", image: "images/prado-2025-flagship-vx-1.jpg" },
  { make: "Toyota bZ7 (BoZhi 7) 2025 — EV", year: "2026年04月", mileage: "0.3万公里", engine: "纯电 EV", price: "$28,020", tag: "In Stock", image: "images/toyota-bz7-2025-1.jpg" },
  { make: "BYD Tang L 2025 DM 175KM Drone Player Edition", year: "2025年04月", mileage: "0.32万公里", engine: "自动 / 1.5L PHEV", price: "$27,000", tag: "In Stock", image: "images/byd-tangl-2025-1.png" },
  { make: "Corolla Twin Engine E+ 2019 1.8L E‑CVT Leading Edition", year: "2022年05月", mileage: "3公里", engine: "1.8L", price: "$9,030.58", tag: "In Stock", image: "images/corolla-twin-engine-e-2019-1-8l-e-cvt-le-ms47zj6i.jpg" }
];

// Placeholder icon
const placeholderIcon = '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M19 17h-2M7 17H5V4h14v13h-2"/><path d="M5 10h14"/><path d="M9 6l1 2M15 6l-1 2"/></svg>';

function renderCarImage(car){
  if(car.image&&(car.image.startsWith('http')||car.image.startsWith('images/'))){return `<img src="${car.image}" alt="${car.make}" style="width:100%;height:220px;object-fit:cover" onerror="this.parentElement.innerHTML=placeholderIcon+'<span class=car-tag>${car.tag}</span>'"><span class="car-tag">${car.tag}</span>`;}
  return placeholderIcon+`<span class="car-tag">${car.tag}</span>`;
}

function renderInventory(){
  const grid=document.getElementById('inventoryGrid');if(!grid)return;
  grid.innerHTML=inventory.map(car=>`<div class="car-card"><div class="car-image">${renderCarImage(car)}</div><div class="car-info"><h3>${car.year} ${car.make}</h3><div class="car-specs"><span>${car.mileage}</span><span>${car.engine}</span></div><div class="car-price">${car.price} <span class="car-price-note">FOB</span></div><div class="car-actions"><button class="btn btn-outline-sm" onclick="document.getElementById(\'contact\').scrollIntoView({behavior:\'smooth\'})">Inquire</button><button class="btn btn-primary-sm" onclick="document.getElementById(\'contact\').scrollIntoView({behavior:\'smooth\'})">Details</button></div></div></div>`).join('');
}

document.addEventListener('DOMContentLoaded',()=>{renderInventory();});