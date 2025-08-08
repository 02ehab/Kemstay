function openMenu() {
      document.getElementById("sideMenu")?.classList.add("open");
    }

    function closeMenu() {
      document.getElementById("sideMenu")?.classList.remove("open");
    }

    function printInvoice(bookingId) {
      window.location.href = `invoice.html?bookingId=${bookingId}`;
    }
