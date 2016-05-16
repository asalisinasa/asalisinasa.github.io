/** @fileoverview Прокрутка до якоря */



'use strict';



var links = $('.main-nav__item-link')

links.on('click', function(e) {
  e.preventDefault();
  var targetSection = $(this).attr('href');
  var targetOffset = $(targetSection).offset().top;
  TweenMax.to(window, 1, { scrollTo:{y:targetOffset }, ease: Power3.easeOut } );
});
