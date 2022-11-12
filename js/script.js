"use strict";

//Variables Globales
//Asignacion de botones HTML
const question = document.querySelector("#question");
const firstAnswer = document.querySelector("#first");
const secondAnswer = document.querySelector("#second");
const thirdAnswer = document.querySelector("#third");
const fourthAnswer = document.querySelector("#fourth");
const count = document.querySelector("#count");
let actualQuestion = 0;
let score = 0;

//Funciones
const JSON = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (response) {
      return data;
    }
  } catch (error) {
    console.log("Hay error");
    console.log(error.message);
  }
};

async function checkAnswer(userAnswer) {
  let b = await JSON("./js/quiz.json");
  if (userAnswer === b[actualQuestion].correct) {
    console.log("Acierto");
    return true;
  } else {
    console.log("Fallo");
    return false;
  }
}

async function renderQuestion() {
  let a = await JSON("./js/quiz.json");
  //Impresion de preguntas y respuestas
  //Asignacion de textos desde el JSON
  count.innerHTML = `Puntuacion: ${score} `;
  question.innerHTML = "<h2>" + a[actualQuestion].question + "</h2>";
  firstAnswer.innerHTML = a[actualQuestion].answers[0];
  secondAnswer.innerHTML = a[actualQuestion].answers[1];
  thirdAnswer.innerHTML = a[actualQuestion].answers[2];
  fourthAnswer.innerHTML = a[actualQuestion].answers[3];
}

const game = () => {
  renderQuestion();
  firstAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      firstAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      renderQuestion();
    } else {
      actualQuestion++;
      renderQuestion();
    }
    setTimeout(() => {
      firstAnswer.classList.remove("correct");
    }, 300);
  });
  secondAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      secondAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      renderQuestion();
    } else {
      actualQuestion++;
      renderQuestion();
    }
    setTimeout(() => {
      secondAnswer.classList.remove("correct");
    }, 300);
  });

  thirdAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      thirdAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      renderQuestion();
    } else {
      actualQuestion++;
      renderQuestion();
    }
    setTimeout(() => {
      thirdAnswer.classList.remove("correct");
    }, 300);
  });

  fourthAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      fourthAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      renderQuestion();
    } else {
      actualQuestion++;
      renderQuestion();
    }
    setTimeout(() => {
      fourthAnswer.classList.remove("correct");
    }, 300);
  });
};

game();
