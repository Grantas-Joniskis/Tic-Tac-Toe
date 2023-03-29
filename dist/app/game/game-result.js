import { Board } from "../board/board.js";
import { Game } from "./game.js";
import { SquaresState } from "./squares-state.js";
import { State } from "./state.js";
const winningCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];
function checkForResult() {
    const playerSquares = SquaresState.getPlayerSquares();
    const botSquares = SquaresState.getBotSquares();
    // Check for a win
    for (let combination of winningCombinations) {
        if (combination.every(square => playerSquares.includes(square))) {
            Board.boardColorToWin(combination);
            Board.updateInfoBanner(Board.textWin);
            Game.setGameState(State.WIN);
            Game.reset();
            return true;
        }
        if (combination.every(square => botSquares.includes(square))) {
            Board.boardColorToLose(combination);
            Board.updateInfoBanner(Board.textLose);
            Game.setGameState(State.LOSE);
            Game.reset();
            return true;
        }
    }
    // Check for a tie
    if (SquaresState.getUndefinedSquares().length === 0) {
        Board.updateInfoBanner(Board.textTie);
        Game.setGameState(State.TIE);
        Game.reset();
        return true;
    }
    return false;
}
export const GameResult = {
    winningCombinations,
    checkForResult
};
