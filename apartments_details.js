function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

// منع دخول الصفحات بدون تسجيل
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// صفحة تفاصيل الوحدة وحجز وهمي + تسجيل الدخول + حماية الروابط + إظهار ملفي
document.addEventListener("DOMContentLoaded", function () {
  // --- تسجيل الدخول وروابط الحساب ---
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  document.querySelectorAll(".auth-link").forEach(link => {
    if (isLoggedIn) {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });

  // إظهار/إخفاء أزرار الحساب حسب حالة الدخول
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

  // حماية الروابط المحمية
  document.querySelectorAll("a:not([href*='login']):not([href='index.html'])").forEach(link => {
    link.addEventListener("click", function (e) {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });

  
  // --- بيانات الوحدة ---
  // استخدم unitDataToEdit إذا كانت موجودة، وإلا استخدم selectedUnit
  
  // جلب بيانات الشقة من localStorage حسب ID من رابط الصفحة
const params = new URLSearchParams(window.location.search);
const unitId = params.get("id");

let unitData = {};
if (unitId) {
  const allApartments = JSON.parse(localStorage.getItem("allApartments") || "[]");
  unitData = allApartments.find(apt => apt.id == unitId);
}

// حفظ الوحدة مؤقتًا إن احتجت استخدامها في باقي السكربت
localStorage.setItem("selectedUnit", JSON.stringify(unitData));



    
  // عرض بيانات الوحدة
document.getElementById("unitTitle") && (document.getElementById("unitTitle").textContent = unitData.type || unitData.description || " ");  document.getElementById("unitType") && (document.getElementById("unitType").textContent = unitData.unit_type || unitData.unitType || "");
  document.getElementById("category") && (document.getElementById("category").textContent = unitData.category || "");
  document.getElementById("capacity") && (document.getElementById("capacity").textContent = unitData.occupants || unitData.capacity || "");
  document.getElementById("furnishStatus") && (document.getElementById("furnishStatus").textContent = unitData.furnishStatus || "");
  document.getElementById("description") && (document.getElementById("description").textContent = unitData.description || "");
  document.getElementById("address") && (document.getElementById("address").textContent = unitData.address || "");
  document.getElementById("locationLink") && (
    document.getElementById("locationLink").href = unitData.locationLink || "#"
  );
  document.getElementById("price") && (document.getElementById("price").textContent = unitData.price || "");
  document.getElementById("pricingType") && (document.getElementById("pricingType").textContent = unitData.pricingType || "");

  // العنوان التفصيلي (لخرائط جوجل)
  if (document.getElementById("locationLink")) {
    const addressParts = [
      unitData.governorate,
      unitData.street,
      unitData.building,
      unitData.floor,
      unitData.nearby,
      unitData.landmark
    ].filter(Boolean);
    if (addressParts.length) {
      const mapsQuery = encodeURIComponent(addressParts.join(", "));
      document.getElementById("locationLink").href = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
      document.getElementById("locationLink").textContent = "عرض الموقع على الخريطة";
      document.getElementById("locationLink").target = "_blank";
      document.getElementById("locationLink").rel = "noopener";
    }
document.getElementById("governorate") && (document.getElementById("governorate").textContent = unitData.city || unitData.governorate || "");    document.getElementById("street") && (document.getElementById("street").textContent = unitData.street || "");
    document.getElementById("building") && (document.getElementById("building").textContent = unitData.building || "");
    document.getElementById("floor") && (document.getElementById("floor").textContent = unitData.floor || "");
    document.getElementById("nearby") && (document.getElementById("nearby").textContent = unitData.nearby || "");
    document.getElementById("landmark") && (document.getElementById("landmark").textContent = unitData.landmark || "");
  }

  // الخدمات المتوفرة
  const featuresList = document.getElementById("featuresList");
  if (featuresList) {
    featuresList.innerHTML = "";
    (unitData.services?.available || unitData.features || []).forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresList.appendChild(li);
    });
  }

  // الخدمات الإضافية
  const extraFeaturesList = document.getElementById("extraFeaturesList");
  if (extraFeaturesList) {
    extraFeaturesList.innerHTML = "";
    (unitData.services?.extra || []).forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      extraFeaturesList.appendChild(li);
    });
  }

  // شروط المالك
  const ownerConditionsList = document.getElementById("ownerConditionsList");
  if (ownerConditionsList) {
    ownerConditionsList.innerHTML = "";
    (unitData.services?.owner || []).forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      ownerConditionsList.appendChild(li);
    });
  }

  // فترات الإتاحة
  const availabilityList = document.getElementById("availabilityList");
if (availabilityList && unitData.availability) {
  availabilityList.innerHTML = "";
  unitData.availability.forEach(period => {
    const li = document.createElement("li");
    li.textContent = `من ${period.from} إلى ${period.to}`;
    availabilityList.appendChild(li);
  });
}

  // الصور
  const imagesGallery = document.getElementById("imagesGallery");
