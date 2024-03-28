const $start = document.getElementById('start');

//コゲラ亜種とWBSJロゴで10種の画像を用意
img = new Array();

img[0] = "logo.jpg";
img[1] = "ezokogera.jpg";
img[2] = "kogera.jpg";
img[3] = "miyakekogera.jpg";
img[4] = "shikokukogera.jpg";
img[5] = "tsushimakogera.jpg";
img[6] = "kyushukogera.jpg";
img[7] = "amamikogera.jpg";
img[8] = "ryukyukogera.jpg";
img[9] = "oirikogera.jpg";

//2セットずつ20枚用意
windows.onload = function () {
    let cards = [];
    for (let i = 0; i < 10; i++) {
        cards.push(i);
        cards.push(i);
    }
    //シャッフル
    shuffle(cards);
    let panel = document.getElementById('panel');
    for (let i = 0; i < 20; i++) {
        let div = document.createElement('div');
        div.className = 'back';
        div.index = i;
        div.onclick = flip;
        panel.appendChild(div);
    }
    //タイマー
    let startTime;
    startTime = new Date();
    stratTimer();
}
function shuffle(cards) {
    let n = cards.length;
    while (n) {
        i = Math.floor(Math.random() * n--);
        [cards[n], cards[i]] = [cards[i], cards[n]]
    }
    return cards;
}
function flip(crnt) {
    let div = crnt.target;
    let backTimer;
    if (backTimer) return;
    if (div.innerHTML == '') {
        div.className = 'card';
        div.innerHTML = '<img src="' + img[cards[div.index]] + '">';
    } else {
        return
    }
    let flgFirst = true;
    let cardFirst;
    if (flgFirst) {
        cardFirst = div;
        flgFirst = false;
    } else {
        if (cardFirst.index == div.index) {
            let countUnit = 0;
            countUnit++;
            backTimer = setTimeout(function () {
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                if (countUnit == 10) {
                    clearInterval(timer);
                }
            }, 500)
        } else {
            backTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }
                , 500);
        }
                    flgFirst = true;
                }
            }
function startTimer() {
                    timer = setInterval(showSecond, 1000);
                }
function showSecond() {
                    let nowTime = new Date();
                    let elapsedTime = nowTime - startTime;
                    let sec = Math.floor(elapsedTime / 1000);
    let cont = 'いま' + elapsedTime + '秒です ⁰⊖⁰)ﾉ';
    let rslt = document.getElementById('result');
    rslt.innerHTML = cont;
                }
