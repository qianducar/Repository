const APP = {
  defaultPassword: "admin123",
  storageKey: "qiandu_admin",
  vehiclesKey: "qiandu_vehicles",
  inquiriesKey: "qiandu_inquiries",
};

// Initialize data
function initData() {
  if (!localStorage.getItem(APP.vehiclesKey)) {
    localStorage.setItem(APP.vehiclesKey, JSON.stringify([]));
  }
  if (!localStorage.getItem(APP.inquiriesKey)) {
    localStorage.setItem(APP.inquiriesKey, JSON.stringify([]));
  }
}

// Login
function handleLogin() {
  const pw = document.getElementById("loginPass").value;
  const saved = localStorage.getItem(APP.storageKey);
  const valid = saved ? saved === pw : pw === APP.defaultPassword;
  if (valid) {
    if (!saved) localStorage.setItem(APP.storageKey, pw);
    sessionStorage.setItem("qiandu_admin_logged", "1");
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";
    loadDashboard();
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function logout() {
  sessionStorage.removeItem("qiandu_admin_logged");
  document.getElementById("loginPage").style.display = "flex";
  document.getElementById("adminPage").style.display = "none";
  document.getElementById("loginPass").value = "";
  document.getElementById("loginError").style.display = "none";
}

// Navigation
function showSection(id) {
  document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".admin-sidebar a").forEach(a => a.classList.remove("active"));
  document.querySelector(`.admin-sidebar a[data-section="${id}"]`).classList.add("active");
  if (id === "sec-dashboard") loadDashboard();
  if (id === "sec-inquiries") loadInquiries();
  if (id === "sec-vehicles") loadVehicles();
}

// Dashboard
function loadDashboard() {
  const vehicles = getVehicles();
  const inquiries = getInquiries();
  document.getElementById("statVehicles").textContent = vehicles.length;
  document.getElementById("statInquiries").textContent = inquiries.length;
  document.getElementById("statNew").textContent = inquiries.filter(i => i.status === "new").length;
}

// Inquiries
function getInquiries() {
  try { return JSON.parse(localStorage.getItem(APP.inquiriesKey)) || []; } catch { return []; }
}

function saveInquiries(data) {
  localStorage.setItem(APP.inquiriesKey, JSON.stringify(data));
}

function loadInquiries() {
  const list = document.getElementById("inquiryList");
  const data = getInquiries();
  if (data.length === 0) {
    list.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-light);padding:32px">No inquiries yet</td></tr>';
    return;
  }
  list.innerHTML = data.map((q, i) => `
    <tr>
      <td>${q.name}</td>
      <td>${q.email}</td>
      <td>${q.country || "-"}</td>
      <td>${q.message?.substring(0, 40) || "-"}${q.message?.length > 40 ? "..." : ""}</td>
      <td><span class="badge badge-new">${q.status || "new"}</span></td>
      <td>
        <button class="btn-sm outline" onclick="viewInquiry(${i})">View</button>
        <button class="btn-sm danger" onclick="deleteInquiry(${i})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function viewInquiry(idx) {
  const data = getInquiries()[idx];
  if (!data) return;
  showToast(`From: ${data.name} (${data.email})\nCountry: ${data.country}\nInterest: ${data.interest || "-"}\n\nMessage:\n${data.message}`);
  // Mark as read
  const all = getInquiries();
  all[idx].status = "read";
  saveInquiries(all);
  loadInquiries();
}

function deleteInquiry(idx) {
  const all = getInquiries();
  all.splice(idx, 1);
  saveInquiries(all);
  loadInquiries();
  showToast("Inquiry deleted");
}

// Vehicles
function getVehicles() {
  try { return JSON.parse(localStorage.getItem(APP.vehiclesKey)) || []; } catch { return []; }
}

function saveVehicles(data) {
  localStorage.setItem(APP.vehiclesKey, JSON.stringify(data));
}

function loadVehicles() {
  const list = document.getElementById("vehicleList");
  const data = getVehicles();
  if (data.length === 0) {
    list.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-light);padding:32px">No vehicles yet. Add your first vehicle!</td></tr>';
    return;
  }
  list.innerHTML = data.map((v, i) => `
    <tr>
      <td>${v.year || "-"}</td>
      <td><strong>${v.make || "-"}</strong></td>
      <td>${v.mileage || "-"}</td>
      <td>${v.engine || "-"}</td>
      <td><strong>${v.price || "-"}</strong></td>
      <td>
        <button class="btn-sm outline" onclick="editVehicle(${i})">Edit</button>
        <button class="btn-sm danger" onclick="deleteVehicle(${i})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function openAddVehicle() {
  document.getElementById("vehicleFormTitle").textContent = "Add Vehicle";
  document.getElementById("vehicleIdx").value = "";
  ["vMake","vYear","vMileage","vEngine","vPrice","vTag"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("vehicleModal").classList.add("active");
}

function editVehicle(idx) {
  const v = getVehicles()[idx];
  if (!v) return;
  document.getElementById("vehicleFormTitle").textContent = "Edit Vehicle";
  document.getElementById("vehicleIdx").value = idx;
  document.getElementById("vMake").value = v.make || "";
  document.getElementById("vYear").value = v.year || "";
  document.getElementById("vMileage").value = v.mileage || "";
  document.getElementById("vEngine").value = v.engine || "";
  document.getElementById("vPrice").value = v.price || "";
  document.getElementById("vTag").value = v.tag || "";
  document.getElementById("vehicleModal").classList.add("active");
}

function saveVehicle() {
  const idx = document.getElementById("vehicleIdx").value;
  const vehicle = {
    make: document.getElementById("vMake").value.trim(),
    year: document.getElementById("vYear").value.trim(),
    mileage: document.getElementById("vMileage").value.trim(),
    engine: document.getElementById("vEngine").value.trim(),
    price: document.getElementById("vPrice").value.trim(),
    tag: document.getElementById("vTag").value.trim() || "In Stock",
  };
  if (!vehicle.make) { showToast("Please enter vehicle make", true); return; }
  const all = getVehicles();
  if (idx === "") {
    all.push(vehicle);
    showToast("Vehicle added");
  } else {
    all[parseInt(idx)] = vehicle;
    showToast("Vehicle updated");
  }
  saveVehicles(all);
  document.getElementById("vehicleModal").classList.remove("active");
  loadVehicles();
  loadDashboard();
}

function deleteVehicle(idx) {
  if (!confirm("Delete this vehicle?")) return;
  const all = getVehicles();
  all.splice(idx, 1);
  saveVehicles(all);
  loadVehicles();
  loadDashboard();
  showToast("Vehicle deleted");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

// Settings
function savePassword() {
  const p1 = document.getElementById("newPass").value;
  const p2 = document.getElementById("confirmPass").value;
  if (p1 !== p2) { showToast("Passwords do not match", true); return; }
  if (p1.length < 4) { showToast("Password must be at least 4 characters", true); return; }
  localStorage.setItem(APP.storageKey, p1);
  document.getElementById("newPass").value = "";
  document.getElementById("confirmPass").value = "";
  showToast("Password updated successfully");
}

function addSampleData() {
  const sampleVehicles = [
    { make: "Toyota Camry", year: "2021", mileage: "45,000 km", engine: "2.5L", price: "$15,800", tag: "In Stock" },
    { make: "Honda Accord", year: "2022", mileage: "32,000 km", engine: "1.5T", price: "$18,200", tag: "Best Seller" },
    { make: "BMW X5", year: "2020", mileage: "55,000 km", engine: "3.0T", price: "$32,500", tag: "Premium" },
  ];
  saveVehicles(sampleVehicles);
  showToast("Sample vehicles added (for the site inventory, update js/script.js)");
}

// Toast
function showToast(msg, isError) {
  let t = document.querySelector(".admin-toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast admin-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = "toast admin-toast" + (isError ? " error" : "");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  initData();
  if (sessionStorage.getItem("qiandu_admin_logged")) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("adminPage").style.display = "block";
    loadDashboard();
  }
  document.getElementById("loginPass").addEventListener("keydown", e => { if (e.key === "Enter") handleLogin(); });
});
