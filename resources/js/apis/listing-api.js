import * as multiCarouselFuncs from '../components/multi-carousel';

$(document).ready(function () {
    const LISTING_API_PATH = '/api' + location.pathname;
    const LISTING_FILTER_API_PATH = '/api/filter/products';
    var totalResults = 0;
    var UrlSearchParams = new URLSearchParams();
    var objGlobalFilterData;

    $(window).scroll(function () {
        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();

        if (position == bottom) {
            fetchProducts(LISTING_API_PATH, {}, false);
        }
    });

    function fetchProducts(listingApiPath, dataToSend, bClearPrevProducts) {
        $('#loaderImg').show();
        $.ajax({
            type: "GET",
            url: listingApiPath,
            dataType: "json",
            data: dataToSend,
            success: function (data) {
                if (bClearPrevProducts) { 
                    $('#productsContainerDiv').empty() 
                    totalResults = 0;
                };
                $('#loaderImg').hide();
                if (data.total != undefined) {
                    totalResults += data.total;
                    $('#totalResults').text(totalResults);

                    for (var i = 0; i < data.total; i++) {
                        createProductDiv(data.productData[i]);
                    }
                    multiCarouselFuncs.makeMultiCarousel();
                }
                if (data.filterData) {
                    objGlobalFilterData = data.filterData;
                    createUpdateFilterData(data.filterData);
                }

            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
            }
        });
    }

    function createProductDiv(productDetails) {
        //Make product main div
        var mainProductDiv = jQuery('<div/>', {
            id: productDetails.id,
            sku: productDetails.sku,
            site: productDetails.site,
            class: 'ls-product-div col-md-3 item-3'
        }).appendTo('#productsContainerDiv');

        var productLink = jQuery('<a/>', {
            href: productDetails.product_url
        }).appendTo(mainProductDiv);

        var product = jQuery('<div/>', {
            class: 'ls-product'
        }).appendTo(productLink);

        jQuery('<img />', {
            class: 'img-fluid',
            src: productDetails.main_image,
            alt: productDetails.name
        }).appendTo(product);

        //Product information
        var prodInfo = jQuery('<div/>', {
            class: 'prod-info'
        }).appendTo(product);
        var catDetails = jQuery('<span/>', {
            class: '-cat-name',
        }).appendTo(prodInfo);
        $(catDetails).text(productDetails.site)
        var prices = jQuery('<span/>', {
            class: '-prices float-right',
        }).appendTo(prodInfo);
        var currPrice = jQuery('<span/>', {
            class: '-cprice',
        }).appendTo(prices);
        $(currPrice).text('$' + productDetails.is_price);
        if (productDetails.is_price < productDetails.was_price) {
            var oldPrice = jQuery('<span/>', {
                class: '-oldprice',
            }).appendTo(prices);
            $(oldPrice).text('$' + productDetails.was_price);
        }

        $(product).append('<div class="wishlist-icon"><i class="far fa-heart -icon"></i></div>');

        var productInfoNext = jQuery('<div/>', {
            class: 'd-none d-md-block',
        }).appendTo(mainProductDiv);
        $(productInfoNext).append('<div class="-name">' + productDetails.name + '</div>');

        var carouselMainDiv = jQuery('<div/>', {
            class: 'responsive',
        }).appendTo(productInfoNext);

        productDetails.images.forEach(img => {
            var responsiveImgDiv = jQuery('<div/>', {
                class: 'mini-carousel-item',
            }).appendTo(carouselMainDiv);
            var responsiveImg = jQuery('<img/>', {
                class: 'carousel-img img-fluid',
                src: img
            }).appendTo(responsiveImgDiv);

        });

        var ratingValue = parseFloat(productDetails.rating).toFixed(1);
        var ratingClass = ratingValue.toString().replace('.', "_");
        $(productInfoNext).append('<div class="rating-container"><div class="rating  rating-' + ratingClass + '"></div><span class="total-ratings">' + ratingValue + '</span></div>');

    }

    function createUpdateFilterData(filterData) {
        $('#filters').empty();
        Object.keys(filterData.filters).forEach((key, index) => {
            const data = filterData.filters[key];
            var filterDiv = jQuery('<div/>', {
                class: 'filter',
                "data-filter": key
            }).appendTo('#filters');
            $(filterDiv).append('<hr/>');

            $(filterDiv).append('<span class="filter-header">' + key.replace('_', ' ') + '</span>')
            $(filterDiv).append('<label for="' + key + '" class="clear-filter float-right">Clear</label>')

            if (key != "price") {
                var filterUl = jQuery('<ul/>', {
                }).appendTo(filterDiv);
                data.forEach(element => {
                    var filterLi = jQuery('<li/>', {
                    }).appendTo(filterUl);
                    var filterLabel = jQuery('<label/>', {
                        class: 'container'
                    }).appendTo(filterLi);
                    $(filterLabel).text(element.name);
                    var filterCheckbox = jQuery('<input />', {
                        type: "checkbox",
                        checked: element.enabled,
                        value: element.value,
                        belongsTo: key
                    }).appendTo(filterLabel);
                    $(filterLabel).append('<span class="checkmark"></span>')

                });
            }
            else {
                var priceRangeSlider = jQuery('<input/>', {
                    type: "text",
                    class: "price-range-slider",
                    name: "price_range",
                    value: "",
                    "data-from": data.from,
                    "data-to": data.to,
                    "data-min": data.min,
                    "data-max": data.max,
                }).appendTo(filterDiv);
                $(priceRangeSlider).ionRangeSlider({
                    skin: "sharp",
                    type: "double",
                    prefix: "$",
                    prettify_separator: ","
                });
            }
            if (index == Object.keys(filterData.filters).length - 1) {
                $(filterDiv).append('<hr/>');
            }
        });


        // $(filterDiv).append('<hr/>');
        $('#filters').append('<a class="btn clearall-filter-btn" href="#" id="clearAllFiltersBtn">Clear All</a>');

        $('#filters').append('<hr/>');
    }

    fetchProducts(LISTING_API_PATH, {}, false);

    /***************Implementation of filter changes **************/
    // $('body').on('change', '.filter input[type="checkbox"]', function () {
    //     // do something
    //     //var params = '';
    //     delete UrlSearchParams.filter;
    //     const params = UrlSearchParams;
    //     var filtersActive = new Object();

    //     if(this.checked) {
    //         console.log('checked');
    //         var strCurrFilter = $(this).attr('belongsto');
    //         filtersActive[strCurrFilter] = $(this).attr('value');
    //     }

    //     // console.log('crrent: ' + $(this).attr('checked'));
        
    //     Object.keys(objGlobalFilterData.filters).forEach((key, index) => {

    //     }
    //     $('.filter[key='++'] input[type="checkbox"]').each(function () {
    //         if (this.checked) {
    //             filtersActive[strCurrFilter] += $(this).attr('value');
    //         }
    //     });

    //     UrlSearchParams.filter = filtersActive;

    //     fetchProducts(LISTING_API_PATH, UrlSearchParams, true);
    // });
});