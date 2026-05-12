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

let gameStarted = false;

/* =========================
   GENERATE ARRAY
========================= */

function generateArray(type = 'random') {

    currentArray = [];
    currentLabels = [];

    const letters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

        currentLabels = [];

        for (let i = 0; i < currentArray.length; i++) {

            currentLabels.push(
                letters[i]
            );

        }

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

/* =========================
   RENDER ARRAY
========================= */

function renderArray() {

    const container =
        document.getElementById('array-container');

    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < currentArray.length; i++) {

        if (currentArray[i] === undefined) continue;

        const bar =
            document.createElement('div');

        bar.className = 'bar';

        bar.style.height =
            `${currentArray[i] * 3}px`;

        bar.textContent =
            listType === 'numerical'
            ? currentArray[i]
            : currentLabels[i] || '';

        container.appendChild(bar);

    }

}

/* =========================
   UPDATE STATS
========================= */

function updateStats() {

    document.getElementById('comparisons')
        .innerText = comparisons;

    document.getElementById('swaps')
        .innerText = swaps;

}

/* =========================
   RESET GAME
========================= */

function resetGame() {

    stopTimer();

    gameStarted = false;

    timer = 0;
    countdown = 120;

    document.getElementById('timer')
        .innerText = "00:00";

    document.getElementById('start-btn')
        .disabled = false;

    generateArray();

    enableControls();

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Game Reset!";

}

/* =========================
   HIGHLIGHT BUTTONS
========================= */

function highlight(group, button) {

    const buttons =
        document.querySelectorAll(
            `[id^="${group}-"]`
        );

    buttons.forEach(btn =>
        btn.classList.remove('active')
    );

    button.classList.add('active');

}

/* =========================
   SETTINGS
========================= */

function setAlgorithm(algo, button) {

    algorithm = algo;

    highlight('algo', button);

    updateControls();

    resetGame();

}

function setMode(m, button) {

    mode = m;

    highlight('mode', button);

}

function setListType(type, button) {

    listType = type;

    highlight('type', button);

    generateArray();

}

/* =========================
   ENABLE CONTROLS
========================= */

function enableControls() {

    document.querySelectorAll(
        '.game-buttons button'
    ).forEach(btn => {

        btn.disabled = false;

        btn.style.opacity = "1";

        btn.style.pointerEvents = "auto";

    });

}

/* =========================
   DISABLE CONTROLS
========================= */

function disableControls() {

    document.querySelectorAll(
        '.game-buttons button'
    ).forEach(btn => {

        btn.disabled = true;

        btn.style.opacity = "0.5";

        btn.style.pointerEvents = "none";

    });

}

/* =========================
   UPDATE CONTROLS
========================= */

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

    else if (algorithm === 'insertion') {

        document.getElementById('insertion-controls')
            .classList.remove('hidden');

    }

    enableControls();

}

/* =========================
   HIGHLIGHT BARS
========================= */

function highlightBars() {

    let bars =
        document.getElementsByClassName('bar');

    for (let bar of bars) {

        bar.classList.remove(
            'active',
            'compare',
            'minimum',
            'sorted'
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

    if (
        algorithm === 'selection' &&
        bars[selectedMin]
    ) {

        bars[selectedMin]
            .classList.add('minimum');

    }

}

/* =========================
   START GAME
========================= */

function startSorting() {

    stopTimer();

    gameStarted = true;

    currentIndex = 0;

    selectedMin = 0;

    insertionKey = 1;

    selectionStart = 0;

    swappedInPass = false;

    document.getElementById('start-btn')
        .disabled = true;

    startTimer();

    enableControls();

    renderArray();

    highlightBars();

    document.getElementById('robot-text')
        .innerHTML =
        `🤖 ${algorithm.toUpperCase()} SORT STARTED!`;

}

/* =========================
   TIMER
========================= */

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

            document.getElementById('timer')
                .innerText =
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

            document.getElementById('timer')
                .innerText =
                `${mins}:${secs}`;

            if (countdown <= 0) {

                stopTimer();

                disableControls();

                alert("⏰ TIME OVER!");

            }

        }

    }, 1000);

}

function stopTimer() {

    clearInterval(interval);

}

/* =========================
   WIN CHECK
========================= */

function isArraySorted() {

    for (let i = 0; i < currentArray.length - 1; i++) {

        if (
            currentArray[i] >
            currentArray[i + 1]
        ) {

            return false;

        }

    }

    return true;

}

function checkWin() {

    if (isArraySorted()) {

        stopTimer();

        gameStarted = false;

        document.getElementById('start-btn')
            .disabled = false;

        disableControls();

        alert("🎉 YOU WIN!");

        return true;

    }

    return false;

}

/* =========================
   SWAP
========================= */

function swap(i, j) {

    let temp =
        currentArray[i];

    currentArray[i] =
        currentArray[j];

    currentArray[j] =
        temp;

}

/* =========================
   BUBBLE SORT
========================= */

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

    let a =
        currentArray[currentIndex];

    let b =
        currentArray[currentIndex + 1];

    let shouldSwap = a > b;

    comparisons++;

    updateStats();

    if (choice === shouldSwap) {

        if (shouldSwap) {

            swap(
                currentIndex,
                currentIndex + 1
            );

            swaps++;

            swappedInPass = true;

        }

    }

    currentIndex++;

    if (currentIndex >= currentArray.length - 1) {

        if (!swappedInPass) {

            checkWin();

            return;

        }

        currentIndex = 0;

        swappedInPass = false;

    }

    renderArray();

    highlightBars();

}

/* =========================
   SELECTION SORT
========================= */

function selectCurrent() {

    selectedMin = currentIndex;

    highlightBars();

}

function moveSelectionRight() {

    if (
        currentIndex <
        currentArray.length - 1
    ) {

        currentIndex++;

        comparisons++;

        if (
            currentArray[currentIndex] <
            currentArray[selectedMin]
        ) {

            selectedMin = currentIndex;

        }

        updateStats();

        highlightBars();

    }

}

function placeMinimum() {

    swap(selectionStart, selectedMin);

    swaps++;

    updateStats();

    selectionStart++;

    if (
        selectionStart >=
        currentArray.length - 1
    ) {

        checkWin();

        return;

    }

    currentIndex = selectionStart;

    selectedMin = selectionStart;

    renderArray();

    highlightBars();

}

/* =========================
   INSERTION SORT
========================= */

function pickKey() {

    insertionKey =
        currentIndex + 1;

    if (
        insertionKey >=
        currentArray.length
    ) {

        checkWin();

        return;

    }

    highlightBars();

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Key Selected!";

}

function shiftLeft() {

    if (
        insertionKey > 0 &&
        currentArray[insertionKey] <
        currentArray[insertionKey - 1]
    ) {

        swap(
            insertionKey,
            insertionKey - 1
        );

        insertionKey--;

        swaps++;

        comparisons++;

        renderArray();

        updateStats();

        highlightBars();

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Shifted Left!";

    }

}

function insertKey() {

    currentIndex++;

    if (
        currentIndex >=
        currentArray.length - 1
    ) {

        checkWin();

        return;

    }

    insertionKey =
        currentIndex + 1;

    highlightBars();

}

/* =========================
   LOAD
========================= */

window.onload = () => {

    generateArray();

    updateControls();

    enableControls();

};
