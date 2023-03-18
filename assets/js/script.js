var timerEl = document.querySelector('#timer');
var questionsEl = document.querySelector('#questions-container');
var startBtnEl = document.querySelector('#start-quiz')
var timer;
var score = 0;


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


var timeLeft = 75;
var indexOfCurrentQuestion = 0;

function renderNextQuestion() {
    questionsEl.innerHTML = '';
    var currentQuestion = questions[indexOfCurrentQuestion];

    questionsEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.setAttribute('class', 'choice');
        buttonEl.textContent = currentQuestion.choices[i];
        questionsEl.appendChild(buttonEl);
    }
}

function endGame () {
    questionsEl.textContent = 'Your score is: ' + timeLeft;
}

startBtnEl.addEventListener('click', function (event) {
    timerEl.textContent = timeLeft;
    event.preventDefault();
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            // TODO build the rest of game over logic
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
            currentQuestion = currentQuestion +1;
            timeLeft = timeLeft + 20;
            
        } else {
            timeLeft = timeLeft - 5;
        }
        indexOfCurrentQuestion++;
        renderNextQuestion();
    }
});

