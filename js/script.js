// Inventory data — 始终使用推送后的数据，不读 localStorage
const DEFAULT_INVENTORY = [
  { make: "Land Cruiser 2012, 4.0L Auto VX", year: "2014年07月", mileage: "2.4万公里", engine: "自动 / 4L", price: "$63,038", tag: "In Stock", image: "images/land-cruiser-2012-1.jpg" },
  { make: "2016 Toyota Land Cruiser 4.0L Auto VX-R", year: "2016年09月", mileage: "1公里", engine: "自动 / 4L", price: "$61,738.6", tag: "In Stock", image: "images/land-cruiser-2016-vxr-1.jpg" },
  { make: "2025 Toyota Prado 2.4T Flagship VX 5-Seat", year: "2026年01月", mileage: "0公里", engine: "自动 / 2.4T", price: "$75,034", tag: "Premium", image: "images/prado-2025-flagship-vx-1.jpg" },
  { make: "Toyota bZ7 (BoZhi 7) 2025 — EV", year: "2026年04月", mileage: "2.6万公里", engine: "纯电 EV", price: "$28,020", tag: "In Stock", image: "images/toyota-bz7-bozhi-7-2025-ev-ms43uuk0.jpg" },
  { make: "BYD Tang L 2025 DM 175KM Drone Player Edition", year: "2025年04月", mileage: "5000公里", engine: "自动 / 1.5L PHEV", price: "$27,000", tag: "In Stock", image: "images/byd-tangl-2025-1.png" },
  { make: "Jetour Traveler 2023 2.0T 4WD Cross PRO", year: "2024年07月", mileage: "3.3万公里", engine: "自动 / 2L", price: "$17,145", tag: "In Stock", image: "images/jetour-traveler-2023-2-0t-4wd-cross-pro-ms432a4p.jpg" },
  { make: "Jetour X70 2022 1.5T DCT Joy 7-Seat", year: "2022年10月", mileage: "2公里", engine: "自动 / 1.5L", price: "$8,568", tag: "New Arrival", image: "images/jetour-x70-2022-1-5t-dct-joy-7-seat-ms431gir.jpg" },
  { make: "2023 Toyota Corolla 1.2T Elite 5-Seater", year: "2023年03月", mileage: "2.2万公里", engine: "自动 / 1.2L", price: "$11,650", tag: "In Stock", image: "images/2023-toyota-corolla-1-2t-elite-5-seater-ms44gj8z.jpg" },
  { make: "2021 Corolla 1.5L CVT Elite", year: "2022年03月", mileage: "2.0万公里", engine: "自动 / 1.5L", price: "$11,794", tag: "In Stock", image: "images/2021-corolla-1-5l-cvt-elite-ms44ltmv.jpg" },
  { make: "BYD Yuan Plus 2023 Champion Edition 430KM Leading Type", year: "2023年05月", mileage: "3.0万公里", engine: "自动 / 0L", price: "$8,040", tag: "In Stock", image: "images/byd-yuan-plus-2023-champion-edition-430k-mscxar17.jpg" },
  { make: "Changan CS75 Plus 2021", year: "2021年10月", mileage: "3.0万公里", engine: "自动 / 1.5L", price: "$9,444", tag: "In Stock", image: "images/changan-cs75-plus-2021-mse8jeq4.jpg" },
  { make: "ChanganCS35PLUS 2022", year: "2022年10月", mileage: "2.3万公里", engine: "自动 / 1.4L", price: "$6.98", tag: "In Stock", image: "images/changancs35plus-2022-mse8ng29.jpg" },
  { make: "Toyota Camry 2019", year: "2020年08月", mileage: "8.0万公里", engine: "自动 / 2L", price: "$11,930", tag: "In Stock", image: "images/toyota-camry-2019-mse934ir.jpg" }
];

function loadInventory() {
  return DEFAULT_INVENTORY.filter(function(c) { return c.tag !== 'Sold'; });
}

const inventory = loadInventory();

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