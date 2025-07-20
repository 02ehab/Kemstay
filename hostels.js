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

// عرض شقق مميزة
function autoScrollSlider(sliderId) {
  const slider = document.getElementById(sliderId);
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
  slider.scrollBy({ left: -260, behavior: 'smooth' });
}

function slideRight(id) {
  const slider = document.getElementById(id);
  slider.scrollBy({ left: 260, behavior: 'smooth' });
}
