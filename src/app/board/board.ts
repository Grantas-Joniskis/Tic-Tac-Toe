import { GameManager } from '../game/game-manager.js';
import { Game } from '../game/game.js';
import { State } from '../game/state.js';

const textYourTurn = 'Your turn!';
const textBotTurn = 'Computer\'s turn!';
const textWin = 'You win!';
const textLose = 'Computer wins!';
const textTie = 'TIE!';

function squareAdd(square: HTMLDivElement): void {
  if(Game.getGameState() === State.PLAYER) {
    square.textContent = 'X';
    Game.setGameState(State.BOT);
  } else {
    square.textContent = 'O';
    Game.setGameState(State.PLAYER);
  }
}

function updateInfoBanner(text: string): void {
  const infoBanner: HTMLHeadingElement = document.querySelector('.info-banner');
  infoBanner.textContent = text;
  infoBanner.style.color = text === textWin 
                                    ? '#41FF1B'
                                    : text === textLose ? '#F60F0FF6'
                                    : '#2F58CD';
} 

function squareMouseEnter(square: HTMLDivElement): void {
  square.style.backgroundColor = '#FFFFB5';
}

function squareMouseLeave(square: HTMLDivElement): void {
  squareBgColorToNone(square);
}

function squareMouseHover(square: HTMLDivElement): void {
  square.style.backgroundColor = '#FFFFB5';
}

function squareBgColorToNone(square: HTMLDivElement): void {
  square.style.backgroundColor = 'transparent';
}

function squareBgColorToLose(square: HTMLDivElement): void {
  square.style.backgroundColor = '#F54242';
}

function squareBgColorToWin(square: HTMLDivElement): void {
  square.style.backgroundColor = '#48C52F';
}

function boardColorToWin(squaresIds: number[]): void {
  squaresIds.forEach(squareId => {
    const square = GameManager.getSquare(squareId);
    squareBgColorToWin(square);
  });
}

function boardColorToLose(squaresIds: number[]): void {
  squaresIds.forEach(squareId => {
    const square = GameManager.getSquare(squareId);
    squareBgColorToLose(square);
  });
}

export const Board = {
  textYourTurn,
  textBotTurn,
  textWin,
  textLose,
  textTie,
  squareAdd,
  updateInfoBanner,
  squareMouseEnter,
  squareMouseLeave,
  squareMouseHover,
  squareBgColorToNone,
  boardColorToWin,
  boardColorToLose
}