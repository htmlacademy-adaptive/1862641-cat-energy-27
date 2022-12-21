const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu ');
const range = document.querySelector('.slider__range')
const rangeBeforeImg = document.querySelector ('.example__picture-before');

burger.addEventListener('click', function(event){
  burger.classList.toggle('header__active')
});

document.addEventListener('DOMContentLoaded', function(){
    range.addEventListener('input', function(event){
        rangeBeforeImg.style.width = (event.target.value ) + "%";


    },{passive: true})
})
