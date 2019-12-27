import Handlebars from '../components/handlebar';
import ListingFactory from '../components/listingFactory';
// import strItemsNumClass from '../pages/listing';
// import * as priceSliderContainer from '../pages/listing';

$(document).ready(function() {
    const LISTING_API_PATH =
        window.GLOBAL_LISTING_API_PATH || '/api' + location.pathname;

    var source = document.getElementById('listing-template').innerHTML;
    var filterSource = document.getElementById('desktop-filter-template')
        .innerHTML;
    var desktopListingTemplate = Handlebars.compile(source);
    var desktopFilterTemplate = Handlebars.compile(filterSource);

    const listingFactory = new ListingFactory(
        LISTING_API_PATH,
        {},
        {},
        desktopListingTemplate,
        desktopFilterTemplate
    );

    $(window).scroll(function() {
        if (!listingFactory.bNoMoreProductsToShow) {
            if ($('#loaderImg') && isScrolledIntoView($('#loaderImg')[0])) {
                listingFactory.fetchProducts(false);
            } else if ($('#loaderImg') === null) {
                listingFactory.fetchProducts(false);
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

<<<<<<< HEAD
    listingFactory.fetchProducts(false);
=======
    function isFilterApplied(filter, filterItems) {
        return filter === 'price'
            ? Math.round(filterItems.from) !== Math.round(filterItems.min) ||
                  Math.round(filterItems.to) !== Math.round(filterItems.max)
            : filterItems.filter(filterItem => filterItem.checked).length > 0;
    }

    function fetchProducts(bClearPrevProducts) {
        bFetchingProducts = true;
        var strLimit = iLimit === undefined ? '' : '&limit=' + iLimit;
        var filterQuery = `?filters=${strFilters}&sort_type=${strSortType}&pageno=${iPageNo}${strLimit}`;
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
        $('#noProductsText').hide();

        if (
            iPageNo > 0 &&
            !$('#productsContainerDiv')
                .html()
                .trim()
        ) {
            var apiCall = [];
            for (var i = 0; i <= iPageNo; i++) {
                var filterQuery = `?filters=${strFilters}&sort_type=${strSortType}&pageno=${i}${strLimit}`;
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
        window.listingApiRendering = function(data) {
            bFetchingProducts = false;
            if (bClearPrevProducts) {
                $('#productsContainerDiv').empty();
                totalResults = 0;
            }
            //$('#loaderImg').hide();
            if (data == null) {
                return;
            }
            if (data.products && data.products.length) {
                bNoMoreProductsToShow = true;

                totalResults = data.total;
                $('#totalResults').text(totalResults);

                var anchor = $('<a/>', {
                    href: '#page' + iPageNo,
                    id: '#anchor-page' + iPageNo
                }).appendTo('#productsContainerDiv');

                for (var product of data.products) {
                    if (
                        product.reviews != null &&
                        parseInt(product.reviews) != 0
                    ) {
                        product.reviewExist = true;
                        product.ratingClass = `rating-${parseFloat(
                            product.rating
                        )
                            .toFixed(1)
                            .toString()
                            .replace('.', '_')}`;
                    }
                    product.variations = product.variations.map(variation => {
                        variation.swatch_image =
                            variation.swatch_image || variation.swatch || '';
                        return variation;
                    });
                    product.showMoreVariations = product.variations.length > 6;
                    $('#productsContainerDiv').append(listingTemplate(product));
                }

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
        };
    }

    function createUpdateFilterData(filterData) {
        bNoMoreProductsToShow = false;
        // if (!bFiltersCreated) {
        bFiltersCreated = true;
        $('#desktop-filters').empty();
        for (var filter in filterData) {
            const filterItems = filterData[filter];
            if (filterItems) {
                (filter === 'price' ||
                    (filterItems.length &&
                        filterItems.filter(item => item.enabled).length)) &&
                    $('#desktop-filters').append(
                        desktopFilterTemplate({
                            name: filter,
                            list: filterItems,
                            isPrice: filter === 'price',
                            isApplied: isFilterApplied(filter, filterItems)
                        })
                    );
                $priceRangeSlider = $('#priceRangeSlider');
                const data = filterData[filter];
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
                        iPageNo = 0;
                        updateFilters();
                        fetchProducts(true);
                    },
                    onUpdate: function(data) {
                        // fired on changing slider with Update method
                    }
                });
            }
        }

        if (!isMobile()) {
            $('#desktop-filters').append(
                '<a class="clearall-filter-btn" href="#" id="clearAllFiltersBtn">Clear All</a>'
            );
        }
        strFilters
            ? $('.clearall-filter-btn').show()
            : $('.clearall-filter-btn').hide();

        // $('#filters').append('<hr/>')
        // } else {
        //     Object.keys(filterData).forEach((key, index) => {
        //         const filterItems = filterData[key];
        //         isFilterApplied(key, filterItems)
        //             ? $(`#${key}Filter`)
        //                   .find('a')
        //                   .addClass('applied')
        //             : $(`#${key}Filter`)
        //                   .find('a')
        //                   .removeClass('applied');

        //         if (key === 'price') {
        //             var instance = $('#priceRangeSlider').data(
        //                 'ionRangeSlider'
        //             );
        //             instance.update({
        //                 from: filterItems.from
        //                     ? filterItems.from
        //                     : filterItems.min,
        //                 to: filterItems.to ? filterItems.to : filterItems.max,
        //                 min: filterItems.min,
        //                 max: filterItems.max
        //             });
        //         }
        //     });
        // }
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
>>>>>>> master

    $('body').on('click', '#clearAllFiltersBtn', function() {
        $('.filter').each(function() {
            if ($(this).attr('id') === 'priceFilter') {
                listingFactory.updateFromToPrice(
                    $(this).data('from'),
                    $(this).data('to')
                );
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
        listingFactory.resetListing();
    });

    /***************Implementation of filter changes **************/
    $('body').on('change', '.filter input[type="checkbox"]', function() {
        listingFactory.resetListing();
    });

    $(document).on('select-value-changed', function() {
        listingFactory.setSortType($('#selectbox-sort').attr('active'));
        listingFactory.resetListing();
    });
    $('input[name="sort-price-filter"]').click(function() {
        listingFactory.setSortType(
            $('input[name="sort-price-filter"]:checked').val()
        );
        listingFactory.resetListing();
        $('#sort-mobile').toggleClass('show');
    });

    $('body').on('mouseover', '.mini-carousel-item', function() {
        $(this)
            .closest('.ls-product-div')
            .find('.variation-img')
            .attr(
                'src',
                $(this)
                    .find('.carousel-img')
                    .attr('data-prodImg')
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

    $('body').on('mouseleave', '.mini-carousel-item', function() {
        $(this)
            .closest('.ls-product-div')
            .find('.variation-img')
            .hide();
        $(this)
            .closest('.ls-product-div')
            .find('.prod-img')
            .css('visibility', 'unset');
    });

    $('body').on('click', '.wishlist-icon:not(.nav-link)', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($('#isLoggedIn').val() == 0) {
            $('#modalSignupForm').modal();
        } else {
            listingFactory.callWishlistAPI($(this));
        }
    });
});
