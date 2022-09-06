// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event
import { tiers, scrollContent } from '../init.js'
let dragged
let draggedParent
let belowDragged

export function handleDragEnter(event) {
  event.preventDefault()
  // dragged = event.target
  // draggedParent = dragged.parentNode
  if (event.target.className === "container-tierlist") {
    tiers.forEach(tier => {
      // identify the list the node is dragged from
      if (tier[0].name.includes(event.target.id)) {
          console.log(`Selecting ${tier[0].name}...`)
      }
    })
  }
}

export function handleDragStart(event) {
  // store a ref. on the dragged elem
  dragged = event.target
  draggedParent = dragged.parentNode

  // check if the container the node is dragged from is a tierlist 
  if (draggedParent.className === "container-tierlist") {
    tiers.forEach((tier, i) => {
      // identify the list the node is dragged from
      if (tier[0].name.includes(draggedParent.id)) {
          // console.log(`%cDragging node from ${tier[0].name}...`, `background: #111113; color: ${tier[1]}`)
          // todo check for certain type errors, add && checks
        if (tier[0].tail && tier[0].tail.data === dragged.name) {
          tier[0].pop()
          console.log(`${tier[0].name}.pop() invoked!`)
        } else if (tier[0].head.data === dragged.name) {
          tier[0].shift()
          console.log(`${tier[0].name}.shift() invoked!`)
        } else {
          tier[0].remove(dragged.name)
          console.log(`${tier[0].name}.remove(${dragged.name}) invoked!`)
          // const index = tier[0].getIndex(dragged.name)
          // tier[0].removeByIndex(index)
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
    // console.log({dragged, belowDragged})
  }
}

export function handleDrop(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault()
  console.log('onDrop -> ')
  try {
    const list = document.getElementById(event.target.id)
    let dropped = false
    const isContainer = event.target.className === "container-tierlist"
    
    const p = document.createElement('p')
    const span = document.createElement('span')
    // move dragged element to the selected drop target
    if (isContainer) {
      console.log('isContainer!!', {belowDragged})
      if (belowDragged) {

        const nodeNames = Array.from(event.target.childNodes).map(el => el.name)
        // eslint-disable-next-line no-console
        console.log(nodeNames)
        const isOverLastChild = event.target.lastChild.name === belowDragged.name
        if (isOverLastChild) {
          // eslint-disable-next-line no-console
          console.log(event.target.lastChild.name === belowDragged.name)
          if (event.target.children?.length !== 0) {
            console.log('OVER --> appends to last child', event.target.children.length  )
            dragged.parentNode.removeChild(dragged)
            event.target.appendChild(dragged)
          }
          if (event.target.children.length === 0) {
            // eslint-disable-next-line no-console
            console.log('OVER --> no childs in list, appends', event.target.children.length  )
            dragged.parentNode.removeChild(dragged)
            event.target.appendChild(dragged)
          }
        }
      } else {
        if (event.target.children?.length !== 0) {
          console.log('children! appends to last child', event.target.children.length  )
          dragged.parentNode.removeChild(dragged)
          event.target.appendChild(dragged)
        }
        if (event.target.children.length === 0) {
          // eslint-disable-next-line no-console
          console.log('no childs in list, appends', event.target.children.length  )
          dragged.parentNode.removeChild(dragged)
          event.target.appendChild(dragged)
        }
      }
    }
   
      dropped = true

      // append node to list
      // TODO: check for HTML api to insert images in between, different flow
      // * check inside tier -> 
      // * if tier hasNode(dragged.name)
      // * const node = search(dragged.name)
      // *  if node is in the middle of others (node.next !== null) or something alike
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

        tier[0].append(dragged.name) // ? or id ?
        console.log(`${tier[0].name}.append(${dragged.name}) invoked!`)
        // logic for scroll-container (resume operations)
        span.setAttribute('id', `${tier[0].name}-span`)
        span.innerText = `${tier[0].name}: ${tier[0].printList().join(' <=> ')}`
        p.appendChild(span)
        scrollContent.appendChild(p)
        }
      })
    }
  } catch (error) {
    console.log('Element dropped outside drop area', error)
    return
  }
}
