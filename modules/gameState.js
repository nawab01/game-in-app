export class GameState {
    constructor() {
        this.currentButton = null;
        this.scoreOne = 0;
        this.scoreTwo = 0;
        this.totalScoreOne = 0;
        this.totalScoreTwo = 0;
        this.currentGameId = null;
    }

    loadExistingGame() {
        const gameId = localStorage.getItem('currentGameId');
        if (gameId) {
            const games = JSON.parse(localStorage.getItem('games')) || [];
            const game = games.find(g => g.id === parseInt(gameId));
            if (game) {
                this.currentGameId = game.id;
                this.totalScoreOne = game.scoreOne;
                this.totalScoreTwo = game.scoreTwo;
                localStorage.removeItem('currentGameId');
                return game;
            }
        }
        return null;
    }

    updateGameState() {
        if (this.currentGameId) {
            let games = JSON.parse(localStorage.getItem('games')) || [];
            const gameIndex = games.findIndex(game => game.id === this.currentGameId);
            if (gameIndex !== -1) {
                games[gameIndex].scoreOne = this.totalScoreOne;
                games[gameIndex].scoreTwo = this.totalScoreTwo;
                games[gameIndex].buttonStates = this.getButtonStates();
                localStorage.setItem('games', JSON.stringify(games));
            }
        }
    }

    getButtonStates() {
        const buttons = [...document.querySelectorAll('.buttonsOne'), ...document.querySelectorAll('.buttonsTwo')];
        return buttons.map(button => button.getAttribute('data-state'));
    }
}