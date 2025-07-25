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

  // تحديث روابط تسجيل الدخول / الملف الشخصي
  document.querySelectorAll(".auth-link").forEach(link => {
    if (isLoggedIn === "true") {
      link.textContent = "الملف الشخصي";
      link.href = "profile.html";
    } else {
      link.textContent = "تسجيل الدخول";
      link.href = "login.html";
    }
  });

  // عناصر الفورم المتعددة الخطوات
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("multiForm");
  const LS_KEY = "kemstay_apartment_step";
  let currentStep = 0;

  // استعادة الخطوة المحفوظة
  const savedStep = parseInt(localStorage.getItem(LS_KEY), 10);
  if (!isNaN(savedStep) && savedStep >= 0 && savedStep < steps.length) {
    currentStep = savedStep;
  }

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
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

  nextBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      currentStep++;
      if (currentStep >= steps.length) currentStep = steps.length - 1;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener("click", () => {
    currentStep--;
    if (currentStep < 0) currentStep = 0;
    showStep(currentStep);
  });

  // التعامل مع إرسال الفورم (تحديث الوحدة)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // مثال: جمع بيانات النموذج
    const formData = new FormData(form);
    // يمكنك إضافة جمع بيانات خاصة مثل الخدمات والإتاحة من DOM حسب تصميمك

    // مثال تحديث البيانات في localStorage
    let apartments = JSON.parse(localStorage.getItem("apartmentsList")) || [];
    const apartmentId = localStorage.getItem("unitDataToEditId"); // افترض انك خزنت id هنا

    const index = apartments.findIndex(a => a.id === apartmentId);
    if (index !== -1) {
      apartments[index] = {
        ...apartments[index],
        unit_type: formData.get("unit_type"),
        category: formData.get("category"),
        occupants: formData.get("occupants"),
        furnishStatus: formData.get("furnishStatus"),
        description: formData.get("description"),
        address: formData.get("address"),
        locationLink: formData.get("locationLink"),
        price: formData.get("price"),
        pricingType: formData.get("pricingType"),
        // أكمل الحقول حسب الحاجة مثل availability, services ...
      };
      localStorage.setItem("apartmentsList", JSON.stringify(apartments));
      alert("تم تحديث بيانات الوحدة بنجاح ✅");
      localStorage.removeItem(LS_KEY);
      // توجيه مثلاً لصفحة الشقق أو غيرها
      // window.location.href = "apartments.html";
    } else {
      alert("خطأ: لم يتم العثور على الوحدة للتعديل.");
    }
  });

  showStep(currentStep);

  // دوال الإتاحة والخدمات
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
    button.closest(".availability-group").remove();
  }

  function addService(type, value = "") {
    const listId = type === "available" ? "availableServicesList" : "extraServicesList";
    const list = document.getElementById(listId);
    const div = document.createElement("div");
    div.className = "service-item";
    div.innerHTML = `
      <input type="text" name="${type}Services[]" value="${value}" required>
      <button type="button" onclick="this.parentElement.remove()">🗑️</button>
    `;
    list.appendChild(div);
  }

  // التحقق من صحة تواريخ الإتاحة عند الإرسال
  form.addEventListener("submit", function (e) {
    const fromDates = form.querySelectorAll('input[name="availableFrom[]"]');
    const toDates = form.querySelectorAll('input[name="availableTo[]"]');

    for (let i = 0; i < fromDates.length; i++) {
      const from = new Date(fromDates[i].value);
      const to = new Date(toDates[i].value);
      if (from > to) {
        alert("تاريخ البداية يجب أن يكون قبل تاريخ النهاية في فترة الإتاحة رقم " + (i + 1));
        e.preventDefault();
        return false;
      }
    }
  });

  // تعبئة بيانات الوحدة الموجودة للتعديل
  const unitData = JSON.parse(localStorage.getItem("unitDataToEdit")) || null;
  if (unitData) {
    document.getElementById("unit_type").value = unitData.unit_type || "";
    document.getElementById("category").value = unitData.category || "";
    document.getElementById("occupants").value = unitData.occupants || "";
    if (unitData.furnishStatus) {
      const radio = document.querySelector(`input[name="furnishStatus"][value="${unitData.furnishStatus}"]`);
      if (radio) radio.checked = true;
    }
    document.querySelector("textarea[name='description']").value = unitData.description || "";
    document.getElementById("address").value = unitData.address || "";
    document.getElementById("locationLink").value = unitData.locationLink || "";
    document.getElementById("price").value = unitData.price || "";
    document.getElementById("pricingType").value = unitData.pricingType || "";

    // تعبئة الخدمات المتوفرة والإضافية
    if (unitData.services) {
      unitData.services.available?.forEach(service => addService("available", service));
      unitData.services.extra?.forEach(service => addService("extra", service));
    }

    // تعبئة فترات الإتاحة
    const container = document.getElementById("availabilityContainer");
    container.innerHTML = "";
    unitData.availability?.forEach(period => {
      const group = document.createElement("div");
      group.className = "availability-group";
      group.innerHTML = `
        <div class="form-group">
          <label>متاح من:</label>
          <input type="date" name="availableFrom[]" value="${period.from}" required>
        </div>
        <div class="form-group">
          <label>متاح حتى:</label>
          <input type="date" name="availableTo[]" value="${period.to}" required>
        </div>
        <button type="button" class="remove-btn" onclick="removeAvailability(this)">− حذف</button>
      `;
      container.appendChild(group);
    });
  }

  // ربط أزرار الإضافة مع الدوال
  document.getElementById("addAvailabilityBtn")?.addEventListener("click", addAvailability);
  document.getElementById("addFeatureBtn")?.addEventListener("click", () => addService("extra"));
});
