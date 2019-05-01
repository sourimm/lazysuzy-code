require('bootstrap');
require('slick-carousel');
require('./components/multi-carousel');
require('./components/custom-selectbox');

$(document).ready(function(){
  var $searchIcon = $('#searchIconMobile');

  $searchIcon.on('click', function (e) {
    if ($(this).attr('id') == 'searchIconMobile') {
      if ($('#searchbarHeader').hasClass('open')) {
        $('#searchbarHeader').removeClass('open');
      } else {
        $('#searchbarHeader').addClass('open');
      }
    }
  });
})