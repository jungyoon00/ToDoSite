const timerForm = document.querySelector("#timer_get");
const start_time = document.querySelector("#start_time");
const end_time = document.querySelector("#end_time");

const row_start = document.querySelector("#row_start");
const row_end = document.querySelector("#row_end");

const stopwatch_form = document.querySelector("#stopwatch_form");
const stopwatch = document.querySelector("#stopwatch");
const timer_reset = document.querySelector("#timer_reset");

let timeid;
let time = 0;
let hour, min, sec;

function printTime() {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

function stopClock() {
    if (timeid != null) {
        clearTimeout(timeid);
    }
}

function startClock() {
    printTime();
    stopClock();
    timeid = setTimeout(startClock, 1000);
}

function resetClock() {
    stopClock();
    stopwatch.classList.remove("stopwatch_end");
    stopwatch.classList.add("stopwatch_style");
    stopwatch.innerText = "00:00:00";
    time = 0;
}

function getTimeFormatString() {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - (hour * 60 * 60)) /60));
    sec = time % 60;

    return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

function startTimer() {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const now = `${hours}:${minutes}:${seconds}`;

    if (timerForm.value == "active") {
        stopwatch.classList.remove("stopwatch_start");
        stopwatch.classList.add("stopwatch_end");
        timerForm.value = "unactive";
        timerForm.innerText = "Start Timer";
        changeEndTime(now);
        saveTimer("end_time", now);
        saveActive("unactive");
        stopClock();
        console.log("go unactive");
    } else {
        resetClock();
        stopwatch_form.classList.remove("hidden");
        stopwatch.classList.remove("stopwatch_style");
        stopwatch.classList.add("stopwatch_start");
        start_time.innerText = "";
        end_time.innerText = "";
        row_start.classList.add("hidden");
        row_end.classList.add("hidden");

        timerForm.value = "active";
        timerForm.innerText = "Stop Timer";
        changeStartTime(now);
        saveTimer("start_time", now);
        saveActive("active");
        startClock();
        console.log("go active");
    }
    console.log(now);
}

function saveActive(value) {
    localStorage.setItem("active", value)
}
function saveTimer(key, value) {
    localStorage.setItem(String(key), value);
}
function changeStartTime(time) {
    start_time.innerText = time;
    row_start.classList.remove("hidden");
}
function changeEndTime(time) {
    end_time.innerText = time;
    row_end.classList.remove("hidden");
}
let start = localStorage.getItem("start_time");
let end = localStorage.getItem("end_time");
let active = localStorage.getItem("active");

if (active === "active") {
    timerForm.value = "active";
    timerForm.innerText = "Stop Timer";
} else if (active == "unactive") {
    timerForm.value = "unactive";
    timerForm.innerText = "Start Timer";
}
if (start === undefined) {
    start = "";
} else {
    row_start.classList.remove("hidden");
}
if (end === undefined) {
    end = "";
} else {
    row_end.classList.remove("hidden");
}
console.log(start, end);
timerForm.addEventListener("click", startTimer);
timer_reset.addEventListener("click", resetClock);
start_time.innerText = start;
end_time.innerText = end;