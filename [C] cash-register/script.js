let price = 1.87; // Default price
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

// Define the currency unit values in descending order
const currencyUnits = {
  'ONE HUNDRED': 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

document.getElementById('purchase-btn').addEventListener('click', function () {
  let cash = parseFloat(document.getElementById('cash').value);
  let changeDue = cash - price;

  // Check if the customer paid the exact amount
  if (changeDue === 0) {
    displayNoChangeDue();
    return; // Exit the function as no further processing is needed
  } else if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  let change = getChange(changeDue, cid);
  displayChange(change);
});

function displayNoChangeDue() {
  let display = document.getElementById('change-due');
  display.innerText = 'No change due - customer paid with exact cash';
}

function getChange(changeDue, cid) {
  let change = { status: '', change: [] };
  let totalCID = getTotalCID(cid);

  if (changeDue > totalCID) {
    change.status = 'INSUFFICIENT_FUNDS';
    return change;
  } else if (changeDue === totalCID) {
    change.status = 'CLOSED';
    change.change = cid;
    return change;
  } else {
    change.status = 'OPEN';
    let changeArr = [];
    let remainingChange = changeDue;

    // Loop through currency units from highest to lowest
    for (let unit of Object.keys(currencyUnits)) {
      let unitValue = currencyUnits[unit];
      let available = cid.find((elem) => elem[0] === unit)[1];
      let amountNeeded = Math.floor(remainingChange / unitValue) * unitValue;

      if (amountNeeded > 0 && available >= amountNeeded) {
        changeArr.push([unit, amountNeeded]);
        remainingChange -= amountNeeded;
        remainingChange = parseFloat(remainingChange.toFixed(2)); // Fix floating point precision issues
      } else if (available < amountNeeded && available > 0) {
        changeArr.push([unit, available]);
        remainingChange -= available;
        remainingChange = parseFloat(remainingChange.toFixed(2)); // Fix floating point precision issues
      }

      if (remainingChange === 0) break;
    }

    if (remainingChange > 0) {
      change.status = 'INSUFFICIENT_FUNDS';
      change.change = [];
    } else {
      change.change = changeArr;
    }

    return change;
  }
}

function getTotalCID(cid) {
  return cid.reduce((acc, curr) => acc + curr[1], 0);
}

function displayChange(change) {
  let display = document.getElementById('change-due');

  if (change.status === 'INSUFFICIENT_FUNDS') {
    display.innerText = 'Status: INSUFFICIENT_FUNDS';
  } else if (change.status === 'CLOSED') {
    display.innerText = 'Status: CLOSED ' + change.change.map((a) => `${a[0]}: $${a[1]}`).join(' ');
  } else {
    display.innerText =
      `Status: OPEN ` + change.change.map((a) => `${a[0]}: $${a[1].toFixed(2)}`).join(' ');
  }
}
