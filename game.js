// Game State
let currentArray = [];
let currentLabels = [];
let algorithm = 'bubble';
let mode = 'practice';
let listType = 'numerical';
let scenario = 'random';
let ARRAY_SIZE = 10;

let comparisons = 0;
let swaps = 0;
let isSorting = false;
let timerInterval = null;
let secondsElapsed = 0;
let countdownSeconds = 30;

// Audio Context Setup
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// Generate Data
function generateArray(scen = 'random') {
    if (isSorting) return;
    scenario = scen;
    currentArray = [];
    currentLabels = [];
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    if (scen === 'random') {
        for (let i = 0; i < ARRAY_SIZE; i++) currentArray.push(Math.floor(Math.random() * 90) + 10);
    } else if (scen === 'sorted') {
        currentArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    } else if (scen === 'reversed') {
        currentArray = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    }

    if (listType === 'alphabetical') {
        // Map numbers to random letters to preserve sorting logic
        let sortedArray = [...currentArray].sort((a,b) => a-b);
        currentArray.forEach(val => {
            let index = sortedArray.indexOf(val);
            currentLabels.push(letters[index] || 'Z');
        });
    }

    resetStats();
    renderArray();
    document.getElementById('robot-text').innerHTML = `🤖 <span>Generated a ${scen} list. Ready when you are!</span>`;
}

function renderArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    
    for (let i = 0; i < currentArray.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${currentArray[i] * 3}px`;
        bar.innerText = listType === 'numerical' ? currentArray[i] : currentLabels[i];
        container.appendChild(bar);
    }
}

// Algorithms
async function bubbleSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < currentArray.length; i++) {
        for (let j = 0; j < currentArray.length - i - 1; j++) {
            if (!isSorting) return;
            comparisons++; updateStats();
            bars[j].style.background = '#00d2ff';
            bars[j+1].style.background = '#00d2ff';
            playSound(300 + currentArray[j]*5, 0.1);
            
            await sleep();

            if (currentArray[j] > currentArray[j+1]) {
                swaps++; updateStats();
                swap(j, j+1);
                playSound(200, 0.1, 'triangle');
                renderArray();
                bars = document.getElementsByClassName('bar');
                bars[j].style.background = '#00d2ff';
                bars[j+1].style.background = '#00d2ff';
                await sleep();
            }
            bars[j].style.background = '';
            bars[j+1].style.background = '';
        }
        bars[currentArray.length - 1 - i].style.background = '#39ff14';
    }
    gameComplete();
}

async function selectionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < currentArray.length; i++) {
        let minIdx = i;
        bars[i].style.background = '#ff007f'; // Looking for min
        
        for (let j = i + 1; j < currentArray.length; j++) {
            if (!isSorting) return;
            comparisons++; updateStats();
            bars[j].style.background = '#00d2ff';
            playSound(300 + currentArray[j]*5, 0.05);
            await sleep();
            
            if (currentArray[j] < currentArray[minIdx]) {
                if (minIdx !== i) bars[minIdx].style.background = '';
                minIdx = j;
                bars[minIdx].style.background = '#ffdf00'; // Current min
            } else {
                bars[j].style.background = '';
            }
        }
        if (minIdx !== i) {
            swaps++; updateStats();
            swap(i, minIdx);
            playSound(150, 0.1, 'triangle');
            renderArray();
            bars = document.getElementsByClassName('bar');
        }
        bars[i].style.background = '#39ff14'; // Sorted
    }
    gameComplete();
}

async function insertionSort() {
    let bars = document.getElementsByClassName('bar');
    bars[0].style.background = '#39ff14';
    
    for (let i = 1; i < currentArray.length; i++) {
        if (!isSorting) return;
        let key = currentArray[i];
        let keyLabel = currentLabels[i];
        let j = i - 1;
        
        bars[i].style.background = '#ffdf00';
        playSound(400, 0.1);
        await sleep();
        
        while (j >= 0 && currentArray[j] > key) {
            if (!isSorting) return;
            comparisons++; updateStats();
            bars[j].style.background = '#00d2ff';
            playSound(300 + currentArray[j]*3, 0.05);
            
            currentArray[j+1] = currentArray[j];
            currentLabels[j+1] = currentLabels[j];
            swaps++; updateStats();
            
            renderArray();
            bars = document.getElementsByClassName('bar');
            bars[j].style.background = '#00d2ff';
            bars[i].style.background = '#ffdf00';
            
            await sleep();
            bars[j].style.background = '#39ff14';
            j = j - 1;
        }
        currentArray[j+1] = key;
        currentLabels[j+1] = keyLabel;
        renderArray();
        bars = document.getElementsByClassName('bar');
        
        for(let k=0; k<=i; k++) bars[k].style.background = '#39ff14';
    }
    gameComplete();
}

// Helpers
function swap(i, j) {
    let temp = currentArray[i]; currentArray[i] = currentArray[j]; currentArray[j] = temp;
    let tempL = currentLabels[i]; currentLabels[i] = currentLabels[j]; currentLabels[j] = tempL;
}

function sleep() {
    const speed = document.getElementById('speed').value;
    return new Promise(resolve => setTimeout(resolve, speed));
}

// Game Flow
function resetStats() {
    comparisons = 0; swaps = 0; secondsElapsed = 0; countdownSeconds = 30;
    updateStats();
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = mode === 'practice' ? "00:00" : "00:30";
}

function updateStats() {
    document.getElementById('comparisons').innerText = comparisons;
    document.getElementById('swaps').innerText = swaps;
}

function resetGame() {
    isSorting = false;
    generateArray(scenario);
}

function startSorting() {
    if (isSorting) return;
    isSorting = true;
    document.getElementById('robot-text').innerHTML = `🤖 <span>Sorting in progress... Watch closely!</span>`;
    
    // Start Audio Context on user gesture
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Start Timer
    if (mode === 'practice') {
        timerInterval = setInterval(() => {
            secondsElapsed++;
            let m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
            let s = (secondsElapsed % 60).toString().padStart(2, '0');
            document.getElementById('timer').innerText = `${m}:${s}`;
        }, 1000);
    } else {
        timerInterval = setInterval(() => {
            countdownSeconds--;
            let s = countdownSeconds.toString().padStart(2, '0');
            document.getElementById('timer').innerText = `00:${s}`;
            if (countdownSeconds <= 0) {
                isSorting = false;
                clearInterval(timerInterval);
                playSound(100, 0.5, 'square');
                alert("Time's up! Try again.");
                generateArray(scenario);
            }
        }, 1000);
    }

    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'selection') selectionSort();
    else if (algorithm === 'insertion') insertionSort();
}

function gameComplete() {
    if (!isSorting) return;
    clearInterval(timerInterval);
    isSorting = false;
    // Victory sound
    playSound(500, 0.1, 'square');
    setTimeout(() => playSound(700, 0.3, 'square'), 100);
    
    document.getElementById('robot-text').innerHTML = `🤖 <span>Success! The list has been perfectly sorted!</span>`;
}

// UI Controls
function setAlgorithm(algo) { algorithm = algo; highlight('algo', event.target); }
function setMode(m) { mode = m; resetStats(); highlight('mode', event.target); }
function setListType(type) { listType = type; generateArray(scenario); highlight('type', event.target); }

function highlight(group, target) {
    const buttons = document.querySelectorAll(`[id^="${group}-"]`);
    buttons.forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');
}

// Init
generateArray();
