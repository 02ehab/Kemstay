function openMenu() {
  document.getElementById("sideMenu")?.classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // تحديث الروابط حسب حالة تسجيل الدخول
  const authLinks = document.querySelectorAll(".auth-link");
  authLinks.forEach(link => {
    link.textContent = isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول";
    link.href = isLoggedIn ? "profile.html" : "login.html";
  });

  // إظهار/إخفاء الأزرار حسب تسجيل الدخول
  const authButtons = document.getElementById("authButtons");
  const sideAuthButtons = document.getElementById("sideAuthButtons");
  const profileLink = document.getElementById("profileLink");
  const profileLinkMobile = document.getElementById("profileLinkMobile");

  if (isLoggedIn) {
    authButtons?.style.setProperty("display", "none");
    sideAuthButtons?.style.setProperty("display", "none");
    profileLink?.style.setProperty("display", "inline-block");
    profileLinkMobile?.style.setProperty("display", "inline-block");
  } else {
    authButtons?.style.setProperty("display", "flex");
    sideAuthButtons?.style.setProperty("display", "flex");
    profileLink?.style.setProperty("display", "none");
    profileLinkMobile?.style.setProperty("display", "none");
  }

  // منع الوصول لروابط محمية
  const protectedLinks = document.querySelectorAll("a:not([href*='login']):not([href='index.html'])");
  protectedLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });

  // معاينة الصور
  document.querySelector('input[name="images"]')?.addEventListener('change', function (e) {
    const preview = document.getElementById('hotelImagesPreview');
    preview.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = function (ev) {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.style.cssText = 'width:80px; margin:5px; border-radius:8px';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  // التحقق من التواريخ
  document.querySelector("form")?.addEventListener("submit", function (e) {
    const from = new Date(document.getElementById("availableFrom")?.value);
    const to = new Date(document.getElementById("availableTo")?.value);
    if (from > to) {
      alert("تاريخ البداية يجب أن يكون قبل تاريخ النهاية");
      e.preventDefault();
    }
  });

  // تفعيل زر إزالة الغرفة
  document.querySelectorAll('.removeRoomBtn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.parentElement.remove();
    });
  });

  // نموذج متعدد الخطوات
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("hotelForm") || document.getElementById("multiForm");
  const LS_KEY = "kemstay_hotel_step";
  let currentStep = parseInt(localStorage.getItem(LS_KEY)) || 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });
    if (progressBar) progressBar.style.width = ((index + 1) / steps.length) * 100 + "%";
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
    if (submitBtn) submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
    localStorage.setItem(LS_KEY, index);
  }

  function validateStep(index) {
    const inputs = steps[index].querySelectorAll("input, select, textarea");
    for (let input of inputs) {
      if (input.required && !input.value) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return false;
      }
    }
    return true;
  }

  nextBtn?.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      showStep(currentStep);
    }
  });

  prevBtn?.addEventListener("click", () => {
    currentStep = Math.max(currentStep - 1, 0);
    showStep(currentStep);
  });

form?.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const formData = new FormData(form);
      const hostel = {
        id: Date.now(),
        name: formData.get("name"),
        rooms: formData.get("rooms"),
        category: formData.get("category"),
        description: formData.get("description"),
        address: formData.get("address"),
        governorate: formData.get("city"),
        building: formData.get("building"),
        floor: formData.get("floor"),
        nearby: formData.get("nearby"),
        landmark: formData.get("landmark"),
        locationLink: formData.get("locationLink"),
        image: "home.jpg", // placeholder for single image property expected by hostels.js
        price: formData.get("price") || "غير محدد",
        title: formData.get("name")
      };
      const hostels = JSON.parse(localStorage.getItem("hostels") || "[]");
      hostels.push(hostel);
      localStorage.setItem("hostels", JSON.stringify(hostels));
      localStorage.removeItem(LS_KEY);
      window.location.href = "thanks.html";
    }
  });
//اضافة غرفة
let roomIndex = 1;
document.getElementById('addRoomBtn')?.addEventListener('click', () => {
  const container = document.getElementById('roomsContainer');
  const newRoomDiv = document.createElement('div');
  newRoomDiv.classList.add('room-group');

  newRoomDiv.innerHTML = `
    <label>نوع الغرفة:</label>
    <select name="room_type[]" required>
      <option value="">اختر نوع الغرفة</option>
      <option value="single">غرفة فردية</option>
      <option value="double">غرفة مزدوجة</option>
      <option value="suite">جناح</option>
      <option value="family">غرفة عائلية</option>
    </select>

    <label>صور الغرفة:</label>
    <input type="file" name="room_images_${roomIndex}[]" multiple accept="image/*" required>

    <!-- ✅ الحقول الجديدة -->
    <label>السعر لليلة:</label>
    <input type="number" name="room_price[]" min="0" placeholder="مثال: 400" required>

    <label>عدد الأسرة:</label>
    <input type="number" name="room_beds[]" min="1" placeholder="مثال: 2" required>

    <button type="button" class="removeRoomBtn">− إزالة غرفة</button>
  `;

  container.appendChild(newRoomDiv);

  // تفعيل زر الإزالة
  newRoomDiv.querySelector('.removeRoomBtn').addEventListener('click', () => newRoomDiv.remove());

  roomIndex++;
});


// إضافة خدمة
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

  const target = {
    available: 'availableServicesList',
    breakfast: 'breakfastServicesList',
    extra: 'extraServicesList'
  }[type];
  document.getElementById(target)?.appendChild(container);
}

// إضافة الاتاحية
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
  button.closest(".availability-group")?.remove();
}
});

