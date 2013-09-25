(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Board = Snake.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.snake = new Snake.Snake(Math.floor(width/2),Math.floor(height/2));
    this.apples = [];

  }

  Board.prototype.draw = function () {
    var that = this;
    $(function() {
      for (var y = 0; y < that.width; y++) {
        for (var x = 0; x < that.height; x++) {
          coordinate = new Snake.Coordinate(x, y);
          $tile = $('li[x=' + x + '][y=' + y + ']')

          if (that.snake.includesCoordinate(coordinate)) {
            console.log("true")
            // $tile.removeClass(".emptySpace");
            if (!$tile.hasClass("snake")) {
              $tile.toggleClass("snake");
            }
          } else {
            console.log("false")
            $tile.removeClass("snake");
            // if (!$tile.hasClass(".emptySpace")) {
//               $tile.addClass(".emptySpace");
//             }
          }
        }
      }
    });
  }

})(this);