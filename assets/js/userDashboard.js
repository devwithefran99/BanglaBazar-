

// preloader js
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  
  // ১ সেকেন্ড পর preloader hide করবে (তুমি চাইলে সময় বাড়াতে বা কমাতে পারো)
  setTimeout(() => {
    preloader.classList.add('fade-out');   // ← এটা আমার CSS এর class
    
    // অ্যানিমেশন শেষ হলে DOM থেকে সরিয়ে ফেলবে (performance ভালো থাকবে)
    setTimeout(() => {
      preloader.style.display = 'none';
      preloader.remove();        // optional - পুরোপুরি remove
    }, 800);
  }, 1200);   // 1200ms = 1.2 সেকেন্ড (সুন্দর লাগে)
});
// preloader js ends

// navbar js
document.querySelectorAll('.main-navbar .nav-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = `opacity .3s ease ${i * 60}ms, transform .3s ease ${i * 60}ms`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });

//   nav bar js ends

// dropdown submenu 
document.querySelectorAll('.mobile-toggle').forEach(item => {
    item.addEventListener('click', function () {
      this.parentElement.classList.toggle('active');
    });
  });
// dropdown submenu ends


// userDashboard js starts
// Toggle Sidebar for Mobile
   function editProfile() {
        alert('Profile Edit - Coming Soon 🔥');
    }

    function editAddress() {
        alert('Address Updated!');
    }

    function viewAllOrders() {
        alert('All Orders Page');
    }

    // Offcanvas auto close logic (optional, Bootstrap নিজেই ভালো কাজ করে)
    const offcanvasEl = document.getElementById('dashboardSidebar');
    const offcanvas = new bootstrap.Offcanvas(offcanvasEl);

    // Main content এ ক্লিক করলে mobile এ offcanvas বন্ধ হয়ে যাবে
    document.querySelector('.flex-grow-1').addEventListener('click', () => {
        if (window.innerWidth < 768) {
            offcanvas.hide();
        }
    });
// userDashboard js ends

