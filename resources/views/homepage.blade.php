<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LazySuzy Homepage</title>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

        <link href="{{ asset('css/app.css')}}" rel="stylesheet">
        
    </head>
    <body>
        <div class="homepage">
            @include('navbar')
            @include('brandassoiciation')

            <div class="category-links">
                <span class="-heading float-md-right">Browse by Department</span>
                <div class="-depts row">
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Accent</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Living</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Bed</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Dining</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Hall</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Bath</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Outdoor</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Pet</span></a></div>
                    <div class="col-4 col-md-12 -dept"><a href="#"><span>Kids</span></a></div>
                </div>
            </div>

            @include('footer')
        </div>
    </body>

    <script src="{{ asset('js/app.js')}}"></script>
</html>
