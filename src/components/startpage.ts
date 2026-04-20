export default function clearstartPage(): void {
    const body = document.querySelector ("body")
body.innerHTML = ""
} 


const startButton = document.querySelector("#startButton")
startButton?.addEventListener("click", () => {
    clearstartPage()
})
