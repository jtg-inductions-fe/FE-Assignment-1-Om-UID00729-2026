const detailsCards = document.querySelector('.travelpoint__details-cards');

const statsData = [
    { statValue: '500+', statContent: 'Holiday Package' },
    { statValue: '100', statContent: 'Luxury Hotel' },
    { statValue: '7', statContent: 'Premium Airlines' },
    { statValue: '2k+', statContent: 'Happy Customers' },
];

const renderCards = () => {
    statsData.map((ele) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card card--details travelpoint__card-wrapper';

        const cardHeading = document.createElement('h4');
        cardHeading.textContent = ele.statValue;

        const cardPara = document.createElement('p');
        cardPara.className = 'travelpoint__card-para';
        cardPara.textContent = ele.statContent;
        cardPara.addEventListener('click', () => {
            cardPara.classList.toggle('travelpoint__card-para--show-text');
        });

        cardWrapper.appendChild(cardHeading);
        cardWrapper.appendChild(cardPara);
        detailsCards.appendChild(cardWrapper);
    });
};

renderCards();
