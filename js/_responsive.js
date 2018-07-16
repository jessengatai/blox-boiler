jQuery(document).ready(function($){

  /**
   * Update classes on componenent resize elements
   * @param {object} object The element that we are updating
   * @param {string} size   The size we are updating to (wide, tall, square)
   */
  const setComponentClasses = (object, size) => {
    const componentId = $(object).attr('id');
    const classesWide = $(object).attr('data-classes-wide');
    const classesTall = $(object).attr('data-classes-tall');
    const classesSquare = $(object).attr('data-classes-square');
    const allClasses = [classesWide, classesTall, classesSquare].join(' ');
    const utilClasses = 'isTall isWide isSquare';

    // clean up all the classes on the object
    const cleanUp = () => {
      // handle the util classes
      $(object).removeClass(utilClasses);
      // clean up the custom classes
      $(object).removeClass(allClasses);
      // return the object
      return $(object);
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
    if ( size=='wide' && !$(object).hasClass('isWide') ){
      cleanUp().addClass('isWide');
      fireUp();
      // handle custom classes
      if( bloxIsset( classesWide ) ) {
        $(object).addClass( classesWide );
      }

    /*
    TALL CLASSES
     */
    } else if ( size=='tall' && !$(object).hasClass('isTall') ){
      cleanUp().addClass('isTall');
      fireUp();
      // handle the custom classes
      if( bloxIsset( classesTall ) ) {
        $(object).addClass( classesTall );
      }

    // square
      } else if ( size=='square' && !$(object).hasClass('isSquare') ){
      cleanUp().addClass('isSquare');
      fireUp();
      // handle the custom classes
      if( bloxIsset( classesSquare ) ) {
        $(object).addClass( classesSquare );
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
    const objects = $(nodes);

    // listen for resize changes and update the classes accordingly
    var ro = new ResizeObserver(function(elements) {
      elements.forEach(function(element) {

        let width = element.contentRect.width;
        let height = element.contentRect.height;

        if( width > Math.pow(height, 1.04) ) {
          setComponentClasses(element.target, 'wide');

        } else if( height > Math.pow(width, 1.03) ) {
          setComponentClasses(element.target, 'tall');

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
  runComponentClasses();

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

        const cleanUpClasses = () => {
          console.log('classes cleaned up');
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

});
