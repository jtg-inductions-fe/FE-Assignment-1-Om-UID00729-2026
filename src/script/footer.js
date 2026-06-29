let footerHead = document.querySelectorAll('.footer__details__cont__head');

if (window.innerWidth <= 430) {
    footerHead.forEach((el) => {
        el.addEventListener('click', () => {
            let nextEle = el.nextElementSibling;
            nextEle.classList.toggle('footer__details__cont__text--open');
        });
    });
}
