'use strict';

console.log('functions loaded');

/**
 * Give an element a unique id
 * @param {object} el The element that will receive the id
 */
var bloxSetId = function bloxSetId(el) {
  el.attr('bx-id', Math.random().toString(36).substr(2, 16));
};

/**
 * Check wether a value is set
 * @param {mixed} value Can be anything from a string to an array
 * @return {bool}
 */
var bloxIsset = function bloxIsset(value) {
  return typeof value != 'undefined' && value ? true : false;
};

/**
 * Sanitize a string
 * @param  {string} string The string of text to clean
 * @return {string}        The shiny new clean string
 */
var bloxSanitize = function bloxSanitize(string) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  var reg = /[&<>"'/]/ig;
  return string.replace(reg, function (match) {
    return map[match];
  });
};

console.log('boxes loaded');
jQuery(document).ready(function ($) {});

console.log('hashes loaded');
jQuery(document).ready(function ($) {

  /**
   * run through the hash functionalty when url hash changes
   */
  var runHashes = function runHashes() {

    // setup some big scope variable daddy's
    var hash = window.location.hash;
    var objectsAll = $('[data-hash]');

    // run through hash bound elements
    if (objectsAll.length) {
      $.each(objectsAll, function (index, object) {

        // bound hash
        var hashBound = $(object).attr('data-hash');

        // classes
        var hashClassesOn = $(object).attr('data-classes-onhash');
        var hashClassesOff = $(object).attr('data-classes-offhash');

        // callbacks
        var hashCallbackOn = $(object).attr('data-callback-onhash');
        var hashCallbackOff = $(object).attr('data-callback-offhash');

        // clean up the hashes
        $(object).removeClass(hashClassesOn).removeClass(hashClassesOff);

        /*
        HASH CLASSES
         */
        // hash unmatched and classes off
        if (hash !== hashBound && bloxIsset(hashClassesOff)) {
          $(object).addClass(hashClassesOff);
          // hash matched and classes on
        } else if (hash === hashBound && bloxIsset(hashClassesOn)) {
          $(object).addClass(hashClassesOn);
        }

        /*
        HASH CALLBACKS
         */
        // has unmatched and function callback off
        if (hash !== hashBound && bloxIsset(hashCallbackOff)) {
          // conver the variable into a function
          hashCallbackOff = eval(bloxSanitize(hashCallbackOff));
          // if the function exists, run it
          if (typeof hashCallbackOff === "function") {
            hashCallbackOff($(object));
          }

          // has matched and function callback on
        } else if (hash === hashBound && bloxIsset(hashCallbackOn)) {
          // conver the variable into a function
          hashCallbackOn = eval(bloxSanitize(hashCallbackOn));
          // if the function exists, run it
          if (typeof hashCallbackOn === "function") {
            hashCallbackOn($(object));
          }
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

console.log('stickies loaded');
jQuery(document).ready(function ($) {

  /**
   * run through the hash functionalty when url hash changes
   */
  var runHashes = function runHashes() {

    // setup some big scope variable daddy's
    var hash = window.location.hash;
    var objectsAll = $('[data-hash]');

    // run through hash bound elements
    if (objectsAll.length) {
      $.each(objectsAll, function (index, object) {

        // bound hash
        var hashBound = $(object).attr('data-hash');

        // classes
        var hashClassesOn = $(object).attr('data-classes-onhash');
        var hashClassesOff = $(object).attr('data-classes-offhash');

        // callbacks
        var hashCallbackOn = $(object).attr('data-callback-onhash');
        var hashCallbackOff = $(object).attr('data-callback-offhash');

        // clean up the hashes
        $(object).removeClass(hashClassesOn).removeClass(hashClassesOff);

        /*
        HASH CLASSES
         */
        // hash unmatched and classes off
        if (hash !== hashBound && bloxIsset(hashClassesOff)) {
          $(object).addClass(hashClassesOff);
          // hash matched and classes on
        } else if (hash === hashBound && bloxIsset(hashClassesOn)) {
          $(object).addClass(hashClassesOn);
        }

        /*
        HASH CALLBACKS
         */
        // has unmatched and function callback off
        if (hash !== hashBound && bloxIsset(hashCallbackOff)) {
          // conver the variable into a function
          hashCallbackOff = eval(bloxSanitize(hashCallbackOff));
          // if the function exists, run it
          if (typeof hashCallbackOff === "function") {
            hashCallbackOff($(object));
          }

          // has matched and function callback on
        } else if (hash === hashBound && bloxIsset(hashCallbackOn)) {
          // conver the variable into a function
          hashCallbackOn = eval(bloxSanitize(hashCallbackOn));
          // if the function exists, run it
          if (typeof hashCallbackOn === "function") {
            hashCallbackOn($(object));
          }
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
});

console.log('main loaded');