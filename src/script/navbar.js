import { MOBILE, TABLET } from './constants.js';

const HamburgerBtn = document.querySelector('.navbar__hamburger-btn');
const navbarWrapper = document.querySelector('.navbar__wrapper');
const navbarList = document.querySelector('.navbar__list');
const hamburgerBars = document.querySelector('.icon-bars-solid');
const navbarFocusList = document.querySelectorAll('.navbar__focus-tab');

let lastWidth = getWidth();

const isExpanded = () =>
    navbarWrapper.classList.contains('navbar__wrapper--open') ||
    navbarList.classList.contains('navbar__list--open');

const toggleNav = () => {
    if (window.innerWidth <= MOBILE) {
        navbarWrapper.classList.toggle('navbar__wrapper--open');
    } else if (window.innerWidth <= TABLET) {
        navbarList.classList.toggle('navbar__list--open');
    }

    hamburgerBars.classList.toggle('navbar__hamburger-btn__bars--open');
    HamburgerBtn.setAttribute('aria-expanded', String(isExpanded()));
    HamburgerBtn.title = isExpanded()
        ? 'Close navigation menu'
        : 'Open navigation menu';
    HamburgerBtn.setAttribute(
        'aria-label',
        isExpanded() ? 'Close navigation menu' : 'Open navigation menu',
    );
};

function getWidth() {
    if (window.innerWidth <= MOBILE) return 'mobile';
    if (window.innerWidth <= TABLET) return 'tablet';
    return 'desktop';
}

const classReload = () => {
    const currWidth = getWidth();

    if (currWidth !== lastWidth) {
        navbarWrapper.classList.remove('navbar__wrapper--open');
        navbarList.classList.remove('navbar__list--open');
        hamburgerBars.classList.remove('navbar__hamburger-btn__bars--open');
        HamburgerBtn.setAttribute('aria-expanded', 'false');
        lastWidth = currWidth;
    }
};

const focusTab = () => {
    HamburgerBtn.addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                navbarFocusList[0].focus();
            }

            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                navbarFocusList[navbarFocusList.length - 1].focus();
            }
        }
    });

    navbarFocusList[navbarFocusList.length - 1].addEventListener(
        'keydown',
        (e) => {
            if (isExpanded()) {
                if (e.key === 'Tab' && !e.shiftKey) {
                    e.preventDefault();
                    HamburgerBtn.focus();
                }
            }
        },
    );

    navbarFocusList[0].addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                HamburgerBtn.focus();
            }
        }
    });
};

HamburgerBtn.addEventListener('click', toggleNav);
window.addEventListener('resize', classReload);
focusTab();
