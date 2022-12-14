import Node from './Node.js'
/**
 * Basic stucture of each tier
 * @class DoublyLinkedList
 */
class DoublyLinkedList {
	constructor(name){
		if(name === undefined) {
			throw new Error('No argument passed to constructor')
		}
		this.name = `${name}_tier`
		this.head = null
		this.tail = null
		this._length = 0
	}

	// utility methods
	printList(log = false) {
		this._checkNodes()
		const nodes = []
		let current = 0
		let headPointer = this.head
		let currentNode

		while (current < this._length) {
			currentNode = headPointer
			nodes.push(currentNode.data)
			headPointer = headPointer.next
			current++
		}

		// debugger
		if(log) {
			console.log(`${this.name}:`)
			// nodes.push('null')
			console.log(nodes.join(' <==> '))
		}

		return nodes
	}

	_checkValue(value){
		if (value === undefined) {
			throw new Error('Value is undefined')
		}
	}

	_checkIndex(index){
		if (index === undefined || typeof index !== 'number' || isNaN(index)) {
			throw new Error('Index has to be a positive integer number or 0')
		}
		if ((index < 0 || index >= this._length) && index !==0) {
			throw new Error(`Index must be smaller than the list's length`)
		}
	}

	_checkNodes(){
		if (this.tail === null || this.head === null) {
			throw new Error('No nodes on the list')
		}
	}

	/**
	 * Checks for a given node in the list and returns a boolean for either case.
	 * @param { String } nodeName
	 * @returns { Boolean }
	 */
	hasNode(nodeName) {
		this._checkValue(nodeName)
		let exists = false
		let headPointer = this.head

		while (headPointer.data !== nodeName) {
			headPointer = headPointer.next
			if (headPointer === null) {
				return exists 
			}
		}
		exists = true
		return exists
	}

	/**
	 * Looks for a given node by its name and returns that node.
	 * This DS simulates being "0-indexed"
	 * @param { String } nodeName
	 * @return { Node } 
	 */
	search(nodeName) {
		this._checkValue(nodeName)	
		this._checkNodes()
		let headPointer = this.head

		while (headPointer.data !== nodeName) {
			headPointer = headPointer.next
			if (headPointer === null) {
				throw new Error('There is no such node in the list.')	
			}
		}
		return headPointer
	}

	/**
	 * Checks a given index and returns the node placed there.
	 * @param { Number } index
	 * @return { Node }
	 */
	getNodeByIndex(index) {
		// * This method could be optimized to N / 2 like remove or insert.
		this._checkIndex(index)
		this._checkNodes()

		let current = 0
		let headPointer = this.head
		while (current !== index) {
			headPointer = headPointer.next
			current++	
		}
		return headPointer
	}

	/**
	 * Searchs for given node and returns its figurative "index".
	 * @param { String } nodeName
	 * @return { Number }
	 */
	getIndex(nodeName) {
		this._checkValue(nodeName)	
		this._checkNodes()
		let headPointer = this.head
		let current = 0

		while (headPointer.data !== nodeName) {
			headPointer = headPointer.next
			current++
			if (headPointer === null) {
				throw new Error('There is no such node in the list.')	
			}
		}
		return current
	} 

	/**
	 * Adds a node at the beginning of the list.
	 * @param { Node } value 
	 * @returns { DoublyLinkedList } instance 
	 */
	prepend(value) {
		this._checkValue(value)
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
	 * Adds a node at the end of the list.
	 * @param { Node } value 
	 * @returns { DoublyLinkedList } instance
	 */
	append(value){
		this._checkValue(value)
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
		return this
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

		this._checkValue(value)
		this._checkIndex(index)
		
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
		return this
	}

/**
 * Adds a node before a given existing node in the list.
 * @param { Node } value
 * @param { String} nodeName
 * @memberof DoublyLinkedList
 */
insertBefore(value, nodeName) {
	this._checkNodes()
	this._checkValue(value)
	const node = new Node(value)
	let headPointer = this.search(nodeName)

	if (headPointer) {
		let previousPointer = headPointer.previous

		// case: only 1 node
		if (!previousPointer) {
			this.prepend(value)
			return this
		} else {
			node.previous = previousPointer
			node.next = headPointer
			previousPointer.next = node
			headPointer.previous = node
			this._length++
			return this
		}
	}
}
	
	/**
	 * Removes last node from the list and returns it.
	 * @returns { Node }
	 */
	pop() {
		this._checkNodes()
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
		prevPointer.next = null
		this.tail = prevPointer
		this._length--
		return temp
	}

	/**
	 * Removes first node from the list and returns it.
	 * @returns { Node }
	 */
	shift() {
		this._checkNodes()	
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
		prevPointer.previous = null
		this.head = prevPointer
		this._length--
		return temp
	}

	/**
	 * Removes a node at a given place/index and returns it.
	 * @param { Number } index
	 * @return { Node } 
	 */
	removeByIndex(index) {
		this._checkIndex(index)
		this._checkNodes()

		let headPointer = this.head
		let tailPointer = this.tail
		let current
		let prevPointer
		let temp

		if (index === 0) {
			const value = this.shift()
			return value
		}

		if (index === this._length - 1) {
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

	/**
	 * Removes a node and returns it.
	 * @param { String } 
	 * @return { Node } 
	 */
	 remove(nodeName) {
		this._checkValue(nodeName)
		this._checkNodes()

		let headPointer = this.head
		let prevPointer
		let temp
		let removed

		if (this.head.data === nodeName) {
			return this.shift()
		}

		if (this.tail.data === nodeName) {
			return this.pop()
		}

		while (headPointer && headPointer.data !== nodeName) {
			prevPointer = headPointer
			headPointer = headPointer.next
			if (headPointer === null) {
				throw new Error('There is no such node in the list.')	
			}
		}

		removed = headPointer
		temp = headPointer.next
		prevPointer.next = temp
		temp.previous = prevPointer
		this._length--

		return removed
	}
}

export default DoublyLinkedList
