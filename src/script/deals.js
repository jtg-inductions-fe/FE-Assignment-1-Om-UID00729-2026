import {
    MILLISECONDS_IN_DAY,
    SPECIAL_DEALS_API_URI,
    LOCAL_STORAGE_KEYS,
} from './constants.js';
import returnRemainingTime from './utility.js';

const displayCard = document.querySelector('.display-card-wrapper');
const displayLabel = document.querySelector('.display-card-label');
const displayExpiry = document.querySelector('.display-card-expiry');
const displayPromoCode = document.querySelector('.display-card-promoCode');
const copyBtn = document.querySelector('.copy-btn');
const spinBtn = document.querySelector('.spin-btn');
const wheel = document.querySelector('.wheel');
const triggerModal = document.querySelector('.open-modal');
const modalContainer = document.querySelector('.modal-container');
const countBadge = document.querySelector('.modal-count');
const dealsCardWrapper = document.querySelector('.won-deals__wrapper');
const viewAllBtn = document.querySelector('.viewAllButton');
const goBackBtn = document.querySelector('.goBackButton');
const spinWheelWrapper = document.querySelector('.spin-wheel');
const wonDealsWrapper = document.querySelector('.won-deals');
const WheelSectionCloseBtn = document.querySelector('.wheel-close-btn');
const wonSectionCloseBtn = document.querySelector('.viewAll-close-btn');

const STOP_ANGLES = [45, 315, 225, 135];

let rotation = 0;
let allDeals = [];
let wheelDeals = [];
let wonDeals = [];
let availableDeals = [];

triggerModal.addEventListener('click', (e) => {
    e.preventDefault();
    modalContainer.style.display = 'flex';
    spinWheelWrapper.style.display = 'flex';
    wonDealsWrapper.style.display = 'none';
    WheelSectionCloseBtn.focus();
    document.body.classList.add('no-scroll');
    fetchDeals();
});

spinBtn.addEventListener('click', () => {
    if (displayCard.style.display === 'flex') {
        displayCard.style.display = 'none';
        selectRandomDeals(availableDeals);
    }

    if (wheelDeals.length === 0) {
        return;
    }

    selectWinner();
});

viewAllBtn.addEventListener('click', handleViewAllBtn);

viewAllBtn.addEventListener('keydown', handleViewAllBtn);

goBackBtn.addEventListener('click', handleGoBackBtn);

goBackBtn.addEventListener('keydown', handleGoBackBtn);

WheelSectionCloseBtn.addEventListener('click', handleSpinCloseBtn);

WheelSectionCloseBtn.addEventListener('keydown', handleSpinCloseBtn);

wonSectionCloseBtn.addEventListener('click', handleWonCloseBtn);

wonSectionCloseBtn.addEventListener('keydown', handleWonCloseBtn);

modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
        copyPromoCode(e.target);
    }
});

async function fetchDeals() {
    wheelMessage('Loading...');
    try {
        if (!allDeals.length) {
            const response = await fetch(SPECIAL_DEALS_API_URI);
            if (!response.ok) {
                throw new Error(`Error Fetching details - ${response.status}`);
            }
            allDeals = await response.json();
        }
        availableDeals = allDeals.filter(
            (deal) =>
                !wonDeals.some(
                    (wonDeal) => wonDeal.promoCode === deal.promoCode,
                ),
        );
        selectRandomDeals(availableDeals);
    } catch (error) {
        wheelMessage(error);
    }
}

function updateDealsCount() {
    countBadge.textContent = wonDeals.length;
}

function selectRandomDeals(availableDeals) {
    let shuffled = [...availableDeals];
    if (availableDeals.length < 4) {
        spinBtn.disabled = true;
        wheelDeals = [];
        wheelMessage(
            'No more deals available right now. Please try again later',
        );
        return false;
    }

    for (let i = availableDeals.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    wheelDeals = shuffled.slice(0, 4);
    renderWheel();
}

function renderWheel() {
    if (wheel.classList.contains('wheel--message')) {
        wheel.classList.remove('wheel--message');
        spinBtn.hidden = false;
    }
    wheel.replaceChildren();
    wheelDeals.forEach((deal, idx) => {
        const section = document.createElement('div');
        section.classList.add('wheel-section');
        section.classList.add(`wheel-section--${idx + 1}`);

        const sectionText = document.createElement('p');
        sectionText.classList.add('wheel-section-text');
        sectionText.textContent = deal.label;

        section.appendChild(sectionText);
        wheel.appendChild(section);
    });
}

function wheelMessage(message) {
    wheel.replaceChildren();
    wheel.classList.add('wheel--message');
    wheel.style.transform = 'rotate(0deg)';
    wheel.style.transition = 'none';
    spinBtn.hidden = true;

    const messageCont = document.createElement('span');
    messageCont.textContent = message;
    wheel.appendChild(messageCont);
}

function selectWinner() {
    const winnerIdx = Math.floor(Math.random() * wheelDeals.length);
    animateWheel(winnerIdx);

    wheel.addEventListener(
        'transitionend',
        () => {
            const winnerDeal = wheelDeals[winnerIdx];
            const { validFor, promoCode } = winnerDeal;

            const isWon = wonDeals.some(
                (deal) => deal.promoCode === winnerDeal.promoCode,
            );

            if (!isWon) {
                const wonDeal = {
                    ...winnerDeal,
                    daysValid: validFor ?? 7,
                    expiryAt:
                        Date.now() + (validFor ?? 7) * MILLISECONDS_IN_DAY,
                };

                renderCard(wonDeal);
                wonDeals.push(wonDeal);
                saveWonDeals();
                availableDeals = availableDeals.filter(
                    (e) => e.promoCode !== promoCode,
                );
                updateDealsCount();
            }
            spinBtn.disabled = false;
            viewAllBtn.disabled = false;
        },
        {
            once: true,
        },
    );
}

function animateWheel(winnerIdx) {
    viewAllBtn.disabled = true;
    spinBtn.disabled = true;
    rotation -= rotation % 360;
    rotation += 360 * 5 + STOP_ANGLES[winnerIdx];
    wheel.style.transform = `rotate(${rotation}deg)`;
    wheel.style.transition = 'transform 1s ease-out';
}

function renderCard(wonDeal) {
    displayCard.style.display = 'flex';
    displayLabel.textContent = wonDeal.label;
    displayPromoCode.textContent = wonDeal.promoCode;
    displayExpiry.textContent = returnRemainingTime(wonDeal.expiryAt);
    copyBtn.dataset.promoCode = wonDeal.promoCode;
}

function saveWonDeals() {
    localStorage.setItem(
        LOCAL_STORAGE_KEYS.WON_DEALS,
        JSON.stringify(wonDeals),
    );
}

function fetchStoredDeals() {
    try {
        wonDeals =
            JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WON_DEALS)) ||
            [];
    } catch {
        wonDeals = [];
    }
}

