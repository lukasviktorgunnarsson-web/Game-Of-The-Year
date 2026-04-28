import type { IQuestion } from "./interface";

export default async function fetchQuestions(): Promise <IQuestion []> {
    const result = await fetch("http://localhost:3000/questions");
    const data = await result.json();
    return data;
}

