import { State } from './state.js';
const squaresState = {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined // RIGHT BOTTOM SQUARE
};
function getPlayerSquares() {
    const playerSquares = [];
    for (const squareId in squaresState) {
        if (squaresState[squareId] === State.PLAYER) {
            playerSquares.push(Number(squareId));
        }
    }
    return playerSquares;
}
function getBotSquares() {
    const botSquares = [];
    for (const squareId in squaresState) {
        if (squaresState[squareId] === State.BOT) {
            botSquares.push(Number(squareId));
        }
    }
    return botSquares;
}
function getUndefinedSquares() {
    const undefinedSquares = [];
    for (const squareId in squaresState) {
        if (squaresState[squareId] === undefined) {
            undefinedSquares.push(Number(squareId));
        }
    }
    return undefinedSquares;
}
function setSquareState(square, state) {
    squaresState[square] = state;
}
function getSquareState(square) {
    return squaresState[square];
}
export const SquaresState = {
    getPlayerSquares,
    getBotSquares,
    getUndefinedSquares,
    setSquareState,
    getSquareState
};
