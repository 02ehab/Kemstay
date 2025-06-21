// تسجيل الدخول أو إنشاء حساب
function handleAuthSuccess() {
  // حفظ الحالة
  localStorage.setItem("isLoggedIn", "true");

  // تحويل للملف الشخصي
  window.location.href = "profile.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // نموذج تسجيل الدخول
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // هنا تضيف تحقق فعلي لو كنت بتربطه بقاعدة بيانات
      handleAuthSuccess();
    });
  }

  // نموذج إنشاء حساب
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // برضو تحقق حقيقي لو عندك قاعدة بيانات
      handleAuthSuccess();
    });
  }

  // تعديل الهيدر بناءً على حالة تسجيل الدخول
  const authLink = document.getElementById("authLink");
  if (authLink) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      authLink.textContent = "الملف الشخصي";
      authLink.href = "profile.html";
    } else {
      authLink.textContent = "تسجيل الدخول";
      authLink.href = "login.html";
    }
  }
});

// زر تسجيل الخروج
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}
document.querySelector("#loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  // تخزين حالة الدخول
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", "ايهاب عبداللاه"); // أو الاسم الذي تم إدخاله
  window.location.href = "profile.html"; // أو index.html حسب رغبتك
});
