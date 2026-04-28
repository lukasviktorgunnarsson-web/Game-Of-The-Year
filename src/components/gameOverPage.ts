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

    const startOverDiv = document.createElement("div");
    startOverDiv.classList.add("startOverDiv");
    container.appendChild(startOverDiv);
    const startOverButton = document.createElement("button");
    startOverButton.textContent = "Start Over";
    startOverButton.classList.add("startOverButton");
    startOverDiv.appendChild(startOverButton);


    startOverButton.addEventListener("click", () => {
        location.reload();
    });

    fetchAndRenderScores(list, name, time);
}

async function fetchAndRenderScores(list: HTMLOListElement, currentName: string, currentTime: string): Promise<void> {
    try {
        const res = await fetch("http://localhost:3000/players");
        const allPlayers: { name?: string; time?: string; id: string }[] = await res.json();

        //  Filtrerar bort poster som saknar namn eller tid
        let highscore = allPlayers.filter(e => e.name && e.time);

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

            const editButton = document.createElement("button");
            editButton.textContent = "Edit name";
            editButton.classList.add("editButton");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("deleteButton");


            li.append(rank, entryName, entryTime, editButton, deleteButton);
            list.appendChild(li);



            // Edit button event listener
            editButton.addEventListener("click", async () => {
                const newName = prompt("Skriv in nytt namn:", player.name);

                // Om användaren avbryter eller inte skriver något nytt
                if (!newName || newName === player.name) return;

                try {
                    // uppdatera namnet i players
                    const updatePlayer = fetch(`http://localhost:3000/players/${player.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: newName })
                    }).then(res => {
                        if (!res.ok) throw new Error(`Player update failed: ${res.status}`);
                        return res.json();
                    });

                    const playerResult = await updatePlayer;

                    console.log("Player updated:", playerResult);

                    // 3. Uppdatera texten i listan som användaren ser
                    entryName.textContent = newName;
                    // 4. Update the player object so delete button uses the new name
                    player.name = newName;
                    alert("Name updated!");

                } catch (err) {
                    console.error("Error updating name:", err);
                    alert("Error updating name: " + err);
                }
            });


            deleteButton.addEventListener("click", async () => {
                // 1. Bekräfta att användaren faktiskt vill ta bort
                if (!confirm(`Vill du verkligen ta bort ${player.name}?`)) return;

                try {
                    // 2. Skicka DELETE-anropet till players
                    const response = await fetch(`http://localhost:3000/players/${player.id}`, {
                        method: "DELETE"
                    });

                    if (response.ok) {
                        // 3. Ta bort raden från HTML-listan direkt så den försvinner för användaren
                        li.remove();
                        console.log("Spelaren borttagen från players-listan.");
                    } else {
                        console.error("Kunde inte ta bort från players (kanske fel ID?).");
                    }
                } catch (err) {
                    console.error("Ett fel uppstod:", err);
                }
            });
        });
    } catch (err) {
        console.error("Gick inte att ta bort:", err);
    }
}