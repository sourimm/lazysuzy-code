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
    $('.collapsible').removeClass('active');
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
            deptToAppend += '<li class="department"><a class="link collapsible" href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
          } else {
            deptToAppend += '<li class="department"><a  class="collapsible" data-toggle="collapse" data-target="#' + departments[i].department + '"><span class="link">' + departments[i].department + '</span><span  class="side-nav-icon" id="navbarDropdown' + i + '"><i class="fas fa-angle-right arrow"></i></span></a>';
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

__webpack_require__(/*! /var/www/html/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /var/www/html/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJjbGljayIsImNzcyIsImV2ZW50IiwidG9nZ2xlQ2xhc3MiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJoaWRlIiwiZ2V0QXR0cmlidXRlIiwic2hvdyIsImVsbSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZmluZCIsInZhbCIsIiRzZWFyY2hJY29uIiwiREVQVF9BUEkiLCJhdHRyIiwiaGFzQ2xhc3MiLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImlzTW9iaWxlIiwicG9zaXRpb24iLCJ0b3AiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiZW1wdHkiLCJpIiwibGVuZ3RoIiwiY2F0ZWdvcmllcyIsImxpbmsiLCJkZXBhcnRtZW50IiwiY2F0Z1RvQXBwZW5kIiwiaiIsImNhdGVnb3J5IiwiaHRtbCIsInNpbmdsZURlcHRNb2JpbGUiLCJhcHBlbmQiLCJjbGFzc0FjdGl2ZSIsInBhdGhuYW1lIiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGlkZXNTaG93Iiwic2xpZGVzU2Nyb2xsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixHQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsV0FBakMsRUFBOEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3REQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBRHNELENBRXREOztBQUNBTixLQUFDLENBQUMsSUFBRCxDQUFELENBQ0tPLFFBREwsR0FFS0MsV0FGTCxDQUVpQixRQUZqQjtBQUdBUixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFFBQVIsQ0FBaUIsUUFBakI7QUFDSCxHQVBEO0FBUUFULEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxNQUF0QixDQUE2QixVQUFTTixDQUFULEVBQVk7QUFDckNPLGNBQVUsQ0FBQ1AsQ0FBRCxFQUFJLElBQUosQ0FBVjtBQUNILEdBRkQ7QUFJ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QUEsTUFBbENDLFVBQWtDLHVFQUFyQixDQUFxQjtBQUFBLE1BQWxCQyxZQUFrQix1RUFBSCxDQUFHO0FBQ2hFdkYsR0FBQyxDQUFDLGdDQUFELENBQUQsQ0FBb0N3RixLQUFwQyxDQUEwQztBQUN0Q0MsWUFBUSxFQUFFLEtBRDRCO0FBRXRDQyxTQUFLLEVBQUUsR0FGK0I7QUFHdENDLGdCQUFZLEVBQUVMLFVBSHdCO0FBSXRDTSxrQkFBYyxFQUFFTCxZQUpzQjtBQUt0Q00sVUFBTSxFQUFFLElBTDhCO0FBTXRDO0FBQ0FDLGNBQVUsRUFBRSxDQUNSO0FBQ0lDLGdCQUFVLEVBQUUsSUFEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQURRLEVBUVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBUlEsRUFlUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWLE9BRmQsQ0FPQTtBQUNBO0FBQ0E7O0FBVEEsS0FmUTtBQVAwQixHQUExQztBQWtDSCxDOzs7Ozs7Ozs7Ozs7QUNuQ0QseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpXG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKVxucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5vbignY2xpY2snLCAnLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH0pXG4gICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcylcbiAgICB9KVxuXG4gICAgJCgnLnNiLWJvZHknKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXG4gICAgfSlcbiAgICAkKCcubmF2YmFyLXRvZ2dsZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzMwMHB4JylcbiAgICB9KVxuICAgICQoJyNTaWRlbmF2YmFyY2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzBweCcpXG4gICAgfSlcbiAgICAkKCcuYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAkKCcuYXJyb3ctaW1nJykudG9nZ2xlQ2xhc3MoJ3JvdGF0ZScpXG4gICAgICAgICQoJy5hcnJvdy1pbWcnKS50b2dnbGVDbGFzcygncm90YXRlLXJlc2V0JylcbiAgICB9KVxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jb2xsYXBzaWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuY29sbGFwc2libGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICAkKCcuY29sbGFwc2UnKS5oaWRlKClcbiAgICAgICAgJCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSkuc2hvdygpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGNhbGxTZWFyY2goZSwgZWxtKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9XG4gICAgICAgICAgICAnL3NlYXJjaD9xdWVyeT0nICtcbiAgICAgICAgICAgICQoZWxtKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLnZhbCgpIC8vcmVsYXRpdmUgdG8gZG9tYWluXG4gICAgfVxuXG4gICAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKVxuXG4gICAgY29uc3QgREVQVF9BUEkgPSAnL2FwaS9hbGwtZGVwYXJ0bWVudHMnXG5cbiAgICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICAgICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICQoJy51c2VyLWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICB9KVxuICAgICQoJyNyZWdpc3Rlci1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxTaWdudXBGb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgIH0pXG4gICAgJCgnLnVzZXItbG9naW4tbW9kYWwxJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgfSlcblxuICAgICQoJy53aXNobGlzdC1sb2dpbi1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgpXG4gICAgfSlcblxuICAgICQoJ2JvZHknKS5vbignbW91c2VvdmVyJywgJy5kcm9wZG93bi1zdWJtZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudScpXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJ3VsJylcbiAgICAgICAgICAgIC50b2dnbGUoKVxuICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ3RvcCcsICQodGhpcykucG9zaXRpb24oKS50b3ApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHVybDogREVQVF9BUEksXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRlcGFydG1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJydcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbGxhcHNpYmxlLWRlcHQnKS5lbXB0eSgpXG4gICAgICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImRlcGFydG1lbnRcIj48YSBjbGFzcz1cImxpbmsgY29sbGFwc2libGVcIiBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZGVwYXJ0bWVudFwiPjxhICBjbGFzcz1cImNvbGxhcHNpYmxlXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiIycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj48c3BhbiBjbGFzcz1cImxpbmtcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPjxzcGFuICBjbGFzcz1cInNpZGUtbmF2LWljb25cIiBpZD1cIm5hdmJhckRyb3Bkb3duJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0IGFycm93XCI+PC9pPjwvc3Bhbj48L2E+J1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImNvbGxhcHNlIGNhdGVnb3J5LWxpc3RcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiIGlkPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPidcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJyNjb2xsYXBzaWJsZS1kZXB0JykuaHRtbChkZXB0VG9BcHBlbmQpXG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJ1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhICBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9kaXY+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzQWN0aXZlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgPT09IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0FjdGl2ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPidcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coanFYSFIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gICAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKVxuICAgIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59XG4iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXNTaG93LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=