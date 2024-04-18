const Table = require('cli-table3');

class TableHelp {
	constructor(moves) {
		this.moves = moves;
		this.table = new Table({
			head: ['Comp/User >', ...this.moves],
			style: { 'padding-left': 1, 'padding-right': 1, head: ['blue'] },
		});
	}
	generateTable() {
		const tableSize = this.moves.length;
		for (let i = 0; i < tableSize; i++) {
			const row = [this.moves[i]];
			for (let j = 0; j < tableSize; j++) {
				const result = this.getResult(j, i);
				row.push(result);
			}
			this.table.push(row);
		}
		return this.table;
	}
	getResult(playerIndex, computerIndex) {
		if (playerIndex === computerIndex) {
			return '\x1b[33mDraw\x1b[0m';
		} else if (
			(computerIndex - playerIndex + this.moves.length) % this.moves.length <=
			Math.floor(this.moves.length / 2)
		) {
			return '\x1b[31mLose\x1b[0m';
		} else {
			return '\x1b[32mWin\x1b[0m';
		}
	}
}
module.exports = TableHelp;
