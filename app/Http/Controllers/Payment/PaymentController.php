<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payments\Payment;

class PaymentController extends Controller 
{
    public static function charge_client() {
        return Payment::charge();
    }
}