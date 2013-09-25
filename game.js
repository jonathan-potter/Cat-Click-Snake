(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  gameSpeed = 200;

  Game = Snake.Game = function (width, height) {
    this.board = new Snake.Board(width, height);
  }

  Game.prototype.move = function() {
    this.board.snake.move();
  }

  Game.prototype.draw = function() {
    this.board.draw();
  }

  Game.prototype.step = function() {
    console.log('step')
    this.move();
    this.draw();
    // if (this.checkCollisions()) {
 //      this.stop();
 //    }
  }

  Game.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.intervalId = window.setInterval(that.step.bind(that), gameSpeed);
  }

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalId)
  }

  Game.prototype.bindKeyHandlers = function () {
    var snake = this.board.snake;
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