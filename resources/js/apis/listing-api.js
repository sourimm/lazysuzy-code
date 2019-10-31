import * as multiCarouselFuncs from '../components/multi-carousel';
import makeSelectBox from '../components/custom-selectbox';
import isMobile from '../app.js';
// import strItemsNumClass from '../pages/listing';
// import * as priceSliderContainer from '../pages/listing';

$(document).ready(function() {
    const LISTING_API_PATH = '/api' + location.pathname;
    const LISTING_FILTER_API_PATH = '/api/filter/products';
    const DEPT_API = '/api/all-departments';
    const FAV_MARK_API = '/api/mark/favourite/';
    const FAV_UNMARK_API = '/api/unmark/favourite/';
    const PRODUCT_URL = '/product/';
    var totalResults = 0;
    var UrlSearchParams = new Object();
    var objGlobalFilterData;
    var bFiltersCreated = false;
    var search = window.location.search.substring(1);
    var queryObject = search
        ? JSON.parse(
              '{"' +
                  decodeURI(search)
                      .replace(/"/g, '\\"')
                      .replace(/&/g, '","')
                      .replace(/=/g, '":"') +
                  '"}'
          )
        : {};
    var strFilters = queryObject.filters || '';
    var strSortType = queryObject.sort_type || '';
    var iPageNo = parseInt(queryObject.pageno) || 0,
        iLimit;
    var price_from, price_to;
    var bNoMoreProductsToShow = false;
    var bFetchingProducts = false;

    $(window).scroll(function() {
        if (!bNoMoreProductsToShow) {
            if ($('#loaderImg') && isScrolledIntoView($('#loaderImg')[0])) {
                fetchProducts(false);
            } else if ($('#loaderImg') === null) {
                fetchProducts(false);
            }
        }
    });

    function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    }

    function fetchProducts(bClearPrevProducts) {
        if (!bFetchingProducts) {
            bFetchingProducts = true;
            var strLimit = iLimit === undefined ? '' : '&limit=' + iLimit;
            var filterQuery =
                '?filters=' +
                strFilters +
                '&sort_type=' +
                strSortType +
                '&pageno=' +
                iPageNo +
                strLimit;
            var listingApiPath = LISTING_API_PATH + filterQuery;

            history.pushState(
                {},
                '',
                window.location.protocol +
                    '//' +
                    window.location.host +
                    window.location.pathname +
                    filterQuery
            );
            console.log(listingApiPath);
            //$('#loaderImg').show();
            $('#noProductsText').hide();

            if (
                iPageNo > 0 &&
                !$('#productsContainerDiv')
                    .html()
                    .trim()
            ) {
                console.log(
                    'Got here using the browser "Back" or "Forward" button.'
                );
                var apiCall = [];
                for (var i = 0; i <= iPageNo; i++) {
                    var filterQuery =
                        '?filters=' +
                        strFilters +
                        '&sort_type=' +
                        strSortType +
                        '&pageno=' +
                        i +
                        strLimit;
                    var listingApiPath = LISTING_API_PATH + filterQuery;
                    apiCall.push(
                        $.ajax({
                            type: 'GET',
                            url: listingApiPath,
                            dataType: 'json'
                        })
                    );
                }
                var productsarry = [];
                $.when.apply(undefined, apiCall).then(function(...results) {
                    results.map(data => {
                        productsarry = [...productsarry, ...data[0].products];
                    });
                    results[0][0].products = productsarry;
                    listingApiRendering(results[0][0]);
                });
                iPageNo += 1;
            } else {
                iPageNo += 1;
                $.ajax({
                    type: 'GET',
                    url: listingApiPath,
                    dataType: 'json',
                    success: function(data) {
                        listingApiRendering(data);
                    },
                    error: function(jqXHR, exception) {
                        bFetchingProducts = false;
                        console.log(jqXHR);
                        console.log(exception);
                    }
                });
            }
        }
        function listingApiRendering(data) {
            bFetchingProducts = false;

            console.log(data);
            if (bClearPrevProducts) {
                $('#productsContainerDiv').empty();
                totalResults = 0;
            }
            //$('#loaderImg').hide();
            if (data == null) {
                return;
            }
            if (data.products != undefined && data.products.length != 0) {
                bNoMoreProductsToShow = true;

                totalResults = data.total;
                $('#totalResults').text(totalResults);

                var anchor = $('<a/>', {
                    href: '#page' + iPageNo,
                    id: '#anchor-page' + iPageNo
                }).appendTo('#productsContainerDiv');
                for (var i = 0; i < data.products.length; i++) {
                    createProductDiv(data.products[i]);
                }
                // scrollToAnchor();
                multiCarouselFuncs.makeMultiCarousel();
            } else {
                // if (!bClearPrevProducts) {
                bNoMoreProductsToShow = true;
                iPageNo -= 1;
                $('#noProductsText').show();
                $('#loaderImg').hide();
                return;
                // }
            }
            if (data.filterData) {
                objGlobalFilterData = data.filterData;
                createUpdateFilterData(data.filterData);
            }
            if (data.sortType) {
                $('#sort').empty();
                data.sortType.forEach(element => {
                    var sortElm = jQuery('<option />', {
                        value: element.value,
                        selected: element.enabled,
                        text: element.name
                    }).appendTo('#sort');
                    if (element.enabled) {
                        strSortType = element.value;
                    }
                });
                makeSelectBox();
            }

            //     $("#anchor-page"+iPageNo)[0].click()
        }
    }
    function createProductDiv(productDetails) {
        //Make product main div
        var mainProductDiv = jQuery('<div/>', {
            id: productDetails.id,
            sku: productDetails.sku,
            site: productDetails.site,
            class: 'ls-product-div col-md-3 ' + strItemsNumClass
        }).appendTo('#productsContainerDiv');

        var productLink = jQuery('<a/>', {
            href: PRODUCT_URL + productDetails.sku,
            class: 'product-detail-modal'
        }).appendTo(mainProductDiv);

        var product = jQuery('<div/>', {
            class: 'ls-product'
        }).appendTo(productLink);

        jQuery('<img />', {
            class: 'prod-img img-fluid',
            src: productDetails.main_image,
            alt: productDetails.name
        }).appendTo(product);

        //Product information
        var prodInfo = jQuery('<div/>', {
            class: 'prod-info d-none d-md-block'
        }).appendTo(product);
        var catDetails = jQuery('<span/>', {
            class: '-cat-name'
        }).appendTo(prodInfo);
        $(catDetails).text(productDetails.site);
        var prices = jQuery('<span/>', {
            class: '-prices float-right'
        }).appendTo(prodInfo);
        var currPrice = jQuery('<span/>', {
            class: '-cprice'
        }).appendTo(prices);
        $(currPrice).text('$' + productDetails.is_price);
        if (productDetails.is_price < productDetails.was_price) {
            var oldPrice = jQuery('<span/>', {
                class: '-oldprice'
            }).appendTo(prices);
            $(oldPrice).text('$' + productDetails.was_price);
        }
        var strMarked = productDetails.wishlisted ? 'marked' : '';
        $(product).append(
            '<div class="wishlist-icon ' +
                strMarked +
                '" sku=' +
                productDetails.sku +
                '><i class="far fa-heart -icon"></i></div>'
        );

        var productInfoNext = jQuery('<div/>', {
            class: 'd-none d-md-block'
        }).appendTo(mainProductDiv);
        $(productInfoNext).append(
            '<div class="-name">' + productDetails.name + '</div>'
        );

        var carouselMainDiv = jQuery('<div/>', {
            class: 'responsive'
        }).appendTo(productInfoNext);

        var variationImages = productDetails.variations.map(
            variation => variation.image
        );
        var variationSwatchImages = productDetails.variations.map(
            (variation, idx) => {
                if (productDetails.site !== 'Westelm') {
                    return variation.swatch_image || variationImages[idx];
                } else {
                    return variation.swatch_image;
                }
            }
        );
        var variationLinks = productDetails.variations.map(
            variation => variation.link
        );

        if (productDetails.main_image != null) {
            jQuery('<img />', {
                class: 'variation-img img-fluid',
                src: productDetails.main_image,
                alt: 'variation-img'
            }).appendTo(product);
        }

        if (variationSwatchImages.length > 0) {
            variationSwatchImages.forEach((img, idx) => {
                var responsiveImgDiv = jQuery('<div/>', {
                    class: 'mini-carousel-item'
                }).appendTo(carouselMainDiv);
                var anchor = jQuery('<a/>', {
                    class: 'responsive-img-a',
                    href: variationLinks[idx]
                }).appendTo(responsiveImgDiv);
                var responsiveImg = jQuery('<img/>', {
                    class: 'carousel-img img-fluid',
                    src: img,
                    'data-prodimg': variationImages[idx]
                }).appendTo(anchor);
            });
        } else {
            carouselMainDiv.addClass('d-none');
        }

        if (
            productDetails.reviews != null &&
            parseInt(productDetails.reviews) != 0
        ) {
            var reviewValue = parseInt(productDetails.reviews);
            var ratingValue = parseFloat(productDetails.rating).toFixed(1);
            var ratingClass = ratingValue.toString().replace('.', '_');
            $(productInfoNext).append(
                '<div class="rating-container"><div class="rating  rating-' +
                    ratingClass +
                    '"></div><span class="total-ratings">' +
                    reviewValue +
                    '</span></div>'
            );
        }
    }

    function createUpdateFilterData(filterData) {
        bNoMoreProductsToShow = false;
        if (!bFiltersCreated) {
            bFiltersCreated = true;
            $('#filters').empty();
            Object.keys(filterData).forEach((key, index) => {
                const data = filterData[key];
                if (data.length == 0) {
                    return;
                }
                var filterDiv = jQuery('<div/>', {
                    class: 'filter',
                    'data-filter': key
                }).appendTo('#filters');
                $(filterDiv).append('<hr/>');

                $(filterDiv).append(
                    '<span class="filter-header">' +
                        key.replace('_', ' ') +
                        '</span>'
                );
                $(filterDiv).append(
                    '<label for="' +
                        key +
                        '" class="clear-filter float-right">Clear</label>'
                );

                if (key != 'price') {
                    var filterUl = jQuery('<ul/>', {}).appendTo(filterDiv);
                    data.forEach(element => {
                        var filterLi = jQuery('<li/>', {}).appendTo(filterUl);
                        var filterLabel = jQuery('<label/>', {
                            class: 'filter-label'
                        }).appendTo(filterLi);
                        var filterCheckbox = jQuery('<input />', {
                            type: 'checkbox',
                            checked: element.checked,
                            value: element.value,
                            disabled: !element.enabled,
                            belongsTo: key
                        }).appendTo(filterLabel);
                        $(filterLabel).append(
                            '<span class="checkmark"></span>'
                        );
                        $(filterLabel).append(
                            '<span class="text">' + element.name + '</span>'
                        );
                    });
                } else {
                    $(filterDiv).attr('id', 'priceFilter');
                    var priceInput = jQuery('<input/>', {
                        class: 'price-range-slider',
                        id: 'priceRangeSlider',
                        name: 'price_range',
                        value: ''
                    }).appendTo(filterDiv);

                    // $("#priceRangeSlider").change(function () {
                    //     $("#priceInfo").find('.low').text($(this).attr('min'));
                    //     $("#priceInfo").find('.high').text($(this).val());
                    // });

                    $priceRangeSlider = $('#priceRangeSlider');

                    $priceRangeSlider.ionRangeSlider({
                        skin: 'sharp',
                        type: 'double',
                        min: data.min ? data.min : 0,
                        max: data.max ? data.max : 10000,
                        from: data.from ? data.from : data.min,
                        to: data.to ? data.to : data.max,
                        prefix: '$',
                        prettify_separator: ',',
                        onStart: function(data) {
                            // fired then range slider is ready
                        },
                        onChange: function(data) {
                            // fired on every range slider update
                        },
                        onFinish: function(data) {
                            // fired on pointer release

                            var $inp = $('#priceRangeSlider');
                            price_from = $inp.data('from'); // reading input data-from attribute
                            price_to = $inp.data('to'); // reading input data-to attribute

                            // console.log(price_from, price_to);
                            iPageNo = 0;
                            updateFilters();
                            fetchProducts(true);
                        },
                        onUpdate: function(data) {
                            // fired on changing slider with Update method
                        }
                    });
                }

                if (index == Object.keys(filterData).length - 1) {
                    $(filterDiv).append('<hr/>');
                }
            });

            // $(filterDiv).append('<hr/>');
            $('#filters').append(
                '<a class="btn clearall-filter-btn" href="#" id="clearAllFiltersBtn">Clear All</a>'
            );

            $('#filters').append('<hr/>');
        } else {
            Object.keys(filterData).forEach((key, index) => {
                const data = filterData[key];
                if (key != 'price') {
                    data.forEach(element => {
                        $(
                            'input[type="checkbox"][value=' +
                                element.value +
                                ']'
                        ).attr('checked', element.checked);
                        $(
                            'input[type="checkbox"][value=' +
                                element.value +
                                ']'
                        ).attr('disabled', !element.enabled);
                    });
                } else {
                    var instance = $('#priceRangeSlider').data(
                        'ionRangeSlider'
                    );
                    instance.update({
                        from: data.from ? data.from : data.min,
                        to: data.to ? data.to : data.max,
                        min: data.min,
                        max: data.max
                    });
                }
            });
        }
    }

    fetchProducts(false);

    function scrollToAnchor() {
        var aTag = $("a[href='#page" + iPageNo + "']");
        iPageNo == 1
            ? $('html,body').scrollTop(0)
            : $('html,body').scrollTop(aTag.position().top);
    }

    $('body').on('click', '.clear-filter', function() {
        iPageNo = 0;

        var $filter = $(this).closest('.filter');
        if ($filter.attr('id') === 'priceFilter') {
            var $inp = $(this);
            price_from = $inp.data('from');
            price_to = $inp.data('to');
        } else {
            $filter.find('input[type="checkbox"]').each(function() {
                if (this.checked) {
                    this.checked = false;
                }
            });
        }

        updateFilters();
        fetchProducts(true);
    });
    // var instance = $('#priceRangeSlider').data("ionRangeSlider");
    // $('body').on("mouseup", instance, function () {
    //     var $inp = $(this);
    //     price_from = $inp.data("from"); // reading input data-from attribute
    //     price_to = $inp.data("to"); // reading input data-to attribute

    //     console.log(price_from, price_to);
    //     updateFilters();
    //     fetchProducts(true);
    // });

    $('body').on('click', '#clearAllFiltersBtn', function() {
        iPageNo = 0;

        strFilters = '';
        $('.filter').each(function() {
            if ($(this).attr('id') === 'priceFilter') {
                var $inp = $(this);
                price_from = $inp.data('from');
                price_to = $inp.data('to');
            } else {
                $(this)
                    .find('input[type="checkbox"]')
                    .each(function() {
                        if (this.checked) {
                            this.checked = false;
                        }
                    });
            }
        });
        fetchProducts(true);
    });

    /***************Implementation of filter changes **************/
    $('body').on('change', '.filter input[type="checkbox"]', function() {
        iPageNo = 0;
        updateFilters();
        fetchProducts(true);
    });

    $(document).on('select-value-changed', function() {
        strSortType = $('#selectbox-sort').attr('active');
        iPageNo = 0;
        updateFilters();
        fetchProducts(true);
    });

    function updateFilters() {
        strFilters = '';
        $('.filter').each(function() {
            if ($(this).attr('id') === 'priceFilter') {
                if (price_from) {
                    strFilters += 'price_from:' + price_from + ';';
                }
                if (price_to) {
                    strFilters += 'price_to:' + price_to + ';';
                }
            } else {
                var currFilter = $(this).attr('data-filter');
                strFilters += currFilter + ':';
                var bFirstChecked = false;
                $(this)
                    .find('input[type="checkbox"]')
                    .each(function(idx) {
                        if (this.checked) {
                            var delim;
                            if (!bFirstChecked) {
                                delim = '';
                                bFirstChecked = true;
                            } else {
                                delim = ',';
                            }
                            strFilters += delim + $(this).attr('value');
                        }
                    });
                strFilters += ';';
            }
        });

        //  window.location.search = strFilters;
    }

    $('body').on('mouseover', '.slick-slide', function() {
        $(this)
            .closest('.ls-product-div')
            .find('.variation-img')
            .attr(
                'src',
                $(this)
                    .find('.carousel-img')
                    .attr('data-prodimg')
            );
        $(this)
            .closest('.ls-product-div')
            .find('.prod-img')
            .css('visibility', 'hidden');
        $(this)
            .closest('.ls-product-div')
            .find('.variation-img')
            .show();
    });

    $('body').on('mouseleave', '.slick-slide', function() {
        $(this)
            .closest('.ls-product-div')
            .find('.variation-img')
            .hide();
        $(this)
            .closest('.ls-product-div')
            .find('.prod-img')
            .css('visibility', 'unset');
    });

    $('body').on('click', '.dropdown-submenu a', function(e) {
        if (isMobile()) {
            console.log('clicked');
            // early return if the parent has no hover-class
            if (!$(this).hasClass('hover')) return;

            // prevent click when delay is too small
            var delay = Date.now() - $(this).data('hovered');
            if (delay < 100) e.preventDefault();
        }
    });

    $('body').on('mouseover', '.dropdown-submenu a', function(e) {
        if (isMobile()) {
            var time = Date.now();
            $(this).data('hovered', time);
        }
    });

    $('body').on('click', '.wishlist-icon:not(.nav-link)', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($('#isLoggedIn').val() == 0) {
            $('#modalLoginForm').modal();
        } else {
            var iSku = $(this).attr('sku');
            callWishlistAPI($(this));
        }
    });
    function callWishlistAPI($elm) {
        var strApiToCall = '';
        if (!$elm.hasClass('marked')) {
            strApiToCall = FAV_MARK_API + $elm.attr('sku');
        } else {
            strApiToCall = FAV_UNMARK_API + $elm.attr('sku');
        }
        $.ajax({
            type: 'GET',
            url: strApiToCall,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (!$elm.hasClass('marked')) {
                    $elm.addClass('marked');
                } else {
                    $elm.removeClass('marked');
                }
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
            }
        });
    }
});
