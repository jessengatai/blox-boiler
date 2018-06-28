console.log('boxes loaded');
jQuery(document).ready(function($){

  /**
   * run through the boxes and apply viewport classes
   */
  const runBoxRowClasses = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const boxes = $(`.boxes`);

    // run through each element that uses responsive classes
    if (boxes.length) {
      $.each(boxes, function(index,object){



      })
    }

  }

  /**
   * Handle responsive changes
   * @param  {object} e the event
   */
  $(window).on('resize', function(e) {
    runBoxRowClasses();
  });
  runBoxRowClasses();

});
