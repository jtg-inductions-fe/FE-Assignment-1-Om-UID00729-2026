import { BREAKPOINTS } from './constants.js';

const footerBtns = document.querySelectorAll('.footer__details-btn');

const isMobile = () => window.innerWidth < BREAKPOINTS.TABLET;

const setState = (btn, isOpen) => {
    const list = btn.nextElementSibling;
    list.classList.toggle('footer__details-links--opened', isOpen);
    btn.classList.toggle('footer__details-btn--opened', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    btn.children[1].classList.toggle(
        'footer__details-dropdown--opened',
        isOpen,
    );
    list.querySelectorAll('a').forEach((link) => {
        link.tabIndex = isOpen ? 0 : -1;
    });
};

const tabOrder = () => {
    if (isMobile()) {
        footerBtns.forEach((btn) => {
            btn.tabIndex = 0;

            const list = btn.nextElementSibling;
            const isOpen = list.classList.contains(
                'footer__details-links--opened',
            );

            list.querySelectorAll('a').forEach((link) => {
                link.tabIndex = isOpen ? 0 : -1;
            });
        });
    } else {
        footerBtns.forEach((btn) => {
            btn.tabIndex = -1;

            btn.nextElementSibling.querySelectorAll('a').forEach((link) => {
                link.removeAttribute('tabindex');
            });
        });
    }
};

footerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (!isMobile()) return;

        const isOpen = btn.nextElementSibling.classList.contains(
            'footer__details-links--opened',
        );

        footerBtns.forEach((button) => {
            setState(button, false);
        });

        if (!isOpen) {
            setState(btn, true);
        }
        tabOrder();
    });
});

window.addEventListener('resize', () => {
    if (!isMobile()) {
        footerBtns.forEach((btn) => {
            setState(btn, false);
            btn.classList.remove('footer__details-btn--opened');
        });
    }
    document
        .querySelector('.footer__details-dropdown')
        .classList.remove('footer__details-dropdown--opened');
    tabOrder();
});

tabOrder();
