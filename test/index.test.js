const { assert, expect } = require('chai')

const Node = require('../modules/Node')
const DoublyLinkedList = require('../modules/DoublyLinkedList')

let list

describe('Test suite:', function () {
  beforeEach(function() {
    list = new DoublyLinkedList('Test')
  })
  describe('- Node', function () {
    it('it should create a node with data', function () {
      const node = new Node('Some node')
      expect(node).to.exist
      expect(node).to.have.all.keys('next', 'previous', 'data')
      expect(node.next).to.be.null
      expect(node.previous).to.be.null
      expect(node.data).to.not.be.null
    })
  })
  describe('- Doubly linked list', function () {
    it('it should create a linked list from scratch with a tier name', function () {
      expect(list).to.exist
      expect(list).to.have.all.keys('name', 'head', 'tail', '_length')
      expect(list.head).to.be.null
      expect(list.tail).to.be.null
      expect(list.name).to.not.be.null
    })

    it('Prepend: it should prepend nodes to the head of the list', function () {

      list.prepend('A')
      expect(list._length).to.equal(1)
      expect(list.head).to.deep.equal(list.tail)
      expect(list.head.next).to.be.null
      expect(list.tail.previous).to.be.null

      list.prepend('B')
      expect(list.head.next).to.deep.equal(list.tail)
      expect(list.tail.previous).to.deep.equal(list.head)

      list.prepend('C')
      expect(list.head.next).to.deep.equal(list.tail.previous)
      expect(list._length).to.equal(3)
    })

    it('Append: it should append nodes to the tail of the list', function () {

      list.append('A')
      expect(list._length).to.equal(1)
      expect(list.head).to.deep.equal(list.tail)
      expect(list.head.next).to.be.null
      expect(list.tail.previous).to.be.null

      list.append('B')
      expect(list.head.next).to.deep.equal(list.tail)
      expect(list.tail.previous).to.deep.equal(list.head)

      list.append('C')
      expect(list.head.next).to.deep.equal(list.tail.previous)
      expect(list._length).to.equal(3)
    })

    it(`Insert: Index must be positive integer smaller than the list's length`, function() {

      // list.insert(null, 'something')
      // list.insert('0', 2)
      // list.insert('string', 2)
      expect(list._length).to.equal(0)
      expect(list.head).to.be.null
      expect(list.tail).to.be.null
    })

    it('it should not insert nodes if list is empty and index different than 0', function () {

      list.insert(-1, 'will not be inserted')
      list.insert(4, 'same thing')
      expect(list._length).to.equal(0)
      expect(list.head).to.be.null
      expect(list.tail).to.be.null

      list.insert(0,'A')
      expect(list.head).to.deep.equal(list.tail)
      expect(list._length).to.equal(1)

      list.insert(1,'B')
      expect(list.head).to.deep.equal(list.tail)
      expect(list._length).to.equal(1)
    })
    
    it('it should insert nodes in any slot/index of the list', function() {

      list.insert(0,'A')
      expect(list.head).to.deep.equal(list.tail)
      expect(list._length).to.equal(1)

      list.insert(0,'B')
      expect(list.head.data).to.equal('B')
      expect(list.tail.data).to.equal('A')
      expect(list.head.data).to.equal('B')
      expect(list.head.next).to.deep.equal(list.tail)
      expect(list.tail.previous).to.deep.equal(list.head)

      list.insert(1,'C')
      expect(list.head.next.data).to.equal('C')
      expect(list.head.next).to.deep.equal(list.tail.previous)

      list.insert(1,'D')
      expect(list.head.next.data).to.equal('D')
      expect(list.head.next).to.deep.equal(list.tail.previous.previous)
      
      list.insert(3, 'Z') 
      expect(list.tail.data).to.equal('A')
      expect(list.tail.previous.data).to.equal('Z')
      expect(list.tail.previous.next).to.deep.equal(list.tail)

    })
    
    it('it should prepend, append and insert nodes seamlessly ', function () {
      
    })

    it('it should pop nodes from the tail of the list and return them', function () {
      
    })

    it('it should shift nodes from the head of the list and return them', function () {
      
    })

    it('it should remove nodes from any slot/index of the list and return them', function () {
      
    })

    it('it should pop, shift and remove nodes from any slot/index of the list seamlessly', function () {
      
    })

    it('impossible operations should be omitted and log correct error', function () {
      
    })

    it('different combinations of operations should work seamlessly', function () {
      
    })


  })
})