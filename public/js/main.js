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
  * Sets up an intersection observer to notify when elements with the class
  * `.sticky_sentinel--top` become visible/invisible at the top of the container.
  * @param {!Element} container
  */
  // The observer is configured with threshold: [0] so its callback fires as soon as the sentinel becomes visible.
  function observeHeaders(container) {
    var observer = new IntersectionObserver(function (records, observer) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = records[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var record = _step.value;

          var targetInfo = record.boundingClientRect;
          var stickyTarget = record.target.parentElement.querySelector('[data-sticky]');
          var rootBoundsInfo = record.rootBounds;

          // make sure we are positioning the top correctly
          var offset = -getOffset(stickyTarget) - getMargin(stickyTarget, 'top') - 1;
          record.target.style.top = offset + 'px';

          // Started sticking.
          if (targetInfo.bottom < rootBoundsInfo.top) {
            if (stickyTarget.classList.contains('sticky-top')) {
              fireEvent(true, stickyTarget);
            } else {
              fireEvent(false, stickyTarget);
            }
          }

          // Stopped sticking.
          if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
            if (stickyTarget.classList.contains('sticky-top')) {
              fireEvent(false, stickyTarget);
            } else {
              fireEvent(true, stickyTarget);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }, { threshold: [0] });

    // Add the top sentinels to each section and attach an observer.
    var sentinels = addSentinels(container, 'sticky_sentinel--top');
    sentinels.forEach(function (el) {
      return observer.observe(el);
    });
  }

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--bottom` become visible/invisible at the bottom of the
   * container.
   * @param {!Element} container
   */
  // The observer is configured with threshold: [1] so its callback fires when the entire node is within view.
  function observeFooters(container) {
    var observer = new IntersectionObserver(function (records, observer) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = records[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var record = _step2.value;

          var targetInfo = record.boundingClientRect;
          var stickyTarget = record.target.parentElement.querySelector('[data-sticky]');
          var rootBoundsInfo = record.rootBounds;
          var ratio = record.intersectionRatio;

          console.log(stickyTarget);

          // make sure we are positioning the bottom correctly
          var offset = getHeight(stickyTarget) + getOffset(stickyTarget) + getMargin(stickyTarget, 'bottom') + 1;
          record.target.style.bottom = offset + 'px';

          // started sticking
          if (targetInfo.bottom > rootBoundsInfo.top && !isInViewport(record.target.previousElementSibling) // check that the top sentinel isn't visible
          && ratio === 1) {
            if (stickyTarget.classList.contains('sticky-top')) {
              fireEvent(true, stickyTarget);
            } else {
              fireEvent(false, stickyTarget);
            }
          }
          // stopped sticking
          if (targetInfo.top < rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
            if (stickyTarget.classList.contains('sticky-top')) {
              fireEvent(false, stickyTarget);
            } else {
              fireEvent(true, stickyTarget);
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }, { threshold: [1] });

    // Add the bottom sentinels to each section and attach an observer.
    var sentinels = addSentinels(container, 'sticky_sentinel--bottom');
    sentinels.forEach(function (el) {
      return observer.observe(el);
    });
  }

  /**
   * @param {!Element} container
   * @param {string} className
   */
  function addSentinels(container, className) {
    return Array.from(container.querySelectorAll('[data-sticky]')).map(function (el) {
      var sentinel = document.createElement('div');
      sentinel.classList.add('sticky_sentinel', className);
      return el.parentElement.appendChild(sentinel);
    });
  }

  /**
   * Dispatches the `sticky-event` custom event on the target element.
   * @param {boolean} stuck True if `target` is sticky.
   * @param {!Element} target Element to fire the event on.
   */
  function fireEvent(stuck, target) {
    var e = new CustomEvent('sticky-change', { detail: { stuck: stuck, target: target } });
    document.dispatchEvent(e);
  }

  /**
   * Return a unique array
   * @param  {Array} arrArg the array to filter
   * @return {Array}        the filters array
   */
  function uniqueArray(arrArg) {
    return arrArg.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  /**
   * Get and return the height of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getHeight(target) {
    var style = window.getComputedStyle(target);
    return parseInt(style.height);
  }

  /**
   * Get and return the top offset of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getOffset(target) {
    var style = window.getComputedStyle(target);
    return parseInt(style.top);
  }

  /**
   * Get and return the bottom margin of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getMargin(target, direction) {
    var style = window.getComputedStyle(target);
    if (direction === 'top') {
      return parseInt(style.marginTop);
    } else {
      return parseInt(style.marginBottom);
    }
  }

  /**
   * Check if an element is within the viewport
   * @param  {[type]} elem [description]
   * @return {[type]}      [description]
   */
  var isInViewport = function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  /**
   * Notifies when elements w/ the `sticky` class begin to stick or stop sticking.
   */
  function observeStickyHeaderChanges() {
    var stickies = document.querySelectorAll('[data-sticky]');
    var containers = [];
    // loop through each sticky and push the parent element to the containers array
    for (var i = 0; i < stickies.length; i++) {
      containers.push(stickies[i].parentElement);
    }
    // make the container array unique
    containers = uniqueArray(containers);
    // create and observe the sentinals for all sticky contains on the page
    for (var i = 0; i < containers.length; i++) {
      // add sticky parent class
      containers[i].classList.add('sticky_parent');
      // add sentinels and setup observers
      observeHeaders(containers[i]);
      observeFooters(containers[i]);
    }
  }
  observeStickyHeaderChanges();

  // huge thanks for this functionalty goes to Eric Bidelman
  // https://developers.google.com/web/updates/2017/09/sticky-headers
  document.addEventListener('sticky-change', function (e) {
    var header = e.detail.target; // header became sticky or stopped sticking.
    var sticking = e.detail.stuck; // true when header is sticky.
    // add classes on stick / unstick
    stickyClasses(header, sticking);
    // fire function on stick / unstick
    stickyFunctions(header, sticking);
    // add hash on stick / unstick
    stickyHashes(header, sticking);
  });

  /**
   * Toggle the sticky classes on and off based on state
   * @param  {element} object   The sticky header elements
   * @param  {bool} sticking    True or false representation of the sticky states
   */
  var stickyClasses = function stickyClasses(object, sticking) {

    // setup sticky classes
    var stickyClassesOn = $(object).attr('data-classes-onstick');
    var stickyClassesOff = $(object).attr('data-classes-offstick');

    // header is sticking
    if (sticking === true) {
      if (bloxIsset(stickyClassesOn)) {
        $(object).addClass(stickyClassesOn);
      }
      if (bloxIsset(stickyClassesOff)) {
        $(object).removeClass(stickyClassesOff);
      }
      // header is no longer sticking
    } else {
      if (bloxIsset(stickyClassesOn)) {
        $(object).removeClass(stickyClassesOn);
      }
      if (bloxIsset(stickyClassesOff)) {
        $(object).addClass(stickyClassesOff);
      }
    }
  };
  var stickyFunctions = function stickyFunctions(header, sticking) {};
  var stickyHashes = function stickyHashes(header, sticking) {};
});

console.log('main loaded');