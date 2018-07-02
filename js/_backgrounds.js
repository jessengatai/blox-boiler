console.log('backgrounds loaded');
jQuery(document).ready(function($){

  /*
  move this into bg.js
   */
  const setupBG = () => {

    const bgs = $(`[data-bg]`);

    $.each(bgs, function(index,object){

      // color
      const color = $(object).css('background-color');
      const colorOpacity = $(object).attr('data-bg-color-opacity');
      // image
      const image = $(object).attr('data-bg-image');
      const imageOpacity = $(object).attr('data-bg-image-opacity');
      const imageBlend = $(object).attr('data-bg-image-blend');

      // setup image blur
      let imageBlur = $(object).attr('data-bg-image-blur');
      imageBlur = ( bloxIsset(imageBlur) ) ? 'bg-blur' : '' ;

      // gradient
      const gradStart = $(object).attr('data-bg-gradient-start');
      const gradEnd = $(object).attr('data-bg-gradient-end');
      const gradDeg = $(object).attr('data-bg-gradient-deg');
      const gradOpacity = $(object).attr('data-bg-gradient-opacity');

      // clean up
      $(object).addClass('position-relative');
      $(object).css('background-color','transparent');

      // the gradient
      if ( bloxIsset(gradStart) ) {
        $(object).prepend( $(`<div class="bg-gradient bg-cover"
          style="
              background-image: linear-gradient(${gradDeg}deg, ${gradStart}, ${gradEnd});
              opacity: ${gradOpacity} ;
          "></div>`) );
      }

      // the image
      if( bloxIsset(image) ) {
        $(object).prepend( $(`<div class="bg-image bg-cover ${imageBlur} bg-blend-${imageBlend}"
          style="
            background-image: url(${image});
            opacity: ${imageOpacity};
            background-color: ${color};
          "></div>`) );

      // the color (fallback)
      } else {
        $(object).prepend( $(`<div class="bg-image bg-blend-${imageBlend}"
          style="
            opacity: ${colorOpacity};
            background-color: ${color};
          "></div>`) );
      }

    });

  }
  setupBG();

});
