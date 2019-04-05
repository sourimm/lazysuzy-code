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

        <div class="listing-container container row">
            <div class="filters col-md-2">
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
            <div class="products-container col-md-10">
                <div class="float-right">
                    <div class="sortby">
                        <label for="sort">Sort By</label>
                        <select class="form-control" id="sort">
                            <option>Price : Low to High</option>
                            <option>Price : High to Low</option>
                            <option>Popularity</option>
                            <option selected>Recommended</option>
                        </select>
                    </div>
                    <div class="total-items">1024 Results</div>
                </div>
                <div class="ls-prod-container row">
                    <div class="ls-product-div col-md-3">
                        <div class="ls-product">
                            <a href="#"><img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img"></a>
                            <div class="prod-info">
                                <span class="-cat-name">Some</span>
                                <span class="-prices float-right">
                                    <span class="-cprice">$123</span>
                                    <span class="-oldprice">$222</span>
                                </span>
                            </div>
                            <div class="wishlist-icon">
                                <i class="far fa-heart -icon"></i>
                            </div>
                        </div>
                        <div class="-name">Marlee Cream Club Chair</div>
                    </div>
                </div>
            </div>

        </div>
        @include('footer')
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>