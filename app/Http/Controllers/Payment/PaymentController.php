<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payments\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller 
{
    public static function charge_client(Request $req) {

        return Payment::charge($req);
    }
}