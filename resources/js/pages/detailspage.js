import * as multiCarouselFuncs from '../components/multi-carousel';

$(document).ready(function () {
    const PDP_API = '/api' + window.location.pathname;

    $.ajax({
        type: "GET",
        url: PDP_API,
        dataType: "json",
        success: function (data) {
            console.log(data);
            var $product = $('#detailPage');

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

            var variationImages = data.variations.map(variation => variation.image);
            var variationLinks = data.variations.map(variation => variation.link);

            var $variationsCarousel = $product.find('.-variations-carousel');
            var carouselMainDiv = jQuery('<div/>', {
                class: 'responsive',
            }).appendTo($variationsCarousel);

            variationImages.forEach((img, idx) => {
                var responsiveImgDiv = jQuery('<div/>', {
                    class: 'mini-carousel-item',
                }).appendTo(carouselMainDiv);
                var anchor = jQuery('<a/>', {
                    class: 'responsive-img-a',
                    href: variationLinks[idx]
                }).appendTo(responsiveImgDiv);
                var responsiveImg = jQuery('<img/>', {
                    class: 'carousel-img img-fluid',
                    src: img
                }).appendTo(anchor);

            });
            multiCarouselFuncs.makeMultiCarousel();

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

            var $prodPriceCard = $product.find('.prod-price-card');
            var site = $('<span/>',{
                text: data.site,
                class: 'float-left text-uppercase'
            }).appendTo($prodPriceCard);
            var price = $('<span/>',{
                text: '$' +data.is_price,
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
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
            console.log(exception);
        }
    });
});