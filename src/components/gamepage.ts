import "../styles/gamepage.scss";

import fetchQuestions from "./fetchQuestions";

// renderar ut alla element

export default async function renderGamePage(): Promise<void> {
  const body = document.querySelector("body");

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  body?.appendChild(mainContainer);

  //renderar ut frågorna

  const questions = await fetchQuestions();

  questions.forEach((question) => {
    const renderdQuestion = document.createElement("h3");
    renderdQuestion.textContent = question.title;
    mainContainer.appendChild(renderdQuestion);
  });
}


