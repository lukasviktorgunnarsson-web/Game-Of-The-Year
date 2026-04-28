// import type { IPlayer } from "./interface.ts";


export default async function createPlayer() {
  const startInput = document.querySelector<HTMLInputElement>("#startInput");
  const startButton = document.querySelector<HTMLButtonElement>("#startButton");
  

  startButton!.addEventListener("click", () => {
    
    if (!startInput || startInput.value.trim() === "") {
      console.warn("Inputen är tom, skriver inte ut någon spelare.");
      return;
    }

    // Generate one ID to be used for both player and scoreboard entries
    const playerId = crypto.randomUUID();
    
    const newPlayer: any = {
      playerName: startInput.value,
      id: playerId
    };
    localStorage.setItem("activePlayer", JSON.stringify(newPlayer));

//     fetch("http://localhost:3000/players", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newPlayer),
//     })
//       .then((res) => res.json())
//       .then((data) => console.log("Sparad:", data))
//       .catch((err) => console.error("Error:", err));
  });
}
