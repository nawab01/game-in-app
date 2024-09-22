import { DOMElements } from './modules/domElements.js';
import { GameState } from './modules/gameState.js';
import { UIManager } from './modules/uiManager.js';
import { CategoryManager } from './modules/categoryManager.js';
import { GamePlay } from './modules/gamePlay.js';
import { NoteManager } from './modules/noteManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameState = new GameState();
    const uiManager = new UIManager(DOMElements, gameState);
    const gamePlay = new GamePlay(DOMElements, gameState, uiManager);
    const noteManager = new NoteManager(DOMElements, gameState);
    const categoryManager = new CategoryManager(DOMElements, uiManager);

    // Set up circular references
    gamePlay.setNoteManager(noteManager);
    noteManager.setGamePlay(gamePlay);

    uiManager.init();
    categoryManager.init();
    gamePlay.init();
    noteManager.init();

    DOMElements.buttonSubmit.addEventListener('click', () => uiManager.showPlayer());
    DOMElements.resetButton.addEventListener('click', () => gamePlay.resetValue());
    DOMElements.categoryButton.addEventListener('click', () => categoryManager.toggleCategoryDropdown());

    window.addEventListener('click', (event) => {
        if (event.target === DOMElements.modal) {
            noteManager.closeNoteModal();
        }
        if (!event.target.matches('#categoryInput') && !event.target.matches('#categoryButton') && !event.target.matches('#categoryButton svg')) {
            DOMElements.categoryList.classList.remove('show');
        }
    });

    window.addEventListener('beforeunload', () => gameState.updateGameState());
});