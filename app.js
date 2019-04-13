/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// declaring base variables
var scores, roundScore, activePlayer, minulyHod;
var podminkaVitezstvi;
startGame();

document.querySelector(".wincondition-set-btn").addEventListener("click", function(){
  podminkaVitezstvi = document.querySelector(".winning-condition").value;
  console.log(podminkaVitezstvi);
}
);


// accesing and setting html elements which shows scores
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// accesing the dice "picture" via its container with class .dice
document.querySelector(".dice").style.display = "none";

//event that will run on clicking roll button
document.querySelector(".btn-roll").addEventListener("click", function() {
  //variable that store random number between 1-6
  var diceRoll = Math.floor(Math.random() * 6 + 1);

  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";
  //sett picture of dice based on value of roll
  diceDom.src = "dice-" + diceRoll + ".png";

  if (diceRoll !== 1) {
    //add score
    if(minulyHod === 6){
      console.log("funguje");
      minulyHod = -1;
      scores[activePlayer]=0;
      document.querySelector("#score-"+[activePlayer]).textContent = "0";
      nextPlayerTurn();
    }
    else{
      minulyHod = diceRoll
      roundScore += diceRoll;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    
  } else {
    //next
    minulyHod = -1;
    nextPlayerTurn();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  scores[activePlayer] += roundScore;

  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

      if (scores[activePlayer] >= podminkaVitezstvi) {
        document.getElementById("name-" + activePlayer).textContent = " WINNER!!!!";
        document.querySelector(".btn-roll").style.visibility = "hidden";
        document.querySelector(".btn-hold").style.visibility = "hidden";
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");
        } 
  
      else {
        minulyHod = -1;
        nextPlayerTurn();
      }
});


document.querySelector(".btn-new").addEventListener("click", startGame);

function nextPlayerTurn() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector(".dice").style.display = "none";
}

function startGame()
{
      scores = [0, 0];
      roundScore = 0;
      activePlayer = 0;
      minulyHod = -1;
      podminkaVitezstvi = 100;

      document.getElementById("name-0").textContent = "Hráč 1";
      document.getElementById("name-1").textContent = "Hráč 2";
      document.getElementById("score-0").textContent = "0";
      document.getElementById("score-1").textContent = "0";
      document.getElementById("current-0").textContent = "0";
      document.getElementById("current-1").textContent = "0";
      document.querySelector(".player-0-panel").classList.remove("winner");
      document.querySelector(".player-1-panel").classList.remove("winner");
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.remove("active");
      document.querySelector(".player-0-panel").classList.add("active");
      document.querySelector(".btn-roll").style.visibility = "visible";
      document.querySelector(".btn-hold").style.visibility = "visible";
      document.querySelector(".winning-condition").value = 100;
}