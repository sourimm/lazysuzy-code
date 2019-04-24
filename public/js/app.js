(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

__webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");

__webpack_require__(/*! ./listing */ "./resources/js/listing.js");

__webpack_require__(/*! ./multi-carousel */ "./resources/js/multi-carousel.js");

__webpack_require__(/*! ./custom-selectbox */ "./resources/js/custom-selectbox.js");

__webpack_require__(/*! ion-rangeslider */ "./node_modules/ion-rangeslider/js/ion.rangeSlider.js");

$(document).ready(function () {
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
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js").default;
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/***/ }),

/***/ "./resources/js/custom-selectbox.js":
/*!******************************************!*\
  !*** ./resources/js/custom-selectbox.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
Reference: http://jsfiddle.net/BB3JK/47/
*/
$('select').each(function () {
  var $this = $(this),
      numberOfOptions = $(this).children('option').length;
  $this.addClass('select-hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');
  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());
  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');
  $styledSelect.click(function (e) {
    e.stopPropagation();
    $('div.select-styled.active').not(this).each(function () {
      $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
  });
  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.hide(); //console.log($this.val());
  });
  $(document).click(function () {
    $styledSelect.removeClass('active');
    $list.hide();
  });
});

/***/ }),

/***/ "./resources/js/listing.js":
/*!*********************************!*\
  !*** ./resources/js/listing.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  // $('body').on('click', function () {
  //     $('#searchbarBody').hide();
  // })
  // $('#searchIconMobile').click(function (event) {
  //     $('#searchbarBody').toggle();
  //     event.preventDefault();
  // })
  var iItemsToShow = 3;
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
    iItemsToShow = iItemsToShow == 1 ? 3 : iItemsToShow - 1;
    $('#productsContainerDiv').find('.ls-product-div').each(function () {
      $(this).removeClass(function (index, className) {
        return (className.match(/(^|\s)item-\S+/g) || []).join(' ');
      });
      $(this).addClass('item-' + iItemsToShow);
    });
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
});

/***/ }),

