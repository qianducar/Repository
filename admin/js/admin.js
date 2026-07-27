// ====== AUTH ======
const DEFAULT_PASS = 'qiandu2026';
let adminPass = localStorage.getItem('qa_admin_pass') || DEFAULT_PASS;

function handleLogin() {
  const input = document.getElementById('loginPass').value;
  if (input === adminPass) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    loadData();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function logout() {
  document.getElementById('adminPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('loginPass').value = '';
}

// Enter key login
document.getElementById('loginPass')?.addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });

// ====== NAVIGATION ======
function showSection(id) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-sidebar a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-section="${id}"]`)?.classList.add('active');
}

function switchEditorTab(id, btn) {
  document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// ====== DATA ======
function getVehicles() { return JSON.parse(localStorage.getItem('qa_vehicles') || '[]'); }
function saveVehicles(data) { localStorage.setItem('qa_vehicles', JSON.stringify(data)); }
function getInquiries() { return JSON.parse(localStorage.getItem('qa_inquiries') || '[]'); }

function loadData() {
  renderVehicles();
  renderInquiries();
  updateStats();
  initContentEditor();
}

function updateStats() {
  const v = getVehicles();
  const iq = getInquiries();
  document.getElementById('statVehicles').textContent = v.length;
  document.getElementById('statInquiries').textContent = iq.length;
  document.getElementById('statNew').textContent = iq.filter(i=>i.status==='new').length;
}

// ====== VEHICLES ======
function renderVehicles() {
  const list = getVehicles();
  const tbody = document.getElementById('vehicleList');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-light);padding:32px">暂无车辆，点击右上角添加</td></tr>';
    return;
  }
  tbody.innerHTML = list.map((car, i) => `
    <tr>
      <td>${car.image && car.image.startsWith('http') ? `<img src="${car.image}" style="width:60px;height:40px;object-fit:cover;border-radius:6px;display:block" onerror="this.style.display='none'">` : '<span style="color:#ccc;font-size:20px">🚗</span>'}</td>
      <td><strong>${car.make}</strong></td>
      <td>${car.year}</td>
      <td>${car.mileage}</td>
      <td>${car.engine}</td>
      <td><strong style="color:var(--primary)">${car.price}</strong></td>
      <td><span class="tag-badge ${car.tag==='In Stock'?'tag-stock':car.tag==='Premium'?'tag-premium':'tag-hot'}">${car.tag}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="editVehicle(${i})">编辑</button>
        <button class="btn btn-sm btn-danger" onclick="deleteVehicle(${i})">删除</button>
      </td>
    </tr>
  `).join('');
}

function openAddVehicle() {
  document.getElementById('vehicleFormTitle').textContent = '添加车辆';
  document.getElementById('vehicleIdx').value = '';
  document.getElementById('vMake').value = '';
  document.getElementById('vYear').value = '';
  document.getElementById('vMileage').value = '';
  document.getElementById('vEngine').value = '';
  document.getElementById('vPrice').value = '';
  document.getElementById('vTag').value = 'In Stock';
  document.getElementById('vImage').value = '';
  previewImg('');
  showModal('vehicleModal');
}

function editVehicle(idx) {
  const car = getVehicles()[idx];
  document.getElementById('vehicleFormTitle').textContent = '编辑车辆';
  document.getElementById('vehicleIdx').value = idx;
  document.getElementById('vMake').value = car.make;
  document.getElementById('vYear').value = car.year;
  document.getElementById('vMileage').value = car.mileage;
  document.getElementById('vEngine').value = car.engine;
  document.getElementById('vPrice').value = car.price;
  document.getElementById('vTag').value = car.tag;
  document.getElementById('vImage').value = car.image || '';
  previewImg(car.image || '');
  showModal('vehicleModal');
}

// 图片预览
function previewImg(url) {
  const box = document.getElementById('imgPreviewBox');
  const img = document.getElementById('imgPreview');
  if (url && url.startsWith('http')) {
    img.src = url;
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

function saveVehicle() {
  const make = document.getElementById('vMake').value.trim();
  if (!make) { alert('请填写车型'); return; }
  const imgUrl = document.getElementById('vImage').value.trim();
  const car = {
    make, year: document.getElementById('vYear').value,
    mileage: document.getElementById('vMileage').value,
    engine: document.getElementById('vEngine').value,
    price: document.getElementById('vPrice').value,
    tag: document.getElementById('vTag').value,
    image: imgUrl || make.toLowerCase().replace(/\s+/g,'-')
  };
  const list = getVehicles();
  const idx = document.getElementById('vehicleIdx').value;
  if (idx !== '') { list[parseInt(idx)] = car; } else { list.push(car); }
  saveVehicles(list);
  renderVehicles(); updateStats();
  closeModal('vehicleModal');
  generateVehicleCode();
}

function deleteVehicle(idx) {
  if(!confirm('确定删除这辆车？')) return;
  const list = getVehicles();
  list.splice(idx, 1);
  saveVehicles(list);
  renderVehicles(); updateStats();
}

function generateVehicleCode() {
  const list = getVehicles();
  if (!list.length) { alert('请先添加车辆'); return; }
  
  let code = `// 车辆数据 — 由管理后台生成\nconst inventory = [\n`;
  list.forEach((car, i) => {
    code += `  { make: "${car.make}", year: ${car.year}, mileage: "${car.mileage}", engine: "${car.engine}", price: "${car.price}", tag: "${car.tag}", image: "${car.image}" }`;
    code += i < list.length - 1 ? ',\n' : '\n';
  });
  code += `];`;

  document.getElementById('vehicleCodeBox').textContent = code;
  document.getElementById('vehicleCodeOutput').style.display = 'block';
  document.getElementById('vehicleCodeOutput').scrollIntoView({behavior:'smooth'});
}

