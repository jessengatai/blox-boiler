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

  /**
   * Add the correct modal markup for each modal
   */
  const setupModalMarkup = () => {
    let modals = $('.bx-modal');
    $.each(modals,function(index, modal){
      // $(this).prepend('<div class="bx-modal-bg"></div>');
    });
  }

  // setup the modal markup
  setupModalMarkup();

  // give the modals unique ids & setup hashes
  // modals.each(function(){
  //   setBloxId( $(this) );
  //   let id = $(this).attr('id');
  //   hashes.push(`#${id}`);
  // });

  // add the modal background dynamically

  // open a modal via hash (on document ready)
  // if( $.inArray( window.location.hash, hashes ) > -1 ) {
  //   openModal($(window.location.hash));
  // }

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
  $(document).on('click', '.bx-modal.on', function(){
    if ( !jQuery(event.target).is('.bx-modal.on *') ) {
      let id = $(this).attr('id');
      closeModal( $(`#${id}`) );
    }
  });

  // close a modal via esc key
  $(document).on('keyup', function(e){
    if (e.keyCode == 27 && $('.bx-modal.on').length ) {
      let id = $('.bx-modal.on').attr('id');
      closeModal( $(`#${id}`) );
    }
  });

});
