import type { Iquestion } from "./interface";

export default async function fetchQuestions(): Promise <Iquestion []> {
    const result = await fetch("http://localhost:3000/questions");
    const data = await result.json();
    return data;
}
