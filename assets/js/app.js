// preloader js
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  
  // ১-২ সেকেন্ড পর অথবা পুরোপুরি লোড হলে লুকাবে
  setTimeout(() => {
    preloader.style.opacity = '0';
    
    // অ্যানিমেশন শেষ হলে পুরোপুরি remove
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }, 1500);   // এখানে সময় চেঞ্জ করতে পারো
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

// hero js down
$(document).ready(function(){

  let current = 0;
  let slides = $(".slide");
  let total = slides.length;

  function showSlide(index){
    slides.removeClass("active");
    slides.eq(index).addClass("active");
  }

  $(".slider-next").click(function(){
    current = (current + 1) % total;
    showSlide(current);
  });

  $(".slider-prev").click(function(){
    current = (current - 1 + total) % total;
    showSlide(current);
  });
  
  function showSlide(index){
  $(".slide").removeClass("active");
  $(".slide").eq(index).addClass("active");
}

  // auto slide
  setInterval(function(){
    current = (current + 1) % total;
    showSlide(current);
  }, 3000);

});
// hero part js ends
