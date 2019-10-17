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
    $('#modalLoginForm').modal();
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

__webpack_require__(/*! /var/www/html/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /var/www/html/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJlbG0iLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImZpbmQiLCJ2YWwiLCIkc2VhcmNoSWNvbiIsIkRFUFRfQVBJIiwiYXR0ciIsImhhc0NsYXNzIiwiY2xpY2siLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImhpZGUiLCJ0b2dnbGUiLCJpc01vYmlsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImVtcHR5IiwiaSIsImxlbmd0aCIsImNhdGVnb3JpZXMiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImNhdGdUb0FwcGVuZCIsImoiLCJjYXRlZ29yeSIsImFwcGVuZCIsInNpbmdsZURlcHRNb2JpbGUiLCJjbGFzc0FjdGl2ZSIsInBhdGhuYW1lIiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0b2dnbGVDbGFzcyIsInRyaWdnZXIiLCJtYWtlTXVsdGlDYXJvdXNlbCIsInNsaWRlc1Nob3ciLCJzbGlkZXNTY3JvbGwiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQUE7QUFBQUE7QUFBQUEsbUJBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekJGLEdBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCRyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxXQUFqQyxFQUE4QyxVQUFTQyxDQUFULEVBQVk7QUFDdERDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFEc0QsQ0FFdEQ7O0FBQ0FOLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FDS08sUUFETCxHQUVLQyxXQUZMLENBRWlCLFFBRmpCO0FBR0FSLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVMsUUFBUixDQUFpQixRQUFqQjtBQUNILEdBUEQ7QUFRQVQsR0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JVLE1BQXRCLENBQTZCLFVBQVNOLENBQVQsRUFBWTtBQUNyQ08sY0FBVSxDQUFDUCxDQUFELEVBQUksSUFBSixDQUFWO0FBQ0gsR0FGRDtBQUlBSixHQUFDLENBQUMsVUFBRCxDQUFELENBQWNVLE1BQWQsQ0FBcUIsVUFBU04sQ0FB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Q0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJyNkZXBhcnRtZW50c05hdicpLm9uKCdjbGljaycsICcuZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcyk7XG4gICAgfSk7XG5cbiAgICAkKCcuc2ItYm9keScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcyk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2FsbFNlYXJjaChlLCBlbG0pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9XG4gICAgICAgICAgICAnL3NlYXJjaD9xdWVyeT0nICtcbiAgICAgICAgICAgICQoZWxtKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLnZhbCgpOyAvL3JlbGF0aXZlIHRvIGRvbWFpblxuICAgIH1cblxuICAgIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJyk7XG5cbiAgICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cyc7XG5cbiAgICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICAgICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy51c2VyLWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCk7XG4gICAgfSk7XG5cbiAgICAkKCcud2lzaGxpc3QtbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignbW91c2VvdmVyJywgJy5kcm9wZG93bi1zdWJtZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF0gIT0gJChzZWxmKS5uZXh0KCd1bCcpWzBdKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoJ3VsJylcbiAgICAgICAgICAgIC50b2dnbGUoKTtcbiAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51JylcbiAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHVybDogREVQVF9BUEksXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRlcGFydG1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJyc7XG4gICAgICAgICAgICBpZiAoaXNNb2JpbGUoKSkge1xuICAgICAgICAgICAgICAgICQoJ3VsW3JlbD1cImRyb3Bkb3duTW9iaWxlTGlzdGluZ1wiXScpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGkgPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSByb3dcIj48YSAgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjxhICBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHQgZmxvYXQtcmlnaHRcIj48L2k+PC9hPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCd1bFtyZWw9XCJkcm9wZG93bk1vYmlsZUxpc3RpbmdcIl0nKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcbiAgICAgICAgICAgICAgICB2YXIgc2luZ2xlRGVwdE1vYmlsZSA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NBY3RpdmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayA9PT0gbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0FjdGl2ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kO1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGpxWEhSLCBleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpxWEhSKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KScpO1xuICAgIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlO1xufVxuIiwiLypcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTZWxlY3RCb3goKSB7XG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcblxuICAgICAgICAvL1JlbW92ZSBwcmV2aW91c2x5IG1hZGUgc2VsZWN0Ym94XG4gICAgICAgICQoJyNzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykpLnJlbW92ZSgpO1xuXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7XG4gICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJzZWxlY3RcIj48L2Rpdj4nKTtcbiAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCIgaWQ9XCJzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykgKyAnXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikudGV4dCgpIDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpLmVxKDApLnRleHQoKVxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLmF0dHIoJ3ZhbHVlJykgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkuYXR0cigndmFsdWUnKVxuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoc3RyU2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcblxuICAgICAgICB2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG4gICAgICAgICAgICAnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG4gICAgICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcbiAgICAgICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXG4gICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXG4gICAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5hdHRyKCdyZWwnKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzZWxlY3QtdmFsdWUtY2hhbmdlZCcsICRzdHlsZWRTZWxlY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCR0aGlzLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIG1ha2VNdWx0aUNhcm91c2VsKHNsaWRlc1Nob3cgPSA0LCBzbGlkZXNTY3JvbGwgPSA0KSB7XG4gICAgJCgnLnJlc3BvbnNpdmU6bm90KC5zbGljay1zbGlkZXIpJykuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogc2xpZGVzU2hvdyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IHNsaWRlc1Njcm9sbCxcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBZb3UgY2FuIHVuc2xpY2sgYXQgYSBnaXZlbiBicmVha3BvaW50IG5vdyBieSBhZGRpbmc6XG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcbiAgICAgICAgXVxuICAgIH0pO1xufVxuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9