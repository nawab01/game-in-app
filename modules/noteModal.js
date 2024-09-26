// noteModal.js
import { gameState } from './gameState.js';
import { domElements } from './domElements.js';
import { score } from './score.js';
import { storage } from './storage.js';

export const noteModal = {
    open(event) {
        event.stopPropagation();
        gameState.currentButton = event.currentTarget;
        const existingNote = gameState.currentButton.querySelector('.note-cloud');
        domElements.noteText.value = existingNote ? existingNote.title : '';
        domElements.modal.style.display = 'block';
    },
    close() {
        domElements.modal.style.display = 'none';
    },
    save() {
        const note = domElements.noteText.value.trim();
        if (note) {
            this.createNoteCloud(gameState.currentButton, note);
            gameState.currentButton.style.backgroundColor = 'rgb(0, 255, 255)';
            gameState.currentButton.setAttribute('data-state', '1');

            const buttonIndex = Array.from(gameState.currentButton.parentNode.children).indexOf(gameState.currentButton);
            const teamIndex = gameState.currentButton.classList.contains('buttonsOne') ? 0 : 1;
            gameState.gameStats.push({
                timestamp: Date.now(),
                team: teamIndex === 0 ? 'One' : 'Two',
                buttonIndex: buttonIndex,
                state: gameState.currentButton.getAttribute('data-state'),
                note: note
            });
        } else {
            const existingNote = gameState.currentButton.querySelector('.note-cloud');
            if (existingNote) {
                existingNote.remove();
                gameState.currentButton.style.backgroundColor = 'rgb(240, 240, 240)';
                gameState.currentButton.setAttribute('data-state', '0');
            }
        }

        this.close();
        score.check(gameState.currentButton.classList.contains('buttonsOne') ? 'One' : 'Two');
        storage.saveGame(); // Save state after updating note
    },
    createNoteCloud(button, note) {
        let noteCloud = button.querySelector('.note-cloud');
        if (!noteCloud) {
            noteCloud = document.createElement('div');
            noteCloud.className = 'note-cloud';
            button.appendChild(noteCloud);
            noteCloud.addEventListener('click', (event) => {
                event.stopPropagation();
                this.open({currentTarget: button, stopPropagation: () => {}});
            });
        }
        noteCloud.textContent = note.substring(0, 10) + (note.length > 10 ? '...' : '');
        noteCloud.title = note;
    }
};