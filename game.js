const readline = require('readline');
const TableHelp = require('./tableHelp');
const CryptoUtils = require('./cryptoUtils');
const MenuUtils = require('./menuUtils');
const Winner = require('./winner');

class Game {
    static playGame(moves) {
        const key = CryptoUtils.generateRandomKey();
        const computerChoice = moves[Math.floor(Math.random() * moves.length)];
        const hmac = CryptoUtils.computeHMAC(key, computerChoice);
        console.log('\x1b[32mWelcome to game\x1b[0m');
        console.log(`HMAC: ${hmac}`);
        MenuUtils.showMenu(moves);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        askQuestion();

        function askQuestion() {
            rl.question('Your choice: ', handleUserInput);
        }

        function handleUserInput(input) {
            let userChoice = input;
            switch (userChoice) {
                case '0':
                    console.log('Game exited.');
                    rl.close();
                    return;
                case '?':
                    const tableHelper = new TableHelp(moves);
                    const table = tableHelper.generateTable();
                    console.log('Table of possible outcomes:');
                    console.log(table.toString());
                    askQuestion();
                    return;
            }
            if (!isNaN(userChoice) && userChoice > 0 && userChoice <= moves.length) {
                const userMove = moves[userChoice - 1];
                const winner = Winner.determineWinner(userMove, computerChoice, moves);
                console.log(`Computer's move: ${computerChoice}`);
                console.log(`Your move: ${userMove}`);
                console.log(`\x1b[32mWinner:\x1b[0m ${winner}`);
                console.log(`Key: ${key}`);
                console.log(`You can verify the HMAC using an online HMAC calculator:`);
                console.log(`https://techiedelight.com/tools/hmac`);
                console.log('\x1b[31mThank you for playing! Good luck.\x1b[0m');
                rl.close();
            } else {
                console.log('Invalid input! Please enter a valid move number or 0 (exit) or ? (help) to continue.');
                askQuestion();
            }
        }
    }

    static startGame() {
        const args = process.argv;
        if (!MenuUtils.validateArguments(args)) {
            return;
        }
        const moves = MenuUtils.getMovesFromArguments(args);
        Game.playGame(moves);
    }
}

Game.startGame();