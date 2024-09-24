// uiManager.js
import { DataManager } from './dataManager.js';
import { GameManager } from './gameManager.js';
import { InteractionHandler } from './interactionHandler.js';

export const UIManager = {
    displayCategories(tabWrapper, onTabClick) {
        const categories = DataManager.getCategories();
        tabWrapper.innerHTML = '';
        categories.forEach((category, index) => {
            const tab = document.createElement('button');
            tab.classList.add('tab');
            if (index === 0) tab.classList.add('active');
            tab.setAttribute('data-category', category.toLowerCase());
            tab.textContent = category;
            tab.addEventListener('click', (event) => onTabClick(event, category));
            tabWrapper.appendChild(tab);
        });
    },
    displayGames(gameList, category, onGameItemCreated) {
        gameList.innerHTML = '';
        const games = DataManager.getGames();
        const filteredGames = category.toLowerCase() === 'all' ? games : games.filter(game => game.category.toLowerCase() === category.toLowerCase());
        filteredGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('gameItem');
            gameItem.textContent = `${game.teamOne} vs ${game.teamTwo} - ${game.scoreOne}:${game.scoreTwo}`;
            onGameItemCreated(gameItem, game.id);
            gameList.appendChild(gameItem);
        });
    }
};