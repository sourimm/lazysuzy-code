require('bootstrap');
require('slick-carousel');
require('./components/multi-carousel');
require('./components/custom-selectbox');

$(document).ready(function () {

  $('#searchbarHeader','#searchbarBody').submit(function(e){
    e.preventDefault();
    window.location.href = '/search?query='+$(this).find('input').val(); //relative to domain
  });
  
  var $searchIcon = $('#searchIconMobile');

  const DEPT_API = '/api/all-departments'

  $searchIcon.on('click', function (e) {
    if ($(this).attr('id') == 'searchIconMobile') {
      if ($('#searchbarHeader').hasClass('open')) {
        $('#searchbarHeader').removeClass('open');
      } else {
        $('#searchbarHeader').addClass('open');
      }
    }
  });

  $('#userLoginModal').click(function() {
      $('#modalLoginForm').modal();
  });

  $('#wishlistLoginModal').click(function() {
    $('#modalLoginForm').modal();
  });

  $('body').on("mouseover", '.dropdown-submenu', function (e) {
    var self = this;
    $('.dropdown-submenu').each(function () {
      if ($(this).find('.dropdown-menu')[0] != $(self).next('ul')[0]) {
        $(this).find('.dropdown-menu').hide();
      }
    });
    $(this).find('ul').toggle();
    if( !isMobile() ){
      $(this).find('.dropdown-menu').css('top', $(this).position().top);
    }
  });

  $.ajax({
    type: "GET",
    url: DEPT_API,
    dataType: "json",
    success: function (departments) {
      var deptToAppend = '';
      if (isMobile()) {
        var singleDeptMobile = '';
        for (var i = 0; i < departments.length; i++) {
          if (departments.length != 0) {
            singleDeptMobile = '<div class="col-4 col-sm-auto -dept "><a href="' + departments[i].link + '">' + departments[i].department + '</a></div>';
          }
          $('#mobileDepartments').append(singleDeptMobile);
        }
      }
      for (var i = 0; i < departments.length; i++) {
        if (departments[i].categories.length == 0) {
          deptToAppend += '<li><a href="' + departments[i].link + '">' + departments[i].department + '</a></li>';
        }
        else {
          deptToAppend += '<li class="dropdown"><a  href="'+departments[i].link+'" id="navbarDropdown'+i+'" role="button"  aria-haspopup="true" aria-expanded="false">' + departments[i].department + '</a>';
          var catgToAppend = '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
          for (var j = 0; j < departments[i].categories.length; j++) {
            // if (departments[i].categories[j].sub_categories.length == 0) {
              catgToAppend += '<li><a href="' + departments[i].categories[j].link + '">' + departments[i].categories[j].category + '</a></li>'
            // }
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
    error: function (jqXHR, exception) {
      console.log(jqXHR);
      console.log(exception);
    }
  });
})

export default function isMobile(){
  var isMobile = window.matchMedia("only screen and (max-width: 768px)");
  return isMobile.matches ? true : false
}