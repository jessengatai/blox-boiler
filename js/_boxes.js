document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Adds row classes to our .boxes
   */
  const runBoxRowClasses = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const boxContainers = document.querySelectorAll('.boxes[data-rowclasses]');

    // run through each element that uses responsive classes
    if (boxContainers.length) {
      boxContainers.forEach( function(object, index) {

        // get the width of the container and setup the children
        const children = object.querySelectorAll('.box');
        const lastChild = children[children.length - 1];
        let rowCount = 0;

        // clean up the .row-x classes
        for (var i = 0; i < children.length; i++) {
          var prefix = "row-";
          var classes = children[i].className.split(" ").filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
          });
          children[i].className = classes.join(" ").trim();
        }

        // run through each box and apply row class
        for (var i = 0; i < children.length; i++) {
          const currentNode = children[i];
          const previousNode = children[i - 1];

          // check if we are on a new row
          if (
            // if this is the first box
            currentNode === children[0]
            // or if the top offset of this box doesn't match the previous siblings offset
            || currentNode.offsetTop !== previousNode.offsetTop
          ) {
            rowCount++;
          }

          // check if this box is in the last row
          if( currentNode.offsetTop === lastChild.offsetTop ) {
            currentNode.className += ' row-last';
          }

          // add our class!
          currentNode.className += ` row-${rowCount}`;

        } // end each .box

      }) // end each .boxes
    }// end .boxes exist check
  } // end runBoxRowClasses()

  /**
   * Handle responsive changes
   * @param  {object} e the event
   */
  window.onresize = function(event) {
    runBoxRowClasses();
  };
  runBoxRowClasses();

});
