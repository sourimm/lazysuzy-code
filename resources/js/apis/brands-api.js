$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/products/living/sofa?filters=&sort_type=&pageno=0',
        dataType: 'json',
        success: function(data) {
            productDiv(data)
        },
        error: function(jqXHR, exception) {
            console.log(jqXHR)
            console.log(exception)
        }
    })

    function productDiv(data) {
        data.products.slice(0, 8).map(product => {
            // data.products.map(product => {
            let brands_prod_div = jQuery('<div/>', {
                class: 'brands-prod-div col-3 col-sm-12'
            }).appendTo('#product-div-main')
            let brands_prod = jQuery('<div/>', {
                class: 'brands-product'
            }).appendTo(brands_prod_div)
            let brands_img = jQuery('<img/>', {
                class: 'brands-product-img',
                src: product.main_image
            }).appendTo(brands_prod)
            let prod_info = jQuery('<div/>', {
                class: 'prod-info'
            }).appendTo(brands_prod_div)
            let prod_name = jQuery('<span/>', {
                class: 'float-right',
                html: `${product.name}`
            }).appendTo(prod_info)
            let prod_price = jQuery('<span/>', {
                class: 'float-left',
                html: `$${product.is_price}`
            }).appendTo(prod_info)
        })
    }
})
