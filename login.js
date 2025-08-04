 const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function toggleForm() {
      loginForm.classList.toggle('hidden');
      registerForm.classList.toggle('hidden');
    }

    // زر تسجيل الدخول
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert("تم تسجيل الدخول بنجاح!");
      window.location.href = "profile.html";
    });

    // زر إنشاء حساب
    document.getElementById("registerForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const data = {
        name: document.getElementById('fullname').value,
        governorate: document.getElementById('governorate').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        accountType: document.getElementById('accountType').value,
      };
      console.log("تم تسجيل البيانات:", data);
      alert("تم التسجيل بنجاح!");
      window.location.href = "profile.html";
    });

    // رابط نسيت كلمة المرور
    document.getElementById("forgot-password-link").addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "reset_password.html";
    });
//وقت تسجيل الدخول يظهر ملفي ويختفي تسجيل الدخول
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const authButtons = document.getElementById("authButtons");
  const sideAuthButtons = document.getElementById("sideAuthButtons");

  const profileLink = document.getElementById("profileLink");
  const profileLinkMobile = document.getElementById("profileLinkMobile");

  if (isLoggedIn) {
    if (authButtons) authButtons.style.display = "none";
    if (sideAuthButtons) sideAuthButtons.style.display = "none";

    if (profileLink) profileLink.style.display = "inline-block";
    if (profileLinkMobile) profileLinkMobile.style.display = "inline-block";
  } else {
    if (authButtons) authButtons.style.display = "flex";
    if (sideAuthButtons) sideAuthButtons.style.display = "flex";

    if (profileLink) profileLink.style.display = "none";
    if (profileLinkMobile) profileLinkMobile.style.display = "none";
  }
});
