<<<<<<< HEAD
import handleHamburgerClick from './navbar.js';

handleHamburgerClick();
=======
let navbarHamburger = document.querySelector('.navbar__hamburger');
let navbarCont = document.querySelector('.navbar__cont');
let navbarUl = document.querySelector('.navbar__ul');

if (window.innerWidth <= 430) {
    navbarHamburger.addEventListener('click', () => {
        navbarCont.classList.toggle('navbar__cont--open');
        document
            .querySelector('.navbar__hamburger__close')
            .classList.toggle('navbar__hamburger__close--hidden');
        document
            .querySelector('.navbar__hamburger__bars')
            .classList.toggle('navbar__hamburger__bars--hidden');
    });
} else if (window.innerWidth <= 1024) {
    navbarHamburger.addEventListener('click', () => {
        navbarUl.classList.toggle('navbar__ul--open');
        document
            .querySelector('.navbar__hamburger__close')
            .classList.toggle('navbar__hamburger__close--hidden');
        document
            .querySelector('.navbar__hamburger__bars')
            .classList.toggle('navbar__hamburger__bars--hidden');
    });
}
>>>>>>> 0fb20e3 ([OH_A1_01] Header Section: Created Structure for header)
