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

 // منع دخول الصفحات بدون تسجيل
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
  // تحويل المستخدم لتسجيل الدخول
  window.location.href = "login.html";
}

//مشاركة
function toggleShare() {
    const buttons = document.getElementById("share-buttons");
    buttons.style.display = buttons.style.display === "flex" ? "none" : "flex";

    const url = encodeURIComponent(window.location.href);

    document.getElementById("whatsapp").href = `https://wa.me/?text=${url}`;
    document.getElementById("facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById("twitter").href = `https://twitter.com/intent/tweet?url=${url}&text=شاهد هذه الوحدة على Kemstay`;
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("✅ تم نسخ الرابط");
    });
  }

  // عرض تفاصيل الوحدة
const unit = JSON.parse(localStorage.getItem("latestApartment"));

if (unit) {
  document.getElementById("unitTitle").textContent = unit.title || "شقة بدون عنوان";
  document.getElementById("unitType").textContent = unit.unitType;
  document.getElementById("category").textContent = unit.category;
  document.getElementById("capacity").textContent = unit.capacity;
  document.getElementById("price").textContent = unit.price;
  document.getElementById("description").textContent = unit.description;

  document.getElementById("governorate").textContent = unit.governorate;
  document.getElementById("street").textContent = unit.street;
  document.getElementById("building").textContent = unit.building;
  document.getElementById("floor").textContent = unit.floor;
  document.getElementById("nearby").textContent = unit.nearby;
  document.getElementById("landmark").textContent = unit.landmark;

  // الصور
  const gallery = document.getElementById("imageGallery");
  gallery.innerHTML = ""; // Clear previous images
  unit.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    gallery.appendChild(image);
  });

  // التوافر
  const availabilityList = document.getElementById("availabilityList");
  availabilityList.innerHTML = ""; // Clear previous availability
  unit.availability.forEach(range => {
    const li = document.createElement("li");
    li.textContent = `${range.from} → ${range.to}`;
    availabilityList.appendChild(li);
  });
}
//العقد
const contractCheck = document.getElementById('contractCheck');
  const bookBtn = document.querySelector('.book-btn');

  contractCheck.addEventListener('change', () => {
    bookBtn.disabled = !contractCheck.checked;
  });

     
