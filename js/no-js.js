/** @fileoverview Прогрессивное улучшение */

'use strict';


var portfolioSection = document.querySelector('.portfolio');
var slider = document.querySelector('.slider');
var sliderItem = document.querySelectorAll('.slider__item');
var sliderItems = document.querySelector('.slider__items');
var sliderControls = document.querySelector('.slider__controls');
var sliderArrows = document.querySelector('.slider__arrows');


portfolioSection.classList.remove('portfolio--no-js');
slider.classList.remove('slider--no-js');
sliderItems.classList.remove('slider__items--no-js');
sliderControls.classList.remove('slider__controls--no-js');
sliderArrows.classList.remove('slider__arrows--no-js');

for (var i = 0; i < sliderItem.length; i++) {
  if (sliderItem[i].classList.contains('slider__item--no-js')) {
    sliderItem[i].classList.remove('slider__item--no-js');
  }
}
