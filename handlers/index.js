// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers } from '../init.js'
let dragged
let draggedParent

export function handleDrag(event, list) {
  event.preventDefault()
  // eslint-disable-next-line no-console
  dragged = event.target
  draggedParent = dragged.parentNode
  tiers.forEach((tier, i) => {
    if (tier.hasNode(dragged.name)) {
      // TODO: only pop is being supported, check for HTML api to remove images in between
      console.log(draggedParent)
      console.log('drag')
      // tier.pop()
    }
  })
}


export function handleDragStart(event, list) {
  // store a ref. on the dragged elem
  dragged = event.target
}

export function handleDragOver(event, list) {
   // prevent default to allow drop
   event.preventDefault()
}

export function handleDrop(event, list) {
  try {
    const listDS = document.getElementById(event.target.id)
  
    // prevent default action (open as link for some elements)
    event.preventDefault()
    // move dragged element to the selected drop target
    if (event.target.className === "container-tierlist") {
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
    }
    
    tiers.forEach((tier, i) => {
      if (tier.name.includes(listDS.id)) {
        // TODO: only append is being supported, check for HTML api to insert images in between
        tier.append(dragged.name)
      }
    })
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Element dropped outside drop area')
    return
  }
}