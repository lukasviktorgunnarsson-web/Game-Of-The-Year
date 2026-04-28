import "../styles/gamepage.scss";
import fetchQuestions from "./fetchQuestions";
import moveQuestions from "./moveQuestions";
// renderar ut alla element

let i = 0;

export default async function renderGamePage(): Promise<void> {
  const body = document.querySelector("body");
  body?.classList.remove("startPageBody");
  body?.classList.add("gamePageBody");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  body?.appendChild(mainContainer);

  //renderar ut frågorna

  const questions = await fetchQuestions();
  const question = questions[i];


  //hämtar alla frågor
  const renderdQuestion = document.createElement("h3");
  renderdQuestion.textContent = question.title;
  mainContainer.appendChild(renderdQuestion);

  const dataContainer = document.createElement("div");
  dataContainer.classList.add("dataContainer");
  mainContainer.appendChild(dataContainer);
  dataContainer.classList.add("dataContainer");

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("optionsContainer");
  dataContainer.appendChild(optionsContainer);
  optionsContainer.classList.add("optionsContainer");

  question.answerBoxes.forEach((answer) => {
    const optionBox = document.createElement("div");
    optionBox.classList.add("optionBox");
    optionBox.textContent = answer.title;

    optionsContainer.appendChild(optionBox);
  });

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answersContainer");
  dataContainer.appendChild(answersContainer);
  answersContainer.classList.add("answersContainer");

  question.answerOptions.forEach((answer) => {
    const answerBox = document.createElement("div");
    answerBox.classList.add("answerBox");
    answerBox.textContent = answer.title;

    answersContainer.appendChild(answerBox);
  });

  const btn = document.createElement("button");
  btn.textContent = "Nästa fråga";
  mainContainer.appendChild(btn);
  btn.classList.add("nextBtn");

  btn.addEventListener("click", () => {
    i++;
    mainContainer.remove();
    renderGamePage();
  });
}
