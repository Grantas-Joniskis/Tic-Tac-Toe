import { GameManager } from '../game/game-manager.js';
import { SquaresState } from '../game/squares-state.js';
import { State } from '../game/state.js';
import { GameResult } from '../game/game-result.js';

function defenseMove(): number {
  return possibleWinMove(State.PLAYER);
}

function winMove(): number {
  return possibleWinMove(State.BOT);
}

function optimalMove(): number {
  // If the bot has the center square, choose a corner if available
  if (checkForBotState(5)) {
    if (SquaresState.getSquareState(1) === undefined) {
      return 1;
    } else if (SquaresState.getSquareState(3) === undefined) {
      return 3;
    } else if (SquaresState.getSquareState(7) === undefined) {
      return 7;
    } else if (SquaresState.getSquareState(9) === undefined) {
      return 9;
    }
  }

  // If the bot has a corner square, choose the center if available
  if (
    checkForBotState(1) || 
    checkForBotState(3) || 
    checkForBotState(7) || 
    checkForBotState(9)
    ) {
    if (SquaresState.getSquareState(5) === undefined) {
      return 5;
    }
  }

  // If the bot has an edge square, choose the opposite edge if available
  const squares = [2, 4, 6, 8];
  for (const square of squares) {
    if (checkForBotState(square)) {
      const oppositeEdge = 10 - square;
      if (SquaresState.getSquareState(oppositeEdge) === undefined) {
        return oppositeEdge;
      }
    }
  }
  
  // If none of the optimal moves are available, choose a random empty square
  let square: number;
  do {
    square = GameManager.generateSquareMove(1, 9);
  } while(SquaresState.getSquareState(square) !== undefined)
  
  return square;
}

function possibleWinMove(state: State): number {
  for (let combination of GameResult.winningCombinations) {
    const [first, second, third] = combination;
    const firstSquareState = SquaresState.getSquareState(first);
    const secondSquareState = SquaresState.getSquareState(second);
    const thirdSquareState = SquaresState.getSquareState(third);

    if (
      firstSquareState === state && 
      secondSquareState === state && 
      thirdSquareState === undefined) {
      return third;
    } else if (
      firstSquareState === state && 
      thirdSquareState === state && 
      secondSquareState === undefined) {
      return second;
    } else if (
      secondSquareState === state &&
      thirdSquareState === state && 
      firstSquareState === undefined) {
      return first;
    }
  }
  return 0;
}

function checkForBotState(squareId: number): boolean {
  return (SquaresState.getSquareState(squareId) === State.BOT); 
}

export const BotMove = {
  defenseMove,
  winMove,
  optimalMove
}