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
        let i = Math.floor(Math.random() * n--);
        [cards[n], cards[i]] = [cards[i], cards[n]]
    }
    return cards;
}

window.onload = () => {
    initCards();
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
}

function startGame() {
    if (!gameStarted) {
        initCards(); // カードを初期化する
        startTime = new Date();
        startTimer();
        gameStarted = true;
    }
}

function resetGame() {
    clearInterval(timer);
    initCards(); // ゲームを初期化
    startTime = null; // 開始時刻をリセット
    let result = document.getElementById('result');
    result.innerHTML = '';
    counter = 0;
    gameStarted = false;
}

if (gameStarted) {
function flip(crnt) {
    let div = crnt.target; //クリックしたカード
    // カードのタイマー処理が動作中は return
    if (flipTimer) return; //連続で押せないように
    // 裏向きのカードをクリックした場合は画像を表示する
    if (div.innerHTML == '') {
        div.className = 'card'; //backというクラス名を取り除いた
        div.innerHTML = cardTag[div.number];
    } else {
        return // 数字が表示されているカードは return
    }
    if (fstCard) { // 1枚目の処理 一枚目ならtrue
        fstCardArea = div;  //最初にクリックしたカード
        fstCard = false; //次は２枚目だから
    } else { // ２枚目の処理
        if (fstCardArea.number == div.number) {
            counter++; //揃ったペアの数
            flapTimer = setTimeout(function () {
                div.className = 'card finish'; //0.5秒で透明
                fstCardArea.className = 'card finish';
                flapTimer = NaN;
                if (counter == 10) { //すべてカードが揃ったら
                    clearInterval(timer);  // timer終了
                    //setInterval(showSecond, 1000)
                }
            }, 500)
        } else {
            flipTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = ''; // カードを裏側に戻す
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

function finishGame() {
    let panel = document.getElementById('panel');
    panel.innerHTML = 'すごい！コゲラ仙人級です ⁰⊖⁰)ﾉ';
}
