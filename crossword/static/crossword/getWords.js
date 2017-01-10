var firstDownWords = [];

function aWords() {
  var current = [];
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var index = i + (j * rows);
      if (grid[index].color == "white") {
        current.push(grid[index]);
      } else if (current.length > 0) {
          accWords.push(current);
          acrossNums.push(current[0].number);
          current = [];
      }
    } if (current.length > 0) {
      accWords.push(current);
      acrossNums.push(current[0].number);
      current = [];
    }
  }
}

function dWords() {
  current = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var index = i + (j * cols);
      if (grid[index].color == "white") {
        current.push(grid[index]);
      } else if (current.length > 0) {
        firstDownWords.push(current);
        downNums.push(current[0].number);
        current = [];
      }
    } if (current.length > 0) {
      firstDownWords.push(current);
      downNums.push(current[0].number);
      current = [];
    }
  }
  reorderDWords();
  downNums.sort(sortNumber);
}

function sortNumber(a,b) {
    return a - b;
}

function reorderDWords() {
  for (var j = 0; j < grid.length; j++) {
    for (var k = 0; k < firstDownWords.length; k++) {
      if (firstDownWords[k][0] == grid[j]) {
        downWords.push(firstDownWords[k]);
        firstDownWords.splice(k, 1);
      }
    }
  }
}

function highWord(word) {
  for (var i = 0; i < word.length; i++) {
    word[i].highlight("blue");
  }
}

function unHighWord(word) {
  for (var i = 0; i < word.length; i++) {
    word[i].unhighlight("white");
  }
}

function addLetters(ans) {
  for (var i = 0; i < grid.length; i++) {
    grid[i].setLetter(ans.charAt(i));
  }
}

function addNumbers(spots) {
  total = 1;
  for (var i = 0; i < grid.length; i++) {
    if (spots[i] == "-") {
      if (i < rows || !(i%15) || spots[i-15]=="." || spots[i-1]==".") {
        grid[i].number = total;
        total++;
      }
    }
  }
}

function findSwitchWord(current) {
  for (var i = 0; i < allWords.length; i++) {
    for (var j = 0; j < allWords[i].length; j++) {
      if (current[letIndex] == allWords[i][j]) {
        if (current != allWords[i]) {
          switchDir = false;
          return [i, j];
        }
      }
    }
  }
}
