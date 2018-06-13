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

  const runHashes = () => {

    // setup some big scope variable daddy's
    let hash = window.location.hash;
    let objectsAll = $(`[data-hash]`);

    // run through hash bound elements
    if( objectsAll.length ) {
      $.each(objectsAll, function(index,object) {
        let hashBound = $(object).attr('data-hash');
        let hashClassesOn = $(object).attr('data-classes-onhash');
        let hashClassesOff = $(object).attr('data-classes-offhash');

        // clean up the hashes
        $(object).removeClass(hashClassesOn).removeClass(hashClassesOff)

        // hash unmatched
        if( hash!==hashBound && isset(hashClassesOff) ) {
          $(object).addClass(hashClassesOff);
        }

        // hash matched
        if( hash===hashBound && isset(hashClassesOn) ) {
          $(object).addClass(hashClassesOn);
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

  // data-hash="#foo"
  // data-classes-onhash="purple"
  // data-classes-offhash

});
