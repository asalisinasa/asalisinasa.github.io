/** @fileoverview Открытие и валидация формы обратной связи */

'use strict';


var utilities = require('../utilities');

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

var _onOpenClick = function(evt) {
  evt.preventDefault();
  form.classList.toggle('feedback-form--show');
};

var _onCloseClick = function(evt) {
  evt.preventDefault();
  closeForm();
};

var _onKeyDown = function(evt) {
  if (evt.keyCode === utilities.KeyCode.ESC) {
    evt.preventDefault();
    closeForm();
  }
};

formInit();

form.onsubmit = function(evt) {
  evt.preventDefault();
};
