

export default async function createPlayer() {
  const startInput = document.querySelector<HTMLInputElement>("#startInput");
  const startButton = document.querySelector<HTMLButtonElement>("#startButton");
  

  startButton!.addEventListener("click", () => {
    
    if (!startInput || startInput.value.trim() === "") {
      console.warn("Inputen är tom, skriver inte ut någon spelare.");
      return;
    }

    const playerId = crypto.randomUUID();
    
    const newPlayer: any = {
      playerName: startInput.value,
      id: playerId
    };
    localStorage.setItem("activePlayer", JSON.stringify(newPlayer));

  });
}
