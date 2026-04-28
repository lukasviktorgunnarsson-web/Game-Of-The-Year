let timer: number | undefined; // Typen är number i webbläsaren
let seconds: number = 0;

export default function startTimer(timeDisplay: HTMLElement | null): void {
    // Förhindra att flera timers startas samtidigt
    if (timer) clearInterval(timer);

    timer = window.setInterval(() => {
        seconds += 0.01;
        if (timeDisplay) {
            timeDisplay.innerText = seconds.toFixed(2);
        }
    }, 10);
}

export function stopTimer(): { id: string; name: string; time: string } | null {
    if (timer) {
        clearInterval(timer);
        timer = undefined;

        const savedPlayer = localStorage.getItem("activePlayer");

        if (savedPlayer) {
            const activePlayer = JSON.parse(savedPlayer);

            // Use the SAME ID that was generated for the player
            const gameResult = {
                id: activePlayer.id,
                name: activePlayer.playerName,
                time: seconds.toFixed(2)
            };

            saveToDataJson(gameResult);
            return { id: gameResult.id, name: gameResult.name, time: gameResult.time };
        }
    }
    return null;
}

async function saveToDataJson(result: any) {
    try {
        await fetch('http://localhost:3000/players', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        });
    } catch (error) {
        console.error("Kunde inte spara till data.json", error);
    }
}
