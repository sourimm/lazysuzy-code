<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>LazySuzy Homepage</title>

    <link href="{{ asset('css/app.css')}}" rel="stylesheet">

</head>

<body>
    <div class="listing">
        @include('navbar')
        @include('./partials/subnav')
        {{--{{ Breadcrumbs::render('products') }}--}}
        <div class="listing-container main-container container">
            <div class="row">
                <div class="filters col-md-2 d-md-block" id="filters">
                    <div class="filter">
                        <hr>
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
                        <!-- <div class="slider-container">
                        <div class="-info" id="priceInfo">
                            $<span class="low">100</span>
                            <span class="divider">-</span>
                            $<span class="high">1200</span>
                        </div>
                        <input type="range" min="100" max="10000" value="1200" class="slider" id="priceRange">
                    </div> -->
                        <input type="text" class="price-range-slider" name="price_range" value="" />
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
                    <a class="btn clearall-filter-btn" href="https://lazysuzy.com/filter/clear_filter/all">Clear All</a>
                    <div>
                    </div>
                </div>
                <div class="listing-top-controls d-block d-md-none">
                    <span class="filter-toggle float-right" id="filterToggleBtn">
                        <i class="fal fa-filter"></i>
                    </span>
                    <span class="view-items-toggle float-right" id="viewItemsBtn">
                        <i class="fab fa-buromobelexperte"></i>
                    </span>
                </div>
                <div class="products-container col-md-10">
                    <div class="float-right d-none d-md-block">
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
                    <div class="ls-prod-container container-fluid" id="productsContainerDiv">
                        <div class="row">
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ls-product-div col-md-3 col-4">
                                <a href="#">
                                    <div class="ls-product">
                                        <img class="img-fluid" src="https://via.placeholder.com/400x533" alt="product img">
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
                                </a>
                                <div class="d-none d-md-block">
                                    <div class="-name">Marlee Cream Club Chair</div>
                                    <div class="responsive">
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=1"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=2"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=3"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=4"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=5"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=6"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=7"></div>
                                        <div class="mini-carousel-item"><img class="carousel-img img-fluid" src="http://placehold.it/30x30?text=8"></div>
                                    </div>
                                    <div class="rating-container">
                                        <div class="rating">
                                        </div>
                                        <span class="total-ratings">312</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        @include('footer')
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>