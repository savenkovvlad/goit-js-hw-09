import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

let selectedDate = 0;

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};
function onDisabledBtn() {
    refs.startBtn.setAttribute('disabled', true);
};
onDisabledBtn();
refs.startBtn.addEventListener('click', onStartTime); 
 
function onStartTime() {
    onDisabledBtn();
    refs.input.setAttribute('disabled', true);
    setInterval(() => {          
        const currentDate = new Date();
        if (selectedDate - currentDate < 0) {
            return;
        }
           let clock = convertMs(selectedDate - currentDate);                   
    
               refs.days.textContent = clock.days;
                refs.hours.textContent = clock.hours;
                refs.minutes.textContent = clock.minutes;
                refs.seconds.textContent = clock.seconds;                
           }, 1000);
};

function addLeadingZero(value) {
    return  String(value).padStart('2', 0);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {    
        if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
            onDisabledBtn();
                       
         return Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            selectedDate = selectedDates[0].getTime();
            
           refs.startBtn.removeAttribute('disabled');    
        };
    },
};
flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};
