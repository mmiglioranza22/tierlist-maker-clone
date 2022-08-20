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
      
    })
    it('it should prepend nodes to the head of the list', function () {
      
    })

    it('it should append nodes to the tail of the list', function () {
      
    })

    it('it should insert nodes in any slot/index of the list', function () {
      
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