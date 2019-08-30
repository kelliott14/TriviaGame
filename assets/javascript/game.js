var answeredCorrect;
var answeredWrong;
var questionsCount;

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
        }

    ]

var answerA;
var answerB;
var answerC;
var answerD;
var selectedAnswer;

var rounds;

//On load or reset
function startGame(){
    answeredCorrect = 0;
    answeredWrong = 0;
    questionsCount = 0;
    rounds = 0;
}

$(document).ready(function() {

//Set the question
function setQuestion(){
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
    }
        
//Picking the correct answer
function answerIsCorrect(){
    answeredCorrect++
    questionsCount++
    
}

//Picking the wrong answer
function answerIsWrong(){
    answeredWrong++
    questionsCount++
}

//Update scorecard
function scorecardUpdate(){
    $("#correctAnswerText").text("Correct Answers: " + answeredCorrect);
    $("#wrongAnswerText").text("Wrong Answers: " + answeredWrong);
    $("#questionsRemainingText").text("Questions remaining: " + (triviaQuestions.length - questionsCount));
}

startGame()
setQuestion()
scorecardUpdate()

//Clicking an answer
$("button").on("click", function(){
    selectedAnswer = $(this).text();
    
    if(selectedAnswer == correctAnswer){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    
    scorecardUpdate();
    rounds++
    setQuestion();
    
})



});