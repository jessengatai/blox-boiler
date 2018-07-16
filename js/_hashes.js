document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Run through the hash functionality when url hash changes
   */
  const runHashes = bloxDebounce(function() {

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
        let hashEventOn = bloxDataString(object, 'data-event-onhash');
        let hashEventOff = bloxDataString(object, 'data-event-offhash');

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
        if( hash!==hashBound && bloxIsset(hashEventOff) ) {
          const event = new CustomEvent(hashEventOff, {
            detail: {
              target: object,
            }
          });
          document.dispatchEvent(event);

        // has matched and function callback on
        } else if( hash===hashBound && bloxIsset(hashEventOn) ) {
          const event = new CustomEvent(hashEventOn, {
            detail: {
              target: object,
            }
          });
          document.dispatchEvent(event);
        }

      });
    }
  }, bloxDebounceTiming() );

  /**
   * Handle hash changes
   * @param  {object} event the event
   */
  window.addEventListener('hashchange', runHashes);
  runHashes();

});
