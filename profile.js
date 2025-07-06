function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.querySelectorAll(".auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (authLinks.length === 0) return; // ما فيش عناصر، نخرج بأمان

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
document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    authLink.textContent = "الملف الشخصي";
    authLink.href = "profile.html";
  } else {
    authLink.textContent = "تسجيل الدخول";
    authLink.href = "login.html";
  }
});

// اضافة وحدة
function openUnitTypePopup() {
  document.getElementById('unitTypePopup').classList.remove('hidden');
}

function closeUnitTypePopup() {
  document.getElementById('unitTypePopup').classList.add('hidden');
}

function redirectTo(page) {
  window.location.href = page;
}

// الوحدات المضافة
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const userType = localStorage.getItem("userType"); // "owner" أو "tenant"
  const unitPopup = document.getElementById("unitTypePopup");

  if (userType !== "owner") {
    // لو مش مالك، نمنع إظهار البوب أب حتى لو اتنفذ الأمر
    window.openUnitTypePopup = function () {
      // لا تفعل شيء
    };
  } else {
    // لو مالك، نسمح بفتح البوب أب
    window.openUnitTypePopup = function () {
      unitPopup.classList.remove("hidden");
    };
  }

  // دالة الإغلاق (تشتغل للكل)
  window.closeUnitTypePopup = function () {
    unitPopup.classList.add("hidden");
  };

  // دالة التوجيه (تشتغل للكل)
  window.redirectTo = function (url) {
    window.location.href = url;
  };
});
