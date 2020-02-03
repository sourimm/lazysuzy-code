<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variations;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Brands;
use Illuminate\Support\Facades\DB;

use Auth;



class Subscribe extends Controller
{

    public function subscribe_user() {

        if (isset($_GET['email']) && isset($_GET['url'])) {
            $url = $_GET['url'];
            $url_arr = explode("?", $url);
            $base_url = $url_arr[0];
            $filter_url = $url_arr[1];

            $data = [
                'email' => $_GET['email'],
                'base_url' => $base_url,
                'filter_data' => $filter_url
            ];

            DB::table('user_subscriptions')->insert($data);
            return;
        }
    }
}