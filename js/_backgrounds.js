document.addEventListener("DOMContentLoaded", function(event) {

  /**
   * Check to see if an element is position relative (or equiv, aboslute, fixed etc)
   * @param  {object}  object The element to check
   * @return {Boolean}        Wether or not this element is position relative
   */
  const isRelative = (object) => {

    let style = object.style.position;
    let classes = object.classList;
    let goodPositions = [
      'relative',
      'sticky',
      'fixed',
      'absolute'
    ]
    const hasStickyClass = () => {
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].startsWith("sticky-") ) {
          return true;
        }
      }
    }
    // if the direct style is a relative position return true
    // if the object has a sticky classes return true
    return ( goodPositions.indexOf(style)==true || hasStickyClass() ) ? true : false ;
  }

  /**
   * Setup the base markup needed for our data-attr backgrounds
   * @param  {object} object The background parent
   */
  const bloxSetupBackground = (object) => {

    // setup the background divs we will need
    let divColor = document.createElement('div')
        divColor.className = 'bg-color'
    let divImage = document.createElement('div')
        divImage.className = 'bg-image'
    let divGradient = document.createElement('div')
        divGradient.className = 'bg-gradient'

    // prepend new divs
    object.prepend( divColor, divImage, divGradient );

    // check and make sure the position is usable for smart backgrounds (fixed, absolute, sticky, relative etc)
    if( isRelative(object) ){
      object.className += ' overflow-hidden';
      console.log('is relative position already');
    } else {
      object.className += ' position-relative overflow-hidden';
      console.log('is NOT relative position');
    }

    // if this is a modal, remove the background style
    if ( object.classList.contains('modal') ) {
      object.style.backgroundColor = 'transparent';
    }
  }

  /**
   * Update a background
   * @param  {object} object The background parent
   */
  const bloxUpdateBackground = (object) => {

    // divs
    const divColor = object.querySelector('.bg-color');
    const divImage = object.querySelector('.bg-image');
    const divGradient = object.querySelector('.bg-gradient');

    // attributes
    let color = object.getAttribute('data-bg-color');
    let colorOpacity = object.getAttribute('data-bg-color-opacity');
    let image = object.getAttribute('data-bg-image');
    let imageOpacity = object.getAttribute('data-bg-image-opacity');
    let imageBlend = object.getAttribute('data-bg-image-blend');
    let imageBlur = object.getAttribute('data-bg-image-blur');
    let gradStart = object.getAttribute('data-bg-gradient-start');
    let gradEnd = object.getAttribute('data-bg-gradient-end');
    let gradDeg = object.getAttribute('data-bg-gradient-rotation');
    let gradOpacity = object.getAttribute('data-bg-gradient-opacity');

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
      bloxCSS(divGradient, {
        backgroundImage: `linear-gradient(${gradDeg}deg, ${gradEnd}, ${gradStart})`,
        opacity: gradOpacity,
      })
    } else {
      divGradient.removeAttribute('style');
    }

    // the image
    // - the color is added here if the image is set, this ensures the blend mode actually works
    if( bloxIsset(image) ) {
      bloxCSS(divImage, {
        backgroundImage: `url(${image})`,
        backgroundBlendMode: imageBlend,
        backgroundColor: colorRGBA,
        opacity: imageOpacity,
      })

      // if blur is on
      if( imageBlur > 0 ) {
        bloxCSS(divImage, {
          filter: `blur(${imageBlur}px)`,
          top: `-${(imageBlur * 1.5)}px`,
          bottom: `-${(imageBlur * 1.5)}px`,
          left: `-${(imageBlur * 1.5)}px`,
          right: `-${(imageBlur * 1.5)}px`,
        })
        // reset blur styles if it's off
      } else {
        bloxCSS(divImage, {
          filter: ``,
          top: ``,
          bottom: ``,
          left: ``,
          right: ``,
        })
      }

      // if blend is normal apply background color to the bg-color div so image opacity still works
      if( imageBlend==='normal' && imageOpacity!==0 ) {
        divColor.style.backgroundColor = colorRGBA;
      } else {
        divColor.style.backgroundColor = '';
      }

    // the color + clean the image
    } else {
      if ( color==='transparent' || colorOpacity===0 ) {
        divColor.style.backgroundColor = 'transparent';
      } else {
        divColor.style.backgroundColor = colorRGBA;
      }
      divImage.removeAttribute('style');
    }
  }

  /**
   * Our background wrapper function
   * - sets up the markup we need
   * - sets up the updates we run on eahc background
   */
  const bloxBackgrounds = () => {

    // setup the smart backgrounds
    const nodes = document.querySelectorAll('[data-bg-image], [data-bg-gradient-start], [data-bg-color]');

    // loop through each smart background and setup the html
    for (var i = 0; i < nodes.length; i++) {
      // setup base html
      bloxSetupBackground( nodes[i] );
      // update the styles
      bloxUpdateBackground( nodes[i] );
    }

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
