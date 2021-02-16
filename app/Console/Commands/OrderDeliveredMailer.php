<?php

namespace App\Console\Commands;

use App\Models\Mailer;
use App\Models\Payments\Payment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class OrderDeliveredMailer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'OrderDeliveredMailer:TriggerMail {orderID}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trigger order delivered mail when order status changes to divilered.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // fetch data related to order
        $order_details = Payment::order($this->argument('orderID'));
        $mailer_data = [];
        $mailer_data['products'] = $order_details['cart']['products'];
        $mailer_data['shipping_f_name'] = $order_details['delivery'][0]->shipping_f_Name;
        $mailer_data['shipping_l_name'] = $order_details['delivery'][0]->shipping_l_Name;
        $mailer_data['shipping_addr_line_1'] = $order_details['delivery'][0]->shipping_address_line1;
        $mailer_data['shipping_addr_line_2'] = $order_details['delivery'][0]->shipping_address_line2;
        $mailer_data['shipping_state'] = $order_details['delivery'][0]->shipping_state;
        $mailer_data['shipping_contry'] = $order_details['delivery'][0]->shipping_country;
        $mailer_data['shipping_zipcode'] = $order_details['delivery'][0]->shipping_zipcode;
        $mailer_data['shipping_company'] = $order_details['delivery'][0]->shipping_company_name;
        $mailer_data['order_id'] = $order_details['delivery'][0]->order_id;
        $mailer_data['email'] = $order_details['delivery'][0]->email;
        $mailer_data['name'] =  $mailer_data['shipping_f_name'] . " " . $mailer_data['shipping_l_name'];
        echo json_encode($mailer_data);
        Mailer::send_receipt($mailer_data['email'] , $mailer_data['name'], $mailer_data, env('MAILER_RECEIPT_ORDER_DELIVERED_TEMPLATE_ID'));
    }
}
