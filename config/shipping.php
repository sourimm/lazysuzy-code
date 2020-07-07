<?php

    // C => custom
    // F => free
    // S => standard, we decide this
    // all the other codes, are brand code. They are charged only once per order
    // eg. you have 3 products of pier1 and pier1 shipping cost is 10, then total 
    // shipping cost is 10/-
    return [
        'native_shipping_codes' => ['C', 'F', 'S']
    ];