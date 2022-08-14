// import Node from './Node.js'
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
		if(index < 0 || index > this._length) {
			console.error(`Index must be positive integer less or equal to the list's length`)
			return 1
		}
		const node = new Node(value)
		let current = 0
		let len = this._length
		let headPointer = this.head
		let tailPointer = this.tail
		let prevPointer = headPointer
		
		// no prior nodes or index = 0
		if (this.head === null || index === 0) {
			this.prepend(value)
			return this
		}
		// traverse list from start
		while (current < index) {
			if (headPointer.next !== null) {
				headPointer = headPointer.next
				prevPointer = headPointer.previous
				current++
			} else {
				//has reached the end of the list
				this.append(value)
				return this
			}
		}

		// if it exits the while loop because current === index, then 
		// headPointer references the node that should be replaced/shifted forward
		node.next = headPointer
		node.previous = prevPointer
		prevPointer.next = node
		headPointer.previous = node
		this._length++
	}

	remove(index) {

	}

}



// export default DoublyLinkedList