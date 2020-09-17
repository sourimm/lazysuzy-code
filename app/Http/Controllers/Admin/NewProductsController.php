<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\NewProduct;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class NewProductsController extends Controller
{
    private $code_map = [
        '100' => 'SV',
        '400' => 'WG',
    ];
    private $inventory_maintained_products = [
        1=>'cb2',
        2=>'nw',
        3=>'cab'
    ];

    private $variation_sku_tables =array (
        'cb2_products_variations'=>'cb2',
        'crateandbarrel_products_variations'=>'cab'
    );

    private $table_site_map = array(
        'cb2_products_new_new'     => 'cb2',
        'nw_products_API'          => 'nw',
        'westelm_products_parents' => 'westelm',
        'crateandbarrel_products'  => 'cab'
        //'floyd_products_parents',
        //'potterybarn_products_parents'
    );

    private function get_nw_ship_code($shipping_code)
    {
        return $shipping_code == 49 ? 'WGNW' : 'SCNW';
    }


    /**
     *
     * Return all new Products on which no action has been taken
     * @param Request $request
     * @return JsonResponse $response
     */
    public function get_new_products_list(Request $request, $limit = 5)
    {
        $new_products = NewProduct::where('status', 'new')
           //  ->where('site_name','cab')
            //  ->where('product_sku', '462352')
            ->orderBy('created_date', 'asc')
            ->paginate($limit);
        // dd($new_products);

        $extra['filters'] = $this->getFilters();
        $extra['mapping_core'] = $this->getMappingCore();

        return response()->json([
            'status' => 'success',
            'data' => $new_products,
            'extra' => $extra,
        ]);
    }
    private function getFilters()
    {
        $filters = DB::table('filters')->get()->groupBy('filter_label');
        return $filters;
    }

    private function getMappingCore(){
        $mapping_core = DB::table('mapping_core')
        ->select('LS_ID', 'dept_name_short', 'cat_name_short', 'cat_sub_name')
        ->get();
        return $mapping_core;
    }
    /**
     * Update Multiple Products.
     * @param Request $request
     * @return JsonResponse $response
     */
    public function update_multiple_new_product(Request $request)
    {
        //convert products recieved by default as associative arrays to Collection

        $products = collect(json_decode(json_encode($request->get('products'))));
        $accepted_products = $products->filter(function ($product) {
            return $product->status === 'approved';
        });
        $rejected_products = $products->filter(function ($product) {
            return $product->status === 'rejected';
        });
        $accepted_products = $accepted_products->map(function ($product) {
           $color = $product->color??[];
           $seating =$product->seating??[];
            $shape = $product->shape ?? [];
            $material = $product->material ?? [];
            $fabric = $product->fabric ?? [];
            $ls_id = $product->ls_id ?? [];
            $mfg_country = $product->mfg_country??[];

            $product->color = implode(',', $color);
            $product->seating = implode(',', $seating);
            $product->shape = implode(',', $shape);
            $product->material = implode(',', $material);
            $product->fabric = implode(',', $fabric);
            $product->ls_id = implode(',', $ls_id);
            $product->mfg_country = implode(',', $mfg_country);

            return $product;
        });
        DB::beginTransaction();
        try {
            $inventory_products = [];
            if ($rejected_products->count() > 0) {
                NewProduct::whereIn('id', $rejected_products->pluck('id'))->update([
                    'status' => 'rejected'
                ]);
            }

            if ($accepted_products->count() > 0) {
                $inventory_products = $this->getInventoryProducts($accepted_products);
                NewProduct::whereIn('id', $accepted_products->pluck('id'))->delete();
                Inventory::insert($inventory_products);
            }
            foreach ($accepted_products as $product) {
                unset($product->status);
                if (!$product->image_xbg_processed) {
                    unset($product->image_xbg_processed);
                }
                if (!$product->manual_adj) {
                    unset($product->manual_adj);
                }
                $new_product = new Product();
                $new_product->fill(json_decode(json_encode($product, true), true));
                $new_product->save();
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage(),
            ], 500);
        }
        DB::commit();
        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Creates a products array fit for insertion in Inventory Table from given products from table master_new
     * @param Illuminate\Support\Collection
     * @return array
     */
    private function getInventoryProducts($products)
    {
        $inv_products = [];
        // get all the product_skus from the Inventory. Reduces the no of queries performed when
        // checking if an product or variation is already in the table
        $inventory_products = DB::table('lz_inventory')->select('product_sku')->get();
        $products = $products->groupBy('site_name');

        foreach ($products as $key => $value) {
            $isInventoryMaintained = array_search($key, $this->inventory_maintained_products);
            if(!$isInventoryMaintained)
            {
                continue;
            }
            $table = array_search($key, $this->table_site_map);
            foreach ($value as $product) {
                $row = DB::table($table)->where('product_sku', $product->product_sku)->first();
                if ($key == 'nw') {
                    $shipping_code = $this->get_nw_ship_code($row->shipping_code);
                    $inv_products[] = [
                        'product_sku' => $product->product_sku,
                        'quantity' => 1000,
                        'price' => $row->price,
                        'was_price' => $row->was_price,
                        'ship_code' => $shipping_code,
                        'brand' => $key,
                        'ship_custom' => $shipping_code == 'SCNW' ? $row->shipping_code : NULL
                    ];
                } else  if($key =='cab'|| $key=='cb2'){
                    $shipping_code = $this->code_map[$row->shipping_code] . strtoupper($key);
                    $inv_products[] = [
                        'product_sku' => $product->product_sku,
                        'quantity' => 1000,
                        'price' => $row->price,
                        'was_price' => $row->was_price,
                        'brand'=> $key,
                        'ship_code'=> $shipping_code
                    ];
                    $variation_table = array_search($key,$this->variation_sku_tables);
                    $variation_skus = DB::table($variation_table)->where([
                        'product_sku'=>$product->product_sku,
                        'has_parent_sku' =>0,
                        'is_active' =>'active'
                    ])->get();
                    if($variation_skus)
                    {
                        foreach($variation_skus as $variation)
                            {
                                $isPresent = $inventory_products->has($variation->variation_sku);
                                if(!$isPresent)
                                {
                                    $inv_products[] = [
                                        'product_sku' => $variation->variation_sku,
                                        'quantity' => 1000,
                                        'price' => $variation->price,
                                        'was_price' => $variation->was_price,
                                        'brand'=> $key,
                                        'ship_code'=> $shipping_code
                                    ];
                                }
                            }
                    }
                }
            }
        }
       // dd($inv_products);
        return $inv_products;
    }

    // private function addVariations($inv_products,$variation_skus)
    // {
    //     foreach($variation_skus as $variation)
    //     {
    //         $inv_products[] = [
    //             'product_sku' => $variation->variation_sku,
    //                     'quantity' => 1000,
    //                     'price' => $variation->price,
    //                     'was_price' => $variation->was_price,
    //                     'brand'=> $key,
    //                     'ship_code'=> $shipping_code
    //         ];
    //     }
    //     return $inv_products;
    // }


}
