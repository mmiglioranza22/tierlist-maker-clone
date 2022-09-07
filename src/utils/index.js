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
  if (array.length) {
    for (let item of array) {
      if (item.images[0] || item.images[1]) {
        element = document.createElement('img')
        element.setAttribute('src', item.images[1] || item.images[0] || '../src/public/placeholder.png')
        element.setAttribute('alt', item.name || 'Nameless item')
        element.setAttribute('name', item.name || 'Nameless item')
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element) 
      }
    }
  }
  for (let item of assets) {
    element = document.createElement('img')
        element.setAttribute('src', item)
        element.setAttribute('alt', parseName(item))
        element.setAttribute('name', parseName(item))
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element)  
  }
}