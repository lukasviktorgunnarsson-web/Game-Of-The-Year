import  renderInstructions  from "./instructions.ts";
import  {clearstartPage}  from "./instructions.ts";

export default function renderStartPage(): void {
  const startContainer = document.createElement("div");
  startContainer.id = "startContainer";

  const h1 = document.createElement("h1");
  h1.textContent = "Välkommen till The Quiz";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter your name";
  nameInput.id = "startInput";

  const startBtn = document.createElement("button");
  startBtn.textContent = "start";
  startBtn.id = "startButton";

  startContainer.append(h1, nameInput, startBtn);
  document.body.classList.add("startPageBody");
  document.body.appendChild(startContainer);

startBtn?.addEventListener("click", () => {
    clearstartPage()
    renderInstructions()
})
}
