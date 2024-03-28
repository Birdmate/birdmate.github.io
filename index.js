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
        div.className = 'card-back';
        div.index = i;
        div.onclick = function () {
            flip(this);
        };
        panel.appendChild(div);
    }
    let score = 0;
    let firstCard = null;
    let flipTimerId = NaN;
    function flip(card) {
        if (flipTimerId) {
            clearTimeout(flipTimerId);
            flipTimerId = NaN;
        }
        if (card.innerHTML != '' || card == firstCard) {
            return;
        }
        card.className = 'card-front';
        card.innerHTML = '<img src="' + img[cards[card.index]] + '">';
        if (firstCard == null) {
            firstCard = card;
        } else {
            if (cards[firstCard.index] == cards[card.index]) {
                score++;
                firstCard = null;
                if (score == 10) {
                    alert('クリア！');
                }
            } else {
                flipTimerId = setTimeout(function () {
                    firstCard.className = 'card-back';
                    card.className = 'card-back';
                    firstCard.innerHTML = '';
                    card.innerHTML = '';
                    firstCard = null;
                }, 500);
            }
        }
    }
}