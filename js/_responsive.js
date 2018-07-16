document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Update classes on componenent resize elements
   * @param {object} object The element that we are updating
   * @param {string} size   The size we are updating to (wide, tall, square)
   */
  const setComponentClasses = (object, size) => {

    // setup components
    const componentId = object.id
    const classesWide = bloxDataClasses(object, 'data-classes-wide');
    const classesTall = bloxDataClasses(object, 'data-classes-tall');
    const classesSquare = bloxDataClasses(object, 'data-classes-square');
    const allClasses = [].concat(classesWide, classesTall, classesSquare).filter(function(n){ return n != undefined });
    const utilClasses = ['isTall', 'isWide', 'isSquare'];

    // clean up all the classes on the object and return it
    const cleanUp = () => {
      object.classList.remove(...utilClasses);
      object.classList.remove(...allClasses);
      return object;
    }

    // fire the event trigger for this component
    const fireUp = () => {
      if ( bloxIsset(componentId) ) {
        return $(window).trigger(`component-resized:${componentId}`);
      }
    }

    /*
    WIDE CLASSES
     */
    if ( size=='wide' && !bloxHasClass(object,'isWide') ){
      cleanUp().classList.add('isWide');
      fireUp();
      // handle custom classes
      if( bloxIsset( classesWide ) ) {
        object.classList.add(...classesWide);
      }

    /*
    TALL CLASSES
     */
    } else if ( size=='tall' && !bloxHasClass(object,'isTall') ){
      cleanUp().classList.add('isTall');
      fireUp();
      // handle custom classes
      if( bloxIsset( classesTall ) ) {
        object.classList.add(...classesTall);
      }

    // square
    } else if ( size=='square' && !bloxHasClass(object,'isSquare') ){
      cleanUp().classList.add('isSquare');
      fireUp();
      // handle custom classes
      if( bloxIsset( classesSquare ) ) {
        object.classList.add(...classesSquare);
      }
    }
  }

  /**
   * Our responsive componenent wrapper function
   * - sets up the resize observer we use to listen for element changes
   * @return {[type]} [description]
   */
  const runComponentClasses = () => {

    // setup the smart backgrounds
    const nodes = document.querySelectorAll('[data-classes-tall], [data-classes-wide], [data-classes-square], [data-responsive]');

    // listen for resize changes and update the classes accordingly
    var ro = new ResizeObserver(function(elements) {
      elements.forEach(function(element) {
        let width = element.contentRect.width;
        let height = element.contentRect.height;
        // wide (is 1.04 times wider than tall)
        if( width > Math.pow(height, 1.04) ) {
          setComponentClasses(element.target, 'wide');
        // tall (is 1.03 times taller than wide)
        } else if( height > Math.pow(width, 1.03) ) {
          setComponentClasses(element.target, 'tall');
        // square (tall and wide are too close)
        } else {
          setComponentClasses(element.target, 'square');
        }
      });
    });

    // starts listening for changes on our backgrounds
    for (var i = 0; i < nodes.length; i++) {
      ro.observe(nodes[i]);
    }
  }

  /**
   * Our responsive viewport wrapper function
   * - sets up viewport repsonsive classes and listens for changes
   */
  const runViewportClasses = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const responsiveClasses = document.querySelectorAll(`[data-classes-tny], [data-classes-sml], [data-classes-med], [data-classes-lrg], [data-classes-xl]`);

    // run through each element that uses responsive classes
    if (responsiveClasses.length) {
      responsiveClasses.forEach(function(object, index){

        // get all the classes this element has
        const classesTny = bloxDataClasses(object, `data-classes-tny`);
        const classesSml = bloxDataClasses(object, `data-classes-sml`);
        const classesMed = bloxDataClasses(object, `data-classes-med`);
        const classesLrg = bloxDataClasses(object, `data-classes-lrg`);
        const classesXl = bloxDataClasses(object, `data-classes-xl`);
        const allClasses = [].concat(classesTny, classesSml, classesMed, classesLrg, classesXl).filter(function(n){ return n != undefined });

        // clean up all classes on the object that have been specified
        const cleanUpClasses = () => {
          object.classList.remove(...allClasses);
        }

        // tny classes on
        if( ww <= 599 && !bloxHasClass(object, classesTny) ) {
          cleanUpClasses();
          if (bloxIsset(classesTny)) {
            object.classList.add(...classesTny);
          }

        // sml classes on
        } else if( (ww >= 600 && ww <= 879) && !bloxHasClass(object, classesSml) ) {
          cleanUpClasses();
          if (bloxIsset(classesSml)) {
            object.classList.add(...classesSml);
          }
        // med classes on
        } else if( (ww >= 880 && ww <= 1099) && !bloxHasClass(object, classesMed) ) {
          cleanUpClasses();
          if (bloxIsset(classesMed)) {
            object.classList.add(...classesMed);
          }
        // lrg classes on
        } else if( (ww >= 1100 && ww <= 1499) && !bloxHasClass(object, classesLrg) ) {
          cleanUpClasses();
          if (bloxIsset(classesLrg)) {
            object.classList.add(...classesLrg);
          }
        // xl classes on
        } else if( ww > 1500 && !bloxHasClass(object, classesXl) ) {
          cleanUpClasses();
          if (bloxIsset(classesXl)) {
            object.classList.add(...classesXl);
          }
        }

      })
    } // end responsiveClasses.length check
  }

  /**
   * Handle responsive changes
   * @param  {event} event the event
   */
  window.onresize = function(event) {
    runViewportClasses();
  };
  runViewportClasses();

  /**
   * Handle responsive component changes
   */
  runComponentClasses();

});
