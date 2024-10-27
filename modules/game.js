// game.js
import { domElements } from './domElements.js';
import { gameState } from './gameState.js';
import { storage } from './storage.js';
import { gameBoard } from './board.js';
import { score } from './score.js';
import { noteModal } from './noteModal.js';
import { category } from './category.js';

export const game = {
    init() {
        domElements.appContainer.style.display = 'none';
        this.loadExisting();
        category.populate();
        this.addEventListeners();
    },
    loadExisting() {
        const gameId = localStorage.getItem('currentGameId');
        if (gameId) {
            const game = storage.loadGame(gameId);
            if (game) {
                this.restore(game);
                localStorage.removeItem('currentGameId');
            }
        }
    },
    restore(game) {
        domElements.teamOne.value = game.teamOne;
        domElements.teamTwo.value = game.teamTwo;
        domElements.categoryInput.value = game.category;
        gameState.currentGameId = game.id;
        gameState.totalScoreOne = game.scoreOne;
        gameState.totalScoreTwo = game.scoreTwo;
        gameState.overallScoreOne = game.overallScoreOne || 0;
        gameState.overallScoreTwo = game.overallScoreTwo || 0;
        gameState.gameStats = game.stats || [];
        this.showPlayer();
        score.updateDisplay('One');
        score.updateDisplay('Two');
        gameBoard.restoreStates(game.buttonStates, game.notes);
    },
    showPlayer() {
        const category = domElements.categoryInput.value.trim();
        if (!domElements.teamOne.value || !domElements.teamTwo.value || !category) {
            alert("Please enter both team names and select a category.");
            return;
        }
        domElements.firstPlayer.innerText = domElements.teamOne.value;
        domElements.secondPlayer.innerText = domElements.teamTwo.value;
        document.getElementById('teamNames').style.display = 'none';
        domElements.appContainer.style.display = 'block';
        gameBoard.create();
        gameState.totalScoreOne = 0;
        gameState.totalScoreTwo = 0;
        score.updateDisplay('One');
        score.updateDisplay('Two');
        
        if (!gameState.currentGameId) {
            gameState.currentGameId = this.getOrCreateGameId(domElements.teamOne.value, domElements.teamTwo.value);
            storage.saveGame(); // Save initial game state
        }

        this.updateStatsLink();
    },
    getOrCreateGameId(teamOne, teamTwo) {
        const games = storage.getAllGames();
        const existingGame = games.find(game => 
            (game.teamOne === teamOne && game.teamTwo === teamTwo) ||
            (game.teamOne === teamTwo && game.teamTwo === teamOne)
        );
        return existingGame ? existingGame.id : Date.now();
    },
    updateStatsLink() {
        const statsLink = document.getElementById('statsID');
        if (statsLink) {
            statsLink.href = `stats.html?gameId=${gameState.currentGameId}`;
            statsLink.textContent = 'stats';
            statsLink.className = 'stats-link';
        } else {
            console.error('Stats link element not found');
        }
    },
    endGame() {
        score.endGame();
        this.resetGame();
    },
    resetGame() {
        // Keep the same game ID
        gameState.totalScoreOne = 0;
        gameState.totalScoreTwo = 0;
        gameBoard.clear('One');
        gameBoard.clear('Two');
        score.updateDisplay('One');
        score.updateDisplay('Two');
        storage.saveGame();
        this.updateStatsLink();
    },
    addEventListeners() {
        domElements.buttonSubmit.addEventListener('click', () => this.showPlayer());
        domElements.resetButton.addEventListener('click', () => this.endGame());
        domElements.refreshOne.addEventListener('click', () => gameBoard.clear('One'));
        domElements.refreshTwo.addEventListener('click', () => gameBoard.clear('Two'));
        domElements.closeBtn.addEventListener('click', () => noteModal.close());
        domElements.saveNoteBtn.addEventListener('click', () => noteModal.save());
        domElements.categoryButton.addEventListener('click', () => category.toggleDropdown());

        window.addEventListener('click', (event) => {
            if (event.target === domElements.modal) {
                noteModal.close();
            }
            if (!event.target.matches('#categoryInput') && !event.target.matches('#categoryButton') && !event.target.matches('#categoryButton svg')) {
                domElements.categoryList.classList.remove('show');
            }
        });

        // Use 'pagehide' event for better iOS compatibility
        window.addEventListener('pagehide', () => storage.saveGame());

        // Use Page Visibility API for additional state saving
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                storage.saveGame();
            }
        });
    }
};