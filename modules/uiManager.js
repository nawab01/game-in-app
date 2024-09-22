export class UIManager {
    constructor(domElements, gameState) {
        this.dom = domElements;
        this.gameState = gameState;
    }

    init() {
        this.dom.appContainer.style.display = 'none';
        const game = this.gameState.loadExistingGame();
        if (game) {
            this.dom.teamOne.value = game.teamOne;
            this.dom.teamTwo.value = game.teamTwo;
            this.dom.categoryInput.value = game.category;
            this.showPlayer();
            this.updateScoreDisplay(this.dom.scoreOneDisplay, this.gameState.totalScoreOne);
            this.updateScoreDisplay(this.dom.scoreTwoDisplay, this.gameState.totalScoreTwo);
            this.restoreButtonStates(game.buttonStates);
        }
    }

    showPlayer() {
        const category = this.dom.categoryInput.value.trim();
        if (!this.dom.teamOne.value || !this.dom.teamTwo.value || !category) {
            alert("Please enter both team names and select a category.");
            return;
        }
        this.dom.firstPlayer.innerText = this.dom.teamOne.value;
        this.dom.secondPlayer.innerText = this.dom.teamTwo.value;
        this.dom.teamNames.style.display = 'none';
        this.dom.appContainer.style.display = 'block';
        
        if (!this.gameState.currentGameId) {
            this.gameState.currentGameId = Date.now();
            const newGame = {
                id: this.gameState.currentGameId,
                teamOne: this.dom.teamOne.value,
                teamTwo: this.dom.teamTwo.value,
                category: category,
                scoreOne: 0,
                scoreTwo: 0,
                buttonStates: Array(10).fill(0)
            };
            let games = JSON.parse(localStorage.getItem('games')) || [];
            games.push(newGame);
            localStorage.setItem('games', JSON.stringify(games));
        }
    }

    updateScoreDisplay(scoreDisplay, score) {
        scoreDisplay.innerText = score;
        scoreDisplay.style.display = 'inline-flex';
    }

    restoreButtonStates(states) {
        const buttons = [...document.querySelectorAll('.buttonsOne'), ...document.querySelectorAll('.buttonsTwo')];
        buttons.forEach((button, index) => {
            if (states[index] === '1') {
                button.style.backgroundColor = 'rgb(0, 255, 255)';
                button.setAttribute('data-state', '1');
            } else {
                button.style.backgroundColor = 'rgb(240, 240, 240)';
                button.setAttribute('data-state', '0');
            }
        });
    }
}