Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

var sectionItems = document.getElementsByTagName('section');
var navItems = document.querySelectorAll('nav a');

console.log(sectionItems)

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

        // -=-=-=- Interative MArker section -=-=-=-=-=
        var len = sectionItems.length;
        var winScroll = window.scrollY;
        for(var i = 0; i < len; i++){
            var elem = document.getElementById(sectionItems[i].id);
            var off = elem.offsetTop;
            var diff = off - mn.offsetHeight-100;
    
            if( ( Math.trunc(diff > 0?diff:0) <= winScroll ) && 
                ( winScroll < Math.trunc(diff + elem.offsetHeight + 1)) ){
                selectedNavItem(mapSectionNav.get('#'+sectionItems[i].id));
                break;
            }
        }
    }, true);




function selectedNavItem(elem){
    console.log(elem);
    var sni = document.querySelector('.selectedNavItem')
    if(sni) sni.classList.remove('selectedNavItem');
    elem.classList.add('selectedNavItem');
}
/*
window.onscroll = function(e){
    
    
}
*/
