// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers } from '../init.js'
let dragged
let draggedParent

export function handleDrag(event, list) {
  event.preventDefault()
  // eslint-disable-next-line no-console
  // dragged = event.target
  // draggedParent = dragged.parentNode
}


export function handleDragStart(event) {
    // store a ref. on the dragged elem
    dragged = event.target
    draggedParent = dragged.parentNode
    console.log({dragStart: draggedParent})

    // check if the container the node is dragged from is a tierlist 
    if (draggedParent.className === "container-tierlist") {
      console.log('entra', draggedParent.id)
      
      // TODO: check for HTML api to remove images in between and if dragged is tail
      tiers.forEach((tier, i) => {
         // identify the list the node is dragged from
        if (tier.name.includes(draggedParent.id)) {

          if (tier._length === 1) {
            tier.pop()
          } else if (tier.head.data === dragged.name) {
            tier.shift()
          } else {
            const index = tier.getIndex(dragged.name)
            tier.remove(index)
            

          }


          // tier.getIndex(dragged.name)
          // tier.remove(dragged.name)

          console.log(tier)
        }
      })
    }
}

export function handleDragOver(event) {
   // prevent default to allow drop
   event.preventDefault()
}

export function handleDrop(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault()
  try {
    const list = document.getElementById(event.target.id)
    let dropped = false
  
    // move dragged element to the selected drop target
    if (event.target.className === "container-tierlist") {
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
      dropped = true
      
      // append node to list
      // TODO: check for HTML api to insert images in between, different flow
      // * check inside tier -> 
      // * if tier hasNode(dragged.name)
      // * const node = search(dragged.name)
      // *  if node is in the middle of others (node.next !== null) or something alike

      // Once the api issue is solved:
      // how do I know it is being added in the tail? dragover?
      // is tail -> append(dragged.name), 
      // how do I know it is being added in the head?
      // is head -> prepend()
      // how do I know its being added in between nodes?
      // tier.getIndex(dragged.name)
      // tier.insert(index, dragged.name)

      tiers.forEach((tier, i) => {
        if (dropped && tier.name.includes(list.id)) {
          tier.append(dragged.name) // ? or id ?
          console.log(tier)
        }
      })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Element dropped outside drop area', error)
    return
  }
}
