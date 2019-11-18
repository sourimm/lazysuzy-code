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
    var strSelectedText = $(this).children('option:selected') ? $(this).children('option:selected').text() : $this.children('option:selected').eq(0).text();
    var strSelectedValue = $(this).children('option:selected') ? $(this).children('option:selected').attr('value') : $this.children('option:selected').eq(0).attr('value');
    $styledSelect.text(strSelectedText);
    $styledSelect.attr('active', strSelectedValue);
    var $list = $('<ul />', {
      "class": 'select-options'
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

__webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJjbGljayIsImNzcyIsImV2ZW50IiwidG9nZ2xlQ2xhc3MiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJoaWRlIiwiZ2V0QXR0cmlidXRlIiwic2hvdyIsImVsbSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZmluZCIsInZhbCIsIiRzZWFyY2hJY29uIiwiREVQVF9BUEkiLCJhdHRyIiwiaGFzQ2xhc3MiLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImlzTW9iaWxlIiwicG9zaXRpb24iLCJ0b3AiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiZW1wdHkiLCJpIiwibGVuZ3RoIiwiY2F0ZWdvcmllcyIsImxpbmsiLCJkZXBhcnRtZW50IiwiY2F0Z1RvQXBwZW5kIiwiaiIsImNhdGVnb3J5IiwiaHRtbCIsInNpbmdsZURlcHRNb2JpbGUiLCJhcHBlbmQiLCJjbGFzc0FjdGl2ZSIsInBhdGhuYW1lIiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGlkZXNTaG93Iiwic2xpZGVzU2Nyb2xsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixHQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsV0FBakMsRUFBOEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3REQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBRHNELENBRXREOztBQUNBTixLQUFDLENBQUMsSUFBRCxDQUFELENBQ0tPLFFBREwsR0FFS0MsV0FGTCxDQUVpQixRQUZqQjtBQUdBUixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFFBQVIsQ0FBaUIsUUFBakI7QUFDSCxHQVBEO0FBUUFULEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxNQUF0QixDQUE2QixVQUFTTixDQUFULEVBQVk7QUFDckNPLGNBQVUsQ0FBQ1AsQ0FBRCxFQUFJLElBQUosQ0FBVjtBQUNILEdBRkQ7QUFJ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RXZGLEdBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9Dd0YsS0FBcEMsQ0FBMEM7QUFDdENDLFlBQVEsRUFBRSxLQUQ0QjtBQUV0Q0MsU0FBSyxFQUFFLEdBRitCO0FBR3RDQyxnQkFBWSxFQUFFTCxVQUh3QjtBQUl0Q00sa0JBQWMsRUFBRUwsWUFKc0I7QUFLdENNLFVBQU0sRUFBRSxJQUw4QjtBQU10QztBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKVxyXG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpXHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpXHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94JylcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnI2RlcGFydG1lbnRzTmF2Jykub24oJ2NsaWNrJywgJy5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpXHJcbiAgICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgIH0pXHJcbiAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zYi1ib2R5Jykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXHJcbiAgICB9KVxyXG4gICAgJCgnLm5hdmJhci10b2dnbGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzMwMHB4JylcclxuICAgIH0pXHJcbiAgICAkKCcjU2lkZW5hdmJhcmNsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzBweCcpXHJcbiAgICB9KVxyXG4gICAgJCgnLmFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAkKCcuYXJyb3ctaW1nJykudG9nZ2xlQ2xhc3MoJ3JvdGF0ZScpXHJcbiAgICAgICAgJCgnLmFycm93LWltZycpLnRvZ2dsZUNsYXNzKCdyb3RhdGUtcmVzZXQnKVxyXG4gICAgfSlcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNvbGxhcHNpYmxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmNvbGxhcHNpYmxlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICQoJy5jb2xsYXBzZScpLmhpZGUoKVxyXG4gICAgICAgICQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpLnNob3coKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxsU2VhcmNoKGUsIGVsbSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID1cclxuICAgICAgICAgICAgJy9zZWFyY2g/cXVlcnk9JyArXHJcbiAgICAgICAgICAgICQoZWxtKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgIC52YWwoKSAvL3JlbGF0aXZlIHRvIGRvbWFpblxyXG4gICAgfVxyXG5cclxuICAgIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJylcclxuXHJcbiAgICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcclxuXHJcbiAgICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcclxuICAgICAgICAgICAgaWYgKCQoJyNzZWFyY2hiYXJIZWFkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJCgnLnVzZXItbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbW9kYWxTaWdudXBGb3JtJykubW9kYWwoJ3RvZ2dsZScpXHJcbiAgICB9KVxyXG4gICAgJCgnI3JlZ2lzdGVyLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxyXG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxyXG4gICAgfSlcclxuICAgICQoJy51c2VyLWxvZ2luLW1vZGFsMScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcclxuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgndG9nZ2xlJylcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLndpc2hsaXN0LWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoKVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ21vdXNlb3ZlcicsICcuZHJvcGRvd24tc3VibWVudScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF0gIT0gJChzZWxmKS5uZXh0KCd1bCcpWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51JylcclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmZpbmQoJ3VsJylcclxuICAgICAgICAgICAgLnRvZ2dsZSgpXHJcbiAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudScpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICB1cmw6IERFUFRfQVBJLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGVwYXJ0bWVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnXHJcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjY29sbGFwc2libGUtZGVwdCcpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImRlcGFydG1lbnRcIj48YSBjbGFzcz1cImxpbmsgY29sbGFwc2libGVcIiBocmVmPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJkZXBhcnRtZW50XCI+PGEgIGNsYXNzPVwiY29sbGFwc2libGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj48c3BhbiBjbGFzcz1cImxpbmtcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj48c3BhbiAgY2xhc3M9XCJzaWRlLW5hdi1pY29uXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHQgYXJyb3dcIj48L2k+PC9zcGFuPjwvYT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImNvbGxhcHNlIGNhdGVnb3J5LWxpc3RcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiIGlkPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKCcjY29sbGFwc2libGUtZGVwdCcpLmh0bWwoZGVwdFRvQXBwZW5kKVxyXG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgIGhyZWY9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NBY3RpdmUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rID09PSBsb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzQWN0aXZlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjxhICBocmVmPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+J1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGEgaHJlZj1cIicrZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rKydcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8c3BhbiBjbGFzcz1cIm14LTJcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10uc3ViX2NhdGVnb3J5ICsgJzwvYT48L2xpPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHN1YmNhdFRvQXBwZW5kICs9ICc8L3VsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihqcVhIUiwgZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpxWEhSKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKVxyXG4gICAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2VcclxufVxyXG4iLCIvKlxyXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VsZWN0Qm94KCkge1xyXG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGhcclxuXHJcbiAgICAgICAgLy9SZW1vdmUgcHJldmlvdXNseSBtYWRlIHNlbGVjdGJveFxyXG4gICAgICAgICQoJyNzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykpLnJlbW92ZSgpXHJcblxyXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJylcclxuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+JylcclxuICAgICAgICAkdGhpcy5hZnRlcihcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCIgaWQ9XCJzZWxlY3Rib3gtJyArXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5hdHRyKCdpZCcpICtcclxuICAgICAgICAgICAgICAgICdcIj48L2Rpdj4nXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJylcclxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJylcclxuICAgICAgICAgICAgPyAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICA6ICR0aGlzXHJcbiAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgLmVxKDApXHJcbiAgICAgICAgICAgICAgICAgIC50ZXh0KClcclxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAgID8gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScpXHJcbiAgICAgICAgICAgIDogJHRoaXNcclxuICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJylcclxuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoc3RyU2VsZWN0ZWRUZXh0KVxyXG4gICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSlcclxuXHJcbiAgICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ3NlbGVjdC1vcHRpb25zJ1xyXG4gICAgICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcclxuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJ29wdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoKSxcclxuICAgICAgICAgICAgICAgIHJlbDogJHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJ29wdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnZhbCgpXHJcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKVxyXG5cclxuICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgLm5vdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIC5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cigncmVsJylcclxuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKVxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzZWxlY3QtdmFsdWUtY2hhbmdlZCcsICRzdHlsZWRTZWxlY3QpXHJcblxyXG4gICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSlcclxuICAgICAgICAgICAgJGxpc3QuaGlkZSgpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAkbGlzdC5oaWRlKClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcclxuICAgICQoJy5yZXNwb25zaXZlOm5vdCguc2xpY2stc2xpZGVyKScpLnNsaWNrKHtcclxuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IHNsaWRlc1Nob3csXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IHNsaWRlc1Njcm9sbCxcclxuICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcclxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXHJcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxufVxyXG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=