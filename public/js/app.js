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
        console.log(departments[i]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiaXNNb2JpbGUiLCJzaW5nbGVEZXB0TW9iaWxlIiwiaSIsImxlbmd0aCIsImxpbmsiLCJkZXBhcnRtZW50IiwiYXBwZW5kIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3JpZXMiLCJjYXRnVG9BcHBlbmQiLCJqIiwic3ViX2NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInN1YmNhdFRvQXBwZW5kIiwiayIsInN1Yl9jYXRlZ29yeSIsImVycm9yIiwianFYSFIiLCJleGNlcHRpb24iLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSw0REFBTyxDQUFDLGdFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnRkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUM1QixNQUFJQyxXQUFXLEdBQUdILENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUVBLE1BQU1JLFFBQVEsR0FBRyxzQkFBakI7QUFFQUQsYUFBVyxDQUFDRSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFVQyxDQUFWLEVBQWE7QUFDbkMsUUFBSU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsSUFBYixLQUFzQixrQkFBMUIsRUFBOEM7QUFDNUMsVUFBSVAsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JRLFFBQXRCLENBQStCLE1BQS9CLENBQUosRUFBNEM7QUFDMUNSLFNBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCUyxXQUF0QixDQUFrQyxNQUFsQztBQUNELE9BRkQsTUFFTztBQUNMVCxTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlUsUUFBdEIsQ0FBK0IsTUFBL0I7QUFDRDtBQUNGO0FBQ0YsR0FSRDtBQVVBVixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVLLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHFCQUF0QixFQUE2QyxVQUFVQyxDQUFWLEVBQWE7QUFDeEQsUUFBSUssSUFBSSxHQUFHLElBQVg7QUFDQVgsS0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJZLElBQXZCLENBQTRCLFlBQVk7QUFDdEMsVUFBSVosQ0FBQyxDQUFDLElB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V0FBZCxDQUEwQixRQUExQjtBQUNBbUQsU0FBSyxDQUFDN0MsSUFBTjtBQUNILEdBSEQ7QUFLSCxDQTVDRCxFOzs7Ozs7Ozs7Ozs7QUNKQWYsMENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUUxQkYsR0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQnFFLEtBQWpCLENBQXVCO0FBQ25CQyxZQUFRLEVBQUUsS0FEUztBQUVuQkMsU0FBSyxFQUFFLEdBRlk7QUFHbkJDLGdCQUFZLEVBQUUsQ0FISztBQUluQkMsa0JBQWMsRUFBRSxDQUpHO0FBS25CQyxVQUFNLEVBQUUsSUFMVztBQU1uQjtBQUNBQyxjQUFVLEVBQUUsQ0FDUjtBQUNJQyxnQkFBVSxFQUFFLElBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBQztBQUZUO0FBRmQsS0FEUSxFQVFSO0FBQ0lHLGdCQUFVLEVBQUUsR0FEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFFO0FBRlY7QUFGZCxLQVJRLEVBZVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVixPQUZkLENBT0E7QUFDQTtBQUNBOztBQVRBLEtBZlE7QUFQTyxHQUF2QjtBQWtDSCxDQXBDRCxFOzs7Ozs7Ozs7Ozs7QUNBQSx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5yZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL211bHRpLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvY3VzdG9tLXNlbGVjdGJveCcpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIHZhciAkc2VhcmNoSWNvbiA9ICQoJyNzZWFyY2hJY29uTW9iaWxlJyk7XG5cbiAgY29uc3QgREVQVF9BUEkgPSAnL2FwaS9hbGwtZGVwYXJ0bWVudHMnXG5cbiAgJHNlYXJjaEljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09ICdzZWFyY2hJY29uTW9iaWxlJykge1xuICAgICAgaWYgKCQoJyNzZWFyY2hiYXJIZWFkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAkKCdib2R5Jykub24oXCJjbGlja1wiLCAnLmRyb3Bkb3duLXN1Ym1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpWzBdICE9ICQoc2VsZikubmV4dCgndWwnKVswXSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQodGhpcykubmV4dCgndWwnKS50b2dnbGUoKTtcbiAgICAkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51JykuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgJC5hamF4KHtcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIHVybDogREVQVF9BUEksXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkZXBhcnRtZW50cykge1xuICAgICAgdmFyIGRlcHRUb0FwcGVuZCA9ICcnO1xuICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcbiAgICAgICAgdmFyIHNpbmdsZURlcHRNb2JpbGUgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGRlcGFydG1lbnRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBzaW5nbGVEZXB0TW9iaWxlID0gJzxkaXYgY2xhc3M9XCJjb2wtNCBjb2wtc20tYXV0byAtZGVwdCBcIj48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPjwvZGl2Pic7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJyNtb2JpbGVEZXBhcnRtZW50cycpLmFwcGVuZChzaW5nbGVEZXB0TW9iaWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGRlcGFydG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlcGFydG1lbnRzW2ldKTtcbiAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPjwvbGk+JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+PGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBocmVmPVwiI1wiIGlkPVwibmF2YmFyRHJvcGRvd25cIiByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArIGRlcGFydG1lbnRzW2ldLmRlcGFydG1lbnQgKyAnPC9hPic7XG4gICAgICAgICAgdmFyIGNhdGdUb0FwcGVuZCA9ICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwibmF2YmFyRHJvcGRvd25cIj4nO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5jYXRlZ29yeSArICc8L2E+PC9saT4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51XCI+JztcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8YSBocmVmPVwiI1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZCk7XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5sb2coanFYSFIpO1xuICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcbiAgICB9XG4gIH0pO1xufSlcblxuaXNNb2JpbGUgPSBmdW5jdGlvbigpe1xuICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIik7XG4gIHJldHVybiBpc01vYmlsZS5tYXRjaGVzID8gdHJ1ZSA6IGZhbHNlXG59IiwiLypcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cbiovXG5cbiQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG4gIFxuICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7IFxuICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJzZWxlY3RcIj48L2Rpdj4nKTtcbiAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIj48L2Rpdj4nKTtcblxuICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcbiAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gIFxuICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xuICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG4gICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgfVxuICBcbiAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuICBcbiAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICB9KTtcbiAgXG4gICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XG4gICAgfSk7XG4gIFxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgIH0pO1xuXG59KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICAkKCcucmVzcG9uc2l2ZScpLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6NCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgIF1cbiAgICB9KTtcbn0pOyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==