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
  $('body').on("mouseover", '.dropdown-submenu', function (e) {
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
    type: "GET",
    url: DEPT_API,
    dataType: "json",
    success: function success(departments) {
      var deptToAppend = '';

      if (isMobile()) {
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
          deptToAppend += '<li class="dropdown"><a  href="' + departments[i].link + '" id="navbarDropdown' + i + '" role="button"  aria-haspopup="true" aria-expanded="false">' + departments[i].department + '</a>';
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
  var isMobile = window.matchMedia("only screen and (max-width: 768px)");
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

__webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic3VibWl0IiwiZSIsImNhbGxTZWFyY2giLCJlbG0iLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImZpbmQiLCJ2YWwiLCIkc2VhcmNoSWNvbiIsIkRFUFRfQVBJIiwib24iLCJhdHRyIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2xpY2siLCJtb2RhbCIsInNlbGYiLCJlYWNoIiwibmV4dCIsImhpZGUiLCJ0b2dnbGUiLCJpc01vYmlsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsInNpbmdsZURlcHRNb2JpbGUiLCJpIiwibGVuZ3RoIiwibGluayIsImRlcGFydG1lbnQiLCJhcHBlbmQiLCJjYXRlZ29yaWVzIiwiY2F0Z1RvQXBwZW5kIiwiaiIsImNhdGVnb3J5IiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1ha2VTZWxlY3RCb3giLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwicmVtb3ZlIiwid3JhcCIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsInN0clNlbGVjdGVkVGV4dCIsInRleHQiLCJlcSIsInN0clNlbGVjdGVkVmFsdWUiLCIkbGlzdCIsImluc2VydEFmdGVyIiwicmVsIiwiYXBwZW5kVG8iLCIkbGlzdEl0ZW1zIiwic3RvcFByb3BhZ2F0aW9uIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGlkZXNTaG93Iiwic2xpZGVzU2Nyb2xsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBQzVCRixHQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQkcsTUFBdEIsQ0FBNkIsVUFBU0MsQ0FBVCxFQUFXO0FBQ3RDQyxjQUFVLENBQUNELENBQUQsRUFBRyxJQUFILENBQVY7QUFDRCxHQUZEO0FBSUFKLEdBQUMsQ0FBQyxVQUFELENBQUQsQ0FBY0csTUFBZCxDQUFxQixVQUFTQyxDQUFULEVBQVc7QUFDNUJDLGNBQVUsQ0FBQ0QsQ0FBRCxFQUFHLElBQUgsQ0FBVjtBQUNILEdBRkQ7O0FBSUEsV0FBU0MsVUFBVCxDQUFvQkQsQ0FBcEIsRUFBdUJFLEdBQXZCLEVBQTJCO0FBQ3ZCRixLQUFDLENBQUNHLGNBQUY7QUFDQUMsVUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixtQkFBaUJWLENBQUMsQ0FBQ00sR0FBRCxDQUFELENBQU9LLElBQVAsQ0FBWSxPQUFaLEVBQXFCQyxHQUFyQixFQUF4QyxDQUZ1QixDQUU2QztBQUN2RTs7QUFFRCxNQUFJQyxXQUFXLEdBQUdiLENBQUMsQ0FBQyxtQkFBRCxD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QyxJQUFOLEdBUjBCLENBUzFCO0FBQ0gsS0FWRDtBQVlBekIsS0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWW1CLEtBQVosQ0FBa0IsWUFBWTtBQUMxQjBDLG1CQUFhLENBQUM1QyxXQUFkLENBQTBCLFFBQTFCO0FBQ0FpRCxXQUFLLENBQUMxQyxJQUFOO0FBQ0gsS0FIRDtBQUtILEdBdEREO0FBdURILEM7Ozs7Ozs7Ozs7Ozs7QUM1REQ7QUFBQTtBQUFPLFNBQVNtRCxpQkFBVCxHQUE2RDtBQUFBLE1BQWxDQyxVQUFrQyx1RUFBckIsQ0FBcUI7QUFBQSxNQUFsQkMsWUFBa0IsdUVBQUgsQ0FBRztBQUNoRTlFLEdBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9DK0UsS0FBcEMsQ0FBMEM7QUFDdENDLFlBQVEsRUFBRSxLQUQ0QjtBQUV0Q0MsU0FBSyxFQUFFLEdBRitCO0FBR3RDQyxnQkFBWSxFQUFFTCxVQUh3QjtBQUl0Q00sa0JBQWMsRUFBRUwsWUFKc0I7QUFLdENNLFVBQU0sRUFBRSxJQUw4QjtBQU10QztBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcclxucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTtcclxucmVxdWlyZSgnLi9jb21wb25lbnRzL211bHRpLWNhcm91c2VsJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnN1Ym1pdChmdW5jdGlvbihlKXtcclxuICAgIGNhbGxTZWFyY2goZSx0aGlzKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLnNiLWJvZHknKS5zdWJtaXQoZnVuY3Rpb24oZSl7XHJcbiAgICAgIGNhbGxTZWFyY2goZSx0aGlzKTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gY2FsbFNlYXJjaChlLCBlbG0pe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9zZWFyY2g/cXVlcnk9JyskKGVsbSkuZmluZCgnaW5wdXQnKS52YWwoKTsgLy9yZWxhdGl2ZSB0byBkb21haW5cclxuICB9XHJcblxyXG4gIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJyk7XHJcblxyXG4gIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xyXG5cclxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcclxuICAgICAgaWYgKCQoJyNzZWFyY2hiYXJIZWFkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0gIFxyXG4gIH0pO1xyXG5cclxuICAkKCcudXNlci1sb2dpbi1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcud2lzaGxpc3QtbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJ2JvZHknKS5vbihcIm1vdXNlb3ZlclwiLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICQodGhpcykuZmluZCgndWwnKS50b2dnbGUoKTtcclxuICAgIGlmKCAhaXNNb2JpbGUoKSApe1xyXG4gICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICB1cmw6IERFUFRfQVBJLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKGRlcGFydG1lbnRzKSB7XHJcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcclxuICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICB2YXIgc2luZ2xlRGVwdE1vYmlsZSA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChkZXBhcnRtZW50cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID0gJzxkaXYgY2xhc3M9XCJjb2wtNCBjb2wtc20tYXV0byAtZGVwdCBcIj48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPjwvZGl2Pic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkKCcjbW9iaWxlRGVwYXJ0bWVudHMnKS5hcHBlbmQoc2luZ2xlRGVwdE1vYmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPjxhICBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5saW5rKydcIiBpZD1cIm5hdmJhckRyb3Bkb3duJytpKydcIiByb2xlPVwiYnV0dG9uXCIgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XHJcbiAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPic7XHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgLy8gaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8L2E+PC9saT4nXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51XCI+JztcclxuICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIC8vICAgdmFyIHN1YmNhdFRvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nO1xyXG4gICAgICAgICAgICAvLyAgIGZvciAoayA9IDA7IGsgPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXHJcbiAgICAgICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xyXG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSBzdWJjYXRUb0FwcGVuZDtcclxuICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzwvbGk+JztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPic7XHJcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kO1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgICQoJyNkZXBhcnRtZW50c05hdicpLmFwcGVuZChkZXB0VG9BcHBlbmQpO1xyXG5cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCBleGNlcHRpb24pIHtcclxuICAgICAgY29uc29sZS5sb2coanFYSFIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIik7XHJcbiAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2VcclxufSIsIi8qXHJcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTZWxlY3RCb3goKSB7XHJcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcclxuICAgICAgICAkKCcjc2VsZWN0Ym94LScgKyAkdGhpcy5hdHRyKCdpZCcpKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcclxuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCIgaWQ9XCJzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykgKyAnXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcclxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikudGV4dCgpIDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpLmVxKDApLnRleHQoKVxyXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXHJcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KHN0clNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXHJcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcclxuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcclxuICAgICAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXHJcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XHJcblxyXG4gICAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cigncmVsJyk7XHJcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XHJcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSIsImV4cG9ydCBmdW5jdGlvbiBtYWtlTXVsdGlDYXJvdXNlbChzbGlkZXNTaG93ID0gNCwgc2xpZGVzU2Nyb2xsID0gNCkge1xyXG4gICAgJCgnLnJlc3BvbnNpdmU6bm90KC5zbGljay1zbGlkZXIpJykuc2xpY2soe1xyXG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogc2xpZGVzU2hvdyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG59XHJcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==