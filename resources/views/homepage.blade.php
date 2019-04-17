<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>LazySuzy Homepage</title>

    <link href="{{ asset('css/app.css')}}" rel="stylesheet">

</head>

<body>
    <div class="homepage">
        @include('navbar')
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

        @include('footer')
    </div>
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>