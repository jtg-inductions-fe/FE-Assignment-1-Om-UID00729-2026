import Splide from '@splidejs/splide';

const splideList = document.querySelector('.splide__list');
const testimonialTemplate = document.getElementById('testimonial-template');

const testimonialData = [
    {
        authorImgSrc: '/assets/images/testimonials-profile.webp',
        authorName: 'Mark Smith',
        authorDesignation: 'Travel Enthusiast',
        reviewStars: 5,
        testimonialComment:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
    {
        authorImgSrc: '/assets/images/testimonials-profile.webp',
        authorName: 'Joe Snow',
        authorDesignation: 'Travel Planner',
        reviewStars: 4,
        testimonialComment:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
    {
        authorImgSrc: '/assets/images/testimonials-profile.webp',
        authorName: 'Bruce Banner',
        authorDesignation: 'Travel Enthusiast',
        reviewStars: 5,
        testimonialComment:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
];

testimonialData.forEach((e) => {
    const templateClone = testimonialTemplate.content.cloneNode(true);
    const testimonial = templateClone.querySelector('.testimonial__slide');
    const testimonialStars = templateClone.querySelector(
        '.testimonial__slide-details-stars',
    );
    const testimonialComment = templateClone.querySelector(
        '.testimonial__slide-comment',
    );
    const testimonialDesignation = templateClone.querySelector(
        '.testimonial__slide-client-designation',
    );
    const testimonialName = templateClone.querySelector(
        '.testimonial__slide-client-name',
    );
    const testimonialImage = templateClone.querySelector(
        '.testimonial__slide-image',
    );

    testimonialImage.src = e.authorImgSrc;
    testimonialName.textContent = e.authorName;
    testimonialName.title = e.authorName;
    testimonialDesignation.textContent = `/ ${e.authorDesignation}`;
    testimonialComment.textContent = e.testimonialComment;
    testimonialComment.title = e.testimonialComment;

    for (let i = 0; i < e.reviewStars; i++) {
        const star = document.createElement('span');
        star.className = 'icon-star';
        testimonialStars.append(star);
    }

    splideList.append(testimonial);
});

const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    pagination: true,
    arrows: true,
    classes: {
        arrow: 'splide__arrow arrows',
        prev: 'splide_arrow splide__arrow--prev icon-arrow-left arrows arrows--left',
        next: 'splide_arrow splide__arrow--next icon-arrow-right arrows arrows--right',
    },
});

splide.mount();
