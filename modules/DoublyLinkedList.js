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
       let pointer = this.head
       if (pointer === null) {
           this.head = node
        } else {
           node.next = pointer
           pointer.previous = node
           this.head = node
        }
        this._length++
       
   }

   append(value){

   }

   insert(value) {

   }

   remove() {

   }
    
}
export default DoublyLinkedList