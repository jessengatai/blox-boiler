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
    $(object).addClass('position-relative overflow-hidden');
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
    let color = $(object).attr('data-bg-color');
    let colorOpacity = $(object).attr('data-bg-color-opacity');
    let image = $(object).attr('data-bg-image');
    let imageOpacity = $(object).attr('data-bg-image-opacity');
    let imageBlend = $(object).attr('data-bg-image-blend');
    let imageBlur = $(object).attr('data-bg-image-blur');
    let gradStart = $(object).attr('data-bg-gradient-start');
    let gradEnd = $(object).attr('data-bg-gradient-end');
    let gradDeg = $(object).attr('data-bg-gradient-rotation');
    let gradOpacity = $(object).attr('data-bg-gradient-opacity');

    // color fallbacks
    color = (!bloxIsset(color)) ? 'transparent' : color ;
    colorOpacity = (!bloxIsset(colorOpacity)) ? 1 : Number(colorOpacity) ;
    // image fallbacks
    imageOpacity = (!bloxIsset(imageOpacity)) ? 1 : Number(imageOpacity) ;
    imageBlend = (!bloxIsset(imageBlend)) ? 'normal' : imageBlend ;
    imageBlur = (!bloxIsset(imageBlur)) ? 0 : Number(imageBlur) ;
    // grad fallbacks
    gradEnd = (!bloxIsset(gradEnd)) ? 'transparent' : gradEnd ;
    gradDeg = (!bloxIsset(gradDeg)) ? 0 : Number(gradDeg) ;
    gradOpacity = (!bloxIsset(gradOpacity)) ? 1 : Number(gradOpacity) ;

    // setup background color RGBA string
    let colorRGBA = w3color(color);
        colorRGBA.opacity = colorOpacity;
        colorRGBA = colorRGBA.toRgbaString();

    // the gradient
    if ( bloxIsset(gradStart) ) {
      divGradient.css({
        backgroundImage: `linear-gradient(${gradDeg}deg, ${gradEnd}, ${gradStart})`,
        opacity: gradOpacity,
      });
    } else {
      divGradient.attr('style','');
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

      // if blur is on
      if( imageBlur > 0 ) {
        divImage.css({
          filter: `blur(${imageBlur}px)`,
          top: `-${(imageBlur * 1.5)}px`,
          bottom: `-${(imageBlur * 1.5)}px`,
          left: `-${(imageBlur * 1.5)}px`,
          right: `-${(imageBlur * 1.5)}px`,
        })
        // reset blur styles if it's off
      } else {
        divImage.css({
          filter: ``,
          top: ``,
          bottom: ``,
          left: ``,
          right: ``,
        })
      }

      // if blend is normal apply background color to the bg-color div so image opacity still works
      if( imageBlend==='normal' ) {
        divColor.css('background-color',colorRGBA);
      } else {
        divColor.css('background-color','');
      }

    // the color + clean the image
    } else {
      divColor.css('background-color', colorRGBA);
      divImage.attr('style','');
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

    // listen for mutations on our smart backgrounds
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // only update the background if the observed mutation was background related
        // - MutationObserver will respond to any mutation (class changes, style changes etc).
        // - We don't wont re-build the background if we don't have to
        let bgAttributes = [
          'data-bg-color',
          'data-bg-color-opacity',
          'data-bg-image',
          'data-bg-image-opacity',
          'data-bg-image-blend',
          'data-bg-image-blur',
          'data-bg-gradient-start',
          'data-bg-gradient-end',
          'data-bg-gradient-rotation',
          'data-bg-gradient-opacity'
        ];
        if ( bgAttributes.includes( mutation.attributeName ) ) {
          bloxUpdateBackground( mutation.target );
          console.log(`${mutation.attributeName} was updated`);
        }
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
