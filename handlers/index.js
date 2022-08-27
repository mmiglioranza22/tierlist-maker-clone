let dragged = null;

export function handleDragStart(event) {
  // store a ref. on the dragged elem
  dragged = event.target
}

export function handleDragOver(event) {
   // prevent default to allow drop
   event.preventDefault()
}

export function handleDrop(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault()
  // move dragged element to the selected drop target
  if (event.target.className === "container-tierlist") {
    dragged.parentNode.removeChild(dragged)
    event.target.appendChild(dragged)
  }
}