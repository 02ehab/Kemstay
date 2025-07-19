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


// تحقق من حالة تسجيل الدخول من localStorage
document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    authLink.textContent = "البروفايل";
    authLink.href = "profile.html";
  } else {
    authLink.textContent = "تسجيل الدخول";
    authLink.href = "login.html";
  }
});
// بعد نجاح تسجيل الدخول
//localStorage.setItem("isLoggedIn", "true");
//window.location.href = "index.html";

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

//تغيير حالة تسجيل الدخول
document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("authLink");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    authLink.textContent = "الملف الشخصي";
    authLink.href = "profile.html";
  } else {
    authLink.textContent = "تسجيل الدخول";
    authLink.href = "login.html";
  }
});

// اضافة وحدة
function openUnitTypePopup() {
  document.getElementById('unitTypePopup').classList.remove('hidden');
}

function closeUnitTypePopup() {
  document.getElementById('unitTypePopup').classList.add('hidden');
}

function redirectTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
  const unitCards = document.querySelectorAll(".unit-card");

  unitCards.forEach((card) => {
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    editBtn.addEventListener("click", () => {
      // يمكنك استخدام: window.location.href = `edit_unit.html?id=123`;
    });

    deleteBtn.addEventListener("click", () => {
      const confirmed = confirm("هل أنت متأكد من حذف هذه الوحدة؟");
      if (confirmed) {
        card.remove(); // حذف من الواجهة فقط
        alert("تم حذف الوحدة.");
        // لاحقًا: أرسل طلب حذف للسيرفر أو قاعدة البيانات
      }
    });
  });
});

//عرض او تعديل بيانات الوحدة
document.addEventListener("DOMContentLoaded", () => {
  // زر عرض التفاصيل
  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const unitId = btn.getAttribute("data-id");
      window.location.href = `apartments_details.html?id=${unitId}`;
    });
  });

  // زر تعديل
  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const unitId = btn.getAttribute("data-id");
      window.location.href = `edit_apartments.html?id=${unitId}`;
    });
  });
});
//حذف الوحدة
const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const unitId = btn.getAttribute("data-id");

    const confirmed = confirm("هل أنت متأكد من حذف هذه الوحدة؟");
    if (confirmed) {
      // مثال حذف من localStorage
      let units = JSON.parse(localStorage.getItem("units")) || [];
      units = units.filter(unit => unit.id != unitId);
      localStorage.setItem("units", JSON.stringify(units));

      // حذف من الصفحة
      btn.closest(".unit-card").remove();

      alert("تم حذف الوحدة بنجاح.");
    }
  });
});

// في صفحة unit_details.html أو edit_unit.html
const params = new URLSearchParams(window.location.search);
const unitId = params.get("id");

let units = JSON.parse(localStorage.getItem("units")) || [];
const unit = units.find(u => u.id == unitId);

// ثم اعرض بيانات الوحدة في HTML

// الوحدات المضافة
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const userType = localStorage.getItem("userType"); // "owner" أو "tenant"
  const unitPopup = document.getElementById("unitTypePopup");

  if (userType !== "owner") {
    // لو مش مالك، نمنع إظهار البوب أب حتى لو اتنفذ الأمر
    window.openUnitTypePopup = function () {
      // لا تفعل شيء
    };
  } else {
    // لو مالك، نسمح بفتح البوب أب
    window.openUnitTypePopup = function () {
      unitPopup.classList.remove("hidden");
    };
  }

  // دالة الإغلاق (تشتغل للكل)
  window.closeUnitTypePopup = function () {
    unitPopup.classList.add("hidden");
  };

  // دالة التوجيه (تشتغل للكل)
  window.redirectTo = function (url) {
    window.location.href = url;
  };
});
