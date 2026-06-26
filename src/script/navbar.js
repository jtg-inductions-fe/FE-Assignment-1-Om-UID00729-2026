let navbarHamburger = document.querySelector('.navbar__hamburger');
let navbarCont = document.querySelector('.navbar__cont');
let navbarUl = document.querySelector('.navbar__ul');
let hamburgerBars = document.querySelector('.icon-bars-solid');
let links = document.querySelectorAll('.navbar__links');

export default function handleHamburgerClick() {
    const toggleNav = () => {
        if (window.innerWidth <= 430) {
            navbarCont.classList.toggle('navbar__cont--open');
        } else if (window.innerWidth <= 1024) {
            navbarUl.classList.toggle('navbar__ul--open');
        }
        hamburgerBars.classList.toggle('navbar__hamburger__bars--open');
        let isExpanded =
            navbarCont.classList.contains('navbar__cont--open') ||
            navbarUl.classList.contains('navbar__ul--open');
        navbarHamburger.setAttribute('aria-expanded', String(isExpanded));
    };

    navbarHamburger.addEventListener('click', toggleNav);

    navbarHamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleNav();
        }
    });

    let lastwidth = getWidth();
    function getWidth() {
        if (window.innerWidth <= 430) return 'mobile';
        if (window.innerWidth <= 1024) return 'tablet';
        return 'desktop';
    }
    window.addEventListener('resize', () => {
        const currWidth = getWidth();
        if (currWidth !== lastwidth) {
            navbarCont.classList.remove('navbar__cont--open');
            navbarUl.classList.remove('navbar__ul--open');
            hamburgerBars.classList.remove('navbar__hamburger__bars--open');
            navbarHamburger.setAttribute('aria-expanded', 'false');
            lastwidth = currWidth;
        }
    });

    navbarHamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            links[0].focus();
        }
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            links[links.length - 1].focus();
        }
    });
    links[links.length - 1].addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            navbarHamburger.focus();
        }
    });
    links[0].addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            navbarHamburger.focus();
        }
    });
}
