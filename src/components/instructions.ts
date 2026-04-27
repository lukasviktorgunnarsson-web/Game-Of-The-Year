import renderGamePage from "./gamepage.ts";
import startTimer from "./startTimer.ts";




export default function renderInstructions(): void {
    const body = document.querySelector("body") as HTMLBodyElement;


    const textContainer = document.createElement("div");
    body.appendChild(textContainer);

    const h2 = document.createElement("h2");
    h2.textContent = "Instruktioner:";
    textContainer?.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = "instruktioner blablbalba"
    textContainer?.appendChild(p);

    const nextPageBtn = document.createElement("button");
    nextPageBtn.innerText = "Start";
    textContainer.appendChild(nextPageBtn)

    nextPageBtn.addEventListener("click", (): void => {
        document.body.innerHTML = "";
        const newDisplay = document.createElement("div");
        newDisplay.id = "display";
        newDisplay.classList.add("display");
        document.body.appendChild(newDisplay);
        startTimer(newDisplay);
        renderGamePage();
    })
}

