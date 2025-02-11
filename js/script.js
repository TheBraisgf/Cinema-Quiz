let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&type=multiple";

async function fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.response_code === 0) {
      questions = data.results.map((q) => ({
        question: q.question,
        answers: shuffleAnswers([...q.incorrect_answers, q.correct_answer]),
        correct: q.correct_answer,
      }));

      loadQuestion();
    } else {
      alert("No se pudieron cargar las preguntas. Inténtalo de nuevo.");
    }
  } catch (error) {
    alert("Hubo un problema con la conexión a la API.");
  }
}

function shuffleAnswers(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    return endGame();
  }

  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("time-left").textContent = timeLeft;
  timer = setInterval(countdown, 1000);

  const questionData = questions[currentQuestionIndex];
  document.getElementById("question-text").innerHTML = questionData.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";

  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(button, answer, questionData.correct);
    answersContainer.appendChild(button);
  });

  updateProgressBar();
}

function countdown() {
  timeLeft--;
  document.getElementById("time-left").textContent = timeLeft;
  if (timeLeft <= 0) {
    nextQuestion();
  }
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
  clearInterval(timer);

  if (selectedAnswer === correctAnswer) {
    document.getElementById("correct-sound").play();
    score += 10;
    document.getElementById("score-value").textContent = score;
    button.classList.add("correct"); // ✅ Verde
  } else {
    document.getElementById("fail-sound").play();
    button.classList.add("incorrect"); // ❌ Rojo
  }

  setTimeout(nextQuestion, 1000); // Espera 1 segundo antes de la siguiente pregunta
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${
    (currentQuestionIndex / questions.length) * 100
  }%`;
}

function endGame() {
  localStorage.setItem("cinemaQuizScore", score);
  window.location.href = "score.html";
}

fetchQuestions();
