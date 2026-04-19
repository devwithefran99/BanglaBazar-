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

// wishlist JS
 let toastTimer;
  function showToast(msg) {
    const wrap = document.getElementById('toastWrap');
    const el   = document.getElementById('toastMsg');
    el.textContent = msg;
    wrap.style.display = 'block';
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'slideUp 0.3s ease';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { wrap.style.display = 'none'; }, 2800);
  }
 
  function removeCard(id) {
    const card = document.getElementById(id);
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    setTimeout(() => card.remove(), 300);
    showToast('🗑 Item removed from wishlist');
  }

// wishlist JS  

// CheckOut JS starts ////

let qty = 1;

function changeQty(d) {
  const next = qty + d;
  if (next < 1) {
    showToast('Minimum quantity is 1');
    return;
  }
  qty = next;
  document.getElementById('qtyNum').textContent = qty;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2500);
}

function addToCart() {
  showToast('✓ Added ' + qty + ' item(s) to cart');
}

function buyNow() {
  document.getElementById('modalMsg').innerHTML = 'You\'re ordering <strong>' + qty + ' × Chinese Cabbage</strong>. Choose your payment method:';
  document.getElementById('buyModal').classList.add('open');
}

function closeModal() {
  document.getElementById('buyModal').classList.remove('open');
}

function confirmOrder() {
  const pay = document.querySelector('input[name="pay"]:checked').value;
  closeModal();
  showToast('🎉 Order placed via ' + (pay === 'cod' ? 'Cash on Delivery' : 'bKash') + '!');
}

document.getElementById('thumbs').querySelectorAll('.pd-thumb').forEach((th) => {
  th.addEventListener('click', () => {
    document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
    th.classList.add('active');
    const src = th.querySelector('img').src;
    document.getElementById('mainImg').src = src;
  });
});

document.getElementById('buyModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// details cheackout starts
function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}
// details checkout ends