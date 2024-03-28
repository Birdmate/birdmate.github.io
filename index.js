//�R�Q�������WBSJ���S��10��̉摜��p��
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

//2�Z�b�g����20���p��
windows.onload = function () {
    let cards = [];
    for (let i = 0; i < 10; i++) {
        cards.push(i);
        cards.push(i);
    }
    //�V���b�t��
    shuffle(cards);
    let panel = document.getElementById('panel');
    for (let i = 0; i < 20; i++) {
        let div = document.createElement('div');
        div.className = 'card-back';
        div.index = i;
        div.onclick = flip;
        panel.appendChild(div);
    }
    //�^�C�}�[
    let startTime;
    let timer;
    startTime = new Date();
    stratTimer();
}
function shuffle(cards) {
    let n = cards.length;
    for (let i = 0; i < n; i++) {
        let r = i + Math.floor(Math.random() * (n - i));
        let tmp = cards[i];
        cards[i] = cards[r];
        cards[r] = tmp;
    }
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
                backTimer = null;
                if (countUnit == 10) {
                    clearTimeout(timer);
                    let endTime = new Date();
                    let elapsedTime = endTime - startTime;
                    let sec = Math.floor(elapsedTime / 1000);
                    let msec = elapsedTime % 1000;
                    alert('�N���A�I' + sec + '�b');
                } else {
                    backTimer = setTimeout(function () {
                        div.className = 'card back';
                        div.innerHTML = '';
                        cardFirst.className = 'card back';
                        cardFirst.innerHTML = '';
                        backTimer = null;
                    }
                        , 500);
                    flgFirst = true;
                }
            }
function startTimer() {
                    timer = setTimeout(check, 1000);
                }
function showSecond() {
    let nowTime = new Date();
                    let elapsedTime = nowTime - startTime;
                    let sec = Math.floor(elapsedTime / 1000);
                    let msec = elapsedTime % 1000;
                    document.getElementById('time').textContent = sec + '.' + msec;
                }
}