// profile.js

function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userType");
  window.location.href = "login.html";
}

function goToEditProfile() {
  window.location.href = "edit_profile.html";
}

function openUnitTypePopup() {
  const popup = document.getElementById("unitTypePopup");
  if (popup) popup.classList.remove("hidden");
}

function closeUnitTypePopup() {
  const popup = document.getElementById("unitTypePopup");
  if (popup) popup.classList.add("hidden");
}

function redirectTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = (localStorage.getItem("userType") || "").toLowerCase();

  // تحديث روابط تسجيل الدخول / الملف الشخصي في الهيدر
  document.querySelectorAll(".auth-link").forEach(link => {
    if (isLoggedIn) {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });

  // إذا لم يسجل الدخول يذهب لصفحة تسجيل الدخول
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  // تحديث بيانات الملف الشخصي من localStorage
  const profileName = localStorage.getItem("profileName") || "اسم غير معروف";
  const profileEmail = localStorage.getItem("userEmail") || "بريد غير معروف";
  const profileCity = localStorage.getItem("profileCity") || "غير محددة";
  const joinDate = localStorage.getItem("joinDate") || "غير محدد";

  // تحديث العناصر في الصفحة
  const nameElem = document.querySelector('.profile-card h2');
  const emailElem = document.querySelector('.profile-card p:nth-of-type(1)');
  const cityElem = document.querySelector('.profile-card p:nth-of-type(2)');
  const userTypeElem = document.querySelector('.profile-card p:nth-of-type(3)');
  const joinDateElem = document.querySelector('.profile-card p:nth-of-type(4)');

  if (nameElem) nameElem.textContent = profileName;
  if (emailElem) emailElem.textContent = "البريد: " + profileEmail;
  if (cityElem) cityElem.textContent = "المدينة: " + profileCity;
  if (userTypeElem) userTypeElem.textContent = "النوع: " + (userType === "owner" ? "مالك/وسيط" : "مستأجر");
  if (joinDateElem) joinDateElem.textContent = "تاريخ الانضمام: " + joinDate;

  // التحكم بإظهار أو إخفاء أزرار الإضافة والوحدات حسب نوع المستخدم
  const addUnitBtn = document.querySelector(".add-unit-btn");
  const addedUnitsCard = document.querySelector(".added-units-card");
  const bookingRequestsCard = document.querySelector(".booking-requests-card");

  if (userType === "tenant" || userType === "مستأجر") {
    if (addUnitBtn) addUnitBtn.style.display = "none";
    if (addedUnitsCard) addedUnitsCard.style.display = "none";
    if (bookingRequestsCard) bookingRequestsCard.style.display = "none";

    // تعطيل فتح البوب أب لو مستأجر
    window.openUnitTypePopup = () => {};
  } else {
    // مالك أو وسيط
    if (addUnitBtn) addUnitBtn.style.display = "inline-block";
    if (addedUnitsCard) addedUnitsCard.style.display = "block";
    if (bookingRequestsCard) bookingRequestsCard.style.display = "block";

    window.openUnitTypePopup = () => {
      const popup = document.getElementById("unitTypePopup");
      if (popup) popup.classList.remove("hidden");
    };
  }
});

//referral 
function copyReferral() {
  const referralInput = document.getElementById("referralLink");
  referralInput.select();
  referralInput.setSelectionRange(0, 99999); // للهواتف

  navigator.clipboard.writeText(referralInput.value)
    .then(() => alert("تم نسخ رابط الإحالة!"))
    .catch(() => alert("حدث خطأ أثناء النسخ"));
}