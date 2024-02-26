// Ensure the DOM is fully loaded before attaching event listeners
window.onload = function () {
  // Function to check if the text is a palindrome
  function isPalindrome(text) {
    // Remove non-alphanumeric characters and convert to lower case
    var cleaned = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    // Compare the cleaned string to its reverse
    return cleaned === cleaned.split('').reverse().join('');
  }

  // Function to handle click event
  function onCheckButtonClick() {
    var textInput = document.getElementById('text-input').value;
    // Check if the input is empty and alert if true
    if (textInput.trim() === '') {
      alert('Please input a value');
      return; // Exit the function to avoid further execution
    }
    // Display the result
    displayResult(textInput);
  }

  // Function to display result in the #result element
  function displayResult(text) {
    var resultElement = document.getElementById('result');
    resultElement.style.display = 'none';
    if (isPalindrome(text)) {
      resultElement.style.display = 'flex';
      resultElement.innerText = `${text} is a palindrome`;
    } else {
      resultElement.style.display = 'flex';
      resultElement.innerText = `${text} is not a palindrome`;
    }
  }

  // Event listener for the button click
  document.getElementById('check-btn').addEventListener('click', onCheckButtonClick);

  // Event listener for the Enter key in the input field
  document.getElementById('text-input').addEventListener('keypress', function (event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      // Prevent the form from being submitted if there is a form element
      event.preventDefault();
      // Trigger the palindrome check
      onCheckButtonClick();
    }
  });
};
