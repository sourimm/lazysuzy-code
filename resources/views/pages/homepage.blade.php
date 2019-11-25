@extends('layouts.layout', ['body_class' => 'homepage-main-div'])
@section('title', 'LazySuzy | Search & Discover Furniture for your Home')
@section('middle_content')
    <div class="homepage">
        <img class="img-fluid d-md-none" src="{{ asset('/images/homepage-sofa-img.jpg') }}" alt="">
        <div class="d-md-none"> @include('./partials/sbbody') </div>
        <div class="d-none d-md-block">@include('./partials/brandassociation') </div>
        @include('./partials/subnav')
        <div class="d-none">{{ Breadcrumbs::render('/') }}</div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading float-md-right">Browse by Department</span>
                <div class="-depts row" id="mobileDepartments">
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading float-md-right">Top Categories:</span>
                <div class="-depts" id="topCategories">
                    <!-- <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" > -->
                    <div id="madinah-carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" role="listbox" id="carousel-inner">
                        </div>
                        <a class="carousel-control-prev" href="#madinah-carousel" role="button" data-slide="prev">
                            <span class=" fa fa-angle-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#madinah-carousel" role="button" data-slide="next">
                            <span class="fa fa-angle-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading float-md-right">Top Trending</span>
                    <div class="-trending " >
                        <div id="carouselTrending" class="carousel slide" data-ride="carousel" >
                            <div class="carousel-inner" id="carousel-inner-trending">
                            </div>
                            <a class="carousel-control-prev" href="#carouselTrending" role="button" data-slide="prev">
                                <span class="fa fa-angle-left" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselTrending" role="button" data-slide="next">
                                <span class="fa fa-angle-right" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
        </div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading d-none float-md-right">Featured Brands</span>
                <div class="-depts row" id="featuredBrands">
                  
                </div>
            </div>
        </div>
        <div class="d-md-none">@include('./partials/brandassociation') </div>
    </div>
    <form method="POST" action="{{ route('login') }}" class="d-none">
            @csrf
         <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
         <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
         <button type="submit" class="btn btn-primary">
           {{ __('Login') }}
         </button>
    </form>
@endsection
