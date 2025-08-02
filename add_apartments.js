function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

// التحقق من تسجيل الدخول
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
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
        city: document.getElementById("city").value,
        street: document.getElementById("street").value,
        building: document.getElementById("building").value,
        floor: document.getElementById("floor").value,
        nearby: document.getElementById("nearby").value,
        landmark: document.getElementById("landmark").value,
        locationLink: document.getElementById("locationLink").value,
        price: document.getElementById("price").value,
        pricingType: document.getElementById("pricingType").value,
        services: {
          available: [...document.querySelectorAll("#availableServicesList input")].map(i => i.value),
          extra: [...document.querySelectorAll("#extraServicesList input")].map(i => i.value),
          owner: [...document.querySelectorAll("#ownerConditionsList input")].map(i => i.value),
        },
        availability: [...document.querySelectorAll(".availability-group")].map(group => ({
          from: group.querySelector("input[name='availableFrom[]']").value,
          to: group.querySelector("input[name='availableTo[]']").value
        }))
      };

      // Prepare new apartment object
      const newApartment = {
        id: Date.now(),
        type: data.unit_type,
        category: data.category,
        occupants: data.occupants,
        furnishStatus: data.furnishStatus,
        description: data.description,
        address: data.address,
        city: data.city,
        street: data.street,
        building: data.building,
        floor: data.floor,
        nearby: data.nearby,
        landmark: data.landmark,
        locationLink: data.locationLink,
        price: data.price,
        pricingType: data.pricingType,
        services: data.services,
        availability: data.availability,
        images: [], // Image upload handling can be added here
        userId: "defaultUser" // Placeholder userId, can be replaced with actual user info
      };

      // Get existing apartments or empty array
      const apartments = JSON.parse(localStorage.getItem("allApartments") || "[]");

      // Add new apartment
      apartments.push(newApartment);

      // Save back to localStorage
      localStorage.setItem("allApartments", JSON.stringify(apartments));

      localStorage.removeItem(LS_KEY);
      window.location.href = "thanks.html";
    });
  }

  showStep(currentStep);

  // Add landlord condition/service
  window.addService = function(type) {
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
  };

  // Add availability group
  window.addAvailability = function() {
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
  };

  window.removeAvailability = function(button) {
    const group = button.closest(".availability-group");
    group.remove();
  };
});

let apartments = JSON.parse(localStorage.getItem("allApartments")) || [];
apartments.push({
  id: Date.now(),
  title: "شقتي الجديدة",
  price: 3000,
  location: "القاهرة",
  userId: currentUserId, // لازم يكون مسجل عند تسجيل الدخول
  image: "image_url.jpg"
});
localStorage.setItem("allApartments", JSON.stringify(apartments));
