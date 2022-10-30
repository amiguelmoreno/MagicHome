const sidebar = document.querySelector(".sidebar");
const btn = document.querySelector(".sidebar__button");
const icon = document.querySelector(".sidebar__icon");
const sideBackground = document.querySelector(".sidebar__background");
const nav = document.querySelector(".sidebar__nav");
const navLink = document.querySelectorAll(".sidebar__link");
const form = document.querySelector(".newsletter__form");
const succesMsg = document.querySelector(".sucess-message");

// SIDEBAR FUNCTIONALITY
toggleNav = function () {
    icon.classList.toggle("show");
    sideBackground.classList.toggle("sidebar__background--active");
    nav.classList.toggle("sidebar__nav--active");
};

[btn, ...navLink].forEach((el) => el.addEventListener("click", toggleNav));

// NEWSLETTER

checkMessage = function (msg) {
    succesMsg.textContent = `${msg}`;
    succesMsg.classList.add("sucess-message--active");

    setTimeout(
        () => succesMsg.classList.remove("sucess-message--active"),
        3000
    );
};

form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.querySelector(".newsletter__email").value = "";
    form.querySelector(".newsletter__email").blur();
    checkMessage("You have suscribed to the newsletter!");
});

// SLIDER

const slider = function () {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const slider = document.querySelector(".slider");
    const dotContainer = document.querySelector(".dots");

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                "beforeend",
                `<button class ='dots__dot' data-slide='${i}'></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll(".dots__dot")
            .forEach((dot) => dot.classList.remove("dots__dot--active"));

        document
            .querySelector(`.dots__dot[data-slide='${slide}']`)
            .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else curSlide++;

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else curSlide--;

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        createDots();
        activateDot(0);
        goToSlide(0);
    };
    init();
    // Event Handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();
