// gameBoard.js
import { domElements } from './domElements.js';
import { gameState } from './gameState.js';
import { score } from './score.js';
import { storage } from './storage.js';
import { noteModal } from './noteModal.js';

export const gameBoard = {
    create() {
        for (let i = 0; i < 5; i++) {
            this.createButton('One');
            this.createButton('Two');
        }
        this.addEventListeners();
    },
    createButton(team) {
        const button = document.createElement('button');
        button.className = `buttons${team}`;
        button.setAttribute('data-state', '0');
        domElements[`buttonDiv${team}`].appendChild(button);
    },
    addEventListeners() {
        const addButtons = (team) => {
            document.querySelectorAll(`.buttons${team}`).forEach(button => {
                button.addEventListener('click', () => this.addCourt(button, team));
                button.addEventListener('dblclick', noteModal.open);
            });
        };
        addButtons('One');
        addButtons('Two');
    },
    addCourt(button, team) {
        if (button.classList.contains('note-cloud') || 
            button.querySelector('.note-cloud') || 
            window.getComputedStyle(button).backgroundColor === 'rgb(0, 255, 255)') {
            return;
        }

        button.style.backgroundColor = 'rgb(0, 255, 255)';
        button.setAttribute('data-state', '1');

        const note = button.querySelector('.note-cloud')?.title || '';
        if (note.trim() !== '') {
            const buttonIndex = Array.from(button.parentNode.children).indexOf(button);
            gameState.gameStats.push({
                timestamp: Date.now(),
                team: team,
                buttonIndex: buttonIndex,
                state: button.getAttribute('data-state'),
                note: note
            });
        }

        score.check(team);
        storage.saveGame();
    },
    clear(team) {
        document.querySelectorAll(`.buttons${team}`).forEach(button => {
            const noteCloud = button.querySelector('.note-cloud');
            if (noteCloud) {
                noteCloud.remove();
            }
            button.style.backgroundColor = 'rgb(240, 240, 240)';
            button.setAttribute('data-state', '0');
        });
        gameState[`score${team}`] = 0;
        score.check(team);
        storage.saveGame();
    },
    getStates() {
        return [...document.querySelectorAll('.buttonsOne'), ...document.querySelectorAll('.buttonsTwo')]
            .map(button => button.getAttribute('data-state'));
    },
    getNotes() {
        return [...document.querySelectorAll('.buttonsOne'), ...document.querySelectorAll('.buttonsTwo')]
            .map(button => button.querySelector('.note-cloud')?.title || '');
    },
    restoreStates(states, notes) {
        const buttons = [...document.querySelectorAll('.buttonsOne'), ...document.querySelectorAll('.buttonsTwo')];
        buttons.forEach((button, index) => {
            button.style.backgroundColor = states[index] === '1' ? 'rgb(0, 255, 255)' : 'rgb(240, 240, 240)';
            button.setAttribute('data-state', states[index]);
            
            if (notes && notes[index]) {
                noteModal.createNoteCloud(button, notes[index]);
            }
        });
    }
};