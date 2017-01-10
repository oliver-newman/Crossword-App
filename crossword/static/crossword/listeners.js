function checkListeners(wordIndex, letIndex) {
  document.getElementById("checkLetter").addEventListener("click",
  function() {
    allWords[wordIndex][letIndex].checkLetter();
  });
  document.getElementById("checkWord").addEventListener("click",
  function () {
    for (var j = 0; j < allWords[wordIndex].length; j++ ){
      allWords[wordIndex][j].checkLetter();
    }
  });
  document.getElementById("checkPuzzle").addEventListener("click",
  function() {
    for (var i = 0; i < allWords.length; i++) {
      for (var j = 0; j < allWords[i].length; j++) {
        allWords[i][j].checkLetter();
      }
    }
  });
  document.getElementById("revealLetter").addEventListener("click",
  function() {
    allWords[wordIndex][letIndex].revealLetter();
  });
  document.getElementById("revealWord").addEventListener("click",
  function() {
    for (var i = 0; i < allWords[wordIndex].length; i++) {
      allWords[wordIndex][i].revealLetter();
    }
  });
  document.getElementById("revealPuzzle").addEventListener("click",
  function() {
    for (var i = 0; i < allWords.length; i++) {
      for (var j = 0; j < allWords[i].length; j++) {
        allWords[i][j].revealLetter();
      }
    }
  });
  document.getElementById("clearLetter").addEventListener("click",
  function() {
    allWords[wordIndex][letIndex].setGuess("");
  });
  document.getElementById("clearWord").addEventListener("click",
  function() {
    for (var i = 0; i < allWords[wordIndex].length; i++) {
      allWords[wordIndex][i].setGuess("");
    }
  });
  document.getElementById("clearPuzzle").addEventListener("click",
  function() {
    for (var i = 0; i < allWords.length; i++) {
      for (var j = 0; j < allWords[i].length; j++) {
        allWords[i][j].setGuess("");
      }
    }
  });
}
