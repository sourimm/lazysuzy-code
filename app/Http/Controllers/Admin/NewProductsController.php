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
    private $table_site_map = array(
        'cb2_products_new_new'     => 'cb2',
        'nw_products_API'          => 'nw',
        'pier1_products'           => 'pier1',
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
     * @return Json
     */
    public function get_new_products_list(Request $request, $limit = 10)
    {
        $new_products = NewProduct::where('status', 'new')
            ->orderBy('created_date', 'asc')
            ->paginate($limit);
        $count = NewProduct::where('status', 'noaction')->count();
        $new_products->product_to_review = $count;
        // dd($new_products);
        return response()->json([
            'status' => 'success',
            'data' => $new_products,
        ]);
    }

    /**
     * Not being used right now
     * @deprecated
     * @param Request $request
     * @return response JSON
     */
    public function get_next_new_product(Request $request)
    {
        $new_products = NewProduct::where('status', 'noaction')
            ->orderBy('created_date', 'asc')
            ->paginate(25);
        $count = NewProduct::where('status', 'noaction')->count();
        $new_products->product_to_review = $count;
        return response()->json([
            'status' => 'success',
            'data' => $new_products,
        ]);
    }

    public function update_multiple_new_product(Request $request)
    {
        //convert products recieved by default as associative arrays to Collection
        $products = collect(json_decode(json_encode($request->get('products'))));
        $products = $products->map(function ($product) {
            $product->color = implode(',', $product->color);
            unset($product->colors);
            return $product;
        });
        $accepted_products = $products->filter(function ($product) {
            return $product->status === 'approved' ? true : false;
        });
        $rejected_products = $products->filter(function ($product) {
            return $product->status === 'rejected' ? true : false;
        });

        DB::beginTransaction();
        try {
            $inventory_products = [];
            if ($rejected_products->count() > 0) {
                $newProducts = NewProduct::whereIn('id', $rejected_products->pluck('id'))->update([
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
    public function getInventoryProducts($products)
    {
        $inv_products = [];
        $products = $products->groupBy('site_name');
        foreach ($products as $key => $value) {
            $table = array_search($key, $this->table_site_map);
            foreach ($value as $product) {
                $row = DB::table($table)->where('product_sku', $product->product_sku)->first();
                if ($key == 'nw') {
                    $shipping_code = $this->get_nw_ship_code($row->shipping_code);
                    $inv_products[] = [
                        'product_sku' => $row->product_sku,
                        'quantity' => 1000,
                        'price' => $row->price,
                        'was_price' => $row->was_price,
                        'ship_code' => $shipping_code,
                        'ship_custom' => $shipping_code == 'SCNW' ? $row->shipping_code : NULL
                    ];
                } else {
                    $shipping_code = $this->code_map[$row->shipping_code] . strtoupper($key);
                    $inv_products[] = [
                        'product_sku' => $row->product_sku,
                        'quantity' => 1000,
                        'price' => $row->price,
                        'was_price' => $row->was_price,
                        'ship_code'
                        => $shipping_code
                    ];
                }
            }
        }
        return $inv_products;
    }
}
