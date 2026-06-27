let detailsCont = document.querySelector('.travelpoint__textSide__details');

let data = [
    { numbers: '500+', content: 'Holiday Package' },
    { numbers: '100', content: 'Luxury Hotel' },
    { numbers: '7', content: 'Premium Airlines' },
    { numbers: '2k+', content: 'Happy Customers' },
];

let renderData = () => {
    let layout = data
        .map((ele) => {
            return `
                <div class="travelpoint__textSide__details__cont">
                    <h4>${ele.numbers}</h4>   
                    <p>${ele.content}</p>
                </div>
            `;
        })
        .join('');
    detailsCont.innerHTML += layout;
};

renderData();
