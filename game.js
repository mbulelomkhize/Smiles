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

/* ---------------------- */
/* GENERATE ARRAY */
/* ---------------------- */

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

    else {

        currentArray =
            [100,90,80,70,60,50,40,30,20,10];

    }

    if (listType === 'alphabetical') {

        let sorted =
            [...currentArray].sort((a,b)=>a-b);

        currentArray.forEach(val => {

            let index =
                sorted.indexOf(val);

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

/* ---------------------- */
/* RENDER */
/* ---------------------- */

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

        container.appendChild(bar);
    }
}

/* ---------------------- */
/* STATS */
/* ---------------------- */

function updateStats() {

    document.getElementById('comparisons')
        .innerText = comparisons;

    document.getElementById('swaps')
        .innerText = swaps;
}

/* ---------------------- */
/* RESET */
/* ---------------------- */

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

    document.getElementById('robot-text')
        .innerHTML = "🤖 Game reset!";
}

/* ---------------------- */
/* BUTTON HIGHLIGHT */
/* ---------------------- */

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

/* ---------------------- */
/* SETTERS */
/* ---------------------- */

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

/* ---------------------- */
/* CONTROLS */
/* ---------------------- */

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

/* ---------------------- */
/* HIGHLIGHT BARS */
/* ---------------------- */

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

    if (algorithm === 'selection') {

        if (bars[selectedMin]) {

            bars[selectedMin]
                .classList.add('minimum');
        }
    }
}

/* ---------------------- */
/* START */
/* ---------------------- */

function startSorting() {

    stopTimer();

    gameStarted = true;

    document.getElementById('start-btn')
        .disabled = true;

    startTimer();

    currentIndex = 0;

    swappedInPass = false;

    document.getElementById('robot-text')
        .innerHTML =
        `🤖 ${algorithm.toUpperCase()} SORT STARTED!`;

    highlightBars();
}

/* ---------------------- */
/* TIMER */
/* ---------------------- */

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

                alert("⏰ Time Over!");
            }
        }

    }, 1000);
}

function stopTimer() {

    clearInterval(interval);
}

/* ---------------------- */
/* WIN */
/* ---------------------- */

function isArraySorted() {

    for (let i = 0; i < currentArray.length - 1; i++) {

        if (currentArray[i] >
            currentArray[i + 1]) {

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

        alert("🎉 YOU WIN!");

        return true;
    }

    return false;
}

/* ---------------------- */
/* SWAP */
/* ---------------------- */

function swap(i, j) {

    let temp =
        currentArray[i];

    currentArray[i] =
        currentArray[j];

    currentArray[j] = temp;
}

/* ---------------------- */
/* BUBBLE SORT */
/* ---------------------- */

function movePointerLeft() {

    if (!gameStarted) return;

    if (currentIndex > 0) {

        currentIndex--;

        highlightBars();
    }
}

function movePointerRight() {

    if (!gameStarted) return;

    if (currentIndex < currentArray.length - 2) {

        currentIndex++;

        highlightBars();
    }
}

function compareBars(choice) {

    if (!gameStarted) return;

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

/* ---------------------- */
/* SELECTION SORT */
/* ---------------------- */

function selectCurrent() {

    if (!gameStarted) return;

    selectedMin = currentIndex;

    highlightBars();
}

function moveSelectionRight() {

    if (!gameStarted) return;

    if (currentIndex <
        currentArray.length - 1) {

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

    if (!gameStarted) return;

    swap(selectionStart, selectedMin);

    swaps++;

    updateStats();

    selectionStart++;

    if (selectionStart >=
        currentArray.length - 1) {

        checkWin();

        return;
    }

    currentIndex = selectionStart;

    selectedMin = selectionStart;

    renderArray();

    highlightBars();
}

/* ---------------------- */
/* INSERTION SORT */
/* ---------------------- */

function pickKey() {

    if (!gameStarted) return;

    insertionKey = currentIndex + 1;

    highlightBars();
}

function shiftLeft() {

    if (!gameStarted) return;

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
    }
}

function insertKey() {

    if (!gameStarted) return;

    currentIndex++;

    if (
        currentIndex >=
        currentArray.length - 1
    ) {

        checkWin();

        return;
    }

    insertionKey = currentIndex + 1;

    highlightBars();
}

/* ---------------------- */
/* LOAD */
/* ---------------------- */

window.onload = () => {

    generateArray();

    updateControls();
};
