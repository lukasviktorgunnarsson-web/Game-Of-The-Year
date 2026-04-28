import "../styles/gamepage.scss";

import fetchQuestions from "./fetchQuestions";
let i = 0;

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

  // Left side: drop zones — each tagged with the answerBox id they expect
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

      // If a different option is already here, send it back to the pool
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

  // Right side pool also accepts drops so users can drag options back
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

  // Right side: draggable answer options tagged with the answerBox id they belong to
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
    } else if(i === 10) {
      console.log("LÄGG TILL FUNKTIONEN VI SKA HA TILL ATT RENDERA GAMEOVERPAGE");
    }
    console.log(i);
  });

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
