function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}


// صفحة تفاصيل الوحدة وحجز وهمي
document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريبًا.");
    });
  }
});


//تغيير حالة تسجيل الدخول
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

document.addEventListener("DOMContentLoaded", function () {
    // إضافة ميزة جديدة
    const featuresSection = document.querySelector('h4:contains("المميزات")').nextElementSibling;
    const featureInput = featuresSection.querySelector('input');
    const featureBtn = featuresSection.querySelector('button');

    featureBtn.addEventListener("click", () => {
      const value = featureInput.value.trim();
      if (value !== "") {
        const newFeature = document.createElement("p");
        newFeature.textContent = "• " + value;
        featuresSection.parentElement.insertBefore(newFeature, featuresSection.nextElementSibling);
        featureInput.value = "";
      }
    });

    // إضافة شروط المالك
    const ownerRulesSection = document.querySelector(".col .row-2 + label");
    const ownerConditionInput = document.querySelector('.col .row-2 input');
    const addOwnerConditionBtn = document.querySelector('.col .row-2 button');

    addOwnerConditionBtn.addEventListener("click", () => {
      const value = ownerConditionInput.value.trim();
      if (value !== "") {
        const existingTextArea = ownerRulesSection.querySelector("textarea");
        existingTextArea.value += (existingTextArea.value ? "\n• " : "• ") + value;
        ownerConditionInput.value = "";
      }
    });

    // إضافة فترة توافر جديدة
    const availabilitySection = document.querySelector('h4:contains("التوافر")').nextElementSibling;
    const availabilityBtn = availabilitySection.querySelector("button");

    availabilityBtn.addEventListener("click", () => {
      const newRow = document.createElement("div");
      newRow.classList.add("row-3");
      newRow.innerHTML = `
        <input type="date" placeholder="متاح من">
        <input type="date" placeholder="متاح إلى">
        <button type="button" class="remove">－</button>
      `;
      availabilitySection.parentElement.insertBefore(newRow, availabilitySection.nextElementSibling);

      // زر الحذف
      newRow.querySelector("button").addEventListener("click", () => {
        newRow.remove();
      });
    });

    // المعاينة المستقبلية لصورة — Placeholder فقط إذا أضفت خاصية رفع الصور لاحقًا
    const uploadMain = document.querySelector(".upload-main");
    uploadMain.addEventListener("click", () => {
      alert("سيتم هنا إضافة رفع صورة عند الحاجة.");
    });
  });
