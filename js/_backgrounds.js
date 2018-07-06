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
    // force position
    // note: only make this happen if it's static (not absolute, fixed etc)
    $(object).addClass('position-relative');
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
    let   color = $(object).attr('data-bg-color');
    let   colorOpacity = $(object).attr('data-bg-color-opacity');
    const image = $(object).attr('data-bg-image');
    const imageOpacity = $(object).attr('data-bg-image-opacity');
    const imageBlend = $(object).attr('data-bg-image-blend');
    const gradStart = $(object).attr('data-bg-gradient-start');
    let   gradEnd = $(object).attr('data-bg-gradient-end');
    let   gradDeg = $(object).attr('data-bg-gradient-rotation');
    let   gradOpacity = $(object).attr('data-bg-gradient-opacity');

    // fallbacks
    color = (!bloxIsset(color)) ? 'transparent' : color ;
    colorOpacity = (!bloxIsset(colorOpacity)) ? 1 : colorOpacity ;
    gradEnd = (!bloxIsset(gradEnd)) ? 'transparent' : gradEnd ;
    gradDeg = (!bloxIsset(gradDeg)) ? 0 : gradDeg ;
    gradOpacity = (!bloxIsset(gradOpacity)) ? 1 : gradOpacity ;

    // setup background color RGBA
    let colorRGBA = w3color(color);
        colorRGBA.opacity = colorOpacity;
        colorRGBA = colorRGBA.toRgbaString();

    // the gradient
    if ( bloxIsset(gradStart) ) {
      divGradient.css({
        backgroundImage: `linear-gradient(${gradDeg}deg, ${gradEnd}, ${gradStart})`,
        opacity: gradOpacity,
      });
    }

    // the image
    // - the color is added here if the image is set, this ensures the blend mode actually works
    if( bloxIsset(image) ) {
      divImage.css({
        backgroundImage: `url(${image})`,
        backgroundBlendMode: imageBlend,
        backgroundColor: colorRGBA,
        opacity: imageOpacity,
      });
      divColor.css('background-color','');

    // the color
    } else if( bloxIsset(colorOpacity) ) {
      divColor.css({
        backgroundColor: colorRGBA,
      });
    }

  }

  /*
  move this into bg.js
   */
  const bloxBackgrounds = () => {

    // setup the smart backgrounds
    const nodes = document.querySelectorAll('[data-bg-image], [data-bg-gradient-start], [data-bg-color]');
    const objects = $(nodes);

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
