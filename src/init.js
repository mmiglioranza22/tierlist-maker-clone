import DoublyLinkedList from './modules/DoublyLinkedList.js'
import { handleDragStart, handleDragOver, handleDrop, handleDragEnter, handleDragEnd } from './handlers/index.js'
import { initDataStructures, createImgElements } from './utils/index.js'
import { IMG_DIR } from './constants/constants.js'

export const scrollContent = document.querySelector('.scroll-content')

// create data structures for each tier
let S_Tier, A_Tier, B_Tier, C_tier, D_tier
export const tiers = [S_Tier, A_Tier, B_Tier, C_tier, D_tier]

initDataStructures(tiers, DoublyLinkedList)

// logging for console control
console.log('Initializing tiers data structures...')
tiers.forEach(el => console.log(`%c${el[0].name} done`, `background: #111113; color: ${el[1]}`))
console.log('Completed.')

// loading spinner logic 
let isLoading = true
const containerOptionsEl = document.querySelector('.container-options')
const spinner = document.createElement('div')
spinner.classList.add('spinner')
containerOptionsEl.classList.add('loader')
containerOptionsEl.appendChild(spinner)

// API call
async function apiCall() {
  try {
    const response = await fetch('https://naruto-api.herokuapp.com/api/v1/characters')
    let data = await response.json()
    return data.map(el => ({images: el.images, name: el.name}))
  } catch (error) {
    console.error(`Oops, something wrong happened while fetching the data from the API: ${error}`)
  }
}
const shinobis = await apiCall()

// todo add more examples case API fails
const assets = [
  `${IMG_DIR}/Naruto_Uzumaki.jpeg`,
  `${IMG_DIR}/Sasuke_Uchiha.webp`,
  `${IMG_DIR}/Sakura_Haruno.jpeg`,
  `${IMG_DIR}/Kushina_Uzumaki.jpeg`,
  `${IMG_DIR}/Minato_Namikaze.jpeg`,
  `${IMG_DIR}/Sakumo_Hatake.jpeg`,
  `${IMG_DIR}/Shikamaru_Nara.webp`,
  `${IMG_DIR}/Tsunade_Senju.jpeg`,
  `${IMG_DIR}/Orochimaru.webp`,
  `${IMG_DIR}/Tobirama_Senju.jpeg`,
  `${IMG_DIR}/Killer_Bee.png`,
]

// create API & default imgs
createImgElements(shinobis, assets)

// todo check loading logic
isLoading = false

if(!isLoading) {
  containerOptionsEl.classList.remove('loader')
  containerOptionsEl.removeChild(spinner)
}

document.addEventListener('dragenter', handleDragEnter)
document.addEventListener('dragstart', handleDragStart)
document.addEventListener('dragend', handleDragEnd)
document.addEventListener('dragover', handleDragOver)
document.addEventListener('drop', handleDrop)