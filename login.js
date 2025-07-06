function handleAuthSuccess() {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", "ايهاب عبداللاه");
  window.location.href = "profile.html";
}

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
  alert("تم الضغط على تسجيل باستخدام Google (ربط Google لاحقًا)");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAuthSuccess();
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAuthSuccess();
    });
  }

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
function handleAuthSuccess() {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", "ايهاب عبداللاه");
  window.location.href = "profile.html";
}

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
  alert("تم الضغط على تسجيل باستخدام Google (ربط Google لاحقًا)");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAuthSuccess();
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAuthSuccess();
    });
  }

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

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // اجلب نوع المستخدم
    const userTypeSelect = document.getElementById("userType");
    const userType = userTypeSelect.value; // "tenant" أو "owner"

    // احفظ نوع المستخدم في localStorage
    localStorage.setItem("userType", userType);

    // يمكن تضيف هنا عملية إرسال البيانات للسيرفر

    // توجيه المستخدم بعد التسجيل
    window.location.href = "profile.html"; // أو أي صفحة الملف الشخصي
  });
});

