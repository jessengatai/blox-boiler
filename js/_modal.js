jQuery(document).ready(function($){

  /**
   * Open a modal
   * @param  {object} modal The modal object that we are opening
   * @return {function}     Returns a window trigger that notifies the modal has opened
   */
  const openModal = (modal) => {
    // setup our modal vars
    let modalId = modal.attr('id');
    // add modal open classes
    modal.addClass('on');
    // turn off window scrolling
    $('html,body').css('overflow','hidden');
    // notify
    return $(window).trigger(`modal-opened:${modalId}`);
  }

  /**
   * Close a modal
   * @param  {object} modal The modal object that we are closing
   * @return {function}     Returns a window trigger that notifies the modal has closed
   */
  const closeModal = (modal) => {
    // setup our modal vars
    let modalId = modal.attr('id');
    // add modal open classes
    modal.removeClass('on');
    // turn on window scrolling
    $('html,body').css('overflow','');
    // notify
    return $(window).trigger(`modal-closed:${modalId}`);
  }

  // open a modal via click
  $(document).on('click', '[data-open-modal]', function(){
    let id = $(this).attr('data-open-modal');
    openModal( $(`#${id}`) );
  });

  // close a modal via click
  $(document).on('click', '[data-close-modal]', function(){
    let id = $(this).attr('data-close-modal');
    closeModal( $(`#${id}`) );
  });
  $(document).on('click', '.modal.on', function(){
    if ( !jQuery(event.target).is('.modal.on *') ) {
      let id = $(this).attr('id');
      closeModal( $(`#${id}`) );
    }
  });

  // close a modal via esc key
  $(document).on('keyup', function(e){
    if (e.keyCode == 27 && $('.modal.on').length ) {
      let id = $('.modal.on').attr('id');
      closeModal( $(`#${id}`) );
    }
  });

});
