console.log('modal loaded');
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
    $(`[bx-modal-bg]`).addClass('on');
    // update the url hash
    window.location.hash = `#${modalId}`;
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
    $(`[bx-modal-bg]`).removeClass('on');
    // update the url hash
    removeHash();
    // notify
    return $(window).trigger(`modal-closed:${modalId}`);
  }

  // setup modals
  let modals = $('[bx-modal]');
  let hashes = [];

  // give the modals unique ids & setup hashes
  modals.each(function(){
    setBloxId( $(this) );
    let id = $(this).attr('id');
    hashes.push(`#${id}`);
  });

  // add the modal background dynamically
  $('body').append('<div bx-modal-bg></div>');

  // open a modal via hash (on document ready)
  if( $.inArray( window.location.hash, hashes ) > -1 ) {
    openModal($(window.location.hash));
  }

  // open a modal via click
  $(document).on('click', '[bx-open-modal]', function(){
    let id = $(this).attr('bx-open-modal');
    openModal( $(`#${id}`) );
  });

  // close a modal via click
  $(document).on('click', '[bx-close-modal]', function(){
    let id = $(this).attr('bx-close-modal');
    closeModal( $(`#${id}`) );
  });

});
