/** @fileoverview Поведение слайдера в секции портфолио */

'use strict';


var utilities = require('../common/utilities');

var slider = document.querySelector('.slider');
var btnNext = slider.querySelector('.slider__arrow--next');
var btnPrev = slider.querySelector('.slider__arrow--prev');
var slidesContainer = slider.querySelector('.slider__items');

/** @type {Array.<Object>} */
var slides = slidesContainer.querySelectorAll('.slider__item');

/** @type {Array.<Object>} */
var stateIndicator = slider.querySelectorAll('.slider__control');

/** @type {number} */
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
      stateIndicator[2].style.opacity = '0.3';
      stateIndicator[3].style.opacity = '1';
      break;
    case 5:
      slidesContainer.classList.add('slider__items--show-fifth');
      stateIndicator[3].style.opacity = '0.3';
      stateIndicator[4].style.opacity = '1';
      break;
    case 6:
      slidesContainer.classList.add('slider__items--show-sixth');
      stateIndicator[4].style.opacity = '0.3';
      stateIndicator[5].style.opacity = '1';
      break;
    case 7:
      slidesContainer.classList.add('slider__items--show-seventh');
      btnNext.classList.add('slider__arrow--disabled');
      stateIndicator[5].style.opacity = '0.3';
      stateIndicator[6].style.opacity = '1';
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
      stateIndicator[2].style.opacity = '1';
      stateIndicator[3].style.opacity = '0.3';
      break;
    case 4:
      slidesContainer.classList.remove('slider__items--show-fifth');
      stateIndicator[3].style.opacity = '1';
      stateIndicator[4].style.opacity = '0.3';
      break;
    case 5:
      slidesContainer.classList.remove('slider__items--show-sixth');
      stateIndicator[4].style.opacity = '1';
      stateIndicator[5].style.opacity = '0.3';
      break;
    case 6:
      slidesContainer.classList.remove('slider__items--show-seventh');
      btnNext.classList.remove('slider__arrow--disabled');
      stateIndicator[5].style.opacity = '1';
      stateIndicator[6].style.opacity = '0.3';
      break;
  }
}


/** @param {MouseEvent} evt */
function _onNextClick(evt) {
  evt.preventDefault();
  showNext();
}


/** @param {MouseEvent} evt */
function _onPrevClick(evt) {
  evt.preventDefault();
  showPrev();
}


/** @param {KeyboardEvent} evt */
function _onDocumentKeyDown(event) {
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
