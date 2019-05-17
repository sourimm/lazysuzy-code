import * as multiCarouselFuncs from '../components/multi-carousel';

$(document).ready(function () {
    const LISTING_API_PATH = '/api'+location.pathname;
    const LISTING_FILTER_API_PATH = '/api/filter/products';
    function fetchProducts(listingApiPath) {
        
        $.ajax({
            type: "GET",
            url: listingApiPath,
            dataType: "json",
            success: function (data) {
                $('#productsContainerDiv').empty();
                if( data.total != undefined ){
                    for( var i=0 ; i<data.total; i++){
                        createProductDiv(data.productData[i]);
                    }
                    multiCarouselFuncs.makeMultiCarousel();
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
            }
        });
    }

    function createProductDiv(productDetails){
        //Make product main div
        var mainProductDiv = jQuery('<div/>', {
            id: productDetails.id,
            sku: productDetails.sku,
            site: productDetails.site,
            class: 'ls-product-div col-md-3 item-3'
        }).appendTo('#productsContainerDiv');
        
        var productLink = jQuery('<a/>',{
            href: productDetails.product_url
        }).appendTo(mainProductDiv);

        var product = jQuery('<div/>', {
            class: 'ls-product'
        }).appendTo(productLink);

        jQuery('<img />',{
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
        $(currPrice).text(productDetails.is_price);
        var oldPrice = jQuery('<span/>', {
            class: '-oldprice',
        }).appendTo(prices);
        $(oldPrice).text(productDetails.was_price);

        $(product).append('<div class="wishlist-icon"><i class="far fa-heart -icon"></i></div>');

        var productInfoNext = jQuery('<div/>', {
            class: 'd-none d-md-block',
        }).appendTo(mainProductDiv);
        $(productInfoNext).append('<div class="-name">'+productDetails.name+'</div>');

        var carouselMainDiv = jQuery('<div/>', {
            class: 'responsive',
        }).appendTo(productInfoNext);

        productDetails.images.forEach(img => {
            var responsiveImgDiv = jQuery('<div/>', {
                class: 'mini-carousel-item',
            }).appendTo(carouselMainDiv);
            var responsiveImg =jQuery('<img/>', {
                class: 'carousel-img img-fluid',
                src: img
            }).appendTo(responsiveImgDiv);
            
        });

        var ratingValue = parseFloat(productDetails.rating).toFixed(1);
        var ratingClass = ratingValue.toString().replace('.',"_");
        $(productInfoNext).append('<div class="rating-container"><div class="rating  rating-'+ratingClass+'"></div><span class="total-ratings">'+ratingValue+'</span></div>');

    }

    fetchProducts(LISTING_API_PATH);

    $('body').on('click', '.filter input[type="checkbox"]', function() {
        // do something
        var params = '';

        fetchProducts(LISTING_FILTER_API_PATH);
    });
});