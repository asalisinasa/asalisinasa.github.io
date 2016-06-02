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



var utilities = require('../common/utilities');
var Section = require('./section');

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
