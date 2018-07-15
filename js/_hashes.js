jQuery(document).ready(function($){

  /**
   * Run through the hash functionalty when url hash changes
   */
  const runHashes = () => {

    // setup some big scope variables
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
        if( hash!==hashBound && bloxIsset(hashClassesOff) ) {
          $(object).addClass(hashClassesOff);
        // hash matched and classes on
        } else if ( hash===hashBound && bloxIsset(hashClassesOn) ) {
          $(object).addClass(hashClassesOn);
        }

        /*
        HASH CALLBACKS
         */
        // has unmatched and function callback off
        if( hash!==hashBound && bloxIsset(hashCallbackOff) ) {
          // conver the variable into a function
          hashCallbackOff = eval( bloxSanitize(hashCallbackOff) );
          // if the function exists, run it
          if( typeof hashCallbackOff === "function" ) {
            hashCallbackOff( $(object) );
          }

        // has matched and function callback on
        } else if( hash===hashBound && bloxIsset(hashCallbackOn) ) {
          // convert the variable into a function
          hashCallbackOn = eval( bloxSanitize(hashCallbackOn) );
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
    runHashes();
  });
  runHashes();

});
