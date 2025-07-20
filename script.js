function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

// تسجيل الدخول وإنشاء حساب
function showLogin() {
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("btn-indicator").style.right = "0%";
}

function showRegister() {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.add("active");
  document.getElementById("btn-indicator").style.right = "50%";
}
function loginWithGoogle() {
  alert("تم الضغط على تسجيل باستخدام Google (ربط Google OAuth يأتي لاحقًا)");
}
// تحقق من حالة تسجيل الدخول من localStorage
document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    authLink.textContent = "البروفايل";
    authLink.href = "profile.html";
  } else {
    authLink.textContent = "تسجيل الدخول";
    authLink.href = "login.html";
  }
});
// بعد نجاح تسجيل الدخول
//localStorage.setItem("isLoggedIn", "true");
//window.location.href = "index.html";

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

//تغيير حالة تسجيل الدخول
document.addEventListener("DOMContentLoaded", function () {
  const authLinks = document.querySelectorAll(".auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  authLinks.forEach(link => {
    if (isLoggedIn === "true") {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });
});

// صفحة تفاصيل الوحدة وحجز وهمي
document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }
});
// عرض شقق مميزة
function autoScrollSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  let scrollAmount = 0;
  const slideWidth = 260;

  setInterval(() => {
    if (scrollAmount <= slider.scrollWidth - slider.clientWidth - slideWidth) {
      slider.scrollTo({
        left: scrollAmount + slideWidth,
        behavior: 'smooth'
      });
      scrollAmount += slideWidth;
    } else {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      scrollAmount = 0;
    }
  }, 3000);
}

autoScrollSlider("apartmentSlider");
autoScrollSlider("hotelSlider");

function slideLeft(id) {
  const slider = document.getElementById(id);
  slider.scrollBy({ left: -260, behavior: 'smooth' });
}

function slideRight(id) {
  const slider = document.getElementById(id);
  slider.scrollBy({ left: 260, behavior: 'smooth' });
}
