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
    $(".answerRow").empty();
    gameRunning = true;
    timerCount = 0;
    
    
    for (var i = 0; i < triviaQuestions[rounds].options.length; i++){
        var qDiv = $("<button>");
        qDiv.text(triviaQuestions[rounds].options[i]);

        qDiv.addClass("btn btn-outline-primary btn-lg btn-block optionsButtons");
        
        $(".answerRow").append(qDiv);
        correctAnswer = triviaQuestions[rounds].answer;
        $(".questionText").text(triviaQuestions[rounds].question);
    }

    startTimer();
    scorecardUpdate();
    rounds++
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
$(".answerRow").on("click", ".optionsButtons", function(){
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

    if (rounds == triviaQuestions.length){
        endgame();
    }else{
        scorecardUpdate();
        $(".timerCard").html("<h2>" + correctAnswer + "</h2>");
        
        setTimeout(function(){
            setQuestion();
            gameRunning = true}, 5000)
            
    }
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

//endgame
function endgame(){
    scorecardUpdate();

    $(".answerRow").empty();

    var scDiv = $(".scoreCard")
    $(".timerCard").html(scDiv);
    stopTimer();
    
}

});