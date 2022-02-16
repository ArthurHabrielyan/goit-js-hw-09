import Notiflix from 'notiflix';
const formElemet = document.querySelector('.form');

const submitForm = e => {
  e.preventDefault();

  let delay = +e.currentTarget.delay.value;
  let amount = +e.currentTarget.amount.value;
  let step = +e.currentTarget.step.value;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
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

formElemet.addEventListener('submit', submitForm);
