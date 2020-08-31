<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StagingProduct;
use Exception;
use Illuminate\Support\Facades\DB;

class StagingDataController extends Controller
{
    /**
     * @written by Jatin
     *
     * Return all Staging Products on which no action has been taken
     * @param Request $request
     * @return Json
     */
    public function get_staging_products_list(Request $request, $limit = 5)
    {
        $staging_products = StagingProduct::where('status', 'noaction')
            ->orderBy('created_date', 'asc')
            ->paginate($limit);
        $count = StagingProduct::where('status', 'noaction')->count();
        $staging_products->product_to_review = $count;
        return response()->json([
            'status' => 'success',
            'data' => $staging_products,
        ]);
    }

    /**
     *
     */
    public function get_staging_product(Request $request, $staging_product_id)
    {
        $staging_product = StagingProduct::findOrFail($staging_product_id);
        return response()->json(['status' => 'success',
            'data' => $staging_product
        ]);
    }

    /**
     *
     * @param Request $request
     * @return response JSON
     */
    public function get_next_staging_product(Request $request)
    {
        $staging_products = StagingProduct::where('status', 'noaction')
            ->orderBy('created_date', 'asc')
            ->paginate(25);
        $count = StagingProduct::where('status', 'noaction')->count();
        $staging_products->product_to_review = $count;
        return response()->json(['status' => 'success',
            'data' => $staging_products,
        ]);
    }


    public function update_staging_product(Request $request, $staging_product_id)
    {
        return response()->json(['status' => 'success',
            'data' => $request->all(),
        ]);
    }
    public function update_multiple_staging_product(Request $request)
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
        $rejected_products = $products->diffKeys($accepted_products);
        DB::beginTransaction();
        try {
            if ($rejected_products->count() > 0) {
                StagingProduct::where('id', $rejected_products->pluck('id'))->update([
                    'status' => 'rejected'
                ]);
            }
            if ($accepted_products->count() > 0) {
                StagingProduct::where('id', $accepted_products->pluck('id'))->update([
                    'status' => 'approved'
                ]);
            }


            foreach ($accepted_products as $product) {
                //   $new_product = Product::create(json_decode(json_encode($product, true), true));
                unset($product->status);
                $new_product = new Product();
                $new_product->fill(json_decode(json_encode($product, true), true));
                $new_product->save();
                // dd($new_product);
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
}
