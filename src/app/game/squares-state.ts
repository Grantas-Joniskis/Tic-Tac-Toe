import { State } from './state.js';

const squaresState: { [key: number]: State | undefined } = {
  1: undefined, // LEFT TOP SQUARE
  2: undefined,
  3: undefined, // RIGHT TOP SQUARE
  4: undefined,
  5: undefined, // MIDDLE SQUARE
  6: undefined,
  7: undefined, // LEFT BOTTOM SQUARE
  8: undefined,
  9: undefined  // RIGHT BOTTOM SQUARE
}

function getPlayerSquares(): number[] {
  const playerSquares: number[] = [];

  for (const squareId in squaresState) {
    if (squaresState[squareId] === State.PLAYER) {
      playerSquares.push(Number(squareId));
    }
  }
  return playerSquares;
}

function getBotSquares(): number[] {
  const botSquares: number[] = [];

  for (const squareId in squaresState) {
    if (squaresState[squareId] === State.BOT) {
      botSquares.push(Number(squareId));
    }
  }
  return botSquares;
}

function getUndefinedSquares(): number[] {
  const undefinedSquares: number[] = [];

  for (const squareId in squaresState) {
    if (squaresState[squareId] === undefined) {
      undefinedSquares.push(Number(squareId));
    }
  }
  return undefinedSquares;
}


function setSquareState(square: number, state: State): void {
  squaresState[square] = state;
}

function getSquareState(square: number): State {
  return squaresState[square];
}

export const SquaresState = {
  getPlayerSquares,
  getBotSquares,
  getUndefinedSquares,
  setSquareState,
  getSquareState
}