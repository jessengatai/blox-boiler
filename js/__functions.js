console.log('functions loaded');

/**
 * Give an element a unique id
 * @param {object} el The element that will receive the id
 */
const bloxSetId = (el) => {
  el.attr('bx-id',Math.random().toString(36).substr(2, 16));
}

/**
 * Check wether a value is set
 * @param {mixed} value Can be anything from a string to an array
 * @return {bool}
 */
const bloxIsset = (value) => {
  return (typeof value != 'undefined' && value) ? true : false ;
}

/**
 * Sanitize a string
 * @param  {string} string The string of text to clean
 * @return {string}        The shiny new clean string
 */
const bloxSanitize = (string) => {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}
