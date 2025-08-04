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
