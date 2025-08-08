 import { supabase } from './supabase.js';

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userFields = document.getElementById('userFields');
    const accountTypeSelect = document.getElementById("accountType");
    const kycFields = document.getElementById("kyc-fields");

    window.toggleForm = function () {
      loginForm.classList.toggle('hidden');
      registerForm.classList.toggle('hidden');
    };

    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("❌ فشل: " + error.message);
      } else {
        const user = data.user;
        const userType = user.user_metadata?.accountType || "guest";
        const profileName = user.user_metadata?.name || "اسم غير معروف";
        const profileCity = user.user_metadata?.governorate || "غير محددة";
        const joinDate = user.created_at ? user.created_at.split("T")[0] : "غير محدد";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("profileName", profileName);
        localStorage.setItem("profileCity", profileCity);
        localStorage.setItem("joinDate", joinDate);
        localStorage.setItem("userType", userType);

        switch (userType.toLowerCase()) {
          case "renter":
            window.location.href = "tenant_profile.html";
            break;
          case "owner":
            window.location.href = "landlord_profile.html";
            break;
          case "broker":
            window.location.href = "broker_profile.html";
            break;
          default:
            window.location.href = "profile.html";
        }
      }
    });

    accountTypeSelect.addEventListener("change", () => {
      const selected = accountTypeSelect.value;
      const isKYC = selected === "owner" || selected === "broker";

      kycFields.style.display = isKYC ? "block" : "none";
      document.getElementById("nationalId").required = isKYC;
      document.getElementById("idCardFront").required = isKYC;
      document.getElementById("idCardBack").required = isKYC;
      document.getElementById("birthdate").required = isKYC;

      userFields.disabled = !selected;
    });

    registerForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const name = document.getElementById('fullname').value;
      const governorate = document.getElementById('governorate').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const accountType = document.getElementById('accountType').value;

      const metadata = { name, governorate, phone, accountType };

      if (accountType === "owner" || accountType === "broker") {
        metadata.nationalId = document.getElementById("nationalId").value;
        metadata.birthdate = document.getElementById("birthdate").value;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        alert("❌ فشل التسجيل: " + error.message);
      } else {
        alert("✅ تم التسجيل! تحقق من بريدك الإلكتروني.");
        // إعادة التوجيه حسب نوع الحساب مباشرة بعد التسجيل
        switch (accountType) {
          case "renter":
            window.location.href = "tenant_profile.html";
            break;
          case "owner":
            window.location.href = "landlord_profile.html";
            break;
          case "broker":
            window.location.href = "broker_profile.html";
            break;
          default:
            window.location.href = "index.html";
        }
      }
    });

    document.getElementById("forgot-password-link")?.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "reset_password.html";
    });
