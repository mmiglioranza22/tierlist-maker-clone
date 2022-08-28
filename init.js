import DoublyLinkedList from './modules/DoublyLinkedList.js'
import { handleDragStart, handleDragOver, handleDrop } from './handlers/index.js';
import { parseName } from './utils/index.js'

/** 
 * TODO: load script that: 
 * - solution approach with matrix on hold, DLL meets is the MVP
 * - fn to print ALL DLL
 */


// API call
const shinobis = []
try {
  await fetch('https://naruto-api.herokuapp.com/api/v1/characters')
    .then((response) => response.json())
    .then((data) => data.forEach(el => {
      shinobis.push({images: el.images, name: el.name})
    }))
    console.log('Data fetch from API OK')
    // console.log(shinobis);
} catch (error) {
   console.error(`Oops, something wrong happened while fetching the data from the API: ${error}`);
}


// create API & default imgs
const assets = [
  './public/img/Naruto_Uzumaki.jpeg',
  './public/img/Sasuke_Uchiha.webp',
  './public/img/Sakura_Haruno.jpeg'
]

function createImgElements() {
  let element
  if (shinobis.length) {
    for (let shinobi of shinobis) {
      if (shinobi.images[0] || shinobi.images[1]) {
        element = document.createElement('img')
        element.setAttribute('src', shinobi.images[1] || shinobi.images[0]|| './public/placeholder.png')
        element.setAttribute('alt', shinobi.name || 'Nameless shinobi 🥷')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element) 
      }
    }
  }
  for (let img of assets) {
    element = document.createElement('img')
        element.setAttribute('src', img)
        element.setAttribute('alt', parseName(img))
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element)  
  }
}

createImgElements()

document.addEventListener("dragstart", handleDragStart);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("drop", handleDrop);