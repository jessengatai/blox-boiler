console.log('stickies loaded');
jQuery(document).ready(function($){

  /**
  * Sets up an intersection observer to notify when elements with the class
  * `.sticky_sentinel--top` become visible/invisible at the top of the container.
  * @param {!Element} container
  */
  // The observer is configured with threshold: [0] so its callback fires as soon as the sentinel becomes visible.
  function observeHeaders(container) {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement.querySelector('[data-sticky]');
        const rootBoundsInfo = record.rootBounds;

        // make sure we are positioning the top correctly
        let offset = (- getOffset(stickyTarget) - getMargin(stickyTarget,'top') - 1)
        record.target.style.top = offset+'px';

        // Started sticking.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          if ( stickyTarget.classList.contains('sticky-top') ) {
            fireEvent(true, stickyTarget);
          } else {
            fireEvent(false, stickyTarget);
          }
        }

        // Stopped sticking.
        if (targetInfo.bottom >= rootBoundsInfo.top &&
            targetInfo.bottom < rootBoundsInfo.bottom) {
              if ( stickyTarget.classList.contains('sticky-top') ) {
                fireEvent(false, stickyTarget);
              } else {
                fireEvent(true, stickyTarget);
              }
        }
      }
    }, {threshold: [0] });

    // Add the top sentinels to each section and attach an observer.
    const sentinels = addSentinels( container, 'sticky_sentinel--top');
    sentinels.forEach(el => observer.observe(el));
  }

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--bottom` become visible/invisible at the bottom of the
   * container.
   * @param {!Element} container
   */
  // The observer is configured with threshold: [1] so its callback fires when the entire node is within view.
  function observeFooters(container) {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement.querySelector('[data-sticky]');
        const rootBoundsInfo = record.rootBounds;
        const ratio = record.intersectionRatio;

        console.log(stickyTarget);

        // make sure we are positioning the bottom correctly
        let offset = (getHeight(stickyTarget) + getOffset(stickyTarget) + getMargin(stickyTarget,'bottom') + 1)
        record.target.style.bottom = offset+'px';

        // started sticking
        if (
          targetInfo.bottom > rootBoundsInfo.top
          && !isInViewport( record.target.previousElementSibling ) // check that the top sentinel isn't visible
          && ratio === 1
        ) {
          if ( stickyTarget.classList.contains('sticky-top') ) {
            fireEvent(true, stickyTarget);
          } else {
            fireEvent(false, stickyTarget);
          }
        }
        // stopped sticking
        if (targetInfo.top < rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
          if ( stickyTarget.classList.contains('sticky-top') ) {
            fireEvent(false, stickyTarget);
          } else {
            fireEvent(true, stickyTarget);
          }
        }

      }
    }, { threshold: [1] });

    // Add the bottom sentinels to each section and attach an observer.
    const sentinels = addSentinels( container, 'sticky_sentinel--bottom');
    sentinels.forEach(el => observer.observe(el));
  }

  /**
   * @param {!Element} container
   * @param {string} className
   */
  function addSentinels(container, className) {
    return Array.from(container.querySelectorAll('[data-sticky]')).map(el => {
      const sentinel = document.createElement('div');
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
    const e = new CustomEvent('sticky-change', {detail: {stuck, target}});
    document.dispatchEvent(e);
  }

  /**
   * Return a unique array
   * @param  {Array} arrArg the array to filter
   * @return {Array}        the filters array
   */
  function uniqueArray (arrArg) {
    return arrArg.filter(function(elem, pos,arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  /**
   * Get and return the height of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getHeight(target) {
    const style = window.getComputedStyle(target);
    return parseInt(style.height)
  }

  /**
   * Get and return the top offset of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getOffset(target) {
    const style = window.getComputedStyle(target);
    return parseInt(style.top)
  }

  /**
   * Get and return the bottom margin of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  function getMargin(target, direction) {
    const style = window.getComputedStyle(target);
    if (direction==='top') {
      return parseInt(style.marginTop)
    } else {
      return parseInt(style.marginBottom)
    }
  }



  /**
   * Check if an element is within the viewport
   * @param  {[type]} elem [description]
   * @return {[type]}      [description]
   */
  var isInViewport = function (elem) {
      var bounding = elem.getBoundingClientRect();
      return (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  };

  /**
   * Notifies when elements w/ the `sticky` class begin to stick or stop sticking.
   */
  function observeStickyHeaderChanges() {
    let stickies = document.querySelectorAll('[data-sticky]');
    let containers = [];
    // loop through each sticky and push the parent element to the containers array
    for (var i = 0; i < stickies.length; i++) {
      containers.push(stickies[i].parentElement)
    }
    // make the container array unique
    containers = uniqueArray(containers);
    // create and observe the sentinals for all sticky contains on the page
    for (var i = 0; i < containers.length; i++) {
      // add sticky parent class
      containers[i].classList.add('sticky_parent');
      // add sentinels and setup observers
      observeHeaders( containers[i] );
      observeFooters( containers[i] );
    }
  }
  observeStickyHeaderChanges();

  // huge thanks for this functionalty goes to Eric Bidelman
  // https://developers.google.com/web/updates/2017/09/sticky-headers
  document.addEventListener('sticky-change', e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    // add classes on stick / unstick
    stickyClasses(header,sticking);
    // fire function on stick / unstick
    stickyFunctions(header,sticking);
    // add hash on stick / unstick
    stickyHashes(header,sticking);
  });

  /**
   * Toggle the sticky classes on and off based on state
   * @param  {element} object   The sticky header elements
   * @param  {bool} sticking    True or false representation of the sticky states
   */
  const stickyClasses = (object,sticking) => {

    // setup sticky classes
    let stickyClassesOn = $(object).attr('data-classes-onstick');
    let stickyClassesOff = $(object).attr('data-classes-offstick');

    // header is sticking
    if( sticking===true ) {
      if ( bloxIsset(stickyClassesOn) ) {
        $(object).addClass(stickyClassesOn);
      }
      if ( bloxIsset(stickyClassesOff) ) {
        $(object).removeClass(stickyClassesOff);
      }
    // header is no longer sticking
    } else {
      if ( bloxIsset(stickyClassesOn) ) {
        $(object).removeClass(stickyClassesOn);
      }
      if ( bloxIsset(stickyClassesOff) ) {
        $(object).addClass(stickyClassesOff);
      }
    }

  }
  const stickyFunctions = (header,sticking) => {

  }
  const stickyHashes = (header,sticking) => {

  }

});
