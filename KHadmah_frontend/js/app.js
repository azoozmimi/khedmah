const API_BASE = "http://localhost:3000/api";


// ---------------- Login Page ----------------
async function loginUser(event) {
event.preventDefault();
const email = document.querySelector("#email").value;5
const password = document.querySelector("#password").value;

try {
    const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
        alert(`تم تسجيل الدخول! مرحبا ${data.user.full_name}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
    } else {
        alert(data.message || "حدث خطأ");
    }
} catch (err) {
    console.error(err);
    alert("تعذر الاتصال بالخادم");
}

}

const loginForm = document.querySelector("#loginForm");
if (loginForm) loginForm.addEventListener("submit", loginUser);

// ---------------- Dashboard Page ----------------
async function loadDashboard() {
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
window.location.href = "login.html";
return;
}
document.querySelector("#welcomeMsg").textContent = `مرحباً ${user.full_name}`;

try {
    const res = await fetch(`${API_BASE}/userWallet?user_id=${user.user_id}`);
    const data = await res.json();
    if (res.ok) {
        document.querySelector("#walletBalance").textContent = data.wallet.balance + " ريال";
    }
} catch (err) {
    console.error(err);
}

}

if (document.querySelector("#dashboardPage")) {
    loadDashboard();
    loadServices();
    loadVehicles();
    loadFines();
}

// ---------------- Services Page ----------------
async function loadServices() {
try {
const res = await fetch(`${API_BASE}/services`);
const data = await res.json();
const container = document.querySelector("#servicesContainer");
if (res.ok && container) {
container.innerHTML = "";
data.services.forEach(s => {
const card = document.createElement("div");
card.classList.add("card");
card.innerHTML = `<h3>${s.service_name}</h3><p>${s.description}</p><p>السعر: ${s.price} ريال</p>`;
container.appendChild(card);
});
}
} catch (err) {
console.error(err);
}
}

if (document.querySelector("#servicesPage")) loadServices();

// ---------------- Vehicles Page ----------------
async function loadVehicles() {
const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;

try {
    const res = await fetch(`${API_BASE}/vehicles?user_id=${user.user_id}`);
    const data = await res.json();
    const table = document.querySelector("#vehiclesTable tbody");
    if (res.ok && table) {
        table.innerHTML = "";
        data.vehicles.forEach(v => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${v.plate_number}</td><td>${v.model}</td><td>${v.manufacturer}</td><td>${v.year}</td><td>${v.color}</td>`;
            table.appendChild(row);
        });
    }
} catch (err) {
    console.error(err);
}

}

if (document.querySelector("#vehiclesPage")) loadVehicles();

// ---------------- Fines Page ----------------
async function loadFines() {
const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;


try {
    const res = await fetch(`${API_BASE}/trafficFines?user_id=${user.user_id}`);
    const data = await res.json();
    const table = document.querySelector("#finesTable tbody");
    const finesSection = document.querySelector("#finesOverview");

    if (res.ok && table) {
        table.innerHTML = "";
        if (data.fines.length === 0) {
            // لو ما فيه مخالفات
            if(finesSection) {
                finesSection.innerHTML = "<p>ما فيه مخالفات حالياً ✅</p>";
            }
        } else {
            data.fines.forEach(f => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${f.amount}</td>
                    <td>${f.reason}</td>
                    <td>${f.status}</td>
                    <td>${f.paid ? "✅ تم الدفع" : "❌ غير مدفوع"}</td>
                `;
                table.appendChild(row);
            });
        }
    }
} catch (err) {
    console.error(err);
}


}



if (document.querySelector("#finesPage")) loadFines();

// ---------------- Wallet Page ----------------
async function loadWallet() {
const user = JSON.parse(localStorage.getItem("user"));
if (!user) return;

try {
    const res = await fetch(`${API_BASE}/userWallet?user_id=${user.user_id}`);
    const data = await res.json();
    const balanceEl = document.querySelector("#walletBalance");
    if (res.ok && balanceEl) balanceEl.textContent = data.wallet.balance + " ريال";
} catch (err) {
    console.error(err);
}

}

if (document.querySelector("#walletPage")) loadWallet();

// تحميل الهيدر والفوتر لجميع الصفحات
async function loadLayout() {
    try {
        // الهيدر
        const headerRes = await fetch('header.html');
        const headerHTML = await headerRes.text();
        document.getElementById('headerContainer').innerHTML = headerHTML;

        // الفوتر
        const footerRes = await fetch('footer.html');
        const footerHTML = await footerRes.text();
        document.getElementById('footerContainer').innerHTML = footerHTML;
    } catch (err) {
        console.error("فشل تحميل الهيدر أو الفوتر:", err);
    }
}

// استدعاء التحميل
loadLayout();


// ===================================================
// Cursor Glow – يتحرك مع المؤشر
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return; // لو الصفحة ما فيها العنصر

  let x = 0, y = 0;
  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    x += (mx - x) * 0.08;
    y += (my - y) * 0.08;
    glow.style.left = x + 'px';
    glow.style.top  = y + 'px';
    requestAnimationFrame(animate);
  }

  animate();
});
