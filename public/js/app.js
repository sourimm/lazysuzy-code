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

__webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImlzTW9iaWxlIiwiY3NzIiwicG9zaXRpb24iLCJ0b3AiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwiY2F0ZWdvcnkiLCJlcnJvciIsImpxWEhSIiwiZXhjZXB0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInRvZ2dsZUNsYXNzIiwidHJpZ2dlciIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpZGVzU2hvdyIsInNsaWRlc1Njcm9sbCIsInNsaWNrIiwiaW5maW5pdGUiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBQTtBQUFBQTtBQUFBQSxtQkFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnRkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUM1QixNQUFJQyxXQUFXLEdBQUdILENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUVBLE1BQU1JLFFBQVEsR0FBRyxzQkFBakI7QUFFQUQsYUFBVyxDQUFDRSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVQyxDQUFWLEVBQWE7QUFDbkMsUUFBSU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsSUFBYixLQUFzQixrQkFBMUIsRUFBOEM7QUFDNUMsVUFBSVAsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JRLFFBQXRCLENBQStCLE1BQS9CLENBQUosRUFBNEM7QUFDMUNSLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUyxXQUF0QixDQUFrQyxNQUFsQztBQUNELE9BRkQsTUFFTztBQUNMVCxTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlUsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDRDtBQUNGO0FBQ0YsR0FSRDtBQVVBVixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVLLEVBQVYsQ0FBYSxXQUFiLEVBQTBCLG1CQUExQixFQUErQyxVQUFVQyxDQUFWLEVBQWE7QUFDMUQsUUFBSUssSUFBSSxHQUFHLElBQVg7QUFDQVgsS0FBQyxD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O0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKTtcblxuICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICQoJ2JvZHknKS5vbihcIm1vdXNlb3ZlclwiLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKHRoaXMpLmZpbmQoJ3VsJykudG9nZ2xlKCk7XG4gICAgaWYoICFpc01vYmlsZSgpICl7XG4gICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKTtcbiAgICB9XG4gIH0pO1xuXG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IERFUFRfQVBJLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGVwYXJ0bWVudHMpIHtcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcbiAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgIHZhciBzaW5nbGVEZXB0TW9iaWxlID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGVwYXJ0bWVudHMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIHNpbmdsZURlcHRNb2JpbGUgPSAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9kaXY+JztcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2xpPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPjxhICBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5saW5rKydcIiBpZD1cIm5hdmJhckRyb3Bkb3duJytpKydcIiByb2xlPVwiYnV0dG9uXCIgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XG4gICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgLy8gaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiPic7XG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGEgaHJlZj1cIicrZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rKydcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8c3BhbiBjbGFzcz1cIm14LTJcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L3NwYW4+JztcbiAgICAgICAgICAgIC8vICAgdmFyIHN1YmNhdFRvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nO1xuICAgICAgICAgICAgLy8gICBmb3IgKGsgPSAwOyBrIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgLy8gICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10uc3ViX2NhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAvLyAgIHN1YmNhdFRvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSBzdWJjYXRUb0FwcGVuZDtcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8L2xpPic7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmQ7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICQoJyNkZXBhcnRtZW50c05hdicpLmFwcGVuZChkZXB0VG9BcHBlbmQpO1xuXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCBleGNlcHRpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKGpxWEhSKTtcbiAgICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbik7XG4gICAgfVxuICB9KTtcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTW9iaWxlKCl7XG4gIHZhciBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKTtcbiAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2Vcbn0iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXNTaG93LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=