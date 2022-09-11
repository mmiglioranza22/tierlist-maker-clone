function parseName(string) {
  return string.split('../src/public/img/')[1].split('.')[0]
}

export function initDataStructures(tiers, dataStructure) {
  const TIERS = 'SABCD'
  const colors = ['#ff7f7f','#ffbf7f', '#ffdf7f', '#ffff7f', '#bfff7f']  
  for (let i = 0; i < TIERS.length; i++) {
    let tierEl = document.getElementById(TIERS[i])
    tiers[i] = [new dataStructure(tierEl.id), colors[i]]

    // TODO tiers are accesible through browser's console
    // it could be possible to add/remove nodes from there. (Extra feat)
    window[`${tierEl.id}_tier`] = tiers[i][0]
  }
}

export function createImgElements(array, assets) {
  let element
  for (let item of assets) {
    element = document.createElement('img')
        element.setAttribute('src', item)
        element.setAttribute('alt', parseName(item))
        element.setAttribute('name', parseName(item))
        element.setAttribute('title', parseName(item))
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element)  
  }
  if (array?.length) {
    for (let item of array) {
      if (item.images[0] || item.images[1]) {
        element = document.createElement('img')
        element.setAttribute('src', item.images[1] || item.images[0] || '../src/public/placeholder.png')
        element.setAttribute('alt', item.name || 'Nameless shinobi')
        element.setAttribute('name', item.name || 'Nameless shinobi')
        element.setAttribute('title', item.name)
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element) 
      }
    }
  }
}

export function exposeElements() {
  const nodes = document.querySelector('.container-options').childNodes
  let elements = []
  for (let node of nodes) {
    node.name && elements.push(node.name)
  }
  return elements
}

// https://stackoverflow.com/questions/41898612/format-console-log-with-color-and-variables-surrounding-non-formatted-text
function opLogger(tier, operation, node, referenceNode) {
  switch (operation) {
    // todo modify insert when insertBefore method is set
    case "insertBefore":
      console.log(`%c${tier[0].name}.${operation}(${node}, ${referenceNode})`, `background: #111113; color: ${tier[1]}`)
      break
    case "append":
    case "prepend":
    case "remove":
      console.log(`%c${tier[0].name}.${operation}(${node})`, `background: #111113; color: ${tier[1]}`)
      break
    case "pop":
    case "shift":
      console.log(`%c${tier[0].name}.${operation}()`, `background: #111113; color: ${tier[1]}`)
      break
    default:
      console.error('Unexpected operation type invoked', operation)
  }
}

function insertListSummary(tier, scrollContent) {
  const p = document.createElement('p')
  const span = document.createElement('span')    
  span.setAttribute('id', `${tier[0].name}-span`)
  span.innerText = `${tier[0].name}: ${tier[0].printList().join(' <=> ')}`
  p.appendChild(span)
  scrollContent.appendChild(p)
  p.scrollIntoView()
}

export function handleTierOperations(list, tiers, dragged, operation, previousNode, scrollContent) {
  if (list) {
    tiers.forEach(tier => {
      // store reference of the list the node will be removed from
      let poppedTier

      // * Removing nodes

      if (tier[0]._length && tier[0].hasNode(dragged.name)) {
        poppedTier =  tier[0]
        if(poppedTier) {
            if (poppedTier.tail && poppedTier.tail.data === dragged.name) {
            tier[0].pop()
            opLogger(tier, 'pop')
          } else if (poppedTier.head && poppedTier.head.data === dragged.name) {
            tier[0].shift()
            opLogger(tier, 'shift')
          } else {
            poppedTier.remove(dragged.name)
            opLogger(tier, 'remove', dragged.name)
          }
        }
      }

      // * Adding nodes

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
  } else {
    throw new Error('No valid tierlist was selected')
  }
}