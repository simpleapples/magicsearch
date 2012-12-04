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
SBOX.matchArr = ["amazon ", "weibo ", "google ", "douban ", "taobao ", "dict ", "mail "];
SBOX.matchSearch = {
    "amazon " : "http://www.amazon.cn/s/field-keywords=",
    "google " : "http://www.google.com.hk/search?q=",
    "douban " : "http://www.douban.com/search?q=",
    "weibo " : "http://s.weibo.com/weibo/",
    "taobao " : "http://s.taobao.com/search?q=",
    "dict " : "http://dict.youdao.com/search?q=",
    "mail " : "mailto:"
};
SBOX.searchImg = {
    "amazon " : "0",
    "google " : "80",
    "douban " : "40",
    "weibo " : "160",
    "taobao " : "120",
    "dict " : "200",
    "mail " : "240",
    "calc " : "280"
};
SBOX.searchBtn = {
    search : "google "
};
function disLogo() {
    var logoImg = document.getElementById("searchlogo");
    logoImg.style.backgroundPosition = SBOX.searchImg[SBOX.searchBtn.search] * (-1) + "px 0";
}
function disSelc() {
    var list =  document.getElementById("selectlist"),
        listEle = document.createElement("li"),
        i;
    for (i = SBOX.searchImg.length; i--;) {
        listEle.style.backgroundImage = "img/" + SBOX.searchImg[i];
        list.appendChild(listEle); 
    }
}
function init() {
    var textOri = document.getElementById("searchbox"),
        textSug1 = document.getElementById("sug1"),
        textSug2 = document.getElementById("sug2"); 
    disLogo();
    submit(0);
    disSelc();
    document.getElementById("searchbox").onkeydown = function (event) {
        if (event.keyCode == 13) {
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
function chgLogo() {
    var textOri = document.getElementById("searchbox"),
        textSug1 = document.getElementById("sug1"),
        textSug2 = document.getElementById("sug2");
    if (SBOX.searchBtn.search == "google " && document.getElementById("searchbox").value) {
        submit(1);
    } else {
        SBOX.searchBtn.search = "google ";
        textOri.value = "";
        textSug1.innerHTML = "";
        textSug2.innerHTML = "input here...";
        disLogo();
        submit(0);
    }
}
function submit(loc) {
    var subText = document.getElementById("searchbox"),
        searchUrl = SBOX.matchSearch[SBOX.searchBtn.search],
        url = searchUrl + subText.value;
    if (loc == 1) {
        window.location.href = url;
        if (SBOX.searchBtn.search === "mail ") {
            self.location.reload();
        }
    }
}
function disBlur() {
    var textOri = document.getElementById("searchbox"),
        textSug2 =  document.getElementById("sug2");
    if (!textOri.value) {
        textSug2.innerHTML = "input here...";
     }
}
function disMenu() {
    var searchLogo = document.getElementById("searchlogo"),
        textSug1 = document.getElementById("sug1"),
        textSug2 = document.getElementById("sug2"),
        textOri = document.getElementById("searchbox"),
        textSug = document.getElementById("suggestion"),
        textReq;
    textSug1.innerHTML = "";
    textSug2.innerHTML = "";
    //if (SBOX.searchBtn.search == "google ") {
        textReq = textMatch(textOri.value);
        if (textReq === 1) {
            SBOX.searchBtn.search = textOri.value;
            //textSug1.innerHTML = "";
            //textSug2.innerHTML = "";
            textOri.value = "";
        } else if (textReq === "mathOperation") {
            textSug1.innerHTML = textOri.value;
            textSug2.innerHTML = " = " + eval(textOri.value);  
            SBOX.searchBtn.search = "calc ";
        } else if (textReq !== -1) {
            textSug1.innerHTML = textReq.slice(0, textOri.value.length);
            textSug2.innerHTML = textReq.slice(textOri.value.length);
        }
    //} 
    disLogo();
    submit(0);
}
function textMatch(inText) {
    var i, 
        j, 
        searchName,
        pattern = /[\+\-]?\d+(\.\d+)?[\+\-\*\/]\d+(\.\d+)?([\+\-\*\/]\d+(\.\d+)?)*/;
    if (!inText) {
        return -1;
    }
    if (pattern.test(inText)) {
        console.log("math");
        return "mathOperation"; 
    }
    if(inText)
    for (i = SBOX.matchArr.length; i--;) {
        searchName = SBOX.matchArr[i];
        for (j = 0; j < inText.length; j++) {
            if (inText[j] != searchName[j]) {
                 break;
            }
        }
        if (j == SBOX.matchArr[i].length) {
            return 1;
        }
        if (j == inText.length) {
            return SBOX.matchArr[i];
        }
    }
    return -1;
}
