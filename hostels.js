function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // التوجيه لتسجيل الدخول إذا لم يكن مسجل
  if (!isLoggedIn && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
    return;
  }

  // تغيير الروابط بناءً على تسجيل الدخول
  const authLinks = document.querySelectorAll(".auth-link");
  authLinks.forEach(link => {
    link.textContent = isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول";
    link.href = isLoggedIn ? "profile.html" : "login.html";
  });

  // إظهار/إخفاء زر الملف الشخصي
  const authButtons = document.getElementById("authButtons");
  const sideAuthButtons = document.getElementById("sideAuthButtons");
  const profileLink = document.getElementById("profileLink");
  const profileLinkMobile = document.getElementById("profileLinkMobile");

  if (authButtons) authButtons.style.display = isLoggedIn ? "none" : "flex";
  if (sideAuthButtons) sideAuthButtons.style.display = isLoggedIn ? "none" : "flex";
  if (profileLink) profileLink.style.display = isLoggedIn ? "inline-block" : "none";
  if (profileLinkMobile) profileLinkMobile.style.display = isLoggedIn ? "inline-block" : "none";

  // منع تصفح الروابط المحمية إذا لم يكن مسجل
  const protectedLinks = document.querySelectorAll("a:not([href*='login']):not([href='index.html'])");
  protectedLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });

  // زر الحجز في صفحة التفاصيل
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }

  // عرض الهوستلز المخزنة
 const container = document.getElementById("hostelCardsContainer");

if (container) {
  const hostels = JSON.parse(localStorage.getItem("hostels")) || [];

  if (hostels.length === 0) {
    container.innerHTML = "<p>لا يوجد هوستلز مضافة حتى الآن.</p>";
  } else {
    hostels.forEach((hostel, index) => {
      const card = document.createElement("div");
      card.className = "listing-card";  // ← استخدم نفس الكلاس الثابت
      card.innerHTML = `
        <img src="${hostel.image}" alt="${hostel.name}" loading="lazy">
        <div class="listing-details">
          <h3>${hostel.name}</h3>
          <p>${hostel.price || 'غير محدد'} جنيه / يوم</p>
          <a href="hostels_details.html?id=${index}" class="details-btn">عرض التفاصيل</a>
        </div>
      `;
      container.appendChild(card);
    });
  }
}
});

// السلايدر التلقائي
function autoScrollSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  let scrollAmount = 0;
  const slideWidth = 260;

  setInterval(() => {
    if (scrollAmount <= slider.scrollWidth - slider.clientWidth - slideWidth) {
      slider.scrollTo({
        left: scrollAmount + slideWidth,
        behavior: 'smooth'
      });
      scrollAmount += slideWidth;
    } else {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      scrollAmount = 0;
    }
  }, 3000);
}

autoScrollSlider("apartmentSlider");
autoScrollSlider("hotelSlider");

function slideLeft(id) {
  const slider = document.getElementById(id);
  if (slider) slider.scrollBy({ left: -260, behavior: 'smooth' });
}

function slideRight(id) {
  const slider = document.getElementById(id);
  if (slider) slider.scrollBy({ left: 260, behavior: 'smooth' });
}
