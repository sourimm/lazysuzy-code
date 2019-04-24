@extends('layouts.layout')

@push('styles')
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
@endpush

@section('middle_content')
    <div class="homepage">
        
        @include('./partials/brandassoiciation')
        @include('./partials/subnav')
        <div class="d-none">{{ Breadcrumbs::render('/') }}</div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading float-md-right">Browse by Department</span>
                <div class="-depts row">

                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Accent</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Living</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Bed</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Dining</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Hall</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Bath</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Outdoor</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Pet</span></a></div>
                        <div class="col-4 col-sm-auto -dept "><a href="#"><span>Kids</span></a></div>

                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ mix('js/manifest.js')}}"></script>
    <script src="{{ mix('js/vendor.js')}}"></script>
    <script src="{{ mix('js/app.js')}}"></script>
@endpush