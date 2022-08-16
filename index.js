import Matrix from './modules/Matrix.js'
import DoublyLinkedList from './modules/DoublyLinkedList.js'
/** 
 * TODO: load script that: 
 * - check all imports are good
 * - creates 5 empty tiers as containers
 * - creates 3 dumb node components (see in future to use fixed size images)
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

console.log(window);
const matrix = new Matrix
console.log(
    matrix.name
);