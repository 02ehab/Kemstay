function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  // زر الحجز الوهمي
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }

  // تغيير حالة تسجيل الدخول بناءً على localStorage
  const authLinks = document.querySelectorAll(".auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (authLinks.length > 0) {
    authLinks.forEach(link => {
      if (isLoggedIn === "true") {
        link.textContent = "الملف الشخصي";
        link.href = "profile.html";
      } else {
        link.textContent = "تسجيل الدخول";
        link.href = "login.html";
      }
    });
  }

  // منطقة رفع الصورة مع عرض المعاينة
  const uploadArea = document.querySelector(".upload-main");
  if (uploadArea) {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.hidden = true;

    const imagePreview = document.createElement("img");
    imagePreview.style.display = "none";
    imagePreview.style.marginTop = "1rem";
    imagePreview.style.maxWidth = "100%";

    uploadArea.appendChild(imageInput);
    uploadArea.appendChild(imagePreview);

    uploadArea.style.cursor = "pointer";
    uploadArea.addEventListener("click", () => {
      imageInput.click();
    });

    imageInput.addEventListener("change", () => {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // أزرار + لإضافة حقول جديدة (تكرر الحقول داخل نفس الأب)
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      const firstInput = parent.querySelector("input");
      if (firstInput) {
        const clone = firstInput.cloneNode(true);
        clone.value = "";
        parent.insertBefore(clone, btn);
      }
    });
  });

  // التحقق من الموافقة على الشروط قبل الإرسال
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      const agreement = form.querySelector('input[type="checkbox"][required]');
      if (agreement && !agreement.checked) {
        e.preventDefault();
        alert("يجب الموافقة على الشروط والأحكام قبل إرسال النموذج.");
      }
    });
  }
});

// دوال إضافة وحذف المميزات والشروط والقائمة

function addFeature() {
  const input = document.getElementById("featureInput");
  const value = input?.value.trim();
  if (value) {
    const li = document.createElement("li");
    li.innerHTML = `${value} <button class="remove" onclick="this.parentElement.remove()">×</button>`;
    document.getElementById("featuresList").appendChild(li);
    input.value = "";
  }
}

function addRule() {
  const input = document.getElementById("ruleInput");
  const value = input?.value.trim();
  if (value) {
    const li = document.createElement("li");
    li.innerHTML = `${value} <button class="remove" onclick="this.parentElement.remove()">×</button>`;
    document.getElementById("rulesList").appendChild(li);
    input.value = "";
  }
}

function addAvailability() {
  const from = document.getElementById("availableFrom")?.value;
  const to = document.getElementById("availableTo")?.value;

  if (from && to) {
    const li = document.createElement("li");
    li.textContent = `من ${from} إلى ${to}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.innerHTML = "×";
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    document.getElementById("availabilityList").appendChild(li);

    document.getElementById("availableFrom").value = "";
    document.getElementById("availableTo").value = "";
  }
}

function addOwnerCondition() {
  const input = document.getElementById("ownerConditionInput");
  const value = input?.value.trim();

  if (value) {
    const li = document.createElement("li");
    li.textContent = value;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.innerHTML = "×";
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    document.getElementById("ownerConditionsList").appendChild(li);
    input.value = "";
  }
}


// جلب بيانات الوحدة من localStorage (أو Firebase)
document.addEventListener("DOMContentLoaded", function () {
  const apartmentData = JSON.parse(localStorage.getItem("selectedApartment")); // أو جلب من id

  if (apartmentData) {
    document.getElementById("type").value = apartmentData.type;
    document.getElementById("category").value = apartmentData.category;
    document.getElementById("people").value = apartmentData.people;
    document.getElementById("furnished").checked = apartmentData.furnished;
    document.getElementById("description").value = apartmentData.description;
    document.getElementById("address").value = apartmentData.address;

    // خصائص إضافية حسب تصميمك
    // مثل تعبئة المميزات أو التواريخ
  }
});

// عند الضغط على "تعديل الوحدة"
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedApartment = {
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    people: document.getElementById("people").value,
    furnished: document.getElementById("furnished").checked,
    description: document.getElementById("description").value,
    address: document.getElementById("address").value,
    // أضف أي حقول إضافية
  };

  // حفظ التعديل في localStorage (أو أرسله لـ Firebase)
  localStorage.setItem("selectedApartment", JSON.stringify(updatedApartment));

  alert("تم تعديل بيانات الوحدة بنجاح");
  window.location.href = "add_apartments.html"; // رجوع للصفحة الرئيسية أو قائمة الوحدات
});

function goToEditPage(apartment) {
  localStorage.setItem("selectedApartment", JSON.stringify(apartment));
  window.location.href = "edit_apartments.html";
}
