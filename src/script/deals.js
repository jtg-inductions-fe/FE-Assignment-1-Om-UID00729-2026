const displayCard = document.querySelector('.display-card');
const displayLabel = document.querySelector('.display-card-label');
const displayExpiry = document.querySelector('.display-card-expiry');
const displayPromoCode = document.querySelector('.display-card-promoCode');
const spinBtn = document.querySelector('.spin-btn');
const wheel = document.querySelector('.wheel');
const triggerModal = document.querySelector('.open-modal-modal');
const modalContainer = document.querySelector('.modal-container');
const countBadge = document.querySelector('.modal-count');
const DealsCardWrapper = document.querySelector('.won-deals__wrapper');
const viewAllBtn = document.querySelector('.viewAllButton');
const goBackBtn = document.querySelector('.goBackButton');
const spinWheelWrapper = document.querySelector('.spin-wheel');
const wonDealsWrapper = document.querySelector('.won-deals');
const WheelSectionCloseBtn = document.querySelector('.wheel-close-btn');
const wonSectionCloseBtn = document.querySelector('.viewAll-close-btn');
const copyBtn = document.querySelector('.copy-btn');

const STOP_ANGLES = [45, 315, 225, 135];

let rotation = 0;
let allDeals = [];
let wheelDeals = [];
let wonDeals = [];
let availableDeals = [];

triggerModal.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
    spinWheelWrapper.style.display = 'flex';
    wonDealsWrapper.style.display = 'none;';
    WheelSectionCloseBtn.focus();
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

viewAllBtn.addEventListener('click', () => {
    wonDealsWrapper.style.display = 'flex';
    spinWheelWrapper.style.display = 'none';
    wonSectionCloseBtn.focus();
    renderWonDetails();
});

viewAllBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        WheelSectionCloseBtn.focus();
    }
});

goBackBtn.addEventListener('click', () => {
    wonDealsWrapper.style.display = 'none';
    spinWheelWrapper.style.display = 'flex';
    WheelSectionCloseBtn.focus();
});

goBackBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        wonSectionCloseBtn.focus();
    }
});

WheelSectionCloseBtn.addEventListener('click', () => {
    wonDealsWrapper.style.display = 'none';
    spinWheelWrapper.style.display = 'none';
    modalContainer.style.display = 'none';
    document.body.style.overflow = '';
});

WheelSectionCloseBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        viewAllBtn.focus();
    }
});

wonSectionCloseBtn.addEventListener('click', () => {
    wonDealsWrapper.style.display = 'none';
    spinWheelWrapper.style.display = 'none';
    modalContainer.style.display = 'none';
    document.body.style.overflow = '';
});

wonSectionCloseBtn.addEventListener('click', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        goBackBtn.focus();
    }
});

DealsCardWrapper.addEventListener('click', async (e) => {
    const button = e.target.closest('.copy-btn');

    if (!button) return;

    copyPromoCode(button);
});

DealsCardWrapper.addEventListener('click', async (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    copyPromoCode(copyBtn);
});

copyBtn.addEventListener('click', async () => {
    copyPromoCode(copyBtn);
});

copyBtn.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    copyPromoCode(copyBtn);
});

async function fetchDeals() {
    wheelMessage('Loading...');
    try {
        if (!allDeals.length) {
            const response = await fetch(
                'https://gist.githubusercontent.com/ameer-wajid-ali/1f29ebee4295cede36f8d74b45e576df/raw/122966c9a123861249f173911d8d93a76dc06d7a/',
            );
            if (!response.ok) {
                throw new Error(`Error Fetching details - ${response.status}`);
            }
            allDeals = await response.json();

            availableDeals = allDeals.filter(
                (deal) =>
                    !wonDeals.some(
                        (wonDeal) => wonDeal.promoCode === deal.promoCode,
                    ),
            );
            selectRandomDeals(availableDeals);
        }
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

            const isWon = wonDeals.some(
                (deal) => deal.promoCode === winnerDeal.promoCode,
            );
            if (!isWon) {
                const wonDeal = {
                    ...winnerDeal,
                    validFor: winnerDeal.validFor ?? 7,
                    wonAt: Date.now(),
                };
                renderCard(wonDeal);
                wonDeals.push(wonDeal);
                saveWonDeals();
                availableDeals = availableDeals.filter(
                    (e) => e.promoCode !== winnerDeal.promoCode,
                );
                updateDealsCount();
            }
            spinBtn.disabled = false;
        },
        {
            once: true,
        },
    );
}

function animateWheel(winnerIdx) {
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
    displayExpiry.textContent = `Expires in ${wonDeal.validFor}d`;
}

function saveWonDeals() {
    localStorage.setItem('wonDeals', JSON.stringify(wonDeals));
}

function loadDeals() {
    wonDeals = JSON.parse(localStorage.getItem('wonDeals')) || [];
}

function renderWonDetails() {
    loadDeals();
    DealsCardWrapper.replaceChildren();

    wonDeals.sort((a, b) => {
        const remainingValA = remainingValidity(a);
        const remainingValB = remainingValidity(b);

        if (isExpired(a) !== isExpired(b)) {
            return isExpired(a) ? 1 : -1;
        }

        return remainingValA - remainingValB;
    });

    wonDeals.forEach((deal) => {
        const card = document.createElement('div');
        if (isExpired(deal)) {
            card.className = 'card card--modal-expired';
        } else {
            card.className = 'card card--modals';
        }

        const cardHeading = document.createElement('h3');
        cardHeading.className = 'card-heading';
        cardHeading.textContent = deal.label;

        const cardSubHeading = document.createElement('h5');
        cardSubHeading.className = 'card-subheading';
        cardSubHeading.textContent = isExpired(deal)
            ? 'Expired'
            : `Expires In ${remainingValidity(deal)}d`;

        const headingWrapper = document.createElement('div');
        headingWrapper.className = 'heading-wrapper';
        headingWrapper.appendChild(cardHeading);
        headingWrapper.appendChild(cardSubHeading);

        const cardPromoCode = document.createElement('span');
        cardPromoCode.className = 'badge badge--text';
        cardPromoCode.textContent = deal.promoCode;

        const copyBtnWrap = document.createElement('button');
        copyBtnWrap.className = 'copy-btn';
        copyBtnWrap.dataset.promoCode = deal.promoCode;

        const copyIcon = document.createElement('span');
        copyIcon.className = 'icon-copy';

        if (isExpired(deal)) {
            copyIcon.className = 'icon-copy--inactive';
        }
        copyBtnWrap.appendChild(copyIcon);

        const codeWrapper = document.createElement('div');
        codeWrapper.className = 'promoCode-wrapper';
        codeWrapper.appendChild(cardPromoCode);
        codeWrapper.appendChild(copyBtnWrap);

        card.appendChild(headingWrapper);
        card.appendChild(codeWrapper);

        DealsCardWrapper.appendChild(card);
    });
}

function remainingValidity(deal) {
    const daysPassed = Math.floor(
        (Date.now() - deal.wonAt) / (24 * 60 * 60 * 1000),
    );
    return Math.max(deal.validFor - daysPassed, 0);
}

function isExpired(deal) {
    return remainingValidity(deal) === 0;
}

async function copyPromoCode(button) {
    try {
        await navigator.clipboard.writeText(button.dataset.promoCode);
        button.textContent = '✅';

        setTimeout(() => {
            button.textContent = '';
            button.classList.add('icon-copy');
        }, 1500);
    } catch {
        button.textContent = '❌';
    }
}

loadDeals();
fetchDeals();
updateDealsCount();
