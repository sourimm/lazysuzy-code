<?php

    return [
        'variations' => [
            'westelm' => [
                'table' => 'westelm_products_skus',
                'name' => 'name',
                'image' => 'image_path',
                'sku' => 'sku'
            ],
            'cab' => [
                'table' => 'crateandbarrel_products_variations',
                'name' => 'variation_name',
                'image' => 'swatch_image',
                'sku' => 'variation_sku'
            ],
            'cb2' => [
                'table' => 'cb2_product_variations',
                'name' => 'variation_name',
                'image' => 'variation_image',
                'sku' => 'variation_sku'
            ],
            'pier1' => [
                'table' => 'pier1_products',
                'name' => 'product_name',
                'image' => 'main_product_images',
                'sku' => 'product_sku'
            ],
            'nw' => [   
                'table' => 'nw_products_API',
                'name' => 'product_name',
                'image' => 'main_product_images',
                'sku' => 'product_sku'
            ]
        ]
    ];