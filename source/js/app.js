const burger = document.querySelector('.burger__button');
const menu = document.querySelector('.header__menu ');
const range = document.querySelector('.slider__range')
const rangeBeforeImg = document.querySelector ('.example__picture-before');

burger.addEventListener('click', function(event){
    menu.classList.toggle('header__menu--active')
});

document.addEventListener('DOMContentLoaded', function(){
    range.addEventListener('input', function(event){
        rangeBeforeImg.style.width = (event.target.value ) + "%";


    },{passive: true})
})
