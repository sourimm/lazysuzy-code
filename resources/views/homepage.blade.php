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
                <div class="-depts">
                    <a href="#"><span class="-dept">Accent</span></a>
                    <a href="#"><span class="-dept">Living</span></a>
                    <a href="#"><span class="-dept">Bed</span></a>
                    <a href="#"><span class="-dept">Dining</span></a>
                    <a href="#"><span class="-dept">Hall</span></a>
                    <a href="#"><span class="-dept">Bath</span></a>
                    <a href="#"><span class="-dept">Outdoor</span></a>
                    <a href="#"><span class="-dept">Pet</span></a>
                </div>
            </div>

            @include('footer')
        </div>
    </body>

    <script src="{{ asset('js/app.js')}}"></script>
</html>
