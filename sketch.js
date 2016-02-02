/* JavaScript for Sketch Pad */

// getting the pixel-width of the Pad
var padWidth = parseInt($('#pad').css('width'), 10);
var resVal = 60;
var newResVal = 60;
var size = padWidth / resVal;
var paintMethod = 0; // 0: black, 1: rand, 2: tail
var black = '#000';
var rndColor = getRandomColor();
var backgrColor = $('#pad').css('background-color');
var tail = 0;

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

// function computing a random color
function getRandomColor() {
  // convert int to Hex-String: .toString(16)
  // max int-number: 16777215
  var n = Math.floor(Math.random() * (16777215 + 1));
  return "#" + n.toString(16);
}


$(document).ready( function() {
  makePixels(resVal, size)
  $('#lines').text('30');
});

$('#pad').on('mouseenter', '.pixel', function() {
  var pixel = $(this);
  if (paintMethod === 0) {
    pixel.css({'background-color':black}, 'fast');
  } else if (paintMethod === 1) {
    pixel.css({'background-color':rndColor}, 'fast');
    rndColor = getRandomColor();
  } 
  // tail
  if (tail) {
    setTimeout(function() {
      pixel.css({'background-color':backgrColor}, 'fast');
    }, 1000);
  }
});

/* THE CLEAR-BUTTON */
$('#clear').on('click', function() {
  if (resVal !== newResVal) {
    resVal = newResVal; 
    removePixels();
    makePixels(resVal, size);
  } else {
    var color = backgrColor;
    $('.pixel').css( 'background-color', color );
  }
});

/* CHANGING RESOLUTION */
$('#resolution').on('change', function() {
  newResVal = +$('#resolution').val();
  size = padWidth / newResVal;
  $('#lines').text((newResVal / 2).toString());
});

/* REGISTER COLORCHANGES */
$('input:radio[name=color]').on('change', function() {
  var val = $('input[name=color]:checked').val();
  if (val === 'black') {
    paintMethod = 0;
  } else if (val === 'rand') {
    paintMethod = 1;
  } else {
    paintMethod = 2;
  }
});

/* REGISTER TAIL OPTION */
$('input:checkbox[name=tail]').on('change', function() {
  if ( $('input[name=tail]').is(':checked') ) {
    tail = 1;
  } else {
    tail = 0;
  }
});






