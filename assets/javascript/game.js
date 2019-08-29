var answeredCorrect;
var answeredWrong;
var questionsCount;

var correctAnswer;

var triviaQuestions = {
    "question" : ["The trivia question", "the second question"],
    "answer" : ["The correct answer", "the second answer"],
    "options" : [["option number 1", "option number 2", "The correct answer", "option number 4"],["option number 1", "option number 2", "The correct answer", "option number 4"]]
}

var answerA;
var answerB;
var answerC;
var answerD;
var selectedAnswer;

//On load or reset
function startGame(){
    answeredCorrect = 0
    answeredWrong = 0
    questionsCount = 0
}

$(document).ready(function() {

//Set the question
function setQuestion(){
    $(".questionText").text(triviaQuestions.question[questionsCount]);
    correctAnswer = triviaQuestions.answer[questionsCount];

    answerA = triviaQuestions.options[questionsCount][0];
    $("#answerAText").text(answerA)

    answerB = triviaQuestions.options[questionsCount][1];
    $("#answerBText").text(answerB)

    answerC = triviaQuestions.options[questionsCount][2];
    $("#answerCText").text(answerC)

    answerD = triviaQuestions.options[questionsCount][3];
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

startGame()
setQuestion()

$("button").on("click", function(){
    selectedAnswer = $(this).text();
    
    if(selectedAnswer == correctAnswer){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    console.log(answeredCorrect)
})



});