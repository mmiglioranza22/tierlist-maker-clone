import Node from './Node.js'
// testing purposes
class Node {
	constructor(data) {
			this.data = data
			this.previous = null
			this.next = null
	}
}
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
		
		// when node === 0, head and tail point to the same node...
		if (headPointer === null) {
			this.head = node
			this.tail = node
			this._length++
			return this
		}
		// node >= 1...
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
			this.head = node
			this.tail = node
			this._length++
			return this
		}

		node.previous = tailPointer
		tailPointer.next = node
		this.tail = node
		this.head = headPointer

		this._length++
		return
	}

	insert(index, value) {

	}

	remove(index) {

	}

}

// export default DoublyLinkedList