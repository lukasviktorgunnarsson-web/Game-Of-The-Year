export default function renderInstructions(): void {
    const body = document.querySelector("body") as HTMLBodyElement;

const textContainer = document.createElement("div");
textContainer.classList.add("instructions-container"); 
body.appendChild(textContainer);

const h2 = document.createElement("h2");
h2.textContent = "Instruktioner innan du börjar spela:";
h2.classList.add("instructions-title"); 
textContainer.appendChild(h2);

const ul = document.createElement("ul");
ul.classList.add("instructions-list");

const li1 = document.createElement("li");
li1.textContent = "När du trycker på start så kommer en timer att starta.";
ul.appendChild(li1);

const li2 = document.createElement("li");
li2.textContent = "Under den tiden ska du dra rätt svarsalternativ till rätt svar.";
ul.appendChild(li2);

const li3 = document.createElement("li");
li3.textContent = "För att kunna gå vidare till nästa fråga måste du ha dragit alla rätt svarsalternativ till rätt svar.";
ul.appendChild(li3);

const li4 = document.createElement("li");
li4.textContent = "Ju snabbare du svarar på frågorna, desto bättre placering får du på topplistan.";
ul.appendChild(li4);

textContainer.appendChild(ul);

const nextPageBtn = document.createElement("button");
nextPageBtn.innerText = "Start";
nextPageBtn.classList.add("start-button");
textContainer.appendChild(nextPageBtn);

nextPageBtn.addEventListener("click", (): void => {
  document.body.innerHTML = "";
 });
}

