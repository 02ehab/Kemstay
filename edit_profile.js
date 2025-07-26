function openMenu() {
  document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("open");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
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

// التحقق من حالة تسجيل الدخول قبل الانتقال إلى صفحات محمية
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // اختار كل الروابط باستثناء تسجيل الدخول أو الرئيسية
  const protectedLinks = document.querySelectorAll("a:not([href*='login']):not([href='index.html'])");

  protectedLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (!isLoggedIn) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  });
});

const profileImageInput = document.getElementById('profileImageInput');
const profileImg = document.querySelector('.profile-img');

if (profileImageInput && profileImg) {
  profileImageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

function saveProfile(event) {
  event.preventDefault();

  // Get form elements
  const profileImg = document.querySelector('.profile-img');
  const nameInput = document.querySelector('input[type="text"][placeholder="الاسم"]');
  const emailInput = document.querySelector('input[type="email"][placeholder="البريد الإلكتروني"]');
  const cityInput = document.querySelector('input[type="text"][placeholder="المدينة"]');
  const userTypeSelect = document.querySelector('select');

  // Save profile image src (base64 or url)
  const profileImageSrc = profileImg.src;

  // Save data to localStorage
  const profileData = {
    image: profileImageSrc,
    name: nameInput.value,
    email: emailInput.value,
    city: cityInput.value,
    userType: userTypeSelect.value,
    joinDate: "يناير 2025" // static as in form, or could be dynamic if needed
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));

  // Redirect to profile page
  window.location.href = "profile.html";
}
