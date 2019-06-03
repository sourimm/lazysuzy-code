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
    e.stopPropagation();
    e.preventDefault();
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*
Reference: http://jsfiddle.net/BB3JK/47/
*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiaXNNb2JpbGUiLCJzaW5nbGVEZXB0TW9iaWxlIiwiaSIsImxlbmd0aCIsImxpbmsiLCJkZXBhcnRtZW50IiwiYXBwZW5kIiwiY2F0ZWdvcmllcyIsImNhdGdUb0FwcGVuZCIsImoiLCJzdWJfY2F0ZWdvcmllcyIsImNhdGVnb3J5Iiwic3ViY2F0VG9BcHBlbmQiLCJrIiwic3ViX2NhdGVnb3J5IiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJtYWtlTXVsdGlDYXJvdXNlbCIsInNsaWNrIiwiaW5maW5pdGUiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUFBLDREQUFPLENBQUMsZ0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGdGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBQzVCLE1BQUlDLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG1CQUFELENBQW5CO0FBRUEsTUFBTUksUUFBUSxHQUFHLHNCQUFqQjtBQUVBRCxhQUFXLENBQUNFLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVVDLENBQVYsRUFBYTtBQUNuQyxRQUFJTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFPLElBQVIsQ0FBYSxJQUFiLEtBQXNCLGtCQUExQixFQUE4QztBQUM1QyxVQUFJUCxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlEsUUFBdEIsQ0FBK0IsTUFBL0IsQ0FBSixFQUE0QztBQUMxQ1IsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JTLFdBQXRCLENBQWtDLE1BQWxDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xULFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCVSxRQUF0QixDQUErQixNQUEvQjtBQUNEO0FBQ0Y7QUFDRixHQVJEO0FBVUFWLEdBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUssRUFBVixDQUFhLE9BQWIsRUFBc0IscUJBQXRCLEVBQTZDLFVBQVVDLENBQVYsRUFBYTtBQUN4RCxRQUFJSyxJQUFJLEdBQUcsSUFBWDtBQUNBWCxLQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QlksSUFBdkIsQ0FBNEIsWUFBWTtBQUN0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N0MsSUFBTjtBQUNILEdBSEQ7QUFLSCxDQTVDRCxFOzs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFPLFNBQVNzRCxpQkFBVCxHQUE2QjtBQUNoQ3JFLEdBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9Dc0UsS0FBcEMsQ0FBMEM7QUFDdENDLFlBQVEsRUFBRSxLQUQ0QjtBQUV0Q0MsU0FBSyxFQUFFLEdBRitCO0FBR3RDQyxnQkFBWSxFQUFFLENBSHdCO0FBSXRDQyxrQkFBYyxFQUFFLENBSnNCO0FBS3RDQyxVQUFNLEVBQUUsSUFMOEI7QUFNdEM7QUFDQUMsY0FBVSxFQUFFLENBQ1I7QUFDSUMsZ0JBQVUsRUFBRSxJQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBRFEsRUFRUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FSUSxFQWVSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlYsT0FGZCxDQU9BO0FBQ0E7QUFDQTs7QUFUQSxLQWZRO0FBUDBCLEdBQTFDO0FBa0NILEM7Ozs7Ozs7Ozs7OztBQ25DRCx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnYm9vdHN0cmFwJyk7XHJcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvY3VzdG9tLXNlbGVjdGJveCcpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJyk7XHJcblxyXG4gIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xyXG5cclxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcclxuICAgICAgaWYgKCQoJyNzZWFyY2hiYXJIZWFkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJCgnYm9keScpLm9uKFwiY2xpY2tcIiwgJy5kcm9wZG93bi1zdWJtZW51IGEnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICQodGhpcykubmV4dCgndWwnKS50b2dnbGUoKTtcclxuICAgICQodGhpcykubmV4dCgnLmRyb3Bkb3duLW1lbnUnKS5jc3MoJ3RvcCcsICQodGhpcykucG9zaXRpb24oKS50b3ApO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxuXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICB1cmw6IERFUFRfQVBJLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKGRlcGFydG1lbnRzKSB7XHJcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcclxuICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICB2YXIgc2luZ2xlRGVwdE1vYmlsZSA9ICcnO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHNpbmdsZURlcHRNb2JpbGUgPSAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9kaXY+JztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj48YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGhyZWY9XCIjXCIgaWQ9XCJuYXZiYXJEcm9wZG93blwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+JztcclxuICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCI+JztcclxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiPic7XHJcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8YSBocmVmPVwiI1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcclxuICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcclxuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XHJcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L2xpPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nO1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcclxuXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgZXhjZXB0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGpxWEhSKTtcclxuICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcclxuICAgIH1cclxuICB9KTtcclxufSlcclxuXHJcbmlzTW9iaWxlID0gZnVuY3Rpb24oKXtcclxuICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIik7XHJcbiAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2VcclxufSIsIi8qXHJcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cclxuKi9cclxuXHJcbiQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcclxuICBcclxuICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7IFxyXG4gICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xyXG4gICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xyXG4gICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xyXG4gIFxyXG4gICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xyXG4gICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcclxuICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xyXG4gIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xyXG4gICAgICAgICQoJzxsaSAvPicsIHtcclxuICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcclxuICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcclxuICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xyXG4gIFxyXG4gICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcbiAgXHJcbiAgICAkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcclxuICAgICAgICAkbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XHJcbiAgICB9KTtcclxuICBcclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICRsaXN0LmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxufSk7IiwiZXhwb3J0IGZ1bmN0aW9uIG1ha2VNdWx0aUNhcm91c2VsKCkge1xyXG4gICAgJCgnLnJlc3BvbnNpdmU6bm90KC5zbGljay1zbGlkZXIpJykuc2xpY2soe1xyXG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcclxuICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcclxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXHJcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxufVxyXG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=