(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Coordinate = Snake.Coordinate = function (y, x) {
    this.x = x;
    this.y = y;
    this.add = function (dx,dy) {
      this.x += dx;
      this.y += dy;
    }
  }

  Coordinate.newScaleByCoord = function (coord, dir) {
    return new Coordinate(coord.x + dir[0], coord.y + dir[1]);
  }

  var startingCoordinate = new Coordinate(5,5)

  var Snake = Snake.Snake = function () {
    this.dir = [0,1];
    this.scales = [startingCoordinate];
  }

  Snake.prototype.move = function () {
    var scale = this.scales.pop();
    var head = this.scales[0];
    scale = Coordinate.newScaleByCoord(head, this.dir);
    this.scales.unshift(scale);
  }

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  }

  Snake.prototype.bindKeyHandlers = function () {
    var snake = this;
    key('up', function() {
      snake.turn([0, -1]);
     });
    key('down', function() {
      snake.turn([0, 1]);
    });
    key('left', function() {
      snake.turn([-1, 0]);
    });
    key('right', function() {
      snake.turn([1, 0]);
    });
  }

})(this);