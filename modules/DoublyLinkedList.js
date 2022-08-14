import Node from './Node.js'
class DoublyLinkedList {
	constructor(name){
		this.name = `${name}-tier`
		this.head = null
		this.tail = this.head // * this works only when length === 0
		this._length = 0
	} 

	prepend(value) {
		const node = new Node(value)
		let headPointer = this.head
		let tailPointer = this.tail
		
		if (headPointer === null) {
			this.head = node // tail references node by default
			this._length++
			return  // ? usefull for chaining ?
		}
		// when node > 0, head and tail point to the same node
		node.next = headPointer
		headPointer.previous = node
		this.head = node // * tail points to head, gets updated
		this.tail = tailPointer // the node already in the list is now the tail
		
		this._length++
		return this
	}

	append(value){
		const node = new Node(value)
		let pointer = this.tail

		node.previous = pointer
		pointer.next = node
		this.tail = node

		this._length++
		return
	}

	insert(index, value) {

	}

	remove(index) {

	}

}
export default DoublyLinkedList