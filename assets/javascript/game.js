//scorecard variables
var answeredCorrect;
var answeredWrong;
var questionsCount;

//question variables
var correctAnswer;

var triviaQuestions = [
    questionOne = {
        "question" : "The trivia question",
        "answer" : "The correct answer",
        "options" : ["option number 1", "option number 2", "The correct answer", "option number 4"]
    },
    
    questionTwo = {
        "question" : "The 2nd trivia question",
        "answer" : "The 2nd correct answer",
        "options" : ["option 2 number 1", "option 2nd number 2", "The 2nd correct answer", "option 2 number 4"]
    },

    questionThree = {
        "question" : "The 3rd trivia question",
        "answer" : "The 3rd correct answer",
        "options" : ["option 2 number 3", "option 2nd number 2", "The 3rd correct answer", "option 2 number 4"]
    },
    questionFour = {
        "question" : "The 4th trivia question",
        "answer" : "The 2nd correct answer",
        "options" : ["option 2 number 1", "option 2nd number 2", "The 2nd correct answer", "option 2 number 4"]
    },

    questionFive = {
        "question" : "The 5th trivia question",
        "answer" : "The 3rd correct answer",
        "options" : ["option 2 number 3", "option 2nd number 2", "The 3rd correct answer", "option 2 number 4"]
    },
    
]

var answerA;
var answerB;
var answerC;
var answerD;
var selectedAnswer;

//game variables
var rounds;
var timerCount = 0;
var gameRunning;
var timerInterval;

$(document).ready(function() {


startGame();

//On load or reset
function startGame(){
    gameRunning = false;
    var startButton = $("<button>Start Game</button>");
    $(startButton).addClass("startButton")
    $(".timerCard").append(startButton);
    $(".answerRow").hide();

    answeredCorrect = 0;
    answeredWrong = 0;
    questionsCount = 0;
    rounds = 0;

    $(".startButton").on("click", function(){
        $(".answerRow").show();
        setQuestion();
    });
}

//Set the question
function setQuestion(){
    $(".timerCard").empty();
    gameRunning = true;
    timerCount = 0;

    $(".questionText").text(triviaQuestions[rounds].question);
    correctAnswer = triviaQuestions[rounds].answer;

    answerA = triviaQuestions[rounds].options[0];
    $("#answerAText").text(answerA)

    answerB = triviaQuestions[rounds].options[1];
    $("#answerBText").text(answerB)

    answerC = triviaQuestions[rounds].options[2];
    $("#answerCText").text(answerC)

    answerD = triviaQuestions[rounds].options[3];
    $("#answerDText").text(answerD)

    startTimer();
    scorecardUpdate();
}

//Update scorecard
function scorecardUpdate(){
    $("#correctAnswerText").text("Correct Answers: " + answeredCorrect);
    $("#wrongAnswerText").text("Wrong Answers: " + answeredWrong);
    $("#questionsRemainingText").text("Questions remaining: " + (triviaQuestions.length - questionsCount));
}

//Timer during questions
function questionTimer(){
    var timerBar = $("<div>")
    $(timerBar).addClass("col-md-1 timerBar");
    $(".timerCard").append(timerBar);
    $(timerBar).animate({left:"100px"}, "slow")
    timerCount++
    
    if(timerCount == 12){
        answeredWrong++
        stopTimer();
        displayAnswer();
    }
}

//Clicking an answer
$(".options").on("click", function(){
    selectedAnswer = $(this).text();
    
    if(selectedAnswer == correctAnswer){
        answeredCorrect++;
        stopTimer();
    }else{
        answeredWrong++;
        stopTimer();
    }

    displayAnswer();
    gameRunning = false;
    
})

//the answer displays
function displayAnswer(){
    questionsCount++;
    scorecardUpdate();
    $(".timerCard").html("<h2>" + correctAnswer + "</h2>");
    rounds++
    setTimeout(function(){
        setQuestion();
        gameRunning = true}, 5000)
}

function startTimer(){
    if(gameRunning){
        timerInterval = setInterval(questionTimer, 2000); 
    }else{
        stopTimer();
    }
    }

function stopTimer(){
    clearInterval(timerInterval);
}

});