const { assert, expect } = require('chai')

const Node = require('../modules/Node')
const DoublyLinkedList = require('../modules/DoublyLinkedList')

let list



describe('Test suite:', function () {
  beforeEach(function() {
    list = new DoublyLinkedList('Test')
  })
  describe('1) Node', function () {
    it('it should do nothing and throw an error if no value is passed', function () {
      
      let node
      function wrapper(){
        node = new Node()
      }
      expect(wrapper).to.throw()
      expect(node).to.be.undefined
    
    })
   
    it('it should create a node with data', function () {

      const node = new Node('Some node')
      expect(node).to.exist
      expect(node).to.have.all.keys('next', 'previous', 'data')
      expect(node.next).to.be.null
      expect(node.previous).to.be.null
      expect(node.data).to.not.be.null
    })
  })
  describe('2) Doubly linked list', function () {
    describe('# Initialization:', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        let list1
        function wrapper(){
          list1 = new DoublyLinkedList()
        }
        expect(wrapper).to.throw()
        expect(list1).to.be.undefined
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      
      })
      it('it should initialize a linked list from scratch with a tier name', function () {
        
        expect(list).to.exist
        expect(list).to.have.all.keys('name', 'head', 'tail', '_length')
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
        expect(list.name).to.not.be.null
      })
    })
    describe('# Prepend:', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        expect(list.prepend.bind(list)).to.throw()

        function wrapper(){
          list.prepend()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should prepend nodes to the head of the list', function () {
  
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
    })
    describe('# Append:', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        expect(list.append.bind(list)).to.throw()
        expect(list.prepend.bind(list)).to.throw()

        function wrapper(){
          list.append()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should append nodes to the tail of the list', function () {
  
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
    })
    describe('# Insert:', function () {
      it('it should do nothing and throw an error if an invalid value is passed', function () {
        expect(list.insert.bind(list)).to.throw()

        function wrapper1(){
          list.insert()
        }
        function wrapper2(){
          list.insert(null,'A')
        }
        function wrapper3(){
          list.insert(0, )
        }
        expect(wrapper1).to.throw()
        expect(wrapper2).to.throw()
        expect(wrapper3).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should do nothing and throw an error if an invalid index is passed (more than _length, negative)', function() {
        expect(list.insert.bind(list)).to.throw()

        function wrapper1(){
          list.insert(-1, 'A')
        }
        function wrapper2(){
          list.insert(1,'B')
        }
        function wrapper3(){
          list.insert(null, 'C')
        }
        function wrapper4(){
          list.insert('string', 'D')
        }

        expect(wrapper1).to.throw()
        expect(wrapper2).to.throw()
        expect(wrapper3).to.throw()
        expect(wrapper4).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should prepend nodes if index - 1 === _length', function () {
  
        list.insert(0,'A')
        expect(list.head).to.deep.equal(list.tail)
        expect(list._length).to.equal(1)
        
        function wrapper1(){
          list.insert(1, 'B')
        } 
        expect(wrapper1).to.throw()
        
        list.insert(0,'B')
        expect(list.head.data).to.equal('B')
        expect(list.head.next).to.deep.equal(list.tail)
        expect(list.tail.previous).to.deep.equal(list.head)
        expect(list._length).to.equal(2)
        expect(list.tail.next).to.be.null
        expect(list.head.previous).to.be.null
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
    })
    describe('# Pop:', function () {
      xit('it should pop nodes from the tail of the list and return them', function () {
        
      })
    }) 
    describe('# Shift:', function () {
      xit('it should shift nodes from the head of the list and return them', function () {
        
      })
    })
    describe('# Remove:', function () {
      xit('it should remove nodes from any slot/index of the list and return them', function () {
        
      })
    })
    describe('# Complex combinations:', function () {
      xit('it should prepend, append and insert nodes seamlessly ', function () {
        
      })
      xit('it should pop, shift and remove nodes from any slot/index of the list seamlessly', function () {
        
      })
      xit('different combinations of operations should work seamlessly', function () {
        
      })
    })
  })
})