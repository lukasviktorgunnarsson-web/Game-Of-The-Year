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

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("optionsContainer");
  mainContainer.appendChild(optionsContainer);

  question.answerBoxes.forEach((answer) => {
    const optionBox = document.createElement("div");
    optionBox.classList.add("optionBox");
    optionBox.textContent = answer.title;
    optionsContainer.appendChild(optionBox);
    const dropZone = document.createElement("div");
    dropZone.classList.add("dropZone");
    optionsContainer.appendChild(dropZone);
  });

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answersContainer");
  mainContainer.appendChild(answersContainer);

  question.answerOptions.forEach((answer) => {
    const answerBox = document.createElement("div");
    answerBox.classList.add("answerBox");
    answerBox.textContent = answer.title;
    answerBox.draggable = true;
    answerBox.id = `q${question.id}-card-${answer.index}`; 

    answersContainer.appendChild(answerBox);
    moveQuestions();
  });

  const btn = document.createElement("button");
  btn.textContent = "Nästa fråga";
  mainContainer.appendChild(btn);

  btn.addEventListener("click", () => {

    i++;
    mainContainer.remove();
    renderGamePage();
    moveQuestions();
  });
}




