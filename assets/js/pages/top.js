
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  // centeredSlides: true,
  slidesPerView: 1.4,
  spaceBetween: 20,
  loopedSlides: 3,
  autoplay: {
    delay:6000
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation:{
    nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev',
  },
});



