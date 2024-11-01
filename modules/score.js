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
        
        // Set the current round score
        gameState[`score${team}`] = colorCount;
        
        // Calculate total score: base score (completed sets of 5) plus current round
        gameState[`totalScore${team}`] = Math.floor(gameState[`totalScore${team}`] / 5) * 5 + colorCount;
        
        this.updateDisplay(team);
        storage.saveGame();
    },
    updateDisplay(team) {
        domElements[`score${team}Display`].innerText = gameState[`totalScore${team}`];
        domElements[`score${team}Display`].style.display = 'inline-flex';
        if (domElements[`overallScore${team}Display`]) {
            domElements[`overallScore${team}Display`].innerText = gameState[`overallScore${team}`];
        }
    },
    endGame() {
        gameState.overallScoreOne += gameState.totalScoreOne;
        gameState.overallScoreTwo += gameState.totalScoreTwo;
        this.updateDisplay('One');
        this.updateDisplay('Two');
        storage.saveGame();
    }
};