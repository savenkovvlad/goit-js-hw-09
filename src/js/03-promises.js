import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onPushSubmit);

function onPushSubmit(e) {
  e.preventDefault();
  let {
    elements: { delay, step, amount },
  } = e.currentTarget;
  
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  
  for (let i = 1; i <= amount; i += 1){
    createPromise( i, delay )
    .then(({position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
delay += step;
  }
  e.currentTarget.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
              }
    }, delay);   
  }); 
}
