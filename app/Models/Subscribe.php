<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Subscribe extends Model
{

    public static function subscribe_user()
    {

        if (isset($_GET['email']) && isset($_GET['url'])) {

            $rows = DB::table('user_subscriptions')
                ->where('email', $_GET['email'])
                ->get();
            if ($rows->count() !== 0) {
                return [
                    'status' => 'We already have your email. Thanks!'
                ];
            }
            
            $url = $_GET['url'];
            $url_arr = explode("?", $url);
            $base_url = $url_arr[0];
            $filter_url = isset($url_arr[1]) ? $url_arr[1] : "";

            $data = [
                'email' => $_GET['email'],
                'base_url' => $base_url,
                'filter_data' => $filter_url
            ];

            DB::table('user_subscriptions')->insert($data);
            return [
                'status' => 'success'
            ];
        }
    }
}