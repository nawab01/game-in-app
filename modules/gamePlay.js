export class GamePlay {
    constructor(domElements, gameState, uiManager) {
        this.dom = domElements;
        this.gameState = gameState;
        this.uiManager = uiManager;
        this.noteManager = null; // Will be set later
    }

    setNoteManager(noteManager) {
        this.noteManager = noteManager;
    }

    init() {
        this.createGameBoard();
    }

    createGameBoard() {
        for (let i = 0; i < 5; i++) {
            const buttonOne = document.createElement('button');
            buttonOne.className = 'buttonsOne';
            buttonOne.setAttribute('data-state', '0');
            this.dom.buttonDivOne.appendChild(buttonOne);

            const buttonTwo = document.createElement('button');
            buttonTwo.className = 'buttonsTwo';
            buttonTwo.setAttribute('data-state', '0');
            this.dom.buttonDivTwo.appendChild(buttonTwo);
        }

        const addButtons = document.querySelectorAll('.buttonsOne, .buttonsTwo');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => this.addCourt(e));
            button.addEventListener('dblclick', (e) => this.noteManager.openNoteModal(e));
        });
    }

    addCourt(event) {
        if (event.target.classList.contains('note-cloud')) {
            return;
        }

        const clickedButton = event.currentTarget;
        
        // Prevent toggling if the button has a note
        if (clickedButton.classList.contains('has-note')) {
            return;
        }

        const currentState = parseInt(clickedButton.getAttribute('data-state'));
        const team = clickedButton.classList.contains('buttonsOne') ? 'One' : 'Two';

        if (currentState === 0) {
            clickedButton.style.backgroundColor = 'rgb(0, 255, 255)';
            clickedButton.setAttribute('data-state', '1');
            this.incrementScore(team);
            
            // Check if all 5 buttons are selected
            const selectedButtons = document.querySelectorAll(`.buttons${team}[data-state="1"]`);
            if (selectedButtons.length === 5) {
                this.refreshButtons(team);
            }
        } else {
            clickedButton.style.backgroundColor = 'rgb(240, 240, 240)';
            clickedButton.setAttribute('data-state', '0');
            this.decrementScore(team);
        }
    }

    refreshButtons(team) {
        const buttons = document.querySelectorAll(`.buttons${team}`);
        buttons.forEach(button => {
            button.style.backgroundColor = 'rgb(240, 240, 240)';
            button.setAttribute('data-state', '0');
            // Remove note if exists
            const noteCloud = button.querySelector('.note-cloud');
            if (noteCloud) {
                noteCloud.remove();
            }
            button.classList.remove('has-note');
        });
    }

    incrementScore(team) {
        if (team === 'One') {
            this.gameState.totalScoreOne++;
            this.uiManager.updateScoreDisplay(this.dom.scoreOneDisplay, this.gameState.totalScoreOne);
        } else {
            this.gameState.totalScoreTwo++;
            this.uiManager.updateScoreDisplay(this.dom.scoreTwoDisplay, this.gameState.totalScoreTwo);
        }
        this.gameState.updateGameState();
    }

    decrementScore(team) {
        if (team === 'One') {
            this.gameState.totalScoreOne = Math.max(0, this.gameState.totalScoreOne - 1);
            this.uiManager.updateScoreDisplay(this.dom.scoreOneDisplay, this.gameState.totalScoreOne);
        } else {
            this.gameState.totalScoreTwo = Math.max(0, this.gameState.totalScoreTwo - 1);
            this.uiManager.updateScoreDisplay(this.dom.scoreTwoDisplay, this.gameState.totalScoreTwo);
        }
        this.gameState.updateGameState();
    }

    clearButtons(team) {
        const buttons = document.querySelectorAll(`.buttons${team}`);
        buttons.forEach(button => {
            const noteCloud = button.querySelector('.note-cloud');
            if (noteCloud) {
                noteCloud.remove();
            }
            button.style.backgroundColor = 'rgb(240, 240, 240)';
            button.setAttribute('data-state', '0');
            button.classList.remove('has-note');
        });
        // We don't update the score here, as we want to keep the accumulated score
    }

    resetValue() {
        document.querySelectorAll('.buttonsOne, .buttonsTwo').forEach(button => {
            const noteCloud = button.querySelector('.note-cloud');
            if (noteCloud) {
                noteCloud.remove();
            }
            button.style.backgroundColor = 'rgb(240, 240, 240)';
            button.setAttribute('data-state', '0');
            button.classList.remove('has-note');
        });
        this.gameState.totalScoreOne = 0;
        this.gameState.totalScoreTwo = 0;
        this.uiManager.updateScoreDisplay(this.dom.scoreOneDisplay, 0);
        this.uiManager.updateScoreDisplay(this.dom.scoreTwoDisplay, 0);

        this.gameState.updateGameState();
    }
}