/***/ "./resources/js/multi-carousel.js":
/*!****************************************!*\
  !*** ./resources/js/multi-carousel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $('.responsive').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    // centerMode: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      } // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object

    }]
  });
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL211bHRpLWNhcm91c2VsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIiRzZWFyY2hJY29uIiwib24iLCJlIiwiYXR0ciIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIndpbmRvdyIsIl8iLCJQb3BwZXIiLCJkZWZhdWx0IiwialF1ZXJ5IiwiYXhpb3MiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJ0b2tlbiIsImhlYWQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNvbnNvbGUiLCJlcnJvciIsImVhY2giLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwibGVuZ3RoIiwid3JhcCIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsIm5leHQiLCJ0ZXh0IiwiZXEiLCIkbGlzdCIsImluc2VydEFmdGVyIiwiaSIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwibm90IiwiaGlkZSIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlIiwiaUl0ZW1zVG9TaG93IiwiY2hhbmdlIiwiZmluZCIsImlvblJhbmdlU2xpZGVyIiwic2tpbiIsInR5cGUiLCJtaW4iLCJtYXgiLCJmcm9tIiwidG8iLCJwcmVmaXgiLCJwcmV0dGlmeV9zZXBhcmF0b3IiLCJpbmRleCIsImNsYXNzTmFtZSIsIm1hdGNoIiwiam9pbiIsInBhcmVudHMiLCJmaXJzdCIsIiRzdWJNZW51Iiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsbUJBQU8sQ0FBQyxnREFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsNENBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQywwREFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLDhEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsNkVBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFVO0FBQzFCLE1BQUlDLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG1CQUFELENBQW5CO0FBRUFHLGFBQVcsQ0FBQ0MsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVUMsQ0FBVixFQUFhO0FBQ25DO0FBQ0E7QUFFQSxRQUFJTCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFNLElBQVIsQ0FBYSxJQUFiLEtBQXNCLGtCQUExQixFQUE4QztBQUM1QyxVQUFJTixDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQk8sUUFBdEIsQ0FBK0IsTUFBL0IsQ0FBSixFQUE0QztBQUMxQ1AsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JRLFdBQXRCLENBQWtDLE1BQWxDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xSLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUyxRQUF0QixDQUErQixNQUEvQjtBQUNEO0FBQ0Y7QUFDRixHQVhEO0FBWUQsQ0FmRCxFOzs7Ozs7Ozs7OztBQ05BQyxNQUFNLENBQUNDLENBQVAsR0FBV1osbUJBQU8sQ0FBQywrQ0FBRCxDQUFsQjtBQUVBOzs7Ozs7QUFNQSxJQUFJO0FBQ0FXLFFBQU0sQ0FBQ0UsTUFBUCxHQUFnQmIsbUJBQU8sQ0FBQyw4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QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBUlEsRUFlUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWLE9BRmQsQ0FPQTtBQUNBO0FBQ0E7O0FBVEEsS0FmUTtBQVBPLEdBQXZCO0FBa0NILENBcENELEU7Ozs7Ozs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vYm9vdHN0cmFwJyk7XG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9saXN0aW5nJyk7XG5yZXF1aXJlKCcuL211bHRpLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2N1c3RvbS1zZWxlY3Rib3gnKTtcbnJlcXVpcmUoJ2lvbi1yYW5nZXNsaWRlcicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpO1xuXG4gICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gdmFyIHRhcmdldCA9IGUgPyBlLnRhcmdldCA6IHdpbmRvdy5ldmVudC5zcmNFbGVtZW50O1xuICAgIC8vIHRhcmdldCA9ICQodGFyZ2V0KS5oYXNDbGFzcygnc2VhcmNoLWljb24tbW9iaWxlJykgPyB0YXJnZXQgOiAkKHRhcmdldCkuY2xvc2VzdCgnLnNlYXJjaC1pY29uLW1vYmlsZScpWzBdO1xuXG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSIsIlxud2luZG93Ll8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuLyoqXG4gKiBXZSdsbCBsb2FkIGpRdWVyeSBhbmQgdGhlIEJvb3RzdHJhcCBqUXVlcnkgcGx1Z2luIHdoaWNoIHByb3ZpZGVzIHN1cHBvcnRcbiAqIGZvciBKYXZhU2NyaXB0IGJhc2VkIEJvb3RzdHJhcCBmZWF0dXJlcyBzdWNoIGFzIG1vZGFscyBhbmQgdGFicy4gVGhpc1xuICogY29kZSBtYXkgYmUgbW9kaWZpZWQgdG8gZml0IHRoZSBzcGVjaWZpYyBuZWVkcyBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICovXG5cbnRyeSB7XG4gICAgd2luZG93LlBvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpLmRlZmF1bHQ7XG4gICAgd2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbiAgICByZXF1aXJlKCdib290c3RyYXAnKTtcbn0gY2F0Y2ggKGUpIHt9XG5cbi8qKlxuICogV2UnbGwgbG9hZCB0aGUgYXhpb3MgSFRUUCBsaWJyYXJ5IHdoaWNoIGFsbG93cyB1cyB0byBlYXNpbHkgaXNzdWUgcmVxdWVzdHNcbiAqIHRvIG91ciBMYXJhdmVsIGJhY2stZW5kLiBUaGlzIGxpYnJhcnkgYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgdGhlXG4gKiBDU1JGIHRva2VuIGFzIGEgaGVhZGVyIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGUgXCJYU1JGXCIgdG9rZW4gY29va2llLlxuICovXG5cbndpbmRvdy5heGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cbndpbmRvdy5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcblxuLyoqXG4gKiBOZXh0IHdlIHdpbGwgcmVnaXN0ZXIgdGhlIENTUkYgVG9rZW4gYXMgYSBjb21tb24gaGVhZGVyIHdpdGggQXhpb3Mgc28gdGhhdFxuICogYWxsIG91dGdvaW5nIEhUVFAgcmVxdWVzdHMgYXV0b21hdGljYWxseSBoYXZlIGl0IGF0dGFjaGVkLiBUaGlzIGlzIGp1c3RcbiAqIGEgc2ltcGxlIGNvbnZlbmllbmNlIHNvIHdlIGRvbid0IGhhdmUgdG8gYXR0YWNoIGV2ZXJ5IHRva2VuIG1hbnVhbGx5LlxuICovXG5cbmxldCB0b2tlbiA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuXG5pZiAodG9rZW4pIHtcbiAgICB3aW5kb3cuYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ1NSRi1UT0tFTiddID0gdG9rZW4uY29udGVudDtcbn0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignQ1NSRiB0b2tlbiBub3QgZm91bmQ6IGh0dHBzOi8vbGFyYXZlbC5jb20vZG9jcy9jc3JmI2NzcmYteC1jc3JmLXRva2VuJyk7XG59XG5cbi8qKlxuICogRWNobyBleHBvc2VzIGFuIGV4cHJlc3NpdmUgQVBJIGZvciBzdWJzY3JpYmluZyB0byBjaGFubmVscyBhbmQgbGlzdGVuaW5nXG4gKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGJyb2FkY2FzdCBieSBMYXJhdmVsLiBFY2hvIGFuZCBldmVudCBicm9hZGNhc3RpbmdcbiAqIGFsbG93cyB5b3VyIHRlYW0gdG8gZWFzaWx5IGJ1aWxkIHJvYnVzdCByZWFsLXRpbWUgd2ViIGFwcGxpY2F0aW9ucy5cbiAqL1xuXG4vLyBpbXBvcnQgRWNobyBmcm9tICdsYXJhdmVsLWVjaG8nXG5cbi8vIHdpbmRvdy5QdXNoZXIgPSByZXF1aXJlKCdwdXNoZXItanMnKTtcblxuLy8gd2luZG93LkVjaG8gPSBuZXcgRWNobyh7XG4vLyAgICAgYnJvYWRjYXN0ZXI6ICdwdXNoZXInLFxuLy8gICAgIGtleTogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfS0VZLFxuLy8gICAgIGNsdXN0ZXI6IHByb2Nlc3MuZW52Lk1JWF9QVVNIRVJfQVBQX0NMVVNURVIsXG4vLyAgICAgZW5jcnlwdGVkOiB0cnVlXG4vLyB9KTtcbiIsIi8qXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXG4qL1xuXG4kKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuICBcbiAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpOyBcbiAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XG5cbiAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xuICBcbiAgICB2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcbiAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAkKCc8bGkgLz4nLCB7XG4gICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xuICAgIH1cbiAgXG4gICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcbiAgXG4gICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG4gICAgfSk7XG4gIFxuICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgIH0pO1xuICBcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICB9KTtcblxufSk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAvLyAkKCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAvLyAgICAgJCgnI3NlYXJjaGJhckJvZHknKS5oaWRlKCk7XG4gIC8vIH0pXG4gIC8vICQoJyNzZWFyY2hJY29uTW9iaWxlJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgICAkKCcjc2VhcmNoYmFyQm9keScpLnRvZ2dsZSgpO1xuICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gfSlcbiAgbGV0IGlJdGVtc1RvU2hvdyA9IDM7XG5cbiAgJChcIiNwcmljZVJhbmdlXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgJChcIiNwcmljZUluZm9cIikuZmluZCgnLmxvdycpLnRleHQoJCh0aGlzKS5hdHRyKCdtaW4nKSk7XG4gICAgJChcIiNwcmljZUluZm9cIikuZmluZCgnLmhpZ2gnKS50ZXh0KCQodGhpcykudmFsKCkpO1xuICB9KTtcblxuICAkKFwiLnByaWNlLXJhbmdlLXNsaWRlclwiKS5pb25SYW5nZVNsaWRlcih7XG4gICAgc2tpbjogXCJzaGFycFwiLFxuICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgbWluOiAxMDAsXG4gICAgbWF4OiA1MDAwLFxuICAgIGZyb206IDUwMCxcbiAgICB0bzogMjUwMCxcbiAgICBwcmVmaXg6IFwiJFwiLFxuICAgIHByZXR0aWZ5X3NlcGFyYXRvcjogXCIsXCJcbiAgfSk7XG5cbiAgJCgnI2ZpbHRlclRvZ2dsZUJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjZmlsdGVycycpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gIH0pO1xuXG4gICQoJyN2aWV3SXRlbXNCdG4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaUl0ZW1zVG9TaG93ID0gKGlJdGVtc1RvU2hvdyA9PSAxKSA/IDMgOiBpSXRlbXNUb1Nob3ctMTtcbiAgICAkKCcjcHJvZHVjdHNDb250YWluZXJEaXYnKS5maW5kKCcubHMtcHJvZHVjdC1kaXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MgKGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvKF58XFxzKWl0ZW0tXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgfSk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdpdGVtLScraUl0ZW1zVG9TaG93KTtcbiAgICB9KVxuICB9KTtcblxuICAkKCcuZHJvcGRvd24tbWVudSBhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCEkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnc2hvdycpKSB7XG4gICAgICAkKHRoaXMpLnBhcmVudHMoJy5kcm9wZG93bi1tZW51JykuZmlyc3QoKS5maW5kKCcuc2hvdycpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICB9XG4gICAgdmFyICRzdWJNZW51ID0gJCh0aGlzKS5uZXh0KFwiLmRyb3Bkb3duLW1lbnVcIik7XG4gICAgJHN1Yk1lbnUudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcblxuXG4gICAgJCh0aGlzKS5wYXJlbnRzKCdsaS5uYXYtaXRlbS5kcm9wZG93bi5zaG93Jykub24oJ2hpZGRlbi5icy5kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAkKCcuZHJvcGRvd24tc3VibWVudSAuc2hvdycpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG5cbn0pIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgJCgnLnJlc3BvbnNpdmUnKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOjQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59KTsiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=