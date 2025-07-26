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


//تغيير حالة تسجيل الدخول
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




// منع دخول الصفحات بدون تسجيل + سلايدر صور الغرف (داخل DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function() {
  // Only check login once
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
      galleryPopupImage.src = this.src; // This line sets the image source
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
