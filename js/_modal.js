document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Open a modal
   * @param  {object} modal The modal object that we are opening
   * @return {function}     Returns a window trigger that notifies the modal has opened
   */
  const openModal = (modal) => {
    // setup our modal vars
    let modalId = modal.id;
    let wraps = document.querySelectorAll('html,body');
    // add modal open classes
    modal.classList.add('on');
    // turn off window scrolling
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].style.overflow = 'hidden';
    }
    // notify
    let event = new CustomEvent(`modal-opened:${modalId}`);
    return window.dispatchEvent(event);
  }

  /**
   * Close a modal
   * @param  {object} modal The modal object that we are closing
   * @return {function}     Returns a window trigger that notifies the modal has closed
   */
  const closeModal = (modal) => {
    // setup our modal vars
    let modalId = modal.id;
    let wraps = document.querySelectorAll('html,body');
    // add modal open classes
    modal.classList.remove('on');
    // turn on window scrolling
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].style.overflow = '';
    }
    // notify
    let event = new CustomEvent(`modal-closed:${modalId}`);
    return window.dispatchEvent(event);
  }

  // open a modal via click
  let openClicks = document.querySelectorAll('[data-open-modal]')
  openClicks.forEach( function(el) {
    el.addEventListener('click', function(event) {
      let id = event.target.getAttribute('data-open-modal');
      let m = document.querySelector(`#${id}`);
      openModal(m);
    });
  });

  // close a modal via direct close click
  let closeClicks = document.querySelectorAll('[data-close-modal]')
  closeClicks.forEach( function(el) {
    el.addEventListener('click', function(event) {
      let id = event.target.getAttribute('data-close-modal');
      let m = document.querySelector(`#${id}`);
      closeModal(m);
    });
  });

  // close modal via clicking modal backdrop
  let closeBG = document.querySelectorAll('.modal');
  closeBG.forEach( function(el) {
    el.addEventListener('click', function(event) {
      // only close if the event target is the modal background
      if ( event.target === el && el.classList.contains('on') ) {
        closeModal(el);
      }
    });
  });

  // close modal via hitting the escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    let modalOn = document.querySelector('.modal.on');
    if ( evt.keyCode == 27 && bloxIsset(modalOn) ) {
      closeModal(modalOn);
    }
  };

});
