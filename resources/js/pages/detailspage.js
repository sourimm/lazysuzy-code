import * as multiCarouselFuncs from '../components/multi-carousel';
import makeSelectBox from '../components/custom-selectbox';
import Drift from 'drift-zoom';
import isMobile from '../app.js'

$(document).ready(function () {
    const PDP_API = '/api' + window.location.pathname;
    const VARIATION_API = '/api/variation' + window.location.pathname;
    const SWATCH_API = '/api/filters/variation' + window.location.pathname;
    const $product = $('#detailPage');
    const $prodPriceCard = $product.find('.prod-price-card');
    var $filtersDiv = '';
    var $filtersDivMobile = '';
    var variationDrift = '';
    var variationImgEl = '';
    var arrFilters = [];

    $.ajax({
        type: "GET",
        url: PDP_API,
        dataType: "json",
        success: function (data) {
            var $imagesContainer = $product.find('.-images-container');
            var $images = $imagesContainer.find('.-images');
            var imgContainerWidth = 0;
            data.on_server_images.forEach(img => {
                var responsiveImg = jQuery('<img/>', {
                    class: '-prod-img img-fluid',
                    src: img,
                    alt: 'product image'
                }).appendTo($images);
            });
            var site = $('<span/>',{
                text: data.site + ' ',
                class: 'float-left text-uppercase'
            }).appendTo($prodPriceCard);
            var price = $('<span/>',{
                text: ' $' + data.is_price.replace('-', ' - $'),
                class: 'float-right'
            }).appendTo($prodPriceCard);
            $('<div />',{
                class: 'clearfix'
            }).appendTo($prodPriceCard);
            var buyBtn = $('<a/>',{
                class: 'btn pdp-buy-btn',
                href: data.product_url,
                text: 'Buy'
            }).appendTo($prodPriceCard);

            $filtersDivMobile = jQuery( '<div/>', {
                id: 'filtersDivMobile',
                class: 'filters filters-mobile'
            }).insertBefore($imagesContainer);

            $filtersDiv = jQuery( '<div/>', {
                id: 'filtersDiv',
                class: 'filters'
            }).appendTo($prodPriceCard);

            if( data.variations != null){
                makeVariationCarousel(data.variations);
            }
            else{
                fetchVariations();
            }

            //Product description
            var $desc = $product.find('.prod-desc');
            $desc.find('.-name').text(data.name);

            var ratingValue = parseFloat(data.rating).toFixed(1);
            var ratingClass = 'rating-' + ratingValue.toString().replace('.', "_");
            $desc.find('.rating').addClass(ratingClass);
            $desc.find('.total-ratings').text(data.reviews);

            $desc.find('.-desc').text(data.description);
            var $featuresList = $desc.find('.-features');
            data.features.forEach(feature => {
                var li = $('<li>',{
                    html: feature
                }).appendTo($featuresList);
            });
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
            console.log(exception);
        }
    });

    function fetchVariations(queryParams = null){
        updateFiltersAndVariations(queryParams, VARIATION_API, true);
    }

    function fetchFilters(queryParams = null){
        updateFiltersAndVariations(queryParams, SWATCH_API, false);
    }

    function makeFilters(data, isMobile){
        var currFilterDiv = isMobile ? $filtersDivMobile : $filtersDiv;
        Object.keys(data.filters).forEach(function (filter) {
            // data.filters.filter.forEach(options => {
                var transformedLabel = data.filters[filter].label.toLowerCase().replace(' ', '_');
                var $singleFilter = jQuery( '<div/>', {
                    class: ( 'single-filter' ) + ( isMobile ? ' text-center' : '' )
                }).appendTo(currFilterDiv);
                var $filterLabel = jQuery( '<label/>', {
                    text: data.filters[filter].label + ':',
                    for: 'selectbox-attr-'+transformedLabel,
                    class: 'select-label',
                    value: data.filters[filter].label
                }).appendTo($singleFilter);
                var $filterSelectBox = jQuery( '<select/>', {
                    class: 'form-control',
                    id: 'attr-'+transformedLabel
                }).appendTo($singleFilter);
                
                var bFilterEnabled = false;
                data.filters[filter].options.forEach((element,idx) => {
                    if( !bFilterEnabled ){ 
                        bFilterEnabled = element.in_request;
                    }
                    var attrElm = jQuery('<option />', {
                        value: element.value,
                        selected: element.in_request,
                        text: element.name
                    }).appendTo($filterSelectBox);
                    if( idx == (data.filters[filter].options.length - 1) ){
                        var attrElm2 = jQuery('<option />', {
                            value: 'unselected-value',
                            selected: !bFilterEnabled,
                            text: 'Please select a value'
                        }).appendTo($filterSelectBox);
                        bFilterEnabled = false;
                    }
                });
            // });
        });
    }

    function updateFiltersAndVariations(queryParams, apiPath, bUpdateVariations = true){
        $.ajax({
            type: "GET",
            url: apiPath,
            data: queryParams,
            dataType: "json",
            success: function (data) {
                console.log(data);
                $filtersDiv.empty();
                $filtersDivMobile.empty();

                if( data.filters != null ){
                    arrFilters = Object.keys(data.filters);
                    makeFilters(data, isMobile());

                    makeSelectBox();
                }

                if( data.variations != null && bUpdateVariations){
                    makeVariationCarousel(data.variations);

                    var $prodMainImgDiv = $product.find('.prod-main-img');
                    $prodMainImgDiv.empty();
                    var carouselMainDiv = jQuery('<img/>', {
                        id: 'variationImg',
                        class: 'zoom-img-variation img-fluid',
                    }).appendTo($prodMainImgDiv);
                    variationImgEl = document.querySelector('#variationImg');
                    variationDrift = new Drift(variationImgEl, {});
                }

                $('.zoom-img').each(function(){
                    var options = { namespace: 'carousel' };
                    new Drift(this, options);
                })
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
            }
        });   
    }

    function makeVariationCarousel(variationData){


        var variationImages = variationData.map(variation => variation.image);
        var variationSwatchImages = variationData.map(( variation, idx) => { 
            return variation.swatch_image || variationImages[idx];
        });
        var variationLinks = variationData.map(variation => variation.link);

        var $variationsCarousel = $product.find('.-variations-carousel');
        $variationsCarousel.empty();
        var carouselMainDiv = jQuery('<div/>', {
            class: 'responsive',
        }).appendTo($variationsCarousel);

        variationSwatchImages.forEach((img, idx) => {
            var responsiveImgDiv = jQuery('<div/>', {
                class: 'mini-carousel-item',
            }).appendTo(carouselMainDiv);
            var anchor = jQuery('<a/>', {
                class: 'responsive-img-a',
                "data-image": variationImages[idx] ? variationImages[idx] : '',
            }).appendTo(responsiveImgDiv);
            var responsiveImg = jQuery('<img/>', {
                class: 'zoom-img carousel-img img-fluid',
                src: img,
                "data-zoom" : img
            }).appendTo(anchor);

            arrFilters.forEach(filter => {
                anchor.attr(filter, variationData[idx][filter].value);
            });
        });
        multiCarouselFuncs.makeMultiCarousel(10,10);
    }

    $(document).on('select-value-changed', function (e, changedElm) {
        $('.select-styled').not(changedElm).each(function(){
            if($(this).attr('active') == '' || $(this).attr('active') == 'unselected-value'){
                $(this).attr('active','unselected-value');
            }
        });
        onFilterChange();
    });

    $('body').on('click touchstart', '.responsive-img-a', function(){
        $('#variationImg').attr('src', $(this).attr("data-image"));
        $('.select-styled').each(function(){
            $(this).attr('active','unselected-value');
        });

        if( isMobile() ){
            $("html, body").delay(1000).animate({
                scrollTop: $(this).offset().top - 15 
            }, 1000);
        }
        
       var triggerEl = document.querySelector('#variationImg');
       variationDrift.setZoomImageURL($(this).attr("data-image"));
       triggerEl.setAttribute("data-zoom", $(this).attr("data-image"));

    //    arrFilters.forEach(filter => {
    //        var filterId = 'selectbox-attr-'+filter;
    //        var filterValue = $(this).attr(filter);
    //        var strSelectedValue = $('#'+filterId).next().find('li[rel="'+filterValue+'"]').text();
    //        $('#'+filterId).text(strSelectedValue)
    //        $('#'+filterId).attr('active', filterValue);
    //    });
        onSwatchChange($(this).find('.carousel-img').attr("data-zoom"));
    });

    function onFilterChange(swatchUrl = null){
        var oQueryParams = new Object();
        $('.select-styled').each(function (idx) {
            // var strLabelText = $filtersDiv.find('label[for="'+$(this).attr('id')+'"]').attr('value');
            var currFilter = $(this).attr('active');
            if( currFilter != 'unselected-value'){
                oQueryParams['attribute_'+(idx+1)] = currFilter;
            }
        });
        fetchVariations(oQueryParams);
    }

    function onSwatchChange(swatchUrl){

        var oQueryParams = new Object();
        var arrSwatchUrl = swatchUrl.split('//');
        var arrNewPathname = arrSwatchUrl[1].split('/');
        var newPathname = '';
        for (var i = 1; i < arrNewPathname.length; i++) {
            newPathname += "/";
            newPathname += arrNewPathname[i];
        }
        oQueryParams["swatch"] = decodeURIComponent( newPathname );
        fetchFilters(oQueryParams);
    }

    $('#filterToggleBtn').on('click', function(){
        $('#filtersDivMobile').toggle();
    });
});