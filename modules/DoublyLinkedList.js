import Node from './Node.js'
/**
 * Basic stucture of each tier
 * @class DoublyLinkedList
 */
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
	 * @returns { DoublyLinkedList } instance 
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
	 * @returns { DoublyLinkedList } instance
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
	 * @returns { DoublyLinkedList } instance 
	 */
	insert(index, value) {
		// empty list has specific logic if index is 0 (should prepend)
		if (index !== 0 && (index < 0 || index >= this._length)) {
			console.error(`ERROR: Index must be positive integer smaller than the list's length\n`)
			return 1
		}

		const node = new Node(value)
		let headPointer = this.head
		let tailPointer = this.tail
		let current
		let prevPointer
		
		// no prior nodes or index = 0
		if (index === 0) {
			this.prepend(value)
			return this
		}
		
		// traverse list from head or tail
		if (Math.floor(this._length / 2) > index) { 
			current = 0
			while (current < index) {
				prevPointer = headPointer
				headPointer = headPointer.next
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
			while (current > index) {
				prevPointer = tailPointer
				tailPointer = tailPointer.previous
				current--
			}
			// if it exits the while loop because current === index, then 
			// tailPointer references the node that is previous to new node 
			// and prevPointer the node to be replaced/shifted forward
			node.next = prevPointer
			node.previous = tailPointer
			prevPointer.previous = node
			tailPointer.next = node
			this._length++
		}
	}
	
	/**
	 * Removes last node from list
	 * @returns { Node }
	 */
	pop() {
		if (this.tail === null) {
			console.error('ERROR: No nodes on the list')
			return 1
		}
		let tailPointer = this.tail
		let prevPointer = tailPointer.previous
		let temp

		// only 1 node
		if (this.head === this.tail) {
			temp = this.head
			this.head = null
			this.tail = this.head
			this._length--
			return temp
		}

		temp = tailPointer
		// tailPointer.previous = null -> check for this later in DOM implementation use cases
		prevPointer.next = null
		this.tail = prevPointer
		this._length--
		return temp
	}

	/**
	 * Removes first node from list
	 * @returns { Node }
	 */
	shift() {
		if (this.head === null) {
			console.error('ERROR: No nodes on the list')
			return 1
		}
		let headPointer = this.head
		let prevPointer = headPointer.next
		let temp

		// only 1 node
		if (this.head === this.tail) {
			temp = this.head
			this.head = null
			this.tail = this.head
			this._length--
			return temp
		}

		temp = headPointer
		// headPointer.next = null -> check for this later in DOM implementation use cases
		prevPointer.previous = null
		this.head = prevPointer
		this._length--
		return temp
	}

	/**
	 * Remove a node at a given place/index
	 * @param { Number } index
	 * @return { Node } 
	 */
	remove(index) {
		if (index !== 0 && (index < 0 || index >= this._length)) {
			console.error(`ERROR: Index must be positive integer smaller than the list's length\n`)
			return 1
		}

		if (this.head === null ) {
			console.error('ERROR: No nodes in list\n')
			return 1
		}

		let headPointer = this.head
		let tailPointer = this.tail
		let current
		let prevPointer
		let temp

		if (index === 0) {
			console.log('should shift');
			const value = this.shift()
			return value
		}

		if (index === this._length - 1) {
			console.log('should pop');
			const value = this.pop()
			return value
		}

		if (Math.floor(this._length / 2) > index) { 
			current = 0
			while (current < index) {
				prevPointer = headPointer
				headPointer = headPointer.next
				current++
			}

			temp = headPointer.next
			prevPointer.next = temp
			temp.previous = prevPointer
			this._length--
			// headPointer.next = null
			// headPointer.previous = null
			return headPointer
		} else {
			current = this._length 
			while (current > index) {
				prevPointer = tailPointer
				tailPointer = tailPointer.previous
				current--
			}

			temp = prevPointer.next
			tailPointer.next = temp
			temp.previous = tailPointer
			this._length--
			// prevPointer.next = null
			// prevPointer.previous = null
			return prevPointer
		}
	}
}

export default DoublyLinkedList