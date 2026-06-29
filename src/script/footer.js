import { MOBILE } from './constants.js';

let footerHead = document.querySelectorAll('.footer__details__cont__head');

const isMobile = () => window.innerWidth <= MOBILE;

footerHead.forEach((el) => {
    el.addEventListener('click', () => {
        if (!isMobile()) return;
        let nextEle = el.nextElementSibling;
        nextEle?.classList.toggle('footer__details__cont__text--open');
    });
});

window.addEventListener('resize', () => {
    if (isMobile()) return;
    document.querySelectorAll('.footer__details__cont__text').forEach((e) => {
        e.classList.remove('footer__details__cont__text--open');
    });
});
