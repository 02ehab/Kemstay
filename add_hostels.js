function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}


document.addEventListener("DOMContentLoaded", () => {
  // زر الحجز
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }

  // تغيير حالة تسجيل الدخول
  const authLinks = document.querySelectorAll(".auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  authLinks.forEach(link => {
    if (isLoggedIn === "true") {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });

  // Multi-step form with localStorage step persistence
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("hotelForm") || document.getElementById("multiForm");
  const LS_KEY = "kemstay_hotel_step";
  let currentStep = 0;

  // Restore step from localStorage
  const savedStep = parseInt(localStorage.getItem(LS_KEY), 10);
  if (!isNaN(savedStep) && savedStep >= 0 && savedStep < steps.length) {
    currentStep = savedStep;
  }

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });
    if (progressBar)
      progressBar.style.width = ((index + 1) / steps.length) * 100 + "%";
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    if (submitBtn) submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
    // Save step to localStorage
    localStorage.setItem(LS_KEY, index);
  }

  function validateStep(index) {
    const inputs = steps[index].querySelectorAll("input, select, textarea");
    for (let input of inputs) {
      if (input.hasAttribute("required") && !input.value) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return false;
      }
    }
    return true;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep >= steps.length) currentStep = steps.length - 1;
        showStep(currentStep);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentStep--;
      if (currentStep < 0) currentStep = 0;
      showStep(currentStep);
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateStep(currentStep)) {
        alert("تم إرسال النموذج بنجاح!");
        localStorage.removeItem(LS_KEY);
        // يمكنك هنا رفع الصور والبيانات لـ Firebase أو localStorage
      }
    });
  }

  showStep(currentStep);
});

function addAvailability() {
  const list = document.getElementById("availabilityList");
  const input = document.createElement("input");
  input.type = "date";
  input.name = "availability[]";
  input.required = true;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "−";
  removeBtn.onclick = () => inputDiv.remove();

  const inputDiv = document.createElement("div");
  inputDiv.appendChild(input);
  inputDiv.appendChild(removeBtn);
  list.appendChild(inputDiv);
}

function addFeature() {
  const list = document.getElementById("featuresList");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "features[]";
  input.placeholder = "ميزة";
  input.required = true;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "−";
  removeBtn.onclick = () => inputDiv.remove();

  const inputDiv = document.createElement("div");
  inputDiv.appendChild(input);
  inputDiv.appendChild(removeBtn);
  list.appendChild(inputDiv);
}



 
