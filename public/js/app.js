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
          deptToAppend += '<li class="dropdown"><a  href="' + departments[i].link + '" id="navbarDropdown' + i + '" role="button"  aria-haspopup="true" aria-expanded="false">' + departments[i].department + '</a>';
          var catgToAppend = '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';

          for (j = 0; j < departments[i].categories.length; j++) {
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

__webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! A:\xampp\htdocs\lazysuzy-code\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImlzTW9iaWxlIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwiY2F0ZWdvcnkiLCJlcnJvciIsImpxWEhSIiwiZXhjZXB0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInRvZ2dsZUNsYXNzIiwidHJpZ2dlciIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsNERBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDNUIsTUFBSUMsV0FBVyxHQUFHSCxDQUFDLENBQUMsbUJBQUQsQ0FBbkI7QUFFQSxNQUFNSSxRQUFRLEdBQUcsc0JBQWpCO0FBRUFELGFBQVcsQ0FBQ0UsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVUMsQ0FBVixFQUFhO0FBQ25DLFFBQUlOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLElBQWIsS0FBc0Isa0JBQTFCLEVBQThDO0FBQzVDLFVBQUlQLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUSxRQUF0QixDQUErQixNQUEvQixDQUFKLEVBQTRDO0FBQzFDUixTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlMsV0FBdEIsQ0FBa0MsTUFBbEM7QUFDRCxPQUZELE1BRU87QUFDTFQsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JVLFFBQXRCLENBQStCLE1BQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBUkQ7QUFVQVYsR0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVSyxFQUFWLENBQWEsV0FBYixFQUEwQixtQkFBMUIsRUFBK0MsVUFBVUMsQ0FBVixFQUFhO0FBQzFELFFBQUlLLElBQUksR0FBRyxJQUFYO0FBQ0FYLEtBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCWSxJQUF2QixDQUE0QixZQUFZO0FB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KCdzbGljay1jYXJvdXNlbCcpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcclxucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpO1xyXG5cclxuICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcclxuXHJcbiAgJHNlYXJjaEljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XHJcbiAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xyXG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoJ2JvZHknKS5vbihcIm1vdXNlb3ZlclwiLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICQodGhpcykuZmluZCgndWwnKS50b2dnbGUoKTtcclxuICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5jc3MoJ3RvcCcsICQodGhpcykucG9zaXRpb24oKS50b3ApO1xyXG4gIH0pO1xyXG5cclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJHRVRcIixcclxuICAgIHVybDogREVQVF9BUEksXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGVwYXJ0bWVudHMpIHtcclxuICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnO1xyXG4gICAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgIHZhciBzaW5nbGVEZXB0TW9iaWxlID0gJyc7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZGVwYXJ0bWVudHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgc2luZ2xlRGVwdE1vYmlsZSA9ICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2Rpdj4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJCgnI21vYmlsZURlcGFydG1lbnRzJykuYXBwZW5kKHNpbmdsZURlcHRNb2JpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPjxhICBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5saW5rKydcIiBpZD1cIm5hdmJhckRyb3Bkb3duJytpKydcIiByb2xlPVwiYnV0dG9uXCIgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XHJcbiAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPic7XHJcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzwvYT48L2xpPidcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xyXG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPGEgaHJlZj1cIicrZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rKydcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8c3BhbiBjbGFzcz1cIm14LTJcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L3NwYW4+JztcclxuICAgICAgICAgICAgLy8gICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XHJcbiAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy8gICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10uc3ViX2NhdGVnb3J5ICsgJzwvYT48L2xpPidcclxuICAgICAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgIHN1YmNhdFRvQXBwZW5kICs9ICc8L3VsPic7XHJcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xyXG4gICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvdWw+JztcclxuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmQ7XHJcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZCk7XHJcblxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbikge1xyXG4gICAgICBjb25zb2xlLmxvZyhqcVhIUik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pXHJcblxyXG5pc01vYmlsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpXCIpO1xyXG4gIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXHJcbn0iLCIvKlxyXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VsZWN0Qm94KCkge1xyXG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAvL1JlbW92ZSBwcmV2aW91c2x5IG1hZGUgc2VsZWN0Ym94XHJcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7XHJcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xyXG4gICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiIGlkPVwic2VsZWN0Ym94LScgKyAkdGhpcy5hdHRyKCdpZCcpICsgJ1wiPjwvZGl2PicpO1xyXG5cclxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XHJcbiAgICAgICAgdmFyIHN0clNlbGVjdGVkVGV4dCA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLnRleHQoKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS50ZXh0KClcclxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLmF0dHIoJ3ZhbHVlJykgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkuYXR0cigndmFsdWUnKVxyXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xyXG4gICAgICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XHJcbiAgICAgICAgICAgICQoJzxsaSAvPicsIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXHJcbiAgICAgICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxyXG4gICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xyXG5cclxuICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xyXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzZWxlY3QtdmFsdWUtY2hhbmdlZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xyXG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoKSB7XHJcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIHNwZWVkOiAzMDAsXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxyXG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG59XHJcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==