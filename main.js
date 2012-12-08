/*=============================================================================
#     FileName: main.js
#         Desc: 
#       Author: Zhiya Zang
#        Email: zangzhiya@gmail.com
#     HomePage: http://www.simpleapples.com
#      Version: 0.0.5
#   LastChange: 2012-12-08 12:08:28
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
function clrText(text1, text2, text3) {
    var textSug1 = document.getElementById("sug1"),
        textSug2 = document.getElementById("sug2"),
        textOri = document.getElementById("searchbox");
    if (text1 === 1) {
        textSug1.innerHTML = "";
    } else {
        textSug1.innerHTML = text1; 
    }
    if (text2 === 1) {
        textSug2.innerHTML = "";
    } else {
        textSug2.innerHTML = text2; 
    } 
    if (text3 === 1) {
        textOri.value = ""; 
    } else if (text3 !== 0) {
        textOri.value = text3;
    }
}
function init() {
    var textOri = document.getElementById("searchbox"),
        textSug1 = document.getElementById("sug1"),
        textSug2 = document.getElementById("sug2"); 
    disLogo();
    submit(0);
    textOri.onkeydown = function (event) {
        if (event.keyCode == 13) {
            if(textSug1.innerHTML && textSug2.innerHTML) {
                SBOX.searchBtn.search = textSug1.innerHTML + textSug2.innerHTML;
                clrText(1,1,1);
                disLogo();
                submit(0);
            } else {
                submit(1);
            }
        }
    }
}
function chgLogo() {
    var textOri = document.getElementById("searchbox");
    if (SBOX.searchBtn.search == "google " && document.getElementById("searchbox").value) {
        submit(1);
    } else {
        SBOX.searchBtn.search = "google ";
        clrText(1,"input here...",1)
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
    var textOri = document.getElementById("searchbox");
    if (!textOri.value) {
        clrText(1,"input here...",1);
    }
}
function disMenu() {
    var textOri = document.getElementById("searchbox"),
        textReq;
    clrText(1,1,0); 
    textReq = textMatch(textOri.value);
    if (textReq === 1) {
        SBOX.searchBtn.search = textOri.value;
        clrText(1,1,1);
    } else if (textReq === "mathOperation") {
        clrText(textOri.value, " = " + eval(textOri.value), 0);
        SBOX.searchBtn.search = "calc ";
    } else if (textReq !== -1) {
        clrText(textReq.slice(0, textOri.value.length), textReq.slice(textOri.value.length), 0);
    }
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
    // 判断是否为四则运算式
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
        // 判断是否输入了完整的搜索引擎名称
        if (j == SBOX.matchArr[i].length) {
            return 1;
        }
        // 返回建议的搜索引擎名称
        if (j == inText.length) {
            return SBOX.matchArr[i];
        }
    }
    return -1;
}
