export class NoteManager {
    constructor(domElements, gameState) {
        this.dom = domElements;
        this.gameState = gameState;
        this.gamePlay = null; // Will be set later
    }

    setGamePlay(gamePlay) {
        this.gamePlay = gamePlay;
    }

    init() {
        this.dom.closeBtn.addEventListener('click', () => this.closeNoteModal());
        this.dom.saveNoteBtn.addEventListener('click', () => this.saveNote());
    }

    openNoteModal(event) {
        event.stopPropagation();
        event.preventDefault();
        this.gameState.currentButton = event.currentTarget;
        const existingNote = this.gameState.currentButton.querySelector('.note-cloud');
        if (existingNote) {
            this.dom.noteText.value = existingNote.title;
        } else {
            this.dom.noteText.value = '';
        }
        this.dom.modal.style.display = 'block';
    }

    closeNoteModal() {
        this.dom.modal.style.display = 'none';
    }

    saveNote() {
        const note = this.dom.noteText.value.trim();
        if (note) {
            let noteCloud = this.gameState.currentButton.querySelector('.note-cloud');
            if (!noteCloud) {
                noteCloud = document.createElement('div');
                noteCloud.className = 'note-cloud';
                this.gameState.currentButton.appendChild(noteCloud);
            }
            noteCloud.textContent = note.substring(0, 10) + (note.length > 10 ? '...' : '');
            noteCloud.title = note;
            
            this.gameState.currentButton.style.backgroundColor = 'rgb(0, 255, 255)';
            this.gameState.currentButton.setAttribute('data-state', '1');
            this.gameState.currentButton.classList.add('has-note');
        } else {
            const existingNote = this.gameState.currentButton.querySelector('.note-cloud');
            if (existingNote) {
                existingNote.remove();
            }
            this.gameState.currentButton.classList.remove('has-note');
        }
        this.closeNoteModal();
        const team = this.gameState.currentButton.classList.contains('buttonsOne') ? 'One' : 'Two';
        this.gamePlay.updateScore(team);
    }
}