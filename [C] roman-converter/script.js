const convertBtn = document.getElementById('convert-btn');
const numberInp = document.getElementById('number');
const output = document.getElementById('output');

const romanize = (num) => {
  const table = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  const roman = '';

  if (isNaN(num) || !num) {
    output.textContent = 'Please enter a valid number';
    return;
  }
  if (num < 0) {
    output.textContent = 'Please enter a number greater than or equal to 1';
    return;
  }
  if (num >= 4000) {
    output.textContent = 'Please enter a number less than or equal to 3999';
    return;
  }

  for (let i in table) {
    while (num >= table[i]) {
      roman += i;
      num -= table[i];
    }
  }

  output.textContent = roman;
  return roman;
};

convertBtn.addEventListener('click', () => {
  romanize(numberInp.value);
});
