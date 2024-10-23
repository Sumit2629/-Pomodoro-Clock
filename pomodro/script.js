let sessionLength = 25;
let breakLength = 5;
let isRunning = false;
let isSession = true;
let timeLeft = sessionLength * 60;
let timerInterval;

const timeLeftDisplay = document.getElementById('time-left');
const sessionLengthDisplay = document.getElementById('session-length');
const breakLengthDisplay = document.getElementById('break-length');
const timerLabel = document.getElementById('timer-label');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const sessionDecrementBtn = document.getElementById('session-decrement');
const sessionIncrementBtn = document.getElementById('session-increment');
const breakDecrementBtn = document.getElementById('break-decrement');
const breakIncrementBtn = document.getElementById('break-increment');

// Update session and break lengths
sessionLengthDisplay.textContent = sessionLength;
breakLengthDisplay.textContent = breakLength;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timeLeftDisplay.textContent = formatTime(timeLeft);
}

// Handle start/stop button
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        enableTimeControls();
        startStopBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                if (isSession) {
                    timeLeft = breakLength * 60;
                    timerLabel.textContent = 'Break';
                } else {
                    timeLeft = sessionLength * 60;
                    timerLabel.textContent = 'Session';
                }
                isSession = !isSession;
            }
        }, 1000);

        isRunning = true;
        disableTimeControls();
        startStopBtn.textContent = 'Stop';
    }
});

// Handle reset button
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    isSession = true;
    timeLeft = sessionLength * 60;
    timerLabel.textContent = 'Session';
    updateTimerDisplay();
    enableTimeControls();
    startStopBtn.textContent = 'Start';
});

// Session length increment/decrement buttons
sessionIncrementBtn.addEventListener('click', () => {
    if (!isRunning) {
        sessionLength++;
        sessionLengthDisplay.textContent = sessionLength;
        timeLeft = sessionLength * 60;
        updateTimerDisplay();
    }
});

sessionDecrementBtn.addEventListener('click', () => {
    if (sessionLength > 1 && !isRunning) {
        sessionLength--;
        sessionLengthDisplay.textContent = sessionLength;
        timeLeft = sessionLength * 60;
        updateTimerDisplay();
    }
});

// Break length increment/decrement buttons
breakIncrementBtn.addEventListener('click', () => {
    if (!isRunning) {
        breakLength++;
        breakLengthDisplay.textContent = breakLength;
    }
});

breakDecrementBtn.addEventListener('click', () => {
    if (breakLength > 1 && !isRunning) {
        breakLength--;
        breakLengthDisplay.textContent = breakLength;
    }
});

function disableTimeControls() {
    sessionIncrementBtn.disabled = true;
    sessionDecrementBtn.disabled = true;
    breakIncrementBtn.disabled = true;
    breakDecrementBtn.disabled = true;
}

function enableTimeControls() {
    sessionIncrementBtn.disabled = false;
    sessionDecrementBtn.disabled = false;
    breakIncrementBtn.disabled = false;
    breakDecrementBtn.disabled = false;
}
