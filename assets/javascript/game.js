//scorecard variables
var answeredCorrect;
var answeredWrong;
var questionsCount;

//question variables
var correctAnswer;

var triviaQuestions = [
    questionOne = {
        "question" : "Which planet is closest to the sun?",
        "answer" : "Mercury",
        "options" : ["Mercury", "Earth", "Venus", "Saturn"]
    },
    
    questionTwo = {
        "question" : "Which type of elephant is the largest?",
        "answer" : "African Bush Elephant",
        "options" : ["Asian Elephant", "African Forest Elephant", "African Bush Elephant"]
    },

    questionThree = {
        "question" : "In the Iron Man movies, what was the name of Iron Man's first AI system?",
        "answer" : "Jarvis",
        "options" : ["Pepper", "Happy", "Friday", "Jarvis"]
    },
    questionFour = {
        "question" : "The dog breed, Alsatian, is also known as...",
        "answer" : "German Shepherd",
        "options" : ["German Shepherd", "Malamute", "Bulldog", "Pomeranian"]
    },

    questionFive = {
        "question" : "Which country was the first in the world to have a female Prime Minister?",
        "answer" : "Sri Lanka",
        "options" : ["New Zealand", "England", "Sri Lanka", "Norway"]
    },

    questionSix = {
        "question" : "The Indian Pacific rail service travels between which two cities?",
        "answer" : "Sydney and Perth",
        "options" : ["Sydney and Perth", "Sydney and Darwin", "Melbourne and Darwin", "Adelaide and Darwin"]
    },

    questionSeven = {
        "question" : "The Sydney based company, Where 2 Technologies, was acquired in 2004. The technology was then transformed into which application?",
        "answer" : "Google Maps",
        "options" : ["Tom Tom", "Google Earth", "Google Maps", "Apple Maps"]
    },

    questionEight = {
        "question" : "The Gadigal people of the Eora Nation are the traditional custodians of the place we now call Sydney.",
        "answer" : "True",
        "options" : ["True", "False"]
    },

    questionNine = {
        "question" : "Which of the below is NOT a monotreme?",
        "answer" : "Koala",
        "options" : ["Koala", "Platypus", "Echidna"]
    },

    questionTen = {
        "question" : "An angle less than 90 degrees  is known as a what angle?",
        "answer" : "Acute",
        "options" : ["Obtuse", "Right", "Acute"]
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
    $(".scoreCard").hide();

    startGame();

    //On load or reset
    function startGame(){
        gameRunning = false;
        var startButton = $("<button>Start Game</button>");
        $(startButton).addClass("btn btn-outline-danger btn-lg btn-block startButton");
        $(".timerCard").append(startButton);
        $(".answerRow").hide();
        $(".timerBarDiv").hide();

        answeredCorrect = 0;
        answeredWrong = 0;
        questionsCount = 0;
        rounds = 0;

        $(".startButton").on("click", function(){
            $(".answerRow").show();
            setQuestion();
            $(".timerCard").empty();
        });
    }

    //Set the question
    function setQuestion(){
        $(".timerCard").empty();
        $(".answerRow").empty();
        $(".scoreCard").show();
        gameRunning = true;
        timerCount = 0;
        
        for (var i = 0; i < triviaQuestions[rounds].options.length; i++){
            var qDiv = $("<button>");
            qDiv.text(triviaQuestions[rounds].options[i]);

            qDiv.addClass("btn btn-outline-dark btn-lg btn-block optionsButtons");
            
            $(".answerRow").append(qDiv);
            correctAnswer = triviaQuestions[rounds].answer;
            $(".questionText").text(triviaQuestions[rounds].question);
            $(".optionsButtons").prop("disabled", false);
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
        var timerBar = $("<div>");
        $(timerBar).addClass("timerBar");
        $(".timerBarDiv").append(timerBar);
        $(timerBar).animate({left:"30px"}, "slow");
        timerCount++;
        
        if(timerCount == 15){
            answeredWrong++
            stopTimer();
            displayAnswer();
        }
    }

    //Clicking an answer
    $(".answerRow").on("click", ".optionsButtons", function(){
        selectedAnswer = $(this).text();
        
        $(".optionsButtons").prop("disabled",true);
        
        if(selectedAnswer == correctAnswer){
            answeredCorrect++;
            $(this).attr("id", "correctAnswer")
            stopTimer();
        
        }else{
            answeredWrong++;
            $(this).attr("id", "selectedAnswer")

            stopTimer();
        }

        displayAnswer();
        gameRunning = false;
        
    })

    //the answer displays
    function displayAnswer(){
        questionsCount++;
        $(".timerBarDiv").empty();
        $(".timerBarDiv").hide();

        if (rounds == triviaQuestions.length){
            scorecardUpdate();
            $(".timerCard").html("<h2 id='answerText'>The correct answer is: " + correctAnswer + "</h2>");
            
            setTimeout(function(){
                endgame();
                gameRunning = true}, 5000);
            
        }else{
            scorecardUpdate();
            $(".timerCard").html("<h2 id='answerText'>The correct answer is: " + correctAnswer + "</h2>");
            
            setTimeout(function(){
                setQuestion();
                gameRunning = true}, 5000);
                
        }
    }

    function startTimer(){
        if(gameRunning){
            $(".timerBarDiv").show();
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

        $("#questionsRemainingText").text("Refresh to play again!");
        $(".answerRow").empty();
        $(".questionText").empty();

        var scDiv = $(".scoreCard");
        scDiv.attr("id", "endGameScorecard");
        var scH1 = $("<h1 id='FSHeader'>Your final score:</h1>");


        $(".timerCard").html(scDiv);
        $(scDiv).prepend(scH1);

        stopTimer();
    }

});