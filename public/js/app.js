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
      $(document).trigger('select-value-changed');
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
  $('.responsive:not(.slick-slider)').slick({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImlzTW9iaWxlIiwiY3NzIiwicG9zaXRpb24iLCJ0b3AiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwiY2F0ZWdvcnkiLCJlcnJvciIsImpxWEhSIiwiZXhjZXB0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInRvZ2dsZUNsYXNzIiwidHJpZ2dlciIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBQzVCLE1BQUlDLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG1CQUFELENBQW5CO0FBRUEsTUFBTUksUUFBUSxHQUFHLHNCQUFqQjtBQUVBRCxhQUFXLENBQUNFLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVVDLENBQVYsRUFBYTtBQUNuQyxRQUFJTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFPLElBQVIsQ0FBYSxJQUFiLEtBQXNCLGtCQUExQixFQUE4QztBQUM1QyxVQUFJUCxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlEsUUFBdEIsQ0FBK0IsTUFBL0IsQ0FBSixFQUE0QztBQUMxQ1IsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JTLFdBQXRCLENBQWtDLE1BQWxDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xULFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxRQUF0QixDQUErQixNQUEvQjtBQUNEO0FBQ0Y7QUFDRixHQVJEO0FBVUFWLEdBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUssRUFBVixDQUFhLFdBQWIsRUFBMEIsbUJBQTFCLEVBQStDLFVBQVVDLENBQVYsRUFBYTtBQUMxRCxRQUFJSyxJQUFJLEdBQUcsSUFBWDtBQUNBWCxLQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QlksSUFBdkIs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Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcclxucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTtcclxucmVxdWlyZSgnLi9jb21wb25lbnRzL211bHRpLWNhcm91c2VsJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKTtcclxuXHJcbiAgY29uc3QgREVQVF9BUEkgPSAnL2FwaS9hbGwtZGVwYXJ0bWVudHMnXHJcblxyXG4gICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09ICdzZWFyY2hJY29uTW9iaWxlJykge1xyXG4gICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCdib2R5Jykub24oXCJtb3VzZW92ZXJcIiwgJy5kcm9wZG93bi1zdWJtZW51JywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF0gIT0gJChzZWxmKS5uZXh0KCd1bCcpWzBdKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKHRoaXMpLmZpbmQoJ3VsJykudG9nZ2xlKCk7XHJcbiAgICBpZiggIWlzTW9iaWxlKCkgKXtcclxuICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgdXJsOiBERVBUX0FQSSxcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkZXBhcnRtZW50cykge1xyXG4gICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJyc7XHJcbiAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZGVwYXJ0bWVudHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgc2luZ2xlRGVwdE1vYmlsZSA9ICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2Rpdj4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj48YSAgaHJlZj1cIicrZGVwYXJ0bWVudHNbaV0ubGluaysnXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicraSsnXCIgcm9sZT1cImJ1dHRvblwiICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT4nO1xyXG4gICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiPic7XHJcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8YSBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsrJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcclxuICAgICAgICAgICAgLy8gICBmb3IgKGsgPSAwOyBrIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvLyAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcclxuICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XHJcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8L2xpPic7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nO1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcclxuXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgZXhjZXB0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGpxWEhSKTtcclxuICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcclxuICAgIH1cclxuICB9KTtcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpXCIpO1xyXG4gIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXHJcbn0iLCIvKlxyXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VsZWN0Qm94KCkge1xyXG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAvL1JlbW92ZSBwcmV2aW91c2x5IG1hZGUgc2VsZWN0Ym94XHJcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7XHJcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xyXG4gICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiIGlkPVwic2VsZWN0Ym94LScgKyAkdGhpcy5hdHRyKCdpZCcpICsgJ1wiPjwvZGl2PicpO1xyXG5cclxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XHJcbiAgICAgICAgdmFyIHN0clNlbGVjdGVkVGV4dCA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLnRleHQoKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS50ZXh0KClcclxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLmF0dHIoJ3ZhbHVlJykgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkuYXR0cigndmFsdWUnKVxyXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xyXG4gICAgICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XHJcbiAgICAgICAgICAgICQoJzxsaSAvPicsIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXHJcbiAgICAgICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxyXG4gICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xyXG5cclxuICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzZWxlY3QtdmFsdWUtY2hhbmdlZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xyXG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoKSB7XHJcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG59XHJcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==