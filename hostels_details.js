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

// عرض تفاصيل 
const images=["images/unit1.jpg","images/unit2.jpg","images/unit3.jpg"];
let i=0;
const imgEl=document.getElementById("sliderImage");
function show(idx){imgEl.src=images[idx];}
function nextImage(){i=(i+1)%images.length;show(i);}
function prevImage(){i=(i-1+images.length)%images.length;show(i);}

// بوب اب سلايدر
const imageSources = [
  'home.jpg',
  'room1.jpg',
  'room2.jpg',
  'room3.jpg'
];
let currentImageIndex = 0;

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
  document.getElementById("sliderImage").src = imageSources[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % imageSources.length;
  document.getElementById("sliderImage").src = imageSources[currentImageIndex];
}

function openPopup(index) {
  currentImageIndex = index;
  document.getElementById("popupImage").src = imageSources[index];
  document.getElementById("popup").classList.remove("hidden");
}


function closePopupOutside(event) {
  if (event.target.id === "popup") {
    document.getElementById("popup").classList.add("hidden");
  }
}

function prevPopupImage(event) {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
  document.getElementById("popupImage").src = imageSources[currentImageIndex];
}

function nextPopupImage(event) {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % imageSources.length;
  document.getElementById("popupImage").src = imageSources[currentImageIndex];
}

