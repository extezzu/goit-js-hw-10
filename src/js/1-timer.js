/* libraries */
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

/* elements */
const dateInput = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);
const dataDays = document.querySelector(`[data-days]`);
const dataHours = document.querySelector(`[data-hours]`);
const dataMinutes = document.querySelector(`[data-minutes]`);
const dataSeconds = document.querySelector(`[data-seconds]`);

let userSelectDate = null;
startBtn.disabled = true;

/* flatpickr options */
const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,

onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
    iziToast.error({
    message: "Please choose a date in the future",
    position: "topRight",
});
    startBtn.disabled = true;
    return;
}

    userSelectDate = selectedDate;
    startBtn.disabled = false;
},
};

flatpickr(dateInput, options);

/* helpers */
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

const days = Math.floor(ms / day);
const hours = Math.floor((ms % day) / hour);
const minutes = Math.floor(((ms % day) % hour) / minute);
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

function updateUI({ days, hours, minutes, seconds }) {
dataDays.textContent = days;
dataHours.textContent = addLeadingZero(hours);
dataMinutes.textContent = addLeadingZero(minutes);
dataSeconds.textContent = addLeadingZero(seconds);
}

/* start timer */
startBtn.addEventListener("click", () => {
startBtn.disabled = true;
dateInput.disabled = true;

const interval = setInterval(() => {
    const now = Date.now();
    const diff = userSelectDate - now;

if (diff <= 0) {
    clearInterval(interval);
    updateUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    dateInput.disabled = false;
    return;
    }

    const time = convertMs(diff);
    updateUI(time);

}, 1000);
});