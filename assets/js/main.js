var $ = function (...args) {
    var t = document.querySelectorAll(...args);
    if (t.length == 1) return t[0];
    return t
};

function toggleClass(element, className) {
    var classes;
    if (typeof element === 'string')
        classes = document.getElementById(element).classList;
    else classes = element.classList;
    classes.toggle(className);
}


document.addEventListener("DOMContentLoaded", function (event) {

    var darkmode = window.localStorage.getItem('dark-mode');
    if (darkmode === null) {
        window.localStorage.setItem('dark-mode', darkmodestate);
    }
    darkmode = darkmode === 'true';
    if (darkmodestate != darkmode) {
        darkMode();
        $('#dark-switch').checked = darkmode;
    }

    touchHandler('.slideshow-container', 'direction', plusSlides)
    touchHandler('.nav', 'direction', function (dir) { if (dir > 0) responsive() });
    touchHandler('body', 'position', function (start, direction) {
        if (start <= 30 && direction == -1) responsive()
    });
});

var darkmodestate = false
function touchHandler(selector, type, callback) {
    var el = $(selector), swipedir, dist, startX;
    el.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].pageX;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
        dist = e.changedTouches[0].pageX - startX;
        swipedir = dist > 0 ? -1 : 1; //left : right
        if (type == 'direction')
            callback(swipedir);
        else if (type == 'position') callback(startX, swipedir)
    }, { passive: true });
}

document.addEventListener('mousedown', function (e) {
    var t = e.target;
    if (t.id != "topnav" && t.id != "closebtn") {
        var isResponsive = !!$('.responsive').length
        if (isResponsive) {
            responsive();
        }
    }
})

function responsive() {
    toggleClass('topnav', 'responsive');
    toggleClass('topnav', 'shadow');
    toggleClass('closebtn', 'responsive');
}

function darkMode() {
    toggleClass(document.documentElement, 'dark-mode');
    darkmodestate = !darkmodestate;
    window.localStorage.setItem('dark-mode', darkmodestate);
    var logo = darkmodestate ? 'logo-branco' : 'logo-cor';
    $('#nav-logo').src = "/assets/img/" + logo + ".png";
}