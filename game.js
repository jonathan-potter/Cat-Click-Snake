(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  gameSpeed = 120;

  Game = Snake.Game = function (width, height) {
    Snake.width = width;
    Snake.height = height;
    this.board = new Snake.Board(width, height);
    this.score = 0;
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

    if (this.board.apples.length < 1) {
      this.board.createApple();
    }

    if (this.board.collision() || this.board.outOfBounds()) {
      this.stop();
    } else if (this.board.collisionWithApple()) {
      this.board.cats.push(this.board.snake.scales[0])
      this.board.snake.grow();
      this.removeApple();
    }

    this.draw();
    //
  }

  Game.prototype.removeApple = function() {
    this.score += 1;
    this.updateScoreboard();
    return this.board.apples.pop();
  }

  Game.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.updateScoreboard();
    this.intervalId = window.setInterval(that.step.bind(that), gameSpeed);
  }

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalId)
  }

  Game.prototype.bindKeyHandlers = function () {
    game = this
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
    $('.resetButton').on("click", function () {
      game.stop();
      game = new Snake.Game(Snake.width, Snake.height);
      game.start();
    })
  }

  Game.prototype.updateScoreboard = function () {
    $('.scoreboard').html("score: " + this.score)
  }

})(this);