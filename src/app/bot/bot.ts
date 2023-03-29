import { SquaresState } from "../game/squares-state.js";
import { Board } from '../board/board.js';
import { State } from "../game/state.js";
import { GameManager } from "../game/game-manager.js";
import { Game } from "../game/game.js";
import { BotMove } from "./bot-move.js";
import { GameResult } from "../game/game-result.js";

enum BotState {
  FIRST, SECOND, THIRD
}

let botState: BotState;

function makeMove(): void {
  if(Game.getGameState() === State.BOT) {
    setTimeout(() => {
      if(getBotState() === BotState.FIRST) isFirstMove();
      else if(getBotState() === BotState.SECOND) isSecondMove();
      else if(getBotState() === BotState.THIRD) isThirdMove();
      
      if(!GameResult.checkForResult()) {
        Board.updateInfoBanner(Board.textYourTurn);
      }
    }, 1150);
  }
}

function isFirstMove(): void {
  // 0 - MIDDLE, 1 - OTHER
  const chance = GameManager.generateChance();

  let square: number;
  if(chance === 0) square = 5;
  else square = GameManager.generateSquareMove([1, 2, 3, 4, 6, 7, 8, 9]);
  
  moveToSquare(square);
  setBotState(BotState.THIRD);
}

function isSecondMove(): void {
  if(SquaresState.getSquareState(5) === State.PLAYER) {
    const square = GameManager.generateSquareMove([1, 3, 7, 9]);
    moveToSquare(square);
  } else {
    let square: number;
    // 0 - MIDDLE, 1 - OTHER
    const chance = GameManager.generateChance();
    if(chance === 0) square = 5;
    else {
      do {
        square = GameManager.generateSquareMove([1, 2, 3, 4, 6, 7, 8, 9]);
      } while(SquaresState.getSquareState(square) !== undefined)
    }
    moveToSquare(square);
  }
  setBotState(BotState.THIRD);
}

function isThirdMove(): void {

  let move: number;
  
  move = BotMove.winMove();
  if(move !== 0) {
    moveToSquare(move);
    return;
  }

  move = BotMove.defenseMove();
  if(move !== 0) {
    moveToSquare(move);
    return;
  }

  move = BotMove.optimalMove();
  moveToSquare(move);
}

function moveToSquare(squareId: number): boolean {
  if(SquaresState.getSquareState(squareId) !== undefined) return false;
  
  SquaresState.setSquareState(squareId, State.BOT);
  const square = GameManager.getSquare(squareId);
  Board.squareAdd(square);
}

function setBotState(state: BotState) {
  botState = state;
}

function getBotState(): BotState {
  return botState;
}

export const Bot = {
  BotState,
  makeMove,
  setBotState,
  getBotState
}