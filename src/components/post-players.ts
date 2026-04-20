import { Iplayers } from "./interface.ts";

export async function createPlayer() {
  const startInput = document.querySelector<HTMLInputElement>("#startInput");
  const nameResult = startInput.value;
  const startButton = document.querySelector("#startButton");

  // Fetchar json.server

  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      players: startInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {})
    .catch((err) => console.error("Error:", err));
 
    // skapar POST:

    const playerName: Iplayers = nameResult;
    if(playerName === null) {
      return "please enter a real name";
    }else {
      
    }
}