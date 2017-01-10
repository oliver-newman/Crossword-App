var canvas; // var to hold canvas element
var grid = [];  // array for cells in grid
var accWords = [];  // array for across words
var downWords = [];  // array for down words
var allWords = [];  // array for all puzzle words
var acrossNums = [];  // array for across numbers
var downNums = [];  // array for down numbers
var aClues = [];  // array for across clue <li> DOM elements
var dClues = [];  // array for down clue <li> DOM elements
var allClues = [];  // array for all clues <li> DOM elements
var cols = 15;  // num of columns
var rows = 15;  // num of rows

function setup() {
  canvas = createCanvas(460, 460);  // create p5js canvas
  background(255);  // white
  canvas.parent("canvas");
  for (var j = 0; j < cols; j++) {  // j is column index
    for (var i = 0; i < rows; i++) {  // i is rows index
      var cell = new Cell(i, j);  // create new Cell object
      grid.push(cell);  // add Cell object to array "grid"
      if (spots[i+j*15] == ".") cell.color = "black";
    }
  }  // grid array is now complete
  addLetters(ans);  // add answer letters to each Cell
  addNumbers(spots);  // add numbers to each cell
  aWords();  // put across words in accWords
  dWords();  // put down words in downWords
  allWords = accWords.concat(downWords);  // concatenate acrosses and downs
  highWord(allWords[0]);  // highlight first across word to start

  for (var i = 0; i < acrossClues.length; i++) {
    var li = createElement('li', acrossClues[i]);
    li.value(str(acrossNums[i]));
    li.parent('across');
    aClues.push(li);
    li.id("across" + str(acrossNums[i]));
  }
  for (var j = 0; j < downClues.length; j++) {
    var li = createElement('li', downClues[j]);
    li.value(str(downNums[j]));
    li.parent('down');
    dClues.push(li);
    li.id("down" + str(downNums[j]));
  }
  allClues = aClues.concat(dClues);
  highClue(0);
  lenWord = accWords[0].length;
}

var wordIndex = 0;  // index of current word
var letIndex = 0;  // index of current letter
var lenWord;  // length of current word for forward/backward
var moveWord = false;  // bool - when to move WORD
var moveLetF = false;  // bool - when to move LETTER forward
var moveLetB = false;  // bool - when to move LETTER back
var state = "across";  // state - "across" or "down"
var switchDir = false;  // bool - switch from ac to dwn or dwn to ac
var guess = "";
var clueIndex = 0;
var mouseVal = false;
var xCoord;
var yCoord;
var freeMode = false;

function draw() {
  if (!freeMode) {
    if (moveWord) checkMoveWord(); // if ENTER, go to next word
  } else {
    if (moveWord) freeCheckMoveWord();
  }

    if (moveLetF || moveLetB) checkMoveLet(lenWord);  // update highlighted letter
    if (switchDir) {
      switchDirection();  // switch direction of word
    }

    allWords[wordIndex][letIndex].highlight("yellow");  // highlight current letter

    if (guess != "") updateGuess(lenWord); // update guess if letter key pushed

    checkListeners(wordIndex, letIndex);
    if (mouseVal) mouseMove();

  for (var i = 0; i < grid.length; i++) {  // loop through grid
    grid[i].show(spots[i]);  // show each Cell
  }

  if (isPuzzleFilled()) {
    if (isPuzzleCorrect()) {
      alert("Congratulations!  You have finished the crossword.");
      noLoop();
    } else {
      freeMode = true;
    }
  }
}

function keyPressed() {
  if (keyCode == RETURN || keyCode == TAB) {
    if (moveWord == false) moveWord = true;
  }

  else if (keyCode == RIGHT_ARROW) {
    if (state == "down") {
      state = "across";
      switchDir = true;
    } else if (moveLetF == false) moveLetF = true;
  }

  else if (keyCode == LEFT_ARROW) {
    if (state == "down") {
      state = "across";
      switchDir = true;
    } else if (moveLetB == false) moveLetB = true;
  }

  else if (keyCode == UP_ARROW) {
    if (state == "across") {
      state == "down";
      switchDir = true;
    } else if (moveLetB == false) moveLetB = true;
  }

  else if (keyCode == DOWN_ARROW) {
    if (state == "across") {
      state = "down";
      switchDir = true;
    } else if (moveLetF == false) moveLetF = true;
  } else if (str(key).match(/^[a-zA-Z]+$/)) {
    guess = str(key);
  }
  return false;
}

function mousePressed() {
  xCoord = mouseX;
  yCoord = mouseY;
  mouseVal = true;
}

function checkMoveWord() {
  unHighWord(allWords[wordIndex]);
  allClues[wordIndex].style("background-color", "white");
  wordIndex = updateWordIndex(wordIndex);
  getStartingLet(wordIndex);
  if (accWords.includes(allWords[wordIndex])) state = "across";
  else state = "down";
  highWord(allWords[wordIndex]);
  highClue(wordIndex);
  moveWord = false;
  lenWord = allWords[wordIndex].length;
}

