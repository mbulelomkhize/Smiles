let currentArray = [];
let currentLabels = [];

let algorithm = 'bubble';
let listType = 'numerical';
let mode = 'practice';

let comparisons = 0;
let swaps = 0;

let currentIndex = 0;
let selectedMin = 0;
let insertionKey = 1;
let selectionStart = 0;

let swappedInPass = false;

const ARRAY_SIZE = 10;

let timer = 0;
let interval = null;
let countdown = 120;

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const startSound = new Audio("start.mp3");
const finishSound = new Audio("finish.mp3");

function generateArray(type = 'random') {

    currentArray = [];
    currentLabels = [];

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    if (type === 'random') {

        for (let i = 0; i < ARRAY_SIZE; i++) {

            currentArray.push(
                Math.floor(Math.random() * 90) + 10
            );

        }

    }

    else if (type === 'sorted') {

        currentArray =
            [10,20,30,40,50,60,70,80,90,100];

    }

    else if (type === 'reversed') {

        currentArray =
            [100,90,80,70,60,50,40,30,20,10];

    }

    if (listType === 'alphabetical') {

        let sorted =
            [...currentArray].sort((a,b)=>a-b);

        currentArray.forEach(val => {

            let index = sorted.indexOf(val);

            currentLabels.push(
                letters[index]
            );

        });

    }

    currentIndex = 0;
    selectedMin = 0;
    insertionKey = 1;
    selectionStart = 0;

    comparisons = 0;
    swaps = 0;

    renderArray();
    updateStats();
    highlightBars();

}

function renderArray() {

    const container =
        document.getElementById('array-container');

    container.innerHTML = '';

    for (let i = 0; i < currentArray.length; i++) {

        const bar =
            document.createElement('div');

        bar.classList.add('bar');

        bar.style.height =
            `${currentArray[i] * 3}px`;

        bar.innerText =
            listType === 'numerical'
            ? currentArray[i]
            : currentLabels[i];

        if (isSortedIndex(i)) {
            bar.classList.add('sorted');
        }

        container.appendChild(bar);

    }

}

function isSortedIndex(index) {

    for (let i = 0; i < index; i++) {

        if (currentArray[i] > currentArray[i + 1]) {
            return false;
        }

    }

    return true;

}

function updateStats() {

    document.getElementById('comparisons').innerText =
        comparisons;

    document.getElementById('swaps').innerText =
        swaps;

}

function resetGame() {

    stopTimer();

    timer = 0;
    countdown = 120;

    document.getElementById('timer').innerText =
        "00:00";

    generateArray();

    enableControls();

    document.getElementById('robot-text').innerHTML =
        "🤖 Game reset!";

}

function setAlgorithm(algo, event) {

    algorithm = algo;

    highlight('algo', event.target);

    updateControls();

    resetGame();

}

function setMode(m, event) {

    mode = m;

    highlight('mode', event.target);

}

function setListType(type, event) {

    listType = type;

    highlight('type', event.target);

    generateArray();

}

function highlight(group, target) {

    const buttons =
        document.querySelectorAll(`[id^="${group}-"]`);

    buttons.forEach(btn =>
        btn.classList.remove('active'));

    target.classList.add('active');

}

function updateControls() {

    document.getElementById('bubble-controls')
        .classList.add('hidden');

    document.getElementById('selection-controls')
        .classList.add('hidden');

    document.getElementById('insertion-controls')
        .classList.add('hidden');

    if (algorithm === 'bubble') {

        document.getElementById('bubble-controls')
            .classList.remove('hidden');

    }

    else if (algorithm === 'selection') {

        document.getElementById('selection-controls')
            .classList.remove('hidden');

    }

    else {

        document.getElementById('insertion-controls')
            .classList.remove('hidden');

    }

}

function highlightBars() {

    let bars =
        document.getElementsByClassName('bar');

    for (let bar of bars) {

        bar.classList.remove(
            'active',
            'compare',
            'minimum'
        );

    }

    if (bars[currentIndex]) {
        bars[currentIndex]
            .classList.add('active');
    }

    if (bars[currentIndex + 1]) {
        bars[currentIndex + 1]
            .classList.add('compare');
    }

    if (algorithm === 'selection' && bars[selectedMin]) {

        bars[selectedMin]
            .classList.add('minimum');

    }

}

function startSorting() {

    enableControls();

    startTimer();

    currentIndex = 0;
    swappedInPass = false;

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Bubble Sort Started!";

    startSound.currentTime = 0;
    startSound.play();

    highlightBars();

}

