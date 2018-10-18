'use strict'
/*
author: David Xiang
email: xdw@pku.edu.cn
 */

const picholder = document.getElementById("pic holder");

function loadPic(){
    for (let i = 0; i < DATASIZE; i++){
        let elem = document.createElement("canvas");
        elem.setAttribute("id", "pic"+i);
        elem.setAttribute("width", picsize);
        elem.setAttribute("height", picsize);
        let img = new Image();
        img.crossOrigin = "Anonymous"; // important
        
        img.onload = function(){
            elem.getContext("2d").drawImage(img, 0, 0);
        }
        
        img.src =  LOCALHOST+"/data/"+picsize+"/pic"+i+".png";
        picholder.appendChild(elem);
    }
}