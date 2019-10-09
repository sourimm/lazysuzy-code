@extends('layouts.layout', ['body_class' => 'categorypage-main-div'])
@section('middle_content')
    <div class="categorypage" id="categorypage">
        @include('./partials/subnav')

        <div class="d-block d-md-none controls-div">

            <div class="wishlist-icon float-right m-10" id="wishlistBtn">
                <i class="far fa-heart -icon"></i>
            </div>
            <div class="filter-toggle float-right m-10" id="filterToggleBtn">
                <i class="fas fa-filter -icon"></i>
            </div>
        </div>
         <div class="category-img-container">
             <div class="row">
             @foreach ($listedCategories as $category)
                <div class="col-sm-3 col-6 category-text">
                    <a class="category-text" href="{{$category['link']}}">
                        <img class="category-img" src="{{$category['image']}}" alt="{{$category['category']}}" >
                        <div><span>{{$category['category']}}</span></div>
                    </a>
                </div>
            @endforeach
         </div>
         </div>
        @include('./partials/brandassociation')
    </div>
@endsection
