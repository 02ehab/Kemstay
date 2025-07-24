document.addEventListener("DOMContentLoaded", () => {
  // القائمة الجانبية
  function openMenu() {
    document.getElementById("sideMenu").classList.add("open");
  }

  function closeMenu() {
    document.getElementById("sideMenu").classList.remove("open");
  }

  window.openMenu = openMenu;
  window.closeMenu = closeMenu;

  // التحقق من تسجيل الدخول
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }

  const authLinks = document.querySelectorAll(".auth-link");
  authLinks.forEach(link => {
    if (isLoggedIn === "true") {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });


  // Multi-step form with localStorage step let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');

    function showStep(index) {
      steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
      });
    }

    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    }

    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }

    function addRoomImages() {
      const roomType = document.getElementById('roomType').value;
      const images = document.getElementById('roomImages').files;
      const list = document.getElementById('roomsPreview');

      const item = document.createElement('li');
      item.textContent = `${roomType} - عدد الصور: ${images.length}`;
      list.appendChild(item);

      // يمكنك هنا تخزين الصور مؤقتًا داخل FormData لو هتستخدمها لاحقًا
    }

    document.getElementById('listingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('تم إرسال النموذج بنجاح!');
      // يمكنك هنا إرسال البيانات للسيرفر
    });