function freeCheckMoveWord() {
  unHighWord(allWords[wordIndex]);
  allClues[wordIndex].style("background-color", "white");
  letIndex = 0;
  wordIndex++;
  if (wordIndex > allWords.length-1) {
    wordIndex = 0;
  }
  if (accWords.includes(allWords[wordIndex])) state = "across";
  else state = "down";
  highWord(allWords[wordIndex]);
  highClue(wordIndex);
  moveWord = false;
  lenWord = allWords[wordIndex].length;
}

function checkMoveLet(lenWord) {
  if (moveLetF && letIndex < lenWord-1) {
    allWords[wordIndex][letIndex].unhighlight("blue");
    letIndex++;
  } else if (moveLetB && letIndex > 0) {
    allWords[wordIndex][letIndex].unhighlight("blue");
    letIndex -= 1;
  }
  moveLetF = false;
  moveLetB = false;
}

function switchDirection() {
  allWords[wordIndex][letIndex].unhighlight("blue");
  unHighWord(allWords[wordIndex]);
  allClues[wordIndex].style("background-color", "white");
  var switchArray = findSwitchWord(allWords[wordIndex]);
  wordIndex = switchArray[0];
  letIndex = switchArray[1];
  if (accWords.includes(allWords[wordIndex])) state = "across";
  else state = "down";
  highWord(allWords[wordIndex]);
  highClue(wordIndex);
  allWords[wordIndex][letIndex].highlight("yellow");
  lenWord = allWords[wordIndex].length;
}

function updateGuess(lenWord) {
  allWords[wordIndex][letIndex].setGuess(guess);
  guess = "";
  if (letIndex < lenWord-1) {
    allWords[wordIndex][letIndex].unhighlight("blue");
    letIndex++;
  } else if (!isPuzzleFilled()) {
      checkMoveWord();
  } else {
    freeMode = true;
  }
}

function highClue(wordIndex) {
  allClues[wordIndex].style("background-color", "yellow");
  var elNum = allWords[wordIndex][0].number;
  var el = document.getElementById(str(state) + str(elNum));
  el.scrollIntoView(true);
}

function isPuzzleFilled() {
  for (var i = 0; i < allWords.length; i++) {
    for (var j = 0; j < allWords[i].length; j++) {
      if (allWords[i][j].guess == "") {
        return false;
      }
    }
  }
  return true;
}

function isPuzzleCorrect() {
  for (var i = 0; i < allWords.length; i++) {
    for (var j = 0; j < allWords[i].length; j++) {
      if (allWords[i][j].guess != allWords[i][j].letter) {
        return false;
      }
    }
  }
  return true;
}

function isWordFilled(wordIndex) {
  for (var i = 0; i < allWords[wordIndex].length; i++) {
    if (allWords[wordIndex][i].guess == "") {
      return false;
    }
  }
  return true;
}

function updateWordIndex(wordIndex) {
  wordIndex += 1;
  if (wordIndex == allWords.length) {
    wordIndex = 0;
  }
  while (isWordFilled(wordIndex) == true) {
    wordIndex += 1;
    if (wordIndex == allWords.length) {
      wordIndex = 0;
    }
  }
  return wordIndex;
}

function getStartingLet(wordIndex) {
  for (var i = 0; i < allWords[wordIndex].length; i++) {
    if (allWords[wordIndex][i].guess == "") {
      letIndex = i;
      break;
    }
  }
}

function mouseMove() {
  for (var i = 0; i < grid.length; i++) {
    if (xCoord > grid[i].x && grid[i].size+grid[i].x > xCoord) {
      if (yCoord > grid[i].y && grid[i].size+grid[i].y > yCoord) {
        unHighWord(allWords[wordIndex]);
        allClues[wordIndex].style("background-color", "white");
        if (allWords[wordIndex][letIndex] != grid[i]) {
          if (state == "across") {
            for (var k = 0; k < accWords.length; k++) {
              for (var j = 0; j < accWords[k].length; j++) {
                if (grid[i] == accWords[k][j]) {
                  wordIndex = k;
                  letIndex = j;
                }
              }
            }
          } else {
            for (var k = 0; k < downWords.length; k++) {
              for (var j = 0; j < downWords[k].length; j++) {
                if (grid[i] == downWords[k][j]) {
                  wordIndex = accWords.length + k;
                  letIndex = j;
                }
              }
            }
          }
        } else {
          if (state == "across") {
            state = "down";
            for (var k = 0; k < downWords.length; k++) {
              for (var j = 0; j < downWords[k].length; j++) {
                if (grid[i] == downWords[k][j]) {
                  wordIndex = accWords.length + k;
                  letIndex = j;
                }
              }
            }
          } else {
            state = "across";
            for (var k = 0; k < accWords.length; k++) {
              for (var j = 0; j < accWords[k].length; j++) {
                if (grid[i] == accWords[k][j]) {
                  wordIndex = k;
                  letIndex = j;
                }
              }
            }
          }
        }
      }
    }
  }
  highWord(allWords[wordIndex]);
  highClue(wordIndex);
  lenWord = allWords[wordIndex].length;
  mouseVal = false;
}
