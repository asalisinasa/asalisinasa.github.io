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
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);


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

	  /** Список основных цветов
	   * @enum {string}
	   */
	  Color: {
	    white: '#ffffff',
	    blue: '#0076fe',
	    gray: '#cdcdcd'
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Открытие и скрытие меню навигации */

	'use strict';



	var hamburgerBtn = document.querySelector('.hamburger');
	var hamburgerLines = document.querySelector('.hamburger__line');
	var headerMobile = document.querySelector('.page-header__mobile');
	var navContainer = document.querySelector('.main-nav');
	var nav = document.querySelector('.main-nav__list');
	var navItem = document.querySelector('.main-nav__link');
	var hamburgerCross = 'hamburger__line--cross';


	var isNavigationOpen = function() {
	  var style = window.getComputedStyle(navContainer);
	  return (style.transform === 'matrix(1, 0, 0, 1, 0, 0)');
	};

	var closeNavigation = function() {
	  hamburgerLines.classList.remove(hamburgerCross);
	  headerMobile.classList.add('page-header__mobile--closed');
	  navContainer.classList.add('main-nav--hidden');
	};


	var openNavigation = function() {
	  hamburgerLines.classList.add(hamburgerCross);
	  navContainer.classList.remove('main-nav--hidden');
	  headerMobile.classList.remove('page-header__mobile--closed');
	};


	closeNavigation();


	var setNavigationEnabled = function() {
	  if (isNavigationOpen()) {
	    closeNavigation();
	  } else {
	    openNavigation();
	  }
	};


	/** @param {MouseEvent} evt */
	hamburgerBtn.addEventListener('click', function(evt) {
	  evt.preventDefault();
	  setNavigationEnabled();
	});


	/** @param {KeyboardEvent} evt */
	document.body.addEventListener('keydown', function(evt) {
	  if (evt.keyCode === 27 && isNavigationOpen()) {
	    hamburgerLines.classList.remove(hamburgerCross);
	    navContainer.classList.add('main-nav--hidden');
	  }
	});



	var utilities = __webpack_require__(1);
	var Section = __webpack_require__(4);

	var header = document.querySelector('.page-header');
	var nav = document.querySelector('.main-nav');
	var toggles = document.querySelectorAll('.main-nav__item-link');
	var intro = new Section($('#intro'));
	var features = new Section($('#features'));
	var portfolio = new Section($('#portfolio'));
	var about = new Section($('#about'));
	var windowTop;
	var windowHeight;


	var _removeCurrenClass = function() {
	  for (var i = 0; i < toggles.length; i++) {
	    var toggle = toggles[i];
	    toggle.classList.remove('main-nav__item-link--current-gray');
	    toggle.classList.remove('main-nav__item-link--current-white');
	    toggle.classList.remove('main-nav__item-link--current-blue');
	  }
	};


	var _onWindowResize = function() {
	  windowTop = window.pageYOffset;
	  windowHeight = window.innerHeight;
	};


	var _navInit = function() {
	  if (window.innerWidth > 768) {
	    nav.style.backgroundColor = utilities.Color.gray;
	    nav.style.color = utilities.Color.blue;
	  } else {
	    _hideHeader();
	    nav.style.backgroundColor = utilities.Color.white;
	  }
	}


	var _setEnabledCurrentLink = function() {
	  _onWindowResize();
	  _navInit();

	  if (window.innerWidth > 768) {
	    if (windowTop < windowHeight) {
	      _removeCurrenClass();
	      nav.style.backgroundColor = utilities.Color.gray;
	      nav.style.color = utilities.Color.blue;
	    }
	    if (windowTop > features.top - 60 && windowTop < features.bottom) {
	      _removeCurrenClass();
	      nav.style.backgroundColor = utilities.Color.white;
	      nav.style.color = utilities.Color.blue;
	      $('#nav1').addClass('main-nav__item-link--current-gray');
	    }
	    if (windowTop > portfolio.top - 60 && windowTop < portfolio.bottom) {
	      _removeCurrenClass();
	      nav.style.backgroundColor = utilities.Color.blue;
	      nav.style.color = utilities.Color.white;
	      $('#nav2').addClass('main-nav__item-link--current-gray');
	    }
	    if (windowTop > about.top - 100 && windowTop < about.bottom) {
	      _removeCurrenClass();
	      nav.style.backgroundColor = utilities.Color.gray;
	      nav.style.color = utilities.Color.white;
	      $('#nav3').addClass('main-nav__item-link--current-blue');
	    }
	  } else {
	    _removeCurrenClass();
	    nav.style.backgroundColor = utilities.Color.white;
	    nav.style.color = utilities.Color.blue;
	  }
	};

	var lastScroll = 0;

	var _hideHeader = function() {
	  if (windowTop > lastScroll) {
	    header.classList.add('page-header--hidden');
	  } else {
	    header.classList.remove('page-header--hidden');
	  }
	  lastScroll = windowTop;
	};


	var setEnabledCurrentLinkThrottle = utilities.throttle(_setEnabledCurrentLink, 100);
	var onWindowResizeThrottle = utilities.throttle(_onWindowResize, 100);

	_navInit();

	window.addEventListener('scroll', function() {
	  setEnabledCurrentLinkThrottle();
	  closeNavigation();
	});


	window.addEventListener('resize', onWindowResizeThrottle);


/***/ },
/* 4 */
/***/ function(module, exports) {

	/** @fileoverview Свойства и методы элемента секции */


	'use strict';



	/**
	 * @param {HTMLElement} section
	 * @constructor
	 */
	var Section = function(section) {
	  this.element = section;
	  this.height = this.element.height();
	  this.offset = this.element.offset();
	  this.top = this.offset.top;
	  this.left = this.offset.left;
	  this.bottom = this.top + this.height;
	  this.active = 'main-nav__item-link--current';
	};



	module.exports = Section;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Поведение слайдера в секции портфолио */

	'use strict';


	var utilities = __webpack_require__(1);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Открытие и валидация формы обратной связи */

	'use strict';


	var utilities = __webpack_require__(1);

	var form = document.querySelector('.feedback-form');
	var btnShowForm1 = document.getElementById('contact');
	var btnShowForm2 = document.querySelector('.about__btn');
	var btnSend = document.querySelector('.feedback-form__btn');
	var btnClose = document.querySelector('.feedback-form__close');


	var isFormOpen = function() {
	  return form.classList.contains('feedback-form--show');
	};


	var closeForm = function() {
	  if (form.classList.contains('feedback-form--show')) {
	    form.classList.remove('feedback-form--show');
	  }
	};


	var formInit = function() {
	  btnShowForm1.addEventListener('click', _onOpenClick);
	  btnShowForm2.addEventListener('click', _onOpenClick);

	  if(isFormOpen) {
	    btnClose.addEventListener('click', _onCloseClick);
	    document.addEventListener('keydown', _onKeyDown);
	  } else {
	    btnClose.removeEventListener('click', _onCloseClick);
	    document.removeEventListener('keydown', _onKeyDown);
	  }
	};


	/** @param {MouseEvent} evt */
	var _onOpenClick = function(evt) {
	  evt.preventDefault();
	  form.classList.toggle('feedback-form--show');
	};


	/** @param {MouseEvent} evt */
	var _onCloseClick = function(evt) {
	  evt.preventDefault();
	  closeForm();
	};


	/** @param {KeyboardEvent} evt */
	var _onKeyDown = function(evt) {
	  if (evt.keyCode === utilities.KeyCode.ESC) {
	    evt.preventDefault();
	    closeForm();
	  }
	};

	formInit();


/***/ },
/* 7 */
/***/ function(module, exports) {

	/** @fileoverview Прокрутка до якоря */



	'use strict';



	var links = $('.main-nav__item-link')

	links.on('click', function(e) {
	  e.preventDefault();
	  var targetSection = $(this).attr('href');
	  var targetOffset = $(targetSection).offset().top;
	  TweenMax.to(window, 1, { scrollTo:{y:targetOffset }, ease: Power3.easeOut } );
	});


/***/ }
/******/ ]);