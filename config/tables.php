<?php

    return [
        'variations' => [
            'westelm' => [
                'table' => 'westelm_products_skus',
                'name' => 'name',
                'image' => 'image_path',
                'sku' => 'sku',
                'parent_sku' => 'product_id'
            ],
            'cab' => [
                'table' => 'crateandbarrel_products_variations',
                'name' => 'variation_name',
                'image' => 'swatch_image',
                'sku' => 'variation_sku',
                'parent_sku' => 'product_sku'
            ],
            'cb2' => [
                'table' => 'cb2_products_variations',
                'name' => 'variation_name',
                'image' => 'variation_image',
                'sku' => 'variation_sku',
                'parent_sku' => 'product_sku'
            ],
            'pier1' => [
                'table' => 'pier1_products',
                'name' => 'product_name',
                'image' => 'main_product_images',
                'sku' => 'product_sku',
                'parent_sku' => 'product_sku'
            ],
            'nw' => [   
                'table' => 'nw_products_API',
                'name' => 'product_name',
                'image' => 'main_product_images',
                'sku' => 'product_sku',
                'parent_sku' => 'product_sku'
            ]
        ],

        'LS_ID_mapping' => 'mapping_core',
        'master_table' => 'master_data'
            
    ];