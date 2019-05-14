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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).ready(function () {
  $('.responsive').slick({
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
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiaXNNb2JpbGUiLCJzaW5nbGVEZXB0TW9iaWxlIiwiaSIsImxlbmd0aCIsImxpbmsiLCJkZXBhcnRtZW50IiwiYXBwZW5kIiwiY2F0ZWdvcmllcyIsImNhdGdUb0FwcGVuZCIsImoiLCJzdWJfY2F0ZWdvcmllcyIsImNhdGVnb3J5Iiwic3ViY2F0VG9BcHBlbmQiLCJrIiwic3ViX2NhdGVnb3J5IiwiZXJyb3IiLCJqcVhIUiIsImV4Y2VwdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSw0REFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnRkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUM1QixNQUFJQyxXQUFXLEdBQUdILENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUVBLE1BQU1JLFFBQVEsR0FBRyxzQkFBakI7QUFFQUQsYUFBVyxDQUFDRSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVQyxDQUFWLEVBQWE7QUFDbkMsUUFBSU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsSUFBYixLQUFzQixrQkFBMUIsRUFBOEM7QUFDNUMsVUFBSVAsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JRLFFBQXRCLENBQStCLE1BQS9CLENBQUosRUFBNEM7QUFDMUNSLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUyxXQUF0QixDQUFrQyxNQUFsQztBQUNELE9BRkQsTUFFTztBQUNMVCxTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlUsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDRDtBQUNGO0FBQ0YsR0FSRDtBQVVBVixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVLLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHFCQUF0QixFQUE2QyxVQUFVQyxDQUFWLEVBQWE7QUFDeEQsUUFBSUssSUFBSSxHQUFHLElBQVg7QUFDQVgsS0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJZLElBQXZCLENBQTRCLFlBQVk7QUFDdEMsVUFBSVosQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRYSxJQUFSLENBQWEsZ0JBQWIsRUFBK0IsQ0FBL0IsS0FBcUNiLENBQUMsQ0FBQ1csSUFBRCxDQUFELENBQVFHLElBQVIsQ0FBYSxJQUFiLEVBQW1CLENBQW5CLENBQXpDLEVBQWdFO0FBQzlEZCxTQUFDLENBQUMsSUFBRCxDQUFELENBQVFhLElBQVIsQ0FBYSxnQkFBYixFQUErQkUsSUFBL0I7QUFDRDtBQUNGLEtBSkQ7QUFLQWYsS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRYyxJQUFSLENBQWEsSUFBYixFQUFtQkUsTUFBbkI7QUFDQWhCLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWMsSUFBUixDQUFhLGdCQUFiLEVBQStCRyxHQUEvQixDQUFtQyxLQUFuQyxFQUEwQ2pCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtCLFFBQVIsR0FBbUJDLEdBQTdEO0FBQ0FiLEtBQUMsQ0FBQ2MsZUFBRjtBQUNBZCxLQUFDLENBQUNlLGNBQUY7QUFDRCxHQVhEO0FBYUFyQixHQUFDLENBQUNzQixJQUFGLENBQU87QUFDTEMsUUFBSSxFQUFFLEtBREQ7QUFFTEMsT0FBRyxFQUFFcEIsUUFGQTtBQUdMcUIsWUFBUSxFQUFFLE1BSEw7QUFJTEMsV0FBTyxFQUFFLGlCQUFVQyxXQUFWLEVBQXVCO0FBQzlCLFVBQUlDLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxVQUFJQyxRQUFRLEVBQVosRUFBZ0I7QUFDZCxZQUFJQyxnQkFBZ0IsR0FBRyxFQUF2Qjs7QUFDQSxhQUFLQyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdKLFdBQVcsQ0FBQ0ssTUFBNUIsRUFBb0NELENBQUMsRUFBckMsRUFBeUM7QUFDdkMsY0FBSUosV0FBVyxDQUFDSyxNQUFaLElBQXNCLENBQTFCLEVBQTZCO0FBQzNCRiw0QkFBZ0IsR0FBRyxvREFBb0RILFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVFLElBQW5FLEdBQTBFLElBQTFFLEdBQWlGTixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlRyxVQUFoRyxHQUE2RyxZQUFoSTtBQUNEOztBQUNEbEMsV0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JtQyxNQUF4QixDQUErQkwsZ0JBQS9CO0FBQ0Q7QUFDRjs7QUFDRCxXQUFLQyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdKLFdBQVcsQ0FBQ0ssTUFBNUIsRUFBb0NELENBQUMsRUFBckMsRUFBeUM7QUFDdkMsWUFBSUosV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUssVUFBZixDQUEwQkosTUFBMUIsSUFBb0MsQ0FBeEMsRUFBMkM7QUFDekNKLHNCQUFZLElBQUksa0JBQWtCRCxXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlRSxJQUFqQyxHQUF3QyxJQUF4QyxHQUErQ04sV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUcsVUFBOUQsR0FBMkUsV0FBM0Y7QUFDRCxTQUZELE1BR0s7QUFDSE4sc0JBQVksSUFBSSxrS0FBa0tELFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVHLFVBQWpMLEdBQThMLE1BQTlNO0FBQ0EsY0FBSUcsWUFBWSxHQUFHLDZEQUFuQjs7QUFDQSxlQUFLQyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdYLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVLLFVBQWYsQ0FBMEJKLE1BQTFDLEVBQWtETSxDQUFDLEVBQW5ELEVBQXVEO0FBQ3JELGdCQUFJWCxXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlSyxVQUFmLENBQTBCRSxDQUExQixFQUE2QkMsY0FBN0IsQ0FBNENQLE1BQTVDLElBQXNELENBQTFELEVBQTZEO0FBQzNESywwQkFBWSxJQUFJLGtCQUFrQlYsV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUssVUFBZixDQUEwQkUsQ0FBMUIsRUFBNkJMLElBQS9DLEdBQXNELElBQXRELEdBQTZETixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlSyxVQUFmLENBQTBCRSxDQUExQixFQUE2QkUsUUFBMUYsR0FBcUcsV0FBckg7QUFDRCxhQUZELE1BR0s7QUFDSEgsMEJBQVksSUFBSSwrQkFBaEI7QUFDQUEsMEJBQVksSUFBSSxpQkFBaUJWLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVLLFVBQWYsQ0FBMEJFLENBQTFCLEVBQTZCRSxRQUE5QyxHQUF5RCw4REFBekU7QUFDQSxrQkFBSUMsY0FBYyxHQUFHLDRCQUFyQjs7QUFDQSxtQkFBS0MsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHZixXQUFXLENBQUNJLENBQUQsQ0FBWCxDQUFlSyxVQUFmLENBQTBCRSxDQUExQixFQUE2QkMsY0FBN0IsQ0FBNENQLE1BQTVELEVBQW9FVSxDQUFDLEVBQXJFLEVBQXlFO0FBQ3ZFRCw4QkFBYyxJQUFJLGtCQUFrQmQsV0FBVyxDQUFDSSxDQUFELENBQVgsQ0FBZUssVUFBZixDQUEwQkUsQ0FBMUIsRUFBNkJDLGNBQTdCLENBQTRDRyxDQUE1QyxFQUErQ1QsSUFBakUsR0FBd0UsSUFBeEUsR0FBK0VOLFdBQVcsQ0FBQ0ksQ0FBRCxDQUFYLENBQWVLLFVBQWYsQ0FBMEJFLENBQTFCLEVBQTZCQyxjQUE3QixDQUE0Q0csQ0FBNUMsRUFBK0NDLFlBQTlILEdBQTZJLFdBQS9KO0FBQ0Q7O0FBRURGLDRCQUFjLElBQUksT0FBbEI7QUFDQUosMEJBQVksSUFBSUksY0FBaEI7QUFDQUosMEJBQVksSUFBSSxPQUFoQjtBQUNEO0FBQ0Y7O0FBQ0RBLHNCQUFZLElBQUksT0FBaEI7QUFDQVQsc0JBQVksSUFBSVMsWUFBaEI7QUFDQVQsc0JBQVksSUFBSSxPQUFoQjtBQUNEO0FBQ0Y7O0FBQ0Q1QixPQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQm1DLE1BQXJCLENBQTRCUCxZQUE1QjtBQUVELEtBOUNJO0FBK0NMZ0IsU0FBSyxFQUFFLGVBQVVDLEtBQVYsRUFBaUJDLFNBQWpCLEVBQTRCO0FBQ2pDQyxhQUFPLENBQUNDLEdBQVIsQ0FBWUgsS0FBWjtBQUNBRSxhQUFPLENBQUNDLEdBQVIsQ0FBWUYsU0FBWjtBQUNEO0FBbERJLEdBQVA7QUFvREQsQ0FoRkQ7O0FBa0ZBakIsUUFBUSxHQUFHLG9CQUFVO0FBQ25CLE1BQUlBLFFBQVEsR0FBR29CLE1BQU0sQ0FBQ0MsVUFBUCxDQUFrQixvQ0FBbEIsQ0FBZjtBQUNBLFNBQU9yQixRQUFRLENBQUNzQixPQUFULEdBQW1CLElBQW5CLEdBQTBCLEtBQWpDO0FBQ0QsQ0FIRCxDOzs7Ozs7Ozs7Ozs7QUN2RkE7OztBQUlBbkQsQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZWSxJQUFaLENBQWlCLFlBQVU7QUFDdkIsTUFBSXdDLEtBQUssR0FBR3BELENBQUMsQ0FBQyxJQUFELENBQWI7QUFBQSxNQUFxQnFELGVBQWUsR0FBR3JELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXNELFFBQVIsQ0FBaUIsUUFBakIsRUFBMkJ0QixNQUFsRTtBQUVBb0IsT0FBSyxDQUFDMUMsUUFBTixDQUFlLGVBQWY7QUFDQTBDLE9BQUssQ0FBQ0csSUFBTixDQUFXLDRCQUFYO0FBQ0FILE9BQUssQ0FBQ0ksS0FBTixDQUFZLG1DQUFaO0FBRUEsTUFBSUMsYUFBYSxHQUFHTCxLQUFLLENBQUN0QyxJQUFOLENBQVcsbUJBQVgsQ0FBcEI7QUFDQTJDLGVBQWEsQ0FBQ0MsSUFBZCxDQUFtQk4sS0FBSyxDQUFDRSxRQUFOLENBQWUsUUFBZixFQUF5QkssRUFBekIsQ0FBNEIsQ0FBNUIsRUFBK0JELElBQS9CLEVBQW5CO0FBRUEsTUFBSUUsS0FBSyxHQUFHNUQsQ0FBQyxDQUFDLFFBQUQsRUFBVztBQUNwQixhQUFTO0FBRFcsR0FBWCxDQUFELENBRVQ2RCxXQUZTLENBRUdKLGFBRkgsQ0FBWjs7QUFJQSxPQUFLLElBQUkxQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc0IsZUFBcEIsRUFBcUN0QixDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDL0IsS0FBQyxDQUFDLFFBQUQsRUFBVztBQUNSMEQsVUFBSSxFQUFFTixLQUFLLENBQUNFLFFBQU4sQ0FBZSxRQUFmLEVBQXlCSyxFQUF6QixDQUE0QjVCLENBQTVCLEVBQStCMkIsSUFBL0IsRUFERTtBQUVSSSxTQUFHLEVBQUVWLEtBQUssQ0FBQ0UsUUFBTixDQUFlLFFBQWYsRUFBeUJLLEVBQXpCLENBQTRCNUIsQ0FBNUIsRUFBK0JnQyxHQUEvQjtBQUZHLEtBQVgsQ0FBRCxDQUdHQyxRQUhILENBR1lKLEtBSFo7QUFJSDs7QUFFRCxNQUFJSyxVQUFVLEdBQUdMLEtBQUssQ0FBQ04sUUFBTixDQUFlLElBQWYsQ0FBakI7QUFFQUcsZUFBYSxDQUFDUyxLQUFkLENBQW9CLFVBQVM1RCxDQUFULEVBQVk7QUFDNUJBLEtBQUMsQ0FBQ2MsZUFBRjtBQUNBcEIsS0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEJtRSxHQUE5QixDQUFrQyxJQUFsQyxFQUF3Q3ZELElBQXhDLENBQTZDLFlBQVU7QUFDbkRaLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVMsV0FBUixDQUFvQixRQUFwQixFQUE4QkssSUFBOUIsQ0FBbUMsbUJBQW5DLEVBQXdEQyxJQUF4RDtBQUNILEtBRkQ7QUFHQWYsS0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRb0UsV0FBUixDQUFvQixRQUFwQixFQUE4QnRELElBQTlCLENBQW1DLG1CQUFuQyxFQUF3REUsTUFBeEQ7QUFDSCxHQU5EO0FBUUFpRCxZQUFVLENBQUNDLEtBQVgsQ0FBaUIsVUFBUzVELENBQVQsRUFBWTtBQUN6QkEsS0FBQyxDQUFDYyxlQUFGO0FBQ0FxQyxpQkFBYSxDQUFDQyxJQUFkLENBQW1CMUQsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRMEQsSUFBUixFQUFuQixFQUFtQ2pELFdBQW5DLENBQStDLFFBQS9DO0FBQ0EyQyxTQUFLLENBQUNXLEdBQU4sQ0FBVS9ELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLEtBQWIsQ0FBVjtBQUNBcUQsU0FBSyxDQUFDN0MsSUFBTixHQUp5QixDQUt6QjtBQUNILEdBTkQ7QUFRQWYsR0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWWlFLEtBQVosQ0FBa0IsWUFBVztBQUN6QlQsaUJBQWEsQ0FBQ2hELFdBQWQsQ0FBMEIsUUFBMUI7QUFDQW1ELFNBQUssQ0FBQzdDLElBQU47QUFDSCxHQUhEO0FBS0gsQ0E1Q0QsRTs7Ozs7Ozs7Ozs7O0FDSkFmLDBDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFFMUJGLEdBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJxRSxLQUFqQixDQUF1QjtBQUNuQkMsWUFBUSxFQUFFLEtBRFM7QUFFbkJDLFNBQUssRUFBRSxHQUZZO0FBR25CQyxnQkFBWSxFQUFFLENBSEs7QUFJbkJDLGtCQUFjLEVBQUUsQ0FKRztBQUtuQkMsVUFBTSxFQUFFLElBTFc7QUFNbkI7QUFDQUMsY0FBVSxFQUFFLENBQ1I7QUFDSUMsZ0JBQVUsRUFBRSxJQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUM7QUFGVDtBQUZkLEtBRFEsRUFRUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWO0FBRmQsS0FSUSxFQWVSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlYsT0FGZCxDQU9BO0FBQ0E7QUFDQTs7QUFUQSxLQWZRO0FBUE8sR0FBdkI7QUFrQ0gsQ0FwQ0QsRTs7Ozs7Ozs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpO1xuXG4gIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xuXG4gICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgJCgnYm9keScpLm9uKFwiY2xpY2tcIiwgJy5kcm9wZG93bi1zdWJtZW51IGEnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkKCcuZHJvcGRvd24tc3VibWVudScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0pIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKHRoaXMpLm5leHQoJ3VsJykudG9nZ2xlKCk7XG4gICAgJCh0aGlzKS5uZXh0KCcuZHJvcGRvd24tbWVudScpLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IERFUFRfQVBJLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGVwYXJ0bWVudHMpIHtcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcbiAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgIHZhciBzaW5nbGVEZXB0TW9iaWxlID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChkZXBhcnRtZW50cy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgc2luZ2xlRGVwdE1vYmlsZSA9ICc8ZGl2IGNsYXNzPVwiY29sLTQgY29sLXNtLWF1dG8gLWRlcHQgXCI+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2Rpdj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcjbW9iaWxlRGVwYXJ0bWVudHMnKS5hcHBlbmQoc2luZ2xlRGVwdE1vYmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9saT4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj48YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGhyZWY9XCIjXCIgaWQ9XCJuYXZiYXJEcm9wZG93blwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+JztcbiAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPic7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCIjXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPHNwYW4gY2xhc3M9XCJteC0yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9zcGFuPic7XG4gICAgICAgICAgICAgIHZhciBzdWJjYXRUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+JztcbiAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLnN1Yl9jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzdWJjYXRUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gc3ViY2F0VG9BcHBlbmQ7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gY2F0Z1RvQXBwZW5kO1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPC9saT4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAkKCcjZGVwYXJ0bWVudHNOYXYnKS5hcHBlbmQoZGVwdFRvQXBwZW5kKTtcblxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZyhqcVhIUik7XG4gICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pO1xuICAgIH1cbiAgfSk7XG59KVxuXG5pc01vYmlsZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKTtcbiAgcmV0dXJuIGlzTW9iaWxlLm1hdGNoZXMgPyB0cnVlIDogZmFsc2Vcbn0iLCIvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblxuJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcbiAgXG4gICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTsgXG4gICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xuICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiPjwvZGl2PicpO1xuXG4gICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xuICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcbiAgXG4gICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xuICAgICAgICAnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG4gICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG4gIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcbiAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcbiAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXG4gICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICB9XG4gIFxuICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG4gIFxuICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgIH0pO1xuICBcbiAgICAkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcbiAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCR0aGlzLnZhbCgpKTtcbiAgICB9KTtcbiAgXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgfSk7XG5cbn0pOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICQoJy5yZXNwb25zaXZlJykuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDo0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBZb3UgY2FuIHVuc2xpY2sgYXQgYSBnaXZlbiBicmVha3BvaW50IG5vdyBieSBhZGRpbmc6XG4gICAgICAgICAgICAvLyBzZXR0aW5nczogXCJ1bnNsaWNrXCJcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgYSBzZXR0aW5ncyBvYmplY3RcbiAgICAgICAgXVxuICAgIH0pO1xufSk7IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9