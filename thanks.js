function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}


// صفحة تفاصيل الوحدة وحجز وهمي
document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }
});
// تحقق من حالة تسجيل الدخول من localStorage
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

// التحقق من حالة تسجيل الدخول قبل الانتقال إلى صفحات محمية
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // اختار كل الروابط باستثناء تسجيل الدخول أو الرئيسية
  const protectedLinks = document.querySelectorAll("a:not([href*='login']):not([href='index.html'])");

  protectedLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });
});
// منع دخول الصفحات بدون تسجيل
const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    // تحويل المستخدم لتسجيل الدخول
    window.location.href = "login.html";
  }
