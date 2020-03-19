<?php 

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models;


class MailerProducts extends Mailable {
    
    use Queueable, SerializesModels;

    public static function get_mailer_products($user_mail = null) {

        // get_mailer_products will get products from the database
        // for user where E-Mail = $user_mail

        if ($user_mail != null) {
            // real logic goes here
        }
        else {
            // right now mailer is in testing phase
            // so sending on-sale products of LS_ID = 202 as per @Arzan's directions

            $LS_IDs = ["202"];
            $limit = 10;

            $products = DB::table('master_data')
                ->whereRaw('price >  0')
                ->whereRaw('was_price > 0')
                ->whereRaw('LS_ID REGEXP "' . implode("|", $LS_IDs) . '"')
                ->orderBy(DB::raw("`price` / `was_price`"), 'asc')
                ->join("master_brands", "master_data.site_name", "=", "master_brands.value")
                ->limit($limit)
                ->get();
            
            $mailer_products = [];
            foreach($products as $product) {
                $product_details = Product::get_details($product, null, true, false, false, false);
                // make lazysuzy native product URL
                $product_details['local_url'] = env('APP_URL') . '/product/' . $product_details['sku'];
                $mailer_products[] = $product_details;
            }
            
            //return $mailer_products;

            /*
            ====================== MAILER PRODUCTS OBJECT STRUCTURE ===========================
            {
                id: 2,
                sku: "PS71108",
                is_new: false,
                site: "Pier 1",
                name: "Luis Upholstered Build Your Own Outdoor Sectional",
                product_url: "https://www.pier1.com/luis-upholstered-build-your-own-outdoor-sectional/PS71108.html",
                product_detail_url: "https://www.lazysuzy.com/product/PS71108",
                is_price: "49.98-239.98",
                was_price: "499.95-799.95",
                percent_discount: "90.00",
                model_code: "",
                color: "",
                collection: "",
                condition: "Clearance,Indoor/Outdoor",
                main_image: "https://www.lazysuzy.com/Pier-1/pier1_images/PS71108_main.jpg",
                reviews: 1,
                rating: 3,
                wishlisted: false,
                local_url: "https://www.lazysuzy.com/product/PS71108"
            }
            */
            
            echo json_encode($mailer_products);
            //die();
            return $mailer_products;
            
        }
    }

    public function build() {
        $email = "aditya@lazysuzy.com";
        $subject = "Welcome to LazySuzy!";
        $name = "Aditya Saxena";

        return $this->view('pages.productmailer')  
                    ->from($email, $name)
                    ->cc($email, $name)
                    //->replyTo('arzan@lazysuzy.com', $name)
                    ->subject($subject)
                    ->with([
                        'products' => $this->get_mailer_products()
                    ]);
    }
}
