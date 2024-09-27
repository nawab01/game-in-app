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
        
        if (!gameState.currentGameId) {
            gameState.currentGameId = Date.now();
            storage.saveGame(); // Save initial game state
        }

        this.updateStatsLink();
    },
    updateStatsLink() {
        const existingStatsLink = document.querySelector('.stats-link');
        if (existingStatsLink) {
            existingStatsLink.remove();
        }
        const statsLink = document.getElementById('statsID');
        statsLink.href = `stats.html?gameId=${gameState.currentGameId}`;
        statsLink.textContent = 'stats';
        statsLink.className = 'stats-link';
    },
    addEventListeners() {
        domElements.buttonSubmit.addEventListener('click', () => this.showPlayer());
        domElements.resetButton.addEventListener('click', () => score.reset());
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