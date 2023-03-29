import { Board } from "../board/board.js";
import { Bot } from "../bot/bot.js";
import { State } from "./state.js";
// 0 - BOT, 1 - PLAYER
function setStartingGameState() {
    const chance = generateChance();
    if (chance === 0) {
        Board.updateInfoBanner(Board.textBotTurn);
        Bot.setBotState(Bot.BotState.FIRST);
        return State.BOT;
    }
    else {
        Board.updateInfoBanner(Board.textYourTurn);
        Bot.setBotState(Bot.BotState.SECOND);
        return State.PLAYER;
    }
}
function generateChance(num) {
    if (num) {
        return Math.round(Math.random() * num);
    }
    else {
        return Math.round(Math.random());
    }
}
function generateSquareMove(arg1, arg2) {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        return Math.floor(Math.random() * (arg2 - arg1 + 1)) + arg1;
    }
    else if (Array.isArray(arg1)) {
        const randomSquare = Math.floor(Math.random() * arg1.length);
        return arg1[randomSquare];
    }
    throw new Error('Invalid arguments');
}
function getSquare(squaredId) {
    const square = document.querySelector(`[id="${squaredId}"]`);
    return square;
}
export const GameManager = {
    setStartingGameState,
    generateChance,
    generateSquareMove,
    getSquare
};
