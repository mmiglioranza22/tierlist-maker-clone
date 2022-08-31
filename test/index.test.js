import { expect } from "chai"
import Node from "../modules/Node.js"
import DoublyLinkedList from "../modules/DoublyLinkedList.js"

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
        function wrapper() {
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

        function wrapper() {
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

        function wrapper() {
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

        function wrapper1() {
          list.insert()
        }
        function wrapper2() {
          list.insert(null,'A')
        }
        function wrapper3() {
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

        function wrapper1() {
          list.insert(-1, 'A')
        }
        function wrapper2() {
          list.insert(1,'B')
        }
        function wrapper3() {
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
      it('it should do nothing and throw an error if list is empty', function () {
        expect(list.pop.bind(list)).to.throw()

        function wrapper() {
          list.pop()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should pop nodes from the tail of the list and return them', function () {
       list.append('A')
       const node1 = list.pop() 
       expect(node1.data).to.equal('A')
       expect(list._length).to.equal(0)

       list.append('B')
       list.append('C')
       const node2 = list.pop() 
       expect(node2.data).to.equal('C')
       expect(list._length).to.equal(1)
       expect(list.head).to.deep.equal(list.tail)
      })
    }) 
    describe('# Shift:', function () {
      it('it should do nothing and throw an error if list is empty', function () {
        expect(list.shift.bind(list)).to.throw()

        function wrapper() {
          list.shift()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should shift nodes from the head of the list and return them', function () {
        list.prepend('A')
        const node1 = list.shift() 
        expect(node1.data).to.equal('A')
        expect(list._length).to.equal(0)
 
        list.prepend('B')
        list.prepend('C')
        const node2 = list.shift() 
        expect(node2.data).to.equal('C')
        expect(list._length).to.equal(1)
        expect(list.head).to.deep.equal(list.tail)
      })
    })
    describe('# Remove:', function () {
      it('it should do nothing and throw an error if list is empty', function () {
        expect(list.remove.bind(list)).to.throw()

        function wrapper() {
          list.remove(0)
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should do nothing and throw an error if index is invalid', function () {
        expect(list.remove.bind(list)).to.throw()

        function wrapper1() {
          list.remove()
        }
        function wrapper2() {
          list.remove(-1)
        }
        function wrapper3() {
          list.remove(1)
        }
        function wrapper4() {
          list.remove(null)
        }
        function wrapper5(){
          list.remove('string')
        }
        expect(wrapper1).to.throw()
        expect(wrapper2).to.throw()
        expect(wrapper3).to.throw()
        expect(wrapper4).to.throw()
        expect(wrapper5).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should remove nodes from any slot/index of the list and return them', function () {
        list.append('Z')
        const z = list.remove(0)
        expect(z.data).to.equal('Z')
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
        
        list.prepend('Y')
        list.prepend('X')
        list.append('Z')
        list.append('W')
        list.append('V')
        const y = list.remove(1)
        expect(y.data).to.equal('Y')
        const w = list.remove(2)
        expect(w.data).to.equal('W')
        expect(list.head.data).to.equal('X')
        expect(list.tail.data).to.equal('V')
        expect(list.head.next.data).to.equal('Z')
        expect(list.head.next).to.deep.equal(list.tail.previous) 
      })
    })
    describe('# Complex combinations:', function () {
      it('different combinations of operations should work seamlessly', function () {
        list.append('Z')
        const z = list.remove(0)
        expect(z.data).to.equal('Z')
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
        
        list.prepend('Y')
        list.prepend('X')
        list.append('Z')
        list.append('W')
        list.append('V')
        const y = list.remove(1)
        expect(y.data).to.equal('Y')
        expect(list._length).to.equal(4)
        const w = list.remove(2)
        expect(w.data).to.equal('W')
        expect(list.head.data).to.equal('X')
        expect(list.tail.data).to.equal('V')
        expect(list.head.next.data).to.equal('Z')
        expect(list.head.next).to.deep.equal(list.tail.previous) 

        list.insert(0,'A')
        expect(list.head.data).to.equal('A')
        expect(list._length).to.equal(4)
        
        list.insert(2,'B')
        expect(list.tail.previous.data).to.equal('Z')
        expect(list.tail.data).to.equal('V')
        
        list.insert(4, 'J')
        expect(list.tail.data).to.equal('V')
        list.pop()
        expect(list.tail.data).to.equal('J')
        
        list.shift()
        expect(list.head.data).to.equal('X')
        expect(list._length).to.equal(4)
      })
    })
    describe('# hasNode(nodeName) - Checks for a given node in list:', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        expect(list.hasNode.bind(list)).to.throw()

        function wrapper() {
          list.hasNode()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should return true or false when node exists or not in the list', function () {
        list.prepend('A')
        expect(list.hasNode('A')).to.be.true
        expect(list.hasNode('B')).to.be.false
      })
    })
    describe('# search(nodeName):', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        expect(list.hasNode.bind(list)).to.throw()

        function wrapper() {
          list.search()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null


        function wrapper1() {
          list.remove()
        }
        function wrapper2() {
          list.remove(-1)
        }
        function wrapper3() {
          list.remove(1)
        }
        function wrapper4() {
          list.remove(null)
        }
        function wrapper5(){
          list.remove('string')
        }
        expect(wrapper1).to.throw()
        expect(wrapper2).to.throw()
        expect(wrapper3).to.throw()
        expect(wrapper4).to.throw()
        expect(wrapper5).to.throw()





      })
      it('it should do nothing and throw an error if invalid argument is passed', function () {
        function wrapper() {
          list.search(undefined)
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should return a node that exists in the list', function () {
        list.append('A')
        list.append('B')
        list.append('C')

        const A = list.head
        const B = list.head.next
        const C = list.tail

        function wrapper() {
          list.search('D') 
        }

        expect(list.search('A')).to.deep.equal(A)
        expect(list.search('B')).to.deep.equal(B)
        expect(list.search('C')).to.deep.equal(C)
        expect(list._length).to.equal(3)
        expect(wrapper).to.throw
      })
    })
    describe('# getIndex(index):', function () {
      it('it should do nothing and throw an error if no value is passed', function () {
        expect(list.getIndex.bind(list)).to.throw()

        function wrapper() {
          list.getIndex()
        }
        expect(wrapper).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      }) 
      it('it should do nothing and throw an error if invalid argument is passed', function () {
        function wrapper1() {
          list.getIndex(undefined)
        }
        function wrapper2() {
          list.getIndex(null)
        }
        function wrapper3() {
          list.getIndex('A')
        }
        function wrapper4() {
          list.getIndex('7')
        }
        function wrapper5() {
          list.getIndex(-1)
        }
        expect(wrapper1).to.throw()
        expect(wrapper2).to.throw()
        expect(wrapper3).to.throw()
        expect(wrapper4).to.throw()
        expect(wrapper5).to.throw()
        expect(list._length).to.equal(0)
        expect(list.head).to.be.null
        expect(list.tail).to.be.null
      })
      it('it should return the node that exists in the index passed as argument', function () {
        list.append('A')
        list.append('B')
        list.append('C')

        const A = list.head
        const B = list.head.next
        const C = list.tail

        function wrapper() {
          list.getIndex(4) 
        }

        expect(list.getIndex(0)).to.deep.equal(A)
        expect(list.getIndex(1)).to.deep.equal(B)
        expect(list.getIndex(2)).to.deep.equal(C)
        expect(list._length).to.equal(3)
        expect(wrapper).to.throw
      })
    })
  })
})