/*=============================================================================
#     FileName: main.js
#         Desc: 
#       Author: Zhiya Zang
#        Email: zangzhiya@gmail.com
#     HomePage: http://www.simpleapples.com
#      Version: 0.0.1
#   LastChange: 2012-11-30 21:55:04
#      History:
=============================================================================*/
var SBOX = { };
SBOX.matchArr = new Array("amazon ","weibo ","google ","douban ","taobao ");
SBOX.matchSearch = {
    "amazon " : "http://www.amazon.cn/s/field-keywords=",
    "google " : "http://www.google.com.hk/search?q=",
    "douban " : "http://www.douban.com/search?q=",
    "weibo " : "http://s.weibo.com/weibo/",
    "taobao " : "http://s.taobao.com/search?q=12"
};
SBOX.searchImg = {
    "amazon " : "0",
    "google " : "80",
    "douban " : "40",
    "weibo " : "160",
    "taobao " : "120"
};
SBOX.searchBtn = {
    search : "google ",
};
function init() {
    disLogo();
    submit(0);
    disSelc();
    var textOri = document.getElementById("searchbox");
    var textSug1 = document.getElementById("sug1");
    var textSug2 = document.getElementById("sug2"); 
    document.getElementById("searchbox").onkeydown = function(event) {
        if(event.keyCode == 13) {
            if(textSug1.innerHTML && textSug2.innerHTML) {
                SBOX.searchBtn.search = textSug1.innerHTML + textSug2.innerHTML;
                textOri.value = "";
                textSug1.innerHTML = "";
                textSug2.innerHTML = "";
                disLogo();
                submit(0);
            } else {
                submit(1);
            }
        }
    }
}
function disSelc() {
    var list =  document.getElementById("selectlist");
    console.log("select"); 
    for(var i = 0; i < SBOX.searchImg.length; i++) {
        console.log("s" + i);
        var listEle = document.createElement("li");
        listEle.style.backgroundImage = "img/" + SBOX.searchImg[i];
        list.appendChild(listEle); 
    }
}
function chgLogo() {
    if(SBOX.searchBtn.search == "google " && document.getElementById("searchbox").value) {
        submit(1);
    } else {
        var textOri = document.getElementById("searchbox");
        var textSug1 = document.getElementById("sug1");
        var textSug2 = document.getElementById("sug2");
        SBOX.searchBtn.search = "google ";
        textOri.value = "";
        textSug1.innerHTML = "";
        textSug2.innerHTML = "input here...";
        disLogo();
        submit(0);
    }
}
function submit(loc) {
    var subText = document.getElementById("searchbox");
    var searchUrl = SBOX.matchSearch[SBOX.searchBtn.search];
    var url = searchUrl + subText.value;
    if(loc == 1) {
        window.location.href = url;
    }
}
function disLogo() {
    var logoImg = document.getElementById("searchlogo");
    logoImg.style.backgroundPosition = SBOX.searchImg[SBOX.searchBtn.search] * (-1) + "px 0";
}
function disBlur() {
    var textOri = document.getElementById("searchbox");
    var textSug2 =  document.getElementById("sug2");
    if(!textOri.value) {
        textSug2.innerHTML = "input here...";
    }
}
function disMenu() {
    var searchLogo = document.getElementById("searchlogo");
    var textSug1 = document.getElementById("sug1");
    var textSug2 = document.getElementById("sug2");
    textSug1.innerHTML = "";
    textSug2.innerHTML = "";
    if(SBOX.searchBtn.search == "google ") {
        console.log("searchstart");
        var textOri = document.getElementById("searchbox");
        var textSug = document.getElementById("suggestion");
        var textReq = textMatch(textOri.value);
        console.log(textReq);
        if(textReq == -1) {
            //console.log(textReq);
            textSug1.innerHTML = "";
            textSug2.innerHTML = "";
            return false;
        } else if(textReq == 1) {
            SBOX.searchBtn.search = textOri.value;
            textSug1.innerHTML = "";
            textSug2.innerHTML = "";
            textOri.value = "";
        } else {
            textSug1.innerHTML = textReq.slice(0,textOri.value.length);
            textSug2.innerHTML = textReq.slice(textOri.value.length);
            //console.log("oupt1:" + textSug1.innerHTML);
        }
    } 
    //else {
    //   SBOX.searchBtn.search = "google ";
    //}
    disLogo();
    submit(0);
}
function textMatch(inText) {
    var i = 0;
    var j = 0;
    if(!inText) {
        return -1;
    }
    for(i = 0; i < SBOX.matchArr.length; i++) {
        //var flag = 1;
        var searchName = SBOX.matchArr[i];
        //console.log(SBOX.matchArr[i]);
        for(j = 0; j < inText.length; j++) {
            if(inText[j] != searchName[j]) {
                 break;
            }
        }
        if(j == SBOX.matchArr[i].length) {
            return 1;
        }
        if(j == inText.length) {
            return SBOX.matchArr[i];
        }
    }
    return -1;
}
