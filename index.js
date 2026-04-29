'use strict';

const btn = document.querySelector('.sidebar__button');
const icon = document.querySelector('.sidebar__icon');
const sideBackground = document.querySelector('.sidebar__background');
const nav = document.querySelector('.sidebar__nav');
const navLink = document.querySelectorAll('.sidebar__link');
const formNews = document.querySelector('.newsletter__form');
const succesMsg = document.querySelector('.sucess-message');

//////////////////////////////////////////////////////
// SIDEBAR FUNCTIONALITY

const toggleNav = function () {
    icon.classList.toggle('show');
    sideBackground.classList.toggle('sidebar__background--active');
    nav.classList.toggle('sidebar__nav--active');
};

[btn, ...navLink].forEach(el => el.addEventListener('click', toggleNav));

/////////////////////////////////////////////
// NEWSLETTER

const checkMessage = function (msg) {
    succesMsg.textContent = msg;
    succesMsg.classList.add('sucess-message--active');
    setTimeout(() => succesMsg.classList.remove('sucess-message--active'), 3000);
};

formNews.addEventListener('submit', function (e) {
    e.preventDefault();
    formNews.querySelector('.newsletter__email').value = '';
    formNews.querySelector('.newsletter__email').blur();
    checkMessage('You have suscribed to the newsletter!');
});

//////////////////////////////////////////////////////
// SLIDER

const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const sliderEl = document.querySelector('.slider');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class='dots__dot' data-slide='${i}' aria-label='Go to slide ${i + 1}' role='tab'></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => {
            dot.classList.remove('dots__dot--active');
            dot.setAttribute('aria-selected', 'false');
        });
        const activeDot = document.querySelector(`.dots__dot[data-slide='${slide}']`);
        activeDot.classList.add('dots__dot--active');
        activeDot.setAttribute('aria-selected', 'true');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        createDots();
        activateDot(0);
        goToSlide(0);
    };
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });

    // Auto-play: pauses on hover
    let autoPlay = setInterval(nextSlide, 5000);
    sliderEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
    sliderEl.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
};

///////////////////////////////////////////////////
// LIKE TOGGLE

const likeButtons = document.querySelectorAll('.home__like');
const LIKED_KEY = 'magichome_liked';

const getLiked = () => JSON.parse(localStorage.getItem(LIKED_KEY) || '[]');
const saveLiked = arr => localStorage.setItem(LIKED_KEY, JSON.stringify(arr));

likeButtons.forEach((btn, i) => {
    if (getLiked().includes(i)) btn.classList.add('home__like--active');

    btn.addEventListener('click', function () {
        const liked = getLiked();
        const isLiked = liked.includes(i);
        saveLiked(isLiked ? liked.filter(idx => idx !== i) : [...liked, i]);
        btn.classList.toggle('home__like--active', !isLiked);
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => (btn.style.transform = ''), 200);
    });
});

///////////////////////////////////////////////////
// MODAL WINDOW

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const homesBtns = document.querySelectorAll('.home__btn');
const formContact = document.querySelector('.modal__form');
const allInputs = formContact.querySelectorAll('input');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

[...homesBtns, ...btnsOpenModal].forEach(el =>
    el.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    allInputs.forEach(el => {
        if (!el.classList.contains('btn__submit')) el.value = '';
    });
    checkMessage('Message sent!');
    closeModal();
});

///////////////////////////////////////////////////
// SCROLL REVEAL ANIMATIONS

const initScrollReveal = function () {
    const revealGroup = function (elements, fromTransform, toTransform, stagger) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    el.style.opacity = '1';
                    el.style.transform = toTransform;
                    el.addEventListener('transitionend', function () {
                        el.style.cssText = '';
                    }, { once: true });
                    observer.unobserve(el);
                });
            },
            { threshold: 0.05 }
        );

        // Write all styles first, then batch reads (observer.observe may read layout)
        elements.forEach(function (el, i) {
            el.style.opacity = '0';
            el.style.transform = fromTransform;
            el.style.transition = `opacity 0.7s ease ${i * stagger}ms, transform 0.7s ease ${i * stagger}ms`;
        });
        elements.forEach(function (el) {
            observer.observe(el);
        });
    };

    revealGroup(document.querySelectorAll('.feature'), 'translateY(5rem)', 'translateY(0)', 110);
    revealGroup(document.querySelectorAll('.home'), 'translateY(5rem)', 'translateY(0)', 80);

    const realtors = document.querySelector('.realtors');
    const newsletter = document.querySelector('.newsletter');
    const contact = document.querySelector('.contact');

    if (realtors) revealGroup([realtors], 'translateX(5rem)', 'translateX(0)', 0);
    if (newsletter) revealGroup([newsletter], 'translateY(4rem)', 'translateY(0)', 0);
    if (contact) revealGroup([contact], 'scale(0.95)', 'scale(1)', 0);
};

// Defer non-critical JS until after LCP paints
window.addEventListener('load', function () {
    slider();
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initScrollReveal, { timeout: 2000 });
    } else {
        setTimeout(initScrollReveal, 200);
    }
});
