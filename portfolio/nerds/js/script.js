//GoogleMaps//
var mapCanvas = document.querySelector(".contacts__map");

function initialize() {
  var centerMap = new google.maps.LatLng(59.939870, 30.318591);
  var initZoom = 16;
  var mapOptions = {
    center: centerMap,
    zoom: initZoom,
    maxZoom: 18,
    minZoom: 8,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var image = {
    url: "img/icon/map_pointer_logo.png",
    anchor: new google.maps.Point(51, 190)
  };
  var markPos = new google.maps.LatLng(59.938840, 30.323056);
  var marker = new google.maps.Marker({
    position: markPos,
    icon: image,
    map: map
  });
}
google.maps.event.addDomListener(window, "load", initialize);
mapCanvas.classList.add("map-google");

//FeedbackForm//
var link = document.querySelector(".adress-block__btn");
var popup = document.querySelector(".contacts__feedback-form");
var close = document.querySelector(".feedback-form__close_btn");
var cancel = popup.querySelector(".feedback-form__btn--cancel");

if (link !== null && popup !== null) {
  var name = popup.querySelector("[name=name]");
  var email = popup.querySelector("[name=email]");
  var text = popup.querySelector("[name=text]");
  var form = popup.querySelector("form");

  link.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("contacts__feedback-form--show");
    popup.classList.remove("contacts__feedback-form--error");
    name.focus();
  });
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popup.classList.contains("contacts__feedback-form--show")) {
        popup.classList.remove("contacts__feedback-form--show");
        popup.classList.remove("contacts__feedback-form--error");
      }
    }
  });
  form.addEventListener("submit", function(event) {
    if (!name.value || !email.value) {
      event.preventDefault();
      popup.classList.remove("contacts__feedback-form--error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("contacts__feedback-form--error");
    }
  });
  close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("contacts__feedback-form--show");
  });
  cancel.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("contacts__feedback-form--show");
  });
  mOverlay.addEventListener("click", function(e) {
    if (e.tsrget == modal.parentNode)
      popup.classList.remove("contacts__feedback-form--show");
  });
}
