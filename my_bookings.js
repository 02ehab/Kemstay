function openMenu() {
      document.getElementById("sideMenu")?.classList.add("open");
    }

    function closeMenu() {
      document.getElementById("sideMenu")?.classList.remove("open");
    }

    function printInvoice(bookingId) {
      window.location.href = `invoice.html?bookingId=${bookingId}`;
    }
    
   const rejectButtons = document.querySelectorAll(".reject");
  const modal = document.getElementById("rejectionModal");
  const submitBtn = document.getElementById("submitRejection");
  const cancelBtn = document.getElementById("cancelRejection");
  const rejectionText = document.getElementById("rejectionText");

  // الزر اللي ضغط عليه المستخدم
  let currentCard = null;

  rejectButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      currentCard = e.target.closest(".request-card"); // حفظ الكرت الحالي لو حبيت تستخدمه
      modal.classList.remove("hidden");
    });
  });

  // إرسال السبب
  submitBtn.addEventListener("click", () => {
    const reason = rejectionText.value.trim();
    if (reason === "") {
      alert("من فضلك اكتب سبب الرفض.");
      return;
    }

    // هنا ممكن تضيف كود لحفظ السبب
    console.log("سبب الرفض:", reason);

    // إغلاق المودال
    modal.classList.add("hidden");
    rejectionText.value = "";
  });

  // إلغاء
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    rejectionText.value = "";
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
