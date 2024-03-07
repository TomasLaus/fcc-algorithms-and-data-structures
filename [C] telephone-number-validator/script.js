const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const isValid = (num) => {
  const numberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
  return numberRegex.test(num);
};

const clear = () => {
  userInput.value = '';
  result.textContent = '';
};

checkBtn.addEventListener('click', () => {
  if (userInput.value === '') {
    alert('Please provide a phone number');
  }
  isValid(userInput.value)
    ? (result.textContent = `Valid US number: ${userInput.value}`)
    : (result.textContent = `Invalid US number: ${userInput.value}`);
});

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (userInput.value === '') {
      alert('Please provide a phone number');
    }
    isValid(userInput.value)
      ? (result.textContent = `Valid US number: ${userInput.value}`)
      : (result.textContent = `Invalid US number: ${userInput.value}`);
  }
});

clearBtn.addEventListener('click', () => {
  clear();
});
