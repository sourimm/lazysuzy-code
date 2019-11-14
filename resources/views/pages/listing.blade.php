@extends('layouts.layout', ['body_class' => 'listing-main-div'])

@section('middle_content')
@include('./partials/subnav')
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
                <div class="filters-close-btn d-md-none" >x</div>
                <hr>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="price_low_to_high"> Price : Low to High</div>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="price_high_to_low"> Price : High to Low</div>
                <div class="sort-filter-input"><input type="radio" name="sort-price-filter" value="popularity"> Popularity </div>





                </div>
                <div class="listing-top-controls d-block d-md-none">
                <div id="page-navigator" class="page-navigator-mobile"></div>
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
                <!-- <div class="listing-top-controls d-block d-md-none">
                    <div class="filters col-md-2 d-md-block" id="sort-mobile">
                        <input type="radio" name="sort-price-filter" value="male"> Price : Low to High<br>
                        <input type="radio" name="sort-price-filter" value="female">Price : High to Low<br>
                        <input type="radio" name="sort-price-filter" value="other"> Popularity <br>
                        <input type="radio" name="sort-price-filter" value="female" checked="checked"> Recommended<br>
                    </div>
                </div> -->

                <!-- <div class="listing-top-controls d-block d-md-none">
                    <span class="filter-toggle float-right" id="filterToggleBtn">
                        <i class="fas fa-filter"></i>
                    </span>
                    <span class="view-items-toggle float-right" id="viewItemsBtn">
                        <i class="fab fa-buromobelexperte"></i>
                    </span>
                </div> -->


                <div class="products-container col-md-10">
                    <div class="float-right d-none d-md-block">
                        <div class="sortby">
                            <label for="sort">Sort By</label>
                            <select class="form-control" id="sort">
                                <option>Price : Low to High</option>
                                <option>Price : High to Low</option>
                                <option>Popularity</option>
                                <option selected>Recommended</option>
                            </select>
                        </div>
                        <div class="total-items"><span id="totalResults">0</span> Results</div>
                    </div>
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
        @component('components.detailOverview')
        @endcomponent
    </div>
@endsection
@push('pageSpecificScripts')
    <script src="{{ mix('js/listing.js')}}"></script>
    <script src="{{ mix('js/detailOverview.js')}}"></script>
@endpush
