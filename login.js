// auth.js
import { supabase } from './supabase.js';

// تأكد من تعريف عناصر الفورم
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// تبديل بين الفورمات (نسخة تعمل من HTML onclick)
window.toggleForm = function () {
  loginForm.classList.toggle('hidden');
  registerForm.classList.toggle('hidden');
};

// تسجيل الدخول
loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
  console.error('Supabase error:', error);
  alert("❌ فشل: " + error.message);
}
 else {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    window.location.href = "profile.html";
  }
});

// إنشاء حساب جديد
registerForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById('fullname').value;
  const governorate = document.getElementById('governorate').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const accountType = document.getElementById('accountType').value;

  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name, governorate, phone, accountType }
  }
});

if (error) {
  console.error(error);
  alert("❌ فشل التسجيل: " + error.message);
} else {
  alert("✅ تم التسجيل! تحقق من بريدك الإلكتروني.");
  window.location.href = "profile.html";
}

});

// نسيت كلمة المرور
document.getElementById("forgot-password-link")?.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "reset_password.html";
});
