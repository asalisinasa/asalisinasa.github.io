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
