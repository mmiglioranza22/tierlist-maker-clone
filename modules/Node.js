/**
 * Individual entity/node in each tier
 * @class Node
 */
class Node {
	constructor(data) {
		this.data = data
		this.previous = null
		this.next = null
	}
}

module.exports = Node