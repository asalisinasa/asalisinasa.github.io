window.onload = function() {

    //////////////// Navigation ////////////////

    var navToggle = document.querySelector(".page-header__hamburger");
    var navIcon = document.querySelector(".page-header__hamburger-lines");
    var navWrapper = document.querySelector(".page-nav");
    var headerMini = document.querySelector(".page-header__mini");
    var header = document.querySelector(".page-header");

    header.classList.remove("page-header__no-js");
    navIcon.classList.remove("page-header__hamburger-lines--cross");
    navWrapper.classList.add("page-nav--closed");
    headerMini.classList.add("page-header__mini--closed");

    navToggle.addEventListener("click", function() {
        if (navIcon.classList.contains("page-header__hamburger-lines--cross")) {
            navIcon.classList.remove("page-header__hamburger-lines--cross");
            navIcon.classList.add("page-header__hamburger-lines");
            navWrapper.classList.add("page-nav--closed");
            headerMini.classList.add("page-header__mini--closed");
            header.classList.remove("page-header--active");
        } else {
            navIcon.classList.add("page-header__hamburger-lines--cross");
            navWrapper.classList.remove("page-nav--closed");
            headerMini.classList.remove("page-header__mini--closed");
            header.classList.add("page-header--active");
        }
    });


    //////////////// Popups ////////////////

    var form = document.querySelector(".form");
    if (form) {
        var inputRequired = form.querySelectorAll("[required]");
        var popup = document.querySelectorAll(".popup");
        var popupFailure = document.querySelector(".popup--failure");
        var popupAccept = document.querySelector(".popup--accept");
        var btnFailure = popupFailure.querySelector(".btn--failure");
        var btnAccept = popupAccept.querySelector(".btn--accept");
        var btnSubmit = form.querySelector(".btn--submit");

        form.onsubmit = function(event) {
            event.preventDefault();
            popupAccept.classList.add("popup--shown");
        };

        btnSubmit.onclick = function(event) {
            event.preventDefault();
            for (i = 0; i < inputRequired.length; i++) {
                if (!inputRequired[i].value) {
                    popupFailure.classList.add("popup--shown");
                    return;
                }
            }
        };

        btnFailure.onclick = function(event) {
            popupFailure.classList.remove("popup--shown");
        };

        btnAccept.onclick = function(event) {
            popupAccept.classList.remove("popup--shown");
        };

        window.addEventListener("keydown", function(event) {
            if (event.keyCode === 27) {
                for (var i = 0; i < popup.length; i++) {
                    if (popup[i].classList.contains("popup--shown")) {
                        popup[i].classList.remove("popup--shown");
                    }
                };
            }
        });
    }

    //////////////// Google Maps ////////////////

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 59.936253,
                lng: 30.321302
            },
            disableDefaultUI: true,
            scrollwheel: false,
            zoom: 16
        });
        var marker = new google.maps.Marker({
            position: {
                lat: 59.936253,
                lng: 30.321302
            },
            map: map,
            icon: "../img/icon-map-marker.svg"
        });
    }

    initMap();

    //////////////// Slider ////////////////

    var slider = document.querySelector(".reviews");
    var next = slider.querySelector(".reviews__arrow--next");
    var prev = slider.querySelector(".reviews__arrow--prev");
    var slides = slider.querySelector(".reviews__slides");
    var counter = 0;

    next.addEventListener("click", function(event) {
        event.preventDefault();

        counter++;
        if (counter > 2) counter = 2;

        if (counter == 1) {
            slides.classList.remove("reviews__slides--show-first");
            slides.classList.add("reviews__slides--show-second");
            prev.classList.remove("reviews__arrow--disabled");
        } else if (counter == 2) {
            slides.classList.remove("reviews__slides--show--second");
            slides.classList.add("reviews__slides--show-third");
            next.classList.add("reviews__arrow--disabled");
        }
    });

    prev.addEventListener("click", function(event) {
        event.preventDefault();

        counter--;
        if (counter < 0) counter = 0;

        if (counter === 0) {
            slides.classList.remove("reviews__slides--show-second");
            slides.classList.add("reviews__slides--show-first");
            prev.classList.add("reviews__arrow--disabled");
        } else if (counter == 1) {
            slides.classList.remove("reviews__slides--show-third");
            slides.classList.add("reviews__slides--show-second");
            next.classList.remove("reviews__arrow--disabled");
        }
    });
};
