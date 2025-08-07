
  const rejectButtons = document.querySelectorAll(".reject");
  const modal = document.getElementById("rejectionModal");
  const submitBtn = document.getElementById("submitRejection");
  const cancelBtn = document.getElementById("cancelRejection");
  const rejectionText = document.getElementById("rejectionText");

  // الزر اللي ضغط عليه المستخدم
  let currentCard = null;

  rejectButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      currentCard = e.target.closest(".request-card"); // حفظ الكرت الحالي لو حبيت تستخدمه
      modal.classList.remove("hidden");
    });
  });

  // إرسال السبب
  submitBtn.addEventListener("click", () => {
    const reason = rejectionText.value.trim();
    if (reason === "") {
      alert("من فضلك اكتب سبب الرفض.");
      return;
    }

    // هنا ممكن تضيف كود لحفظ السبب
    console.log("سبب الرفض:", reason);

    // إغلاق المودال
    modal.classList.add("hidden");
    rejectionText.value = "";
  });

  // إلغاء
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    rejectionText.value = "";
  });
