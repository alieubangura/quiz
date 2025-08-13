const startBtn = document.getElementById("start-btn");
const endQuizBtn = document.getElementById("end-quiz-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const timerDisplay = document.getElementById("timer");
const questionDisplay = document.getElementById("question");
const answersDisplay = document.getElementById("answers");
const highscoreDisplay = document.getElementById("highscore");
const resultScreen = document.getElementById("result-screen");
const quizScreen = document.getElementById("quiz-screen");
const highscoreScreen = document.getElementById("highscore-screen");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let questions = [];
let highscore = localStorage.getItem("highscore") || 0;

highscoreDisplay.textContent = highscore;

async function fetchQuestions() {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=50&generator=categorymembers&gcmtitle=Category:Geography&prop=extracts&exintro=true&explaintext=true";
  const response = await fetch(url);
  const data = await response.json();

  const pages = data.query.pages;
  questions = Object.values(pages).map(page => ({
    question: `What is ${page.title}?`,
    answer: page.extract.split(".")[0] + "."
  }));
}

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  quizScreen.classList.remove("hidden");
  highscoreScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  startTimer();
  showQuestion();
}

function startTimer() {
  let timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionDisplay.textContent = currentQuestion.question;

  const correctAnswer = currentQuestion.answer;
  const wrongAnswers = questions
    .filter((_, index) => index !== currentQuestionIndex)
    .map(q => q.answer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

  answersDisplay.innerHTML = "";
  allAnswers.forEach(answer => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.classList.add("answer-btn");
    answerBtn.onclick = () => handleAnswer(answer, correctAnswer);
    answersDisplay.appendChild(answerBtn);
  });
}

function handleAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  const finalScore = Math.min(score, 50);
  document.getElementById("final-score").textContent = finalScore;

  if (finalScore > highscore) {
    highscore = finalScore;
    localStorage.setItem("highscore", highscore);
    highscoreDisplay.textContent = highscore;
  }
}

function playAgain() {
  fetchQuestions().then(startQuiz);
}

startBtn.addEventListener("click", () => {
  fetchQuestions().then(startQuiz);
});

endQuizBtn.addEventListener("click", endQuiz);
playAgainBtn.addEventListener("click", playAgain);

