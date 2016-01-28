/* JavaScript for Sketch Pad */

// getting the pixel-width of the Pad
var padWidth = parseInt($('#pad').css('width'), 10);
var resVal = 60;
var newResVal = 60;
var size = padWidth / resVal;

// function preparing the Pad
function makePixels(resVal, size) {
  for (var i = 0; i < resVal; i++) {
    for (var j = 0; j < resVal/2; j++) {
      var id = i.toString() + j.toString();
      var pixel = $('<div class="pixel" id='+ id +'></div>');
      $('#pad').append(pixel);
      $('.pixel').last().css( {'width': size.toString(),
        'height': size.toString(),
        'display':'inline-block'} );
    }
  }
};

// function removing all pixels from Pad
function removePixels() {
  $('.pixel').remove();
}


$(document).ready(makePixels(resVal, size));


/* THE CLEAR-BUTTON */
$('#clear').on('click', function() {
  if (resVal !== newResVal) {
    resVal = newResVal; 
    removePixels();
    makePixels(resVal, size);
  } else {
    var color = $('#pad').css('background-color');
    $('.pixel').css( 'background-color', color );
  }
});

/* CHANGING RESOLUTION */
$('#resolution').on('change', function() {
  newResVal = +$('#resolution').val();
  size = padWidth / newResVal;
  alert('PadWidth'+padWidth+'size '+size);
});

$('#pad').on('mouseenter', '.pixel', function() {
  $(this).css({'background-color':'#000'}, 'fast');
});








