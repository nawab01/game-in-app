// score.js
import { gameState } from './gameState.js';
import { domElements } from './domElements.js';
import { gameBoard } from './board.js';
import { storage } from './storage.js';

export const score = {
    check(team) {
        const buttons = document.querySelectorAll(`.buttons${team}`);
        const colorCount = Array.from(buttons).filter(button => 
            window.getComputedStyle(button).backgroundColor === 'rgb(0, 255, 255)'
        ).length;
        
        gameState[`score${team}`] = colorCount;
        gameState[`totalScore${team}`] = Math.floor(gameState[`totalScore${team}`] / 5) * 5 + colorCount;
        this.updateDisplay(team);
        storage.saveGame(); // Save state after updating score
    },
    updateDisplay(team) {
        domElements[`score${team}Display`].innerText = gameState[`totalScore${team}`];
        domElements[`score${team}Display`].style.display = 'inline-flex';
    },
    reset() {
        gameBoard.clear('One');
        gameBoard.clear('Two');
        gameState.totalScoreOne = 0;
        gameState.totalScoreTwo = 0;
        this.updateDisplay('One');
        this.updateDisplay('Two');
        storage.saveGame(); // Save state after resetting scores
    }
};