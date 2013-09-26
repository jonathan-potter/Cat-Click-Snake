(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Coordinate = Snake.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  }

  Coordinate.newScaleByCoord = function (coord, dir) {
    return new Coordinate(coord.x + dir[0], coord.y + dir[1]);
  }

  Coordinate.prototype.equals = function (coord) {
    return this.x === coord.x && this.y === coord.y
  }

  Coordinate.createApple = function() {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    return new Coordinate(x, y);
  }

  var startingCoordinate = new Coordinate(5,5)

  var Snake = Snake.Snake = function () {
    this.dir = [0,-1];
    this.scales = [startingCoordinate,
                   startingCoordinate,
                   startingCoordinate,
                   startingCoordinate];
  }

  Snake.prototype.move = function () {
    var head = this.scales[0];
    var scale = this.scales.pop();
    scale = Coordinate.newScaleByCoord(head, this.dir);
    this.scales.unshift(scale);
    console.log(scale)
  }

  Array.prototype.includesCoordinate = function(coordinate) {
    for (var i = 0; i < this.length; i++) {
      if (this[i].equals(coordinate)) {
        return true;
      }
    }
    return false;
  }

  Snake.prototype.turn = function (newDir) {
    bothX = Math.abs(this.dir[0]) === Math.abs(newDir[0]);
    bothY = Math.abs(this.dir[1]) === Math.abs(newDir[1]);
    if (!(bothX || bothY)) {
      this.dir = newDir;
    }
  }

  Snake.prototype.grow = function () {
    var tail = this.scales[this.scales.length - 1];
    var newTail = Coordinate.newScaleByCoord(tail, [0, 0]);
    this.scales.push(newTail)
  }

})(this);