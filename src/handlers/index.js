// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers, scrollContent } from '../init.js'
let dragged
let draggedParent
let belowDragged

export function handleDragEnter(event) {
  event.preventDefault()
}

export function handleDragStart(event) {
  // store a ref. on the dragged elem & direct parent
  dragged = event.target
  draggedParent = dragged.parentNode

}

export function handleDragEnd(event) {
    event.preventDefault()
  
    // check if the container the node is dragged from is a tierlist 
    if (draggedParent.className === "container-tierlist") {
      tiers.forEach((tier, i) => {
        // identify the list the node is dragged from
        if (tier[0].name.includes(draggedParent.id)) {
            // todo check for certain type errors, add && checks
          if (tier[0].tail && tier[0].tail.data === dragged.name) {
            tier[0].pop()
            console.log(`${tier[0].name}.pop() invoked!`)
          } else if (tier[0].head.data === dragged.name) {
            tier[0].shift()
            console.log(`${tier[0].name}.shift() invoked!`)
          } else {
            // eslint-disable-next-line no-console
            console.log(tier[0])
            tier[0].remove(dragged.name)
            // const index = tier[0].getIndex(dragged.name)
            // tier[0].removeByIndex(index)
            console.log(`${tier[0].name}.remove(${dragged.name}) invoked!`)
          }
        }
      })
    }
 
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
  // prevent default action (open as link for some elements)
  event.preventDefault()
  try {
    const list = document.getElementById(event.target.id)
    let dropped = false
    
    const p = document.createElement('p')
    const span = document.createElement('span')
    // flow control: move dragged element to the selected drop target
    // append at the end of the list if dropped in drop area
    if (event.target.className === "container-tierlist") {
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
    }
    // insert before last hovered node
    if (event.target.tagName === 'IMG') {
      dragged.parentNode.removeChild(dragged)
      event.target.parentNode.insertBefore(dragged, event.target)
    }
    
    dropped = true

      // append node to list for data structures consoles
    if (list) {
      tiers.forEach(tier => {
        if (dropped && tier[0].name.includes(list.id)) {
          console.log(`%c${tier[0].name} selected!`, `background: #111113; color: ${tier[1]}`)

        // Once the api issue is solved:
        // how do I know it is being added in the tail? dragover?
        // is tail -> append(dragged.name), 
        // how do I know it is being added in the head?
        // is head -> prepend()
        // how do I know its being added in between nodes?
        // tier[0].getIndex(dragged.name)
        // tier[0].insert(index, dragged.name)

        tier[0].append(dragged.name) 
        // console.log(`${tier[0].name}.append(${dragged.name}) invoked!`)

        // logic for scroll-container (resume operations)
        span.setAttribute('id', `${tier[0].name}-span`)
        span.innerText = `${tier[0].name}: ${tier[0].printList().join(' <=> ')}`
        p.appendChild(span)
        scrollContent.appendChild(p)
        }
      })
    }
    // reset belowDragged to avoid conflicts on new hover over images
    belowDragged = undefined
  } catch (error) {
    console.log('Element dropped outside drop area', error)
    return
  }
}
