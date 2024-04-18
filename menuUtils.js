class MenuUtils {
    static validateArguments(args) {
        if (!args || args.length < 4 || args.length % 2 === 0) {
            console.error('Invalid arguments! Please provide an odd number of unique moves.');
            console.error('Example usage: node game.js Rock Paper Scissors');
            return false;
        }
        return true;
    }
    static getMovesFromArguments(args) {
        return args.slice(2);
    }
    static showMenu(moves) {
        console.log('\x1b[36mSelect your move:\x1b[0m');
        moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log('0 - \x1b[31mExit\x1b[0m');
        console.log('? - \x1b[34mHelp:\x1b[0m');
    }
}
module.exports = MenuUtils
