let navbarHamburger = document.querySelector('.navbar__hamburger');
let navbarCont = document.querySelector('.navbar__cont');
let navbarUl = document.querySelector('.navbar__ul');

export default function handleHamburgerClick() {
    if (window.innerWidth <= 430) {
        navbarHamburger.addEventListener('click', () => {
            navbarCont.classList.toggle('navbar__cont--open');
            document
                .querySelector('.icon-bars-solid')
                .classList.toggle('navbar__hamburger__bars--open');
        });
    } else if (window.innerWidth <= 1024) {
        navbarHamburger.addEventListener('click', () => {
            navbarUl.classList.toggle('navbar__ul--open');
            document
                .querySelector('.icon-bars-solid')
                .classList.toggle('navbar__hamburger__bars--open');
        });
    }
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
}
