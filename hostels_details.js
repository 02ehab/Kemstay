document.addEventListener("DOMContentLoaded", function () {
  // Load hostel data from localStorage
  const hostels = JSON.parse(localStorage.getItem("hostels") || "[]");


  // get id from URL instead of using lastHostelIndex
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id") || 0;
  const hostel = hostels[index];

  if (!hostel) return;

  document.getElementById("hotelName").textContent = hostel.name || "";
  document.getElementById("hotelRooms").textContent = hostel.rooms || "";
  document.getElementById("hotelCategory").textContent = hostel.category || "";
  document.getElementById("unitTitle").textContent = hostel.name || "";
  document.getElementById("description").textContent = hostel.description || "";
  document.getElementById("governorate").textContent = hostel.governorate || "";
  document.getElementById("address").textContent = hostel.address || "";
  document.getElementById("building").textContent = hostel.building || "";
  document.getElementById("floor").textContent = hostel.floor || "";
  document.getElementById("nearby").textContent = hostel.nearby || "";
  document.getElementById("landmark").textContent = hostel.landmark || "";
  document.getElementById("locationLink").href = hostel.locationLink || "#";
});



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

  if (authLinks.length === 0) return;

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

// منع دخول الصفحات بدون تسجيل + سلايدر صور الغرف (داخل DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  // --- Main slider popup logic ---
  const mainImages = [
    'home.jpg',
    'room1.jpg',
    'room2.jpg',
    'room3.jpg'
  ];
  let mainCurrentIndex = 0;
  const mainSliderImage = document.getElementById('sliderImage');
  const mainPopup = document.getElementById('popup');
  const mainPopupImage = document.getElementById('popupImage');

  if (mainSliderImage && mainPopup && mainPopupImage) {
    mainSliderImage.addEventListener('click', function() {
      mainPopupImage.src = mainImages[mainCurrentIndex];
      mainPopup.classList.remove('hidden');
    });
    window.prevImage = function() {
      mainCurrentIndex = (mainCurrentIndex - 1 + mainImages.length) % mainImages.length;
      mainSliderImage.src = mainImages[mainCurrentIndex];
    };
    window.nextImage = function() {
      mainCurrentIndex = (mainCurrentIndex + 1) % mainImages.length;
      mainSliderImage.src = mainImages[mainCurrentIndex];
    };
    window.openPopup = function(index) {
      mainCurrentIndex = index;
      mainPopupImage.src = mainImages[mainCurrentIndex];
      mainPopup.classList.remove('hidden');
    };
    window.closePopupOutside = function(event) {
      if (event.target.id === "popup") {
        mainPopup.classList.add('hidden');
      }
    };
    window.prevPopupImage = function(event) {
      event.stopPropagation();
      mainCurrentIndex = (mainCurrentIndex - 1 + mainImages.length) % mainImages.length;
      mainPopupImage.src = mainImages[mainCurrentIndex];
    };
    window.nextPopupImage = function(event) {
      event.stopPropagation();
      mainCurrentIndex = (mainCurrentIndex + 1) % mainImages.length;
      mainPopupImage.src = mainImages[mainCurrentIndex];
    };
  }

  // --- Room gallery popup logic ---
  const galleryImagesEls = document.querySelectorAll('.room-images img');
  const galleryPopup = document.getElementById('imagePopup');
  const galleryPopupImage = document.getElementById('galleryPopupImage');
  let galleryCurrentIndex = 0;
  let galleryImagesArr = [];

  galleryImagesEls.forEach((img) => {
    img.addEventListener('click', function() {
      galleryImagesArr = Array.from(img.parentElement.querySelectorAll('img'));
      galleryCurrentIndex = galleryImagesArr.indexOf(this);
      if (galleryPopupImage) {
        galleryPopupImage.src = this.src;
      }
      if (galleryPopup) {
        galleryPopup.classList.remove('hidden');
      }
    });
  });

  window.closeGalleryPopup = function() {
    if (galleryPopup) galleryPopup.classList.add('hidden');
  };
  window.changeGalleryImage = function(direction) {
    if (!galleryImagesArr.length || !galleryPopupImage) return;
    galleryCurrentIndex = (galleryCurrentIndex + direction + galleryImagesArr.length) % galleryImagesArr.length;
    galleryPopupImage.src = galleryImagesArr[galleryCurrentIndex].src;
  };
  window.prevPopupImage = function(event) {
    if (event) event.stopPropagation();
    window.changeGalleryImage(-1);
  };
  window.nextPopupImage = function(event) {
    if (event) event.stopPropagation();
    window.changeGalleryImage(1);
  };
});

// Example user data (replace with localStorage.getItem('unitUser') if needed)
const userData =
  JSON.parse(localStorage.getItem('unitUser')) ||
  {
    fullName: "ايهاب عبد اللاه",
    role: "owner", // or "broker"
    joinDate: "2024-03-15",
    profileImg: "" // leave empty for placeholder
  };

// Fill the card
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userFullName").textContent = userData.fullName || "اسم المستخدم";
  document.getElementById("userRoleLabel").textContent = userData.role === "owner" ? "مالك" : "وسيط";
  document.getElementById("userRoleLabel").style.background =
    userData.role === "owner"
      ? "linear-gradient(90deg, #6c63ff 60%, #f61c0d 100%)"
      : "linear-gradient(90deg, #f61c0d 60%, #6c63ff 100%)";
  document.getElementById("userProfileImg").src =
    userData.profileImg && userData.profileImg.length > 5
      ? userData.profileImg
      : "https://i.pravatar.cc/120?img=3";
  // Format join date
  const joinDate = new Date(userData.joinDate);
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  let dateStr = "انضم: ";
  if (!isNaN(joinDate)) {
    dateStr += `${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
  } else {
    dateStr += userData.joinDate || "غير معروف";
  }
  document.getElementById("userJoinDate").textContent = dateStr;
});

