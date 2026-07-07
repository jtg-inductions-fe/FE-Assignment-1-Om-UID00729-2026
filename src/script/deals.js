import {
    MILLISECONDS_PER_DAY,
    API_URIS,
    LOCAL_STORAGE_KEYS,
} from './constants.js';
import getFormattedRelativeTime from './utility.js';

const displayCard = document.querySelector('.winning-card');
const spinBtn = document.querySelector('.spin-wheel__spin-btn');
const wheel = document.querySelector('.spin-wheel__wheel');
const triggerModal = document.querySelector('.open-modal');
const modalContainer = document.querySelector('.modal');
const countBadge = document.querySelector('.modal__count-badge');
const buttonText = document.querySelector('.modal__footer-button-text');
const modalButton = document.querySelector('.modal__footer-button');
const spinWheelWrapper = document.querySelector('.spin-wheel');
const wonDealsWrapper = document.querySelector('.won-deals');
const modalHeading = document.querySelector('.modal__heading');
const modalDescription = document.querySelector('.modal__description');
const closeBtn = document.querySelector('.modal__close-btn');
const dealCardTemplate = document.getElementById('deal-card-template');

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
    closeBtn.focus();
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

modalButton.addEventListener('click', handleModalButton);

modalButton.addEventListener('keydown', handleModalButton);

closeBtn.addEventListener('click', handleCloseButton);

closeBtn.addEventListener('keydown', handleCloseButton);

modalContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('deal-card__copy-btn')) {
        copyPromoCode(event.target);
    }
});

modalContainer.addEventListener('keydown', (event) => {
    const copyBtn = event.target.querySelector('.deal-card__copy-btn');
    if (!copyBtn) return;
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyPromoCode(copyBtn);
    }
});

async function fetchDeals() {
    wheelMessage('Loading...');
    try {
        if (!allDeals.length) {
            const response = await fetch(API_URIS.FETCH_SPECIAL_DEALS);
            if (!response.ok) {
                throw new Error(`Error Fetching details - ${response.status}`);
            }
            allDeals = await response.json();
        }
        availableDeals = allDeals.filter(
            ({ promoCode }) =>
                !wonDeals.some(
                    ({ promoCode: wonPromoCode }) => wonPromoCode === promoCode,
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
    if (wheel.classList.contains('spin-wheel__wheel--message')) {
        wheel.classList.remove('spin-wheel__wheel--message');
        spinBtn.hidden = false;
    }
    wheel.replaceChildren();
    wheelDeals.forEach((deal, idx) => {
        const section = document.createElement('div');
        section.classList.add('spin-wheel__section');
        section.classList.add(`spin-wheel__section--${idx + 1}`);

        const sectionText = document.createElement('p');
        sectionText.classList.add('spin-wheel__section-text');
        sectionText.textContent = deal.label;

        section.appendChild(sectionText);
        wheel.appendChild(section);
    });
}

function wheelMessage(message) {
    wheel.replaceChildren();
    wheel.classList.add('spin-wheel__wheel--message');
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
                ({ promoCode: dealPromoCode }) => dealPromoCode === promoCode,
            );

            if (!isWon) {
                const wonDeal = {
                    ...winnerDeal,
                    daysValid: validFor ?? 7,
                    expiryAt:
                        Date.now() + (validFor ?? 7) * MILLISECONDS_PER_DAY,
                };

                renderWinningCard(wonDeal);
                wonDeals.push(wonDeal);
                saveWonDeals();
                availableDeals = availableDeals.filter(
                    ({ promoCode: dealPromoCode }) =>
                        dealPromoCode !== promoCode,
                );
                updateDealsCount();
            }
            spinBtn.disabled = false;
            modalButton.disabled = false;
        },
        {
            once: true,
        },
    );
}

function animateWheel(winnerIdx) {
    modalButton.disabled = true;
    spinBtn.disabled = true;
    rotation -= rotation % 360;
    rotation += 360 * 5 + STOP_ANGLES[winnerIdx];
    wheel.style.transform = `rotate(${rotation}deg)`;
    wheel.style.transition = 'transform 1s ease-out';
}

function renderWinningCard(wonDeal) {
    displayCard.style.display = 'flex';

    const dealCard = displayCard.querySelector('.deal-card');
    if (dealCard) {
        dealCard.remove();
    }

    renderCards(wonDeal, displayCard);
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
    wonDealsWrapper.replaceChildren();

    if (!wonDeals.length) {
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.textContent = 'No Wins to show yet...';

        wonDealsWrapper.appendChild(card);
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
        renderCards(deal, wonDealsWrapper);
    });
}

function checkExpiryTime(deal) {
    return Math.max(0, deal.expiryAt - Date.now());
}

function isExpired(deal) {
    return Date.now() >= deal.expiryAt;
}

function getDealExpiryStatus(expiryAt) {
    const remainingTime = getFormattedRelativeTime(expiryAt);

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

function handleCloseButton(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        modalButton.focus();
        return;
    } else if (e.type === 'click') {
        wonDealsWrapper.style.display = 'none';
        spinWheelWrapper.style.display = 'none';
        modalContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
        renderModalContent('spinWheel');
    }
}

function handleModalButton(e) {
    if (e.type === 'keydown' && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        closeBtn.focus();
    } else if (e.type === 'click') {
        if (spinWheelWrapper.style.display === 'flex') {
            spinWheelWrapper.style.display = 'none';
            displayCard.style.display = 'none';
            wonDealsWrapper.style.display = 'flex';
            renderWonDetails();
            renderModalContent('wonDeals');
        } else {
            spinWheelWrapper.style.display = 'flex';
            displayCard.style.display = 'none';
            wonDealsWrapper.style.display = 'none';
            renderModalContent('spinWheel');
        }
    }
}

function renderModalContent(viewName) {
    if (viewName === 'spinWheel') {
        countBadge.classList.remove('badge--hidden');
        buttonText.textContent = 'View All Unlocked Deals';
        modalHeading.textContent = 'Spin & Win!';
        modalDescription.textContent = 'Tap the center of the wheel to spin';
    } else {
        countBadge.classList.add('badge--hidden');
        buttonText.textContent = 'Go Back';
        modalHeading.textContent = 'Unlocked Deals';
        modalDescription.textContent = 'All the deals you’ve unlocked yet!';
    }
}

function renderCards(deal, wrapperClass) {
    const { label, promoCode, expiryAt } = deal;

    const templateClone = dealCardTemplate.content.cloneNode(true);
    const dealCard = templateClone.querySelector('.deal-card');

    const dealCardLabel = templateClone.querySelector('.deal-card__label');
    dealCardLabel.textContent = label;

    const dealCardSubHeading =
        templateClone.querySelector('.deal-card__expiry');
    dealCardSubHeading.textContent = getDealExpiryStatus(expiryAt);

    const dealCardPromoCode = templateClone.querySelector(
        '.deal-card__promocode-text',
    );
    dealCardPromoCode.textContent = promoCode;

    const dealCardcopyBtn = templateClone.querySelector('.deal-card__copy-btn');
    dealCardcopyBtn.dataset.promoCode = promoCode;

    if (isExpired) {
        dealCard.classList.add('deal-card--inactive');
        dealCardcopyBtn.classList.add('deal-card__copy-btn-inactive');
    }

    wrapperClass.append(dealCard);
}

fetchStoredDeals();
updateDealsCount();
