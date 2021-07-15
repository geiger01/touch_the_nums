'use strict';
var cellsNumber = 20;
var gNums = makeNumbersArray(cellsNumber);
var gCounter = 0;
var gInterval;

function init() {
  reset();
  renderBoard();
}
////////////////////////////////////////////////////////////////

function renderBoard() {
  var numsCopy = gNums.slice();
  var strHTML = '';
  for (var i = 0; i < numsCopy.length; i++) {
    var randomNum = drawNum(gNums);
    strHTML += `<div class="cell" onClick="cellClicked(this,${i})"><h1>${randomNum}</h1></div>`;
  }
  var elBoard = document.querySelector('.container');
  elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, index) {
  var cellNumber = parseInt(elCell.textContent);
  //   console.log(elCells[index]);
  if (cellNumber === gCounter + 1) {
    if (cellNumber === 1) {
      startTimer();
    } else if (cellNumber === cellsNumber) {
      clearInterval(gInterval);
      gInterval = null;
    }
    gCounter++;
    elCell.style.backgroundColor = 'rgb(133, 39, 39)';
  }
}

function makeNumbersArray(number) {
  var nums = [];
  for (var i = 1; i <= number; i++) {
    nums.push(i);
  }
  return nums;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function drawNum(nums) {
  for (var i = 0; i < nums.length; i++) {
    var randomIdx = getRandomIntInclusive(0, nums.length - 1);
    var randomNum = nums[randomIdx];
  }
  nums.splice(nums.indexOf(randomNum), 1);
  return randomNum;
}

function startTimer() {
  var elTimerNumber = document.querySelector('.game-head span');
  var timerCounter = 1;
  gInterval = setInterval(function () {
    elTimerNumber.innerText = timerCounter;
    timerCounter++;
  }, 1000);
}

function reset() {
  clearInterval(gInterval);
  gInterval = null;
  document.querySelector('.game-head span').innerText = '0';
  gNums = makeNumbersArray(cellsNumber);
  gCounter = 0;
}

function level(elLevel) {
  console.log(elLevel.textContent);
  if (elLevel.textContent === 'hard') {
    cellsNumber = 20;
    init();
  }
  if (elLevel.textContent === 'medium') {
    cellsNumber = 15;
    init();
  }
  if (elLevel.textContent === 'easy') {
    cellsNumber = 10;
    init();
  }
}
