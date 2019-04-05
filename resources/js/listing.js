$(document).ready(function () {
  // $('body').on('click', function () {
  //     $('#searchbarBody').hide();
  // })
  // $('#searchIconMobile').click(function (event) {
  //     $('#searchbarBody').toggle();
  //     event.preventDefault();
  // })

  var $searchIcon = $('#searchIconMobile');

  $searchIcon.on('click', function (e) {
    var target = e ? e.target : window.event.srcElement;

    if ($(target).attr('id') == 'searchIconMobile') {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
      } else {
        $(this).addClass('open');
      }
    }
  });

  $("#priceRange").change(function(){
    $("#priceInfo").find('.low').text($(this).attr('min'));
    $("#priceInfo").find('.high').text($(this).val());
  });
})