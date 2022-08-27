import DoublyLinkedList from './modules/DoublyLinkedList.js'
console.log(new DoublyLinkedList('s'));
/** 
 * TODO: load script that: 
 * - creates 5 empty tiers as containers
 * - add event listeners on click/grab/pinch, move and drop
 *   grab+move should remove nodes
 *   drop should insert nodes
 * - solution approach with matrix on hold, DLL meets is the MVP
 * TODO: once FE logic is done: 
 * - check for basic APIs to capture images (get api keys for future deploy)
 * - check if this can be turn into a npm package: 
 *   (client provides entities from JSON. Additional tiers. Changeable styles)
 *   (sample)
 */



// event handlers

// get elements and add attr
const img1 = document.createElement('img')
const img2 = document.createElement('img')
const img3 = document.createElement('img')

img1.setAttribute('src', './public/img/naruto.jpeg')
img2.setAttribute('src', './public/img/sasuke.webp')
img3.setAttribute('src', './public/img/sakura.jpeg')


img1.setAttribute('height', '100px')
img1.setAttribute('width', '100px')
img2.setAttribute('height', '100px')
img2.setAttribute('width', '100px')
img3.setAttribute('height', '100px')
img3.setAttribute('width', '100px')

img1.setAttribute('draggable', true)
img2.setAttribute('draggable', true)
img3.setAttribute('draggable', true)

document.querySelector('.container-options').appendChild(img1)
document.querySelector('.container-options').appendChild(img2)
document.querySelector('.container-options').appendChild(img3)


// drop area
// const dropArea = document.getElementById('drop-area S');

// dropArea.addEventListener('dragover', (event) => {
//   console.log('drag over');
//   event.stopPropagation();
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'move';
// });

// dropArea.addEventListener('drop', (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   // const fileList = event.dataTransfer.files;
//   console.log(event.dataTransfer);
// });

let dragged = null;


function handleDragStart(event) {
  console.log('drag start');
  // store a ref. on the dragged elem
  dragged = event.target;
}

function handleDragOver(event) {
   // prevent default to allow drop
   event.preventDefault();
}

function handleDrop(event) {
  console.log('drop event', event.target);
 // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target

 if (event.target.className === "container-tierlist") {
   dragged.parentNode.removeChild(dragged);
   event.target.appendChild(dragged);
 }
}

document.addEventListener("dragstart", handleDragStart);

document.addEventListener("dragover", handleDragOver);

document.addEventListener("drop", handleDrop);


//add event listeners
// document.addEventListener('dragstart', handleDragStart);
// document.addEventListener('dragOver', handleDragOver);
// document.addEventListener('drop', handleDrop);

// img2.addEventListener('dragstart', handleDragStart);
// img2.addEventListener('dragover', handleDragOver);
// img2.addEventListener('drop', handleDrop);

// img3.addEventListener('dragstart', handleDragStart);
// img3.addEventListener('dragover', handleDragOver);
// img3.addEventListener('drop', handleDrop);






