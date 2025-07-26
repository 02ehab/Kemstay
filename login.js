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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const phoneNumberInput = document.getElementById("phoneNumber");
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const otpSection = document.getElementById("otpSection");
  const otpInput = document.getElementById("otpInput");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const otpError = document.getElementById("otpError");

  let generatedOtp = null;

  // Handle phone number form submit to send OTP
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneNumber = phoneNumberInput.value.trim();
      if (!phoneNumber.match(/^[0-9]{10,15}$/)) {
        alert("يرجى إدخال رقم هاتف صالح.");
        return;
      }
      // Generate 6-digit OTP
      generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("generatedOtp", generatedOtp);
      localStorage.setItem("phoneNumber", phoneNumber);

      // Open WhatsApp URL to send OTP message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=رمز%20التحقق%20الخاص%20بك%20هو%20${generatedOtp}`;
      window.open(whatsappUrl, "_blank");

      // Show OTP input section and hide phone number input and send button
      phoneNumberInput.style.display = "none";
      sendOtpBtn.style.display = "none";
      otpSection.style.display = "block";
    });
  }

  // Handle OTP verification
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener("click", () => {
      const enteredOtp = otpInput.value.trim();
      const storedOtp = localStorage.getItem("generatedOtp");
      if (enteredOtp === storedOtp) {
        otpError.style.display = "none";
        handleAuthSuccess();
      } else {
        otpError.style.display = "block";
      }
    });
  }

  // التعامل مع التسجيل
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userTypeSelect = document.getElementById("userType");
      const userType = userTypeSelect ? userTypeSelect.value : "tenant";

      localStorage.setItem("userType", userType);
      handleAuthSuccess();
    });
  }

  // تحديث الروابط حسب حالة تسجيل الدخول
  const authLinks = document.querySelectorAll(".auth-link");
  authLinks.forEach(link => {
    if (isLoggedIn) {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });

  localStorage.setItem("isLoggedIn", "true");

  // زر ملفي / تسجيل الدخول في الهيدر والسايد
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
    if (authButtons) authButtons.style.display = "inline-block";
    if (sideAuthButtons) sideAuthButtons.style.display = "inline-block";
    if (profileLink) profileLink.style.display = "none";
    if (profileLinkMobile) profileLinkMobile.style.display = "none";
  }
});
