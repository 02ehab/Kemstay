function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}


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

localStorage.setItem('addedUnits', JSON.stringify([
  {id: "1", title: "شقة في القاهرة", price: 1500},
  {id: "2", title: "شقة في الإسكندرية", price: 1200}
]));

localStorage.setItem('addedhostels', JSON.stringify([
  {id: "101", title: "فندق النيل", price: 3000},
  {id: "102", title: "فندق الإسكندرية", price: 2800}
]));


// دالة تحميل الوحدات أو الفنادق وعرضها في الحاوية المناسبة
function loadItems(type) {
  // type = 'units' أو 'hotels'
  const storageKey = type === 'units' ? 'addedUnits' : 'addedhostels';
  const containerClass = type === 'units' ? '.units-slider' : '.hostels-slider';

  const container = document.querySelector(containerClass);
  if (!container) return;

  const itemsData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  container.innerHTML = '';

  if (itemsData.length === 0) {
    container.innerHTML = `<p>لا توجد ${type === 'units' ? 'شقق' : 'فنادق'} مضافة حالياً.</p>`;
    return;
  }

  itemsData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'unit-card'; // نفس التنسيق للكارت
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>السعر: ${item.price} جنيه / شهر</p>
      <div class="card-actions">
        <button class="edit-btn" onclick="editItem('${type}', '${item.id}')">✏️ تعديل</button>
        <button class="delete-btn" onclick="deleteItem('${type}', '${item.id}')">🗑️ حذف</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// دالة حذف عنصر (شقة أو فندق)
function deleteItem(type, id) {
  if (!confirm('هل أنت متأكد من حذف هذه الوحدة؟')) return;

  const storageKey = type === 'units' ? 'addedUnits' : 'addedhostels';
  const containerClass = type === 'units' ? '.units-slider' : '.hostels-slider';

  let items = JSON.parse(localStorage.getItem(storageKey) || '[]');
  items = items.filter(item => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(items));

  const container = document.querySelector(containerClass);
  const card = container.querySelector(`.unit-card[data-id="${id}"]`);
  if (card) card.remove();

  if (items.length === 0) {
    container.innerHTML = `<p>لا توجد ${type === 'units' ? 'شقق' : 'فنادق'} مضافة حالياً.</p>`;
  }
}

// دالة تعديل (نفس فكرة الحذف، فقط تنبيه حالياً)
function editItem(type, id) {
  alert(`تعديل ${type === 'units' ? 'الشقة' : 'الفندق'} برقم ${id} غير مفعّل حالياً`);
}

// تحميل الشقق والفنادق عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  loadItems('units');
  loadItems('hotels');
});
