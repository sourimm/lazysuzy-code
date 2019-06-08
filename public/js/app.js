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

__webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/WorkspaceDrive/My work/LazyCode/lazysuzy-code/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkZXBhcnRtZW50cyIsImRlcHRUb0FwcGVuZCIsImlzTW9iaWxlIiwic2luZ2xlRGVwdE1vYmlsZSIsImkiLCJsZW5ndGgiLCJsaW5rIiwiZGVwYXJ0bWVudCIsImFwcGVuZCIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwiY2F0ZWdvcnkiLCJlcnJvciIsImpxWEhSIiwiZXhjZXB0aW9uIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWFrZVNlbGVjdEJveCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0Iiwic3RyU2VsZWN0ZWRUZXh0IiwidGV4dCIsImVxIiwic3RyU2VsZWN0ZWRWYWx1ZSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInRvZ2dsZUNsYXNzIiwidHJpZ2dlciIsIm1ha2VNdWx0aUNhcm91c2VsIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsNERBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9FQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQOztBQUVBQyxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDNUIsTUFBSUMsV0FBVyxHQUFHSCxDQUFDLENBQUMsbUJBQUQsQ0FBbkI7QUFFQSxNQUFNSSxRQUFRLEdBQUcsc0JBQWpCO0FBRUFELGFBQVcsQ0FBQ0UsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVUMsQ0FBVixFQUFhO0FBQ25DLFFBQUlOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLElBQWIsS0FBc0Isa0JBQTFCLEVBQThDO0FBQzVDLFVBQUlQLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUSxRQUF0QixDQUErQixNQUEvQixDQUFKLEVBQTRDO0FBQzFDUixTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlMsV0FBdEIsQ0FBa0MsTUFBbEM7QUFDRCxPQUZELE1BRU87QUFDTFQsU0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JVLFFBQXRCLENBQStCLE1BQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBUkQ7QUFVQVYsR0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVSyxFQUFWLENBQWEsV0FBYixFQUEwQixtQkFBMUIsRUFBK0MsVUFBVUMsQ0FBVixFQUFhO0FBQzFELFFBQUlLLElBQUksR0FBRyxJQUFYO0FBQ0FYLEtBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCWSxJQUF2QixDQUE0QixZQUFZO0FBQ3RDLFVBQUlaLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWEsSUFBUixDQUFhLGdCQUFiLEVBQStCLENBQS9CLEtBQXFDYixDQUFDLENBQUNXLElBQUQsQ0FBRCxDQUFRRyxJQUFSLENBQWEsSUFBYixFQUFtQixDQUFuQixDQUF6QyxFQUFnRTtBQUM5RGQsU0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRYSxJQUFSLENBQWEsZ0JBQWIsRUFBK0JFLElBQS9CO0FBQ0Q7QUFDRixLQUpEO0FBS0FmLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWEsSUFBUixDQUFhLElBQWIsRUFBbUJHLE1BQW5CO0FBQ0FoQixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFhLElBQVIsQ0FBYSxnQkFBYixFQUErQkksR0FBL0IsQ0FBbUMsS0FBbkMsRUFBMENqQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQixRQUFSLEdBQW1CQyxHQUE3RDtBQUNELEdBVEQ7QUFXQW5CLEdBQUMsQ0FBQ29CLElBQUYsQ0FBTztBQUNMQyxRQUFJLEVBQUUsS0FERDtBQUVMQyxPQUFHLEVBQUVsQixRQUZBO0FBR0xtQixZQUFRLEVBQUUsTUFITDtBQUlMQyxXQUFPLEVBQUUsaUJBQVVDLFdBQVYsRUFBdUI7QUFDOUIsVUFBSUMsWUFBWSxHQUFHLEVBQW5COztBQUNBLFVBQUlDLFFBQVEsRUFBWixFQUFnQjtBQUNkLFlBQUlDLGdCQUFnQixHQUFHLEVBQXZCOztBQUNBLGFBQUtDLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0osV0FBVyxDQUFDSyxNQUE1QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QyxjQUFJSixXQUFXLENBQUNLLE1BQVosSUFBc0IsQ0FBMUIsRUFBNkI7QUFDM0JGLDRCQUFnQixHQUFHLG9EQUFvREgsV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUUsSUFBbkUsR0FBMEUsSUFBMUUsR0FBaUZOLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVHLFVBQWhHLEdBQTZHLFlBQWhJO0FBQ0Q7O0FBQ0RoQyxXQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QmlDLE1BQXhCLENBQStCTCxnQkFBL0I7QUFDRDtBQUNGOztBQUNELFdBQUtDLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0osV0FBVyxDQUFDSyxNQUE1QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QyxZQUFJSixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlSyxVQUFmLENBQTBCSixNQUExQixJQUFvQyxDQUF4QyxFQUEyQztBQUN6Q0osc0JBQVksSUFBSSxrQkFBa0JELFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVFLElBQWpDLEdBQXdDLElBQXhDLEdBQStDTixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlRyxVQUE5RCxHQUEyRSxXQUEzRjtBQUNELFNBRkQsTUFHSztBQUNITixzQkFBWSxJQUFJLG9DQUFrQ0QsV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUUsSUFBakQsR0FBc0Qsc0JBQXRELEdBQTZFRixDQUE3RSxHQUErRSw4REFBL0UsR0FBZ0pKLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVHLFVBQS9KLEdBQTRLLE1BQTVMO0FBQ0EsY0FBSUcsWUFBWSxHQUFHLDZEQUFuQjs7QUFDQSxlQUFLQyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdYLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVLLFVBQWYsQ0FBMEJKLE1BQTFDLEVBQWtETSxDQUFDLEVBQW5ELEVBQXVEO0FBQ3JEO0FBQ0VELHdCQUFZLElBQUksa0JBQWtCVixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlSyxVQUFmLENBQTBCRSxDQUExQixFQUE2QkwsSUFBL0MsR0FBc0QsSUFBdEQsR0FBNkROLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVLLFVBQWYsQ0FBMEJFLENBQTFCLEVBQTZCQyxRQUExRixHQUFxRyxXQUFySCxDQUZtRCxDQUdyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFDREYsc0JBQVksSUFBSSxPQUFoQjtBQUNBVCxzQkFBWSxJQUFJUyxZQUFoQjtBQUNBVCxzQkFBWSxJQUFJLE9BQWhCO0FBQ0Q7QUFDRjs7QUFDRDFCLE9BQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCaUMsTUFBckIsQ0FBNEJQLFlBQTVCO0FBRUQsS0E5Q0k7QUErQ0xZLFNBQUssRUFBRSxlQUFVQyxLQUFWLEVBQWlCQyxTQUFqQixFQUE0QjtBQUNqQ0MsYUFBTyxDQUFDQyxHQUFSLENBQVlILEtBQVo7QUFDQUUsYUFBTyxDQUFDQyxHQUFSLENBQVlGLFNBQVo7QUFDRDtBQWxESSxHQUFQO0FBb0RELENBOUVEOztBQWdGQWIsUUFBUSxHQUFHLG9CQUFVO0FBQ25CLE1BQUlBLFFBQVEsR0FBR2dCLE1BQU0sQ0FBQ0MsVUFBUCxDQUFrQixvQ0FBbEIsQ0FBZjtBQUNBLFNBQU9qQixRQUFRLENBQUNrQixPQUFULEdBQW1CLElBQW5CLEdBQTBCLEtBQWpDO0FBQ0QsQ0FIRCxDOzs7Ozs7Ozs7Ozs7O0FDckZBO0FBQUE7QUFBQTs7O0FBSWUsU0FBU0MsYUFBVCxHQUF5QjtBQUNwQzlDLEdBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWVksSUFBWixDQUFpQixZQUFZO0FBQ3pCLFFBQUltQyxLQUFLLEdBQUcvQyxDQUFDLENBQUMsSUFBRCxDQUFiO0FBQUEsUUFBcUJnRCxlQUFlLEdBQUdoRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFpRCxRQUFSLENBQWlCLFFBQWpCLEVBQTJCbkIsTUFBbEUsQ0FEeUIsQ0FHekI7O0FBQ0E5QixLQUFDLENBQUMsZ0JBQWdCK0MsS0FBSyxDQUFDeEMsSUFBTixDQUFXLElBQVgsQ0FBakIsQ0FBRCxDQUFvQzJDLE1BQXBDO0FBRUFILFNBQUssQ0FBQ3JDLFFBQU4sQ0FBZSxlQUFmO0FBQ0FxQyxTQUFLLENBQUNJLElBQU4sQ0FBVyw0QkFBWDtBQUNBSixTQUFLLENBQUNLLEtBQU4sQ0FBWSw4Q0FBOENMLEtBQUssQ0FBQ3hDLElBQU4sQ0FBVyxJQUFYLENBQTlDLEdBQWlFLFVBQTdFO0FBRUEsUUFBSThDLGFBQWEsR0FBR04sS0FBSyxDQUFDakMsSUFBTixDQUFXLG1CQUFYLENBQXBCO0FBQ0EsUUFBSXdDLGVBQWUsR0FBR3RELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWlELFFBQVIsQ0FBaUIsaUJBQWpCLElBQXNDakQsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRaUQsUUFBUixDQUFpQixpQkFBakIsRUFBb0NNLElBQXBDLEVBQXRDLEdBQW1GUixLQUFLLENBQUNFLFFBQU4sQ0FBZSxpQkFBZixFQUFrQ08sRUFBbEMsQ0FBcUMsQ0FBckMsRUFBd0NELElBQXhDLEVBQXpHO0FBQ0EsUUFBSUUsZ0JBQWdCLEdBQUd6RCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFpRCxRQUFSLENBQWlCLGlCQUFqQixJQUFzQ2pELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWlELFFBQVIsQ0FBaUIsaUJBQWpCLEVBQW9DMUMsSUFBcEMsQ0FBeUMsT0FBekMsQ0FBdEMsR0FBMEZ3QyxLQUFLLENBQUNFLFFBQU4sQ0FBZSxpQkFBZixFQUFrQ08sRUFBbEMsQ0FBcUMsQ0FBckMsRUFBd0NqRCxJQUF4QyxDQUE2QyxPQUE3QyxDQUFqSDtBQUNBOEMsaUJBQWEsQ0FBQ0UsSUFBZCxDQUFtQkQsZUFBbkI7QUFDQUQsaUJBQWEsQ0FBQzlDLElBQWQsQ0FBbUIsUUFBbkIsRUFBNkJrRCxnQkFBN0I7QUFFQSxRQUFJQyxLQUFLLEdBQUcxRCxDQUFDLENBQUMsUUFBRCxFQUFXO0FBQ3BCLGVBQVM7QUFEVyxLQUFYLENBQUQsQ0FFVDJELFdBRlMsQ0FFR04sYUFGSCxDQUFaOztBQUlBLFNBQUssSUFBSXhCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdtQixlQUFwQixFQUFxQ25CLENBQUMsRUFBdEMsRUFBMEM7QUFDdEM3QixPQUFDLENBQUMsUUFBRCxFQUFXO0FBQ1J1RCxZQUFJLEVBQUVSLEtBQUssQ0FBQ0UsUUFBTixDQUFlLFFBQWYsRUFBeUJPLEVBQXpCLENBQTRCM0IsQ0FBNUIsRUFBK0IwQixJQUEvQixFQURFO0FBRVJLLFdBQUcsRUFBRWIsS0FBSyxDQUFDRSxRQUFOLENBQWUsUUFBZixFQUF5Qk8sRUFBekIsQ0FBNEIzQixDQUE1QixFQUErQmdDLEdBQS9CO0FBRkcsT0FBWCxDQUFELENBR0dDLFFBSEgsQ0FHWUosS0FIWjtBQUlIOztBQUVELFFBQUlLLFVBQVUsR0FBR0wsS0FBSyxDQUFDVCxRQUFOLENBQWUsSUFBZixDQUFqQjtBQUVBSSxpQkFBYSxDQUFDVyxLQUFkLENBQW9CLFVBQVUxRCxDQUFWLEVBQWE7QUFDN0JBLE9BQUMsQ0FBQzJELGVBQUY7QUFDQWpFLE9BQUMsQ0FBQywwQkFBRCxDQUFELENBQThCa0UsR0FBOUIsQ0FBa0MsSUFBbEMsRUFBd0N0RCxJQUF4QyxDQUE2QyxZQUFZO0FBQ3JEWixTQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFdBQVIsQ0FBb0IsUUFBcEIsRUFBOEJLLElBQTlCLENBQW1DLG1CQUFuQyxFQUF3REMsSUFBeEQ7QUFDSCxPQUZEO0FBR0FmLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUW1FLFdBQVIsQ0FBb0IsUUFBcEIsRUFBOEJyRCxJQUE5QixDQUFtQyxtQkFBbkMsRUFBd0RFLE1BQXhEO0FBQ0gsS0FORDtBQVFBK0MsY0FBVSxDQUFDQyxLQUFYLENBQWlCLFVBQVUxRCxDQUFWLEVBQWE7QUFDMUJBLE9BQUMsQ0FBQzJELGVBQUY7QUFDQVosbUJBQWEsQ0FBQ0UsSUFBZCxDQUFtQnZELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXVELElBQVIsRUFBbkIsRUFBbUM5QyxXQUFuQyxDQUErQyxRQUEvQztBQUNBLFVBQUlnRCxnQkFBZ0IsR0FBR3pELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLEtBQWIsQ0FBdkI7QUFDQThDLG1CQUFhLENBQUM5QyxJQUFkLENBQW1CLFFBQW5CLEVBQTZCa0QsZ0JBQTdCO0FBQ0F6RCxPQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZbUUsT0FBWixDQUFvQixzQkFBcEI7QUFFQXJCLFdBQUssQ0FBQ2MsR0FBTixDQUFVN0QsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsS0FBYixDQUFWO0FBQ0FtRCxXQUFLLENBQUMzQyxJQUFOLEdBUjBCLENBUzFCO0FBQ0gsS0FWRDtBQVlBZixLQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZK0QsS0FBWixDQUFrQixZQUFZO0FBQzFCWCxtQkFBYSxDQUFDNUMsV0FBZCxDQUEwQixRQUExQjtBQUNBaUQsV0FBSyxDQUFDM0MsSUFBTjtBQUNILEtBSEQ7QUFLSCxHQXRERDtBQXVESCxDOzs7Ozs7Ozs7Ozs7O0FDNUREO0FBQUE7QUFBTyxTQUFTc0QsaUJBQVQsR0FBNkI7QUFDaENyRSxHQUFDLENBQUMsZ0NBQUQsQ0FBRCxDQUFvQ3NFLEtBQXBDLENBQTBDO0FBQ3RDQyxZQUFRLEVBQUUsS0FENEI7QUFFdENDLFNBQUssRUFBRSxHQUYrQjtBQUd0Q0MsZ0JBQVksRUFBRSxDQUh3QjtBQUl0Q0Msa0JBQWMsRUFBRSxDQUpzQjtBQUt0Q0MsVUFBTSxFQUFFLElBTDhCO0FBTXRDO0FBQ0FDLGNBQVUsRUFBRSxDQUNSO0FBQ0lDLGdCQUFVLEVBQUUsSUFEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQURRLEVBUVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBUlEsRUFlUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWLE9BRmQsQ0FPQTtBQUNBO0FBQ0E7O0FBVEEsS0FmUTtBQVAwQixHQUExQztBQWtDSCxDOzs7Ozs7Ozs7Ozs7QUNuQ0QseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpO1xuXG4gIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xuXG4gICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgJCgnYm9keScpLm9uKFwibW91c2VvdmVyXCIsICcuZHJvcGRvd24tc3VibWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpWzBdICE9ICQoc2VsZikubmV4dCgndWwnKVswXSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQodGhpcykuZmluZCgndWwnKS50b2dnbGUoKTtcbiAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKTtcbiAgfSk7XG5cbiAgJC5hamF4KHtcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIHVybDogREVQVF9BUEksXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkZXBhcnRtZW50cykge1xuICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnO1xuICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcbiAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID0gJzxkaXYgY2xhc3M9XCJjb2wtNCBjb2wtc20tYXV0byAtZGVwdCBcIj48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPjwvZGl2Pic7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2xpPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPjxhICBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5saW5rKydcIiBpZD1cIm5hdmJhckRyb3Bkb3duJytpKydcIiByb2xlPVwiYnV0dG9uXCIgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XG4gICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvLyBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51XCI+JztcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9ICc8YSBocmVmPVwiJytkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsrJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgICAgICAgLy8gICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XG4gICAgICAgICAgICAvLyAgIGZvciAoayA9IDA7IGsgPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAvLyAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgLy8gICB9XG5cbiAgICAgICAgICAgIC8vICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICAgIC8vICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xuICAgICAgICAgICAgLy8gICBjYXRnVG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZCk7XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5sb2coanFYSFIpO1xuICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcbiAgICB9XG4gIH0pO1xufSlcblxuaXNNb2JpbGUgPSBmdW5jdGlvbigpe1xuICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIik7XG4gIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59IiwiLypcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTZWxlY3RCb3goKSB7XG4gICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcblxuICAgICAgICAvL1JlbW92ZSBwcmV2aW91c2x5IG1hZGUgc2VsZWN0Ym94XG4gICAgICAgICQoJyNzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykpLnJlbW92ZSgpO1xuXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7XG4gICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJzZWxlY3RcIj48L2Rpdj4nKTtcbiAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCIgaWQ9XCJzZWxlY3Rib3gtJyArICR0aGlzLmF0dHIoJ2lkJykgKyAnXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKSA/ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikudGV4dCgpIDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbjpzZWxlY3RlZCcpLmVxKDApLnRleHQoKVxuICAgICAgICB2YXIgc3RyU2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuY2hpbGRyZW4oXCJvcHRpb246c2VsZWN0ZWRcIikgPyAkKHRoaXMpLmNoaWxkcmVuKFwib3B0aW9uOnNlbGVjdGVkXCIpLmF0dHIoJ3ZhbHVlJykgOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykuZXEoMCkuYXR0cigndmFsdWUnKVxuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoc3RyU2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5hdHRyKCdhY3RpdmUnLCBzdHJTZWxlY3RlZFZhbHVlKTtcblxuICAgICAgICB2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG4gICAgICAgICAgICAnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG4gICAgICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcbiAgICAgICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXG4gICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXG4gICAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHZhciBzdHJTZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5hdHRyKCdyZWwnKTtcbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QuYXR0cignYWN0aXZlJywgc3RyU2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdzZWxlY3QtdmFsdWUtY2hhbmdlZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCR0aGlzLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIG1ha2VNdWx0aUNhcm91c2VsKCkge1xuICAgICQoJy5yZXNwb25zaXZlOm5vdCguc2xpY2stc2xpZGVyKScpLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=