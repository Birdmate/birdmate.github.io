const $panel = document.getElementById('panel');
const $start = document.getElementById('start');

let startTime;
let timer;
let backTimer;
let flgFirst = true;
let cardFirst;
let countUnit = 0;

window.onload = () => {
    initCards();
    $start.addEventListener('click', (ev) => gameStart());
}
    let cardname = [
        "logo", "ezokogera", "kogera", "miyakekogera", "shikokukogera",
        "tsushimakogera", "kyushukogera", "amamikogera", "ryukyukogera", "oirikogera"
    ];
    let cardtag = [];
    for (let i = 0; i < 10; i++) {
        cardtag.push("<img src='" + cardname[i] + ".jpg'>")
    }

function initCards() {
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
        div.className = 'card back';
        div.number = cards[i];
        div.onclick = flip;
        panel.appendChild(div);
    }
    //タイマー
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
    if (backTimer) return;
    if (div.innerHTML == '') {
        div.className = 'card';
        div.innerHTML = cardtag[div.number];
    } else {
        return
    }
    if (flgFirst) {
        cardFirst = div;
        flgFirst = false;
    } else {
        if (cardFirst.number == div.number) {
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
                function gameStart() {
                    initCards();
                }
