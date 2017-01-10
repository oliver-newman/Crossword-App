var canvas;
var grid = [];

function setup() {
  canvas = createCanvas(151, 151);
  canvas.parent("canvas");
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  var colorArray = [0, 1, 5, 19, 23, 24];
  for (var i = 0; i < colorArray.length; i++) {
    grid[colorArray[i]].setColor("black");
  }
}

function draw() {
  background(255);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

}


function Cell(i, j) {
  this.size = 30;
  this.i = i;
  this.j = j;
  this.x = this.i*this.size;
  this.y = this.j*this.size;
  this.color = "white";

  this.show = function() {
    fill(this.color);
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
  }

  this.setColor = function(color) {
    this.color = color;
  }
}
