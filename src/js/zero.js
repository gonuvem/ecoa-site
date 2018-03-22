import '../css/style.css';
import palestrantes from '../../assets/data/palestrantes.json'
import patrocinadores from '../../assets/data/patrocinadores.json'
import apoiadores from '../../assets/data/apoiadores.json'
import Vue from 'vue'


function importAll(rq){
    return rq.keys().map(rq);
}
importAll(require.context('../../assets/imgs/palestrantes', false, /\.(png|jpe?g)$/))
importAll(require.context('../../assets/imgs/patrocinadores', false, /\.(png|jpe?g)$/))
importAll(require.context('../../assets/imgs/apoiadores', false, /\.(png|jpe?g)$/))
importAll(require.context('../../assets/imgs/logo', false, /\.(png|jpe?g)$/))
/*
function getResource(name){ 
    return require(`file-loader!img-loader!?modules!${name}`);
}

palestrantes.list.map(function(o){ o.img = getResource(o.img) });
apoiadores.list.map(function(o){ o.img = getResource(o.img) });
patrocinadores.list.map(function(o){ o.img = getResource(o.img) });
*/

new Vue({
    el: "#palestrantes_container",
    data: {
        palestrantes: palestrantes.list
    }
});

new Vue({
    el: "#patrocinadores_container",
    data: {
        patrocinadores: patrocinadores.list
    }
});

new Vue({
    el: "#apoiadores_container",
    data: {
        apoiadores: apoiadores.list
    }
})       

var menu = document.getElementById("menu-square");
var nav = document.getElementsByTagName("nav")[0];
function expand(){
    console.log(nav.style.maxHeight)
    if(nav.style.maxHeight !== "200px"){
        nav.style.maxHeight = "200px";
        menu.classList.add('expand');
    }else {
        nav.style.maxHeight = "0px";
        menu.classList.remove('expand');
    }
}
menu.onclick = function(){ console.log("menu"); expand(); }
nav.onclick = function(){ console.log("hey"); expand();}