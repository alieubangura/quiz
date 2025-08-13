const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const highScoreScreen = document.getElementById("highscore-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again-btn");
const highScoreEl = document.getElementById("highscore");
const endQuizBtn = document.getElementById("end-quiz-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questions = [
  { question: "What is the capital of France?", answers: ["Paris","Rome","Madrid","Berlin"], correct: 0 },
  { question: "Which continent is Egypt in?", answers: ["Asia","Africa","Europe","Australia"], correct: 1 },
  { question: "What is the largest ocean?", answers: ["Atlantic","Indian","Pacific","Arctic"], correct: 2 },
  { question: "Which country has the largest population?", answers: ["USA","India","China","Brazil"], correct: 2 },
  { question: "What is the capital of Japan?", answers: ["Beijing","Seoul","Tokyo","Kyoto"], correct: 2 },
  { question: "Which river runs through Egypt?", answers: ["Amazon","Nile","Yangtze","Danube"], correct: 1 },
  { question: "What is the smallest country in the world?", answers: ["Monaco","Vatican City","Malta","Liechtenstein"], correct: 1 },
  { question: "Which mountain is the tallest in the world?", answers: ["K2","Everest","Kilimanjaro","Makalu"], correct: 1 },
  { question: "Which desert is the largest?", answers: ["Sahara","Gobi","Kalahari","Arctic"], correct: 0 },
  { question: "What is the capital of Canada?", answers: ["Toronto","Ottawa","Vancouver","Montreal"], correct: 1 },
  { question: "Which country is known as the Land of the Rising Sun?", answers: ["China","Japan","Thailand","South Korea"], correct: 1 },
  { question: "Which US state is the largest by area?", answers: ["Texas","Alaska","California","Montana"], correct: 1 },
  { question: "Which country has the longest coastline?", answers: ["USA","Russia","Australia","Canada"], correct: 3 },
  { question: "What is the capital of Australia?", answers: ["Sydney","Melbourne","Canberra","Perth"], correct: 2 },
  { question: "Which continent is Greenland part of?", answers: ["Europe","North America","Asia","Arctic"], correct: 1 },
  { question: "Which is the longest river in the world?", answers: ["Nile","Amazon","Yangtze","Mississippi"], correct: 1 },
  { question: "What is the capital of Germany?", answers: ["Munich","Berlin","Hamburg","Frankfurt"], correct: 1 },
  { question: "Which sea is the saltiest?", answers: ["Dead Sea","Red Sea","Black Sea","Caspian Sea"], correct: 0 },
  { question: "What is the capital of Italy?", answers: ["Rome","Venice","Milan","Florence"], correct: 0 },
  { question: "Which country is shaped like a boot?", answers: ["Spain","Italy","Portugal","Greece"], correct: 1 },
  { question: "What is the capital of Russia?", answers: ["Moscow","Saint Petersburg","Kazan","Sochi"], correct: 0 },
  { question: "Which African country is famous for pyramids?", answers: ["Nigeria","Egypt","Sudan","Morocco"], correct: 1 },
  { question: "What is the capital of Kenya?", answers: ["Mombasa","Nairobi","Kisumu","Lamu"], correct: 1 },
  { question: "Which country is home to the Amazon rainforest?", answers: ["Peru","Brazil","Colombia","Ecuador"], correct: 1 },
  { question: "What is the currency of Japan?", answers: ["Yuan","Won","Yen","Ringgit"], correct: 2 },
  { question: "Which country is both in Europe and Asia?", answers: ["Greece","Russia","Turkey","Cyprus"], correct: 2 },
  { question: "What is the capital of South Korea?", answers: ["Busan","Seoul","Incheon","Daegu"], correct: 1 },
  { question: "Which city is known as the Big Apple?", answers: ["Los Angeles","Chicago","New York City","Miami"], correct: 2 },
  { question: "What is the capital of Argentina?", answers: ["Santiago","Buenos Aires","Lima","Montevideo"], correct: 1 },
  { question: "Which is the largest country by land area?", answers: ["USA","Canada","China","Russia"], correct: 3 },
  { question: "What is the capital of Nigeria?", answers: ["Lagos","Abuja","Kano","Ibadan"], correct: 1 },
  { question: "Which desert covers much of Mongolia?", answers: ["Sahara","Gobi","Kalahari","Patagonian"], correct: 1 },
  { question: "Which is the largest island in the world?", answers: ["Greenland","New Guinea","Borneo","Madagascar"], correct: 0 },
  { question: "Which country is famous for tulips?", answers: ["Belgium","Netherlands","France","Denmark"], correct: 1 },
  { question: "What is the capital of Spain?", answers: ["Barcelona","Madrid","Seville","Valencia"], correct: 1 },
  { question: "Which sea separates Europe and Africa?", answers: ["Red Sea","Mediterranean Sea","Black Sea","Baltic Sea"], correct: 1 },
  { question: "What is the highest waterfall in the world?", answers: ["Niagara Falls","Angel Falls","Victoria Falls","Yosemite Falls"], correct: 1 },
  { question: "Which country has the Great Barrier Reef?", answers: ["Australia","Philippines","Indonesia","Fiji"], correct: 0 },
  { question: "What is the capital of Thailand?", answers: ["Bangkok","Phuket","Chiang Mai","Pattaya"], correct: 0 },
  { question: "Which country is home to Mount Fuji?", answers: ["China","Japan","South Korea","Taiwan"], correct: 1 },
  { question: "What is the capital of Mexico?", answers: ["Cancun","Monterrey","Mexico City","Guadalajara"], correct: 2 },
  { question: "Which ocean is the warmest?", answers: ["Atlantic","Pacific","Indian","Arctic"], correct: 2 },
  { question: "What is the capital of Greece?", answers: ["Athens","Thessaloniki","Sparta","Rhodes"], correct: 0 },
  { question: "Which country is known for the Eiffel Tower?", answers: ["Italy","France","Belgium","Spain"], correct: 1 },
  { question: "What is the capital of Turkey?", answers: ["Istanbul","Ankara","Izmir","Bursa"], correct: 1 },
  { question: "Which river runs through Paris?", answers: ["Thames","Danube","Seine","Rhine"], correct: 2 },
  { question: "Which country is famous for the Taj Mahal?", answers: ["Pakistan","India","Bangladesh","Nepal"], correct: 1 },
  { question: "What is the capital of Portugal?", answers: ["Lisbon","Porto","Braga","Coimbra"], correct: 0 },
  { question: "Which continent has the most countries?", answers: ["Asia","Africa","Europe","South America"], correct: 1 },
  { question: "What is the capital of Egypt?", answers: ["Alexandria","Giza","Cairo","Luxor"], correct: 2 }
];

