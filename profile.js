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
document.addEventListener("DOMContentLoaded", function () {
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
