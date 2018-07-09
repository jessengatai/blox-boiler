console.log('responsive loaded');
jQuery(document).ready(function($){


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


  const runComponentClasses = () => {

    // setup the smart backgrounds
    const nodes = document.querySelectorAll('[data-classes-tall], [data-classes-wide], [data-classes-square], [data-responsive-component]');
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

    // const ro = new ResizeObserver(entries => {
    //   for (let entry of entries) {
    //     entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
    //   }
    // });
    // // Only observe the second box
    // ro.observe(document.querySelector('.box:nth-child(2)'));


  }
  runComponentClasses();




  /**
   * run through the boxes and apply viewport classes
   */
  const runViewportClasses = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const responsiveClasses = $(`[data-classes-tny], [data-classes-sml], [data-classes-med], [data-classes-lrg], [data-classes-xl]`);

    // run through each element that uses responsive classes
    if (responsiveClasses.length) {
      $.each(responsiveClasses, function(index,object){

        // get all the classes this element has
        const classesTny = $(object).attr(`data-classes-tny`);
        const classesSml = $(object).attr(`data-classes-sml`);
        const classesMed = $(object).attr(`data-classes-med`);
        const classesLrg = $(object).attr(`data-classes-lrg`);
        const classesXl = $(object).attr(`data-classes-xl`);
        const allClasses = [classesTny, classesSml, classesMed, classesLrg, classesXl].join(' ');

        // tny classes on
        if(
          ww <= 599
          && classesTny!==''
          && !$(object).hasClass(classesTny)
        ) {
            $(object).removeClass(allClasses).addClass( classesTny );
        }
        // sml classes on
        else if(
          (ww >= 600 && ww <= 879)
          && classesSml!==''
          && !$(object).hasClass(classesSml)
        ) {
            $(object).removeClass(allClasses).addClass( classesSml );
        }
        // med classes on
        else if(
          (ww >= 880 && ww <= 1099)
          && classesMed!==''
          && !$(object).hasClass(classesMed)
        ) {
            $(object).removeClass(allClasses).addClass( classesMed );
        }
        // lrg classes on
        else if(
          (ww >= 1100 && ww <= 1499)
          && classesLrg!==''
          && !$(object).hasClass(classesLrg)
        ) {
            $(object).removeClass(allClasses).addClass( classesLrg );
        }
        // xl classes on
        else if(
          ww > 1500 && classesXl!==''
          && !$(object).hasClass(classesXl)
        ) {
            $(object).removeClass(allClasses).addClass( classesXl );
        }

      })
    }

  }

  /**
   * Handle responsive changes
   * @param  {object} e the event
   */
  $(window).on('resize', function(e) {
    runViewportClasses();
  });
  runViewportClasses();

});
