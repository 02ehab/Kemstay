function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

function goToEditProfile() {
    window.location.href = "edit_profile.html";
  }
  
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

function openUnitTypePopup() {
  const unitPopup = document.getElementById("unitTypePopup");
  if (unitPopup) {
    unitPopup.classList.remove("hidden");
  }
}

function closeUnitTypePopup() {
  const unitPopup = document.getElementById("unitTypePopup");
  if (unitPopup) {
    unitPopup.classList.add("hidden");
  }
}

function redirectTo(page) {
  window.location.href = page;
}

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let userType = localStorage.getItem("userType"); // "owner" أو "tenant"

  // Treat broker as owner
  if (userType === "broker") {
    userType = "owner";
  }

  // Hide added units and booking requests cards for tenants
  if (userType === "tenant") {
    const addedUnitsCard = document.querySelector(".added-units-card");
    const bookingRequestsCard = document.querySelector(".booking-requests-card");
    if (addedUnitsCard) addedUnitsCard.style.display = "none";
    if (bookingRequestsCard) bookingRequestsCard.style.display = "none";
  }

  // التحكم في الظهور والاختفاء حسب حالة الدخول
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

  // Load profile data from localStorage and update UI
  const profileData = JSON.parse(localStorage.getItem('profileData'));
  if (profileData) {
    const profileImg = document.querySelector('.profile-img');
    const nameElem = document.querySelector('.profile-card h2');
    const emailElem = document.querySelector('.profile-card p:nth-of-type(1)');
    const cityElem = document.querySelector('.profile-card p:nth-of-type(2)');
    const userTypeElem = document.querySelector('.profile-card p:nth-of-type(3)');
    const joinDateElem = document.querySelector('.profile-card p:nth-of-type(4)');

    if (profileImg && profileData.image) profileImg.src = profileData.image;
    if (nameElem && profileData.name) nameElem.textContent = profileData.name;
    if (emailElem && profileData.email) emailElem.textContent = "البريد: " + profileData.email;
    if (cityElem && profileData.city) cityElem.textContent = "المدينة: " + profileData.city;
    if (userTypeElem && profileData.userType) userTypeElem.textContent = "النوع: " + profileData.userType;
    if (joinDateElem && profileData.joinDate) joinDateElem.textContent = "تاريخ الانضمام: " + profileData.joinDate;
  }

  // تحكم في البوب أب حسب نوع المستخدم
  const unitPopup = document.getElementById("unitTypePopup");
  if (userType !== "owner") {
    window.openUnitTypePopup = function () {};
  } else {
    window.openUnitTypePopup = function () {
      if (unitPopup) unitPopup.classList.remove("hidden");
    };
  }

  window.closeUnitTypePopup = function () {
    if (unitPopup) unitPopup.classList.add("hidden");
  };

  window.redirectTo = function (url) {
    window.location.href = url;
  };

  // التحكم في عرض الوحدات (عرض، تعديل، حذف)
  const unitCards = document.querySelectorAll(".unit-card");

  unitCards.forEach((card) => {
    const viewBtn = card.querySelector(".view-btn");
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        const unitId = viewBtn.getAttribute("data-id");
        window.location.href = `apartments_details.html?id=${unitId}`;
      });
    }

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        const unitId = editBtn.getAttribute("data-id");
        window.location.href = `edit_apartments.html?id=${unitId}`;
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        const unitId = deleteBtn.getAttribute("data-id");
        const confirmed = confirm("هل أنت متأكد من حذف هذه الوحدة؟");
        if (confirmed) {
          let units = JSON.parse(localStorage.getItem("units")) || [];
          units = units.filter(unit => unit.id != unitId);
          localStorage.setItem("units", JSON.stringify(units));
          card.remove();
          alert("تم حذف الوحدة بنجاح.");
        }
      });
    }
  });

  // تحميل بيانات الوحدة الحالية لو الصفحة تحتوي على ID
  const params = new URLSearchParams(window.location.search);
  const unitId = params.get("id");
  if (unitId) {
    const units = JSON.parse(localStorage.getItem("units")) || [];
    const unit = units.find(u => u.id == unitId);
    if (unit) {
      // هنا تضيف الكود لعرض بيانات الوحدة داخل HTML حسب الصفحة
    }
  }
});
