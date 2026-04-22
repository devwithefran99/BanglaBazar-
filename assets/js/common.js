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

/* ═══════════════════════════════════════════════
   NAVBAR ACTIVE PAGE DETECTOR
   তোমার existing navbar design এর সাথে মিলিয়ে বানানো
   ═══════════════════════════════════════════════ */

(function () {
  // বর্তমান page এর filename বের করো
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  /* ─── DESKTOP NAVBAR ─── */
  const desktopLinks = document.querySelectorAll(".main-navbar .nav-link");

  desktopLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");

      // parent dropdown থাকলে সেটাও highlight করো
      const parentDropdown = link.closest(".dropdown-custom");
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector(
          ":scope > .nav-link"
        );
        if (parentLink) parentLink.classList.add("active");
      }
    }
  });

  /* ─── DESKTOP SUBMENU ─── */
  const submenuLinks = document.querySelectorAll(".submenu li a");

  submenuLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      // submenu item টাকে active style দাও
      link.classList.add("submenu-active");

      // parent dropdown trigger কেও active করো
      const parentDropdown = link.closest(".dropdown-custom");
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector(":scope > .nav-link");
        if (parentLink) parentLink.classList.add("active");
      }
    }
  });

  /* ─── MOBILE OFFCANVAS ─── */
  const mobileLinks = document.querySelectorAll(
    ".offcanvas-body .nav-link, .mobile-submenu li a"
  );

  mobileLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("mobile-active");

      // mobile submenu item হলে parent open রাখো
      const parentMobileItem = link.closest(".mobile-menu-item");
      if (parentMobileItem) {
        parentMobileItem.classList.add("active");
      }
    }
  });

  /* ─── MOBILE DROPDOWN TOGGLE ─── */
  const mobileToggles = document.querySelectorAll(".mobile-toggle");

  mobileToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parent = this.closest(".mobile-menu-item");
      parent.classList.toggle("active");
    });
  });
})();
//   nav bar js ends

// dropdown submenu 
document.querySelectorAll('.mobile-toggle').forEach(item => {
    item.addEventListener('click', function () {
      this.parentElement.classList.toggle('active');
    });
  });
// dropdown submenu ends




// add to cart js
(function () {
  const drawer  = document.getElementById('cpDrawer');
  const overlay = document.getElementById('cpOverlay');
  const closeBtn = document.getElementById('cpClose');
 
  /* open */
  function cpOpen() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
 
  /* close */
  function cpClose() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
 
  /* ── bind ALL cart trigger elements ── */
  /* Works with: id="cartTrigger", class="cart-btn", class="icon-btn" containing bi-bag */
  function bindTriggers() {
    const selectors = [
      '#cartTrigger',
      '.cart-btn',
      '.icon-btn'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        /* only bind icon-btn if it contains a bag icon */
        if (sel === '.icon-btn' && !el.querySelector('.bi-bag, .bi-bag-fill')) return;
        el.addEventListener('click', function (e) {
          e.preventDefault();
          cpOpen();
        });
      });
    });
  }
 
  /* close on overlay click */
  overlay.addEventListener('click', cpClose);
  closeBtn.addEventListener('click', cpClose);
 
  /* close on Escape */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cpClose(); });
 
  /* remove item */
  window.cpRemoveItem = function (btn) {
    const item = btn.closest('.cp-item');
    item.classList.add('removing');
    setTimeout(() => {
      item.remove();
      cpUpdateState();
    }, 220);
  };
 
  /* update count + total + empty state */
  function cpUpdateState() {
    const items = document.querySelectorAll('#cpItems .cp-item');
    const count = items.length;
 
    document.getElementById('cpCount').textContent = count;
    document.getElementById('cpProductCount').textContent = count + ' Product';
 
    /* recalc total from meta text (format: "X kg × $Y.00") */
    let total = 0;
    items.forEach(item => {
      const meta = item.querySelector('.cp-item-meta strong');
      if (meta) {
        const val = parseFloat(meta.textContent.replace('$', ''));
        if (!isNaN(val)) total += val;
      }
    });
    document.getElementById('cpTotal').textContent = '$' + total.toFixed(2);
 
    /* toggle empty state */
    const empty  = document.getElementById('cpEmpty');
    const footer = document.getElementById('cpFooter');
    const itemsEl = document.getElementById('cpItems');
    if (count === 0) {
      itemsEl.style.display = 'none';
      empty.style.display = 'flex';
      footer.style.display = 'none';
    } else {
      itemsEl.style.display = '';
      empty.style.display = 'none';
      footer.style.display = '';
    }
  }
 
  /* init after DOM ready */
  document.addEventListener('DOMContentLoaded', bindTriggers);
  /* also bind immediately in case DOMContentLoaded already fired */
  bindTriggers();
})();
// add to cart js
// footer js starts
// Intersection Observer for scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.15 });
 
  document.querySelectorAll('.anim-fade-up, .anim-fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
// footer js starts

// eye popup js

(function () {
  const backdrop = document.getElementById('qvBackdrop');

  document.addEventListener('click', function (e) {
    const eyeBtn = e.target.closest('button[title="Quick View"]');
    if (!eyeBtn) return;
    e.stopPropagation();

  const card = eyeBtn.closest('.product-card, .hotProduct-card, .slider-product, .featured-card');
    if (!card) return;

    document.getElementById('qvImg').src = card.querySelector('.product-img-wrap img')?.src || '';
    document.getElementById('qvTitle').textContent = card.querySelector('.product-name')?.textContent.trim() || '';
    document.getElementById('qvPrice').textContent = card.querySelector('.price-main')?.textContent.trim() || '';
    document.getElementById('qvOld').textContent = card.querySelector('.price-old')?.textContent.trim() || '';

    const badge = card.querySelector('.sale-badge');
    const discEl = document.getElementById('qvDiscount');
    discEl.textContent = badge ? badge.textContent.trim() : '';
    discEl.style.display = badge ? 'inline-block' : 'none';

    document.getElementById('qvCat').textContent = card.dataset.category || 'Fresh Produce';
    document.getElementById('qvDesc').textContent = card.dataset.desc || 'Fresh, naturally grown product. Perfect for everyday cooking.';
    document.getElementById('qvQty').value = 1;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeQV() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('qvClose').addEventListener('click', closeQV);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeQV(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQV(); });

  document.getElementById('qvMinus').addEventListener('click', () => {
    const i = document.getElementById('qvQty');
    if (+i.value > 1) i.value = +i.value - 1;
  });
  document.getElementById('qvPlus').addEventListener('click', () => {
    const i = document.getElementById('qvQty');
    if (+i.value < 99) i.value = +i.value + 1;
  });
})();
// end eye pop us js 
