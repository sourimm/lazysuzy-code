require('ion-rangeslider')
require('../apis/listing-api')

$(document).ready(function() {
    let iItemsToShow = 3
    strItemsNumClass = 'item-3'

    $('#priceRangeSlider').change(function() {
        $('#priceInfo')
            .find('.low')
            .text($(this).attr('min'))
        $('#priceInfo')
            .find('.high')
            .text($(this).val())
    })

    $priceRangeSlider = $('#priceRangeSlider')

    $priceRangeSlider.ionRangeSlider({
        skin: 'sharp',
        type: 'double',
        min: 100,
        max: 5000,
        from: 500,
        to: 2500,
        prefix: '$',
        prettify_separator: ','
    })

    // var priceSlider = priceSliderContainer.$priceRangeSlider;

    // $('body').on('change', '.price-range-slider', function () {
    //     var $inp = $(this);
    //     var from = $inp.prop("value"); // reading input value
    //     var from2 = $inp.data("from"); // reading input data-from attribute

    //     console.log(from, from2); // FROM value
    // });

    $('#filterToggleBtn').click(function() {
        $('#filters').toggleClass('show')
    })

    $('#viewItemsBtn').click(function() {
        iItemsToShow = iItemsToShow == 1 ? 3 : iItemsToShow - 1
        if (iItemsToShow !== 1) {
            $('#viewItemsBtn')
                .children('i')
                .removeClass()
            $('#viewItemsBtn')
                .children('i')
                .addClass('fas fa-th-list')
        } else {
            $('#viewItemsBtn')
                .children('i')
                .removeClass()
            $('#viewItemsBtn')
                .children('i')
                .addClass('fab fa-buromobelexperte')
        }

        $('#productsContainerDiv')
            .find('.ls-product-div')
            .each(function() {
                $(this).removeClass(function(index, className) {
                    return (className.match(/(^|\s)item-\S+/g) || []).join(' ')
                })
                strItemsNumClass = 'item-' + iItemsToShow
                $(this).addClass(strItemsNumClass)
            })
    })

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (
            !$(this)
                .next()
                .hasClass('show')
        ) {
            $(this)
                .parents('.dropdown-menu')
                .first()
                .find('.show')
                .removeClass('show')
        }
        var $subMenu = $(this).next('.dropdown-menu')
        $subMenu.toggleClass('show')
        $('ul a[href^="/' + location.pathname.split('/')[1] + '"]').addClass(
            'active'
        )
        $(this)
            .parents('li.nav-item.dropdown.show')
            .on('hidden.bs.dropdown', function(e) {
                $('.dropdown-submenu .show').removeClass('show')
            })
        return false
    })
})
