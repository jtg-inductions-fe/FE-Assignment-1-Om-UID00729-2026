import { TABLET, DESKTOP } from './constants.js';

const HamburgerBtn = document.querySelector('.navbar__hamburger-btn');
const navbarWrapper = document.querySelector('.navbar__links-wrapper');
const navbarList = document.querySelector('.navbar__list');
const hamburgerBars = document.querySelector('.icon-bars-solid');
const navbar = document.querySelector('.navbar');
let lastWidth = getWidth();
const navbarFocusList = document.querySelectorAll('.navbar__focus-tab');
let tabList = [];

const changeFocusList = () => {
    if (lastWidth == 'mobile') {
        tabList = navbarFocusList;
    } else if (lastWidth === 'tablet') {
        let tempList = [...navbarFocusList];
        tabList = tempList.splice(0, navbarFocusList.length - 2);
    }
};

const isExpanded = () =>
    navbarWrapper.classList.contains('navbar__links-wrapper--open') ||
    navbarList.classList.contains('navbar__list--open');

const toggleNav = () => {
    if (window.innerWidth < TABLET) {
        navbarWrapper.classList.toggle('navbar__links-wrapper--open');
    } else if (window.innerWidth < DESKTOP) {
        navbarList.classList.toggle('navbar__list--open');
    }

    hamburgerBars.classList.toggle('navbar__hamburger-btn-bars--open');
    HamburgerBtn.setAttribute('aria-expanded', String(isExpanded()));
    HamburgerBtn.title = isExpanded()
        ? 'Close navigation menu'
        : 'Open navigation menu';
    HamburgerBtn.setAttribute(
        'aria-label',
        isExpanded() ? 'Close navigation menu' : 'Open navigation menu',
    );
    changeTab();
    changeFocusList();
};

function getWidth() {
    if (window.innerWidth < TABLET) return 'mobile';
    if (window.innerWidth < DESKTOP) return 'tablet';
    return 'desktop';
}

const closeNav = () => {
    if (isExpanded()) {
        navbarWrapper.classList.remove('navbar__links-wrapper--open');
        navbarList.classList.remove('navbar__list--open');
        hamburgerBars.classList.remove('navbar__hamburger-btn-bars--open');
        HamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    changeTab();
    changeFocusList();
};

const classReload = () => {
    const currWidth = getWidth();

    if (currWidth !== lastWidth) {
        closeNav();
        lastWidth = currWidth;
    }

    changeFocusList();
};

const focusTab = () => {
    HamburgerBtn.addEventListener('keydown', (e) => {
        if (isExpanded()) {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                tabList[0].focus();
            }
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                tabList[tabList.length - 1].focus();
            }
        }
    });

    tabList[tabList.length - 1].addEventListener('keydown', (e) => {
        if (isExpanded() && e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            HamburgerBtn.focus();
        }
    });

    tabList[0].addEventListener('keydown', (e) => {
        if (isExpanded() && e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            HamburgerBtn.focus();
        }
    });
};

const changeTab = () => {
    if (getWidth() === 'tablet') {
        HamburgerBtn.tabIndex = 1;
        document.querySelector('.navbar__logo').tabIndex = 2;
        document.querySelector('.navbar__login').tabIndex = 0;
        document.querySelector('.navbar__signup').tabIndex = 0;
    } else if (getWidth() == 'mobile') {
        document.querySelector('.navbar__logo').tabIndex = 1;
        HamburgerBtn.tabIndex = 2;
        document.querySelector('.navbar__login').tabIndex = 0;
        document.querySelector('.navbar__signup').tabIndex = 0;
    } else {
        HamburgerBtn.tabIndex = -1;
        document.querySelector('.navbar__logo').tabIndex = 0;
        document.querySelector('.navbar__login').tabIndex = 0;
        document.querySelector('.navbar__signup').tabIndex = 0;
    }
};

function throttle(fn, delay) {
    let prevTime = 0;
    return function (...args) {
        const now = Date.now();

        if (now - prevTime >= delay) {
            fn.apply(this, args);
            prevTime = now;
        }
    };
}

window.addEventListener('scroll', throttle(closeNav, 300));

document.addEventListener('click', (e) => {
    const isCLickedInside =
        navbarWrapper.contains(e.target) ||
        navbarList.contains(e.target) ||
        HamburgerBtn.contains(e.target);

    if (!isCLickedInside && isExpanded()) {
        closeNav();
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('navbar--scrolled');
    } else {
        navbar.classList.remove('navbar--scrolled');
    }
});

HamburgerBtn.addEventListener('click', toggleNav);
window.addEventListener('resize', classReload);
changeFocusList();
focusTab();
classReload();
