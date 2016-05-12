(function() {

    //////////////////// SignIn /////////////////////////////
    ///////////////////////////////////////////////////////////////

    var btnSignIn = document.querySelector('.login');
    var popupSignIn = document.querySelector('.overlay-signin');
    var popupSignInInner = document.querySelector('.signin');
    var closeSignIn = document.querySelector('.close-button-signin');
    var form = document.getElementById('signin-form');

    if (btnSignIn !== null && popupSignIn !== null) {
        btnSignIn.addEventListener('click', function(event) {
            event.preventDefault();
            popupSignIn.classList.remove('invisible');
            popupSignInInner.classList.add('slip');
            popupSignInInner.classList.remove('error');
        });

        closeSignIn.addEventListener('click', function(event) {
            event.preventDefault();
            popupSignIn.classList.add('invisible');
            popupSignInInner.classList.remove('slip');
            popupSignInInner.classList.remove('error');
        });

        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 27) {
                if (!popupSignIn.classList.contains('invisible')) {
                    popupSignIn.classList.add('invisible');
                    popupSignInInner.classList.remove('slip');
                    popupSignInInner.classList.remove('error');
                }
            }
        });
    }

    if (form) {
        var loginField = form.elements['login'];
        var passwordField = form.elements['password'];

        form.onsubmit = function(event) {
            if (!loginField.value || !passwordField.value) {
                event.preventDefault();
                popupSignInInner.classList.remove('slip');
                popupSignInInner.classList.add('error');
                setTimeout(function() {
                    popupSignInInner.classList.remove('error');
                }, 500);
            }
        };
    }


    //////////////////// Map /////////////////////////////
    ///////////////////////////////////////////////////////////////

    var mapContainer = document.querySelector('.overlay-map');
    var btnMap = document.querySelector('.button-map');
    var closeMap = document.querySelector('.close-button-map');

    if (mapContainer !== null) {
        btnMap.addEventListener('click', function(event) {
            event.preventDefault();
            mapContainer.classList.remove('invisible');
        });

        closeMap.addEventListener('click', function(event) {
            event.preventDefault();
            mapContainer.classList.add('invisible');
        });

        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 27) {
                if (!mapContainer.classList.contains('invisible')) {
                    mapContainer.classList.add('invisible');
                }
            }
        });
    }
})();
