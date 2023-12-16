// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  var lengthOfPassword = prompt('How many characters do you want in your password?');
  lengthOfPassword = +lengthOfPassword;
  if (isNaN(lengthOfPassword) || lengthOfPassword < 8 || lengthOfPassword > 128) {
    alert('Please enter a valid number between 8 and 128');
  } else {
    var lowerCase = confirm('Click OK if you want to have lower cases in you password.');
    var upperCase = confirm('Click OK if you want to have upper cases in you password.');
    var numeric = confirm('Click OK if you want to have numeric cases in you password.');
    var specialCharacters = confirm('Click OK if you want to have special characters in you password.');
  
    var userChoices = [lengthOfPassword, lowerCase, upperCase, numeric, specialCharacters];  
  }

  return userChoices;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomMax = arr.length;
  return Math.floor(Math.random() * (arr.length));
}

// Function to generate password with user input
function generatePassword() {
  var userInput = getPasswordOptions();

  if (userInput === undefined) {
    return;
  }

  var password = [];
  var arrayChoice = [];
  var numberOfTrueArrays = 0;

  if (userInput[1]) {
    arrayChoice.push(lowerCasedCharacters);
    password.push(lowerCasedCharacters[getRandom(lowerCasedCharacters)]);
    numberOfTrueArrays++;
  } 

  if (userInput[2]) {
    arrayChoice.push(upperCasedCharacters);
    password.push(upperCasedCharacters[getRandom(upperCasedCharacters)]);
    numberOfTrueArrays++;
  }

  if (userInput[3]) {
    arrayChoice.push(numericCharacters);
    password.push(numericCharacters[getRandom(numericCharacters)]);
    numberOfTrueArrays++;
  }

  if (userInput[4]) {
    arrayChoice.push(specialCharacters);
    password.push(specialCharacters[getRandom(specialCharacters)]);
    numberOfTrueArrays++;
  }

  for (var i = 0; i < userInput[0] - numberOfTrueArrays; i++) {
    var pickArray = Math.floor(Math.random() * arrayChoice.length);
    var selectedArray = arrayChoice[pickArray];
    var randomIndex = getRandom(selectedArray);
    password.push(selectedArray[randomIndex]);
  }

  // shuffle copied from StackOverflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var finalPassword = password
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  
  return finalPassword.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);