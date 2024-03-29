let startTime; // 開始時刻
let timer; // タイマー
let flipTimer; // 裏返し中タイマー
let fstCard = false; // ゲームが開始されているかどうかを示すフラグ
let fstCardArea; // 1枚目の場所
let counter = 0; // そろえた枚数
let gameStarted = false; // ゲームが開始されたかどうかを示すフラグ

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
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    start.addEventListener('click', startStopGame);
    stop.addEventListener('click', startStopGame);
    let reset = document.getElementById('reset');
    reset.addEventListener('click', resetGame);
}

function startStopGame(event) {
    let button = event.target;
    if (button.id === 'start') {
        startGame();
    } else if (button.id === 'stop') {
        stopGame();
    } else if (button.id === 'restart') {
        restartGame();
    } else if (button.id === 'reset') {
        resetGame();
    }
}

function startGame() {
    if (!gameStarted) {
        initCards();
        startTime = new Date();
        startTimer();
        let startButton = document.getElementById('start');
        startButton.textContent = 'リセット';
        startButton.id = 'reset'; // IDを 'reset' に変更
        let stopButton = document.getElementById('stop');
        stopButton.textContent = 'ストップ';
        gameStarted = true;
    }
}

function stopGame() {
    if (gameStarted) {
        clearInterval(timer);
        let stopButton = document.getElementById('stop');
        stopButton.textContent = '再スタート';
        stopButton.id = 'restart'; // IDを 'restart' に変更
    }
}

function restartGame() {
    if (gameStarted) {
        initCards();
        // startTime を更新せず、以前の開始時刻から再開する
        startTimer();
        let startButton = document.getElementById('start');
        startButton.textContent = 'リセット';
        startButton.id = 'reset'; // IDを 'reset' に変更
        let stopButton = document.getElementById('stop');
        stopButton.textContent = 'ストップ';
    }
}

function flip(crnt) {
    if (gameStarted) {
        let div = crnt.target;
        if (flipTimer || div.className === 'card finish') return;
        if (div.classList.contains('card')) {
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
                            finishGame();
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
    let startButton = document.getElementById('start');
    startButton.textContent = "スタート";
    startButton.id = "start";
    let stopButton = document.getElementById('stop');
    stopButton.textContent = "ストップ";
    let result = document.getElementById('result');
    result.innerHTML = '';
    counter = 0;
    gameStarted = false;
}

function finishGame() {
    let panel = document.getElementById('panel');
    panel.innerHTML = 'すごい！コゲラ仙人級です ⁰⊖⁰)ﾉ';
}
