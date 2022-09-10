// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers, scrollContent } from '../init.js'
import { opLogger, insertListSummary } from '../utils/index.js'
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
    let list = document.getElementById(event.target.id)
   
    // flow control: move dragged element to the selected drop target
    // append at the end of the list if dropped in drop area
    if (event.target.className === 'container-tierlist') {
      operation = 'append'
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
    }

    // insert before last hovered node
    if (event.target.tagName === 'IMG') {
      list = belowDragged.parentNode
      previousNode = belowDragged.name
      operation = belowDragged.previousSibling ? 'insertBefore' : 'prepend'
      dragged.parentNode.removeChild(dragged)
      event.target.parentNode.insertBefore(dragged, event.target)
    }
   
    tiers.forEach(tier => {
      // TODO: check order of remove/add nodes process, try SAME LIST/TIER edge cases to force errors and evaluate
      // * strategies: fail first, condition to error free, etc
      // * the goal is to avoid popping nodes if they are not being added 
      
      // store reference of list that loses a node
      let poppedTier
      if (tier[0]._length && tier[0].hasNode(dragged.name)) {
        poppedTier =  tier[0]
        if(poppedTier) {
          // removing nodes
            if (poppedTier.tail && poppedTier.tail.data === dragged.name) {
            tier[0].pop()
            opLogger(tier, 'pop')
          } else if (poppedTier.head && poppedTier.head.data === dragged.name) {
            tier[0].shift()
            opLogger(tier, 'shift')
          } else {
            poppedTier.remove(dragged.name)
            opLogger(tier, 'remove', dragged.name)
            // const index = poppedTier.getIndex(dragged.name)
            // poppedTier.removeByIndex(index)
          }
        }
      }

      // adding nodes
      if (tier[0].name.includes(list.id)) {
        opLogger(tier, operation, dragged.name, previousNode)
        switch (operation) {
          case 'append':
            tier[0].append(dragged.name)
            break
          case 'prepend':
            tier[0].prepend(dragged.name) 
            break
          case 'insertBefore':
            tier[0].insertBefore(dragged.name, previousNode) 
            break
          default:
            console.error('Invalid operation', operation)
            return
        }

        insertListSummary(tier, scrollContent)
      }
    })

    // reset belowDragged to avoid conflicts on new hover over images 
    belowDragged = undefined
    previousNode = undefined
    list = undefined
  } catch (error) {
    console.error('Element dropped outside drop area', error)
    return
  }
}
