$(document).ready(function () {
    const PDP_API = '/api' + window.location.pathname;

    $.ajax({
        type: "GET",
        url: PDP_API,
        dataType: "json",
        success: function (data) {
            console.log(data);
            $product = $('#detailPage');

            $imagesContainer = $product.find('.-images-container');
            $images = $imagesContainer.find('.-images');
            var imgContainerWidth = 0;
            data.images.forEach(img => {

                var responsiveImg = jQuery('<img/>', {
                    class: '-prod-img img-fluid',
                    src: img,
                    alt: 'product image'
                }).appendTo($images);
            });

            //Product description
            $desc = $product.find('.prod-desc');
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

            $prodPriceCard = $product.find('.prod-price-card');
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