console.log('boxes loaded');
jQuery(document).ready(function($){

  /**
   * run through the hash functionalty when url hash changes
   */
  const runBoxes = () => {

    // setup some big scope variables
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const objects = $(`[data-classes-tny], [data-classes-sml], [data-classes-med], [data-classes-lrg], [data-classes-xl]`);

    // run through each element that uses responsive classes
    if (objects.length) {
      $.each(objects, function(index,object){

        // get all the classes this element has
        const classesTny = $(object).attr(`data-classes-tny`);
        const classesSml = $(object).attr(`data-classes-sml`);
        const classesMed = $(object).attr(`data-classes-med`);
        const classesLrg = $(object).attr(`data-classes-lrg`);
        const classesXl = $(object).attr(`data-classes-xl`);
        const allClasses = [classesTny, classesSml, classesMed, classesLrg, classesXl].join(' ');

        console.log(allClasses);

        // clean up all the classes
        $(object).removeClass(allClasses)

        // tny classes on
        if( ww <= 599 && classesTny!=='' ) {
          $(object).addClass( $(object).attr('data-classes-tny') );
        }
        // sml classes on
        else if( (ww >= 600 && ww <= 879) && classesSml!=='' ) {
          $(object).addClass( $(object).attr('data-classes-sml') );
        }
        // med classes on
        else if( (ww >= 880 && ww <= 1099) && classesMed!=='' ) {
          $(object).addClass( $(object).attr('data-classes-med') );
        }
        // lrg classes on
        else if( (ww >= 1100 && ww <= 1499) && classesLrg!=='' ) {
          $(object).addClass( $(object).attr('data-classes-lrg') );
        }
        // xl classes on
        else if( ww > 1500 && classesXl!=='' ) {
          $(object).addClass( $(object).attr('data-classes-xl') );
        }

      })
    }

  }

  /**
   * Handle hash changes
   * @param  {object} e the event
   */
  $(window).on('resize', function(e) {
    runBoxes();
  });
  runBoxes();

});
