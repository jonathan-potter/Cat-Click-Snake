(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Board = Snake.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.snake = new Snake.Snake(Math.floor(width/2),Math.floor(height/2));
    this.apples = [];
    this.cats = [];
  }

  Board.prototype.draw = function () {
    var that = this;
    $(function() {
      for (var y = 0; y < that.width; y++) {
        for (var x = 0; x < that.height; x++) {
          coordinate = new Snake.Coordinate(x, y);
          $tile = $('li[x=' + x + '][y=' + y + ']')

          if (that.cats.includesCoordinate(coordinate)) {
            if (!$tile.hasClass("cat")) {
              $tile.toggleClass("cat");
            }
          }

          if (that.apples.includesCoordinate(coordinate)) {
            if (!$tile.hasClass("apple")) {
              $tile.toggleClass("apple");
            }
          } else {
            $tile.removeClass("apple");
          }

          if (that.snake.scales.includesCoordinate(coordinate)) {
            // $tile.removeClass(".emptySpace");
            if (!$tile.hasClass("snake")) {
              $tile.toggleClass("snake");
            }
          } else {
            $tile.removeClass("snake");
          }
        }
      }
    });
  }

  Board.prototype.collision = function () {
    var head = this.snake.scales[0];
    for (var i = 1; i < this.snake.scales.length; i++) {
      if (this.snake.scales[i].equals(head)) {
        return  true;
      }
    }
    return false;
  }

  Board.prototype.collisionWithApple = function () {
    var head = this.snake.scales[0];
    for (var i = 0; i < this.apples.length; i++) {
      if (this.apples[i].equals(head)) {
        return true
      }
    }
    return false;
  }

  Board.prototype.outOfBounds = function () {
    var head = this.snake.scales[0];
    var obx = head.x < 0 || head.x >= this.width;
    var oby = head.y < 0 || head.y >= this.height;

    return obx || oby;
  }

})(this);