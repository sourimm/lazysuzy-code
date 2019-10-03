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
         <div class="category-img-container">
             <div class="row">
             <div class="col-3 category-text">
             <a href="/products/living/sofa">
                <img class="category-img" src="/images/product-category/Sofa.jpg" alt="Sofa" >
                <span> Sofas</span>
                </a>
            </div>
            <div class="col-3 category-text">
                <a href="/products/living/sectionals">
                    <img class="category-img" src="/images/product-category/Sectionals.jpg" alt="Sectionals" >
                    <span> Sectionals</span>
                </a>
            </div>
            <div class="col-3 category-text">
                <img class="category-img" src="/images/product-category/Loveseat.jpg" alt="BookSelf" >
                <span>Loveseats & Daybeds</span>
            </div>
            <div class="col-3 category-text">
                <a href="/products/living/chairs">
                    <img class="category-img" src="/images/product-category/Chairs.jpg" alt="Charis" >
                    <span> Chairs</span>
                </a>
            </div>

             <div class="col-3 category-text">
                <img class="category-img" src="/images/product-category/Ottoman.jpg" alt="Ottoman" >
                <span> Ottoman, Poufs & Stools</span>
             </div>
             <div class="col-3 category-text">
                <a href="/products/living/benches">
                    <img class="category-img" src="/images/product-category/Benches.jpg" alt="Benches" >
                    <span> Benches</span>
                </a>
             </div>
             <div class="col-3 category-text ">
                <a href="/products/living/tables">
                    <img class="category-img" src="/images/product-category/CoffeeTable.jpg" alt="CoffeeTable" >
                    <span> Coffee & Side Table</span>
                </a>
             </div>
             <div class="col-3 category-text">
                <a href="/products/living/storage">
                    <img class="category-img" src="/images/product-category/Bookshelf.jpg" alt="BookSelf" >
                    <span> BookShelves & Cabinets</span>
                </a>
             </div>

         </div>
         </div>





        @include('./partials/brandassociation')
    </div>
@endsection

@push('pageSpecificScripts')
    <script src="{{ mix('js/detailspage.js')}}"></script>
@endpush
