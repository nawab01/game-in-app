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
                overallScoreOne: gameState.overallScoreOne,
                overallScoreTwo: gameState.overallScoreTwo,
                buttonStates: gameBoard.getStates(),
                notes: gameBoard.getNotes(),
                stats: gameState.gameStats
            };
            let games = this.getAllGames();
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
        const games = this.getAllGames();
        return games.find(g => g.id === parseInt(gameId));
    },
    getAllGames() {
        return JSON.parse(localStorage.getItem('games')) || [];
    },
    saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    },
    loadCategories() {
        return JSON.parse(localStorage.getItem('categories')) || config.initialCategories;
    }
};