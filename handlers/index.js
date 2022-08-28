// best explanation: https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event

let dragged = null;

export function handleDragStart(event, list) {
  // store a ref. on the dragged elem
  dragged = event.target
  console.log(event.target.alt);

}

export function handleDragOver(event, list) {
   // prevent default to allow drop
   event.preventDefault()
}

export function handleDrop(event, list) {
  // prevent default action (open as link for some elements)
  event.preventDefault()
  console.log(event.target);
  // move dragged element to the selected drop target
  if (event.target.className === "container-tierlist") {
    dragged.parentNode.removeChild(dragged)
    event.target.appendChild(dragged)
  }
}