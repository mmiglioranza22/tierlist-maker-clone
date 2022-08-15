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

	/**
	 * Add a node at the beginning of the list
	 * @param { Node } value 
	 * @returns 
	 */
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

	/**
	 * Add a node at the end of the list
	 * @param { Node } value 
	 * @returns 
	 */
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
	
	/**
	 * Add a node at a given place(index) of the list.
	 * The node that previously occupied that index will be moved forward.
	 * @param { Number } index 
	 * @param { Node } value 
	 * @returns 
	 */
	insert(index, value) {
		if(index < 0 || index > this._length) {
			console.error(`Index must be positive integer less or equal to the list's length`)
			return 1
		}

		const node = new Node(value)
		let current
		let len = this._length
		let headPointer = this.head
		let tailPointer = this.tail
		let prevPointer = headPointer
		
		// no prior nodes or index = 0
		if (this.head === null || index === 0) {
			this.prepend(value)
			return this
		}

		// insert at last index
		if (index === this._length - 1) {
			this.append(value)
			return
		}

		// traverse list from head or tail
		if (Math.floor(this._length / 2) < index) { // rounding but how ?
			current = 0
			while (current < index) {
					headPointer = headPointer.next
					prevPointer = headPointer.previous
					current++
			}
			// if it exits the while loop because current === index, then 
			// headPointer references the node that should be replaced/shifted forward
			node.next = headPointer
			node.previous = prevPointer
			prevPointer.next = node
			headPointer.previous = node
			this._length++

		} else {
			current = this._length
			while (current >= index) {
					prevPointer = tailPointer
					tailPointer = tailPointer.previous
					current--
			}
			// if it exits the while loop because current === index, then 
			// headPointer references the node that should be replaced/shifted forward
			node.next = prevPointer
			node.previous = tailPointer
			prevPointer.previous = node
			tailPointer.next = node
			this._length++
		}
	}

	remove(index) {
		if (this.head === null) {
			console.error('No nodes in list')
			return 1
		}


	}

}



// export default DoublyLinkedList