// gameManager.js
import { DataManager } from './dataManager.js';

export const GameManager = {
    loadGame(gameId) {
        DataManager.setCurrentGame(gameId);
        window.location.href = 'index.html';
    },
    deleteGame(gameId, callback) {
        let games = DataManager.getGames();
        games = games.filter(game => game.id !== gameId);
        DataManager.saveGames(games);
        if (callback) callback();
    }
};