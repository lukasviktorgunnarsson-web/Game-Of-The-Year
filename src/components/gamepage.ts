import "../styles/gamepage.scss";

import fetchQuestions from "./fetchQuestions";
import { stopTimer } from "./startTimer";
import { renderGameOverPage } from "./gameOverPage";

let i = 0;


// Renderar spelplanen, och hanterar logiken för att dra och släppa answerBox i optionBox, 
// samt att gå vidare till nästa fråga när alla är rätt placerade.
export default async function renderGamePage(): Promise<void> {
  const body = document.querySelector("body");
  body?.classList.remove("startPageBody");
  body?.classList.add("gamePageBody");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  body?.appendChild(mainContainer);

  const questions = await fetchQuestions();
  const question = questions[i];

  const renderdQuestion = document.createElement("h3");
  renderdQuestion.textContent = question.title;
  mainContainer.appendChild(renderdQuestion);

  const dataContainer = document.createElement("div");
  dataContainer.classList.add("dataContainer");
  mainContainer.appendChild(dataContainer);

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("optionsContainer");
  dataContainer.appendChild(optionsContainer);

  // Gör så att varje optionBox har en dataset-id som matchar den answerBox den hör ihop med
  question.answerBoxes.forEach((answer) => {
    const optionBox = document.createElement("div");
    optionBox.classList.add("optionBox");
    optionBox.dataset.id = answer.id;

    const label = document.createElement("span");
    label.textContent = answer.title;
    optionBox.appendChild(label);

    optionBox.addEventListener("dragover", (e) => e.preventDefault());

    optionBox.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId) return;
      const draggedEl = document.getElementById(draggedId);
      if (!draggedEl) return;

      // Gör så att det bara kan finnas en answerBox i varje optionBox, och att den gamla flyttas tillbaka till poolen
      const existing = optionBox.querySelector<HTMLElement>(".answerBox");
      if (existing && existing !== draggedEl) {
        answersContainer.appendChild(existing);
      }

      optionBox.appendChild(draggedEl);
      checkAllMatched();
    });

    optionsContainer.appendChild(optionBox);
  });

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answersContainer");
  dataContainer.appendChild(answersContainer);

  // Gör så att man kan dra tillbaka answers till poolen.
  answersContainer.addEventListener("dragover", (e) => e.preventDefault());
  answersContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer?.getData("text/plain");
    if (!draggedId) return;
    const draggedEl = document.getElementById(draggedId);
    if (draggedEl) {
      answersContainer.appendChild(draggedEl);
      checkAllMatched();
    }
  });

  // Ger varje draggable answer ett id som matchar den optionBox den hör ihop med
  question.answerOptions.forEach((answer, index) => {
    const answerBox = document.createElement("div");
    answerBox.classList.add("answerBox");
    answerBox.textContent = answer.title;
    answerBox.draggable = true;
    answerBox.id = `option-${i}-${index}`;
    answerBox.dataset.answerbox = answer.answerbox;

    answerBox.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("text/plain", answerBox.id);
    });

    answersContainer.appendChild(answerBox);
  });

  // Skapar knappen för att gå vidare till nästa fråga, och gömmer den tills alla answerBox är placerade i rätt optionBox
  const btn = document.createElement("button");
  btn.textContent = "Nästa fråga";
  btn.classList.add("nextBtn");
  btn.style.display = "none";
  mainContainer.appendChild(btn);

  btn.addEventListener("click", () => {
    i++;
    mainContainer.remove();

    if (i < 10) {
      renderGamePage();
    } else if (i === 10) {
      const result = stopTimer();
      if (result) renderGameOverPage(result.name, result.time);
    }
    console.log(i);
  });

  // Kontrollerar om alla answerBox är placerade i rätt optionBox, och visar knappen om så är fallet
  function checkAllMatched(): void {
    const dropZones =
      optionsContainer.querySelectorAll<HTMLElement>(".optionBox");
    let correct = 0;

    dropZones.forEach((zone) => {
      const placed = zone.querySelector<HTMLElement>(".answerBox");
      if (placed && placed.dataset.answerbox === zone.dataset.id) {
        correct++;
      }
    });

    btn.style.display = correct === dropZones.length ? "block" : "none";
  }
}
