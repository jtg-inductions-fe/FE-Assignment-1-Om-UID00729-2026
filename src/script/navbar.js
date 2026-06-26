import { MOBILE, TABLET } from './constants.js';

let navbarHamburger = document.querySelector('.navbar__hamburger');
let navbarCont = document.querySelector('.navbar__cont');
let navbarUl = document.querySelector('.navbar__ul');
let hamburgerBars = document.querySelector('.icon-bars-solid');
let links = document.querySelectorAll('.navbar__links');

const isExpanded = () =>
    navbarCont.classList.contains('navbar__cont--open') ||
    navbarUl.classList.contains('navbar__ul--open');

const toggleNav = () => {
    if (window.innerWidth <= MOBILE) {
        navbarCont.classList.toggle('navbar__cont--open');
    } else if (window.innerWidth <= TABLET) {
        navbarUl.classList.toggle('navbar__ul--open');
    }
    hamburgerBars.classList.toggle('navbar__hamburger__bars--open');
    navbarHamburger.setAttribute('aria-expanded', String(isExpanded()));
};

const getWidth = () => {
    if (window.innerWidth <= MOBILE) return 'mobile';
    if (window.innerWidth <= TABLET) return 'tablet';
    return 'desktop';
};

let lastWidth = getWidth();

const classReload = () => {
    let currWidth = getWidth();
    if (currWidth !== lastWidth) {
        navbarCont.classList.remove('navbar__cont--open');
        navbarUl.classList.remove('navbar__ul--open');
        hamburgerBars.classList.remove('navbar__hamburger__bars--open');
        navbarHamburger.setAttribute('aria-expanded', 'false');
        lastWidth = currWidth;
    }
};

let focusTab = () => {
    navbarHamburger.addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                links[0].focus();
            }
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                links[links.length - 1].focus();
            }
        }
    });
    links[links.length - 1].addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                navbarHamburger.focus();
            }
        }
    });
    links[0].addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                navbarHamburger.focus();
            }
        }
    });
};
navbarHamburger.addEventListener('click', toggleNav);
window.addEventListener('resize', classReload);
focusTab();