// ====== INQUIRIES ======
function renderInquiries() {
  const list = getInquiries();
  const tbody = document.getElementById('inquiryList');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-light);padding:32px">暂无询盘记录</td></tr>';
    return;
  }
  tbody.innerHTML = list.map((q, i) => `
    <tr>
      <td><strong>${q.name}</strong></td>
      <td>${q.email}</td>
      <td>${q.country||'-'}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis">${q.message}</td>
      <td style="font-size:12px;color:#999">${q.time||'-'}</td>
      <td><span class="tag-badge ${q.status==='new'?'tag-hot':'tag-stock'}">${q.status==='new'?'新':'已读'}</span></td>
      <td><button class="btn btn-sm btn-outline" onclick="markRead(${i})">标已读</button> <button class="btn btn-sm btn-danger" onclick="deleteInquiry(${i})">删除</button></td>
    </tr>
  `).join('');
}

function markRead(i) { const q=getInquiries(); q[i].status='read'; localStorage.setItem('qa_inquiries',JSON.stringify(q)); renderInquiries(); updateStats(); }
function deleteInquiry(i) { if(!confirm('确定删除？'))return; const q=getInquiries(); q.splice(i,1); localStorage.setItem('qa_inquiries',JSON.stringify(q)); renderInquiries(); updateStats(); }

// ====== SETTINGS ======
function savePassword() {
  const np = document.getElementById('newPass').value;
  const cp = document.getElementById('confirmPass').value;
  if (!np || np !== cp) { alert('两次密码不一致'); return; }
  if (np.length < 4) { alert('密码至少4位'); return; }
  adminPass = np;
  localStorage.setItem('qa_admin_pass', np);
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  alert('密码已更新！');
}

// ====== MODAL ======
function showModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
document.getElementById('vehicleModal')?.addEventListener('click', e => { if(e.target.id==='vehicleModal') closeModal('vehicleModal'); });

// ====== COPY ======
function copyCode(id) {
  const el = document.getElementById(id);
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = event.target;
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ 已复制！';
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
  });
}

