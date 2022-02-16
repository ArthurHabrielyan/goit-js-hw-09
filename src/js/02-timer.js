// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const dataPicker = document.querySelector('input[type="text"]');
const startButton = document.querySelector('button[data-start]');
const daysRef = document.querySelector('.value[data-days]');
const hoursRef = document.querySelector('.value[data-hours]');
const minutesRef = document.querySelector('.value[data-minutes]');
const secondsRef = document.querySelector('.value[data-seconds]');

const date = new Date();
let time = null;
let isActive = false;
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (date.getTime() > selectedDates[0].getTime()) {
      return pickingInvalidDate();
    }
    startButton.removeAttribute('disabled');
    startButton.addEventListener('click', () => {
      if (isActive) {
        return;
      }
      isActive = true;
      startInterval(selectedDates);
    });
  },
};

flatpickr(dataPicker, options);

function pickingInvalidDate() {
  startButton.setAttribute('disabled', false);
  return window.alert('Please choose a date in the future');
}

function startInterval(selectedDates) {
  interval = setInterval(() => {
    time = selectedDates[0].getTime() - Date.now();
    if (time <= 0) {
      clearInterval(interval);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(time);
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
  }, 1000);
}

function padTwoSymbols(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = padTwoSymbols(Math.floor(ms / day));
  // Remaining hours
  const hours = padTwoSymbols(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = padTwoSymbols(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = padTwoSymbols(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
