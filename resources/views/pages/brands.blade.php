@extends('layouts.layout')

@section('middle_content')
@include('./partials/subnav')
    <div class="brands">
        <div class="main-img">
            <img class="img-fluid" src="{{ asset('/images/Floyd.jpg') }}" alt="">
        </div>   
        <div class="brands-main-heading">
            <div class="container">
            <div class="row">
                    <div class="col-12 text-center">
                        <h1>Floyd</h1>
                    </div>
                    <div class="row">
                    <div class="col-8 col-sm-12">
                    <div class="brands-details">
                    <h3>Floyd began because we were tired of disposable furniture. 
                        So we set out to design products of lasting quality fo how people live today. 
                        Furniture should be made for the home, not the landfill.
                        Made with material that last. It’s a different way of making furniture.
                        we call it furniture for keeping. </h3>
                    </div>
                    </div>
                    <div class="col-4 col-sm-12">
                        <div class="row">
                            <div class="col-12 col-sm-6">  
                               <div class="row">
                                   <div class="col-3 col-sm-12">
                                   <img class="brands-icon" src="{{ asset('/images/icon/heart-flag-of-united-states-of-america.png') }}" alt="">
                                   </div>
                                   <div class="col-9 col-sm-12 brand-icon-text">
                                       <h3>Manufactured in USA</h3>
                                   </div>
                               </div>
                            </div>
                            <div class="col-12 col-sm-6 ">  
                               <div class="row">
                                   <div class="col-3 col-sm-12">
                                   <img class="brands-icon" src="{{ asset('/images/icon/shipping.png') }}" alt="">
                                   </div>
                                   <div class="col-9 col-sm-12 brand-icon-text">
                                       <h3>Free Shipping</h3>
                                   </div>
                               </div>
                            </div>
                          
                            <div class="col-12 col-sm-6">  
                               <div class="row">
                                   <div class="col-3 col-sm-12">
                                   <img class="brands-icon" src="{{ asset('/images/icon/exchange.png') }}" alt="">
                                   </div>
                                   <div class="col-9 col-sm-12 brand-icon-text">
                                       <h3>Free 30 Days Returns</h3>
                                   </div>
                               </div>
                            </div>
                          
                            <div class="col-12 col-sm-6">  
                               <div class="row">
                                   <div class="col-3 col-sm-12">
                                   <img class="brands-icon" src="{{ asset('/images/icon/guarantee.png') }}" alt="">
                                   </div>
                                   <div class="col-9 col-sm-12 brand-icon-text">
                                       <h3>10 years Warranty</h3>
                                   </div>
                               </div>
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
        <!-- <div class="row product-div-main">
           <div class="brands-prod-div col-3 ">
                <div class="brands-product">
                    <img class="brands-product-img" src="{{ asset('/images/Floyd.jpg') }}" alt="">
                    <div class="prod-info">
                        <span class="float-left">$ 1000</span>
                        <span class="float-right">Westelm</span>
                    </div>
                </div>
                <div class="product-detail">
                    <p>Mirrored Silver Chest & Dresser Bedroom Set</p>
                </div>
            </div>
            
           </div>
        </div> -->
    </div>          
    @include('./partials/brandassociation')
            <!-- </div>
        </div>    
        
    </div> -->
    <!-- @include('./partials/brandassociation')  -->
@endsection
    <!-- <script src="{{ ('./js/apis/brands-api.js')}}"></script> -->
    <!-- @push('pageSpecificScripts')
    <script src="{{ mix('js/brands.js')}}"></script>
 <script src="{{ mix('js/detailOverview.js')}}"></script> -->
@endpush -->

