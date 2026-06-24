<<<<<<< HEAD
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
<<<<<<< HEAD
>>>>>>> 0fb20e3 ([OH_A1_01] Header Section: Created Structure for header)
=======
let lastwidth = getWidth();

function getWidth() {
    if (window.innerWidth <= 430) return 'mobile';
    if (window.innerWidth <= 1024) return 'tablet';
    return 'desktop';
}

window.addEventListener('resize', () => {
    const currWidth = getWidth();
    if (currWidth !== lastwidth) {
        location.reload();
    }
});
>>>>>>> 5b62b49 ([OH_A1_01] Header: Worked on responsiveness)
=======
import handleHamburgerClick from './navbar.js';

handleHamburgerClick();
>>>>>>> cd5607d ([OH_A1_01] Header Section- Updated according to change in base setup)
