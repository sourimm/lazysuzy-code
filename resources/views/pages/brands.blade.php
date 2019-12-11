@extends('layouts.layout')

@section('middle_content')
@include('./partials/subnav')
    <div class="brands">
        <div class="main-img">
            <img class="img-fluid" src="{{ asset('/images/Floyd.jpg') }}" alt="">
        </div>
        <div class="brands-main-heading">
            <div class="container">
                <div class="js-brand-header">
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
    <div class="brands-prod-container">
        <div class="container">
            <div id="product-div-main" class="row"></div>
        </div>
    </div>
    @include('./partials/brandassociation')
    @endsection
        @push('pageSpecificScripts')
        <script type = "text/template" id="brandHeader">
        <div class="row">
            <div class="col-12 text-center">
                <h1>@{{name}}</h1>
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
        </script>
        <script src="{{ mix('js/brands.js')}}"></script>
        <script src="{{ mix('js/detailOverview.js')}}"></script>

    @endpush
