window.onload = () => {
    initCards();
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    start.addEventListener('click', startStopGame);
    stop.addEventListener('click', startStopGame);
}

function startStopGame(event) {
    let button = event.target;
    if (button.id === 'start') {
        startGame();
        button.textContent = 'リセット';
        button.id = 'reset';
        let stopButton = document.getElementById('stop');
        stopButton.textContent = 'ストップ';
    } else if (button.id === 'stop') {
        stopGame();
        button.textContent = '再スタート';
        button.id = 'restart';
        let startButton = document.getElementById('start');
        startButton.textContent = 'スタート';
    } else if (button.id === 'restart') {
        restartGame();
        button.textContent = 'ストップ';
        button.id = 'stop';
        let startButton = document.getElementById('start');
        startButton.textContent = 'リセット';
    } else if (button.id === 'reset') {
        resetGame();
        button.textContent = 'スタート';
        button.id = 'start';
        let stopButton = document.getElementById('stop');
        stopButton.textContent = 'ストップ';
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
    let reset = document.getElementById('start');
    reset.textContent = "スタート";
    let result = document.getElementById('result');
    result.innerHTML = '';
    counter = 0;
    initCards();
}
