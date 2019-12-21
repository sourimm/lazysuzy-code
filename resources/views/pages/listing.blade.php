@extends('layouts.layout', ['body_class' => 'listing-main-div'])

@section('middle_content')
@include('./partials/subnav')
<div class="listing">
    <div class="listing-container main-container container ">
        <h4 class="page-heading">{{Request::segment(3)}}</h4>
        <div class="filters d-md-block filter-close-btn">
            <div class="row">
                <ul class="filter-tabs col-sm-9" id="desktop-filters">


                </ul>
                <div class="col-sm-3 d-none d-md-block">
                    <div class="total-items float-left"><span id="totalResults">0</span> Results</div>
                    <div class="sortby float-right">
                        <select class="form-control" id="sort">
                            <option>Price : Low to High</option>
                            <option>Price : High to Low</option>
                            <option>Popularity</option>
                            <option selected>Recommended</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>

        <div class="products-container">

            <div class="ls-prod-container">
                <div class="top-button"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>
                <div class="row" id="productsContainerDiv">
                </div>
                <div class="text-center" style="display:none;" id="noProductsText">Sorry, no more products to show.
                </div>
                <div class="mx-auto text-center" id="loaderImg">
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
            <a href="/product/@{{sku}}" class="product-detail-modal js-detail-modal">
                <div class="ls-product"><img class="prod-img img-fluid" src="@{{main_image}}" alt="@{{name}}">

                    @{{#if wishlisted}}
                        <div class="wishlist-icon marked" sku="@{{sku}}"><i class="far fa-heart -icon"></i></div><img class="variation-img img-fluid" src="@{{main_image}}" alt="variation-img"></div>
                    @{{else}}
                    <div class="wishlist-icon " sku="@{{sku}}"><i class="far fa-heart -icon"></i></div><img class="variation-img img-fluid" src="@{{main_image}}" alt="variation-img"></div>
                    @{{/if}}

            </a>
            <div class="prod-info">
                <span class="-site">@{{site}}</span>
                @{{#if reviewExist}}
                <div class="rating-container float-right">
                    <span class="total-ratings">@{{reviews}}</span><div class="rating  @{{ratingClass}}"></div>
                </div>
                @{{/if}}
            </div>
            <div class="-name">@{{name}}</div>
            <div class="-prices">
                <span class="-cprice">@{{formatPrice is_price}}</span>
                @{{#ifNeq is_price was_price}}
                <span class="-oldprice">@{{formatPrice was_price}}</span>
                @{{/ifNeq}}
            </div>

            <div class="responsive slick-slider" style="">
                @{{#each_upto variations 6}}
                @{{#with this}}
                    <div class="mini-carousel-item" style="width: 35px; display: inline-block;">
                        @{{#ifNeq swatch_image ''}}
                        <a class="responsive-img-a" href="javaScript:void(0)" tabindex="0">
                            <img class="carousel-img img-fluid" src="@{{swatch_image}}" data-prodImg="@{{image}}" />
                        </a>
                        @{{else}}
                        <a class="responsive-img-a" href="@{{link}}" tabindex="0">
                            <img class="carousel-img img-fluid" src="@{{image}}" data-prodImg="@{{image}}" />
                        </a>
                        @{{/ifNeq}}

                    </div>
                @{{/with}}
                @{{/each_upto}}
                @{{#if showMoreVariations}}
                    <a href="/product/@{{sku}}" class="more-link js-detail-modal">
                        + more
                    </a>
                @{{/if}}
            </div>
        </div>
    @{{/with}}
</script>
<script id="desktop-filter-template" type="text/x-handlebars-template">
    <li class="nav-item dropdown filter" data-filter=@{{name}} id="@{{name}}Filter">
        <a class="nav-link dropdown-toggle @{{#if isApplied}}applied @{{/if}}" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">@{{name}}</a>
        <ul class="dropdown-menu">
            @{{#if isPrice}}
                <li class="dropdown-item"  href="#"><input class="price-range-slider" id="priceRangeSlider" name="price_range" value="" tabindex="-1" readonly=""></li>
            @{{else}}
                @{{#each list}}
                @{{#with this}}
                @{{#if enabled}}
                    <li class="dropdown-item" href="#"><label class="filter-label"><input type="checkbox" @{{#if checked}}checked@{{/if}} value="@{{value}}" belongsto="@{{name}}"><span class="checkmark"></span><span class="text">@{{name}}</span></label></li>
                @{{/if}}
                @{{/with}}
                @{{/each}}
            @{{/if}}
        </ul>
    </li>
</script>
@endpush
