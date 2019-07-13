import * as multiCarouselFuncs from '../components/multi-carousel';
import makeSelectBox from '../components/custom-selectbox';
import Drift from 'drift-zoom';

$(document).ready(function () {
    const PDP_API = '/api' + window.location.pathname;
    const VARIATION_API = '/api/variation' + window.location.pathname;
    const $product = $('#detailPage');
    const $prodPriceCard = $product.find('.prod-price-card');
    var $filtersDiv = '';
    var variationDrift = '';
    var variationImgEl = '';

    $.ajax({
        type: "GET",
        url: PDP_API,
        dataType: "json",
        success: function (data) {
            // console.log(data);

            var $imagesContainer = $product.find('.-images-container');
            var $images = $imagesContainer.find('.-images');
            var imgContainerWidth = 0;
            data.images.forEach(img => {
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

            $filtersDiv = jQuery( '<div/>', {
                id: 'filtersDiv'
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
        $.ajax({
            type: "GET",
            url: VARIATION_API,
            data: queryParams,
            dataType: "json",
            success: function (data) {
                console.log(data);

                if( data.variations != null){
                    makeVariationCarousel(data.variations);
                }

                var $prodMainImgDiv = $product.find('.prod-main-img');
                $prodMainImgDiv.empty();
                var carouselMainDiv = jQuery('<img/>', {
                    id: 'variationImg',
                    class: 'zoom-img-variation img-fluid'
                }).appendTo($prodMainImgDiv);
                variationImgEl = document.querySelector('#variationImg');
                variationDrift = new Drift(variationImgEl, {});

                $('.zoom-img').each(function(){
                    var options = { namespace: 'carousel' };
                    new Drift(this, options);
                })
                $filtersDiv.empty();

                if( data.filters != null ){
                    Object.keys(data.filters).forEach(function (filter) {
                        // data.filters.filter.forEach(options => {
                            var $filterLabel = jQuery( '<label/>', {
                                text: filter + ':',
                                for: 'selectbox-attr-'+filter,
                                class: 'select-label',
                                value: filter
                            }).appendTo($filtersDiv);
                            var $filterSelectBox = jQuery( '<select/>', {
                                class: 'form-control',
                                id: 'attr-'+filter
                            }).appendTo($filtersDiv);
                            data.filters[filter].forEach(element => {
                                var attrElm = jQuery('<option />', {
                                    value: element.value,
                                    selected: element.enabled,
                                    text: element.name
                                }).appendTo($filterSelectBox);
                            });
                        // });
                    });

                    makeSelectBox();
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
            }
        });        
    }

    function makeVariationCarousel(variationData){


        var variationImages = variationData.map(variation => variation.image);
        var variationSwatchImages = variationData.map(variation => variation.swatch_image) || variationImages;
        var variationLinks = variationData.map(variation => variation.link);

        var $variationsCarousel = $product.find('.-variations-carousel');
        var carouselMainDiv = jQuery('<div/>', {
            class: 'responsive',
        }).appendTo($variationsCarousel);

        variationSwatchImages.forEach((img, idx) => {
            var responsiveImgDiv = jQuery('<div/>', {
                class: 'mini-carousel-item',
            }).appendTo(carouselMainDiv);
            var anchor = jQuery('<a/>', {
                class: 'responsive-img-a',
                "data-image": variationImages[idx] ? variationImages[idx] : ''
            }).appendTo(responsiveImgDiv);
            var responsiveImg = jQuery('<img/>', {
                class: 'zoom-img carousel-img img-fluid',
                src: img,
                "data-zoom" : img
            }).appendTo(anchor);

        });
        multiCarouselFuncs.makeMultiCarousel(10,10);
    }

    $(document).on('select-value-changed', function () {
        onFilterChange();
    });

    $('body').on('click', '.responsive-img-a', function(){
        $('#variationImg').attr('src', $(this).attr("data-image"));
        
       var triggerEl = document.querySelector('#variationImg');
       variationDrift.setZoomImageURL($(this).attr("data-image"));
       triggerEl.setAttribute("data-zoom", $(this).attr("data-image"));
    });

    function onFilterChange(){
        var oQueryParams = new Object();
        $('.select-styled').each(function () {
            var strLabelText = $filtersDiv.find('label[for="'+$(this).attr('id')+'"]').attr('value');
            var currFilter = $(this).attr('active');
            oQueryParams[strLabelText] = currFilter;
        });
        fetchVariations(oQueryParams);
    }
});