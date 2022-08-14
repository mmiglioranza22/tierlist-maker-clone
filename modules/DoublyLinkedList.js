import Node from './Node.js'
class DoublyLinkedList {
	constructor(name){
		this.name = `${name}-tier`
		this.head = null
		this.tail = null
		this._length = 0
	} 

	prepend(value) {
		const node = new Node(value)
		let headPointer = this.head
		let tailPointer = this.tail
		
		if (headPointer === null) {
			this.head = node
			this.tail = node
			this._length++
			return
		}
		// when node === 1, head and tail point to the same node
		node.next = headPointer
		headPointer.previous = node
		this.head = node
		this.tail = tailPointer // the node already in the list is now the tail

		this._length++
		return this
	}

	append(value){
		const node = new Node(value)
		let headPointer = this.head
		let tailPointer = this.tail

		if (tailPointer === null) {
			this.head = node // tail references node by default
			this._length++
			return  // ? usefull for chaining ?
		}
		// node.previous = pointer
		// pointer.next = node
		// this.tail = node

		// this._length++
		return
	}

	insert(index, value) {

	}

	remove(index) {

	}

}

export default DoublyLinkedList