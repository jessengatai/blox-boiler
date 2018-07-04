console.log('backgrounds loaded');
jQuery(document).ready(function($){

  /**
   * Setup the base divs for our smart backgrounds
   * @param  {object} object The background parent
   */
  const bloxSetupBackground = (object) => {
    const divColor = $(`<div class="bg-color"></div>`);
    const divImage = $(`<div class="bg-image"></div>`);
    const divGradient = $(`<div class="bg-gradient"></div>`);

    // prepend new divs
    $(object).prepend( divColor, divImage, divGradient );

  }

  /**
   * Update the backgrounds for our smart backgrounds
   * @param  {object} object The background parent
   */
  const bloxUpdateBackground = (object) => {
    // divs
    const divColor = $(object).children('.bg-color');
    const divImage = $(object).children('.bg-image');
    const divGradient = $(object).children('.bg-gradient');

    // attributes
    const color = $(object).css('background-color');
    let   colorOpacity = $(object).attr('data-bg-color-opacity');
    const image = $(object).attr('data-bg-image');
    const imageOpacity = $(object).attr('data-bg-image-opacity');
    const imageBlend = $(object).attr('data-bg-image-blend');
    const gradStart = $(object).attr('data-bg-gradient-start');
    const gradEnd = $(object).attr('data-bg-gradient-end');
    const gradDeg = $(object).attr('data-bg-gradient-deg');
    const gradOpacity = $(object).attr('data-bg-gradient-opacity');

    // fallbacks
    colorOpacity = (!bloxIsset(colorOpacity)) ? 1 : colorOpacity ;

    // clean up
    $(object).addClass('position-relative');
    $(object).css('background-color','transparent');

    // the gradient
    if ( bloxIsset(gradStart) ) {
      divGradient.css({
        backgroundImage: `linear-gradient(${gradDeg}deg, ${gradStart}, ${gradEnd})`,
        opacity: gradOpacity,
      });
    }

    // the image
    // - the color is added here if the image is set, this ensures the blend mode actually works
    if( bloxIsset(image) ) {
      divImage.css({
        backgroundImage: `url(${image})`,
        backgroundBlendMode: imageBlend,
        backgroundColor: color.replace(/(?=\))/, ', '+colorOpacity),
        opacity: imageOpacity,
      });
      divColor.css('background-color','');

    // the color
    } else if( bloxIsset(colorOpacity) ) {
      divColor.css({
        backgroundColor: color.replace(/(?=\))/, ', '+colorOpacity),
      });
    }

  }

  /*
  move this into bg.js
   */
  const bloxBackgrounds = () => {

    // setup the smart backgrounds
    const nodes = document.querySelectorAll('[data-bg-image], [data-bg-gradient-start], [data-bg-color-opacity]');
    const objects = $(nodes);

    console.log(nodes);

    // loop through each smart background and setup the html
    $.each(objects, function(index,object){
      // setup base html
      bloxSetupBackground(object);
      // update the styles
      bloxUpdateBackground(object);
    });

    // listen for changes on or backgrounds
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        bloxUpdateBackground( mutation.target );
        console.log('attribute change observed');
      });
    });

    // starts listening for changes on our backgrounds
    for (var i = 0; i < nodes.length; i++) {
      mutationObserver.observe(nodes[i], {
        attributes: true,
        attributeOldValue: true
      });
    }

  }
  bloxBackgrounds();

});
