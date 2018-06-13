'use strict';

console.log('functions loaded');

/**
 * Give an element a unique id
 * @param {object} el The element that will receive the id
 */
var setBloxId = function setBloxId(el) {
  el.attr('bx-id', Math.random().toString(36).substr(2, 16));
};

console.log('boxes loaded');
jQuery(document).ready(function ($) {});

console.log('hashes loaded');
jQuery(document).ready(function ($) {

  /**
   * Check wether a value is set
   * @param {mixed} value Can be anything from a string to an array
   * @return {bool}
   */
  var isset = function isset(value) {
    return typeof value != 'undefined' && value ? true : false;
  };

  var runHashes = function runHashes() {

    // setup some big scope variable daddy's
    var hash = window.location.hash;
    var objectsAll = $('[data-hash]');

    // run through hash bound elements
    if (objectsAll.length) {
      $.each(objectsAll, function (index, object) {
        var hashBound = $(object).attr('data-hash');
        var hashClassesOn = $(object).attr('data-classes-onhash');
        var hashClassesOff = $(object).attr('data-classes-offhash');

        // clean up the hashes
        $(object).removeClass(hashClassesOn).removeClass(hashClassesOff);

        // hash unmatched
        if (hash !== hashBound && isset(hashClassesOff)) {
          $(object).addClass(hashClassesOff);
        }

        // hash matched
        if (hash === hashBound && isset(hashClassesOn)) {
          $(object).addClass(hashClassesOn);
        }
      });
    }
  };

  /**
   * Handle hash changes
   * @param  {object} e the event
   */
  $(window).on('hashchange', function (e) {
    runHashes();
  });

  runHashes();

  // data-hash="#foo"
  // data-classes-onhash="purple"
  // data-classes-offhash
});

console.log('modal loaded');
jQuery(document).ready(function ($) {

  /**
   * Open a modal
   * @param  {object} modal The modal object that we are opening
   * @return {function}     Returns a window trigger that notifies the modal has opened
   */
  var openModal = function openModal(modal) {
    // setup our modal vars
    var modalId = modal.attr('id');
    // add modal open classes
    modal.addClass('on');
    // turn off window scrolling
    $('html,body').css('overflow', 'hidden');
    // notify
    return $(window).trigger('modal-opened:' + modalId);
  };

  /**
   * Close a modal
   * @param  {object} modal The modal object that we are closing
   * @return {function}     Returns a window trigger that notifies the modal has closed
   */
  var closeModal = function closeModal(modal) {
    // setup our modal vars
    var modalId = modal.attr('id');
    // add modal open classes
    modal.removeClass('on');
    // turn on window scrolling
    $('html,body').css('overflow', '');
    // notify
    return $(window).trigger('modal-closed:' + modalId);
  };

  /**
   * Add the correct modal markup for each modal
   */
  var setupModalMarkup = function setupModalMarkup() {
    var modals = $('.bx-modal');
    $.each(modals, function (index, modal) {
      // $(this).prepend('<div class="bx-modal-bg"></div>');
    });
  };

  // setup the modal markup
  setupModalMarkup();

  // open a modal via click
  $(document).on('click', '[data-open-modal]', function () {
    var id = $(this).attr('data-open-modal');
    openModal($('#' + id));
  });

  // close a modal via click
  $(document).on('click', '[data-close-modal]', function () {
    var id = $(this).attr('data-close-modal');
    closeModal($('#' + id));
  });
  $(document).on('click', '.bx-modal.on', function () {
    if (!jQuery(event.target).is('.bx-modal.on *')) {
      var id = $(this).attr('id');
      closeModal($('#' + id));
    }
  });

  // close a modal via esc key
  $(document).on('keyup', function (e) {
    if (e.keyCode == 27 && $('.bx-modal.on').length) {
      var id = $('.bx-modal.on').attr('id');
      closeModal($('#' + id));
    }
  });
});

console.log('slider loaded');

console.log('main loaded');