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
  $('body').on("click", '.dropdown-submenu a', function (e) {
    var self = this;
    $('.dropdown-submenu').each(function () {
      if ($(this).find('.dropdown-menu')[0] != $(self).next('ul')[0]) {
        $(this).find('.dropdown-menu').hide();
      }
    });
    $(this).next('ul').toggle();
    $(this).next('.dropdown-menu').css('top', $(this).position().top);
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
              catgToAppend += '<a href="#">' + departments[i].categories[j].category + '<span class="mx-2"><i class="fas fa-angle-right"></i></span>';
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
        numberOfOptions = $(this).children('option').length;
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImlzTW9iaWxlIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwic3ViX2NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInN1YmNhdFRvQXBwZW5kIiwiayIsInN1Yl9jYXRlZ29yeSIsImVycm9yIiwianFYSFIiLCJleGNlcHRpb24iLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtYWtlU2VsZWN0Qm94IiwiJHRoaXMiLCJudW1iZXJPZk9wdGlvbnMiLCJjaGlsZHJlbiIsIndyYXAiLCJhZnRlciIsIiRzdHlsZWRTZWxlY3QiLCJ0ZXh0IiwiZXEiLCIkbGlzdCIsImluc2VydEFmdGVyIiwicmVsIiwidmFsIiwiYXBwZW5kVG8iLCIkbGlzdEl0ZW1zIiwiY2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJub3QiLCJ0b2dnbGVDbGFzcyIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsNERBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDNUIsTUFBSUMsV0FBVyxHQUFHSCxDQUFDLENBQUMsbUJBQUQsQ0FBbkI7QUFFQSxNQUFNSSxRQUFRLEdBQUcsc0JBQWpCO0FBRUFELGFBQVcsQ0FBQ0UsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVUMsQ0FBVixFQUFhO0FBQ25DLFFBQUlOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLElBQWIsS0FBc0Isa0JBQTFCLEVBQThDO0FBQzVDLFVBQUlQLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUSxRQUF0QixDQUErQixNQUEvQixDQUFKLEVBQTRDO0FBQzFDUixTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlMsV0FBdEIsQ0FBa0MsTUFBbEM7QUFDRCxPQUZELE1BRU87QUFDTFQsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JVLFFBQXRCLENBQStCLE1BQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBUkQ7QUFVQVYsR0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVSyxFQUFWLENBQWEsT0FBYixFQUFzQixxQkFBdEIsRUFBNkMsVUFBVUMsQ0FBVixFQUFhO0FBQ3hELFFBQUlLLElBQUksR0FBRyxJQUFYO0FBQ0FYLEtBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCWSxJQUF2QixDQUE0QixZQUFZO0FBQ3RD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QUFDSCxLQUhEO0FBS0gsR0E1Q0Q7QUE2Q0gsQzs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUFBO0FBQU8sU0FBU3NELGlCQUFULEdBQTZCO0FBQ2hDckUsR0FBQyxDQUFDLGdDQUFELENBQUQsQ0FBb0NzRSxLQUFwQyxDQUEwQztBQUN0Q0MsWUFBUSxFQUFFLEtBRDRCO0FBRXRDQyxTQUFLLEVBQUUsR0FGK0I7QUFHdENDLGdCQUFZLEVBQUUsQ0FId0I7QUFJdENDLGtCQUFjLEVBQUUsQ0FKc0I7QUFLdENDLFVBQU0sRUFBRSxJQUw4QjtBQU10QztBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQMEIsR0FBMUM7QUFrQ0gsQzs7Ozs7Ozs7Ozs7O0FDbkNELHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKTtcblxuICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICQoJ2JvZHknKS5vbihcImNsaWNrXCIsICcuZHJvcGRvd24tc3VibWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF0gIT0gJChzZWxmKS5uZXh0KCd1bCcpWzBdKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCh0aGlzKS5uZXh0KCd1bCcpLnRvZ2dsZSgpO1xuICAgICQodGhpcykubmV4dCgnLmRyb3Bkb3duLW1lbnUnKS5jc3MoJ3RvcCcsICQodGhpcykucG9zaXRpb24oKS50b3ApO1xuICB9KTtcblxuICAkLmFqYXgoe1xuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgdXJsOiBERVBUX0FQSSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKGRlcGFydG1lbnRzKSB7XG4gICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJyc7XG4gICAgICBpZiAoaXNNb2JpbGUoKSkge1xuICAgICAgICB2YXIgc2luZ2xlRGVwdE1vYmlsZSA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGVwYXJ0bWVudHMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIHNpbmdsZURlcHRNb2JpbGUgPSAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9kaXY+JztcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPjwvbGk+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+PGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBocmVmPVwiI1wiIGlkPVwibmF2YmFyRHJvcGRvd25cIiByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XG4gICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51XCI+JztcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8YSBocmVmPVwiI1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZCk7XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5sb2coanFYSFIpO1xuICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcbiAgICB9XG4gIH0pO1xufSlcblxuaXNNb2JpbGUgPSBmdW5jdGlvbigpe1xuICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIik7XG4gIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59IiwiLypcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTZWxlY3RCb3goKSB7XG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpO1xuICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiPjwvZGl2PicpO1xuXG4gICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBtYWtlTXVsdGlDYXJvdXNlbCgpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBZb3UgY2FuIHVuc2xpY2sgYXQgYSBnaXZlbiBicmVha3BvaW50IG5vdyBieSBhZGRpbmc6XG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcbiAgICAgICAgXVxuICAgIH0pO1xufVxuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9