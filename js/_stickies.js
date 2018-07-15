jQuery(document).ready(function($){

  // Props and thanks for this functionalty goes to Eric Bidelman
  // https://developers.google.com/web/updates/2017/09/sticky-headers

  const bottomClasses = [
    'sticky-bottom',
    'sticky-bottom--sml-up',
    'sticky-bottom--med-up',
    'sticky-bottom--lrg-up',
    'sticky-bottom--xl-up',
    'sticky-bottom--tny-only',
    'sticky-bottom--sml-only',
    'sticky-bottom--med-only',
    'sticky-bottom--lrg-only',
    'sticky-bottom--xl-only'
  ];

  /**
  * Sets up an intersection observer to notify when elements with the class
  * `.sticky_sentinel--top` become visible/invisible at the top of the container.
  * @param {!Element} container
  */
  const observeHeaders = (container) => {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {
        const sentinel = record.boundingClientRect;
        const sticky = record.target.parentElement.querySelector('[data-sticky]');
        const viewport = record.rootBounds;

        /*
        STICKY BOTTOM
         */
        if ( bloxHasClass(sticky, bottomClasses) ) {

          // position sentinal
          let offset = (getHeight(sticky) + getOffset(sticky,'bottom') + 1)
          record.target.style.top = offset+'px';
          // started sticking.
          if (sentinel.top < viewport.bottom
            && !isInViewport( record.target.nextElementSibling ) // check that the bottom sentinel isn't visible
          ) {
            fireEvent(true, sticky);
          }
          // stopped sticking.
          if (sentinel.top > viewport.bottom) {
            fireEvent(false, sticky);
          }

        /*
        STICKY TOP
         */
        } else {

          // position sentinal
          let offset = (- getOffset(sticky,'top') - getMargin(sticky,'top') - 1)
          record.target.style.top = offset+'px';
          // started sticking.
          if (sentinel.bottom < viewport.top) {
            fireEvent(true, sticky);
          }
          // stopped sticking.
          if (sentinel.bottom >= viewport.top && sentinel.bottom < viewport.bottom) {
            fireEvent(false, sticky);
          }

        }

      }
    }, { threshold: [0] }); // will fire when any part of the senitel comes into view

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
  const observeFooters = (container) => {
    const observer = new IntersectionObserver((records, observer) => {
      for (const record of records) {
        const sentinel = record.boundingClientRect;
        const sticky = record.target.parentElement.querySelector('[data-sticky]');
        const viewport = record.rootBounds;

        /*
        STICKY BOTTOM
         */
        if ( bloxHasClass(sticky, bottomClasses) ) {

          // position sentinal
          let offset = (- getOffset(sticky,'bottom') + getMargin(sticky,'bottom') - 1)
          record.target.style.bottom = offset+'px';
          // started sticking
          if ( sentinel.top > viewport.bottom ) {
            fireEvent(true, sticky);
          }
          // stopped sticking
          if (sentinel.top < viewport.bottom) {
            fireEvent(false, sticky);
          }

        /*
        STICKY TOP
         */
        } else {

          // position sentinal
          let offset = (getHeight(sticky) + getOffset(sticky,'top') + getMargin(sticky,'bottom') + 1)
          record.target.style.bottom = offset+'px';

          // started sticking
          if ( sentinel.top > viewport.top
            && !isInViewport( record.target.previousElementSibling ) // check that the top sentinel isn't visible
          ) {
            fireEvent(true, sticky);
          }
          // stopped sticking
          if (sentinel.top < viewport.top && sentinel.bottom < viewport.bottom) {
            fireEvent(false, sticky);
          }

        }

      }
    }, { threshold: [0] }); // will fire when any part of the senitel comes into view

    // Add the bottom sentinels to each section and attach an observer.
    const sentinels = addSentinels( container, 'sticky_sentinel--bottom');
    sentinels.forEach(el => observer.observe(el));
  }

  /**
   * @param {!Element} container
   * @param {string} className
   */
  const addSentinels = (container, className) => {
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
  const fireEvent = (stuck, target) => {
    const e = new CustomEvent('sticky-change', {detail: {stuck, target}});
    document.dispatchEvent(e);
  }

  /**
   * Return a unique array
   * @param  {Array} arrArg the array to filter
   * @return {Array}        the filters array
   */
  const uniqueArray = (arrArg) => {
    return arrArg.filter(function(elem, pos,arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  /**
   * Get and return the height of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  const getHeight = (target) => {
    const style = window.getComputedStyle(target);
    return parseInt(style.height)
  }

  /**
   * Get and return the top offset of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  const getOffset = (target, direction) => {
    const style = window.getComputedStyle(target);
    if (direction==='top') {
      return parseInt(style.top)
    } else {
      return parseInt(style.bottom)
    }
  }

  /**
   * Get and return the bottom margin of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  const getMargin = (target, direction) => {
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
  const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

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

  /**
   * Fire functions when sticking
   * @param  {element} object   The sticky header elements
   * @param  {bool} sticking    True or false representation of the sticky states
   */
  const stickyCallback = (object,sticking) => {

    // setup sticky classes
    let stickyEventOn = $(object).attr('data-event-onstick');
    let stickyEventOff = $(object).attr('data-event-offstick');

    // callcback to run when sticking
    if( sticking===true && bloxIsset(stickyEventOn) ) {
      $(object).trigger(stickyEventOn, object);
    }

    // callcback to run when not sticking
    if( sticking===false && bloxIsset(stickyEventOff) ) {
      $(object).trigger(stickyEventOff, object);
    }

  }

  /**
   * Notifies when elements w/ the `sticky` class begin to stick or stop sticking.
   */
  const observeStickyHeaderChanges = () => {
    let stickies = document.querySelectorAll('[data-classes-onstick], [data-classes-offstick], [data-event-onstick], [data-event-offstick]');
    let containers = [];

    // add the data-sticky attribute to our sticky elements
    $(stickies).attr('data-sticky','');

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
  // observe on window load (just so the doc has some time to render first)
  observeStickyHeaderChanges();

  /**
   * Listen for our custom event that fires when a sticky changes its state
   * @type {event}
   */
  document.addEventListener('sticky-change', e => {
    // header became sticky or stopped sticking.
    const header = e.detail.target;
    // true when header is sticky.
    const sticking = e.detail.stuck;
    // add classes on stick / unstick
    stickyClasses(header,sticking);
    // fire function on stick / unstick
    stickyCallback(header,sticking);
  });

});
