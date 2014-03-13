function NullHTMLActuator() {
}

NullHTMLActuator.prototype.actuate = function (grid, metadata) {};

NullHTMLActuator.prototype.restart = function () {};

NullHTMLActuator.prototype.clearContainer = function (container) {};

NullHTMLActuator.prototype.addTile = function (tile) {};

NullHTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

NullHTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

NullHTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

NullHTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

NullHTMLActuator.prototype.updateBestScore = function (bestScore) {};

NullHTMLActuator.prototype.message = function (won) {};

NullHTMLActuator.prototype.clearMessage = function () {};

NullHTMLActuator.prototype.scoreTweetButton = function () {};
