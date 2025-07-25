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


  // Multi-step form with localStorage step persistence
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("multiForm");
  const LS_KEY = "kemstay_apartment_step";
  let currentStep = 0;

  // Restore step from localStorage
  const savedStep = parseInt(localStorage.getItem(LS_KEY), 10);
  if (!isNaN(savedStep) && savedStep >= 0 && savedStep < steps.length) {
    currentStep = savedStep;
  }

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    if (submitBtn) submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
    if (progressBar) progressBar.style.width = `${(index + 1) / steps.length * 100}%`;
    // Save step to localStorage
    localStorage.setItem(LS_KEY, index);
  }

  function validateStep(index) {
    const inputs = steps[index].querySelectorAll("input, select, textarea");
    for (let input of inputs) {
      if (input.hasAttribute("required") && !input.value) {
        input.reportValidity();
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
        alert("تمت إضافة الوحدة بنجاح ✅");
        localStorage.removeItem(LS_KEY);
        // هنا ممكن تبعت البيانات بـ fetch أو AJAX
      }
    });
  }

  showStep(currentStep);

function addAvailability() {
  const container = document.getElementById("availabilityList");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="date" name="avail_dates[]" required />
    <button type="button" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(div);
}

function addFeature() {
  const container = document.getElementById("featuresList");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" name="features[]" placeholder="ميزة" required />
    <button type="button" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(div);
}

showStep(currentStep);
  prevBtn.addEventListener("click", () => nextStep(-1));
  nextBtn.addEventListener("click", () => nextStep(1));
  submitBtn.addEventListener("click", () => document.getElementById("multiForm").submit());
  document.getElementById("addAvailabilityBtn").addEventListener("click", addAvailability);
  document.getElementById("addFeatureBtn").addEventListener("click", addFeature); 
});

//اضافة ميزة
function addService(type) {
  const container = document.createElement('div');
  container.className = 'service-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = `services_${type}[]`;
  input.placeholder = 'أدخل اسم الخدمة';
  input.required = true;

  const deleteBtn = document.createElement('span');
  deleteBtn.innerHTML = '🗑';
  deleteBtn.className = 'delete-service';
  deleteBtn.onclick = () => container.remove();

  container.appendChild(input);
  container.appendChild(deleteBtn);

  if (type === 'available') {
    document.getElementById('availableServicesList').appendChild(container);
  } else if (type === 'breakfast') {
    document.getElementById('breakfastServicesList').appendChild(container);
  } else if (type === 'extra') {
    document.getElementById('extraServicesList').appendChild(container);
  }
}


//الاتاحية
document.querySelector("form").addEventListener("submit", function(e) {
    const from = new Date(document.getElementById("availableFrom").value);
    const to = new Date(document.getElementById("availableTo").value);
    if (from > to) {
      alert("تاريخ البداية يجب أن يكون قبل تاريخ النهاية");
      e.preventDefault();
    }
  });

   function addAvailability() {
    const container = document.getElementById("availabilityContainer");

    const group = document.createElement("div");
    group.className = "availability-group";

    group.innerHTML = `
      <div class="form-group">
        <label>متاح من:</label>
        <input type="date" name="availableFrom[]" required>
      </div>
      <div class="form-group">
        <label>متاح حتى:</label>
        <input type="date" name="availableTo[]" required>
      </div>
      <button type="button" class="remove-btn" onclick="removeAvailability(this)">− حذف</button>
    `;

    container.appendChild(group);
  }

  function removeAvailability(button) {
    const group = button.closest(".availability-group");
    group.remove();
  }
