import  renderInstructions  from "./instructions.ts";

export default function clearstartPage(): void {
    const startInput = document.querySelector<HTMLInputElement>("#startInput");
    if (startInput && startInput.value.trim() !== "") {
        document.body.innerHTML = "";

    } else {
        alert("Du måste skriva in ett namn.");
    }
}
const startButton = document.querySelector("#startButton")
startButton?.addEventListener("click", () => {
    clearstartPage()
    renderInstructions()
})


