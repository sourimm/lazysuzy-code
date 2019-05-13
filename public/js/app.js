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
    }
  });
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yaWVzIiwibGluayIsImRlcGFydG1lbnQiLCJjYXRnVG9BcHBlbmQiLCJqIiwic3ViX2NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInN1YmNhdFRvQXBwZW5kIiwiayIsInN1Yl9jYXRlZ29yeSIsImFwcGVuZCIsIiR0aGlzIiwibnVtYmVyT2ZPcHRpb25zIiwiY2hpbGRyZW4iLCJ3cmFwIiwiYWZ0ZXIiLCIkc3R5bGVkU2VsZWN0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwibm90IiwidG9nZ2xlQ2xhc3MiLCJzbGljayIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFycm93cyIsInJlc3Bv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RCxDQUFELENBQVFPLElBQVIsQ0FBYSxLQUFiLENBQVY7QUFDQTZDLFNBQUssQ0FBQ3JDLElBQU4sR0FKeUIsQ0FLekI7QUFDSCxHQU5EO0FBUUFmLEdBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVl5RCxLQUFaLENBQWtCLFlBQVc7QUFDekJULGlCQUFhLENBQUN4QyxXQUFkLENBQTBCLFFBQTFCO0FBQ0EyQyxTQUFLLENBQUNyQyxJQUFOO0FBQ0gsR0FIRDtBQUtILENBNUNELEU7Ozs7Ozs7Ozs7OztBQ0pBZiwwQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFZO0FBRTFCRixHQUFDLENBQUMsYUFBRCxDQUFELENBQWlCNkQsS0FBakIsQ0FBdUI7QUFDbkJDLFlBQVEsRUFBRSxLQURTO0FBRW5CQyxTQUFLLEVBQUUsR0FGWTtBQUduQkMsZ0JBQVksRUFBRSxDQUhLO0FBSW5CQyxrQkFBYyxFQUFFLENBSkc7QUFLbkJDLFVBQU0sRUFBRSxJQUxXO0FBTW5CO0FBQ0FDLGNBQVUsRUFBRSxDQUNSO0FBQ0lDLGdCQUFVLEVBQUUsSUFEaEI7QUFFSUMsY0FBUSxFQUFFO0FBQ05MLG9CQUFZLEVBQUUsQ0FEUjtBQUVOQyxzQkFBYyxFQUFDO0FBRlQ7QUFGZCxLQURRLEVBUVI7QUFDSUcsZ0JBQVUsRUFBRSxHQURoQjtBQUVJQyxjQUFRLEVBQUU7QUFDTkwsb0JBQVksRUFBRSxDQURSO0FBRU5DLHNCQUFjLEVBQUU7QUFGVjtBQUZkLEtBUlEsRUFlUjtBQUNJRyxnQkFBVSxFQUFFLEdBRGhCO0FBRUlDLGNBQVEsRUFBRTtBQUNOTCxvQkFBWSxFQUFFLENBRFI7QUFFTkMsc0JBQWMsRUFBRTtBQUZWLE9BRmQsQ0FPQTtBQUNBO0FBQ0E7O0FBVEEsS0FmUTtBQVBPLEdBQXZCO0FBa0NILENBcENELEU7Ozs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0Ym94Jyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyICRzZWFyY2hJY29uID0gJCgnI3NlYXJjaEljb25Nb2JpbGUnKTtcblxuICBjb25zdCBERVBUX0FQSSA9ICcvYXBpL2FsbC1kZXBhcnRtZW50cydcblxuICAkc2VhcmNoSWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3NlYXJjaEljb25Nb2JpbGUnKSB7XG4gICAgICBpZiAoJCgnI3NlYXJjaGJhckhlYWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgJCgnI3NlYXJjaGJhckhlYWRlcicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gICQoJ2JvZHknKS5vbihcImNsaWNrXCIsICcuZHJvcGRvd24tc3VibWVudSBhJywgZnVuY3Rpb24oZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJy5kcm9wZG93bi1zdWJtZW51JykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgaWYoICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXSAhPSAkKHNlbGYpLm5leHQoJ3VsJylbMF0gKXtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKHRoaXMpLm5leHQoJ3VsJykudG9nZ2xlKCk7XG4gICAgJCh0aGlzKS5uZXh0KCcuZHJvcGRvd24tbWVudScpLmNzcygndG9wJywgJCh0aGlzKS5wb3NpdGlvbigpLnRvcCApO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICAkLmFqYXgoe1xuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgdXJsOiBERVBUX0FQSSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKGRlcGFydG1lbnRzKSB7XG4gICAgICB2YXIgZGVwdFRvQXBwZW5kID0gJyc7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVwYXJ0bWVudHNbaV0pO1xuICAgICAgICBpZiAoZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+PC9saT4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj48YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIGhyZWY9XCIjXCIgaWQ9XCJuYXZiYXJEcm9wZG93blwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj4nICsgZGVwYXJ0bWVudHNbaV0uZGVwYXJ0bWVudCArICc8L2E+JztcbiAgICAgICAgICB2YXIgY2F0Z1RvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJuYXZiYXJEcm9wZG93blwiPic7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpPjxhIGhyZWY9XCInICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnVcIj4nO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzxhIGhyZWY9XCIjXCI+JytkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmNhdGVnb3J5Kyc8c3BhbiBjbGFzcz1cIm14LTJcIj48aSBjbGFzcz1cImZhcyBmYS1hbmdsZS1yaWdodFwiPjwvaT48L3NwYW4+JztcbiAgICAgICAgICAgICAgdmFyIHN1YmNhdFRvQXBwZW5kID0gJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nO1xuICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzW2tdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10uc3ViX2NhdGVnb3J5ICsgJzwvYT48L2xpPidcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHN1YmNhdFRvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSBzdWJjYXRUb0FwcGVuZDtcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L2xpPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPC91bD4nO1xuICAgICAgICAgIGRlcHRUb0FwcGVuZCArPSBjYXRnVG9BcHBlbmQ7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8L2xpPic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICQoJyNkZXBhcnRtZW50c05hdicpLmFwcGVuZChkZXB0VG9BcHBlbmQpO1xuXG4gICAgfVxuICB9KTtcbn0pIiwiLypcblJlZmVyZW5jZTogaHR0cDovL2pzZmlkZGxlLm5ldC9CQjNKSy80Ny9cbiovXG5cbiQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG4gIFxuICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7IFxuICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJzZWxlY3RcIj48L2Rpdj4nKTtcbiAgICAkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIj48L2Rpdj4nKTtcblxuICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcbiAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gIFxuICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xuICAgIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG4gICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgfVxuICBcbiAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuICBcbiAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcbiAgICB9KTtcbiAgXG4gICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XG4gICAgfSk7XG4gIFxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgIH0pO1xuXG59KTsiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICAkKCcucmVzcG9uc2l2ZScpLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0LFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6NCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gWW91IGNhbiB1bnNsaWNrIGF0IGEgZ2l2ZW4gYnJlYWtwb2ludCBub3cgYnkgYWRkaW5nOlxuICAgICAgICAgICAgLy8gc2V0dGluZ3M6IFwidW5zbGlja1wiXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgIF1cbiAgICB9KTtcbn0pOyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==