function loadHighScore() {
  const highScore = localStorage.getItem("highscore") || 0;
  highScoreEl.textContent = highScore;
}

function saveHighScore(newScore) {
  const currentHigh = localStorage.getItem("highscore") || 0;
  if (newScore > currentHigh) {
    localStorage.setItem("highscore", newScore);
    highScoreEl.textContent = newScore;
  }
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });
  startTimer();
}

function selectAnswer(index) {
  clearInterval(timer);
  const q = questions[currentQuestionIndex];
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    if (i === q.correct) btn.classList.add("correct");
    else if (i === index) btn.classList.add("incorrect");
    btn.disabled = true;
  });
  if (index === q.correct) score++;
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizScreen.classList.remove("active");
  setTimeout(() => {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    setTimeout(() => resultScreen.classList.add("active"), 20);
    finalScoreEl.textContent = score;
    saveHighScore(score);
  }, 400);
}

startBtn.addEventListener("click", () => {
  highScoreScreen.classList.remove("active");
  setTimeout(() => {
    highScoreScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    setTimeout(() => quizScreen.classList.add("active"), 20);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }, 400);
});

playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  setTimeout(() => {
    resultScreen.classList.add("hidden");
    highScoreScreen.classList.remove("hidden");
    setTimeout(() => highScoreScreen.classList.add("active"), 20);
    loadHighScore();
  }, 400);
});

loadHighScore();

endQuizBtn.addEventListener("click", () => {
  clearInterval(timer); // stop timer
  endQuiz();
});
