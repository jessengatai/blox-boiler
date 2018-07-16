document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Run through the hash functionalty when url hash changes
   */
  const runHashes = () => {

    // setup some big scope variables
    let hash = window.location.hash;
    let objectsAll = document.querySelectorAll('[data-hash]');

    // run through hash bound elements
    if( objectsAll.length ) {
      objectsAll.forEach( function(object, index) {

        // bound hash
        let hashBound = object.getAttribute('data-hash');

        // classes
        let hashClassesOn = bloxDataClasses(object, 'data-classes-onhash');
        let hashClassesOff = bloxDataClasses(object, 'data-classes-offhash');

        // callbacks
        let hashCallbackOn = bloxDataCallback(object, 'data-callback-onhash');
        let hashCallbackOff = bloxDataCallback(object, 'data-callback-offhash');

        // clean up the hashes
        if (bloxIsset(hashClassesOn)) {
          object.classList.remove(...hashClassesOn);
        }
        if (bloxIsset(hashClassesOff)) {
          object.classList.remove(...hashClassesOff);
        }

        /*
        HASH CLASSES
         */
        // hash unmatched and classes off
        if( hash!==hashBound && bloxIsset(hashClassesOff) ) {
          object.classList.add(...hashClassesOff);
        // hash matched and classes on
        } else if ( hash===hashBound && bloxIsset(hashClassesOn) ) {
          object.classList.add(...hashClassesOn);
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
            hashCallbackOff( object );
          }

        // has matched and function callback on
        } else if( hash===hashBound && bloxIsset(hashCallbackOn) ) {
          // convert the variable into a function
          hashCallbackOn = eval( bloxSanitize(hashCallbackOn) );
          // if the function exists, run it
          if( typeof hashCallbackOn === "function" ) {
            hashCallbackOn( object );
          }
        }

      });
    }
  }

  /**
   * Handle hash changes
   * @param  {object} event the event
   */
  window.addEventListener('hashchange', runHashes);
  runHashes();

});
