// Business Logic

function Player(name, currentScore, totalScore) {
  this.name = name;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

Player.prototype.endTurn = function () {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
}

Player.prototype.roll = function () {
  const roll = rollDice();
  if (roll === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll;
  }
  return roll;
}

Player.prototype.roll2 = function () {
  const roll1 = rollDice();
  const roll2 = rollDice();
  if (roll1 === roll2 && roll1 === 1) {
    this.currentScore = 0;
    this.endTurn();
    this.totalScore = 0;
  } else if (roll1 === 1 || roll2 === 1) {
    this.currentScore = 0;
    this.endTurn();
  } else {
    this.currentScore += roll1 + roll2;
  }
  return [roll1, roll2];
}

Player.prototype.winCheck = function () {
  if (this.totalScore >= 100) {
    return true
  }
  return false
}

// UI Logic

let player1 = new Player("", 0, 0);
let player2 = new Player("", 0, 0);
let currentPlayer = 1;
let gameType = 1;

function rollOne() {
  let hideButton = "#player-" + currentPlayer + "-roll"
  $(hideButton).hide();
}

function rollDoubles() {
  let hideButton = "#player-" + currentPlayer + "-hold"
  $(hideButton).hide();
}

function newPlayer() {
  $(".dice-img").hide();
  let show1 = "#player-" + currentPlayer + "-hold"
  let show2 = "#player-" + currentPlayer + "-roll"
  let show3 = "#p" + currentPlayer + "-dice-1-1"
  $(show1).show();
  $(show2).show();
  $(show3).show();
  if (gameType === 2) {
    let show4 = "#p" + currentPlayer + "-dice-2-1"
    $(show4).show();
  }
}

function playerOneEnd() {
  $("#player-1-play").hide();
  currentPlayer = 2;
  if (player1.winCheck() === true) {
    $("#win-display").fadeIn();
    $("#winner").text(player1.name);
  } else {
    $("#player-2-play").fadeIn();
  }
  newPlayer();
}

function playerTwoEnd() {
  $("#player-2-play").hide();
  currentPlayer = 1;
  if (player2.winCheck() === true) {
    $("#win-display").fadeIn();
    $("#winner").text(player2.name);
  } else {
    $("#player-1-play").fadeIn();
  }
  newPlayer();
}

function attachButtonRollListeners() {

  $("button#player-1-roll").on("click", function () {
    if (gameType === 1) {
      let roll = player1.roll();
      let diceId = "#p1-dice-1-" + roll;
      $("#player-1-hold").show();
      $("#player-1-current").text(player1.currentScore);
      if (roll === 1) {
        rollOne();
      }
      $(".dice-img").hide();
      $(diceId).fadeIn();
    } else {
      let roll = player1.roll2();
      let diceId1 = "#p1-dice-1-" + roll[0];
      let diceId2 = "#p1-dice-2-" + roll[1];
      $("#player-1-hold").show();
      $("#player-1-current").text(player1.currentScore);
      if (roll[0] === 1 || roll[1] === 1) {
        rollOne();
      } else if (roll[0] === roll[1]) {
        rollDoubles();
      }
      $(".dice-img").hide();
      $(diceId1).fadeIn();
      $(diceId2).fadeIn();
    }
  });

  $("button#player-2-roll").on("click", function () {
    if (gameType === 1) {
      let roll = player2.roll();
      let diceId = "#p2-dice-1-" + roll;
      $("#player-2-hold").show();
      $("#player-2-current").text(player2.currentScore);
      if (roll === 1) {
        rollOne();
      }
      $(".dice-img").hide();
      $(diceId).fadeIn();
    } else {
      let roll = player2.roll2();
      let diceId1 = "#p2-dice-1-" + roll[0];
      let diceId2 = "#p2-dice-2-" + roll[1];
      $("#player-2-hold").show();
      $("#player-2-current").text(player2.currentScore);
      if (roll[0] === 1 || roll[1] === 1) {
        rollOne();
      } else if (roll[0] === roll[1]) {
        rollDoubles();
      }
      $(".dice-img").hide();
      $(diceId1).fadeIn();
      $(diceId2).fadeIn();
    }
  });

  $("button#player-1-hold").on("click", function () {
    player1.endTurn();
    $("#player-1-current").text(player1.currentScore);
    $("#player-1-total").text(player1.totalScore);
    playerOneEnd();
  });

  $("button#player-2-hold").on("click", function () {
    player2.endTurn();
    $("#player-2-current").text(player2.currentScore);
    $("#player-2-total").text(player2.totalScore);
    playerTwoEnd();
  });

  $("button#play-again").on("click", function () {
    location.reload();
  });
}

$(document).ready(function () {
  attachButtonRollListeners();
  $("form#name-entry").submit(function (event) {
    event.preventDefault();
    const p1 = $("input#player-1").val();
    const p2 = $("input#player-2").val();
    const game = parseInt($("select#game-type").val());
    player1.name = p1;
    player2.name = p2;
    gameType = game;
    if (game === 1) {
      $("#p1-dice-1-1").show();
    } else {
      $("#p1-dice-1-1").show();
      $("#p1-dice-2-1").show();
    }
    $("#player-1-name").text(p1);
    $("#player-2-name").text(p2);
    $("form#name-entry").hide();
    $("#player-1-play").fadeIn();
  });
});