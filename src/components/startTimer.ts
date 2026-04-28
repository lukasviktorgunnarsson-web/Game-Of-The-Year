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

export function stopTimer(): number | undefined {
    if (timer) {
        clearInterval(timer);
        return timer;
        timer = undefined; // Nollställ referensen
        console.log(timer);
        
    }
}
