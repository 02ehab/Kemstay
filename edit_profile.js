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

function saveProfile(event) {
      event.preventDefault();
      alert("تم حفظ التعديلات بنجاح!");
      // هنا تضيف كود الحفظ الحقيقي، مثل localStorage أو API
    }