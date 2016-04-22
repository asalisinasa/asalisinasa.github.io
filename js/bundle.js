/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use srtict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/** @fileoverview Набор вспомогательных методов и свойств */

	'use strict';

	/* jslint browser: true */
	/* ESLint browser: true */

	module.exports = {
	  /** Список кодов клавиш
	   * @enum {number}
	   */
	  KeyCode: {
	    ENTER: 13,
	    SPACE: 32,
	    ESC: 27,
	    LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40
	  },

	  /** Показывает элемент
	   * @param {Element} element
	   */
	  showElem: function(element) {
	    element.classList.remove('invisible');
	  },

	  /** Скрывает элемент
	   * @param {Element} element
	   */
	  hideElem: function(element) {
	    element.classList.add('invisible');
	  },

	  /** Проверяет, находится ли элемент в видимой области окна
	  * @param  {HTMLElement} element
	  * @return {Boolean}
	  */
	  isVisible: function(element) {
	    return element.getBoundingClientRect().bottom < 0;
	  },

	  /** Тормозит вызов функции
	  * @param  {Number} timeout
	  */
	  throttle: function(method, timeout) {
	    var wait = false;
	    return function() {
	      if (!wait) {
	        method();
	        wait = true;
	        setTimeout(function() {
	          wait = false;
	        }, timeout);
	      }
	    };
	  },

	  /** Получает данные от сервера с помощью AJAX
	  * @param {function(Array.<Object>)} callback
	  * @param {String} url
	  */
	  getData: function(callback, url) {
	    var xhr = new XMLHttpRequest();

	    /** @param {ProgressEvent} evt */
	    xhr.onload = function(evt) {
	      var requestObj = evt.target;
	      var response = requestObj.response;
	      var loadedData = JSON.parse(response);
	      callback(loadedData);
	    };

	    xhr.error = function() {
	      callback(true);
	    };

	    xhr.timeout = 10000;
	    xhr.ontimeout = function() {
	      callback(true);
	    };

	    xhr.open('GET', url);
	    xhr.send();
	  }
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/* jslint browser: true */
	/* ESLint browser: true */

	var hamburgerBtn = document.querySelector('.hamburger');
	var hamburgerLines = document.querySelector('.hamburger__line');
	var hamburgerCross = 'hamburger__line--cross';
	var headerMobile = document.querySelector('.page-header__mobile');
	var navContainer = document.querySelector('.main-nav');
	var nav = document.querySelector('.main-nav__list');

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
	  // var navItem = document.querySelectorAll('.main-nav__item');
	  if (evt.target.classList.contains('.main-nav__item')) {
	    hamburgerLines.classList.remove('hamburgerCross');
	    navContainer.classList.add('main-nav--hidden');
	  }
	};

	// var headerElement = document.querySelector('.main-nav');
	// var sectionIntro = document.getElementById('intro');
	// var sectionFeatures = document.getElementById('features');
	// var sectionPortfolio = document.getElementById('portfolio');
	// var sectionContacts = document.getElementById('contacts');
	//
	// var gray = '#cdcdcd';
	// var blue = '#0076fe';
	// var white = '#ffffff';
	//
	// var headerPOsition = headerElement.getBoundingClientRect();
	//
	// /**
	// * @param  {HTMLElement} element
	// * @return {Boolean}
	// */
	// var isVisible = function(element) {
	//   return element.getBoundingClientRect().bottom < 0;
	// };
	//
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
	//
	// window.addEventListener('scroll', function() {
	//   console.log(scroll);
	//   changeHeaderStyles();
	// });


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Поведение слайдера в секции портфолио */

	'use strict';

	/* jslint browser: true */
	/* ESLint browser: true */

	var utilities = __webpack_require__(1);

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

	function _onDocumentKeyDown(evt) {
	  evt.preventDefault();
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

	function _onSwipe(el, callback) {

	  var touchsurface = el,
	    swipedir,
	    startX,
	    startY,
	    distX,
	    distY,
	    threshold = 150, //required min distance traveled to be considered swipe
	    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	    allowedTime = 300, // maximum time allowed to travel that distance
	    elapsedTime,
	    startTime,
	    handleswipe = callback || function(swipedir) {};

	  touchsurface.addEventListener('touchstart', function(e) {
	    var touchobj = e.changedTouches[0];
	    swipedir = 'none';
	    distX = 0;
	    distY = 0;
	    startX = touchobj.pageX;
	    startY = touchobj.pageY;
	    startTime = new Date().getTime(); // record time when finger first makes contact with surface
	    e.preventDefault();
	  }, false);

	  touchsurface.addEventListener('touchmove', function(e) {
	    e.preventDefault(); // prevent scrolling when inside DIV
	  }, false);

	  touchsurface.addEventListener('touchend', function(e) {
	    var touchobj = e.changedTouches[0];
	    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
	    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
	    elapsedTime = new Date().getTime() - startTime; // get time elapsed
	    if (elapsedTime <= allowedTime) { // first condition for awipe met
	      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
	        swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
	      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
	        swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
	      }
	    }
	    handleswipe(swipedir);
	    e.preventDefault();
	  }, false);
	}

	_onSwipe(slider, function(swipedir) {
	  if (swipedir === 'left') {
	    showNext();
	  }
	  if (swipedir === 'right') {
	    showPrev();
	  }
	});


/***/ }
/******/ ]);