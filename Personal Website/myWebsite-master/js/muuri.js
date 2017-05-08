svar grid = new Muuri({
  container: document.getElementsByClassName('grid')[0],
  // Muuri does not convert a node list to array automatically
  // so we have to do it manually.
  items: [].slice.call(document.getElementsByClassName('item'))
});