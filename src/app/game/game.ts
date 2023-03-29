import { Board } from '../board/board.js';
import { State } from './state.js';
import { SquaresState } from './squares-state.js';
import { Bot } from '../bot/bot.js';
import { GameManager } from './game-manager.js';
import { GameResult } from './game-result.js';

let gameState: State;
let squareInterval: number;

function start(): void {
  registerEvents();
  setGameState(GameManager.setStartingGameState());
  console.log("Game Started!");

  Bot.makeMove();
}

function reset(): void {
  setTimeout(() => {
    for(let i = 1; i <= 9; i++) {
      SquaresState.setSquareState(i, undefined);
      const square = GameManager.getSquare(i);
      Board.squareBgColorToNone(square);
      square.textContent = '';
    }
    setGameState(GameManager.setStartingGameState());
    Bot.makeMove();
  }, 2700);
}

function registerEvents(): void {
  const squares: NodeListOf<HTMLDivElement> = document.querySelectorAll('.square');
  squares.forEach((square: HTMLDivElement) => {
    square.addEventListener('click', () => {
      onClick(square);
    });
    square.addEventListener('mouseenter', () => {
      onMouseEnter(square);
    });
    square.addEventListener('mouseleave', () => {
      onMouseLeave(square);
    });
    square.addEventListener('mouseover', () => {
      onMouseHover(square);
    });
  });
}

function onClick(square: HTMLDivElement): void {
  const squareId = Number(square.id);
  if(getGameState() === State.PLAYER) {
    if(SquaresState.getSquareState(squareId) === undefined) {
      SquaresState.setSquareState(squareId, State.PLAYER);
      Board.squareAdd(square);
      Board.squareBgColorToNone(square);
      
      if(!GameResult.checkForResult()) {
        Board.updateInfoBanner(Board.textBotTurn);
        Bot.makeMove();
      }
    }
  }
}

function onMouseEnter(square: HTMLDivElement): void {
  const squareId = Number(square.id);
  if(SquaresState.getSquareState(squareId) === undefined 
    && gameState === State.PLAYER) {
    Board.squareMouseEnter(square);
  }
}

function onMouseLeave(square: HTMLDivElement): void {
  if(squareInterval) clearInterval(squareInterval);
  if(getGameState() !== State.WIN 
    && getGameState() !== State.LOSE 
    && getGameState() !== State.TIE) 
  {
    Board.squareMouseLeave(square);
  }
}

function onMouseHover(square: HTMLDivElement): void {
  squareInterval = setInterval(() => {
    const squareId = Number(square.id);
    if(SquaresState.getSquareState(squareId) === undefined 
      && getGameState() === State.PLAYER) {
        Board.squareMouseHover(square);
      }
  }, 50);
}

function setGameState(state: State): void {
  gameState = state;
}

function getGameState(): State {
  return gameState;
}

export const Game = {
  start,
  reset,
  setGameState,
  getGameState
}
