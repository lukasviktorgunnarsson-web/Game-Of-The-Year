import "../styles/gameOverPage.scss";

export function renderGameOverPage(name: string, time: string): void {
    

    const container = document.createElement("div");
    container.classList.add("gameOverContainer");

    const heading = document.createElement("h2");
    heading.textContent = "Game Over!";
    container.appendChild(heading);

    const yourResult = document.createElement("p");
    yourResult.classList.add("yourResult");
    yourResult.innerHTML = `Your time: <span>${time}s</span>`;
    container.appendChild(yourResult);

    const scoreboard = document.createElement("div");
    scoreboard.classList.add("scoreboard");

    const scoreHeading = document.createElement("h3");
    scoreHeading.textContent = "Highscore";
    scoreboard.appendChild(scoreHeading);

    const list = document.createElement("ol");
    scoreboard.appendChild(list);
    container.appendChild(scoreboard);

    document.getElementById("display")?.remove();
    document.body.appendChild(container);

    fetchAndRenderScores(list, name, time);
}

async function fetchAndRenderScores(list: HTMLOListElement, currentName: string, currentTime: string): Promise<void> {
    try {
        const res = await fetch("http://localhost:3000/scoreboard");
        const entries: { name?: string; time?: string; id: string }[] = await res.json();

        const valid = entries.filter(e => e.name && e.time);

        const currentAlreadySaved = valid.some(
            e => e.name === currentName && e.time === currentTime
        );
        if (!currentAlreadySaved) {
            valid.push({ name: currentName, time: currentTime, id: "__current__" });
        }

        valid.sort((a, b) => parseFloat(a.time!) - parseFloat(b.time!));

        valid.forEach((entry, index) => {
            const li = document.createElement("li");
            if (entry.name === currentName && entry.time === currentTime) {
                li.classList.add("currentPlayer");
            }

            const rank = document.createElement("span");
            rank.classList.add("rank");
            rank.textContent = `#${index + 1}`;

            const entryName = document.createElement("span");
            entryName.classList.add("entryName");
            entryName.textContent = entry.name!;

            const entryTime = document.createElement("span");
            entryTime.classList.add("entryTime");
            entryTime.textContent = `${entry.time}s`;

            li.append(rank, entryName, entryTime);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Could not load scoreboard", error);
    }
}
