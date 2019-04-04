<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>LazySuzy Homepage</title>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <link href="{{ asset('css/app.css')}}" rel="stylesheet">

</head>

<body>
    <div class="listing">
        @include('navbar')
        @include('./partials/subnav')

        <div class="listing-container container">
            <div class="filters">
                <div class="filter">
                    <span class="filter-header">Brands</span>
                    <label for="" class="clear-filter float-right">Clear</label>
                    <ul>
                        <li>
                            <label class="container">CB2
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="container">Pier
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="container">Pottery Barn
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                    <hr>
                </div>
                <div class="filter">
                    <span class="filter-header">Price</span>
                    <label for="" class="clear-filter float-right">Clear</label>
                    <div class="slider-container">
                        <div class="-info" id="priceInfo">
                            $<span class="low">100</span>
                            <span class="divider">-</span>
                            $<span class="high">1200</span>
                        </div>
                        <input type="range" min="100" max="10000" value="1200" class="slider" id="priceRange">
                    </div>
                    <hr>
                </div>

                <div class="filter">
                    <span class="filter-header">Type</span>
                    <label for="" class="clear-filter float-right">Clear</label>
                    <ul>
                        <li>
                            <label class="container">Armchair
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="container">Armless
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="container">Recliner
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="container">Ottoman
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                    <hr>
                </div>
                <div>
                </div>
            </div>
        </div>
        @include('footer')
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>