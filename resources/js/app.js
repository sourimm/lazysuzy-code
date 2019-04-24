require('./bootstrap');
require('slick-carousel');
require('./listing');
require('./multi-carousel');
require('./custom-selectbox');
require('ion-rangeslider');

$(document).ready(function(){
  var $searchIcon = $('#searchIconMobile');

  $searchIcon.on('click', function (e) {
    // var target = e ? e.target : window.event.srcElement;
    // target = $(target).hasClass('search-icon-mobile') ? target : $(target).closest('.search-icon-mobile')[0];

    if ($(this).attr('id') == 'searchIconMobile') {
      if ($('#searchbarHeader').hasClass('open')) {
        $('#searchbarHeader').removeClass('open');
      } else {
        $('#searchbarHeader').addClass('open');
      }
    }
  });
})