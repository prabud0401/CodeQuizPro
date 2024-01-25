const userInitials = localStorage.getItem("initial");
const userScores = localStorage.getItem("score");

const clearBtn = document.getElementById("clear");
var highScoreListElement = document.getElementById("highscores");

var li = document.createElement("li");
li.innerText = userInitials + " - " + userScores;

highScoreListElement.appendChild(li);

clearBtn.addEventListener("click", function(){
    li.remove();
});