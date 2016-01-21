var link = document.querySelector(".search-push");
var popup = document.querySelector(".search-form");
if (link != null && popup != null) { 
    var dateArrive = popup.querySelector("[name=date-arrive]");
    var dateDepart = popup.querySelector("[name=date-depart]");
    var adultNumb = popup.querySelector("[name=adult-numb]");
    var form = popup.querySelector("form");

    link.addEventListener("click", function(event) {
        event.preventDefault();
        popup.classList.toggle("search-form-show");
        popup.classList.remove("modal-error");
        dateArrive.focus()
    });
    window.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            if (popup.classList.contains("search-form-show")) {
                popup.classList.remove("search-form-show");
                popup.classList.remove("modal-error");
            }
        }
    });
    form.addEventListener("submit", function(event) {
        if (!dateArrive.value || !dateDepart.value || !adultNumb.value) {
            event.preventDefault();
            popup.classList.remove("modal-error");
            popup.offsetWidth = popup.offsetWidth;
            popup.classList.add("modal-error");
        }
    })
};