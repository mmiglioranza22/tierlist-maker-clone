// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers, scrollContent } from '../init.js'
// reference variables for API & DS logic
let dragged
let draggedParent
let belowDragged
let operation
let previousNode

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
    // todo add logic if dropped over img? dont think so 
    if (draggedParent.className === "container-tierlist") {
      tiers.forEach((tier, i) => {
        // identify the list the node is dragged from
        if (tier[0].name.includes(draggedParent.id)) {
            // todo check for certain type errors, add && checks
          if (tier[0].tail && tier[0].tail.data === dragged.name) {
            tier[0].pop()
            console.log(`${tier[0].name}.pop()`)
          } else if (tier[0].head.data === dragged.name) {
            tier[0].shift()
            console.log(`${tier[0].name}.shift()`)
          } else {
            // eslint-disable-next-line no-console
            //console.log(tier[0])
            //tier[0].remove(dragged.name) // ! error comes here, tier[0] does not have the element to be removed
            // const index = tier[0].getIndex(dragged.name)
            // tier[0].removeByIndex(index)
            console.log(`${tier[0].name}.remove(${dragged.name})`)
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
    const list = document.getElementById(event.target.id) // ! identify the container tier id when drop over IMG
    
    const p = document.createElement('p')
    const span = document.createElement('span')
    // flow control: move dragged element to the selected drop target
    // append at the end of the list if dropped in drop area
    if (event.target.className === "container-tierlist") {
      operation = 'append'
      dragged.parentNode.removeChild(dragged)
      event.target.appendChild(dragged)
    }
    // insert before last hovered node
    if (event.target.tagName === 'IMG') {
      previousNode = belowDragged.previousSibling?.name
      operation = belowDragged.previousSibling ? 'insert' : 'prepend'
      dragged.parentNode.removeChild(dragged)
      event.target.parentNode.insertBefore(dragged, event.target)
    }
   
    // append node to list for data structure operations console
// eslint-disable-next-line no-console
console.log({operation, list: list.id})
      // tiers.forEach(tier => {
      //   if (tier[0].name.includes(list.id)) {
      //     console.log(`%c${tier[0].name} selected!`, `background: #111113; color: ${tier[1]}`)
      //   switch (operation) {
      //     case 'append':
      //       tier[0].append(dragged.name)
      //       console.log(`${tier[0].name}.append(${dragged.name})`)
      //       break
      //     case 'prepend':
      //       tier[0].prepend(dragged.name) 
      //       console.log(`${tier[0].name}.prepend(${dragged.name})`)
      //       break
      //     case 'insert':
      //       const index = tier[0].getIndex(previousNode)
      //       tier[0].insert(index ,dragged.name) 
      //       console.log(`${tier[0].name}.insert(${index}, ${dragged.name})`)
      //       break
      //     default:
      //       console.error('Unexpected operation type invoked', operation)
      //   }

      //   // logic for scroll-container (resume operations)
      //   span.setAttribute('id', `${tier[0].name}-span`)
      //   span.innerText = `${tier[0].name}: ${tier[0].printList().join(' <=> ')}`
      //   p.appendChild(span)
      //   scrollContent.appendChild(p)
      //   }
      // })

    // reset belowDragged to avoid conflicts on new hover over images
    belowDragged = undefined
    previousNode = undefined
  } catch (error) {
    console.error('Element dropped outside drop area', error)
    return
  }
}
