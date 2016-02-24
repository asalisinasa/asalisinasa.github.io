(function() {

    //////////////////// Yandex MAPS///////////////////////////////
    ///////////////////////////////////////////////////////////////

    var myMap;
    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map('yandex-map', {
            center: [59.940128, 30.328494],
            controls: ['zoomControl'],
            zoom: 16
        });
        myMap.geoObjects.add(new ymaps.Placemark([59.93855426, 30.32247950], {
            balloonContentHeader: '<strong>Gllacy</strong>',
            balloonContentBody: '191186, Санкт-Петербург,<br> ул. Б. Конюшенная, д. 19/8',
            balloonContentFooter: 'тел. +7 (812) 275-75-75'
        }, {
            iconLayout: 'default#image',
            iconImageSize: [218, 142],
            iconImageHref: '../img/icon/map-pin.png',
            iconImageOffset: [-15, -155]
        }));
        myMap.behaviors.disable('scrollZoom');
    }



    //////////////////// Textarea ///////////////////////////////
    /////////////////////////////////////////////////////////////

    var textarea = document.querySelectorAll(".textarea");

    for (var i = 0; i < textarea.length; i++) {
        textarea[i].addEventListener("focusout", function() {
            var elem = this;
            var placeholder = this.nextElementSibling;
            var form_hint = placeholder.firstElementChild;
            if (elem.value.length == 0) {
                form_hint.classList.remove("lostfocus");
            } else {
                form_hint.classList.add("lostfocus");
            }
        }, false);
    }



    //////////////////// FeedbackForm /////////////////////////////
    ///////////////////////////////////////////////////////////////

    var link = document.querySelector(".adress-block__btn");
    var popup = document.querySelector(".feedback-form");
    var close = document.querySelector(".feedback-form__btn--hidden");

    if (link != null && popup != null) {
        var name = popup.querySelector("[name=name]");
        var email = popup.querySelector("[name=email]");
        var text = popup.querySelector("[name=text]");
        var form = popup.querySelector("form");

        link.addEventListener("click", function(event) {
            event.preventDefault();
            popup.classList.add("feedback-form--show");
            popup.classList.remove("feedback-form--error");
            name.focus();
        });
        window.addEventListener("keydown", function(event) {
            if (event.keyCode === 27) {
                if (popup.classList.contains("feedback-form--show")) {
                    popup.classList.remove("feedback-form--show");
                    popup.classList.remove("feedback-form--error");
                }
            }
        });
        form.addEventListener("submit", function(event) {
            if (!name.value || !email.value) {
                event.preventDefault();
                popup.classList.remove("feedback-form--error");
                popup.offsetWidth = popup.offsetWidth;
                popup.classList.add("feedback-form--error");
            }
        });
        close.addEventListener("click", function(event) {
            event.preventDefault();
            popup.classList.remove("feedback-form--show");
        });
        cancel.addEventListener("click", function(event) {
            event.preventDefault();
            popup.classList.remove("feedback-form--show");
        });
        mOverlay.addEventListener("click", function(e) {
            if (e.target == modal.parentNode)
                popup.classList.remove("feedback-form--show");
        });
    }

})();