function startTimer() {

    stopTimer();

    interval = setInterval(() => {

        if (mode === 'practice') {

            timer++;

            let mins =
                String(Math.floor(timer / 60))
                .padStart(2, '0');

            let secs =
                String(timer % 60)
                .padStart(2, '0');

            document.getElementById('timer').innerText =
                `${mins}:${secs}`;

        }

        else {

            countdown--;

            let mins =
                String(Math.floor(countdown / 60))
                .padStart(2, '0');

            let secs =
                String(countdown % 60)
                .padStart(2, '0');

            document.getElementById('timer').innerText =
                `${mins}:${secs}`;

            if (countdown <= 0) {

                stopTimer();

                disableControls();

                alert("⏰ Time Over!");

            }

        }

    }, 1000);

}

function stopTimer() {

    clearInterval(interval);

}

function checkWin() {

    for (let i = 0; i < currentArray.length - 1; i++) {

        if (currentArray[i] > currentArray[i + 1]) {
            return false;
        }

    }

    stopTimer();

    disableControls();

    renderArray();

    document.getElementById('robot-text')
        .innerHTML =
        "🏆 Array Successfully Sorted!";

    finishSound.currentTime = 0;
    finishSound.play();

    alert("🎉 YOU WIN!");

    return true;

}

function disableControls() {

    const buttons =
        document.querySelectorAll('.game-buttons button');

    buttons.forEach(btn => {

        btn.disabled = true;

    });

}

function enableControls() {

    const buttons =
        document.querySelectorAll('.game-buttons button');

    buttons.forEach(btn => {

        btn.disabled = false;

    });

}

/* BUBBLE SORT */

function movePointerLeft() {

    if (currentIndex > 0) {

        currentIndex--;

        highlightBars();

    }

}

function movePointerRight() {

    if (currentIndex < currentArray.length - 2) {

        currentIndex++;

        highlightBars();

    }

}

function compareBars(choice) {

    if (currentArray.length === 0) return;

    let a = currentArray[currentIndex];
    let b = currentArray[currentIndex + 1];

    let shouldSwap = a > b;

    comparisons++;

    updateStats();

    if (choice === shouldSwap) {

        if (shouldSwap) {

            swap(currentIndex, currentIndex + 1);

            swaps++;

            swappedInPass = true;

        }

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Correct move!";

        correctSound.currentTime = 0;
        correctSound.play();

    }

    else {

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Wrong move! (+2 seconds)";

        wrongSound.currentTime = 0;
        wrongSound.play();

        timer += 2;

    }

    currentIndex++;

    if (currentIndex >= currentArray.length - 1) {

        if (!swappedInPass) {

            stopTimer();

            disableControls();

            document.getElementById('robot-text')
                .innerHTML =
                `🏆 Finished in ${timer}s!`;

            finishSound.currentTime = 0;
            finishSound.play();

            alert("🎉 ARRAY SORTED!");

            renderArray();

            return;

        }

        currentIndex = 0;
        swappedInPass = false;

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 New pass started!";

    }

    renderArray();

    highlightBars();

}

/* SELECTION SORT */

function selectCurrent() {

    selectedMin = currentIndex;

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Minimum selected!";

    highlightBars();

}

function moveSelectionRight() {

    if (currentIndex < currentArray.length - 1) {

        currentIndex++;

        comparisons++;

        if (
            currentArray[currentIndex] <
            currentArray[selectedMin]
        ) {

            selectedMin = currentIndex;

            document.getElementById('robot-text')
                .innerHTML =
                "🤖 New minimum found!";

        }

        updateStats();

        highlightBars();

    }

}

function placeMinimum() {

    swap(selectionStart, selectedMin);

    swaps++;

    selectionStart++;

    currentIndex = selectionStart;

    selectedMin = selectionStart;

    renderArray();

    updateStats();

    highlightBars();

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Minimum placed correctly!";

    checkWin();

}

/* INSERTION SORT */

function pickKey() {

    insertionKey = currentIndex + 1;

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Key selected!";

}

function shiftLeft() {

    if (
        insertionKey > 0 &&
        currentArray[insertionKey] <
        currentArray[insertionKey - 1]
    ) {

        swap(insertionKey,
             insertionKey - 1);

        insertionKey--;

        swaps++;
        comparisons++;

        renderArray();

        updateStats();

        highlightBars();

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Shifted left!";

    }

}

function insertKey() {

    currentIndex++;

    if (currentIndex >= currentArray.length - 1) {
        currentIndex = currentArray.length - 2;
    }

    highlightBars();

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Key inserted!";

    checkWin();

}

function swap(i, j) {

    let temp = currentArray[i];

    currentArray[i] =
        currentArray[j];

    currentArray[j] = temp;

    let tempLabel =
        currentLabels[i];

    currentLabels[i] =
        currentLabels[j];

    currentLabels[j] =
        tempLabel;

}

generateArray();
