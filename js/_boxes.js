document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Adds row classes to our .boxes
   */
  const runBoxRowClasses = bloxDebounce(function() {

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
        children.forEach(function(box, index) {
          var prefix = "row-";
          var classes = box.className.split(" ").filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
          });
          box.className = classes.join(" ").trim();
        });

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
  }, bloxDebounceTiming() ); // end runBoxRowClasses()

  /**
   * Handle responsive changes
   * @param  {object} event the event
   */
   window.addEventListener('resize', runBoxRowClasses);
   runBoxRowClasses();

  /**
   * Find the margin left of an element
   * @param  {object} box The element in question
   * @return {integer}    The left margin of the element
   */
  const getMarginLeft = (box) => {
    var style = box.currentStyle || window.getComputedStyle(box);
    return parseInt(style.marginLeft, 10)
  }

  /**
   * Figure out the fullwidth of an element inclusive of margins
   * @param  {object} box The element in question
   * @return {integer}    The total width in integer format
   */
  const getFullWidth = (box) => {
    let width = box.getBoundingClientRect().width
    let style = window.getComputedStyle(box)
    // add top and bottom margins to height total
    let fullwidth = ["left", "right"]
      .map(function(side) {
        return parseInt(style['margin-' + side], 10)
      })
      .reduce(function(total, side) {
        return total + side
      }, width)
    return parseInt(fullwidth);
  }

  /**
   * Return the fullheight of an element including the top and bottom margins
   * @param  {object} box The element in question
   * @return {integer}    The total height
   */
  const getFullHeight = (box) => {
    let height = box.getBoundingClientRect().height
    let style = window.getComputedStyle(box)
    // add top and bottom margins to height total
    let fullheight = ["top", "bottom"]
      .map(function(side) {
        return parseInt(style['margin-' + side], 10)
      })
      .reduce(function(total, side) {
        return total + side
      }, height)
    return parseInt(fullheight);
  }

  /**
   * Find the box sibling that has the highest bottom offset
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  const findHeighestBottom = (array) => {
    return array.reduce(function(prev, current) {
      return (prev.bottom < current.bottom) ? prev : current ;
    });
  }

  /**
   * Get the boxes container height by using the offest of the lowest box in the set
   * @param  {array} boxes  The boxes of the container
   * @return {integer}      The height of the container
   */
  const getContainerHeight = (boxes) => {
    const lowest = boxes.reduce(function(prev, current) {
      return ( Math.floor(prev.offsetTop + prev.getBoundingClientRect().height ) > Math.floor(current.offsetTop + current.getBoundingClientRect().height ) ) ? prev : current ;
    });
    return Math.floor(lowest.offsetTop + getFullHeight(lowest))
  }


  /**
   * Setup and handle the masonry boxes
   */
  const setupMasonry = bloxDebounce(function() {

    // loop through each container
    document.querySelectorAll('.boxes[data-layout="masonry"]').forEach( function(container){

      // setup positional nodes
      let left = 0
      let boxes = [];
      let available = [];
      let children = container.children;

      // maintain dimensions of the container
      container.classList.add('position-relative');
      container.style.height = container.getBoundingClientRect().height+'px';

      // setup the boxes array
      // - this is to target only the immediate .box children of the container
      for( var i = 0, l=children.length; i<l; ++i) {
        var child = children[i];
        if(child.nodeType === 1 && child.classList.contains('box') ) {
          boxes.push(child);
        }
      }

      // figure out how many columns are in this container
      const columnCount = () => {
        return parseInt( container.getBoundingClientRect().width / boxes[0].getBoundingClientRect().width )
      }

      // loop through each box for positioning
      boxes.forEach( function(box, index, initial){

        // set position relative for this
        box.style.position = 'absolute';

        // first row boxes
        if(index <= (columnCount()-1) ) {
          box.style.left = (index!=0) ? left+'px' : 0 ;
          left += getFullWidth(box)

        // masonry boxes
        } else {
          // find the highest point sibling
          let chosen = findHeighestBottom(available);
          // position this box under the chosen box
          box.style.top = chosen.bottom+'px';
          box.style.left = chosen.left+'px';
          // remove the chosen sibling from the available array
          available = available.filter(obj => obj.box !== chosen.box );
        }

        // push current box to the list of available boxes to use for next sibling
        available.push({
          box: index,
          bottom: box.offsetTop + getFullHeight(box),
          left: box.offsetLeft - getMarginLeft(box)
        });

      });

      // update the height of the container
      let containerHeight = getContainerHeight(boxes);
      container.style.height = containerHeight+'px';

    });

  }, (bloxDebounce() + 100) ); // end setupMasonry() using a hard 100ms debounce here, 50 is too small

  /**
   * Handle responsive changes to the masonry boxes
   * @param  {object} event the event
   */
   window.addEventListener('resize', setupMasonry);
   setupMasonry();

});
