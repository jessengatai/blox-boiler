console.log('hashes loaded');
jQuery(document).ready(function($){

  /**
   * Check wether a value is set
   * @param {mixed} value Can be anything from a string to an array
   * @return {bool}
   */
  const isset = (value) => {
    return (typeof value != 'undefined' && value) ? true : false ;
  }

  /**
   * Sanitize a string
   * @param  {string} string The string of text to clean
   * @return {string}        The shiny new clean string
   */
  const sanitarize = (string) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }

  /**
   * run through the hash functionalty when url hash changes
   */
  const runHashes = () => {

    // setup some big scope variable daddy's
    let hash = window.location.hash;
    let objectsAll = $(`[data-hash]`);

    // run through hash bound elements
    if( objectsAll.length ) {
      $.each(objectsAll, function(index,object) {

        // bound hash
        let hashBound = $(object).attr('data-hash');

        // classes
        let hashClassesOn = $(object).attr('data-classes-onhash');
        let hashClassesOff = $(object).attr('data-classes-offhash');

        // callbacks
        let hashCallbackOn = $(object).attr('data-callback-onhash');
        let hashCallbackOff = $(object).attr('data-callback-offhash');

        // clean up the hashes
        $(object).removeClass(hashClassesOn).removeClass(hashClassesOff)

        /*
        HASH CLASSES
         */
        // hash unmatched and classes off
        if( hash!==hashBound && isset(hashClassesOff) ) {
          $(object).addClass(hashClassesOff);
        // hash matched and classes on
        } else if ( hash===hashBound && isset(hashClassesOn) ) {
          $(object).addClass(hashClassesOn);
        }

        /*
        HASH CALLBACKS
         */
        // has unmatched and function callback off
        if( hash!==hashBound && isset(hashCallbackOff) ) {
          // conver the variable into a function
          hashCallbackOff = eval( sanitarize(hashCallbackOff) );
          // if the function exists, run it
          if( typeof hashCallbackOff === "function" ) {
            hashCallbackOff( $(object) );
          }

        // has matched and function callback on
        } else if( hash===hashBound && isset(hashCallbackOn) ) {
          // conver the variable into a function
          hashCallbackOn = eval( sanitarize(hashCallbackOn) );
          // if the function exists, run it
          if( typeof hashCallbackOn === "function" ) {
            hashCallbackOn( $(object) );
          }
        }

      });
    }
  }

  /**
   * Handle hash changes
   * @param  {object} e the event
   */
  $(window).on('hashchange', function(e) {
    runHashes()
  });
  runHashes();

});
