let currentArray = [];
let currentLabels = [];

let algorithm = 'bubble';
let listType = 'numerical';
let mode = 'practice';

let comparisons = 0;
let swaps = 0;

let currentIndex = 0;
let selectedMin = null;
let insertionKey = null;

const ARRAY_SIZE = 10;

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

    } else if (type === 'sorted') {

        currentArray =
            [10,20,30,40,50,60,70,80,90,100];

    } else if (type === 'reversed') {

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

    renderArray();

    updateStats();

    updateControls();

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

        container.appendChild(bar);
    }
}

function updateStats() {

    document.getElementById('comparisons').innerText =
        comparisons;

    document.getElementById('swaps').innerText =
        swaps;
}

function resetGame() {

    comparisons = 0;
    swaps = 0;

    generateArray();
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
}

function startSorting() {

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Use the buttons below to perform the algorithm!";
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

function compareBars() {

    comparisons++;

    updateStats();

    if (
        currentArray[currentIndex] >
        currentArray[currentIndex + 1]
    ) {

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Swap needed!";
    }

    else {

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Correct order!";
    }
}

function swapBars() {

    if (
        currentArray[currentIndex] >
        currentArray[currentIndex + 1]
    ) {

        swap(currentIndex, currentIndex + 1);

        swaps++;

        renderArray();

        highlightBars();

        updateStats();

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Great swap!";
    }
}

/* SELECTION SORT */

function selectCurrent() {

    selectedMin = currentIndex;

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Minimum selected!";
}

function moveSelectionRight() {

    if (currentIndex < currentArray.length - 1) {

        currentIndex++;

        highlightBars();
    }
}

function placeMinimum() {

    swap(selectedMin, 0);

    swaps++;

    renderArray();

    highlightBars();

    updateStats();

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Minimum placed!";
}

/* INSERTION SORT */

function pickKey() {

    insertionKey = currentIndex;

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Key selected!";
}

function shiftLeft() {

    if (insertionKey > 0) {

        swap(insertionKey,
             insertionKey - 1);

        insertionKey--;

        swaps++;

        renderArray();

        highlightBars();

        updateStats();

        document.getElementById('robot-text')
            .innerHTML =
            "🤖 Shifted!";
    }
}

function insertKey() {

    document.getElementById('robot-text')
        .innerHTML =
        "🤖 Key inserted!";
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
