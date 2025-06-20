

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