function renderWonDetails() {
    fetchStoredDeals();
    dealsCardWrapper.replaceChildren();

    if (!wonDeals.length) {
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.textContent = 'No Wins to show yet...';

        dealsCardWrapper.appendChild(card);
    }

    wonDeals.sort((a, b) => {
        const remainingValA = checkExpiryTime(a);
        const remainingValB = checkExpiryTime(b);

        if (isExpired(a) !== isExpired(b)) {
            return isExpired(a) ? 1 : -1;
        }

        return remainingValA - remainingValB;
    });

    wonDeals.forEach((deal) => {
        const { label, promoCode, expiryAt } = deal;
        const card = document.createElement('div');
        if (isExpired(deal)) {
            card.className = 'deal-card deal-card--expired';
        } else {
            card.className = 'deal-card';
        }

        const cardHeading = document.createElement('h3');
        [cardHeading.className, cardHeading.textContent] = [
            'card-heading',
            label,
        ];

        const cardSubHeading = document.createElement('h5');
        [cardSubHeading.className, cardSubHeading.textContent] = [
            'card-subheading',
            dateFormatter(expiryAt),
        ];

        const headingWrapper = document.createElement('div');
        headingWrapper.className = 'heading-wrapper';

        headingWrapper.appendChild(cardHeading);
        headingWrapper.appendChild(cardSubHeading);

        const cardPromoCode = document.createElement('span');
        [cardPromoCode.className, cardPromoCode.textContent] = [
            'badge badge--text',
            promoCode,
        ];

        const copyBtnWrap = document.createElement('button');
        copyBtnWrap.setAttribute('aria-label', 'copy Promo Code');
        copyBtnWrap.className = 'copy-btn-wrapper modal-btn';

        const button = document.createElement('span');
        [button.className, button.dataset.promoCode, button.title] = [
            'icon-copy copy-btn',
            promoCode,
            'Copy Promo Code',
        ];

        if (isExpired(deal)) {
            button.className = 'icon-copy--inactive';
        }

        copyBtnWrap.appendChild(button);

        const codeWrapper = document.createElement('div');
        codeWrapper.className = 'promoCode-wrapper';

        codeWrapper.appendChild(cardPromoCode);
        codeWrapper.appendChild(copyBtnWrap);

        card.appendChild(headingWrapper);
        card.appendChild(codeWrapper);

        dealsCardWrapper.appendChild(card);
    });
}

function checkExpiryTime(deal) {
    return Math.max(0, deal.expiryAt - Date.now());
}

function isExpired(deal) {
    return Date.now() >= deal.expiryAt;
}

function dateFormatter(expiryAt) {
    const remainingTime = returnRemainingTime(expiryAt);

    return remainingTime ? `Expires in ${remainingTime}` : 'Deal expired';
}

async function copyPromoCode(button) {
    try {
        await navigator.clipboard.writeText(button.dataset.promoCode);
        button.classList.remove('icon-copy');
        button.classList.add('icon-success');

        setTimeout(() => {
            button.classList.remove('icon-success');
            button.classList.add('icon-copy');
        }, 1500);
    } catch {
        button.classList.remove('icon-copy');
        button.classList.add('icon-x');
        alert("Couldn't copy");
        setTimeout(() => {
            button.classList.remove('icon-x');
            button.classList.add('icon-copy');
        }, 1500);
    }
}

function handleWonCloseBtn(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        goBackBtn.focus();
        return;
    } else if (e.type === 'click') {
        wonDealsWrapper.style.display = 'none';
        spinWheelWrapper.style.display = 'none';
        modalContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}

function handleSpinCloseBtn(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        viewAllBtn.focus();
        return;
    } else if (e.type === 'click') {
        wonDealsWrapper.style.display = 'none';
        spinWheelWrapper.style.display = 'none';
        modalContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}

function handleViewAllBtn(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        WheelSectionCloseBtn.focus();
    } else if (e.type === 'click') {
        wonDealsWrapper.style.display = 'flex';
        spinWheelWrapper.style.display = 'none';
        wonSectionCloseBtn.focus();
        renderWonDetails();
    }
}

function handleGoBackBtn(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        wonSectionCloseBtn.focus();
    } else if (e.type === 'click') {
        wonDealsWrapper.style.display = 'none';
        spinWheelWrapper.style.display = 'flex';
        WheelSectionCloseBtn.focus();
    }
}

fetchStoredDeals();
updateDealsCount();
