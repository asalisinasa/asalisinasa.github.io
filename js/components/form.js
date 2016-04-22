/* jslint browser: true */
/* ESLint browser: true */

'use strict';

(function() {
  var form = document.querySelector('.feedback-form__btn ');
  var formBtn = document.querySelector('.feedback-form__btn ');

  form.onsubmit = function(evt) {
    evt.preventDefault();
    formBtn.classList.add('feedback-form__btn--onsubmit');
    this.submit();
    formBtn.classList.remove('feedback-form__btn--onsubmit');
  };
})();
