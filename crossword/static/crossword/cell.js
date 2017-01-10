function Cell(i, j) {
  this.size = 30;
  this.i = i;
  this.j = j;
  this.x = this.i*this.size;
  this.y = this.j*this.size;
  this.current = false;
  this.color = "white";
  this.letter = "";
  this.number = -1;
  this.guess = "";
  this.checked = false;
  this.hasX = false;
  this.revealed = false;
  this.textColor = "black";
  this.checkWasIncorrect = false;
  this.revealWasIncorrect = false;
  this.canBeCleared = true;

  this.show = function(spot) {
    fill(this.color);
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
    if (this.hasX) this.drawX();
    if (this.checkWasIncorrect) this.drawCorner("black");
    if (this.revealWasIncorrect) this.drawCorner("red");

    // draw number
    if (this.number != -1) {
      textAlign(LEFT, BOTTOM);
      strokeWeight(0);
      textStyle(NORMAL);
      textFont("Times")
      textSize(this.size*3/10);
      fill("black");
      text(this.number, this.x+this.size/10, this.y+this.size*11/30);
      strokeWeight(1);
    }

    // draw guessed letter
    if (this.guess != "") {
      textFont("Georgia");
      textSize(this.size*2/3);
      fill(this.textColor);
      stroke(0);
      textAlign(CENTER, CENTER);
      text(this.guess, this.x+(this.size/2), this.y+(this.size*9/15));
    }
  }

  this.highlight = function(col) {
    if (col == "blue") this.color = color(173, 216, 230);
    else this.color = "yellow";
  }

  this.unhighlight = function(col) {
    if (col == "blue") this.color = color(173, 216, 230);
    else this.color = "white";
  }

  this.setLetter = function(let) {
    if (!this.revealed && !this.checked) {
      this.letter = let;
    }
  }

  this.setGuess = function(let) {
    if (this.canBeCleared) this.guess = let;
    if (this.hasX) this.hasX = false;
  }

  this.checkLetter = function() {
    if (this.guess != "") {
      if (this.guess != this.letter) {
        this.hasX = true;
        this.checkWasIncorrect = true;
      } else {
        this.textColor = "blue";
        this.canBeCleared = false;
      }
    }
    this.checked = true;
  }

  this.drawX = function() {
    stroke('red');
    line(this.x, this.y, this.x+this.size, this.y+this.size);
  }

  this.drawCorner = function(col) {
    fill(col);
    stroke(col);
    triangle(this.x+(this.size*3/4), this.y, this.x+this.size, this.y, this.x+this.size, this.y+(this.size/4))
  }

  this.revealLetter = function() {
    if (this.guess == this.letter) {
      this.textColor = "blue";
    } else {
      this.guess = this.letter;
      this.revealWasIncorrect = true;
    }
    this.revealed = true;
    this.canBeCleared = false;
  }

}
