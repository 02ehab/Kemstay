// add_apartments.js
import { supabase } from './supabase.js';

function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.querySelectorAll(".auth-link").forEach(link => {
    link.textContent = "الملف الشخصي";
    link.href = "profile.html";
  });

    
// تحقق من حالة تسجيل الدخول من localStorage
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


//وقت تسجيل الدخول يظهر ملفي ويختفي تسجيل الدخول
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const authButtons = document.getElementById("authButtons");
  const sideAuthButtons = document.getElementById("sideAuthButtons");

  const profileLink = document.getElementById("profileLink");
  const profileLinkMobile = document.getElementById("profileLinkMobile");

  if (isLoggedIn) {
    if (authButtons) authButtons.style.display = "none";
    if (sideAuthButtons) sideAuthButtons.style.display = "none";

    if (profileLink) profileLink.style.display = "inline-block";
    if (profileLinkMobile) profileLinkMobile.style.display = "inline-block";
  } else {
    if (authButtons) authButtons.style.display = "flex";
    if (sideAuthButtons) sideAuthButtons.style.display = "flex";

    if (profileLink) profileLink.style.display = "none";
    if (profileLinkMobile) profileLinkMobile.style.display = "none";
  }
});

  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("multiForm");
  const LS_KEY = "kemstay_apartment_step";
  let currentStep = parseInt(localStorage.getItem(LS_KEY)) || 0;

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    if (submitBtn) submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
    if (progressBar) progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
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

  // تعريف دالة nextStep لاستخدامها من HTML
  window.nextStep = function (stepChange) {
    if (stepChange === 1 && !validateStep(currentStep)) return;
    currentStep = Math.min(Math.max(currentStep + stepChange, 0), steps.length - 1);
    showStep(currentStep);
  };

  // رفع الصور إلى Supabase Storage
  async function uploadImages(userId) {
    const imagesInput = document.getElementById("imagesInput");
    const files = imagesInput.files;
    const uploadedUrls = [];

    for (let file of files) {
      const timestamp = Date.now();
      const filePath = `${userId}/${timestamp}_${file.name}`;

      const { error: uploadError } = await supabase
        .storage
        .from('apartments-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error("❌ Storage upload error:", uploadError.message);
        throw uploadError;
      }

      const { data: urlData } = supabase
        .storage
        .from('apartments-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  }

  // عند الضغط على "إضافة"
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) return;

      // تحقق من التواريخ
      let validDates = true;
      document.querySelectorAll(".availability-group").forEach(group => {
        const from = new Date(group.querySelector("input[name='availableFrom[]']").value);
        const to = new Date(group.querySelector("input[name='availableTo[]']").value);
        if (from > to) validDates = false;
      });
      if (!validDates) return alert("تاريخ البداية يجب أن يكون قبل النهاية");

      // رفع الصور
      let uploadedImageUrls = [];
      try {
        uploadedImageUrls = await uploadImages(user.id);
      } catch (err) {
        alert("حدث خطأ أثناء رفع الصور. الرجاء المحاولة مجددًا.");
        return;
      }

      // جمع البيانات
      const data = {
        
        unit_type: document.getElementById("unit_type").value.trim(),
        category: document.getElementById("category").value.trim(),
        occupants: parseInt(document.getElementById("occupants").value) || 1,
        furnish_status: document.querySelector("input[name='furnishStatus']:checked")?.value || '',
        description: document.querySelector("textarea[name='description']").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        street: document.getElementById("street").value.trim(),
        building: document.getElementById("building").value.trim(),
        floor: document.getElementById("floor").value.trim(),
        nearby: document.getElementById("nearby").value.trim(),
        landmark: document.getElementById("landmark").value.trim(),
        location_link: document.getElementById("locationLink").value.trim(),
        price: parseFloat(document.getElementById("price").value) || 0,
        pricing_type: document.getElementById("pricingType").value.trim(),
        services: {
          available: [...document.querySelectorAll("#availableServicesList input")].map(i => i.value.trim()).filter(Boolean),
          extra: [...document.querySelectorAll("#extraServicesList input")].map(i => i.value.trim()).filter(Boolean),
          owner: [...document.querySelectorAll("#ownerConditionsList input")].map(i => i.value.trim()).filter(Boolean),
        },
        availability: [...document.querySelectorAll(".availability-group")].map(group => ({
          from: group.querySelector("input[name='availableFrom[]']").value,
          to: group.querySelector("input[name='availableTo[]']").value,
        })),
        images: uploadedImageUrls,
        user_id: user.id,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase.from('apartments').insert(data);
      if (error) {
        console.error("❌ Error saving:", error.message);
        alert("حدث خطأ أثناء الحفظ.");
        return;
      }

      localStorage.removeItem(LS_KEY);
      alert("تمت إضافة الوحدة بنجاح!");
      window.location.href = "thanks.html";
    });
  }

  showStep(currentStep);

  // إضافة خدمة
  window.addService = function (type) {
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

  // إضافة فترة إتاحة
  window.addAvailability = function () {
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

  // حذف فترة الإتاحة
  window.removeAvailability = function (button) {
    const group = button.closest(".availability-group");
    group.remove();
  };
});
