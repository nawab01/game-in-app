// play.js
import { DataManager } from './board-modules/dataManager.js';
import { GameManager } from './board-modules/gameManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentGameId = localStorage.getItem('currentGameId');

    if (currentGameId) {
        // This is an existing game
        const games = DataManager.getGames();
        const currentGame = games.find(game => game.id === currentGameId);
        if (currentGame) {
            updateUIWithGameData(currentGame);
        } else {
            console.error('Game data not found');
            // Handle error (e.g., redirect to game list or show error message)
        }
    } else {
        // This is a new game
        initializeNewGame();
    }
});

function updateUIWithGameData(game) {
    document.getElementById('firstPlayer').textContent = game.teamOne;
    document.getElementById('secondPlayer').textContent = game.teamTwo;
    document.getElementById('scoreOne').textContent = game.scoreOne;
    document.getElementById('scoreTwo').textContent = game.scoreTwo;
    // Update other UI elements as needed
    
    // Show the game container
    document.getElementById('appContainer').style.display = 'block';
    // Hide the team names input container
    document.getElementById('teamNames').style.display = 'none';

    // Add event listeners for score buttons
    document.getElementById('scoreOne').addEventListener('click', () => updateScore(game, 'teamOne'));
    document.getElementById('scoreTwo').addEventListener('click', () => updateScore(game, 'teamTwo'));
}

function initializeNewGame() {
    // Show the team names input container
    document.getElementById('teamNames').style.display = 'block';
    // Hide the game container until teams are submitted
    document.getElementById('appContainer').style.display = 'none';

    const submitButton = document.querySelector('#teamNames .input-container button');
    submitButton.addEventListener('click', () => {
        const teamOne = document.getElementById('firstPlayerInput').value;
        const teamTwo = document.getElementById('secondPlayerInput').value;
        if (teamOne && teamTwo) {
            const newGame = {
                id: Date.now().toString(), // Simple unique ID
                teamOne: teamOne,
                teamTwo: teamTwo,
                scoreOne: 0,
                scoreTwo: 0,
                category: document.getElementById('categoryInput').value
            };
            let games = DataManager.getGames();
            games.push(newGame);
            DataManager.saveGames(games);
            DataManager.setCurrentGame(newGame.id);
            updateUIWithGameData(newGame);
        } else {
            alert('Please enter names for both teams');
        }
    });
}

function updateScore(game, team) {
    if (team === 'teamOne') {
        game.scoreOne++;
    } else {
        game.scoreTwo++;
    }
    
    let games = DataManager.getGames();
    const index = games.findIndex(g => g.id === game.id);
    if (index !== -1) {
        games[index] = game;
        DataManager.saveGames(games);
    }
    
    updateUIWithGameData(game);
}

// Add a function to handle the reset button
document.getElementById('resetDiv').addEventListener('click', () => {
    const currentGameId = localStorage.getItem('currentGameId');
    let games = DataManager.getGames();
    const currentGame = games.find(game => game.id === currentGameId);
    if (currentGame) {
        currentGame.scoreOne = 0;
        currentGame.scoreTwo = 0;
        DataManager.saveGames(games);
        updateUIWithGameData(currentGame);
    }
});