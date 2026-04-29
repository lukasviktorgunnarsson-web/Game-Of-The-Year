export interface Iplayers {
    playerName: string,
}
export interface IPlayer {
playerId?: string;
playerName: string;
}

export interface IScoreboard {
playerId: string;
score: string;
// name: string;
// time: number;
// id: string;
} 

export interface IQuestion {
id: string;
title: string;
answerBoxes: IAnswerbox[];
answerOptions: IAnsweroption[];
}

export interface IAnswerbox {
  id: string;
  title: string;
  imageUrl: string;
}

export interface IAnsweroption {
  title: string; 
  imageUrl: string; 
  answerbox: string;
  i?: string | number;
  index?: number;
}