if (imagesGallery) {
  imagesGallery.innerHTML = "";
  (unitData.images || []).forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "صورة الوحدة";
    img.style = "width:100px;margin:5px;border-radius:8px;cursor:pointer";
    img.onclick = () => openPopup(idx); // For slider popup
    imagesGallery.appendChild(img);
  });
}

  // --- سلايدر الصور ---
  const imageSources = unitData.images && unitData.images.length ? unitData.images : [
    'home.jpg',
    'room1.jpg',
    'room2.jpg',
    'room3.jpg'
  ];
  let currentImageIndex = 0;

  window.prevImage = function () {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    document.getElementById("sliderImage").src = imageSources[currentImageIndex];
  };

  window.nextImage = function () {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    document.getElementById("sliderImage").src = imageSources[currentImageIndex];
  };

  window.openPopup = function (index) {
    currentImageIndex = index;
    document.getElementById("popupImage").src = imageSources[index];
    document.getElementById("popup").classList.remove("hidden");
  };

  window.closePopupOutside = function (event) {
    if (event.target.id === "popup") {
      document.getElementById("popup").classList.add("hidden");
    }
  };

  window.prevPopupImage = function (event) {
    event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    document.getElementById("popupImage").src = imageSources[currentImageIndex];
  };

  window.nextPopupImage = function (event) {
    event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    document.getElementById("popupImage").src = imageSources[currentImageIndex];
  };

  // --- العقد وزر الحجز ---
  const contractCheck = document.getElementById('contractCheck');
  const bookBtn = document.querySelector('.book-btn');
  if (contractCheck && bookBtn) {
    contractCheck.addEventListener('change', () => {
      bookBtn.disabled = !contractCheck.checked;
    });
  }

  // تحقق من تواريخ الإتاحة (اختياري حسب نظامك)
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  function validateAvailability() {
    if (!checkinInput || !checkoutInput || !bookBtn) return;
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    let isUnavailable = false;
    if (unitData.unavailableDates && Array.isArray(unitData.unavailableDates)) {
      isUnavailable = unitData.unavailableDates.some(date => {
        const blockedDate = new Date(date);
        return checkinDate <= blockedDate && checkoutDate >= blockedDate;
      });
    }
    bookBtn.disabled = isUnavailable || !contractCheck.checked;
    document.getElementById("availabilityMessage") &&
      (document.getElementById("availabilityMessage").style.display = isUnavailable ? "block" : "none");
  }
  if (contractCheck) contractCheck.addEventListener("change", validateAvailability);
  if (checkinInput) checkinInput.addEventListener("change", validateAvailability);
  if (checkoutInput) checkoutInput.addEventListener("change", validateAvailability);

  // --- مشاركة ---
  window.toggleShare = function () {
    const buttons = document.getElementById("share-buttons");
    buttons.style.display = buttons.style.display === "flex" ? "none" : "flex";
    const url = encodeURIComponent(window.location.href);
    document.getElementById("whatsapp").href = `https://wa.me/?text=${url}`;
    document.getElementById("facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById("twitter").href = `https://twitter.com/intent/tweet?url=${url}&text=شاهد هذه الوحدة على Kemstay`;
  };
  window.copyLink = function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("✅ تم نسخ الرابط");
    });
  };

  // --- كارت المستخدم ---
  const userData =
    JSON.parse(localStorage.getItem('unitUser')) ||
    {
      fullName: "ايهاب عبد اللاه",
      role: "owner", // or "broker"
      joinDate: "2024-03-15",
      profileImg: "" // leave empty for placeholder
    };
  document.getElementById("userFullName") && (document.getElementById("userFullName").textContent = userData.fullName || "اسم المستخدم");
  document.getElementById("userRoleLabel") && (document.getElementById("userRoleLabel").textContent = userData.role === "owner" ? "مالك" : "وسيط");
  document.getElementById("userRoleLabel") && (document.getElementById("userRoleLabel").style.background =
    userData.role === "owner"
      ? "linear-gradient(90deg, #6c63ff 60%, #f61c0d 100%)"
      : "linear-gradient(90deg, #f61c0d 60%, #6c63ff 100%)");
  document.getElementById("userProfileImg") && (document.getElementById("userProfileImg").src =
    userData.profileImg && userData.profileImg.length > 5
      ? userData.profileImg
      : "https://i.pravatar.cc/120?img=3");
  // Format join date
  const joinDate = new Date(userData.joinDate);
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  let dateStr = "انضم: ";
  if (!isNaN(joinDate)) {
    dateStr += `${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
  } else {
    dateStr += userData.joinDate || "غير معروف";
  }
  document.getElementById("userJoinDate") && (document.getElementById("userJoinDate").textContent = dateStr);

  // زر الحجز الوهمي
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }
});
