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

// trusted part
const imgs  = document.querySelectorAll('.slide-img');
  const dots  = document.querySelectorAll('.dot');
  let current = 0;
  let timer;
 
  function goTo(idx) {
    imgs[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    imgs[current].classList.add('active');
    dots[current].classList.add('active');
    clearInterval(timer);
    startAuto();
  }
 
  function next() {
    goTo((current + 1) % imgs.length);
  }
 
  function startAuto() {
    timer = setInterval(next, 3500);
  }
 
  startAuto();
// end of trusterd part 

// why chooes uss part starts
/* ── Counter Animation ── */
function animateCounter(el){
  const target=parseInt(el.dataset.target,10);
  const duration=2000;
  const step=target/( duration/16);
  let current=0;
  const timer=setInterval(()=>{
    current+=step;
    if(current>=target){current=target;clearInterval(timer)}
    el.textContent=Math.floor(current).toLocaleString();
  },16);
}
 
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.counter').forEach(animateCounter);
      io.disconnect();
    }
  });
},{threshold:.3});
const statsRow=document.querySelector('.stats-row');
if(statsRow)io.observe(statsRow);
// why chooes us end

// feedback starts
  $('.testimonial-slider').owlCarousel({
loop:true,
margin:20,
autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause:false,
dots:false,
nav:false,

smartSpeed:800,        
autoplaySpeed:800, 

responsive:{
0:{items:1},
768:{items:2},
992:{items:3}
}
});
// feedback ends
// our team starts
$(document).ready(function(){
  var owl = $("#teamCarousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 700,
    animateOut: 'fadeOut',
    navText: [
      '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
      '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'
    ],
    responsive: {
      0: {
        items: 2,
        margin: 10,
        nav: false,
        dots: true
      },
      576: {
        items: 2,
        margin: 12
      },
      768: {
        items: 3,
        margin: 14
      },
      992: {
        items: 4,
        margin: 16
      }
    }
  });
});
// our team ends