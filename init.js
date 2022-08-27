import DoublyLinkedList from './modules/DoublyLinkedList.js'
import { handleDragStart, handleDragOver, handleDrop } from './handlers/index.js';

/** 
 * TODO: load script that: 
 * - solution approach with matrix on hold, DLL meets is the MVP
 * - fn to print ALL DLL
 * TODO: once FE logic is done: 
 * - check for basic APIs to capture images (get api keys for future deploy)
 * - check if this can be turn into a npm package: 
 *   (client provides entities from JSON. Additional tiers. Changeable styles)
 *   (sample)
 */


// get elements and add attr


const shinobis = []
await fetch('https://naruto-api.herokuapp.com/api/v1/characters')
  .then((response) => response.json())
  .then((data) => data.forEach(el => {
    shinobis.push({images: el.images, name: el.name})
  }))

console.log(shinobis);

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

document.addEventListener("dragstart", handleDragStart);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("drop", handleDrop);