
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

//الصور
document.getElementById('imageInput').addEventListener('change', function(event) {
  const preview = document.getElementById('preview');
  preview.innerHTML = ""; // مسح الصور السابقة

  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    }

    reader.readAsDataURL(file);
  }
});
