function() {
    function e(e) {
        var t = new XMLHttpRequest
          , s = (new Date).getTime();
        t.open("post", "//formspree.io/ridea@bk.ru?" + s, !0),
        t.setRequestHeader("Accept", "application/json"),
        t.send(e),
        t.addEventListener("readystatechange", function() {
            t.readyState < 4 ? (h.classList.add("btn--sending"),
            h.innerHTML = "Sending...") : 4 == t.readyState && (h.classList.remove("btn--sending"),
            h.innerHTML = "Send",
            f.classList.remove("form--show"),
            200 == t.status ? (_.classList.add("alert--show"),
            console.log("Success! Message has been sent. Status: " + t.status + ", " + t.statusText)) : (q.classList.add("alert--show"),
            console.log("Failure! Message has not been sent. Status: " + t.status + ", " + t.statusText)))
        })
    }
    function t(e, t) {
        e.addEventListener("click", function(s) {
            s.preventDefault();
            var o = e.parentElement.classList[0]
              , a = o + "--show";
            e.parentElement.classList.remove(a),
            void 0 !== t && t()
        })
    }
    function s() {
        window.addEventListener("keydown", function(e) {
            27 == e.keyCode && (f.classList.remove("form--show"),
            u(),
            _.classList.remove("alert--show"),
            q.classList.remove("alert--show"))
        })
    }
    function o() {
        f.classList.remove("form--error"),
        f.classList.add("form--error")
    }
    function a() {
        localStorage.setItem("name", v.value),
        localStorage.setItem("email", d.value),
        localStorage.setItem("subject", g.value),
        localStorage.setItem("message", L.value)
    }
    function r() {
        v.value = p,
        d.value = y,
        g.value = w,
        L.value = b
    }
    function n() {
        l(v),
        l(d),
        l(g),
        l(L)
    }
    function l(e) {
        if (!e.value) {
            var t = e.classList[0]
              , s = t + "--empty";
            e.classList.add(s)
        }
    }
    function i() {
        c(v),
        c(d),
        c(g),
        c(L)
    }
    function c(e) {
        e.addEventListener("focus", function() {
            var t = e.classList[0] + "--empty";
            e.classList.contains(t) && e.classList.remove(t)
        })
    }
    function u() {
        f.classList.remove("form--error"),
        v.classList.remove("form__input--empty"),
        d.classList.remove("form__input--empty"),
        g.classList.remove("form__input--empty"),
        L.classList.remove("form__message--empty")
    }
    if (document.querySelector(".form") || "FormData" in window) {
        var f = document.querySelector(".form")
          , m = document.querySelector(".main-nav__link--form")
          , v = f.querySelector("[name=name]")
          , d = f.querySelector("[name=email]")
          , g = f.querySelector("[name=subject]")
          , L = f.querySelector("[name=message]")
          , S = f.querySelector(".btn--close-form")
          , h = f.querySelector("[type=submit]")
          , p = localStorage.getItem("name")
          , y = localStorage.getItem("email")
          , w = localStorage.getItem("subject")
          , b = localStorage.getItem("message");
        m.addEventListener("click", function(e) {
            e.preventDefault(),
            f.classList.toggle("form--show"),
            u(),
            p && y && w && b ? (r(),
            L.focus()) : v.focus()
        }),
        t(S, function() {
            u()
        }),
        s(),
        f.addEventListener("submit", function(t) {
            if (t.preventDefault(),
            v.value && d.value && g.value && L.value) {
                a();
                var s = new FormData(f);
                e(s)
            } else
                v.value && d.value && g.value && L.value || (o(),
                n(),
                i())
        });
        var _ = document.querySelector(".alert--success")
          , q = document.querySelector(".alert--failure")
          , H = document.querySelector(".btn--success")
          , E = document.querySelector(".btn--failure");
        t(H),
        t(E)
    }
}(),
