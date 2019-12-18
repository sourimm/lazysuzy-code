@extends('layouts.layout', ['body_class' => 'listing-main-div'])

@section('middle_content')
@include('../partials/subnav')
<div class="listing">
    <div class="listing-container main-container container ">
        <div class="d-none d-md-block">
        </div>
        <div class="row">

            <div class="filters col-md-2 d-md-block filter-close-btn" id="filters">

                <div class="filter">
                    <hr>
                    <span class="filter-header">Brands</span>
                    <label for="" class="clear-filter float-right">Clear</label>
                    <ul>
                        <li>
                            <label class="filter-label">CB2
                                <input type="checkbox" checked="checked" value="cb2">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="filter-label">Pier
                                <input type="checkbox" value="pier1">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="filter-label">Pottery Barn
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
                    <input type="text" class="price-range-slider" id="priceRangeSlider" name="price_range" value="" />
                    <hr>
                </div>
                <div class="filter">
                    <span class="filter-header">Type</span>
                    <label for="" class="clear-filter float-right">Clear</label>
                    <ul>
                        <li>
                            <label class="filter-label">Armchair
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="filter-label">Armless
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="filter-label">Recliner
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li>
                            <label class="filter-label">Ottoman
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                    <hr>
                </div>
                <a class="btn clearall-filter-btn" href="/filter/clear_filter/all">Clear All</a>
            </div>
            <div class="filters col-md-2  d-md-none" id="sort-mobile">
                <div class="mobile-filter-header">
                    <div class="filters-close-btn d-md-none float-left"><i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <span class="filter-title">Sort</span>
                </div>
                <hr>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="price_low_to_high">
                    Price : Low to High</div>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="price_high_to_low">
                    Price : High to Low</div>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="popularity">
                    Popularity </div>



            </div>
            <div class="listing-top-controls d-block d-md-none">
                <!-- <div id="page-navigator" class="page-navigator-mobile"></div> -->
                <div class="filter-toggle-mobile">
                    <span class="filter-toggle" id="filterToggleBtn">
                        <i class="fas fa-filter"></i>
                        Filter
                    </span>
                    <span class="filter-toggle" id="viewItemsBtn">
                        <i class="fab fa-buromobelexperte"></i>
                        Toggle View
                    </span>
                    <span class="filter-toggle" id="selectbox-sortmobile">
                        <i class="fas fa-sort"></i>
                        Sort
                    </span>
                </div>


            </div>

            <div class="products-container col-md-10">
                <div class="ls-prod-container container-fluid text-center">
                    <div class="top-button d-md-none"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>
                    <div class="row" id="productsContainerDiv">

                    </div>
                    <div class="text-center" id="noProductsText">Sorry, no more products to show.</div>
                    <div class="mx-auto" id="loaderImg">
                        <img src="{{ asset('/images/Spinner-1s-100px.gif') }}" alt="Spinner">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('pageSpecificScripts')
<script src="{{ mix('js/listing.mobile.js')}}"></script>
<script id="listing-template" type="text/x-handlebars-template">
    @{{#with this}}
            <div id="@{{id}}" sku="@{{sku}}" site="@{{site}}" class="ls-product-div col-md-3 item-2">
                <a href="/product/@{{sku}}" class="product-detail-modal">
                    <div class="ls-product"><img class="prod-img img-fluid" src="@{{main_image}}" alt="@{{name}}">
                        <div class="prod-info d-none d-md-block">
                            <span class="-cat-name">@{{site}}</span>
                            <span class="-prices float-right">
                                <span class="-cprice">@{{formatPrice is_price}}</span>
                                @{{#ifNeq is_price was_price}}
                                <span class="-oldprice">@{{formatPrice was_price}}</span>
                                @{{/ifNeq}}
                            </span>
                        </div>
                        @{{#if wishlisted}}
                            <div class="wishlist-icon marked" sku="@{{sku}}"><i class="far fa-heart -icon"></i></div><img class="variation-img img-fluid" src="@{{main_image}}" alt="variation-img"></div>
                        @{{else}}
                        <div class="wishlist-icon " sku="@{{sku}}"><i class="far fa-heart -icon"></i></div><img class="variation-img img-fluid" src="@{{main_image}}" alt="variation-img"></div>
                        @{{/if}}

                </a><span class="prod-sale-price d-md-none">@{{formatPrice is_price}}</span>
                @{{printDiscount percent_discount}}
                <div class="d-none d-md-block">
                    <h5 class="-name">@{{name}}</h5>
                    <div class="responsive slick-initialized slick-slider" style="">
                        <div class="slick-list draggable">
                            <div class="slick-track" style="opacity: 1; width: 100px; transform: translate3d(0px, 0px, 0px);">
                            @{{#each variations}}
                            @{{#with this}}
                                <div class="mini-carousel-item" style="width: 30px; display: inline-block;"><a class="responsive-img-a" href="@{{link}}" tabindex="0"><img class="carousel-img img-fluid" src="@{{image}}" data-prodImg="@{{image}}" /></a></div>
                            @{{/with}}
                            @{{/each}}
                        </div>
                        </div>
                    </div>
                    @{{#if reviewExist}}
                    <div class="rating-container">
                        <div class="rating  @{{ratingClass}}"></div><span class="total-ratings">@{{reviews}}</span></div>
                </div>
                @{{/if}}
            </div>
        @{{/with}}
    </script>
@endpush
