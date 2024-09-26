// storage.js
import { gameState } from './gameState.js';
import { domElements } from './domElements.js';
import { gameBoard } from './board.js';
import { config } from './config.js';

export const storage = {
    saveGame() {
        if (gameState.currentGameId) {
            const game = {
                id: gameState.currentGameId,
                teamOne: domElements.teamOne.value,
                teamTwo: domElements.teamTwo.value,
                category: domElements.categoryInput.value,
                scoreOne: gameState.totalScoreOne,
                scoreTwo: gameState.totalScoreTwo,
                buttonStates: gameBoard.getStates(),
                notes: gameBoard.getNotes(),
                stats: gameState.gameStats
            };
            let games = JSON.parse(localStorage.getItem('games')) || [];
            const index = games.findIndex(g => g.id === game.id);
            if (index !== -1) {
                games[index] = game;
            } else {
                games.push(game);
            }
            localStorage.setItem('games', JSON.stringify(games));
        }
    },
    loadGame(gameId) {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        return games.find(g => g.id === parseInt(gameId));
    },
    saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    },
    loadCategories() {
        return JSON.parse(localStorage.getItem('categories')) || config.initialCategories;
    }
};