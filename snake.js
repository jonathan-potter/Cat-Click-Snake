(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Coordinate = Snake.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  }

  Coordinate.newScaleByCoord = function (coord, dir) {
    return new Coordinate(coord.x + dir[0], coord.y + dir[1]);
  }

  var startingCoordinate = new Coordinate(5,5)

  var Snake = Snake.Snake = function () {
    this.dir = [0,1];
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

  Snake.prototype.includesCoordinate = function(coordinate) {
    for (var i = 0; i < this.scales.length; i++) {
      if (this.scales[i].x === coordinate.x && this.scales[i].y === coordinate.y) {
        return true;
      }
    }
    return false;
  }

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  }

  // Snake.prototype.bindKeyHandlers = function () {
  //   var snake = this;
  //   key('up', function() {
  //     snake.turn([0, -1]);
  //    });
  //   key('down', function() {
  //     snake.turn([0, 1]);
  //   });
  //   key('left', function() {
  //     snake.turn([-1, 0]);
  //   });
  //   key('right', function() {
  //     snake.turn([1, 0]);
  //   });
  // }

})(this);