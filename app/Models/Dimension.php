<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Dimension extends Model
{
    public static $CLEAN_SYMBOLS = ['.'];
    public static $DIMS = [
        'w' => 'width', 
        'h' => 'height', 
        'd' => 'depth', 
        'l' => 'length', 
        'dia' => 'diameter', 
        'diam' => 'diameter'
    ];

    public static function clean_str($str) {
        return str_replace(Dimension::$CLEAN_SYMBOLS, '', $str);
    }


    public static function format_cb2($str)
    {
        $json_string = $str;
        if ($json_string === "null") return [];
        $dim = json_decode($json_string);
        if (json_last_error()) return [];

        $d_arr = [];
        $i = 1;
        foreach ($dim as $d) {
            if ($d->hasDimensions) {
                $d_arr['dimension_' . $i++] =  $d;
            }
        }

        //return $json_string;
        return $d_arr;
    }

    public static function format_cab($str) {
        return Dimension::format_cb2($str);
    }

    public static function format_pier1($str) {
        
        $str = Dimension::clean_str($str);

        $dim_arr = explode(",", $str);
        $i = 1;
        $dims = [];
        $dim_seq = ['Width', 'Depth', 'Height', 'Diameter'];
        foreach ($dim_arr as $dim) {
            $dim_values = [];
            $d = explode(":", $dim);
            $d_label = isset($d[0]) ? $d[0] : null;
            $d_val = isset($d[1]) ? $d[1] : null;

            if ($d_val == null) $d_val = $d[0];

            $d_val_arr = explode("x", strtolower($d_val));
           
            $x = 0;

            foreach($d_val_arr as $val) {
                
                $val_pair = explode("\"", trim($val));
                if (isset($val_pair[0]) && isset($val_pair[1])) {
                    $val = $val_pair[0];
                    
                    if (isset(Dimension::$DIMS[$val_pair[1]])) { 
                        $label = Dimension::$DIMS[$val_pair[1]]; 
                        $x++; 
                    }
                    else $label = $val_pair[1];

                    if (strlen($val_pair[1]) == 0 || !isset($val_pair[1])) $label = $dim_seq[$x];
                    
                    $dim_values[$label] = $val;
                    $x++;
                }
            }

            if (isset($d[1])) $dim_values['label'] = $d_label;
            $dim_values['filter'] = 1;
            array_push($dims, [
                'dimension_' . $i++ => $dim_values
            ]);
        }

        return $dims;
    }

    public static function format_westelm($str) {
        return Dimension::format_pier1(Dimension::clean_str($str));
    }

}
