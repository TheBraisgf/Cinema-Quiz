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

const checkAnswer = async (userAnswer) => {
  let b = await JSON("./js/quiz.json");
  if (userAnswer === b[actualQuestion].correct) {
    console.log("Acierto");
    return true;
  } else {
    console.log("Fallo");
    return false;
  }
};

const renderQuestion = async () => {
  if (actualQuestion === 10) {
    renderFinal();
    return 0;
  }
  let a = await JSON("./js/quiz.json");
  //Impresion de preguntas y respuestas
  //Asignacion de textos desde el JSON
  count.innerHTML = `Puntuacion: ${score} `;
  question.innerHTML =
    "<h2 id='questionText'>" + a[actualQuestion].question + "</h2>";
  firstAnswer.innerHTML = a[actualQuestion].answers[0];
  secondAnswer.innerHTML = a[actualQuestion].answers[1];
  thirdAnswer.innerHTML = a[actualQuestion].answers[2];
  fourthAnswer.innerHTML = a[actualQuestion].answers[3];
};

const renderFinal = () => {
  addReplay();
  count.remove();
  question.innerHTML = `<h2 id='questionText'>Final Score: ${score} /10</h2>`;
  firstAnswer.remove();
  secondAnswer.remove();
  thirdAnswer.remove();
  fourthAnswer.remove();
};

const addReplay = () => {
  const replayButton = document.createElement("a");
  const newContent = document.createTextNode("Replay");
  // replayButton.classList.toggle("question");
  replayButton.classList.toggle("replay");
  replayButton.href = "index.html";
  replayButton.appendChild(newContent);
  document.body.append(replayButton);
};

const game = () => {
  renderQuestion();
  //PRIMERA RESPUESTA
  firstAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      firstAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    } else {
      firstAnswer.classList.toggle("fail");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    }
    setTimeout(() => {
      firstAnswer.classList.remove("correct");
      firstAnswer.classList.remove("fail");
    }, 300);
  });

  //SEGUNDA RESPUESTA
  secondAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      secondAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    } else {
      secondAnswer.classList.toggle("fail");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    }
    setTimeout(() => {
      secondAnswer.classList.remove("correct");
      secondAnswer.classList.remove("fail");
    }, 300);
  });

  //TERCERA RESPUESTA
  thirdAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      thirdAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    } else {
      thirdAnswer.classList.toggle("fail");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    }
    setTimeout(() => {
      thirdAnswer.classList.remove("correct");
      thirdAnswer.classList.remove("fail");
    }, 300);
  });

  //CUARTA RESPUESTA
  fourthAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button);
    if (check === true) {
      fourthAnswer.classList.toggle("correct");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    } else {
      fourthAnswer.classList.toggle("fail");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion();
      }, 300);
    }
    setTimeout(() => {
      fourthAnswer.classList.remove("correct");
      fourthAnswer.classList.remove("fail");
    }, 300);
  });
};

//Comodines

game();

//Deploy: NETLIFY
