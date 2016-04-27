/** @fileoverview Поведение слайдера в секции портфолио */

'use strict';

/* jslint browser: true */
/* ESLint browser: true */

var utilities = require('../utilities');

var slider = document.querySelector('.slider');
var btnNext = slider.querySelector('.slider__arrow--next');
var btnPrev = slider.querySelector('.slider__arrow--prev');
var slidesContainer = slider.querySelector('.slider__items');
var slides = slidesContainer.querySelectorAll('.slider__item');
var stateIndicator = slider.querySelectorAll('.slider__control');
var counter = 1;

function sliderInit() {
  btnPrev.classList.add('slider__arrow--disabled');
  stateIndicator[0].style.opacity = '1';

  btnNext.addEventListener('click', _onNextClick);
  btnPrev.addEventListener('click', _onPrevClick);
  window.addEventListener('keydown', _onDocumentKeyDown);
}

sliderInit();

function showNext() {
  if (counter <= slides.length - 1) {
    counter++;
  }
  switch (counter) {
    case 2:
      slidesContainer.classList.add('slider__items--show-second');
      btnPrev.classList.remove('slider__arrow--disabled');
      stateIndicator[0].style.opacity = '0.3';
      stateIndicator[1].style.opacity = '1';
      break;
    case 3:
      slidesContainer.classList.add('slider__items--show-third');
      stateIndicator[1].style.opacity = '0.3';
      stateIndicator[2].style.opacity = '1';
      break;
    case 4:
      slidesContainer.classList.add('slider__items--show-fourth');
      btnNext.classList.add('slider__arrow--disabled');
      stateIndicator[2].style.opacity = '0.3';
      stateIndicator[3].style.opacity = '1';
      break;
  }
}

function showPrev() {
  if (counter > 1) {
    counter--;
  }
  switch (counter) {
    case 1:
      slidesContainer.classList.remove('slider__items--show-second');
      btnPrev.classList.add('slider__arrow--disabled');
      stateIndicator[0].style.opacity = '1';
      stateIndicator[1].style.opacity = '0.3';
      break;
    case 2:
      slidesContainer.classList.remove('slider__items--show-third');
      stateIndicator[1].style.opacity = '1';
      stateIndicator[2].style.opacity = '0.3';
      break;
    case 3:
      slidesContainer.classList.remove('slider__items--show-fourth');
      btnNext.classList.remove('slider__arrow--disabled');
      stateIndicator[2].style.opacity = '1';
      stateIndicator[3].style.opacity = '0.3';
      break;
  }
}

function _onNextClick(evt) {
  evt.preventDefault();
  showNext();
}

function _onPrevClick(evt) {
  evt.preventDefault();
  showPrev();
}

function _onDocumentKeyDown() {
  switch (event.keyCode) {
    case utilities.KeyCode.RIGHT:
      showNext();
      break;
    case utilities.KeyCode.LEFT:
      showPrev();
      break;
    default:
      break;
  }
}

// function _onSwipe(el, callback) {
//
//   var touchsurface = el,
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 150, //required min distance traveled to be considered swipe
//     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function(swipedir) {};
//
//   touchsurface.addEventListener('touchstart', function(e) {
//     var touchobj = e.changedTouches[0];
//     swipedir = 'none';
//     distX = 0;
//     distY = 0;
//     startX = touchobj.pageX;
//     startY = touchobj.pageY;
//     startTime = new Date().getTime(); // record time when finger first makes contact with surface
//     e.preventDefault();
//   }, false);
//
//   touchsurface.addEventListener('touchmove', function(e) {
//     e.preventDefault(); // prevent scrolling when inside DIV
//   }, false);
//
//   touchsurface.addEventListener('touchend', function(e) {
//     var touchobj = e.changedTouches[0];
//     distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
//     distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
//     elapsedTime = new Date().getTime() - startTime; // get time elapsed
//     if (elapsedTime <= allowedTime) { // first condition for awipe met
//       if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
//         swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
//       } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
//         swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
//       }
//     }
//     handleswipe(swipedir);
//     e.preventDefault();
//   }, false);
// }
//
// _onSwipe(slider, function(swipedir) {
//   if (swipedir === 'left') {
//     showNext();
//   }
//   if (swipedir === 'right') {
//     showPrev();
//   }
// });
