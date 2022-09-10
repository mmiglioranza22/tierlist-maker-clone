function parseName(string) {
  return string.split('../src/public/img/')[1].split('.')[0]
}

export function initDataStructures(tiers, dataStructure) {
  const TIERS = 'SABCD'
  const colors = ['#ff7f7f','#ffbf7f', '#ffdf7f', '#ffff7f', '#bfff7f']  
  for (let i = 0; i < TIERS.length; i++) {
    let tierEl = document.getElementById(TIERS[i])
    tiers[i] = [new dataStructure(tierEl.id), colors[i]]
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

// https://stackoverflow.com/questions/41898612/format-console-log-with-color-and-variables-surrounding-non-formatted-text
export function opLogger(tier, operation, node, index) {

  switch (operation) {
    // todo modify insert when insertBefore method is set
    case "insert":
      console.log(`%c${tier[0].name}.${operation}(${index}, ${node})`, `background: #111113; color: ${tier[1]}`)
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

export function insertListSummary(tier, scrollContent) {
  const p = document.createElement('p')
  const span = document.createElement('span')    
  span.setAttribute('id', `${tier[0].name}-span`)
  span.innerText = `${tier[0].name}: ${tier[0].printList().join(' <=> ')}`
  p.appendChild(span)
  scrollContent.appendChild(p)
}