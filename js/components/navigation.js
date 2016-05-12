/** @fileoverview Открытие и скрытие меню навигации */

'use strict';



var hamburgerBtn = document.querySelector('.hamburger');
var hamburgerLines = document.querySelector('.hamburger__line');
var hamburgerCross = 'hamburger__line--cross';
var headerMobile = document.querySelector('.page-header__mobile');
var navContainer = document.querySelector('.main-nav');
var nav = document.querySelector('.main-nav__list');
var navItem = document.querySelector('.main-nav__link');

var isNavigationOpen = function() {
  return hamburgerLines.classList.contains(hamburgerCross);
};

var closeNavigation = function() {
  hamburgerLines.classList.remove(hamburgerCross);
  navContainer.classList.add('main-nav--hidden');

  hamburgerBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (isNavigationOpen()) {
      hamburgerLines.classList.remove(hamburgerCross);
      navContainer.classList.add('main-nav--hidden');
      headerMobile.classList.add('page-header__mobile--closed');
    } else {
      hamburgerLines.classList.add(hamburgerCross);
      navContainer.classList.remove('main-nav--hidden');
      headerMobile.classList.remove('page-header__mobile--closed');
    }
  });

  document.body.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && isNavigationOpen()) {
      hamburgerLines.classList.remove(hamburgerCross);
      navContainer.classList.add('main-nav--hidden');
    }
  });
};

closeNavigation();

nav.onclick = function(evt) {
  if (evt.target.classList.contains('.main-nav__item')) {
    hamburgerLines.classList.remove('hamburgerCross');
    navContainer.classList.add('main-nav--hidden');
  }
};


window.addEventListener("scroll", function() {
  closeNavigation();
});


// var headerElement = document.querySelector('.main-nav');
// var sectionIntro = document.getElementById('intro');
// var sectionFeatures = document.getElementById('features');
// var sectionPortfolio = document.getElementById('portfolio');
// var sectionContacts = document.getElementById('contacts');

// var gray = '#cdcdcd';
// var blue = '#0076fe';
// var white = '#ffffff';
//
// var headerPOsition = headerElement.getBoundingClientRect();

// /**
// * @param  {HTMLElement} element
// * @return {Boolean}
// */
// var isVisible = function(element) {
//   return element.getBoundingClientRect().bottom < 0;
// };

// var colorElement = function(element, bgColor, fontColor) {
//   var elementStyle = element.style;
//   element.style.color = fontColor;
//   element.style.backgroundColor = bgColor;
// };
//
// var changeHeaderStyles = function() {
//   if (isVisible(sectionIntro)) {
//     window.addEventListener('scroll', colorElement(headerElement, blue, gray));
//   }
// };
