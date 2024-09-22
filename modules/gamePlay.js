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

        if (currentState === 0) {
            clickedButton.style.backgroundColor = 'rgb(0, 255, 255)';
            clickedButton.setAttribute('data-state', '1');
        } else {
            clickedButton.style.backgroundColor = 'rgb(240, 240, 240)';
            clickedButton.setAttribute('data-state', '0');
        }

        const team = clickedButton.classList.contains('buttonsOne') ? 'One' : 'Two';
        this.updateScore(team);
    }

    updateScore(team) {
        const buttons = document.querySelectorAll(`.buttons${team}`);
        let score = 0;
        buttons.forEach(button => {
            if (button.getAttribute('data-state') === '1') {
                score++;
            }
        });
        
        if (team === 'One') {
            this.gameState.totalScoreOne = score;
            this.uiManager.updateScoreDisplay(this.dom.scoreOneDisplay, score);
        } else {
            this.gameState.totalScoreTwo = score;
            this.uiManager.updateScoreDisplay(this.dom.scoreTwoDisplay, score);
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
        this.updateScore(team);
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