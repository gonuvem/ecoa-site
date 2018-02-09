Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

var sectionItems = document.getElementsByTagName('section');
var navItems = document.querySelectorAll('nav a');
console.log(navItems);

var mapSectionNav = new Map();
for(var i = 0; i < navItems.length; i++){
    var href = navItems[i].hash;
    mapSectionNav.set(href, navItems[i]);
}
console.log(mapSectionNav);

// ################## ANIMATIONFRAME ######################
window.animationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimation = (function() {
    return window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame;
})();
// #######################################################


var anim = null;
var body = document.body;

function startAnim(elem){
    var el = document.getElementById(elem);
    var mn = document.getElementById("menu-content");
    var stop = false;
    var begin = window.scrollY;
    var end = el.offsetTop - mn.offsetHeight;
    var diffbe = (end-begin);
    var time = 500;
    var time_start = null;
    var time_end = null;
    function init(timestamp){
        time_start = timestamp;
        time_end = time_start + time;
        go(timestamp);
    }
    function go(current){
        if(stop) { cancelAnimation(anim); return;}
        var  diff = current - time_start;
        if(diff >= time){
            stop = true;
            diff = time;
        }
        var syx = begin + diffbe*diff/time;
        window.scrollTo(0, syx);
        animationFrame(go);
    }
    animationFrame(init);
}


for(var i = 0; i < navItems.length; i++){
    navItems[i].onclick = function(e){
        e.preventDefault();
        startAnim(this.hash.slice(1, this.hash.length));
    };
}

var bgdark = false;
window.addEventListener('scroll', function(){
        var offh = document.getElementById("intro").offsetHeight;
        var mn = document.getElementById("menu-content");
        if(offh/2 < window.scrollY && !bgdark){
            bgdark = true;
            mn.classList.add('bgdark');
        }
        if(offh > window.scrollY){
            bgdark = false;
            mn.classList.remove('bgdark');
        }
    }, true);

/*

$('nav #menu .nav-item a').click(function(e){
    var id = this.getAttribute("href");
    goToSection(id);
});

function selectedNavItem(elem){
    $('.selectedNavItem').removeClass('selectedNavItem');
    $(elem).addClass('selectedNavItem');
}
window.onscroll = function(e){
    
    var len = sectionItems.length;
    var winScroll = window.scrollY;
    for(var i = 0; i < len; i++){
        var elem = $(sectionItems[i]);
        var off = elem.offset().top;
        var diff = off - $('nav #head').height();

        if( ( Math.trunc(diff > 0?diff:0) <= winScroll ) && 
            ( winScroll < Math.trunc(diff + elem.height() + 1)) ){
            selectedNavItem(mapSectionNav.get('#'+sectionItems[i].id));
            break;
        }
    }
}
*/
