<?php

namespace App\Models\Payments;

use Illuminate\Database\Eloquent\Model;
use Stripe;
class Payment extends Model
{
    public static function charge($product_sku) {
        Stripe\Stripe::setApiKey(env('STRIP_SECRET'));

        
        return [
            'status' => 'success',
            'transaction_id' => '3754398urskjbfjb32#$Rsfdiy34fhl'
        ];
    }
}
