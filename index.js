let startTime;//開始時刻
let timer;//タイマー
let flipTimer;//裏返し中タイマー
let fstCard = true;//1枚目判定
let fstCardArea;//1枚目の場所
let counter = 0;//そろえた枚数

let cardName = [
    "logo", "ezokogera", "kogera", "miyakekogera", "shikokukogera",
    "tsushimakogera", "kyushukogera", "amamikogera", "ryukyukogera", "oirikogera"
];
let cardTag = [];
for (let i = 0; i < 10; i++) {
    cardTag.push("<img src='" + cardName[i] + ".jpg'>")
}

windows.onload = () => {
    iniCards();
    showTimer();
    let start = document.getElementById('start');
    start.addEventListener('click',(ev) => gameStart()):
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
}

function shuffle(cards) {
    let n = cards.length;
    while (n) {
        i = Math.floor(Math.random() * n--);
        [cards[n], cards[i]] = [cards[i], cards[n]]
    }
    return cards;
}

function gameStart()[
    initCards();
    //タイマー
    startTime = new Date();
    stratTimer();
const start = getElementByID('start');
start.addEventListener('click', () => {
    gameStart();
    start.textContent = "リプレイ";
]

function flip(crnt) {
    let div = crnt.target;
    if (flipTimer) return;
    if (div.innerHTML == '') {
        div.className = 'card';
        div.innerHTML = cardTag[div.number];
    } else {
        return
    }
    if (fstCard) {
        fstCardArea = div;
        fstCard = false;
    } else {
        if (fstCardArea.number == div.number) {
            counter++;
            flipTimer = setTimeout(function () {
                div.className = 'card finish';
                fstCard.className = 'card finish';
                flipTimer = NaN;
                if (counter == 10) {
                    clearInterval(timer);
                }
            }, 500)
        } else {
            flipTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = '';
                fstCard.className = 'card back';
                fstCard.innerHTML = '';
                fstCardArea = null;
                flipTimer = NaN;
            }
                , 500);
        }
        fstCard = true;
    }
}
function startTimer() {
    timer = setInterval(showTimer, 1000);
}
function showTimer() {
    let nowTime = new Date();
    let elapsedTime = nowTime - startTime;
    let sec = Math.floor(elapsedTime / 1000);
    let cont = 'いま' + elapsedTime + '秒です ⁰⊖⁰)ﾉ';
    let result = document.getElementById('result');
    result.innerHTML = cont;
}
