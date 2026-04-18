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

// form part starts
function handleSend() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    const msg = document.getElementById('successMsg');
    msg.classList.add('show');
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmessage').value = '';
    document.getElementById('fsubject').value = '';
    setTimeout(() => msg.classList.remove('show'), 3500);
  }
 
  function toggleMapEdit() {
    const row = document.getElementById('mapInputRow');
    row.classList.toggle('open');
  }
 
  function applyMap() {
    const input = document.getElementById('mapEmbedInput').value.trim();
    if (!input) { alert('Please paste the embed URL.'); return; }
    const src = input.includes('<iframe') ? input.match(/src="([^"]+)"/)?.[1] : input;
    if (!src) { alert('Invalid URL. Copy only the src value from the iframe.'); return; }
    document.getElementById('mapFrame').src = src;
    document.getElementById('mapInputRow').classList.remove('open');
    document.getElementById('mapEmbedInput').value = '';
  }