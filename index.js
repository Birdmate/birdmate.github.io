let startTime; // 開始時刻
let timer; // タイマー
let flipTimer; // 裏返し中タイマー
let fstCard = false; // ゲームが開始されているかどうかを示すフラグ
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

window.onload = () => {
    initCards();
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    start.addEventListener('click', startStopGame);
    stop.addEventListener('click', startStopGame);
    let reset = document.getElementById('reset');
    reset.addEventListener('click', resetGame);
    stop.style.display = 'none'; // 初期状態ではストップボタンを非表示にする
    reset.style.display = 'none'; // 初期状態ではリセットボタンを非表示にする
}

function startStopGame(event) {
    let button = event.target;
    if (button.id === 'start') {
        startGame();
        button.textContent = 'リセット';
        button.id = 'reset';
        let stopButton = document.getElementById('stop');
        stopButton.style.display = 'inline-block'; // スタートボタンを押した時にストップボタンを表示する
    } else if (button.id === 'stop') {
        stopGame();
        button.textContent = '再スタート';
        button.id = 'restart';
    } else if (button.id === 'restart') {
        restartGame();
        button.textContent = 'ストップ';
        button.id = 'stop';
    } else if (button.id === 'reset') {
        resetGame();
        button.textContent = 'スタート';
        button.id = 'start';
        let stopButton = document.getElementById('stop');
        stopButton.style.display = 'none'; // リセットボタンを押した時にストップボタンを非表示にする
    }
}

function startGame() {
    initCards();
    startTime = new Date();
    startTimer();
}

function stopGame() {
    clearInterval(timer);
}

function restartGame() {
    initCards();
    // startTime を更新せず、以前の開始時刻から再開する
    startTimer();
}

function flip(crnt) {
    let div = crnt.target;
    if (flipTimer) return;
    if (div.innerHTML == '') {
        div.className = 'card';
        div.innerHTML = cardTag[div.number];
    } else {
        return;
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
            }, 500);
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
    let cont = 'プレイ時間: ' + sec + '秒';
    let result = document.getElementById('result');
    result.innerHTML = cont;
}

function resetGame() {
    clearInterval(timer);
    initCards(); // ゲームを初期化
    startTime = null; // 開始時刻をリセット
    let result = document.getElementById('result');
    result.innerHTML = '';
    counter = 0;
}
