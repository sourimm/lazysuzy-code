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
  $(document).on('click', '.collapsible', function () {
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
            deptToAppend += '<li class="department"><a class="link" href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
          } else {
            deptToAppend += '<li class="department"><a  class="link" href="' + departments[i].link + '">' + departments[i].department + '</a><a  class="collapsible" data-toggle="collapse" data-target="#' + departments[i].department + '" id="navbarDropdown' + i + '"><i class="fas fa-angle-right"></i></a>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN1Ym1pdCIsImNhbGxTZWFyY2giLCJjbGljayIsImNzcyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImhpZGUiLCJnZXRBdHRyaWJ1dGUiLCJzaG93IiwiZWxtIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJmaW5kIiwidmFsIiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsImF0dHIiLCJoYXNDbGFzcyIsIm1vZGFsIiwic2VsZiIsImVhY2giLCJuZXh0IiwiaXNNb2JpbGUiLCJwb3NpdGlvbiIsInRvcCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZGVwYXJ0bWVudHMiLCJkZXB0VG9BcHBlbmQiLCJlbXB0eSIsImkiLCJsZW5ndGgiLCJjYXRlZ29yaWVzIiwibGluayIsImRlcGFydG1lbnQiLCJjYXRnVG9BcHBlbmQiLCJqIiwiY2F0ZWdvcnkiLCJodG1sIiwic2luZ2xlRGVwdE1vYmlsZSIsImFwcGVuZCIsImNsYXNzQWN0aXZlIiwicGF0aG5hbWUiLCJlcnJvciIsImpxWEhSIiwiZXhjZXB0aW9uIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtYWtlU2VsZWN0Qm94IiwiJHRoaXMiLCJudW1iZXJPZk9wdGlvbnMiLCJjaGlsZHJlbiIsInJlbW92ZSIsIndyYXAiLCJhZnRlciIsIiRzdHlsZWRTZWxlY3QiLCJzdHJTZWxlY3RlZFRleHQiLCJ0ZXh0IiwiZXEiLCJzdHJTZWxlY3RlZFZhbHVlIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInRvZ2dsZUNsYXNzIiwidHJpZ2dlciIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpZGVzU2hvdyIsInNsaWRlc1Njcm9sbCIsInNsaWNrIiwiaW5maW5pdGUiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBQTtBQUFBQTtBQUFBQSxtQkFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnRkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6QkYsR0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJHLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFdBQWpDLEVBQThDLFVBQVNDLENBQVQsRUFBWTtBQUN0REMsV0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQURzRCxDQUV0RDs7QUFDQU4sS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUNLTyxRQURMLEdBRUtDLFdBRkwsQ0FFaUIsUUFGakI7QUFHQVIsS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRUyxRQUFSLENBQWlCLFFBQWpCO0FBQ0gsR0FQRDtBQVFBVCxHQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlUsTUFBdEIsQ0FBNkIsVUFBU04sQ0FBVCxFQUFZO0FBQ3JDTyxjQUFVLENBQUNQLENBQUQsRUFBSSxJQUFKLENBQVY7QUFDSCxHQUZEO0FBSUFKLEdBQUMsQ0FBQyxVQUFELENBQUQsQ0FBY1UsTUFBZCxDQUFxQixVQUFTTixDQUFULEVBQVk7QUFDN0JPLGNBQVUsQ0FBQ1AsQ0FBRCxFQUFJLElBQUosQ0FBVjtBQUNILEdBRkQ7QUFHQUosR0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJZLEtBQXJCLENBQTJCLFlBQVc7QUFDbENaLEtBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJhLEdBQWpCLENBQXFCLE9BQXJCLEVBQThCLE9BQTlCO0FBQ0gsR0FGRDtBQUdBYixHQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlksS0FBdEIsQ0FBNEIsWUFBVztBQUNuQ1osS0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQmEsR0FBakIsQ0FBcUIsT0FBckIsRUFBOEIsS0FBOUI7QUFDSCxHQUZEO0FBSUFiLEdBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlFLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7QUFDL0MsU0FBS1csU0FBTCxDQUFlQyxNQUFmLENBQXNCLFFBQXRCO0FBQ0FmLEtBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZWdCLElBQWY7QUFDQWhCLEtBQUMsQ0FBQyxLQUFLaUIsWUFBTCxDQUFrQixhQUFsQixDQUFELENBQUQsQ0FBb0NDLElBQXBDO0FBQ0gsR0FKRDs7QUFNQSxXQUFTUCxVQUFULENBQW9CUCxDQUFwQixFQUF1QmUsR0FBdkIsRUFBNEI7QUFDeEJmLEtBQUMsQ0FBQ2dCLGNBQUY7QUFDQUMsVUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUNJLG1CQUNBdkIsQ0FBQyxDQUFDbUIsR0FBRCxDQUFELENBQ0tLLElBREwsQ0FDVSxPQURWLEVBRUtDLEdBRkwsRUFGSixDQUZ3QixDQU1UO0FBQ2xCOztBQUVELE1BQUlDLFdBQVcsR0FBRzFCLENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUVBLE1BQU0yQixRQUFRLEdBQUcsc0JBQWpCO0FBRUFELGFBQVcsQ0FBQ3ZCLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVNDLENBQVQsRUFBWTtBQUNoQyxRQUFJSixDQUFDLENBQUMsSUFBRCxDQUFELENBQVE0QixJQUFSLENBQWEsSUFBYixLQUFzQixrQkFBMUIsRUFBOEM7QUFDMUMsVUFBSTVCLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCNkIsUUFBdEIsQ0FBK0IsTUFBL0IsQ0FBSixFQUE0QztBQUN4QzdCLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUSxXQUF0QixDQUFrQyxNQUFsQztBQUNILE9BRkQsTUFFTztBQUNIUixTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlMsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDSDtBQUNKO0FBQ0osR0FSRDtBQVVBVCxHQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QlksS0FBdkIsQ0FBNkIsWUFBVztBQUNwQ1osS0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0I4QixLQUF0QixDQUE0QixRQUE1QjtBQUNILEdBRkQ7QUFHQTlCLEdBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCWSxLQUFyQixDQUEyQixZQUFXO0FBQ2xDWixLQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQjhCLEtBQXRCLENBQTRCLFFBQTVCO0FBQ0E5QixLQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQjhCLEtBQXJCLENBQTJCLFFBQTNCO0FBQ0gsR0FIRDtBQUlBOUIsR0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JZLEtBQXhCLENBQThCLFlBQVc7QUFDckNaLEtBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCOEIsS0FBdEIsQ0FBNEIsUUFBNUI7QUFDQTlCLEtBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCOEIsS0FBckIsQ0FBMkIsUUFBM0I7QUFDSCxHQUhEO0FBS0E5QixHQUFDLENBQUMsdUJBQUQsQ0FBRCxDQUEyQlksS0FBM0IsQ0FBaUMsWUFBVztBQUN4Q1osS0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUI4QixLQUFyQjtBQUNILEdBRkQ7QUFJQTlCLEdBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUcsRUFBVixDQUFhLFdBQWIsRUFBMEIsbUJBQTFCLEVBQStDLFVBQVNDLENBQVQsRUFBWTtBQUN2RCxRQUFJMkIsSUFBSSxHQUFHLElBQVg7QUFDQS9CLEtBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCZ0MsSUFBdkIsQ0FBNEIsWUFBVztBQUNuQyxVQUFJaEMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRd0IsSUFBUixDQUFhLGdCQUFiLEVBQStCLENBQS9CLEtBQXFDeEIsQ0FBQyxDQUFDK0IsSUFBRCxDQUFELENBQVFFLElBQVIsQ0FBYSxJQUFiLEVBQW1CLENBQW5CLENBQXpDLEVBQWdFO0FBQzVEakMsU0FBQyxDQUFDLElBQUQsQ0FBRCxDQUNLd0IsSUFETCxDQUNVLGdCQURWLEVBRUtSLElBRkw7QUFHSDtBQUNKLEtBTkQ7QUFPQWhCLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FDS3dCLElBREwsQ0FDVSxJQURWLEVBRUtULE1BRkw7O0FBR0EsUUFBSSxDQUFDbUIsUUFBUSxFQUFiLEVBQWlCO0FBQ2JsQyxPQUFDLENBQUMsSUFBRCxDQUFELENBQ0t3QixJQURMLENBQ1UsZ0JBRFYsRUFFS1gsR0FGTCxDQUVTLEtBRlQsRUFFZ0JiLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUW1DLFFBQVIsR0FBbUJDLEdBRm5DO0FBR0g7QUFDSixHQWpCRDtBQW1CQXBDLEdBQUMsQ0FBQ3FDLElBQUYsQ0FBTztBQUNIQyxRQUFJLEVBQUUsS0FESDtBQUVIQyxPQUFHLEVBQUVaLFFBRkY7QUFHSGEsWUFBUSxFQUFFLE1BSFA7QUFJSEMsV0FBTyxFQUFFLGlCQUFTQyxXQUFULEVBQXNCO0FBQzNCLFVBQUlDLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxVQUFJVCxRQUFRLEVBQVosRUFBZ0I7QUFDWmxDLFNBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCNEMsS0FBdkI7QUFDQSxZQUFJRCxZQUFZLEdBQUcsRUFBbkI7O0FBQ0EsYUFBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxXQUFXLENBQUNJLE1BQWhDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQ3pDLGNBQUlILFdBQVcsQ0FBQ0csQ0FBRCxDQUFYLENBQWVFLFVBQWYsQ0FBMEJELE1BQTFCLElBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDSCx3QkFBWSxJQUNSLGtEQUNBRCxXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRyxJQURmLEdBRUEsSUFGQSxHQUdBTixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlSSxVQUhmLEdBSUEsV0FMSjtBQU1ILFdBUEQsTUFPTztBQUNITix3QkFBWSxJQUNSLG1EQUNBRCxXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRyxJQURmLEdBRUEsSUFGQSxHQUdBTixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlSSxVQUhmLEdBSUEsbUVBSkEsR0FLQVAsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUksVUFMZixHQU1BLHNCQU5BLEdBT0FKLENBUEEsR0FRQSwwQ0FUSjtBQVVBLGdCQUFJSyxZQUFZLEdBQ1osNkVBQ0FSLFdBQVcsQ0FBQ0csQ0FBRCxDQUFYLENBQWVJLFVBRGYsR0FFQSxJQUhKOztBQUlBLGlCQUNJLElBQUlFLENBQUMsR0FBRyxDQURaLEVBRUlBLENBQUMsR0FBR1QsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUUsVUFBZixDQUEwQkQsTUFGbEMsRUFHSUssQ0FBQyxFQUhMLEVBSUU7QUFDRUQsMEJBQVksSUFDUiwrQkFDQVIsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUUsVUFBZixDQUEwQkksQ0FBMUIsRUFBNkJILElBRDdCLEdBRUEsSUFGQSxHQUdBTixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRSxVQUFmLENBQTBCSSxDQUExQixFQUE2QkMsUUFIN0IsR0FJQSxXQUxKO0FBTUg7O0FBQ0RGLHdCQUFZLElBQUksT0FBaEI7QUFDQVAsd0JBQVksSUFBSU8sWUFBaEI7QUFDQVAsd0JBQVksSUFBSSxPQUFoQjtBQUNIO0FBQ0o7O0FBQ0QzQyxTQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QnFELElBQXZCLENBQTRCVixZQUE1QjtBQUNBLFlBQUlXLGdCQUFnQixHQUFHLEVBQXZCOztBQUNBLGFBQUssSUFBSVQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsV0FBVyxDQUFDSSxNQUFoQyxFQUF3Q0QsQ0FBQyxFQUF6QyxFQUE2QztBQUN6QyxjQUFJSCxXQUFXLENBQUNJLE1BQVosSUFBc0IsQ0FBMUIsRUFBNkI7QUFDekJRLDRCQUFnQixHQUNaLHFEQUNBWixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRyxJQURmLEdBRUEsSUFGQSxHQUdBTixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlSSxVQUhmLEdBSUEsWUFMSjtBQU1IOztBQUNEakQsV0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0J1RCxNQUF4QixDQUErQkQsZ0JBQS9CO0FBQ0g7QUFDSjs7QUFDRCxXQUFLLElBQUlULENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILFdBQVcsQ0FBQ0ksTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsWUFBSUgsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUUsVUFBZixDQUEwQkQsTUFBMUIsSUFBb0MsQ0FBeEMsRUFBMkM7QUFDdkNILHNCQUFZLElBQ1Isa0JBQ0FELFdBQVcsQ0FBQ0csQ0FBRCxDQUFYLENBQWVHLElBRGYsR0FFQSxJQUZBLEdBR0FOLFdBQVcsQ0FBQ0csQ0FBRCxDQUFYLENBQWVJLFVBSGYsR0FJQSxXQUxKO0FBTUgsU0FQRCxNQU9PO0FBQ0gsY0FBSU8sV0FBVyxHQUNYZCxXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRyxJQUFmLEtBQXdCMUIsUUFBUSxDQUFDbUMsUUFBakMsR0FDTSxRQUROLEdBRU0sRUFIVjtBQUlBZCxzQkFBWSxJQUNSLHlCQUNBYSxXQURBLEdBRUEsY0FGQSxHQUdBZCxXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRyxJQUhmLEdBSUEsc0JBSkEsR0FLQUgsQ0FMQSxHQU1BLDhEQU5BLEdBT0FILFdBQVcsQ0FBQ0csQ0FBRCxDQUFYLENBQWVJLFVBUGYsR0FRQSxNQVRKO0FBVUEsY0FBSUMsWUFBWSxHQUNaLDZEQURKOztBQUVBLGVBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1QsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUUsVUFBZixDQUEwQkQsTUFBOUMsRUFBc0RLLENBQUMsRUFBdkQsRUFBMkQ7QUFDdkQ7QUFDQUQsd0JBQVksSUFDUixrQkFDQVIsV0FBVyxDQUFDRyxDQUFELENBQVgsQ0FBZUUsVUFBZixDQUEwQkksQ0FBMUIsRUFBNkJILElBRDdCLEdBRUEsSUFGQSxHQUdBTixXQUFXLENBQUNHLENBQUQsQ0FBWCxDQUFlRSxVQUFmLENBQTBCSSxDQUExQixFQUE2QkMsUUFIN0IsR0FJQSxXQUxKLENBRnVELENBUXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUNERixzQkFBWSxJQUFJLE9BQWhCO0FBQ0FQLHNCQUFZLElBQUlPLFlBQWhCO0FBQ0FQLHNCQUFZLElBQUksT0FBaEI7QUFDSDtBQUNKOztBQUNEM0MsT0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ1RCxNQUFyQixDQUE0QlosWUFBNUI7QUFDSCxLQXBIRTtBQXFISGUsU0FBSyxFQUFFLGVBQVNDLEtBQVQsRUFBZ0JDLFNBQWhCLEVBQTJCO0FBQzlCdkQsYUFBTyxDQUFDQyxHQUFSLENBQVlxRCxLQUFaO0FBQ0F0RCxhQUFPLENBQUNDLEdBQVIsQ0FBWXNELFNBQVo7QUFDSDtBQXhIRSxHQUFQO0FBMEhILENBak5EO0FBbU5lLFNBQVMxQixRQUFULEdBQW9CO0FBQy9CLE1BQUlBLFFBQVEsR0FBR2IsTUFBTSxDQUFDd0MsVUFBUCxDQUFrQixvQ0FBbEIsQ0FBZjtBQUNBLFNBQU8zQixRQUFRLENBQUM0QixPQUFULEdBQW1CLElBQW5CLEdBQTBCLEtBQWpDO0FBQ0gsQzs7Ozs7Ozs7Ozs7OztBQzNORDtBQUFBO0FBQUE7OztBQUllLFNBQVNDLGFBQVQsR0FBeUI7QUFDcEMvRCxHQUFDLENBQUMsUUFBRCxDQUFELENBQVlnQyxJQUFaLENBQWlCLFlBQVk7QUFDekIsUUFBSWdDLEtBQUssR0FBR2hFLENBQUMsQ0FBQyxJQUFELENBQWI7QUFBQSxRQUFxQmlFLGVBQWUsR0FBR2pFLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtFLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkJwQixNQUFsRSxDQUR5QixDQUd6Qjs7QUFDQTlDLEtBQUMsQ0FBQyxnQkFBZ0JnRSxLQUFLLENBQUNwQyxJQUFOLENBQVcsSUFBWCxDQUFqQixDQUFELENBQW9DdUMsTUFBcEM7QUFFQUgsU0FBSyxDQUFDdkQsUUFBTixDQUFlLGVBQWY7QUFDQXVELFNBQUssQ0FBQ0ksSUFBTixDQUFXLDRCQUFYO0FBQ0FKLFNBQUssQ0FBQ0ssS0FBTixDQUFZLDhDQUE4Q0wsS0FBSyxDQUFDcEMsSUFBTixDQUFXLElBQVgsQ0FBOUMsR0FBaUUsVUFBN0U7QUFFQSxRQUFJMEMsYUFBYSxHQUFHTixLQUFLLENBQUMvQixJQUFOLENBQVcsbUJBQVgsQ0FBcEI7QUFDQSxRQUFJc0MsZUFBZSxHQUFHdkUsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRa0UsUUFBUixDQUFpQixpQkFBakIsSUFBc0NsRSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrRSxRQUFSLENBQWlCLGlCQUFqQixFQUFvQ00sSUFBcEMsRUFBdEMsR0FBbUZSLEtBQUssQ0FBQ0UsUUFBTixDQUFlLGlCQUFmLEVBQWtDTyxFQUFsQyxDQUFxQyxDQUFyQyxFQUF3Q0QsSUFBeEMsRUFBekc7QUFDQSxRQUFJRSxnQkFBZ0IsR0FBRzFFLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtFLFFBQVIsQ0FBaUIsaUJBQWpCLElBQXNDbEUsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRa0UsUUFBUixDQUFpQixpQkFBakIsRUFBb0N0QyxJQUFwQyxDQUF5QyxPQUF6QyxDQUF0QyxHQUEwRm9DLEtBQUssQ0FBQ0UsUUFBTixDQUFlLGlCQUFmLEVBQWtDTyxFQUFsQyxDQUFxQyxDQUFyQyxFQUF3QzdDLElBQXhDLENBQTZDLE9BQTdDLENBQWpIO0FBQ0EwQyxpQkFBYSxDQUFDRSxJQUFkLENBQW1CRCxlQUFuQjtBQUNBRCxpQkFBYSxDQUFDMUMsSUFBZCxDQUFtQixRQUFuQixFQUE2QjhDLGdCQUE3QjtBQUVBLFFBQUlDLEtBQUssR0FBRzNFLENBQUMsQ0FBQyxRQUFELEVBQVc7QUFDcEIsZUFBUztBQURXLEtBQVgsQ0FBRCxDQUVUNEUsV0FGUyxDQUVHTixhQUZILENBQVo7O0FBSUEsU0FBSyxJQUFJekIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR29CLGVBQXBCLEVBQXFDcEIsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QzdDLE9BQUMsQ0FBQyxRQUFELEVBQVc7QUFDUndFLFlBQUksRUFBRVIsS0FBSyxDQUFDRSxRQUFOLENBQWUsUUFBZixFQUF5Qk8sRUFBekIsQ0FBNEI1QixDQUE1QixFQUErQjJCLElBQS9CLEVBREU7QUFFUkssV0FBRyxFQUFFYixLQUFLLENBQUNFLFFBQU4sQ0FBZSxRQUFmLEVBQXlCTyxFQUF6QixDQUE0QjVCLENBQTVCLEVBQStCcEIsR0FBL0I7QUFGRyxPQUFYLENBQUQsQ0FHR3FELFFBSEgsQ0FHWUgsS0FIWjtBQUlIOztBQUVELFFBQUlJLFVBQVUsR0FBR0osS0FBSyxDQUFDVCxRQUFOLENBQWUsSUFBZixDQUFqQjtBQUVBSSxpQkFBYSxDQUFDMUQsS0FBZCxDQUFvQixVQUFVUixDQUFWLEVBQWE7QUFDN0JBLE9BQUMsQ0FBQzRFLGVBQUY7QUFDQWhGLE9BQUMsQ0FBQywwQkFBRCxDQUFELENBQThCaUYsR0FBOUIsQ0FBa0MsSUFBbEMsRUFBd0NqRCxJQUF4QyxDQUE2QyxZQUFZO0FBQ3JEaEMsU0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRUSxXQUFSLENBQW9CLFFBQXBCLEVBQThCeUIsSUFBOUIsQ0FBbUMsbUJBQW5DLEVBQXdEakIsSUFBeEQ7QUFDSCxPQUZEO0FBR0FoQixPQUFDLENBQUMsSUFBRCxDQUFELENBQVFrRixXQUFSLENBQW9CLFFBQXBCLEVBQThCakQsSUFBOUIsQ0FBbUMsbUJBQW5DLEVBQXdEbEIsTUFBeEQ7QUFDSCxLQU5EO0FBUUFnRSxjQUFVLENBQUNuRSxLQUFYLENBQWlCLFVBQVVSLENBQVYsRUFBYTtBQUMxQkEsT0FBQyxDQUFDNEUsZUFBRjtBQUNBVixtQkFBYSxDQUFDRSxJQUFkLENBQW1CeEUsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRd0UsSUFBUixFQUFuQixFQUFtQ2hFLFdBQW5DLENBQStDLFFBQS9DO0FBQ0EsVUFBSWtFLGdCQUFnQixHQUFHMUUsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNEIsSUFBUixDQUFhLEtBQWIsQ0FBdkI7QUFDQTBDLG1CQUFhLENBQUMxQyxJQUFkLENBQW1CLFFBQW5CLEVBQTZCOEMsZ0JBQTdCO0FBQ0ExRSxPQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZa0YsT0FBWixDQUFvQixzQkFBcEIsRUFBNENiLGFBQTVDO0FBRUFOLFdBQUssQ0FBQ3ZDLEdBQU4sQ0FBVXpCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTRCLElBQVIsQ0FBYSxLQUFiLENBQVY7QUFDQStDLFdBQUssQ0FBQzNELElBQU4sR0FSMEIsQ0FTMUI7QUFDSCxLQVZEO0FBWUFoQixLQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZVyxLQUFaLENBQWtCLFlBQVk7QUFDMUIwRCxtQkFBYSxDQUFDOUQsV0FBZCxDQUEwQixRQUExQjtBQUNBbUUsV0FBSyxDQUFDM0QsSUFBTjtBQUNILEtBSEQ7QUFLSCxHQXRERDtBQXVESCxDOzs7Ozs7Ozs7Ozs7O0FDNUREO0FBQUE7QUFBTyxTQUFTb0UsaUJBQVQsR0FBNkQ7QUFBQSxNQUFsQ0MsVUFBa0MsdUVBQXJCLENBQXFCO0FBQUEsTUFBbEJDLFlBQWtCLHVFQUFILENBQUc7QUFDaEV0RixHQUFDLENBQUMsZ0NBQUQsQ0FBRCxDQUFvQ3VGLEtBQXBDLENBQTBDO0FBQ3RDQyxZQUFRLEVBQUUsS0FENEI7QUFFdENDLFNBQUssRUFBRSxHQUYrQjtBQUd0Q0MsZ0JBQVksRUFBRUwsVUFId0I7QUFJdENNLGtCQUFjLEVBQUVMLFlBSnNCO0FBS3RDTSxVQUFNLEVBQUUsSUFMOEI7QUFNdEM7QUFDQUMsY0FBVSxFQUFFLENBQ1I7QUFDSUMsZ0JBQVUsRUFBRSxJQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBRFEsRUFRUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FSUSxFQWVSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlYsT0FGZCxDQU9BO0FBQ0E7QUFDQTs7QUFUQSxLQWZRO0FBUDBCLEdBQTFDO0FBa0NILEM7Ozs7Ozs7Ozs7OztBQ25DRCx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnYm9vdHN0cmFwJylcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJylcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvY3VzdG9tLXNlbGVjdGJveCcpXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJyNkZXBhcnRtZW50c05hdicpLm9uKCdjbGljaycsICcuZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5zaWJsaW5ncygpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfSlcbiAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2FsbFNlYXJjaChlLCB0aGlzKVxuICAgIH0pXG5cbiAgICAkKCcuc2ItYm9keScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNhbGxTZWFyY2goZSwgdGhpcylcbiAgICB9KVxuICAgICQoJy5uYXZiYXItdG9nZ2xlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjU2lkZW5hdmJhcicpLmNzcygnd2lkdGgnLCAnMzAwcHgnKVxuICAgIH0pXG4gICAgJCgnI1NpZGVuYXZiYXJjbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjU2lkZW5hdmJhcicpLmNzcygnd2lkdGgnLCAnMHB4JylcbiAgICB9KVxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jb2xsYXBzaWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICQoJy5jb2xsYXBzZScpLmhpZGUoKVxuICAgICAgICAkKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKS5zaG93KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gY2FsbFNlYXJjaChlLCBlbG0pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID1cbiAgICAgICAgICAgICcvc2VhcmNoP3F1ZXJ5PScgK1xuICAgICAgICAgICAgJChlbG0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAudmFsKCkgLy9yZWxhdGl2ZSB0byBkb21haW5cbiAgICB9XG5cbiAgICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpXG5cbiAgICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAgICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgICAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5yZW1vdmVDbGFzcygnb3BlbicpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJCgnLnVzZXItbG9naW4tbW9kYWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgIH0pXG4gICAgJCgnI3JlZ2lzdGVyLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbFNpZ251cEZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICAgICAgJCgnI21vZGFsTG9naW5Gb3JtJykubW9kYWwoJ3RvZ2dsZScpXG4gICAgfSlcbiAgICAkKCcudXNlci1sb2dpbi1tb2RhbDEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI21vZGFsU2lnbnVwRm9ybScpLm1vZGFsKCd0b2dnbGUnKVxuICAgICAgICAkKCcjbW9kYWxMb2dpbkZvcm0nKS5tb2RhbCgndG9nZ2xlJylcbiAgICB9KVxuXG4gICAgJCgnLndpc2hsaXN0LWxvZ2luLW1vZGFsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNtb2RhbExvZ2luRm9ybScpLm1vZGFsKClcbiAgICB9KVxuXG4gICAgJCgnYm9keScpLm9uKCdtb3VzZW92ZXInLCAnLmRyb3Bkb3duLXN1Ym1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpWzBdICE9ICQoc2VsZikubmV4dCgndWwnKVswXSkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51JylcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgndWwnKVxuICAgICAgICAgICAgLnRvZ2dsZSgpXG4gICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudScpXG4gICAgICAgICAgICAgICAgLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgdXJsOiBERVBUX0FQSSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGVwYXJ0bWVudHMpIHtcbiAgICAgICAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJ1xuICAgICAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29sbGFwc2libGUtZGVwdCcpLmVtcHR5KClcbiAgICAgICAgICAgICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJydcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZGVwYXJ0bWVudFwiPjxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJkZXBhcnRtZW50XCI+PGEgIGNsYXNzPVwibGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48YSAgY2xhc3M9XCJjb2xsYXBzaWJsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiMnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCIgaWQ9XCJuYXZiYXJEcm9wZG93bicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L2E+J1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImNvbGxhcHNlIGNhdGVnb3J5LWxpc3RcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiIGlkPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPidcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJyNjb2xsYXBzaWJsZS1kZXB0JykuaHRtbChkZXB0VG9BcHBlbmQpXG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJ1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC00IGNvbC1zbS1hdXRvIC1kZXB0IFwiPjxhICBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9kaXY+J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZXB0VG9BcHBlbmQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8bGk+PGEgaHJlZj1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0ubGluayArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzQWN0aXZlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgPT09IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZHJvcGRvd24gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0FjdGl2ZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PGEgIGhyZWY9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmxpbmsgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGlkPVwibmF2YmFyRHJvcGRvd24nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIHJvbGU9XCJidXR0b25cIiAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT4nXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPidcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCInK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluaysnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nXG4gICAgICAgICAgICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmRcbiAgICAgICAgICAgICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coanFYSFIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XG4gICAgdmFyIGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKVxuICAgIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59XG4iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlbGVjdEJveCgpIHtcbiAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuXG4gICAgICAgIC8vUmVtb3ZlIHByZXZpb3VzbHkgbWFkZSBzZWxlY3Rib3hcbiAgICAgICAgJCgnI3NlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSkucmVtb3ZlKCk7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIiBpZD1cInNlbGVjdGJveC0nICsgJHRoaXMuYXR0cignaWQnKSArICdcIj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpID8gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkudGV4dCgpXG4gICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikuYXR0cigndmFsdWUnKSA6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb246c2VsZWN0ZWQnKS5lcSgwKS5hdHRyKCd2YWx1ZScpXG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dChzdHJTZWxlY3RlZFRleHQpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LmF0dHIoJ2FjdGl2ZScsIHN0clNlbGVjdGVkVmFsdWUpO1xuXG4gICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHN0clNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NlbGVjdC12YWx1ZS1jaGFuZ2VkJywgJHN0eWxlZFNlbGVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZU11bHRpQ2Fyb3VzZWwoc2xpZGVzU2hvdyA9IDQsIHNsaWRlc1Njcm9sbCA9IDQpIHtcbiAgICAkKCcucmVzcG9uc2l2ZTpub3QoLnNsaWNrLXNsaWRlciknKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXNTaG93LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogc2xpZGVzU2Nyb2xsLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=