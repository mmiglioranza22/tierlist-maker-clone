/**
 * Individual entity/node in each tier
 * @class Node
 */
class Node {
	constructor(data) {
		if(data === undefined) {
			throw new Error('No argument passed to constructor');
		}
		this.data = data
		this.previous = null
		this.next = null
	}
}

module.exports = Node