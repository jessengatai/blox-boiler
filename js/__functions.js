console.log('functions loaded');

/**
 * Give an element a unique id
 * @param {object} el The element that will receive the id
 */
const setBloxId = (el) => {
  el.attr('bx-id',Math.random().toString(36).substr(2, 16));
}

function removeHash () {
  history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}