// ====== CONTENT EDITOR ======
function initContentEditor() {
  // Services
  const svcData = [
    { zh: '车辆采购', en: 'Vehicle Sourcing', ru: 'Закупка автомобилей', descZh: '从全国范围筛选优质车源，严格把控车况品质', descEn: 'Source quality vehicles nationwide with strict condition control', descRu: 'Отбор качественных автомобилей по всей стране' },
    { zh: '专业整备', en: 'Reconditioning', ru: 'Реставрация', descZh: '180点全面检测，机械美容翻新，确保完美交付', descEn: '180-point inspection, mechanical & cosmetic reconditioning', descRu: '180-точечная инспекция, механическая и косметическая реставрация' },
    { zh: '出口手续', en: 'Export Documentation', ru: 'Экспортная документация', descZh: '全套单证办理，商检报关一站式完成', descEn: 'Full documentation, inspection & customs clearance', descRu: 'Полный пакет документов, инспекция и таможенное оформление' },
    { zh: '国际物流', en: 'International Logistics', ru: 'Международная логистика', descZh: '海运/铁路/公路多式联运，门到港/门到门服务', descEn: 'Sea/Rail/Truck multimodal transport, port-to-door service', descRu: 'Мультимодальные перевозки морем/поездом/грузовиком' },
    { zh: '质量保障', en: 'Quality Assurance', ru: 'Гарантия качества', descZh: 'FOB/CIF灵活选择，全程保险覆盖', descEn: 'Flexible FOB/CIF terms, full insurance coverage', descRu: 'Гибкие условия FOB/CIF, полное страховое покрытие' },
    { zh: '售后支持', en: 'After-Sales Support', ru: 'Послепродажное обслуживание', descZh: '清关指导，配件供应，技术支持', descEn: 'Clearance guidance, spare parts supply, tech support', descRu: 'Руководство по таможне, поставка запчастей, техподдержка' },
  ];
  const svcContainer = document.getElementById('servicesEditor');
  svcContainer.innerHTML = svcData.map((s, i) => `
    <div style="background:#f8f9fa;padding:16px;border-radius:10px;margin-bottom:12px">
      <strong style="color:var(--primary)">服务 ${i+1}</strong>
      <div class="form-grid" style="margin-top:10px">
        <div class="form-group"><label>中文名称</label><input id="svc${i}_zh" value="${s.zh}"></div>
        <div class="form-group"><label>英文名称</label><input id="svc${i}_en" value="${s.en}"></div>
        <div class="form-group"><label>俄文名称</label><input id="svc${i}_ru" value="${s.ru}"></div>
      </div>
      <div class="form-group" style="margin-top:8px"><label>中文描述</label><textarea id="svcdesc${i}_zh" style="min-height:50px">${s.descZh}</textarea></div>
      <div class="form-grid">
        <div class="form-group"><label>英文描述</label><textarea id="svcdesc${i}_en" style="min-height:50px">${s.descEn}</textarea></div>
        <div class="form-group"><label>俄文描述</label><textarea id="svcdesc${i}_ru" style="min-height:50px">${s.descRu}</textarea></div>
      </div>
    </div>
  `).join('');

  // Steps
  const stepData = [
    { zh: '选择车辆', en: 'Select Vehicles', ru: 'Выбор автомобиля', descZh: '浏览我们的在线库存或告诉我们您的需求，我们会为您找到最合适的车辆', descEn: 'Browse our online inventory or tell us your requirements and we\'ll find the perfect match', descRu: 'Просмотрите наш онлайн-инвентарь или сообщите нам о ваших требованиях' },
    { zh: '确认订单', en: 'Confirm Order', ru: 'Подтверждение заказа', descZh: '确认车型、配置和价格，签订外贸合同，支付定金', descEn: 'Confirm model, specs & price. Sign contract & pay deposit', descRu: 'Подтвердите модель, характеристики и цену. Подпишите контракт и внесите предоплату' },
    { zh: '装运出港', en: 'Shipping', ru: 'Отгрузка', descZh: '车辆整备完毕后安排国际运输，提供全程物流跟踪', descEn: 'Vehicle prepared & shipped with full tracking to destination port', descRu: 'Автомобиль подготовлен и отправлен с полным отслеживанием до порта назначения' },
    { zh: '清关交付', en: 'Delivery', ru: 'Доставка', descZh: '协助目的国清关手续，车辆安全交付到您手中', descEn: 'Assist with destination customs clearance for safe delivery', descRu: 'Помощь с таможенным оформлением в стране назначения для безопасной доставки' },
  ];
  const stepContainer = document.getElementById('stepsEditor');
  stepContainer.innerHTML = stepData.map((s, i) => `
    <div style="background:#f8f9fa;padding:16px;border-radius:10px;margin-bottom:12px">
      <strong style="color:var(--primary)">步骤 ${i+1}</strong>
      <div class="form-grid" style="margin-top:10px">
        <div class="form-group"><label>中文名称</label><input id="step${i}_zh" value="${s.zh}"></div>
        <div class="form-group"><label>英文名称</label><input id="step${i}_en" value="${s.en}"></div>
        <div class="form-group"><label>俄文名称</label><input id="step${i}_ru" value="${s.ru}"></div>
      </div>
      <div class="form-group" style="margin-top:8px"><label>中文描述</label><textarea id="stepdesc${i}_zh">${s.descZh}</textarea></div>
      <div class="form-grid">
        <div class="form-group"><label>英文描述</label><textarea id="stepdesc${i}_en">${s.descEn}</textarea></div>
        <div class="form-group"><label>俄文描述</label><textarea id="stepdesc${i}_ru">${s.descRu}</textarea></div>
      </div>
    </div>
  `).join('');
}

function generateContentCode() {
  let output = '<!-- ======= 主页内容代码（由管理后台生成）======= -->\n\n';

  output += `<!-- ===== 1. HERO 标题（三语）=====\n`;
  output += `在 js/script.js 的 translations 对象中找到 "hero-title"，替换为：\n\n`;
  output += `"hero-title": {\n`;
  output += `  "zh": "${document.getElementById('heroZh').value}",\n`;
  output += `  "en": "${document.getElementById('heroEn').value}",\n`;
  output += `  "ru": "${document.getElementById('heroRu').value}"\n`;
  output += `}\n\n`;

  output += `\n<!-- ===== 2. 联系信息（index.html 第199行附近）=====\n`;
  output += `找到电话那行，替换为：\n\n`;
  output += `<span>${document.getElementById('contactPhone').value}</span>\n\n`;

  document.getElementById('contentCodeBox').textContent = output;
  document.getElementById('contentCodeOutput').style.display = 'block';
  document.getElementById('contentCodeOutput').scrollIntoView({behavior:'smooth'});
}
