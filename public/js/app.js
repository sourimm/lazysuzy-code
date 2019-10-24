(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isMobile; });
__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");

__webpack_require__(/*! ./components/multi-carousel */ "./resources/js/components/multi-carousel.js");

__webpack_require__(/*! ./components/custom-selectbox */ "./resources/js/components/custom-selectbox.js");

$(document).ready(function () {
  $('#departmentsNav').on('click', '.dropdown', function (e) {
    console.log('test'); // e.preventDefault()

    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
  $('#searchbarHeader').submit(function (e) {
    callSearch(e, this);
  });
  $('.sb-body').submit(function (e) {
    callSearch(e, this);
  });
  $('.navbar-toggler').click(function () {
    $('#Sidenavbar').css('width', '300px');
  });
  $('#Sidenavbarclose').click(function () {
    $('#Sidenavbar').css('width', '0px');
  });
  $('.arrow').on('click', function (event) {
    $('.arrow-img').toggleClass('rotate');
    $('.arrow-img').toggleClass('rotate-reset');
  });
  $(document).on('click', '.collapsible', function () {
    this.classList.toggle('active');
    $('.collapse').hide();
    $(this.getAttribute('data-target')).show();
  });

  function callSearch(e, elm) {
    e.preventDefault();
    window.location.href = '/search?query=' + $(elm).find('input').val(); //relative to domain
  }

  var $searchIcon = $('#searchIconMobile');
  var DEPT_API = '/api/all-departments';
  $searchIcon.on('click', function (e) {
    if ($(this).attr('id') == 'searchIconMobile') {
      if ($('#searchbarHeader').hasClass('open')) {
        $('#searchbarHeader').removeClass('open');
      } else {
        $('#searchbarHeader').addClass('open');
      }
    }
  });
  $('.user-login-modal').click(function () {
    $('#modalSignupForm').modal('toggle');
  });
  $('#register-modal').click(function () {
    $('#modalSignupForm').modal('toggle');
    $('#modalLoginForm').modal('toggle');
  });
  $('.user-login-modal1').click(function () {
    $('#modalSignupForm').modal('toggle');
    $('#modalLoginForm').modal('toggle');
  });
  $('.wishlist-login-modal').click(function () {
    $('#modalLoginForm').modal();
  });
  $('body').on('mouseover', '.dropdown-submenu', function (e) {
    var self = this;
    $('.dropdown-submenu').each(function () {
      if ($(this).find('.dropdown-menu')[0] != $(self).next('ul')[0]) {
        $(this).find('.dropdown-menu').hide();
      }
    });
    $(this).find('ul').toggle();

    if (!isMobile()) {
      $(this).find('.dropdown-menu').css('top', $(this).position().top);
    }
  });
  $.ajax({
    type: 'GET',
    url: DEPT_API,
    dataType: 'json',
    success: function success(departments) {
      var deptToAppend = '';

      if (isMobile()) {
        $('#collapsible-dept').empty();
        var deptToAppend = '';

        for (var i = 0; i < departments.length; i++) {
          if (departments[i].categories.length == 0) {
            deptToAppend += '<li class="department"><a class="link" href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
          } else {
            deptToAppend += '<li class="department"><a  class="link" href="' + '">' + departments[i].department + '</a><a  class=" collapsible" data-toggle="collapse" data-target="#' + departments[i].department + '" id="navbarDropdown' + i + '"><i class="fas fa-angle-right arrow"></i></a>';
            var catgToAppend = '<ul class="collapse category-list" aria-labelledby="navbarDropdown" id="' + departments[i].department + '">';

            for (var j = 0; j < departments[i].categories.length; j++) {
              catgToAppend += '<li><a class="link" href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>';
            }

            catgToAppend += '</ul>';
            deptToAppend += catgToAppend;
            deptToAppend += '</li>';
          }
        }

        $('#collapsible-dept').html(deptToAppend);
        var singleDeptMobile = '';

        for (var i = 0; i < departments.length; i++) {
          if (departments.length != 0) {
            singleDeptMobile = '<div class="col-4 col-sm-auto -dept "><a  href="' + departments[i].link + '">' + departments[i].department + '</a></div>';
          }

          $('#mobileDepartments').append(singleDeptMobile);
        }
      }

      for (var i = 0; i < departments.length; i++) {
        if (departments[i].categories.length == 0) {
          deptToAppend += '<li><a href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
        } else {
          var classActive = departments[i].link === location.pathname ? 'active' : '';
          deptToAppend += '<li class="dropdown ' + classActive + '"><a  href="' + departments[i].link + '" id="navbarDropdown' + i + '" role="button"  aria-haspopup="true" aria-expanded="false">' + departments[i].department + '</a>';
          var catgToAppend = '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';

          for (var j = 0; j < departments[i].categories.length; j++) {
            // if (departments[i].categories[j].sub_categories.length == 0) {
            catgToAppend += '<li><a href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>'; // }
            // else {
            //   catgToAppend += '<li class="dropdown-submenu">';
            //   catgToAppend += '<a href="'+departments[i].categories[j].link+'">' + departments[i].categories[j].category + '<span class="mx-2"><i class="fas fa-angle-right"></i></span>';
            //   var subcatToAppend = '<ul class="dropdown-menu">';
            //   for (k = 0; k < departments[i].categories[j].sub_categories.length; k++) {
            //     subcatToAppend += '<li><a href="' + departments[i].categories[j].sub_categories[k].link + '">' + departments[i].categories[j].sub_categories[k].sub_category + '</a></li>'
            //   }
            //   subcatToAppend += '</ul>';
            //   catgToAppend += subcatToAppend;
            //   catgToAppend += '</li>';
            // }
          }

          catgToAppend += '</ul>';
          deptToAppend += catgToAppend;
          deptToAppend += '</li>';
        }
      }

      $('#departmentsNav').append(deptToAppend);
    },
    error: function error(jqXHR, exception) {
      console.log(jqXHR);
      console.log(exception);
    }
  });
});
function isMobile() {
  var isMobile = window.matchMedia('only screen and (max-width: 768px)');
  return isMobile.matches ? true : false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/components/custom-selectbox.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/custom-selectbox.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeSelectBox; });
/*
Reference: http://jsfiddle.net/BB3JK/47/
*/
function makeSelectBox() {
  $('select').each(function () {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length; //Remove previously made selectbox

    $('#selectbox-' + $this.attr('id')).remove();
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled" id="selectbox-' + $this.attr('id') + '"></div>');
    var $styledSelect = $this.next('div.select-styled');
    var strSelectedText = $(this).children("option:selected") ? $(this).children("option:selected").text() : $this.children('option:selected').eq(0).text();
    var strSelectedValue = $(this).children("option:selected") ? $(this).children("option:selected").attr('value') : $this.children('option:selected').eq(0).attr('value');
    $styledSelect.text(strSelectedText);
    $styledSelect.attr('active', strSelectedValue);
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
      var strSelectedValue = $(this).attr('rel');
      $styledSelect.attr('active', strSelectedValue);
      $(document).trigger('select-value-changed', $styledSelect);
      $this.val($(this).attr('rel'));
      $list.hide(); //console.log($this.val());
    });
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/components/multi-carousel.js":
/*!***************************************************!*\
  !*** ./resources/js/components/multi-carousel.js ***!
  \***************************************************/
/*! exports provided: makeMultiCarousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMultiCarousel", function() { return makeMultiCarousel; });
function makeMultiCarousel() {
  var slidesShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  var slidesScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  $('.responsive:not(.slick-slider)').slick({
    infinite: false,
    speed: 300,
    slidesToShow: slidesShow,
    slidesToScroll: slidesScroll,
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
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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

__webpack_require__(/*! /Users/tarun/Desktop/tdg/lazy suzy/lazy-suzy/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/tarun/Desktop/tdg/lazy suzy/lazy-suzy/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJjbGljayIsImNzcyIsImV2ZW50IiwidG9nZ2xlQ2xhc3MiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJoaWRlIiwiZ2V0QXR0cmlidXRlIiwic2hvdyIsImVsbSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZmluZCIsInZhbCIsIiRzZWFyY2hJY29uIiwiREVQVF9BUEkiLCJhdHRyIiwiaGFzQ2xhc3MiLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImlzTW9iaWxlIiwicG9zaXRpb24iLCJ0b3AiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiZW1wdHkiLCJpIiwibGVuZ3RoIiwiY2F0ZWdvcmllcyIsImxpbmsiLCJkZXBhcnRtZW50IiwiY2F0Z1RvQXBwZW5kIiwiaiIsImNhdGVnb3J5IiwiaHRtbCIsInNpbmdsZURlcHRNb2JpbGUiLCJhcHBlbmQiLCJjbGFzc0FjdGl2ZSIsInBhdGhuYW1lIiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGlkZXNTaG93Iiwic2xpZGVzU2Nyb2xsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixHQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsV0FBakMsRUFBOEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3REQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBRHNELENBRXREOztBQUNBTixLQUFDLENBQUMsSUFBRCxDQUFELENBQ0tPLFFBREwsR0FFS0MsV0FGTCxDQUVpQixRQUZqQjtBQUdBUixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFFBQVIsQ0FBaUIsUUFBakI7QUFDSCxHQVBEO0FBUUFULEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxNQUF0QixDQUE2QixVQUFTTixDQUFULEVBQVk7QUFDckNPLGNBQVUsQ0FBQ1AsQ0FBRCxFQUFJLElBQUosQ0FBVjtBQUNILEdBRkQ7QUFJ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WUFBa0IsdUVBQUgsQ0FBRztBQUNoRXZGLEdBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9Dd0YsS0FBcEMsQ0FBMEM7QUFDdENDLFlBQVEsRUFBRSxLQUQ0QjtBQUV0Q0MsU0FBSyxFQUFFLEdBRitCO0FBR3RDQyxnQkFBWSxFQUFFTCxVQUh3QjtBQUl0Q00sa0JBQWMsRUFBRUwsWUFKc0I7QUFLdENNLFVBQU0sRUFBRSxJQUw4QjtBQU10QztBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKVxucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKVxucmVxdWlyZSgnLi9jb21wb25lbnRzL211bHRpLWNhcm91c2VsJylcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94JylcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnI2RlcGFydG1lbnRzTmF2Jykub24oJ2NsaWNrJywgJy5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKVxuICAgICAgICAvLyBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9KVxuICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXG4gICAgfSlcblxuICAgICQoJy5zYi1ib2R5Jykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2FsbFNlYXJjaChlLCB0aGlzKVxuICAgIH0pXG4gICAgJCgnLm5hdmJhci10b2dnbGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNTaWRlbmF2YmFyJykuY3NzKCd3aWR0aCcsICczMDBweCcpXG4gICAgfSlcbiAgICAkKCcjU2lkZW5hdmJhcmNsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNTaWRlbmF2YmFyJykuY3NzKCd3aWR0aCcsICcwcHgnKVxuICAgIH0pXG4gICAgJCgnLmFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJCgnLmFycm93LWltZycpLnRvZ2dsZUNsYXNzKCdyb3RhdGUnKVxuICAgICAgICAkKCcuYXJyb3ctaW1nJykudG9nZ2xlQ2xhc3MoJ3JvdGF0ZS1yZXNldCcpXG4gICAgfSlcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY29sbGFwc2libGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICAkKCcuY29sbGFwc2UnKS5oaWRlKClcbiAgICAgICAgJCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSkuc2hvdygpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGNhbGxTZWFyY2goZSwgZWxtKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9XG4gICAgICAgICAgICAnL3NlYXJjaD9xdWVyeT0nICtcbiAgICAgICAgICAgICQoZWxtKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLnZhbCgpIC8vcmVsYXRpdmUgdG8gZG9tYWluXG4gICAgfVxuXG4gICAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKVxuXG4gICAgY29uc3QgREVQVF9BUEkgPSAnL2FwaS9hbGwtZGVwYXJ0bWVudHMnXG5cbiAgICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICAgICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICQoJy51c2VyLWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICB9KVxuICAgICQoJyNyZWdpc3Rlci1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxTaWdudXBGb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgIH0pXG4gICAgJCgnLnVzZXItbG9naW4tbW9kYWwxJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgfSlcblxuICAgICQoJy53aXNobGlzdC1sb2dpbi1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgpXG4gICAgfSlcblxuICAgICQoJ2JvZHknKS5vbignbW91c2VvdmVyJywgJy5kcm9wZG93bi1zdWJtZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudScpXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJ3VsJylcbiAgICAgICAgICAgIC50b2dnbGUoKVxuICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ3RvcCcsICQodGhpcykucG9zaXRpb24oKS50b3ApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHVybDogREVQVF9BUEksXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRlcGFydG1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJydcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbGxhcHNpYmxlLWRlcHQnKS5lbXB0eSgpXG4gICAgICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImRlcGFydG1lbnRcIj48YSBjbGFzcz1cImxpbmtcIiBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZGVwYXJ0bWVudFwiPjxhICBjbGFzcz1cImxpbmtcIiBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PGEgIGNsYXNzPVwiIGNvbGxhcHNpYmxlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiIycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIiBpZD1cIm5hdmJhckRyb3Bkb3duJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0IGFycm93XCI+PC9pPjwvYT4nXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiY29sbGFwc2UgY2F0ZWdvcnktbGlzdFwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCIgaWQ9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+J1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorK1xuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPidcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCgnI2NvbGxhcHNpYmxlLWRlcHQnKS5odG1sKGRlcHRUb0FwcGVuZClcbiAgICAgICAgICAgICAgICB2YXIgc2luZ2xlRGVwdE1vYmlsZSA9ICcnXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZURlcHRNb2JpbGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2Rpdj4nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NBY3RpdmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayA9PT0gbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJkcm9wZG93biAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzQWN0aXZlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48YSAgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgcm9sZT1cImJ1dHRvblwiICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPidcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCI+J1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGEgaHJlZj1cIicrZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rKydcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8c3BhbiBjbGFzcz1cIm14LTJcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgdmFyIHN1YmNhdFRvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBmb3IgKGsgPSAwOyBrIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10uc3ViX2NhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHN1YmNhdFRvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSBzdWJjYXRUb0FwcGVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPidcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZFxuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJyNkZXBhcnRtZW50c05hdicpLmFwcGVuZChkZXB0VG9BcHBlbmQpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihqcVhIUiwgZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqcVhIUilcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbilcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KScpXG4gICAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2Vcbn1cbiIsIi8qXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VsZWN0Qm94KCkge1xuICAgICQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG5cbiAgICAgICAgLy9SZW1vdmUgcHJldmlvdXNseSBtYWRlIHNlbGVjdGJveFxuICAgICAgICAkKCcjc2VsZWN0Ym94LScgKyAkdGhpcy5hdHRyKCdpZCcpKS5yZW1vdmUoKTtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpO1xuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiIGlkPVwic2VsZWN0Ym94LScgKyAkdGhpcy5hdHRyKCdpZCcpICsgJ1wiPjwvZGl2PicpO1xuXG4gICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcbiAgICAgICAgdmFyIHN0clNlbGVjdGVkVGV4dCA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLnRleHQoKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS50ZXh0KClcbiAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS5hdHRyKCd2YWx1ZScpIDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpLmVxKDApLmF0dHIoJ3ZhbHVlJylcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KHN0clNlbGVjdGVkVGV4dCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XG5cbiAgICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xuICAgICAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xuICAgICAgICB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICAkKCc8bGkgLz4nLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcbiAgICAgICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcblxuICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2VsZWN0LXZhbHVlLWNoYW5nZWQnLCAkc3R5bGVkU2VsZWN0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBtYWtlTXVsdGlDYXJvdXNlbChzbGlkZXNTaG93ID0gNCwgc2xpZGVzU2Nyb2xsID0gNCkge1xuICAgICQoJy5yZXNwb25zaXZlOm5vdCguc2xpY2stc2xpZGVyKScpLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IHNsaWRlc1Nob3csXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiBzbGlkZXNTY3JvbGwsXG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgIF1cbiAgICB9KTtcbn1cbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==