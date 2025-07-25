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
