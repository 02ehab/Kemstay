document.getElementById("addUnitForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const unitData = {
        title: this.title.value.trim(),
        description: this.description.value.trim(),
        price: Number(this.price.value),
        capacity: Number(this.capacity.value),
        imageUrl: this.imageUrl.value.trim(),
      };

      // هنا تقدر ترسل البيانات لـ API أو تخزنها محلياً
      console.log("تم إضافة الوحدة:", unitData);

      alert("تمت إضافة الوحدة بنجاح!");

      this.reset(); // إعادة ضبط الفورم
    });