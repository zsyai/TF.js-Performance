'use strict'
/*
author: David Xiang
email: xdw@pku.edu.cn
 */

// constant args
const DATASIZE = 10;
const LOCALHOST = "http://localhost:8000";

// args to be extracted from url
let picSize;
let modelName;
let backend;
let testSize;
let task;// = like "Tfjs\tres50\tcpu\t10000\t";
let verbose = true;

let backendList = ["cpu", "gpu"];
let model224List = [
    "densenet121", "mobilenet", "nasnetlarge", "vgg16", "densenet169",
    "mobilenetv2", "resnet50", "vgg19"
];
let model299List = ["xception", "inceptionv3", "inceptionresnetv2"];

function getParam(query, key){
    let regex = new RegExp(key+"=([^&]*)","i");
    return query.match(regex)[1];
}


function parseArgs(){
    let address = document.location.href;
    let query = address.split("?")[1];

    modelName = getParam(query, "model");
    backend = getParam(query, "backend");
    testSize = parseInt(getParam(query, "testsize"));

    // check whether these params are valid
    if (backendList.indexOf(backend) === -1){
        triggerStart();
        triggerEnd("Invalid URI:" + address);
        console.error("Invalid URI:" + address);
        return false;
    }

    if (testSize <= 0){
        triggerStart();
        triggerEnd("Invalid URI:" + address);
        console.error("Invalid URI:" + address);
        return false;
    }

    if (model224List.indexOf(modelName) != -1){
        picSize = 224;
    }else if(model299List.indexOf(modelName) != -1){
        picSize = 299;
    }else{
        triggerStart();
        triggerEnd("Invalid URI:" + address);
        console.error("Invalid URI:" + address);
        return false;
    }

    // get right task name
    task = "tfjs\tinference\tkeras\t" + modelName + "\t" + backend + "\t" + testSize + "\t";
    document.getElementById("task").innerText = task;
    return true;
}