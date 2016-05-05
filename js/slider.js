/** @fileoverview Отрисовывка и открытие галереи в полноэкранном режиме */

'use strict';

/* jslint browser: true */
/* ESLint browser: true */

/** Список кодов клавиш
 * @enum {number}
 */
var KeyCode: {
  ENTER: 13,
  SPACE: 32,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}

var slider = document.querySelector(".slider");
var btnNext = slider.querySelector(".slider__arrow--next");
var btnPrev = slider.querySelector(".slider__arrow--prev");

var slidesContainer = slider.querySelector(".slider__items");
var slides = slidesContainer.querySelectorAll('.slider__item');
console.log(slides);

var slideNumber = 1;

btnPrev.classList.add('slider__arrow--disabled');

function showNext() {
  switch(slideNumber) {
    case 2:
      slidesContainer.classList.add('slider__items--show-second')
      break;
    case 3:
      slidesContainer.classList.add('slider__items--show-third')
      break;
    case 4:
      slidesContainer.classList.add('slider__items--show-fourth')
      break;
  }
}

function _onDocumentKeyDown(evt) {
  evt.preventDefault();
  switch (evt.keyCode) {
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
