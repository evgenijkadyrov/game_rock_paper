class Winner {
    static determineWinner(userChoice, computerChoice, moves) {
        const tableSize = moves.length;
        const userIndex = moves.indexOf(userChoice);
        const computerIndex = moves.indexOf(computerChoice);
        if (userIndex === -1 || computerIndex === -1) {
            throw new Error('Invalid choice. Please provide valid move.');
        }
        const halfSize = Math.floor(tableSize / 2);
        if (userIndex === computerIndex) {
            return 'It\'s a draw!';
        } else if ((computerIndex - userIndex + tableSize) % tableSize <= halfSize) {
            return 'Computer win!';
        } else {
            return 'You win!';
        }
    }
}
module.exports=Winner
