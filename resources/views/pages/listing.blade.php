@extends('layouts.layout', ['body_class' => 'listing-main-div'])

@section('middle_content')
@include('./partials/subnav')
<div class="listing">
    <div class="listing-container main-container container ">
        <div class="filters d-md-block filter-close-btn">
            <div class="row">
                <ul class="filter-tabs col-sm-8" id="desktop-filters">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Brand</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Price</a>
                    </li>

                    <li>
                        <a class="btn clearall-filter-btn" href="/filter/clear_filter/all">Clear All</a>
                    </li>

                </ul>
                <div class="col-sm-4 d-none d-md-block">
                    <div class="sortby float-left">
                        <label for="sort">Sort By</label>
                        <select class="form-control" id="sort">
                            <option>Price : Low to High</option>
                            <option>Price : High to Low</option>
                            <option>Popularity</option>
                            <option selected>Recommended</option>
                        </select>
                    </div>
                    <div class="total-items float-right"><span id="totalResults">0</span> Results</div>
                </div>
            </div>
        </div>

        <div class="products-container">

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
    @component('components.detailOverview')
    @endcomponent
</div>
@endsection
@push('pageSpecificScripts')
<script src="{{ mix('js/listing.js')}}"></script>
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
                    <div class="-name">@{{name}}</div>
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
<script id="desktop-filter-template" type="text/x-handlebars-template">
    <li class="nav-item dropdown filter" data-filter=@{{name}} id="@{{name}}Filter">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">@{{name}}</a>
            <ul class="dropdown-menu">
                @{{#if isPrice}}
                    <li class="dropdown-item"  href="#"><input class="price-range-slider" id="priceRangeSlider" name="price_range" value="" tabindex="-1" readonly=""></li>
                @{{else}}
                    @{{#each list}}
                    @{{#with this}}
                        <li class="dropdown-item" href="#"><label class="filter-label"><input type="checkbox" value="@{{value}}" belongsto="@{{name}}"><span class="checkmark"></span><span class="text">@{{name}}</span></label></li>
                    @{{/with}}
                    @{{/each}}
                @{{/if}}
            </ul>
        </li>
    </script>
@endpush
