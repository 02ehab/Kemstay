function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

document.getElementById("addUnitForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = this.title.value;
  const description = this.description.value;
  const price = this.price.value;
  const capacity = this.capacity.value;
  const imageFile = this.image.files[0];

  if (!imageFile) {
    alert("يرجى اختيار صورة");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageDataURL = reader.result;

    const unit = {
      title,
      description,
      price,
      capacity,
      image: imageDataURL, // الصورة بصيغة base64
    };

    console.log("الوحدة المُضافة:", unit);
    alert("تمت إضافة الوحدة بنجاح!");
    // هنا ممكن تبعت البيانات لسيرفر أو Firebase
  };

  reader.readAsDataURL(imageFile);
});
//تغيير حالة الدخول
document.addEventListener("DOMContentLoaded", function () {
  const authLinks = document.querySelectorAll(".auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

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

