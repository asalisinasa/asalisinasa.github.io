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

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(9);
	__webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/** @fileoverview Набор вспомогательных методов и свойств */

	'use strict';



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
	  },

	  /** Механизм наследования
	 * @param   {Object}  ChildClass
	 * @param   {Object}  ParentClass
	 */
	  inherit: function(ParentClass, ChildClass) {
	    var EmptyConstructor = function() {};

	    EmptyConstructor.prototype = ParentClass.prototype;
	    ChildClass.prototype = new EmptyConstructor();
	    ChildClass.prototype.constructor = ChildClass;
	    ChildClass.prototype.superclass = ParentClass.prototype;
	  }
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Открытие галереи в полноэкранном режиме */

	'use strict';



	var gallery = __webpack_require__(3);
	var galleryElement = document.querySelector('.photogallery');

	galleryElement.addEventListener('click', gallery._onGalleryClick);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Поведение элемента галереи */


	'use strict';



	var utilities = __webpack_require__(1);

	var galleryOverlay = document.querySelector('.overlay-gallery');
	var galleryElement = document.querySelector('.photogallery');
	var picturesContainer = galleryOverlay.querySelector('.overlay-gallery-preview');
	var currentPictureNumber = galleryOverlay.querySelector('.preview-number-current');
	var picturesSum = galleryOverlay.querySelector('.preview-number-total');
	var btnNext = galleryOverlay.querySelector('.overlay-gallery-control-right');
	var btnPrev = galleryOverlay.querySelector('.overlay-gallery-control-left');
	var btnClose = galleryOverlay.querySelector('.overlay-gallery-close');

	/** @type {Array.<Object>} */
	var picturesList = galleryElement.getElementsByTagName('IMG');


	/** @constructor */
	var Gallery = function() {
	  this.picturesSrc = [];
	  this.pictureNumber = 1;

	  this._onGalleryClick = this._onGalleryClick.bind(this);
	  this._onNextClick = this._onNextClick.bind(this);
	  this._onPrevClick = this._onPrevClick.bind(this);
	  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
	  this._onCloseClick = this._onCloseClick.bind(this);

	  this._createGallery();
	  this._onHashChange();
	  window.addEventListener('hashchange', this._onHashChange.bind(this));
	};


	Gallery.prototype.getSrcArray = function() {
	  this.picturesSrc = Array.prototype.map.call(picturesList, function(picture) {
	    return picture.getAttribute('src');
	  });
	};


	Gallery.prototype._createGallery = function() {
	  this.getSrcArray();
	  this.currentPicture = picturesContainer.appendChild(new Image());
	  picturesSum.textContent = picturesList.length;
	};


	Gallery.prototype.changePicture = function(pictureNumb) {
	  this.pictureNumber = pictureNumb;
	  this.currentPicture.src = this.picturesSrc[this.pictureNumber - 1];
	  currentPictureNumber.textContent = this.pictureNumber;
	  this.setBtnDisabled();
	};


	/** @param {String} url */
	Gallery.prototype.changeURL = function(url) {
	  var pictureUrl;

	  if(url) {
	    pictureUrl = '#photo/' + url;
	    location.hash = pictureUrl;
	  } else {
	    window.location.hash = '';
	  }
	};


	Gallery.prototype.setBtnDisabled = function() {
	  btnNext.classList.toggle('overlay-gallery-control-disabled', this.pictureNumber >= this.picturesSrc.length);
	  btnPrev.classList.toggle('overlay-gallery-control-disabled', this.pictureNumber <= 1);
	};


	/** @param {Number} pictureNumb */
	Gallery.prototype.showGallery = function(picture) {
	  this.changePicture(picture);

	  utilities.showElem(galleryOverlay);

	  btnNext.addEventListener('click', this._onNextClick);
	  btnPrev.addEventListener('click', this._onPrevClick);
	  btnClose.addEventListener('click', this._onCloseClick);
	  window.addEventListener('keydown', this._onDocumentKeyDown);
	};


	/** @param {MouseEvent} evt */
	Gallery.prototype._onGalleryClick = function(evt) {
	  evt.preventDefault();
	  if (evt.target.tagName === 'IMG') {
	    this.changeURL(evt.target.getAttribute('src'));
	    this.pictureNumber = +evt.target.id;
	  }
	};


	Gallery.prototype._onHashChange = function() {
	  var PICTURE_REG_EXP = new RegExp(/#photo\/(\S+)/);
	  var checkHash = location.hash.match(PICTURE_REG_EXP);

	  if (checkHash) {
	    this.pictureNumber = this.picturesSrc.indexOf(checkHash[1]) + 1;
	    this.showGallery(this.pictureNumber);
	  } else {
	    this.closeGallery();
	  }
	};


	/** @param {MouseEvent} evt */
	Gallery.prototype._onNextClick = function(evt) {
	  evt.preventDefault();
	  this.showNext();
	};


	/** @param {MouseEvent} evt */
	Gallery.prototype._onPrevClick = function(evt) {
	  evt.preventDefault();
	  this.showPrev();
	};


	Gallery.prototype.showNext = function() {
	  this.pictureNumber++;
	  if(this.pictureNumber < this.picturesSrc.length + 1) {
	    this.changeURL(this.picturesSrc[this.pictureNumber - 1]);
	  }
	  this.setBtnDisabled();
	};


	Gallery.prototype.showPrev = function() {
	  this.pictureNumber--;
	  if(this.pictureNumber > -1) {
	    this.changeURL(this.picturesSrc[this.pictureNumber - 1]);
	  }
	  this.setBtnDisabled();
	};


	Gallery.prototype.closeGallery = function() {
	  history.pushState(null, null, window.location.pathname);

	  utilities.hideElem(galleryOverlay);

	  btnNext.removeEventListener('click', this._onNextClick);
	  btnPrev.removeEventListener('click', this._onPrevClick);
	  btnClose.removeEventListener('click', this._onCloseClick);
	  window.removeEventListener('keydown', this._onDocumentKeyDown);
	};


	/** @param {KeyboardEvent} evt */
	Gallery.prototype._onDocumentKeyDown = function(evt) {
	  evt.preventDefault();
	  switch (evt.keyCode) {
	    case utilities.KeyCode.ESC:
	      this.changeURL();
	      break;
	    case utilities.KeyCode.RIGHT:
	      this.showNext();
	      break;
	    case utilities.KeyCode.LEFT:
	      this.showPrev();
	      break;
	    default:
	      break;
	  }
	};


	/** @param {MouseEvent} evt */
	Gallery.prototype._onCloseClick = function(evt) {
	  evt.preventDefault();
	  this.changeURL();
	};


	module.exports = new Gallery();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Загрузка, фильтрация и постраничная отрисовка отзывов  */


	'use strict';



	var Review = __webpack_require__(5);
	var getFilteredReviews = __webpack_require__(8);
	var utilities = __webpack_require__(1);

	var reviewsFilter = document.querySelector('.reviews-filter');
	var reviewsFilterItem = reviewsFilter.elements['reviews'];
	var reviewsContainer = document.querySelector('.reviews-list');
	var moreBtn = document.querySelector('.reviews-controls-more');

	/** @type {Array.<Object>} */
	var reviews = [];

	/** @type {Array.<Object>} */
	var reviewsToRender = [];

	/** @type {Array.<Review>} */
	var renderedReviews = [];

	/** @constant {string} */
	var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

	/** @constant {number} */
	var PAGE_SIZE = 3;

	/** @type {number} */
	var pageNumber = 0;

	/** @type {string} */
	var filterKey = 'filter';

	/** @type {string} */
	var currentFilter;


	/**
	* Постраничная отрисовка отзывов на странице
	* @param {Object} reviewList
	* @param {Number} page
	* @param {Boolean} replace
	*/
	var renderReviews = function(reviewList, page, replace) {
	  if (replace) {
	    renderedReviews.forEach(function(review) {
	      review.remove();
	    });
	    renderedReviews = [];
	  }

	  var from = page * PAGE_SIZE;
	  var to = from + PAGE_SIZE;

	  reviewList.slice(from, to).forEach(function(review) {
	    renderedReviews.push(new Review(review, reviewsContainer));
	  });

	  showHideMoreBtn();
	};


	var isNextPageAvailable = function() {
	  return pageNumber < Math.floor(reviewsToRender.length / PAGE_SIZE);
	};


	var showHideMoreBtn = function() {
	  if (isNextPageAvailable()) {
	    utilities.showElem(moreBtn);
	  } else {
	    utilities.hideElem(moreBtn);
	  }
	};


	var showNextPage = function() {
	  moreBtn.addEventListener('click', function() {
	    showHideMoreBtn();
	    pageNumber++;
	    renderReviews(reviewsToRender, pageNumber, false);
	  });
	};


	/** Фильтрация отзывов
	* @param {string} filter
	*/
	var setFilterEnabled = function(filter) {
	  reviewsToRender = getFilteredReviews(reviews, filter);
	  pageNumber = 0;
	  renderReviews(reviewsToRender, pageNumber, true);
	  showHideMoreBtn();
	  localStorage.setItem(filterKey, filter);
	};


	var setFiltrationEnabled = function() {
	  reviewsFilter.addEventListener('click', function(evt) {
	    if (evt.target.classList.contains('reviews-filter-item')) {
	      setFilterEnabled(evt.target.getAttribute('for'));
	    }
	  });
	};


	utilities.hideElem(reviewsFilter);


	/** Загрузка отзывов
	* @param {Array.<Object>} loadedReviews
	*/
	utilities.getData(function(loadedReviews) {
	  reviews = loadedReviews;
	  reviewsToRender = reviews;
	  currentFilter = localStorage.getItem(filterKey);

	  setFiltrationEnabled();

	  for (var i = 0; i < localStorage.length; i++) {
	    if (localStorage.key(i) === filterKey && localStorage.hasOwnProperty(filterKey)) {
	      reviewsFilterItem.value = currentFilter;
	      setFilterEnabled(currentFilter);
	    }
	  }

	  renderReviews(reviewsToRender, pageNumber, true);
	  showNextPage();
	}, REVIEWS_LOAD_URL);


	utilities.showElem(reviewsFilter);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Поведение элемента отзыва */


	'use strict';



	var utilities = __webpack_require__(1);
	var BaseComponent = __webpack_require__(6);
	var getReviewsElement = __webpack_require__(7);


	/**
	* @param {Object} data
	* @param {HTMLElement} container
	* @constructor
	*/
	var Review = function(data, reviewsContainer) {
	  BaseComponent.call(this, data, reviewsContainer);

	  this.element = getReviewsElement(this.data, this.container);

	  this.add();
	  this.remove = this.remove.bind(this);
	  this._onQuizClick = this._onQuizClick.bind(this);
	};


	utilities.inherit(BaseComponent, Review);


	Review.prototype.add = function() {
	  BaseComponent.prototype.add.call(this);
	  this.element.addEventListener('click', this._onQuizClick);
	};


	Review.prototype._onQuizClick = function(evt) {
	  evt.preventDefault();
	  if (evt.target.classList.contains('review-quiz-answer')) {
	    evt.target.classList.add('review-quiz-answer-active');
	  }
	};


	Review.prototype.remove = function() {
	  BaseComponent.prototype.remove.call(this);
	  this.element.removeEventListener('click', this._onQuizClick);
	};


	module.exports = Review;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/** @fileoverview Конструктор, описывающий базовую DOM-компоненту */


	'use strict';



	function BaseComponent(data, container) {
	  this.data = data;
	  this.container = container;
	}


	BaseComponent.prototype.add = function() {
	  this.container.appendChild(this.element);
	};


	BaseComponent.prototype.remove = function() {
	  this.container.removeChild(this.element);
	};


	module.exports = BaseComponent;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/** @fileoverview Шаблон отзыва и функция его отрисовки*/


	'use strict';



	/** @constant {number} IMG_TIMEOUT */
	var IMG_TIMEOUT = 10000;

	var reviewsTemplate = document.querySelector('#review-template');
	var reviewToClone;


	if ('content' in reviewsTemplate) {
	  reviewToClone = reviewsTemplate.content.querySelector('.review');
	} else {
	  reviewToClone = reviewsTemplate.querySelector('.review');
	}


	/**
	* @param {Object} data
	* @param {HTMLElement} container
	* @return {HTMLElement} rewiew
	*/
	var getReviewsElement = function(data, container) {
	  var review = reviewToClone.cloneNode(true);
	  var reviewText = review.querySelector('.review-text');
	  var reviewRating = review.querySelector('.review-rating');
	  var reviewImg = review.querySelector('.review-author');

	  reviewRating.style.display = 'inline-block';
	  for(var i = 0; i < data.rating - 1; i++) {
	    reviewRating.parentNode.insertBefore(reviewRating.cloneNode(true), reviewRating.nextSibling);
	  }
	  reviewText.textContent = data.description;
	  container.appendChild(review);

	  var img = new Image();
	  var imgLoadTimeout;

	  /** @param {ProgressEvent} evt */
	  img.onload = function(evt) {
	    clearTimeout(imgLoadTimeout);
	    reviewImg.src = evt.target.src;
	    reviewImg.width = 124;
	    reviewImg.width = 124;
	  };

	  img.onerror = function() {
	    review.classList.add('review-load-failure');
	  };

	  img.src = data.author.picture;

	  imgLoadTimeout = setTimeout(function() {
	    img.src = '';
	    review.classList.add('review-load-failure');
	  }, IMG_TIMEOUT);

	  return review;
	};


	module.exports = getReviewsElement;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @fileoverview Фильтрация списка отзывов */


	'use strict';



	/** @enum {number} */
	var Filter = {
	  'ALL': 'all',
	  'RECENT': 'reviews-recent',
	  'GOOD': 'reviews-good',
	  'BAD': 'reviews-bad',
	  'POPULAR': 'reviews-popular'
	};


	/**
	 * @param {Array.<Object>} filteredReviews
	 * @param {Filter} filter
	 * @return {Array.<Object>}
	 */
	var getFilteredReviews = function(filteredReviews, filter) {
	  var reviewsToFilter = filteredReviews.slice(0);
	  var currentDate = new Date();
	  var outsideDate = currentDate.setDate(currentDate.getDate() - 14);

	  switch (filter) {
	    case Filter.ALL:
	      break;

	    case Filter.RECENT:
	      reviewsToFilter.sort(function(a, b) {
	        return new Date(b.date) - new Date(a.date);
	      });

	      return reviewsToFilter.filter(function(review) {
	        return new Date(review.date) > outsideDate;
	      });

	    case Filter.GOOD:
	      var goodReviews = reviewsToFilter.filter(function(review) {
	        return review.rating > 2;
	      });
	      return goodReviews.sort(function(a, b) {
	        return b.rating - a.rating;
	      });

	    case Filter.BAD:
	      var badReviews = reviewsToFilter.filter(function(review) {
	        return review.rating < 3;
	      });
	      return badReviews.sort(function(a, b) {
	        return a.rating - b.rating;
	      });

	    case Filter.POPULAR:
	      return reviewsToFilter.sort(function(a, b) {
	        return b.review_usefulness - a.review_usefulness;
	      });
	  }

	  return reviewsToFilter;
	};


	module.exports = getFilteredReviews;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @fileoverview Валидация полей формы, установка cookies */

	'use strict';



	var utilities = __webpack_require__(1);
	var browserCookies = __webpack_require__(10);

	/** @constant {number} MIN_MARKS_POSITIVE_VALUE*/
	var MIN_MARKS_POSITIVE_VALUE = 3;

	var formContainer = document.querySelector('.overlay-container');
	var formOpenButton = document.querySelector('.reviews-controls-new');
	var formCloseButton = document.querySelector('.review-form-close');
	var form = formContainer.querySelector('.review-form');
	var formRatingMarkGroup = form.querySelector('.review-form-group-mark');
	var formRatingMark = form.elements['review-mark'];
	var formNameField = form.elements['review-name'];
	var formTextField = form.elements['review-text'];
	var formNameLabel = form.querySelector('.review-fields-name');
	var formTextLabel = form.querySelector('.review-fields-text');
	var formSubmitBtn = form.querySelector('.review-submit');
	var formHint = form.querySelector('.review-fields');
	var selectedMarkValue;

	formNameField.value = browserCookies.get('formNameField');
	formRatingMark.value = browserCookies.get('formRatingMark') || formRatingMark.value;

	formSubmitBtn.disabled = true;
	formNameField.required = true;
	utilities.hideElem(formTextLabel);

	form.onsubmit = function(evt) {
	  var currentDate = new Date();
	  var myDate = new Date(currentDate.getFullYear(), 10, 11);
	  var dateExpire;
	  var expiresOption;

	  if (myDate > currentDate) {
	    myDate.setFullYear(myDate.getFullYear() - 1);
	  }
	  dateExpire = new Date(currentDate.valueOf() + (currentDate - myDate));
	  expiresOption = { expires: dateExpire.toUTCString() };

	  evt.preventDefault();
	  browserCookies.set('formRatingMark', formRatingMark.value, expiresOption);
	  browserCookies.set('formNameField', formNameField.value, expiresOption);

	  this.submit();
	};

	function checkRatingValue() {
	  if ((selectedMarkValue < MIN_MARKS_POSITIVE_VALUE) && (formTextField.value.length === 0)) {
	    formTextField.required = true;
	    utilities.showElem(formTextLabel);
	  } else {
	    formTextField.required = false;
	    utilities.hideElem(formTextLabel);
	  }
	}

	function validateForm() {
	  if ((formNameField.value.length !== 0) && (!formTextField.required || (formTextField.value.length !== 0))) {
	    formSubmitBtn.disabled = false;
	    utilities.hideElem(formHint);
	  }
	  if ((formNameField.value.length === 0) || (formTextField.required && (formTextField.value.length !== 0))) {
	    formSubmitBtn.disabled = true;
	    utilities.showElem(formHint);
	  }
	  if (formTextField.required && (formTextField.value.length === 0)) {
	    formSubmitBtn.disabled = true;
	    utilities.showElem(formTextLabel);
	    utilities.showElem(formHint);
	  } else {
	    utilities.hideElem(formTextLabel);
	  }
	  if (formNameField.value.length === 0) {
	    utilities.showElem(formNameLabel);
	  } else {
	    utilities.hideElem(formNameLabel);
	  }
	}

	formRatingMarkGroup.addEventListener('click', function(evt) {
	  if (!evt.target.classList.contains('review-mark-label')) {
	    selectedMarkValue = evt.target.value;
	  }
	  checkRatingValue();
	  validateForm();
	}, false);

	formNameField.addEventListener('change', function(evt) {
	  evt.preventDefault();
	  checkRatingValue();
	  validateForm();
	});

	formTextField.addEventListener('change', function(evt) {
	  evt.preventDefault();
	  checkRatingValue();
	  validateForm();
	});

	formOpenButton.onclick = function(evt) {
	  evt.preventDefault();
	  utilities.showElem(formContainer);
	};

	formCloseButton.onclick = function(evt) {
	  evt.preventDefault();
	  utilities.hideElem(formContainer);
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.defaults = {};

	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;

	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;

	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
	  var expDate = expires ? new Date(
	      // in case expires is an integer, it should specify the number of days till the cookie expires
	      typeof expires == 'number' ? new Date().getTime() + (expires * 864e5) :
	      // else expires should be either a Date object or in a format recognized by Date.parse()
	      expires
	  ) : '';

	  // Set cookie
	  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
	  .replace('(', '%28')
	  .replace(')', '%29') +
	  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                          // Add domain
	  (path     ? ';path='   + path   : '') +                                          // Add path
	  (secure   ? ';secure'           : '') +                                          // Add secure option
	  (httponly ? ';httponly'         : '');                                           // Add httponly option
	};

	exports.get = function(name) {
	  var cookies = document.cookie.split(';');

	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];
	    var cookieLength = cookie.length;

	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');

	    // IE<11 emits the equal sign when the cookie value is empty
	    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

	    // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
	    if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	    }
	  }

	  return null;
	};

	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   0,
	    httponly: 0}
	  );
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';



	var utilities = __webpack_require__(1);

	/**
	 * @const
	 * @type {number}
	 */
	var HEIGHT = 300;

	/**
	 * @const
	 * @type {number}
	 */
	var WIDTH = 700;

	/**
	 * ID уровней.
	 * @enum {number}
	 */
	var Level = {
	  'INTRO': 0,
	  'MOVE_LEFT': 1,
	  'MOVE_RIGHT': 2,
	  'LEVITATE': 3,
	  'HIT_THE_MARK': 4
	};

	/**
	 * Порядок прохождения уровней.
	 * @type {Array.<Level>}
	 */
	var LevelSequence = [
	  Level.INTRO
	];

	/**
	 * Начальный уровень.
	 * @type {Level}
	 */
	var INITIAL_LEVEL = LevelSequence[0];

	/**
	 * Допустимые виды объектов на карте.
	 * @enum {number}
	 */
	var ObjectType = {
	  'ME': 0,
	  'FIREBALL': 1
	};

	/**
	 * Допустимые состояния объектов.
	 * @enum {number}
	 */
	var ObjectState = {
	  'OK': 0,
	  'DISPOSED': 1
	};

	/**
	 * Коды направлений.
	 * @enum {number}
	 */
	var Direction = {
	  NULL: 0,
	  LEFT: 1,
	  RIGHT: 2,
	  UP: 4,
	  DOWN: 8
	};

	/**
	 * Правила перерисовки объектов в зависимости от состояния игры.
	 * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	 */
	var ObjectsBehaviour = {};

	/**
	 * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	 * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	 * На движение мага влияет его пересечение с препятствиями.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	  // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	  // в воздухе на определенной высоте.
	  // NB! Сложность заключается в том, что поведение описано в координатах
	  // канваса, а не координатах, относительно нижней границы игры.
	  if (state.keysPressed.UP && object.y > 0) {
	    object.direction = object.direction & ~Direction.DOWN;
	    object.direction = object.direction | Direction.UP;
	    object.y -= object.speed * timeframe * 2;

	    if (object.y < 0) {
	      object.y = 0;
	    }
	  }

	  // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	  // опускается на землю.
	  if (!state.keysPressed.UP) {
	    if (object.y < HEIGHT - object.height) {
	      object.direction = object.direction & ~Direction.UP;
	      object.direction = object.direction | Direction.DOWN;
	      object.y += object.speed * timeframe / 3;
	    } else {
	      object.Direction = object.direction & ~Direction.DOWN;
	    }
	  }

	  // Если зажата стрелка влево, маг перемещается влево.
	  if (state.keysPressed.LEFT) {
	    object.direction = object.direction & ~Direction.RIGHT;
	    object.direction = object.direction | Direction.LEFT;
	    object.x -= object.speed * timeframe;
	  }

	  // Если зажата стрелка вправо, маг перемещается вправо.
	  if (state.keysPressed.RIGHT) {
	    object.direction = object.direction & ~Direction.LEFT;
	    object.direction = object.direction | Direction.RIGHT;
	    object.x += object.speed * timeframe;
	  }

	  // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	  if (object.y < 0) {
	    object.y = 0;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }

	  if (object.y > HEIGHT - object.height) {
	    object.y = HEIGHT - object.height;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }

	  if (object.x < 0) {
	    object.x = 0;
	  }

	  if (object.x > WIDTH - object.width) {
	    object.x = WIDTH - object.width;
	  }
	};

	/**
	 * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	 * и после этого неуправляемо движется по прямой в заданном направлении. Если
	 * он пролетает весь экран насквозь, он исчезает.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	  if (object.direction & Direction.LEFT) {
	    object.x -= object.speed * timeframe;
	  }

	  if (object.direction & Direction.RIGHT) {
	    object.x += object.speed * timeframe;
	  }

	  if (object.x < 0 || object.x > WIDTH) {
	    object.state = ObjectState.DISPOSED;
	  }
	};

	/**
	 * ID возможных ответов функций, проверяющих успех прохождения уровня.
	 * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	 * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	 * нужно прервать.
	 * @enum {number}
	 */
	var Verdict = {
	  'CONTINUE': 0,
	  'WIN': 1,
	  'FAIL': 2,
	  'PAUSE': 3,
	  'INTRO': 4
	};

	/**
	 * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	 * принимающие на вход состояние уровня и возвращающие true, если раунд
	 * можно завершать или false если нет.
	 * @type {Object.<Level, function(Object):boolean>}
	 */
	var LevelsRules = {};

	/**
	 * Уровень считается пройденным, если был выпущен файлболл и он улетел
	 * за экран.
	 * @param {Object} state
	 * @return {Verdict}
	 */
	LevelsRules[Level.INTRO] = function(state) {
	  var fireballs = state.garbage.filter(function(object) {
	    return object.type === ObjectType.FIREBALL;
	  });

	  return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	};

	/**
	 * Начальные условия для уровней.
	 * @enum {Object.<Level, function>}
	 */
	var LevelsInitialize = {};

	/**
	 * Первый уровень.
	 * @param {Object} state
	 * @return {Object}
	 */
	LevelsInitialize[Level.INTRO] = function(state) {
	  state.objects.push(
	    // Установка персонажа в начальное положение. Он стоит в крайнем левом
	    // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	    // уровне равна 2px за кадр.
	    {
	      direction: Direction.RIGHT,
	      height: 84,
	      speed: 2,
	      sprite: 'img/wizard.gif',
	      spriteReversed: 'img/wizard-reversed.gif',
	      state: ObjectState.OK,
	      type: ObjectType.ME,
	      width: 61,
	      x: WIDTH / 3,
	      y: HEIGHT - 100
	    }
	  );

	  return state;
	};

	/**
	 * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	 * и показывает приветственный экран.
	 * @param {Element} container
	 * @constructor
	 */
	var Game = function(container) {
	  this.container = container;
	  this.canvas = document.createElement('canvas');
	  this.canvas.width = container.clientWidth;
	  this.canvas.height = container.clientHeight;
	  this.container.appendChild(this.canvas);

	  this.ctx = this.canvas.getContext('2d');

	  this._onKeyDown = this._onKeyDown.bind(this);
	  this._onKeyUp = this._onKeyUp.bind(this);
	  this._pauseListener = this._pauseListener.bind(this);
	};

	Game.prototype = {
	  /**
	   * Текущий уровень игры.
	   * @type {Level}
	   */
	  level: INITIAL_LEVEL,

	  /**
	   * Состояние игры. Описывает местоположение всех объектов на игровой карте
	   * и время проведенное на уровне и в игре.
	   * @return {Object}
	   */
	  getInitialState: function() {
	    return {
	      // Статус игры. Если CONTINUE, то игра продолжается.
	      currentStatus: Verdict.CONTINUE,

	      // Объекты, удаленные на последнем кадре.
	      garbage: [],

	      // Время с момента отрисовки предыдущего кадра.
	      lastUpdated: null,

	      // Состояние нажатых клавиш.
	      keysPressed: {
	        ESC: false,
	        LEFT: false,
	        RIGHT: false,
	        SPACE: false,
	        UP: false
	      },

	      // Время начала прохождения уровня.
	      levelStartTime: null,

	      // Все объекты на карте.
	      objects: [],

	      // Время начала прохождения игры.
	      startTime: null
	    };
	  },

	  /**
	   * Начальные проверки и запуск текущего уровня.
	   * @param {Level=} level
	   * @param {boolean=} restart
	   */
	  initializeLevelAndStart: function(level, restart) {
	    level = typeof level === 'undefined' ? this.level : level;
	    restart = typeof restart === 'undefined' ? true : restart;

	    if (restart || !this.state) {
	      // При перезапуске уровня, происходит полная перезапись состояния
	      // игры из изначального состояния.
	      this.state = this.getInitialState();
	      this.state = LevelsInitialize[this.level](this.state);
	    } else {
	      // При продолжении уровня состояние сохраняется, кроме записи о том,
	      // что состояние уровня изменилось с паузы на продолжение игры.
	      this.state.currentStatus = Verdict.CONTINUE;
	    }

	    // Запись времени начала игры и времени начала уровня.
	    this.state.levelStartTime = Date.now();
	    if (!this.state.startTime) {
	      this.state.startTime = this.state.levelStartTime;
	    }

	    this._preloadImagesForLevel(function() {
	      // Предварительная отрисовка игрового экрана.
	      this.render();

	      // Установка обработчиков событий.
	      this._initializeGameListeners();

	      // Запуск игрового цикла.
	      this.update();
	    }.bind(this));
	  },

	  /**
	   * Временная остановка игры.
	   * @param {Verdict=} verdict
	   */
	  pauseLevel: function(verdict) {
	    if (verdict) {
	      this.state.currentStatus = verdict;
	    }

	    this.state.keysPressed.ESC = false;
	    this.state.lastUpdated = null;

	    this._removeGameListeners();
	    window.addEventListener('keydown', this._pauseListener);

	    this._drawPauseScreen();
	  },

	  /**
	   * Обработчик событий клавиатуры во время паузы.
	   * @param {KeyboardsEvent} evt
	   * @private
	   * @private
	   */
	  _pauseListener: function(evt) {
	    if (evt.keyCode === 32) {
	      evt.preventDefault();
	      var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	          this.state.currentStatus === Verdict.FAIL;
	      this.initializeLevelAndStart(this.level, needToRestartTheGame);

	      window.removeEventListener('keydown', this._pauseListener);
	    }
	  },

	  /**
	   * Отрисовка экрана паузы.
	   */
	  _drawTextContainer: function(text) {
	    var self = this;
	    var figureX = 10;
	    var figureY = 100;
	    var shadowOffset = 10;
	    var shadowX = figureX + shadowOffset;
	    var shadowY = figureY + shadowOffset;
	    var containerWidth = 190;
	    var containerHeightMax = 120;
	    var containerHeightMin = 100;
	    var marginX = figureX + 15;
	    var marginY = figureY + 26;
	    var font = '16px "PT Mono"';
	    var lines;

	     // Отрисовка тени
	    self.ctx.beginPath();
	    self.ctx.moveTo(shadowX, shadowY);
	    self.ctx.lineTo(shadowX, shadowY + containerHeightMin);
	    self.ctx.lineTo(shadowX + containerWidth, shadowY + containerHeightMax);
	    self.ctx.lineTo(shadowX + containerWidth, shadowY - 10);
	    self.ctx.closePath();
	    self.ctx.stroke();
	    self.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	    self.ctx.fill();

	     // Отрисовка фигуры
	    self.ctx.beginPath();
	    self.ctx.moveTo(figureX, figureY);
	    self.ctx.lineTo(figureX, figureY + containerHeightMin);
	    self.ctx.lineTo(figureX + containerWidth, figureY + containerHeightMax);
	    self.ctx.lineTo(figureX + containerWidth, figureY - 10);
	    self.ctx.closePath();
	    self.ctx.stroke();
	    self.ctx.fillStyle = '#FFFFFF';
	    self.ctx.fill();

	    // Функция для переноса строк текста сообщения
	    function getLines() {
	      var words = text.split(' ');
	      var testLine = '';
	      var line = '';
	      var canvasWidth = containerWidth - marginX * 2;
	      var result = [];

	      for (var i = 0; i <= words.length; i++) {
	        testLine = line + words[i] + ' ';
	        if (self.ctx.measureText(testLine).width > canvasWidth) {
	          result.push(line);
	          line = words[i] + ' ';
	          testLine = '';
	        } else {
	          line = testLine;
	        }
	      }
	      return result;
	    }

	    lines = getLines();

	    // Функция, которая будет отрисовывать текст сообщения
	    function drawText() {
	      for (var n = 0; n < lines.length; n++) {
	        var lineHeight = marginY + n * 16;
	        self.ctx.fillStyle = '#000';
	        self.ctx.font = font;
	        self.ctx.textBaseline = 'hanging';
	        self.ctx.fillText(lines[n], marginX, lineHeight);
	      }
	      return lines;
	    }

	    text = drawText(lines);
	    return text;
	  },

	  _drawPauseScreen: function() {
	    switch (this.state.currentStatus) {
	      case Verdict.WIN:
	        this._drawTextContainer('Стопроцентное попадание! Победа!');
	        break;
	      case Verdict.FAIL:
	        this._drawTextContainer('Мимо! Попробуй еще раз.');
	        break;
	      case Verdict.PAUSE:
	        this._drawTextContainer('Игра на паузе... Для продолжения - пробел.');
	        break;
	      case Verdict.INTRO:
	        this._drawTextContainer('Пробел для старта');
	        break;
	    }
	  },

	  /**
	   * Предзагрузка необходимых изображений для уровня.
	   * @param {function} callback
	   * @private
	   */
	  _preloadImagesForLevel: function(callback) {
	    if (typeof this._imagesArePreloaded === 'undefined') {
	      this._imagesArePreloaded = [];
	    }

	    if (this._imagesArePreloaded[this.level]) {
	      callback();
	      return;
	    }

	    var levelImages = [];
	    this.state.objects.forEach(function(object) {
	      levelImages.push(object.sprite);

	      if (object.spriteReversed) {
	        levelImages.push(object.spriteReversed);
	      }
	    });

	    var i = levelImages.length;
	    var imagesToGo = levelImages.length;

	    while (i-- > 0) {
	      var image = new Image();
	      image.src = levelImages[i];
	      image.onload = function() {
	        if (--imagesToGo === 0) {
	          this._imagesArePreloaded[this.level] = true;
	          callback();
	        }
	      }.bind(this);
	    }
	  },

	  /**
	   * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	   * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	   * должны исчезнуть.
	   * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	   */
	  updateObjects: function(delta) {
	    // Персонаж.
	    var me = this.state.objects.filter(function(object) {
	      return object.type === ObjectType.ME;
	    })[0];

	    // Добавляет на карту файрбол по нажатию на Shift.
	    if (this.state.keysPressed.SHIFT) {
	      this.state.objects.push({
	        direction: me.direction,
	        height: 24,
	        speed: 5,
	        sprite: 'img/fireball.gif',
	        type: ObjectType.FIREBALL,
	        width: 24,
	        x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	        y: me.y + me.height / 2
	      });

	      this.state.keysPressed.SHIFT = false;
	    }

	    this.state.garbage = [];

	    // Убирает в garbage не используемые на карте объекты.
	    var remainingObjects = this.state.objects.filter(function(object) {
	      ObjectsBehaviour[object.type](object, this.state, delta);

	      if (object.state === ObjectState.DISPOSED) {
	        this.state.garbage.push(object);
	        return false;
	      }

	      return true;
	    }, this);

	    this.state.objects = remainingObjects;
	  },

	  /**
	   * Проверка статуса текущего уровня.
	   */
	  checkStatus: function() {
	    // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	    // заранее известно, что да.
	    if (this.state.currentStatus !== Verdict.CONTINUE) {
	      return;
	    }

	    if (!this.commonRules) {
	      /**
	       * Проверки, не зависящие от уровня, но влияющие на его состояние.
	       * @type {Array.<functions(Object):Verdict>}
	       */
	      this.commonRules = [
	        /**
	         * Если персонаж мертв, игра прекращается.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkDeath(state) {
	          var me = state.objects.filter(function(object) {
	            return object.type === ObjectType.ME;
	          })[0];

	          return me.state === ObjectState.DISPOSED ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        },

	        /**
	         * Если нажата клавиша Esc игра ставится на паузу.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkKeys(state) {
	          return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	        },

	        /**
	         * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkTime(state) {
	          return Date.now() - state.startTime > 3 * 60 * 1000 ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        }
	      ];
	    }

	    // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	    // по всем универсальным проверкам и проверкам конкретного уровня.
	    // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	    // любое другое состояние кроме CONTINUE или пока не пройдут все
	    // проверки. После этого состояние сохраняется.
	    var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	    var currentCheck = Verdict.CONTINUE;
	    var currentRule;

	    while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	      currentRule = allChecks.shift();
	      currentCheck = currentRule(this.state);
	    }

	    this.state.currentStatus = currentCheck;
	  },

	  /**
	   * Принудительная установка состояния игры. Используется для изменения
	   * состояния игры от внешних условий, например, когда необходимо остановить
	   * игру, если она находится вне области видимости и установить вводный
	   * экран.
	   * @param {Verdict} status
	   */
	  setGameStatus: function(status) {
	    if (this.state.currentStatus !== status) {
	      this.state.currentStatus = status;
	    }
	  },

	  /**
	   * Отрисовка всех объектов на экране.
	   */
	  render: function() {
	    // Удаление всех отрисованных на странице элементов.
	    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

	    // Выставление всех элементов, оставшихся в this.state.objects согласно
	    // их координатам и направлению.
	    this.state.objects.forEach(function(object) {
	      if (object.sprite) {
	        var image = new Image(object.width, object.height);
	        image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	            object.spriteReversed :
	            object.sprite;
	        this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	      }
	    }, this);
	  },

	  /**
	   * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	   * и обновляет их согласно правилам их поведения, а затем запускает
	   * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	   * проверка не вернет состояние FAIL, WIN или PAUSE.
	   */
	  update: function() {
	    if (!this.state.lastUpdated) {
	      this.state.lastUpdated = Date.now();
	    }

	    var delta = (Date.now() - this.state.lastUpdated) / 10;
	    this.updateObjects(delta);
	    this.checkStatus();

	    switch (this.state.currentStatus) {
	      case Verdict.CONTINUE:
	        this.state.lastUpdated = Date.now();
	        this.render();
	        requestAnimationFrame(function() {
	          this.update();
	        }.bind(this));
	        break;

	      case Verdict.WIN:
	      case Verdict.FAIL:
	      case Verdict.PAUSE:
	      case Verdict.INTRO:
	      default:
	        this.pauseLevel();
	        break;
	    }
	  },

	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyDown: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = true;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = true;
	        break;
	      case 38:
	        this.state.keysPressed.UP = true;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = true;
	        break;
	    }

	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = true;
	    }
	  },

	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyUp: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = false;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = false;
	        break;
	      case 38:
	        this.state.keysPressed.UP = false;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = false;
	        break;
	    }

	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = false;
	    }
	  },

	  /** @private */
	  _initializeGameListeners: function() {
	    window.addEventListener('keydown', this._onKeyDown);
	    window.addEventListener('keyup', this._onKeyUp);
	  },

	  /** @private */
	  _removeGameListeners: function() {
	    window.removeEventListener('keydown', this._onKeyDown);
	    window.removeEventListener('keyup', this._onKeyUp);
	  }
	};

	window.Game = Game;
	window.Game.Verdict = Verdict;

	var game = new Game(document.querySelector('.demo'));
	var gameContainer = document.querySelector('.demo');
	var clouds = document.querySelector('.header-clouds');
	game.initializeLevelAndStart();
	game.setGameStatus(window.Game.Verdict.INTRO);

	/** @param  {HTMLElement} movedElement */
	var moveElement = function(movedElement) {
	  movedElement.style.backgroundPosition = -window.pageYOffset + 'px';
	};

	var pauseGame = function() {
	  if (utilities.isVisible(gameContainer)) {
	    game.setGameStatus(window.Game.Verdict.PAUSE);
	  }
	};

	var setEnabledParallax = function() {
	  if (!utilities.isVisible(clouds)) {
	    window.addEventListener('scroll', moveElement(clouds));
	  } else {
	    window.removeEventListener('scroll', moveElement(clouds));
	  }
	};

	var pauseGameThrottle = utilities.throttle(pauseGame, 100);
	var setEnabledParallaxThrottle = utilities.throttle(setEnabledParallax, 100);

	window.addEventListener('scroll', function() {
	  pauseGameThrottle();
	  setEnabledParallaxThrottle();
	});


/***/ }
/******/ ]);
