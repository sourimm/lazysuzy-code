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
                $inventory_products = $this->getInventoryProducts($accepted_products);
                Inventory::insert($inventory_products);

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
