"use strict";

// function scrollFunction() {
//   const theNavigation = document.querySelector(".navbar");
//   const toTopBtn = document.querySelector("#to-top");

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 50) {
//       theNavigation.classList.add("navbar-sticky");
//       toTopBtn.classList.add("show");
//     } else {
//       theNavigation.classList.remove("navbar-sticky");
//       toTopBtn.classList.remove("show");
//     }
//   });
// }

// Use Intersection Observer to make the navigation bar sticky
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;
const hero = document.querySelector("header");

const makeNavSticky = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky-top", "navbar-sticky");
  } else {
    nav.classList.remove("sticky-top", "navbar-sticky");
  }
};

const options = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

const observerHero = new IntersectionObserver(makeNavSticky, options);
observerHero.observe(hero);

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Use Intersection Observer to reveal elements on scroll

const allSections = document.querySelectorAll("section");

const slideSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const options2 = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(slideSection, options2);

// make all the sections invisible in the beginning
// allSections.forEach((item) => {
//   sectionObserver.observe(item);
//   item.classList.add("section-hidden");
// });

// carousel functionality
const carouselInner = document.querySelector(".carousel-inner");
const carouselItems = document.querySelectorAll(".carousel-item");
const nextButton = document.querySelector(".carousel-control-next");
const prevButton = document.querySelector(".carousel-control-prev");
const dotsContainer = document.querySelector(".dots");

let clickCounter = 0;
let maxSlide = carouselItems.length - 1;

// a function that creates a dot for every slide
const createDots = function () {
  carouselItems.forEach((item, index) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="slider__button" data-slide="${index}"></button>`
    );
  });
};

createDots();

// a function that activates the dots
const activateDot = function (slideNumber) {
  // remove the "slider__button--active" from all the dots
  document
    .querySelectorAll(".slider__button")
    .forEach((button) => button.classList.remove("slider__button--active"));
  // add the "slider__button--active" to the dot corresponding to the input "slideNumber"
  document
    .querySelector(`.slider__button[data-slide="${slideNumber}"]`)
    .classList.add("slider__button--active");
};

activateDot(0);

const goToSlide = function (slideNumber) {
  carouselItems.forEach((item, index) => {
    item.style.display = "flex";
    item.style.transform = `translateX(${100 * (index - slideNumber)}%)`;
  });
};

goToSlide(0);

const nextSlideFunction = function () {
  clickCounter === maxSlide ? (clickCounter = 0) : clickCounter++;
  goToSlide(clickCounter);
  activateDot(clickCounter);
};

const prevSlideFunction = function () {
  clickCounter === 0 ? (clickCounter = maxSlide) : clickCounter--;
  goToSlide(clickCounter);
  activateDot(clickCounter);
};

// whenever we click on a dot, we want to go to the corresponding slide
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider__button")) {
    const slideNumber = e.target.dataset.slide;
    goToSlide(slideNumber);
    activateDot(slideNumber);
  }
});

nextButton.addEventListener("click", nextSlideFunction);
prevButton.addEventListener("click", prevSlideFunction);

// navigate the carousel with the arrows
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlideFunction();
  else if (e.key === "ArrowLeft") prevSlideFunction();
});

function incrementStats() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.innerText = 0;

    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const c = +counter.innerText;

      const increment = target / 200;

      if (c < target) {
        counter.innerText = Math.ceil(c + increment);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", incrementStats);

document.querySelector("#to-top").addEventListener("click", scrollToTop);

// making the carousel work on my own
