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

  $("#priceRange").change(function () {
    $("#priceInfo").find('.low').text($(this).attr('min'));
    $("#priceInfo").find('.high').text($(this).val());
  });

  $(".price-range-slider").ionRangeSlider({
    skin: "sharp",
    type: "double",
    min: 100,
    max: 5000,
    from: 500,
    to: 2500,
    prefix: "$",
    prettify_separator: ","
  });

  $('#filterToggleBtn').click(function () {
    $('#filters').toggleClass('show');
  });

  $('#viewItemsBtn').click(function () {
    $('#productsContainerDiv').find('.ls-product-div').each(function () {
      if ($(this).hasClass('col-4')) {
        $(this).removeClass('col-4');
        $(this).addClass('col-6');
      }
      else if ($(this).hasClass('col-6')) {
        $(this).removeClass('col-6');
        $(this).addClass('col-12');
      }
      else if ($(this).hasClass('col-12')) {
        $(this).removeClass('col-12');
        $(this).addClass('col-4');
      }
    })
  });

  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');


    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });

})