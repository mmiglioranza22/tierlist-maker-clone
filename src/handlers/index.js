// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers, scrollContent } from '../init.js'
import { handleTierOperations } from '../utils/index.js'
// reference variables for API & DS logic
let dragged
let belowDragged
let operation
let previousNode

export function handleDragEnter(event) {
  event.preventDefault()
}

export function handleDragStart(event) {
  // store a ref. on the dragged elem & direct parent
  dragged = event.target
}

export function handleDragEnd(event) {
    event.preventDefault()
}

export function handleDragOver(event) {
  // prevent default to allow drop
  event.preventDefault()
  // store ref to the element below dragged
  if (event.target !== dragged && event.target.tagName === 'IMG') {
    belowDragged = event.target
  }
}

export function handleDrop(event) {
  // prevent default action (open as link for some elements) // todo should use stopProp or other for error cases?
  event.preventDefault()

  try {
    let list
    
    // * Flow control for two main cases
    
    // append at the end of the list if dropped in drop area
    if (event.target.className === 'container-tierlist') {
      list = document.getElementById(event.target.id)
      operation = 'append'
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
      handleTierOperations(list, tiers, dragged, operation, previousNode, scrollContent)
    }

    // dragged over another node/img
    if (event.target.tagName === 'IMG') {
      list = belowDragged.parentNode
      previousNode = belowDragged.name
      operation = belowDragged.previousSibling ? 'insertBefore' : 'prepend'
      
      // * edge case when node is hovered over itself
      if (dragged !== event.target) {
        dragged.parentNode.removeChild(dragged)
        event.target.parentNode.insertBefore(dragged, event.target)
        handleTierOperations(list, tiers, dragged, operation, previousNode, scrollContent)
      }
    }

    // reset belowDragged to avoid conflicts on new hover over images 
    belowDragged = undefined
    previousNode = undefined
    list = undefined

  } catch (error) {
    console.error('Element dropped outside drop area', error)
    return
  }
}
