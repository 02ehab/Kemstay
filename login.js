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
