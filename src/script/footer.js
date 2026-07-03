import { TABLET } from './constants.js';

const footerBtns = document.querySelectorAll('.footer__details-btn');

const isMobile = () => window.innerWidth < TABLET;

const setState = (btn, isOpen) => {
    const list = btn.nextElementSibling;
    list.classList.toggle('footer__details-links--open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);

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
                'footer__details-links--open',
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
            'footer__details-links--open',
        );

        footerBtns.forEach((button) => {
            setState(button, false);
        });

        if (!isOpen) {
            setState(btn, true);
        }

        document
            .querySelector('.footer__details-dropdown')
            .classList.toggle('footer__details-dropdown--opened');

        tabOrder();
    });
});

window.addEventListener('resize', () => {
    if (!isMobile()) {
        footerBtns.forEach((btn) => {
            setState(btn, false);
        });
    }
    document
        .querySelector('.footer__details-dropdown')
        .classList.remove('footer__details-dropdown--opened');
    tabOrder();
});

tabOrder();
