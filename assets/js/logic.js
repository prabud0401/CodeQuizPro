const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const timerElement = document.getElementById("time");
const questionsContainer = document.getElementById("questions");
const questionsTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timer;

startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz(){
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");
    showQuestion(currentQuestionIndex);
    startTimer();
}

// Function to display a question
function showQuestion(index){
    const currentQuestion = questions[index];
    questionsTitle.innerText = currentQuestion.question;
    choicesContainer.innerHTML = '';

    currentQuestion.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("choice-btn");
        button.addEventListener("click", function(event){
            checkAnswer(i);
        });
        choicesContainer.appendChild(button);
    });
}

// Function to check the selected answer
function checkAnswer(index){
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.options[index] === currentQuestion.correctAnswer){
        score++;
        correctSound.play();
        showFeedback("Correct!");
    } else {
        time-=10;
        timerElement.textContent = time;
        incorrectSound.play();
        showFeedback("Wrong Answer");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length){
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

// Function to start the timer
function startTimer(){
    timer = setInterval(function(){
        if (time <= 0){
            endQuiz();
        } else{
            timerElement.textContent = time--;
        }
    },1000);
}

// Function to end the quiz
function endQuiz(){
    clearInterval(timer);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    showFeedback("");
    finalScore.innerText = score;
}

// Function to show feedback after each question
function showFeedback(message){
    feedback.classList.remove('hide');
    feedbackElement.innerText = message;
}

// Add event listener to the submit button
submitButton.addEventListener("click", function(){
    const userInitial = document.getElementById("initials").value;
    localStorage.setItem("initial", userInitial);
    localStorage.setItem("score", score);
    location.href = "./highscores.html"
});