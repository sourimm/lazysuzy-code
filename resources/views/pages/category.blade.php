@extends('layouts.layout', ['body_class' => 'categorypage-main-div'])
@section('middle_content')
@section('title', $departmentName.' | LazySuzy')
@include('./partials/subnav')

<div class="category-page" id="categorypage">
    <div class="listing-container category-img-container">
        <div class="listing-top-controls d-block d-md-none">
            <div class="dropdown show float-left">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMobileListing" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-angle-down"></i>
                </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMobileListing" rel="dropdownMobileListing">
                <li>
                    <a class="dropdown-item" href="#">Accent</a></li>
                <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Living<i class="fas fa-angle-right float-right"></i></a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">All</a></li>
                    <li><a class="dropdown-item" href="#">Sofa</a></li>
                    <li><a class="dropdown-item" href="#">Seating</a></li>
                    <li><a class="dropdown-item" href="#">Table</a></li>
                    <li><a class="dropdown-item" href="#">Remaining</a></li>
                </ul>
                </li>
                <li><a class="dropdown-item" href="#">Bed</a></li>
                <li><a class="dropdown-item" href="#">Kitchen</a></li>
                <li><a class="dropdown-item" href="#">Remaining</a></li>
                </ul>
            </div>
                    {{ Breadcrumbs::render('products') }}
                    <!-- <span class="filter-toggle float-right" id="filterToggleBtn">
                        <i class="fas fa-filter"></i>
                    </span>
                    <span class="view-items-toggle float-right" id="viewItemsBtn">
                        <i class="fab fa-buromobelexperte"></i>
                    </span> -->
            <!-- <div class="wishlist-icon float-right m-10" id="wishlistBtn">
                <i class="far fa-heart -icon"></i>
            </div>
            <div class="filter-toggle float-right m-10" id="filterToggleBtn">
                <i class="fas fa-filter -icon"></i>
            </div> -->
        </div>
        <div class="category-listing">
            <div class="row">
                @foreach ($listedCategories as $category)
                    <div class="col-sm-3 col-6 category-text">
                        <a class="category-text" href="{{$category['link']}}">
                            <img class="category-img" src="{{$category['image']}}?v=1.0.0" alt="{{$category['category']}}" >
                            <div><span>{{$category['category']}}</span></div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    @include('./partials/brandassociation')
</div>
@endsection
@push('pageSpecificScripts')
    <script src="{{ mix('js/test.js')}}"></script>
@endpush
