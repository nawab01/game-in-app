// main.js
import { game } from './modules/game.js';
import { domElements } from './modules/domElements.js';
import { gameState } from './modules/gameState.js';
import { storage } from './modules/storage.js';
import { gameBoard } from './modules/board.js';
import { score } from './modules/score.js';
import { noteModal } from './modules/noteModal.js';
import { category } from './modules/category.js';
import { createImageFlipAnimation } from './modules/flip.js';

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize game
    game.init();
    
    // Set up flip animation
    createImageFlipAnimation(
        './modules/imgs/logo.png',
        './modules/imgs/logo2.png',
        'flipContainer',
        2000
    );
});

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