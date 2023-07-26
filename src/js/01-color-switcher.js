const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]')
};

refs.start.addEventListener('click', onStartChangeColor);
refs.stop.addEventListener('click', onStopChangeColor);
 
let checkFunction = false;
let timeId = 0;

function onStartChangeColor() {
    if (checkFunction) {
     
            return;
    };
   refs.stop.removeAttribute('disabled');
    refs.start.setAttribute('disabled', true);
    timeId = setInterval(() => {     
        refs.start.closest('body').style.backgroundColor = getRandomHexColor();
        checkFunction = true;
        
    }, 1000);  
   };

function onStopChangeColor() {
    refs.start.removeAttribute('disabled');
    
    refs.stop.setAttribute('disabled', true);
    clearInterval(timeId);
    checkFunction = false;    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}