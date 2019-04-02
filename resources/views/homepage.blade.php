<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>LazySuzy Homepage</title>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <link href="{{ asset('css/app.css')}}" rel="stylesheet">

</head>

<body>
    <div class="homepage">
        @include('navbar')
        @include('brandassoiciation')

        <div class="submenu-area d-none d-md-block">
            <div class="row">
                <nav class="navbar navbar-light navbar-expand-lg mainmenu">
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li><a href="#">Accent <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Living</a></li>
                            <li><a href="#">Bedroom</a></li>
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hall</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a href="#">Bar</a></li>
                                    <li><a href="#">Seating</a></li>
                                    <li><a href="#">Table</a></li>
                                    <li><a href="#">Storage</a></li>
                                    <li><a href="#">Sets</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Bath</a></li>
                            <li><a href="#">Outdoor</a></li>
                            <li><a href="#">Pet</a></li>
                            <li><a href="#">Kids</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>

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

        @include('footer')
    </div>
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>