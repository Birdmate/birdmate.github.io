let startTime; // 開始時刻
let timer; // タイマー
let flipTimer; // 裏返し中タイマー
let fstCard = true; // 1枚目判定
let fstCardArea; // 1枚目の場所
let counter = 0; // そろえた枚数

let cardName = [
    "logo", "ezokogera", "kogera", "miyakekogera",
    "shikokukogera", "tsushimakogera", "kyushukogera",
    "amamikogera", "ryukyukogera", "oirikogera"
];
let cardTag = [];
for (let i = 0; i < 10; i++) {
    cardTag.push("<img src='" + cardName[i] + ".jpg'>")
}

window.onload = () => {
    initCards();
    let start = document.getElementById('start');
    start.addEventListener('click', startGame);
}

function initCards() {
    let cards = [];
    for (let i = 0; i < 10; i++) {
        cards.push(i);
        cards.push(i);
    }
    // シャッフル
    shuffle(cards);
    let panel = document.getElementById('panel');
    panel.innerHTML = ''; // パネルを初期化
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

function startGame() {
    initCards();
    // タイマー
    startTime = new Date();
    startTimer();
    let reset = document.getElementById('reset');
    reset.textContent = "リセット";
    reset.removeEventListener('click', startGame); // 重複したイベントリスナーを削除
    reset.addEventListener('click', resetGame); // Reset ボタンがクリックされた時に resetGame 関数を呼び出すイベントリスナーを追加
}

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
                fstCardArea.className = 'card finish';
                flipTimer = NaN;
                if (counter == 10) {
                    clearInterval(timer);
                }
            }, 500)
        } else {
            flipTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = '';
                fstCardArea.className = 'card back';
                fstCardArea.innerHTML = '';
                fstCardArea = null;
                flipTimer = NaN;
            }, 500);
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
    let cont = '経過時間: ' + sec + '秒';
    let result = document.getElementById('result');
    result.innerHTML = cont;
}

function resetGame() {
    clearInterval(timer);
    let reset = document.getElementById('reset');
    reset.textContent = "スタート！";
    let result = document.getElementById('result');
    result.innerHTML = '';
    counter = 0;
    initCards();
}
