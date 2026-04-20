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

// signIn JS starts
 const emailEl = document.getElementById('email');
  const pwEl    = document.getElementById('password');
  const fieldEmail = document.getElementById('field-email');
  const fieldPw    = document.getElementById('field-pw');
  const emailErr = document.getElementById('email-err');
  const pwErr    = document.getElementById('pw-err');
  const loginBtn = document.getElementById('login-btn');
  const toast    = document.getElementById('toast');
  let pwVisible  = false;
 
  /* ── Toast ── */
  function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
  }
 
  /* ── Password toggle ── */
  document.getElementById('toggle-pw').addEventListener('click', () => {
    pwVisible = !pwVisible;
    pwEl.type = pwVisible ? 'text' : 'password';
    const eyeIcon = document.getElementById('eye-icon');
    eyeIcon.innerHTML = pwVisible
      ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23" stroke-linecap="round"/>'
      : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  });
 
  /* ── Inline validation on blur ── */
  emailEl.addEventListener('blur', () => validateEmail(emailEl.value.trim()));
  pwEl.addEventListener('blur',    () => validatePw(pwEl.value));
 
  emailEl.addEventListener('input', () => {
    if (fieldEmail.classList.contains('has-error')) validateEmail(emailEl.value.trim());
  });
  pwEl.addEventListener('input', () => {
    if (fieldPw.classList.contains('has-error')) validatePw(pwEl.value);
  });
 
  function validateEmail(val) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    fieldEmail.classList.toggle('has-error', !ok);
    emailErr.classList.toggle('show', !ok);
    return ok;
  }
 
  function validatePw(val) {
    const ok = val.length >= 6;
    fieldPw.classList.toggle('has-error', !ok);
    pwErr.classList.toggle('show', !ok);
    return ok;
  }
 
  /* ── Login ── */
  loginBtn.addEventListener('click', () => {
    const emailOk = validateEmail(emailEl.value.trim());
    const pwOk    = validatePw(pwEl.value);
    if (!emailOk || !pwOk) {
      showToast('Please fix the errors above.', 'error-toast');
      return;
    }
    loginBtn.textContent = 'Signing in';
    loginBtn.classList.add('loading');
    setTimeout(() => {
      loginBtn.classList.remove('loading');
      loginBtn.textContent = 'Login';
      showToast('Signed in successfully!', 'success');
    }, 1800);
  });
 
  /* ── Social ── */
  document.getElementById('google-btn').addEventListener('click', () => showToast('Continuing with Google…'));
  document.getElementById('fb-btn').addEventListener('click',     () => showToast('Continuing with Facebook…'));
  document.getElementById('apple-btn').addEventListener('click',  () => showToast('Continuing with Apple…'));



