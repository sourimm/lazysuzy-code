@extends('layouts.layout')

@section('middle_content')
@include('./partials/subnav')
    <div class="brands">

        <div class="brands-main-heading">
            <div class="container">
                <div class="js-brand-header">
                        <div class="main-img">
                                <img class="img-fluid" src="{{ asset('/images/Floyd.jpg') }}" alt="">
                            </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <h1>Floyd</h1>
                        </div>
                        <div class="col-8 col-sm-12">
                            <div class="brands-details">
                            <p>Floyd began because we were tired of disposable furniture.
                                So we set out to design products of lasting quality fo how people live today.
                                Furniture should be made for the home, not the landfill.
                                Made with material that last. It’s a different way of making furniture.
                                we call it furniture for keeping. </p>
                            </div>
                        </div>
                        <div class="col-4 col-sm-12">
                            <div class="row">
                                <div class="col-3">
                                <img class="brands-icon" src="{{ asset('/images/icon/heart-flag-of-united-states-of-america.png') }}" alt="Heart-flag-of-united-states-of-america">
                                </div>
                                <div class="col-9 brand-icon-text">
                                    <h3>Manufactured in USA</h3>
                                </div>
                                <div class="col-3">
                                <img class="brands-icon" src="{{ asset('/images/icon/shipping.png') }}" alt="Free Shipping">
                                </div>
                                <div class="col-9 brand-icon-text">
                                    <h3>Free Shipping</h3>
                                </div>

                                <div class="col-3">
                                <img class="brands-icon" src="{{ asset('/images/icon/exchange.png') }}" alt="Exchange">
                                </div>
                                <div class="col-9 brand-icon-text">
                                    <h3>Free 30 Days Returns</h3>
                                </div>

                                <div class="col-3">
                                <img class="brands-icon" src="{{ asset('/images/icon/guarantee.png') }}" alt="Guarantee">
                                </div>
                                <div class="col-9 brand-icon-text">
                                    <h3>10 years Warranty</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div class="brands-prod-container products-container">
        <div class="container ls-prod-container">
            <div id="product-div-main" class="row"></div>
        </div>
    </div>
    @component('components.detailOverview')
    @endcomponent
    @include('./partials/brandassociation')
    @endsection
@push('pageSpecificScripts')
    <script type = "text/template" id="brandHeader">
    <div class="row">
        <div class="main-img">
            <img class="img-fluid" src="@{{cover_image}}" alt="">
        </div>
        <div class="col-12 text-center">
            <h1>@{{name}}</h1>
        </div>
        <div class="col-8 col-sm-12">
            <div class="brands-details">
            <p>@{{description}} </p>
            </div>
        </div>
        <div class="col-4 col-sm-12">
            @{{#if isFeaturesVisible}}
            <div class="row">
                <div class="col-3">
                <img class="brands-icon" src="{{ asset('/images/icon/heart-flag-of-united-states-of-america.png') }}" alt="Heart-flag-of-united-states-of-america">
                </div>
                <div class="col-9 brand-icon-text">
                    <h3>Manufactured in USA</h3>
                </div>
                <div class="col-3">
                <img class="brands-icon" src="{{ asset('/images/icon/shipping.png') }}" alt="Free Shipping">
                </div>
                <div class="col-9 brand-icon-text">
                    <h3>Free Shipping</h3>
                </div>

                <div class="col-3">
                <img class="brands-icon" src="{{ asset('/images/icon/exchange.png') }}" alt="Exchange">
                </div>
                <div class="col-9 brand-icon-text">
                    <h3>Free 30 Days Returns</h3>
                </div>

                <div class="col-3">
                <img class="brands-icon" src="{{ asset('/images/icon/guarantee.png') }}" alt="Guarantee">
                </div>
                <div class="col-9 brand-icon-text">
                    <h3>10 years Warranty</h3>
                </div>
            </div>
            @{{/if}}
        </div>
    </div>
    </script>
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
    <script src="{{ mix('js/brands.js')}}"></script>
    <script src="{{ mix('js/detailOverview.js')}}"></script>


@endpush
