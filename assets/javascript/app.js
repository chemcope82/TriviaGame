
$( document ).ready(function() {

    $("#start-button").click(game.reset);
    // $("#start-button").on("click", game.startGame);
    $(".answer").click(game.compareAnswer);
        // console.log(event.target.textContent); //This took me forever to figure out how to do!
    });

var game = {

    //set global variables
    numberCorrect: 0,
    numberWrong: 0,
    time: undefined,
    timerRunning: false,
    intervalId: undefined,
    userGuess: "",
    correctAnswer: "",
    questionsReset: [],
    //create a question bank
    questions: [
        question1 = {
            Q: "Orographic rain is caused by: ",
            CA: "A mountain range",
            A1: "A cold front",
            A2: "A mountain range",
            A3: "A hurricane",
            A4: "Convective instability",

        },
        question2 = {
            Q: "Lines on a weather map called isobars join: ",
            CA: "Points of equal pressure",
            A1: "Points of equal temperature",
            A2: "Points of equal windspeed",
            A3: "Points of equal pressure",
            A4: "Points of equal rainfall",
        },
        question3 = {
            Q: "What kind of weather does a high pressure system bring?",
            CA: "Dry and stable with little or no clouds",
            A1: "Hot and humid",
            A2: "Steady rain",
            A3: "Stormy and windy",
            A4: "Dry and stable with little or no clouds",
        },
        question4 = {
            Q: "What kind of front is associated with bad weather?",
            CA: "A cold front",
            A1: "A cold front",
            A2: "A stationary front",
            A3: "A warm front",
            A4: "A hot front",
        },
        question5 = {
            Q: "The sky appears blue because:",
            CA: "Rayleigh scattering",
            A1: "The air is actually blue as you go higher",
            A2: "Light reflects off the ocean",
            A3: "Rayleigh scattering",
            A4: "All the blue light is absorbed",
        },
        question6 = {
            Q: "The most abundant element in the earth's atmosphere is:",
            CA: "Nitrogen",
            A1: "Oxygen",
            A2: "Carbon",
            A3: "Nitrogen",
            A4: "Hydrogen",
        },
        question7 = {
            Q: "Tornadoes spin in which direction:",
            CA: "It depends on which hemisphere you're in",
            A1: "Clockwise",
            A2: "It depends on which hemisphere you're in",
            A3: "Counterclockwise",
            A4: "They can change directions spontaneously",
        },
        question8 = {
            Q: "The relative humidity depends on what two things?",
            CA: "Temperature and water vapor pressure",
            A1: "Water vapor pressure and elevation",
            A2: "Temperature and elevation",
            A3: "Water vapor pressure and wind speed",
            A4: "Temperature and water vapor pressure",
        },
        question9 = {
            Q: "Geostrophic wind would theoretically result from the balance of what two forces?",
            CA: "Coriolis and pressure gradient",
            A1: "Coriolis and pressure gradient",
            A2: "Coriolis and gravity",
            A3: "Gravity and temperature gradient",
            A4: "Pressure gradient and temperature gradient",
        },
        question10 = {
            Q: "Lightning travels in which direction?",
            CA: "All of them",
            A1: "Cloud to ground",
            A2: "Ground to cloud",
            A3: "Cloud to cloud",
            A4: "All of them",
        },

    ],

    //create a function to set a 1 second interval and call the runTime function 
    timer: function() {
        if (!game.timerRunning) {
            game.timerRunning = true;
            game.intervalId = setInterval(game.runTime, 1000);
        }
    },

    //create a function to clear the interval and stop the timer
    stopTime: function() {
        clearInterval(game.intervalId);
        game.timerRunning = false;
        game.timeOut();
    },

    //create a function to decrement time if any is left and display it in a countdown area.
    runTime: function() {
        if (game.time >0) {
            game.time--;
            if (game.time < 10) {
                $("#timer").text("0:0" + game.time)
            } else {
                $("#timer").text("0:" + game.time)
            }
        } else {
            game.stopTime();
        }
    },

    //create a function to start the game or display a question
    startGame: function() {
        if (game.questions.length === 0) {
            game.result();
        } else {
        $("#correctAnswer").text("");
        $("#victory").text("");
        game.time = 20;
        $("#timer").text("0:" + game.time)
        game.timer();
        game.showQuestion();

        // console.log("game is started");
        // console.log(game.questions[0]);
        }
    },

    //function to insert text content of question display based on current question selected
    showQuestion: function () {
        //selects random question from questions array for use and then removes it from the array
        var currentIndex = Math.floor(Math.random() * game.questions.length);
        game.questionsReset.push(game.questions[currentIndex]);
        var Q = game.questions[currentIndex].Q;
        var A1 = game.questions[currentIndex].A1;
        var A2 = game.questions[currentIndex].A2;
        var A3 = game.questions[currentIndex].A3;
        var A4 = game.questions[currentIndex].A4;
        // var answerArray = [A1, A2, A3, A4]; // just in case I have time to randomize answer appearance also
        game.correctAnswer = game.questions[currentIndex].CA;
        game.questions.splice(currentIndex, 1);

        // console.log("The correct answer is " + game.correctAnswer);
        $("#start-button").hide();
        $("#question").html(Q + "<br><br>");
        $("#a1").text(A1);
        $("#a2").text(A2);
        $("#a3").text(A3);
        $("#a4").text(A4);

    },

    // create a function to compare the selected answer to the correct answer
    compareAnswer: function(event) {
        if (game.timerRunning) {
            clearInterval(game.intervalId);
            game.timerRunning = false;
            var userGuess = event.target.textContent;
            console.log(userGuess);
            if (userGuess === game.correctAnswer) {
                game.numberCorrect++;
                game.correct();
            } else {
                game.numberWrong++;
                game.wrong();
            }
        }
    },

    correct: function() {
        console.log("correct");
        $("#correctAnswer").text("Correct!");
        $("#victory").html("<img src='assets/images/storm.jpg' style='width: 175px'>");
        var resultsScreen = setTimeout(game.startGame, 5000);
    },

    wrong: function() {
        console.log("wrong");
        $("#correctAnswer").text("Sorry, the answer was:   " + game.correctAnswer);
        $("#victory").html("<img src='assets/images/eeyore_rain_cloud.jpg' style='width: 175px'>");
        var resultsScreen = setTimeout(game.startGame, 5000);
    },

    timeOut: function() {
        game.numberWrong++;
        $("#victory").html("<img src='assets/images/sloth.jpg' style='width: 250px'>");
        $("#correctAnswer").text("Sorry, time's up! The answer was:   " + game.correctAnswer);
        var resultsScreen = setTimeout(game.startGame, 5000);
        console.log("Time's Up");
    },

    result: function() {
        console.log("Correct: " + game.numberCorrect + "     Wrong: " + game.numberWrong);
        clearInterval(game.intervalId);
        game.timerRunning = false;
        $("#victory").text("");
        $("#timer").text("");
        $("#correctAnswer").text("Your Score:");
        $("#question").text("");
        $("#a1").text("Correct: " + game.numberCorrect);
        $("#a2").text("Incorrect: " + game.numberWrong);
        $("#a3").text("");
        $("#a4").text("");
        $("#start-button").show();
        $("#start-button").text("Play Again");

    },

    reset: function() {
        if (game.questions.length === 0) {
            game.questions = game.questionsReset;
            game.questionsReset = [];
        }
        game.numberCorrect = 0;
        game.numberWrong = 0;
        game.time = undefined;
        game.timerRunning = false;
        game.intervalId = undefined;
        game.userGuess = "";
        game.correctAnswer = "";
        game.startGame();
        console.log("New Game");
        console.log(game.questions);
    }
};


