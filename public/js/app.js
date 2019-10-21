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
    $('#Sidenavbar').css('width', '350px');
  });
  $('#Sidenavbarclose').click(function () {
    $('#Sidenavbar').css('width', '0px');
  });
  var coll = document.getElementsByClassName('collapsible');

  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function () {
      this.classList.toggle('active');
      $('.collapse').hide();
      var content = document.getElementById(this.attr('data-target'));

      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

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
            deptToAppend += '<li class="dropdown-submenu row"><a  class="dropdown-item" href="' + departments[i].link + '">' + departments[i].department + '</a><a  class="dropdown-toggle collapsible" data-target="#' + departments[i].department + '" id="navbarDropdown' + i + '"><i class="fas fa-angle-right float-right"></i></a>';
            var catgToAppend = '<ul class="dropdown-menu collapse" aria-labelledby="navbarDropdown" id="' + departments[i].department + '">';

            for (var j = 0; j < departments[i].categories.length; j++) {
              catgToAppend += '<li><a class="dropdown-item" href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJjbGljayIsImNzcyIsImNvbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaSIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJoaWRlIiwiY29udGVudCIsImdldEVsZW1lbnRCeUlkIiwiYXR0ciIsInN0eWxlIiwiZGlzcGxheSIsImVsbSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZmluZCIsInZhbCIsIiRzZWFyY2hJY29uIiwiREVQVF9BUEkiLCJoYXNDbGFzcyIsIm1vZGFsIiwic2VsZiIsImVhY2giLCJuZXh0IiwiaXNNb2JpbGUiLCJwb3NpdGlvbiIsInRvcCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZGVwYXJ0bWVudHMiLCJkZXB0VG9BcHBlbmQiLCJlbXB0eSIsImNhdGVnb3JpZXMiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImNhdGdUb0FwcGVuZCIsImoiLCJjYXRlZ29yeSIsImh0bWwiLCJzaW5nbGVEZXB0TW9iaWxlIiwiYXBwZW5kIiwiY2xhc3NBY3RpdmUiLCJwYXRobmFtZSIsImVycm9yIiwianFYSFIiLCJleGNlcHRpb24iLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1ha2VTZWxlY3RCb3giLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwicmVtb3ZlIiwid3JhcCIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsInN0clNlbGVjdGVkVGV4dCIsInRleHQiLCJlcSIsInN0clNlbGVjdGVkVmFsdWUiLCIkbGlzdCIsImluc2VydEFmdGVyIiwicmVsIiwiYXBwZW5kVG8iLCIkbGlzdEl0ZW1zIiwic3RvcFByb3BhZ2F0aW9uIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGlkZXNTaG93Iiwic2xpZGVzU2Nyb2xsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixHQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsV0FBakMsRUFBOEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3REQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBRHNELENBRXREOztBQUNBTixLQUFDLENBQUMsSUFBRCxDQUFELENBQ0tPLFFBREwsR0FFS0MsV0FGTCxDQUVpQixRQUZqQjtBQUdBUixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFFBQVIsQ0FBaUIsUUFBakI7QUFDSCxHQVBEO0FBUUFULEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxNQUF0QixDQUE2QixV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InNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpXG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKVxucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5vbignY2xpY2snLCAnLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH0pXG4gICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcylcbiAgICB9KVxuXG4gICAgJCgnLnNiLWJvZHknKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICBjYWxsU2VhcmNoKGUsIHRoaXMpXG4gICAgfSlcbiAgICAkKCcubmF2YmFyLXRvZ2dsZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzM1MHB4JylcbiAgICB9KVxuICAgICQoJyNTaWRlbmF2YmFyY2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI1NpZGVuYXZiYXInKS5jc3MoJ3dpZHRoJywgJzBweCcpXG4gICAgfSlcblxuICAgIGxldCBjb2xsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sbGFwc2libGUnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb2xsW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAkKCcuY29sbGFwc2UnKS5oaWRlKClcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpKVxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsbFNlYXJjaChlLCBlbG0pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID1cbiAgICAgICAgICAgICcvc2VhcmNoP3F1ZXJ5PScgK1xuICAgICAgICAgICAgJChlbG0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAudmFsKCkgLy9yZWxhdGl2ZSB0byBkb21haW5cbiAgICB9XG5cbiAgICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpXG5cbiAgICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAgICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgICAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5yZW1vdmVDbGFzcygnb3BlbicpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJCgnLnVzZXItbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgIH0pXG4gICAgJCgnI3JlZ2lzdGVyLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgfSlcbiAgICAkKCcudXNlci1sb2dpbi1tb2RhbDEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICB9KVxuXG4gICAgJCgnLndpc2hsaXN0LWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKClcbiAgICB9KVxuXG4gICAgJCgnYm9keScpLm9uKCdtb3VzZW92ZXInLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpWzBdICE9ICQoc2VsZikubmV4dCgndWwnKVswXSkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51JylcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgndWwnKVxuICAgICAgICAgICAgLnRvZ2dsZSgpXG4gICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudScpXG4gICAgICAgICAgICAgICAgLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgdXJsOiBERVBUX0FQSSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGVwYXJ0bWVudHMpIHtcbiAgICAgICAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJ1xuICAgICAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgICAgICAkKCd1bFtyZWw9XCJkcm9wZG93bk1vYmlsZUxpc3RpbmdcIl0nKS5lbXB0eSgpXG4gICAgICAgICAgICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaSA+PGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnUgcm93XCI+PGEgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48YSAgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgY29sbGFwc2libGVcIiBkYXRhLXRhcmdldD1cIiMnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodCBmbG9hdC1yaWdodFwiPjwvaT48L2E+J1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgY29sbGFwc2VcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiIGlkPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPidcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJyNjb2xsYXBzaWJsZS1kZXB0JykuaHRtbChkZXB0VG9BcHBlbmQpXG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJ1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhICBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9kaXY+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzQWN0aXZlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgPT09IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0FjdGl2ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPidcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coanFYSFIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gICAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKVxuICAgIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59XG4iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXNTaG93LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=