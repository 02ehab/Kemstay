function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

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

  // Add availability date validation and save data on submit
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) return;

      // Validate all availability date ranges
      let validDates = true;
      document.querySelectorAll(".availability-group").forEach(group => {
        const from = new Date(group.querySelector("input[name='availableFrom[]']").value);
        const to = new Date(group.querySelector("input[name='availableTo[]']").value);
        if (from > to) {
          validDates = false;
        }
      });
      if (!validDates) {
        alert("تاريخ البداية يجب أن يكون قبل تاريخ النهاية في جميع الفترات");
        return;
      }

      // Save data
      const data = {
        unit_type: document.getElementById("unit_type").value,
        category: document.getElementById("category").value,
        occupants: document.getElementById("occupants").value,
        furnishStatus: document.querySelector("input[name='furnishStatus']:checked").value,
        description: document.querySelector("textarea[name='description']").value,
        address: document.getElementById("address").value,
        locationLink: document.getElementById("locationLink").value,
        price: document.getElementById("price").value,
        pricingType: document.getElementById("pricingType").value,
        services: {
          available: [...document.querySelectorAll("#availableServicesList input")].map(i => i.value),
          extra: [...document.querySelectorAll("#extraServicesList input")].map(i => i.value),
        },
        availability: [...document.querySelectorAll(".availability-group")].map(group => ({
          from: group.querySelector("input[name='availableFrom[]']").value,
          to: group.querySelector("input[name='availableTo[]']").value
        }))
      };

      localStorage.setItem("unitDataToEdit", JSON.stringify(data));
      localStorage.removeItem(LS_KEY);
      window.location.href = "edit_add_apartments.html";
    });
  }

  showStep(currentStep);


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

//اضف شرط
function addService(type) {
  const container = document.createElement('div');
  container.className = 'service-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = `services_${type}[]`;
  input.placeholder = type === 'owner' ? 'أدخل شرط المالك' : 'أدخل اسم الخدمة';
  input.required = true;

  const deleteBtn = document.createElement('span');
  deleteBtn.innerHTML = '🗑';
  deleteBtn.className = 'delete-service';
  deleteBtn.onclick = () => container.remove();

  container.appendChild(input);
  container.appendChild(deleteBtn);

  if (type === 'available') {
    document.getElementById('availableServicesList').appendChild(container);
  } else if (type === 'extra') {
    document.getElementById('extraServicesList').appendChild(container);
  } else if (type === 'owner') {
    document.getElementById('ownerConditionsList').appendChild(container);
  }
}



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


// Add availability date validation for all groups
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // Validate all availability date ranges
    let validDates = true;
    document.querySelectorAll(".availability-group").forEach(group => {
      const from = new Date(group.querySelector("input[name='availableFrom[]']").value);
      const to = new Date(group.querySelector("input[name='availableTo[]']").value);
      if (from > to) {
        validDates = false;
      }
    });
    if (!validDates) {
      alert("تاريخ البداية يجب أن يكون قبل تاريخ النهاية في جميع الفترات");
      return;
    }

    // Save data
    const data = {
      unit_type: document.getElementById("unit_type").value,
      category: document.getElementById("category").value,
      occupants: document.getElementById("occupants").value,
      furnishStatus: document.querySelector("input[name='furnishStatus']:checked").value,
      description: document.querySelector("textarea[name='description']").value,
      address: document.getElementById("address").value,
      locationLink: document.getElementById("locationLink").value,
      price: document.getElementById("price").value,
      pricingType: document.getElementById("pricingType").value,
      services: {
        available: [...document.querySelectorAll("#availableServicesList input")].map(i => i.value),
        extra: [...document.querySelectorAll("#extraServicesList input")].map(i => i.value),
      },
      availability: [...document.querySelectorAll(".availability-group")].map(group => ({
        from: group.querySelector("input[name='availableFrom[]']").value,
        to: group.querySelector("input[name='availableTo[]']").value
      }))
    };

    localStorage.setItem("unitDataToEdit", JSON.stringify(data));
    localStorage.removeItem(LS_KEY);
    window.location.href = "edit_apartments.html";
  });
}
