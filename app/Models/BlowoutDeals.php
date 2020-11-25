<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class BlowoutDeals extends Model
{
    protected $table = "lz_blowout_deals";

    public static function get_deals()
    {
        $deals = BlowoutDeals::select(
            Config::get('tables.master_table') . '.product_name',
            Config::get('tables.master_table') . '.rating',
            DB::raw("CONCAT('" . env('APP_URL') . "', " . Config::get('tables.master_table') . '.main_product_images' . ") AS image"),
            DB::raw('NOW() as now'),

            Config::get('tables.inventory') . '.price',
            Config::get('tables.inventory') . '.was_price',
            Config::get('tables.inventory') . '.quantity',

            Config::get('tables.master_brands') . '.name as brand',

            Config::get('tables.blowout_deals') . '.product_sku',
            Config::get('tables.blowout_deals') . '.parent_sku',
            Config::get('tables.blowout_deals') . '.start_time',
            Config::get('tables.blowout_deals') . '.end_time'

        )->join(
            Config::get('tables.inventory'),
            Config::get('tables.inventory') . '.product_sku',
            "=",
            Config::get('tables.blowout_deals') . '.product_sku'
        )->join(
            Config::get('tables.master_table'),
            Config::get('tables.master_table') . '.product_sku',
            "=",
            Config::get('tables.blowout_deals') . '.product_sku'
        )->join(
            Config::get('tables.master_brands'),
            Config::get('tables.master_table') . '.brand',
            "=",
            Config::get('tables.master_brands') . '.value'
        )
            //->where(DB::raw(Config::get('tables.blowout_deals') . '.parent_sku', Config::get('tables.inventory') . '.parent_sku'))
            ->where(Config::get('tables.blowout_deals') . '.is_active', '1')
            ->orderBy(Config::get('tables.blowout_deals') . '.end_time', 'asc');

        //echo Utility::get_sql_raw($deals);
        $blowout_deals = [];
        $deals = $deals->get();
        foreach ($deals as &$deal) {
            $deal['status'] = self::get_status($deal);
            $deal['time'] = self::get_time_remaining($deal, $deal['status']);
            $deal['total_quantity'] = 100;
        }

        return $deals;
    }

    private static function get_time_remaining($deal, $status)
    {

        $start_time = strtotime($deal->start_time);
        $end_time = strtotime($deal->end_time);
        $now = strtotime($deal->now);

        if ($status == Config::get('meta.DEAL_ONGOING'))
            return $end_time - $now;
        else if ($status == Config::get('meta.DEAL_EXPIRED'))
            return 0;

        return $start_time - time();
    }

    private static function get_status($deal)
    {
        $quantity = $deal->quantity;
        $start_time = strtotime($deal->start_time);
        $end_time = strtotime($deal->end_time);
        $now = strtotime($deal->now);

        if ($quantity == 0 || $now >= $end_time)
            return Config::get('meta.DEAL_EXPIRED');


        if ($now >= $start_time && $now < $end_time)
            return Config::get('meta.DEAL_ONGOING');

        return Config::get('meta.DEAL_INQUEUE');
    }
}
