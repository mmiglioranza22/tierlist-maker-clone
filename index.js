import DoublyLinkedList from './modules/DoublyLinkedList.js'
console.log(new DoublyLinkedList('s'));
/** 
 * TODO: load script that: 
 * - creates 3 dumb node components (see in future to use fixed size images)
 * - creates 5 empty tiers as containers
 * - add event listeners on click/grab/pinch, move and drop
 *   grab+move should remove nodes
 *   drop should insert nodes
 * - solution approach with matrix on hold, DLL meets is the MVP
 * TODO: once FE logic is done: 
 * - check for DLL tests with chai
 * - check for basic APIs to capture images (get api keys for future deploy)
 * - check if this can be turn into a npm package: 
 *   (client provides entities from JSON. Additional tiers. Changeable styles)
 *   (sample)
 */


const node_a = document.createElement('div')
const content_a = document.createTextNode('epa')
node_a.appendChild(content_a)
document.querySelector('.container-options').appendChild(node_a)
