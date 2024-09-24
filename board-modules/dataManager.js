// dataManager.js
export const DataManager = {
    getGames() {
        return JSON.parse(localStorage.getItem('games')) || [];
    },
    getCategories() {
        return JSON.parse(localStorage.getItem('categories')) || ['All', 'FIFA', 'Cards', 'Chess', 'Board Games', '1 v 1\'s', 'Charades', 'Team vs Team'];
    },
    saveGames(games) {
        localStorage.setItem('games', JSON.stringify(games));
    },
    setCurrentGame(gameId) {
        localStorage.setItem('currentGameId', gameId);
    }
};