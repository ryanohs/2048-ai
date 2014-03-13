// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  window.activeGame = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
  scheduleMove();
});

function scheduleMove() {
	setTimeout(move, 200);
}

function move() {
	var game = window.activeGame;
	var bestMove = findBestMove(3, game.score, game.grid.cells);
	console.log("Best move: " + bestMove.move + ", score: " + bestMove.score);
	game.move(bestMove.move);
	if(!game.won && !game.over) {
		scheduleMove();
	}
}

function findBestMove(movesRemaining, score, cells)
{
	if(movesRemaining == 0) return { move: -1, score: score };
	var moveScores = [];
	for(var i = 0; i < 10; i++)
	{
		var g = new GameManager(4, NullInputManager, NullHTMLActuator, NullScoreManager, score, cells);
		g.move(0);
		if(g.won) return { move: 0, score: 10000000 };
		moveScores.push({ move: 0, score: findBestMove(movesRemaining - 1, g.score, g.grid.cells).score});
		
		g = new GameManager(4, NullInputManager, NullHTMLActuator, NullScoreManager, score, cells);
		g.move(1);
		if(g.won) return { move: 1, score: 10000000 };
		moveScores.push({ move: 1, score: findBestMove(movesRemaining - 1, g.score, g.grid.cells).score});
		
		g = new GameManager(4, NullInputManager, NullHTMLActuator, NullScoreManager, score, cells);
		g.move(2);
		if(g.won) return { move: 2, score: 10000000 };
		moveScores.push({ move: 2, score: findBestMove(movesRemaining - 1, g.score, g.grid.cells).score});
		
		g = new GameManager(4, NullInputManager, NullHTMLActuator, NullScoreManager, score, cells);
		g.move(3);
		if(g.won) return { move: 3, score: 10000000 };
		moveScores.push({ move: 3, score: findBestMove(movesRemaining - 1, g.score, g.grid.cells).score})
	}
	moveScores.sort(function(a, b) { return b.score - a.score; });
	return moveScores[0];
}

Array.prototype.clone = function() {
    var arr = this.slice(0);
    for( var i = 0; i < this.length; i++ ) {
        if( this[i] != null && this[i].clone ) {
            //recursion
            arr[i] = this[i].clone();
        }
    }
    return arr;
}

function NullInputManager() {}
NullInputManager.prototype.on = function() { }


function NullScoreManager() {}
NullScoreManager.prototype.get = function () { return 0; };
NullScoreManager.prototype.set = function (score) {};


