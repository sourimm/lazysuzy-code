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
        $('ul[rel="dropdownMobileListing"]').empty();
        var deptToAppend = '';

        for (var i = 0; i < departments.length; i++) {
          if (departments[i].categories.length == 0) {
            deptToAppend += '<li ><a class="dropdown-item" href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
          } else {
            deptToAppend += '<li class="dropdown-submenu row"><a  class="dropdown-item" href="' + departments[i].link + '">' + departments[i].department + '</a><a  class="dropdown-toggle" id="navbarDropdown' + i + '"><i class="fas fa-angle-right float-right"></i></a>';
            var catgToAppend = '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';

            for (var j = 0; j < departments[i].categories.length; j++) {
              catgToAppend += '<li><a class="dropdown-item" href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>';
            }

            catgToAppend += '</ul>';
            deptToAppend += catgToAppend;
            deptToAppend += '</li>';
          }
        }

        $('ul[rel="dropdownMobileListing"]').append(deptToAppend);
        var singleDeptMobile = '';

        for (var i = 0; i < departments.length; i++) {
          if (departments.length != 0) {
            singleDeptMobile = '<div class="col-4 col-sm-auto -dept "><a href="' + departments[i].link + '">' + departments[i].department + '</a></div>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJlbG0iLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImZpbmQiLCJ2YWwiLCIkc2VhcmNoSWNvbiIsIkRFUFRfQVBJIiwiYXR0ciIsImhhc0NsYXNzIiwiY2xpY2siLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImhpZGUiLCJ0b2dnbGUiLCJpc01vYmlsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImVtcHR5IiwiaSIsImxlbmd0aCIsImNhdGVnb3JpZXMiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImNhdGdUb0FwcGVuZCIsImoiLCJjYXRlZ29yeSIsImFwcGVuZCIsInNpbmdsZURlcHRNb2JpbGUiLCJjbGFzc0FjdGl2ZSIsInBhdGhuYW1lIiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0b2dnbGVDbGFzcyIsInRyaWdnZXIiLCJtYWtlTXVsdGlDYXJvdXNlbCIsInNsaWRlc1Nob3ciLCJzbGlkZXNTY3JvbGwiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQUE7QUFBQUE7QUFBQUEsbUJBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekJGLEdBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCRyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxXQUFqQyxFQUE4QyxVQUFTQyxDQUFULEVBQVk7QUFDdERDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFEc0QsQ0FFdEQ7O0FBQ0FOLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FDS08sUUFETCxHQUVLQyxXQUZMLENBRWlCLFFBRmpCO0FBR0FSLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVMsUUFBUixDQUFpQixRQUFqQjtBQUNILEdBUEQ7QUFRQVQsR0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JVLE1BQXRCLENBQTZCLFVBQVNOLENBQVQsRUFBWTtBQUNyQ08sY0FBVSxDQUFDUCxDQUFELEVBQUksSUFBSixDQUFWO0FBQ0gsR0FGRDtBQUlBSixHQUFDLENBQUMsVUFBRCxDQUFELENBQWNVLE1BQWQsQ0FBcUIsVUFBU04sQ0FB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UUFBMUI7QUFDQStELFdBQUssQ0FBQzNDLElBQU47QUFDSCxLQUhEO0FBS0gsR0F0REQ7QUF1REgsQzs7Ozs7Ozs7Ozs7OztBQzVERDtBQUFBO0FBQU8sU0FBU29ELGlCQUFULEdBQTZEO0FBQUEsTUFBbENDLFVBQWtDLHVFQUFyQixDQUFxQjtBQUFBLE1BQWxCQyxZQUFrQix1RUFBSCxDQUFHO0FBQ2hFbEYsR0FBQyxDQUFDLGdDQUFELENBQUQsQ0FBb0NtRixLQUFwQyxDQUEwQztBQUN0Q0MsWUFBUSxFQUFFLEtBRDRCO0FBRXRDQyxTQUFLLEVBQUUsR0FGK0I7QUFHdENDLGdCQUFZLEVBQUVMLFVBSHdCO0FBSXRDTSxrQkFBYyxFQUFFTCxZQUpzQjtBQUt0Q00sVUFBTSxFQUFFLElBTDhCO0FBTXRDO0FBQ0FDLGNBQVUsRUFBRSxDQUNSO0FBQ0lDLGdCQUFVLEVBQUUsSUFEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQURRLEVBUVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBUlEsRUFlUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWLE9BRmQsQ0FPQTtBQUNBO0FBQ0E7O0FBVEEsS0FmUTtBQVAwQixHQUExQztBQWtDSCxDOzs7Ozs7Ozs7Ozs7QUNuQ0QseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpXG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKVxucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5vbignY2xpY2snLCAnLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH0pXG4gICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcylcbiAgICB9KVxuXG4gICAgJCgnLnNiLWJvZHknKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXG4gICAgfSlcbiAgICBmdW5jdGlvbiBjYWxsU2VhcmNoKGUsIGVsbSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPVxuICAgICAgICAgICAgJy9zZWFyY2g/cXVlcnk9JyArXG4gICAgICAgICAgICAkKGVsbSlcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC52YWwoKSAvL3JlbGF0aXZlIHRvIGRvbWFpblxuICAgIH1cblxuICAgIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJylcblxuICAgIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xuXG4gICAgJHNlYXJjaEljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09ICdzZWFyY2hJY29uTW9iaWxlJykge1xuICAgICAgICAgICAgaWYgKCQoJyNzZWFyY2hiYXJIZWFkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkKCcudXNlci1sb2dpbi1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxTaWdudXBGb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgfSlcbiAgICAkKCcjcmVnaXN0ZXItbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICB9KVxuICAgICQoJy51c2VyLWxvZ2luLW1vZGFsMScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbW9kYWxTaWdudXBGb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgIH0pXG5cbiAgICAkKCcud2lzaGxpc3QtbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoKVxuICAgIH0pXG5cbiAgICAkKCdib2R5Jykub24oJ21vdXNlb3ZlcicsICcuZHJvcGRvd24tc3VibWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF0gIT0gJChzZWxmKS5uZXh0KCd1bCcpWzBdKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCd1bCcpXG4gICAgICAgICAgICAudG9nZ2xlKClcbiAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51JylcbiAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICB1cmw6IERFUFRfQVBJLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkZXBhcnRtZW50cykge1xuICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnXG4gICAgICAgICAgICBpZiAoaXNNb2JpbGUoKSkge1xuICAgICAgICAgICAgICAgICQoJ3VsW3JlbD1cImRyb3Bkb3duTW9iaWxlTGlzdGluZ1wiXScpLmVtcHR5KClcbiAgICAgICAgICAgICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJydcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpID48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSByb3dcIj48YSAgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjxhICBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHQgZmxvYXQtcmlnaHRcIj48L2k+PC9hPidcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvdWw+J1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCd1bFtyZWw9XCJkcm9wZG93bk1vYmlsZUxpc3RpbmdcIl0nKS5hcHBlbmQoZGVwdFRvQXBwZW5kKVxuICAgICAgICAgICAgICAgIHZhciBzaW5nbGVEZXB0TW9iaWxlID0gJydcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50cy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlRGVwdE1vYmlsZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtNCBjb2wtc20tYXV0byAtZGVwdCBcIj48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9kaXY+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzQWN0aXZlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgPT09IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0FjdGl2ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPidcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coanFYSFIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gICAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKVxuICAgIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59XG4iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXNTaG93LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=