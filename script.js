function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

// تسجيل الدخول وإنشاء حساب
function showForm(type) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (type === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
  }
}

// تسجيل الدخول
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
}

// إنشاء حساب
const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
}

// صفحة تفاصيل الوحدة وحجز وهمي
document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }
});

