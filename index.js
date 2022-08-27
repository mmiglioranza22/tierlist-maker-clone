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
 * - check for DLL tests with chai
 * - check for basic APIs to capture images (get api keys for future deploy)
 * - check if this can be turn into a npm package: 
 *   (client provides entities from JSON. Additional tiers. Changeable styles)
 *   (sample)
 */

const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
  console.log('drag over');
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = 'move';
});

dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  // const fileList = event.dataTransfer.files;
  console.log(event.dataTransfer);
});

const node_a = document.createElement('span')
node_a.setAttribute('draggable', true)
const content_a = document.createTextNode('epa')
node_a.appendChild(content_a)
document.querySelector('.container-options').appendChild(node_a)

const img1 = document.createElement('img')
const img2 = document.createElement('img')
const img3 = document.createElement('img')

img1.setAttribute('src', './public/img/naruto.jpeg')
img2.setAttribute('src', './public/img/sasuke.webp')
img3.setAttribute('src', './public/img/sakura.jpeg')

img1.setAttribute('draggable', true)
img2.setAttribute('draggable', true)
img3.setAttribute('draggable', true)


img1.setAttribute('height', '100px')
img1.setAttribute('width', '100px')
img2.setAttribute('height', '100px')
img2.setAttribute('width', '100px')
img3.setAttribute('height', '100px')
img3.setAttribute('width', '100px')

img1.classList.add("container-options");
img2.classList.add("container-options");
img3.classList.add("container-options");

document.querySelector('.container-options').appendChild(img1)
document.querySelector('.container-options').appendChild(img2)
document.querySelector('.container-options').appendChild(img3)


function handleDragStart(e) {
  console.log('drag start');
  
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
  console.log('drag end');
  this.style.opacity = '1';
}

function handleDrop(e) {
  console.log('drop event');
  e.stopPropagation(); // stops the browser from redirecting.
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}



node_a.addEventListener('dragstart', handleDragStart);
node_a.addEventListener('dragend', handleDragEnd);
node_a.addEventListener('drop', handleDrop);

