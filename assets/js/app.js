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

// hotDeals starts
 let total = 60*86400 + 23*3600 + 34*60 + 57;
  setInterval(() => {
    if(total <= 0) return;
    total--;
    const d = Math.floor(total/86400);
    const h = Math.floor((total%86400)/3600);
    const m = Math.floor((total%3600)/60);
    const s = total%60;
    document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
  }, 1000);

// hot deals ends

  // tranding slide js
$(function(){

const track = $('.slider-track')
const card = $('.slider-product')
let index = 0

function cardWidth(){
return card.outerWidth(true)
}

function move(){
track.css('transform','translateX(-'+ index*cardWidth() +'px)')
}

$('.next').click(function(){

if(index < card.length - visible())
index++

move()

})

$('.prev').click(function(){

if(index>0)
index--

move()

})

function visible(){

let w = $(window).width()

if(w<768) return 2
if(w<1024) return 3
return 5

}

$(window).resize(function(){
move()
})

})

  // end of tranding slider js
