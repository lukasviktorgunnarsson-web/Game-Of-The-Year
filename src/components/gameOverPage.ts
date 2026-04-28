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
        const allPlayers: { name?: string; time?: string; id: string }[] = await res.json();

        //  Filtrerar bort poster som saknar namn eller tid
        const highscore = allPlayers.filter(e => e.name && e.time);

        // Kollar om den aktuella posten redan finns i listan (för att undvika dubbletter)
        const currentAlreadySaved = highscore.some(
            e => e.name === currentName && e.time === currentTime
        );
        if (!currentAlreadySaved) {
            highscore.push({ name: currentName, time: currentTime, id: "__current__" });
        }


        // Sorterar posterna baserat på tid
        highscore.sort((a, b) => parseFloat(a.time!) - parseFloat(b.time!));


        // Renderar de sorterade posterna i listan
        highscore.forEach((player, index) => {
            const li = document.createElement("li");
            if (player.name === currentName && player.time === currentTime) {
                li.classList.add("currentPlayer");
            }

            const rank = document.createElement("span");
            rank.classList.add("rank");
            rank.textContent = `#${index + 1}`;

            const entryName = document.createElement("span");
            entryName.classList.add("entryName");
            entryName.textContent = player.name!;

            const entryTime = document.createElement("span");
            entryTime.classList.add("entryTime");
            entryTime.textContent = `${player.time}s`;

            li.append(rank, entryName, entryTime);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Could not load scoreboard", error);
    }
}
