(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

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
    $(this).find('.dropdown-menu').css('top', $(this).position().top);
  });
  $.ajax({
    type: "GET",
    url: DEPT_API,
    dataType: "json",
    success: function success(departments) {
      var deptToAppend = '';

      if (isMobile()) {
        var singleDeptMobile = '';

        for (i = 0; i < departments.length; i++) {
          if (departments.length != 0) {
            singleDeptMobile = '<div class="col-4 col-sm-auto -dept "><a href="' + departments[i].link + '">' + departments[i].department + '</a></div>';
          }

          $('#mobileDepartments').append(singleDeptMobile);
        }
      }

      for (i = 0; i < departments.length; i++) {
        if (departments[i].categories.length == 0) {
          deptToAppend += '<li><a href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
        } else {
          deptToAppend += '<li class="dropdown"><a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + departments[i].department + '</a>';
          var catgToAppend = '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';

          for (j = 0; j < departments[i].categories.length; j++) {
            if (departments[i].categories[j].sub_categories.length == 0) {
              catgToAppend += '<li><a href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>';
            } else {
              catgToAppend += '<li class="dropdown-submenu">';
              catgToAppend += '<a href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '<span class="mx-2"><i class="fas fa-angle-right"></i></span>';
              var subcatToAppend = '<ul class="dropdown-menu">';

              for (k = 0; k < departments[i].categories[j].sub_categories.length; k++) {
                subcatToAppend += '<li><a href="' + departments[i].categories[j].sub_categories[k].link + '">' + departments[i].categories[j].sub_categories[k].sub_category + '</a></li>';
              }

              subcatToAppend += '</ul>';
              catgToAppend += subcatToAppend;
              catgToAppend += '</li>';
            }
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

isMobile = function isMobile() {
  var isMobile = window.matchMedia("only screen and (max-width: 768px)");
  return isMobile.matches ? true : false;
};
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

__webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImlzTW9iaWxlIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwic3ViX2NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInN1YmNhdFRvQXBwZW5kIiwiayIsInN1Yl9jYXRlZ29yeSIsImVycm9yIiwianFYSFIiLCJleGNlcHRpb24iLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtYWtlU2VsZWN0Qm94IiwiJHRoaXMiLCJudW1iZXJPZk9wdGlvbnMiLCJjaGlsZHJlbiIsInJlbW92ZSIsIndyYXAiLCJhZnRlciIsIiRzdHlsZWRTZWxlY3QiLCJzdHJTZWxlY3RlZFRleHQiLCJ0ZXh0IiwiZXEiLCJzdHJTZWxlY3RlZFZhbHVlIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJ0cmlnZ2VyIiwibWFrZU11bHRpQ2Fyb3VzZWwiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSw0REFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnRkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUM1QixNQUFJQyxXQUFXLEdBQUdILENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUVBLE1BQU1JLFFBQVEsR0FBRyxzQkFBakI7QUFFQUQsYUFBVyxDQUFDRSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVQyxDQUFWLEVBQWE7QUFDbkMsUUFBSU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsSUFBYixLQUFzQixrQkFBMUIsRUFBOEM7QUFDNUMsVUFBSVAsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JRLFFBQXRCLENBQStCLE1BQS9CLENBQUosRUFBNEM7QUFDMUNSLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUyxXQUF0QixDQUFrQyxNQUFsQztBQUNELE9BRkQsTUFFTztBQUNMVCxTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlUsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDRDtBQUNGO0FBQ0YsR0FSRDtBQVVBVixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVLLEVBQVYsQ0FBYSxXQUFiLEVBQTBCLG1CQUExQixFQUErQyxVQUFVQyxDQUFWLEVBQWE7QUFDMUQsUUFBSUssSUFBSSxHQUFHLElBQVg7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QUFDSCxLQUhEO0FBS0gsR0F0REQ7QUF1REgsQzs7Ozs7Ozs7Ozs7OztBQzVERDtBQUFBO0FBQU8sU0FBUzBELGlCQUFULEdBQTZCO0FBQ2hDekUsR0FBQyxDQUFDLGdDQUFELENBQUQsQ0FBb0MwRSxLQUFwQyxDQUEwQztBQUN0Q0MsWUFBUSxFQUFFLEtBRDRCO0FBRXRDQyxTQUFLLEVBQUUsR0FGK0I7QUFHdENDLGdCQUFZLEVBQUUsQ0FId0I7QUFJdENDLGtCQUFjLEVBQUUsQ0FKc0I7QUFLdENDLFVBQU0sRUFBRSxJQUw4QjtBQU10QztBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKTtcblxuICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICQoJ2JvZHknKS5vbihcIm1vdXNlb3ZlclwiLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKHRoaXMpLmZpbmQoJ3VsJykudG9nZ2xlKCk7XG4gICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcCk7XG4gIH0pO1xuXG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IERFUFRfQVBJLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGVwYXJ0bWVudHMpIHtcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcbiAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgIHZhciBzaW5nbGVEZXB0TW9iaWxlID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChkZXBhcnRtZW50cy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgc2luZ2xlRGVwdE1vYmlsZSA9ICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2Rpdj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcjbW9iaWxlRGVwYXJ0bWVudHMnKS5hcHBlbmQoc2luZ2xlRGVwdE1vYmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9saT4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj48YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGhyZWY9XCIjXCIgaWQ9XCJuYXZiYXJEcm9wZG93blwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+JztcbiAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPic7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kO1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhqcVhIUik7XG4gICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pO1xuICAgIH1cbiAgfSk7XG59KVxuXG5pc01vYmlsZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKTtcbiAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2Vcbn0iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoKSB7XG4gICAgJCgnLnJlc3BvbnNpdmU6bm90KC5zbGljay1zbGlkZXIpJykuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgIF1cbiAgICB9KTtcbn1cbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==