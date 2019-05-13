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
    },
    error: function error(jqXHR, exception) {
      console.log(jqXHR);
      console.log(exception);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbXVsdGktY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHNlYXJjaEljb24iLCJERVBUX0FQSSIsIm9uIiwiZSIsImF0dHIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZWxmIiwiZWFjaCIsImZpbmQiLCJuZXh0IiwiaGlkZSIsInRvZ2dsZSIsImNzcyIsInBvc2l0aW9uIiwidG9wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImRlcGFydG1lbnRzIiwiZGVwdFRvQXBwZW5kIiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yaWVzIiwibGluayIsImRlcGFydG1lbnQiLCJjYXRnVG9BcHBlbmQiLCJqIiwic3ViX2NhdGVnb3JpZXMiLCJjYXRlZ29yeSIsInN1YmNhdFRvQXBwZW5kIiwiayIsInN1Yl9jYXRlZ29yeSIsImFwcGVuZCIsImVycm9yIiwianFYSFIiLCJleGNlcHRpb24iLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwid3JhcCIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsInRleHQiLCJlcSIsIiRsaXN0IiwiaW5zZXJ0QWZ0ZXIiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsIm5vdCIsInRvZ2dsZUNsYXNzIiwic2xpY2siLCJpbmZpbml0ZSIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xp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QU9BO0FBQ0E7QUFDQTs7QUFUQSxLQWZRO0FBUE8sR0FBdkI7QUFrQ0gsQ0FwQ0QsRTs7Ozs7Ozs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xucmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tdWx0aS1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3Rib3gnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgJHNlYXJjaEljb24gPSAkKCcjc2VhcmNoSWNvbk1vYmlsZScpO1xuXG4gIGNvbnN0IERFUFRfQVBJID0gJy9hcGkvYWxsLWRlcGFydG1lbnRzJ1xuXG4gICRzZWFyY2hJY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAnc2VhcmNoSWNvbk1vYmlsZScpIHtcbiAgICAgIGlmICgkKCcjc2VhcmNoYmFySGVhZGVyJykuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAkKCcjc2VhcmNoYmFySGVhZGVyJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzZWFyY2hiYXJIZWFkZXInKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgJCgnYm9keScpLm9uKFwiY2xpY2tcIiwgJy5kcm9wZG93bi1zdWJtZW51IGEnLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpWzBdICE9ICQoc2VsZikubmV4dCgndWwnKVswXSApe1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bi1tZW51JykuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQodGhpcykubmV4dCgndWwnKS50b2dnbGUoKTtcbiAgICAkKHRoaXMpLm5leHQoJy5kcm9wZG93bi1tZW51JykuY3NzKCd0b3AnLCAkKHRoaXMpLnBvc2l0aW9uKCkudG9wICk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IERFUFRfQVBJLFxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGVwYXJ0bWVudHMpIHtcbiAgICAgIHZhciBkZXB0VG9BcHBlbmQgPSAnJztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zb2xlLmxvZyhkZXBhcnRtZW50c1tpXSk7XG4gICAgICAgIGlmIChkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5saW5rICsgJ1wiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT48L2xpPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPjxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgaHJlZj1cIiNcIiBpZD1cIm5hdmJhckRyb3Bkb3duXCIgcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPicgKyBkZXBhcnRtZW50c1tpXS5kZXBhcnRtZW50ICsgJzwvYT4nO1xuICAgICAgICAgIHZhciBjYXRnVG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIm5hdmJhckRyb3Bkb3duXCI+JztcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8bGk+PGEgaHJlZj1cIicgKyBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLmxpbmsgKyAnXCI+JyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudVwiPic7XG4gICAgICAgICAgICAgIGNhdGdUb0FwcGVuZCArPSAnPGEgaHJlZj1cIiNcIj4nK2RlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uY2F0ZWdvcnkrJzxzcGFuIGNsYXNzPVwibXgtMlwiPjxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICB2YXIgc3ViY2F0VG9BcHBlbmQgPSAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPic7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBkZXBhcnRtZW50c1tpXS5jYXRlZ29yaWVzW2pdLnN1Yl9jYXRlZ29yaWVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzxsaT48YSBocmVmPVwiJyArIGRlcGFydG1lbnRzW2ldLmNhdGVnb3JpZXNbal0uc3ViX2NhdGVnb3JpZXNba10ubGluayArICdcIj4nICsgZGVwYXJ0bWVudHNbaV0uY2F0ZWdvcmllc1tqXS5zdWJfY2F0ZWdvcmllc1trXS5zdWJfY2F0ZWdvcnkgKyAnPC9hPjwvbGk+J1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3ViY2F0VG9BcHBlbmQgKz0gJzwvdWw+JztcbiAgICAgICAgICAgICAgY2F0Z1RvQXBwZW5kICs9IHN1YmNhdFRvQXBwZW5kO1xuICAgICAgICAgICAgICBjYXRnVG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Z1RvQXBwZW5kICs9ICc8L3VsPic7XG4gICAgICAgICAgZGVwdFRvQXBwZW5kICs9IGNhdGdUb0FwcGVuZDtcbiAgICAgICAgICBkZXB0VG9BcHBlbmQgKz0gJzwvbGk+JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJCgnI2RlcGFydG1lbnRzTmF2JykuYXBwZW5kKGRlcHRUb0FwcGVuZCk7XG5cbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbil7XG4gICAgICBjb25zb2xlLmxvZyhqcVhIUik7XG4gICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pO1xuICAgIH1cbiAgfSk7XG59KSIsIi8qXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXG4qL1xuXG4kKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xuICBcbiAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpOyBcbiAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XG5cbiAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xuICBcbiAgICB2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcbiAgICB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcbiAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAkKCc8bGkgLz4nLCB7XG4gICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xuICAgIH1cbiAgXG4gICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcbiAgXG4gICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG4gICAgfSk7XG4gIFxuICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgIH0pO1xuICBcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICB9KTtcblxufSk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgJCgnLnJlc3BvbnNpdmUnKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOjQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFlvdSBjYW4gdW5zbGljayBhdCBhIGdpdmVuIGJyZWFrcG9pbnQgbm93IGJ5IGFkZGluZzpcbiAgICAgICAgICAgIC8vIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBhIHNldHRpbmdzIG9iamVjdFxuICAgICAgICBdXG4gICAgfSk7XG59KTsiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=