console.log('boxes loaded');
jQuery(document).ready(function($){

  /**
   * run through the boxes and apply row classes
   */
  const runBoxRowClasses = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const boxContainers = $(`.boxes[data-rowclasses]`);

    // run through each element that uses responsive classes
    if (boxContainers.length) {
      $.each(boxContainers, function(index,object){

        // get the width of the container and setup the children
        const children = $(object).children('.box');
        const lastChild = children.last();
        let rowCount = 0;

        // clean up the .row-x classes
        children.removeClass(function (index, className) {
          return (className.match (/(^|\s)row-\S+/g) || []).join(' ');
        });

        // run through each box and apply row class
        $.each(children, function(index,box){
          const currentNode = $(box).get();
          const previousNode = $(box).prev().get();

          // check if we are on a new row
          if (
            // if this is the first box
            $(box).is(':first-child')
            // or if the top offset of this box doesn't match the previous siblings offset
            || currentNode[0].offsetTop !== previousNode[0].offsetTop
          ) {
            rowCount++;
          }

          // check if this box is in the last row
          if( currentNode[0].offsetTop === lastChild[0].offsetTop ) {
            $(box).addClass('row-last');
          }

          // add our class!
          $(box).addClass(`row-${rowCount}`);

        }) // end each .box
      }) // end each .boxes
    }// end .boxes exist check
  } // end runBoxRowClasses()

  /**
   * Handle responsive changes
   * @param  {object} e the event
   */
  $(window).on('resize', function(e) {
    runBoxRowClasses();
  });
  runBoxRowClasses();

});
