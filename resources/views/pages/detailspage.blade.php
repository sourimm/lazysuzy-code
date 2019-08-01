@extends('layouts.layout', ['body_class' => 'detailspage-main-div'])

@section('middle_content')
    <div class="detailspage" id="detailPage">
        @include('./partials/subnav')

        <div class="d-block d-md-none controls-div">
            
            <div class="wishlist-icon float-right m-10" id="wishlistBtn">
                <i class="far fa-heart -icon"></i>
            </div>
            <div class="filter-toggle float-right m-10" id="filterToggleBtn">
                <i class="fas fa-filter -icon"></i>
            </div>
        </div>
        <div class="-images-container"><div class="-images"></div></div>

        <div class="row container">
            <div class="prod-desc col-12 col-md-9">
                <div class="-variations-carousel col-12"></div>
                <div class="row">
                    <div class="prod-main-img col-12 col-md-5 order-md-last">
                    </div>
                    <div class="col-12 col-md-7">
                        <h2 class="-name">product name</h2>
                        <div class="rating-container"><div class="rating"></div><span class="total-ratings"></span></div>
                        <p class="-desc"></p>
                        <ul class="-features"></ul>
                    </div>
                </div>
            </div>
            <div class="prod-price-card col-3 d-none d-md-block">
            </div>
        </div>

        @include('./partials/brandassociation')
    </div>
@endsection

@push('pageSpecificScripts')
    <script src="{{ mix('js/detailspage.js')}}"></script>
@endpush