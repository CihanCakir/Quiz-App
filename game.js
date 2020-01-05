const question = document.getElementById("quesition");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quesitions = [
    {
        quesition: "Deneme yanılma yöntemleri ",
        choice1: "cevap1",
        choice2: "cevap2ssdc",
        choice3: "cevap3",
        choice4: "cevap4",
        answer: 1,
        GOOD_ANSWER: 1,
        MEDIUM_ANSWER: 2,
        BAD_ANSWER: 3
    },
    {
        quesition: "Deneme yanılma sssda ",
        choice1: "cevap1",
        choice2: "cevap2",
        choice3: "cevapasdasdas3",
        choice4: "cevap4",
        answer: 1,
        GOOD_ANSWER: 1,
        MEDIUM_ANSWER: 2,
        BAD_ANSWER: 3
    },
    {
        quesition: "Deneme yanılma csssa ",
        choice1: "cevap1",
        choice2: "cevap2",
        choice3: "cevap3vvvzxcv",
        choice4: "cevap4",
        answer: 1,
        GOOD_ANSWER: 1,
        MEDIUM_ANSWER: 2,
        BAD_ANSWER: 3
    }
];


// Constants
const GOOD_ANSWER = 10;
const MEDIUM_ANSWER = 5;
const BAD_ANSWER = 0;
const MAX_QUESTİONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...quesitions];
    console.log(availableQuestions);
    getNewQuestion();
}
getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTİONS) {

        // sorular bitince gidilen ekran
        return window.location.assign("/end.html");
    }





    questionCounter++;


    progressText.innerText = `Soru ${questionCounter} / ${MAX_QUESTİONS}`;

    // Update progressBar 


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.quesition;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {

    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(GOOD_ANSWER);
        }
        else if (classToApply == "medium") {
            incrementScore(MEDIUM_ANSWER);
        }
        else {
            incrementScore(BAD_ANSWER);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();