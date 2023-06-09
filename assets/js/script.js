var timerEl = document.querySelector('#timer');
var questionsEl = document.querySelector('#questions-container');
var answerEl = document.querySelector('#answer-container');
var endGameEl = document.querySelector('#end-game');
var endGameFormEl = document.querySelector('#end-game-form');
var highScoreEl = document.querySelector('#high-score');
var startBtnEl = document.querySelector('#start-quiz');
var submitScoreBtnEl = document.querySelector('#submit-score');
var highScoreViewEl = document.querySelector('#high-score-view');
var viewHighScoreEl = document.querySelector('#view-high-score');
var recordsEl = document.querySelector('#record-scores');
var backBtnEl = document.querySelector('#back-btn');
var clearBtnEl = document.querySelector('#clear-btn');
var initialsEl = document.querySelector('#user-initials')
var timer;
var score = 0;
var scoreShow = 0;
var highScores = 0;
var quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

// list of all questions, choices, and answers

var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

var startPage = function () {
    showHighScore();
}


var timeLeft = 75;
var indexOfCurrentQuestion = 0;

function renderNextQuestion() {
    questionsEl.innerHTML = '';
    var currentQuestion = questions[indexOfCurrentQuestion];

    if (currentQuestion) {
        console.log(typeof questionsEl.textContent);
        console.log(currentQuestion);

        questionsEl.textContent = currentQuestion.title;

        for (var i = 0; i < currentQuestion.choices.length; i++) {
            var buttonEl = document.createElement('button');
            buttonEl.setAttribute('class', 'choice');
            buttonEl.textContent = currentQuestion.choices[i];
            questionsEl.appendChild(buttonEl);
        }
    }    
};

function showSubmit() {
    if (scoreShow == 1) {
        endGameEl.style.display = 'none';
        display = 0;
    } else {
        endGameEl.style.display = 'block';
        display = 1;
    }
};

function endGame () {
    questionsEl.textContent = 'Your score is: ' + timeLeft;
    showSubmit()
};

// var initials;
// var results;

// var submitHighScore = function(event) {
//     event.preventDefault()
//     initials = document.querySelector('#initials').value;
//     console.log(initials, 'initials')
//     results = [initials, timeLeft];
//     localStorage.setItem('quizResults', JSON.stringify(results));
// };

var submitHighScore = function(event) {
    event.preventDefault();
    var initials = initialsEl.value;
    console.log(initials);
    var results = initials+": "+timeLeft;
    quizResults.push(results)
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    newHighScore();
};


function showHighScore () {
    questionsEl.innerHTML = '';
    endGameEl.innerHTML ='';
    if (highScores == 1) {
        highScoreEl.style.display = 'none';
        display = 0;
    } else {
        highScoreEl.style.display = 'block';
        display = 1;
    }
    newHighScore();
};

// //getting score
// var getHighScore = function () {
//     results = [initials, timeLeft]
//     console.log(localStorage.getItem('quizResults'));
//     renderHighScore();
// };

// // renderingScore
// function renderHighScore () {
//     recordsEl.innerHTML = '';
//     var li = document.createElement('li');
//     li.textContent = results;
//     recordsEl.appendChild(li);
// };

function newHighScore () {
    results = JSON.parse(localStorage.getItem('quizResults'));
    console.log(localStorage.getItem('quizResults'));
    recordsEl.innerHTML = '';
    var li = document.createElement('li');
    for (let i = 0; i < results.length; i++) {
        li.textContent=results[i]
        document.querySelector("#scores").appendChild(li)
    }
    // li.textContent = results [0] + ': ' + results[1];
    // recordsEl.appendChild(li);
};

startBtnEl.addEventListener('click', function (event) {
    timerEl.textContent = timeLeft;
    event.preventDefault();
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame ();
        } else if (indexOfCurrentQuestion > 4) {
            clearInterval(timer);
            indexOfCurrentQuestion = 0;
            endGame();
        }
            
    }, 1000);
    renderNextQuestion();
});

questionsEl.addEventListener('click', function(event) {
    var currentQuestion = questions[indexOfCurrentQuestion];
    event.preventDefault();
    if (event.target.matches('.choice')) {

        if(event.target.textContent === currentQuestion.answer) {
            answerEl.textContent = 'Correct!';
            currentQuestion = currentQuestion +1;
            timeLeft = timeLeft + 5;
    
        } else {
            answerEl.textContent = 'Incorrect!'
            timeLeft = timeLeft - 5;
        }
        indexOfCurrentQuestion++;
        renderNextQuestion();
    }
});

function clearScores () {
    localStorage.removeItem('quizResults');
};

submitScoreBtnEl.addEventListener('submit', submitHighScore);

submitScoreBtnEl.addEventListener('click', startPage);

highScoreEl.addEventListener('click', showHighScore);

highScoreViewEl.addEventListener('click', showHighScore);

backBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    location.reload();
});

clearBtnEl.addEventListener('click', clearScores);