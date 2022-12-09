const burger = document.querySelector('.burger__button');
const menu = document.querySelector('.header__menu ');

burger.addEventListener('click', function(event){
    menu.classList.toggle('header__menu--active')
});

