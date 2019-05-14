$(document).ready(function () {
    const LISTING_API_PATH = '/api'+location.pathname;
    function fetchProducts() {
        
        $.ajax({
            type: "GET",
            url: LISTING_API_PATH,
            dataType: "json",
            success: function (data) {
                if( data.total != undefined ){
                    for( i=0 ; i<data.total; i++){
                        createProductDiv(data.productData[i]);
                    }
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
            src: productDetails.images[0],
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

        var ratingClass = parseFloat(productDetails.rating).toFixed(1).toString().replace('.',"_");
        $(productInfoNext).append('<div class="rating-container"><div class="rating  rating-'+ratingClass+'"></div><span class="total-ratings">'+productDetails.rating+'</span></div>');


        //************TBD when API is updated as per requirements.**********/

        // console.log(productDetails.images);
        // productDetails.images.forEach(element => {
        //     $(carouselMainDiv).append('<div class="mini-carousel-item"><img class="carousel-img img-fluid" src='+element+'></div>');
            
        // });

    }

    fetchProducts();
});