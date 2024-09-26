// main.js
import { game } from './modules/game.js';
import { domElements } from './modules/domElements.js';
import { gameState } from './modules/gameState.js';
import { storage } from './modules/storage.js';
import { gameBoard } from './modules/board.js';
import { score } from './modules/score.js';
import { noteModal } from './modules/noteModal.js';
import { category } from './modules/category.js';

// Initialize the game
document.addEventListener('DOMContentLoaded', () => game.init());

// Expose necessary objects to the global scope for debugging purposes
window.gameDebug = {
    domElements,
    gameState,
    storage,
    gameBoard,
    score,
    noteModal,
    category,
    game
};