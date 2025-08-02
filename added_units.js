function openMenu() {
  document.getElementById("sideMenu")?.classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUserId = localStorage.getItem("currentUserId");

  // تحديث روابط auth-link
  document.querySelectorAll(".auth-link").forEach(link => {
    link.textContent = isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول";
    link.href = isLoggedIn ? "profile.html" : "login.html";
  });

  // التحكم في عرض الأزرار حسب حالة تسجيل الدخول
  const toggleDisplay = (el, showStyle) => {
    if (el) el.style.display = showStyle;
  };

  toggleDisplay(document.getElementById("authButtons"), isLoggedIn ? "none" : "flex");
  toggleDisplay(document.getElementById("sideAuthButtons"), isLoggedIn ? "none" : "flex");
  toggleDisplay(document.getElementById("profileLink"), isLoggedIn ? "inline-block" : "none");
  toggleDisplay(document.getElementById("profileLinkMobile"), isLoggedIn ? "inline-block" : "none");

  // منع الدخول للصفحات المحمية
  const protectedLinks = document.querySelectorAll("a:not([href*='login']):not([href='index.html'])");
  protectedLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });

  // منع دخول الصفحة نفسها إذا كانت محمية (مثل صفحة تعديل/إضافة وحدات)
  const protectedPage = document.body.dataset.requireLogin === "true";
  if (protectedPage && !isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  // تحميل العناصر
  loadItems('hotels');
  loadItems('units');

  // عرض الشقق الخاصة بالمستخدم الحالي فقط (added_units_container)
  const apartments = JSON.parse(localStorage.getItem("allApartments") || "[]");
  const myApartments = apartments.filter(a => a.userId === currentUserId);

  const addedUnitsContainer = document.querySelector(".added-units-container");
  if (addedUnitsContainer) {
    addedUnitsContainer.innerHTML = "";

    if (myApartments.length === 0) {
      addedUnitsContainer.innerHTML = "<p>لا توجد شقق مضافة حالياً.</p>";
    } else {
      myApartments.forEach(apartment => {
        const card = document.createElement("div");
        card.className = "apartment-card";
        card.setAttribute("data-id", apartment.id);

        card.innerHTML = `
          <img src="${apartment.images?.[0] || 'default.jpg'}" alt="${apartment.title || apartment.type || 'شقة'}" />
          <h3>${apartment.title || apartment.type || 'شقة'}</h3>
          <p>السعر: ${apartment.price} جنيه</p>
          <p>الموقع: ${apartment.address || apartment.location || ''}</p>
          <div class="card-actions">
            <button class="edit-btn">✏️ تعديل</button>
            <button class="delete-btn">🗑️ حذف</button>
          </div>
        `;

        // تعديل
        card.querySelector('.edit-btn').addEventListener('click', () => {
          localStorage.setItem("unitDataToEdit", JSON.stringify(apartment));
          localStorage.setItem("unitDataToEditId", apartment.id);
          window.location.href = 'edit_apartments.html';
        });

        // حذف
        card.querySelector('.delete-btn').addEventListener('click', () => {
          if (confirm('هل أنت متأكد من حذف هذه الوحدة؟')) {
            const updated = apartments.filter(a => a.id !== apartment.id);
            localStorage.setItem("allApartments", JSON.stringify(updated));
            card.remove();
            if (!addedUnitsContainer.querySelector(".apartment-card")) {
              addedUnitsContainer.innerHTML = "<p>لا توجد شقق مضافة حالياً.</p>";
            }
          }
        });

        addedUnitsContainer.appendChild(card);
      });
    }
  }
});

// دالة عامة لتحميل وعرض الوحدات أو الفنادق
function loadItems(type) {
  const storageKey = type === 'units' ? 'allApartments' : 'addedhostels';
  const containerSelector = type === 'units' ? '.units-slider' : '.hostels-slider';
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p>لا توجد ${type === 'units' ? 'شقق' : 'فنادق'} مضافة حالياً.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <img src="${item.images?.[0] || 'default.jpg'}" alt="${item.title || item.type || 'وحدة'}" />
      <h3>${item.title || item.type || 'وحدة'}</h3>
      <p>السعر: ${item.price} جنيه / ${item.pricingType || "شهريًا"}</p>
      <div class="card-actions">
        <button class="edit-btn">✏️ تعديل</button>
        <button class="delete-btn">🗑️ حذف</button>
      </div>
    `;

    card.querySelector('.edit-btn').addEventListener('click', () => {
      if (type === 'units') {
        localStorage.setItem("unitDataToEdit", JSON.stringify(item));
        localStorage.setItem("unitDataToEditId", item.id);
        window.location.href = 'edit_apartments.html';
      } else {
        window.location.href = 'edit_hostels.html';
      }
    });

    card.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm("هل أنت متأكد من حذف هذه الوحدة؟")) {
        let updated = items.filter(i => i.id !== item.id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        card.remove();
        if (!container.querySelector(".unit-card")) {
          container.innerHTML = `<p>لا توجد ${type === 'units' ? 'شقق' : 'فنادق'} مضافة حالياً.</p>`;
        }
      }
    });

    container.appendChild(card);
  });
}
