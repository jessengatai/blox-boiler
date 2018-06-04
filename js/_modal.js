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
    $(`.bx-modal-bg`).addClass('on');
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
    $(`.bx-modal-bg`).removeClass('on');
    // notify
    return $(window).trigger(`modal-closed:${modalId}`);
  }

  /**
   * Add the correct modal markup for each modal
   */
  const setupModalMarkup = () => {
    let modals = $('.bx-modal');
    $.each(modals,function(index, modal){
      // wrap the modal with an inner wrapper
      $(this).wrapInner('<div class="bx-modal-inner"></div>');
      // setup vars
      let wrapper = $(this).find('.bx-modal-inner');
      let classes = $(this).attr('class').replace('bx-modal','')
      console.log(classes);
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
  $('body').append('<div class="bx-modal-bg"></div>');

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

});
