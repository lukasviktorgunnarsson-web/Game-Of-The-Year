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

export function stopTimer(): number {
    if (timer) {
        clearInterval(timer);
        timer = undefined;

        // Spara tiden i webbläsarens minne
        localStorage.setItem("savedTime", seconds.toFixed(2));
        console.log("Tid sparad:", seconds.toFixed(2));
    }
     return seconds; // Skickar tillbaka den slutgiltiga tiden
}

const lastSavedTime = localStorage.getItem("savedTime");
if (lastSavedTime) {
    console.log("Din förra tid var: " + lastSavedTime);
}
