import Splide from '@splidejs/splide';

let testimonials = document.querySelector('.splide__list');
let leftArrow = document.querySelector('.splide__leftArrow');
let rightArrow = document.querySelector('.splide__rightArrow');

const data = [
    {
        img: '/assets/images/testimonials-profile.webp',
        name: 'Mark Smith',
        desig: 'Travel Enthusiast',
        stars: 5,
        content:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
    {
        img: '/assets/images/testimonials-profile.webp',
        name: 'Joe Snow',
        desig: 'Travel Planner',
        stars: 4,
        content:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
    {
        img: '/assets/images/testimonials-profile.webp',
        name: 'Bruce Banner',
        desig: 'Travel Enthusiast',
        stars: 5,
        content:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
];

const layout = data.map((e) => {
    return `
        <div class="splide__slide testimonial">
            <div class="testimonial__head">
                <h3>TESTIMONIALS</h3>
                <h2>Trust our clients</h2>
            </div>
            <img
                src=${e.img}
                alt="Testimonial author Profile Picture"
            />
            <div class="testimonial__details">
                <div class="testimonial__details__name">
                    <h5>${e.name}</h5>
                    <span>/ ${e.desig}</span>
                </div>
                <div class="testimonial__details__stars">
                    ${`<span class="icon-star"></span>`.repeat(e.stars)}
                </div>
            </div>
            <div class="testimonial__content">
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC.
                </p>
            </div>
        </div>`;
});

testimonials.innerHTML += layout.join(' ');

const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    // autoplay: true,
    pagination: true,
    arrows: false,
});

splide.mount();

leftArrow.addEventListener('click', () => splide.go('<'));
rightArrow.addEventListener('click', () => splide.go('>'));
