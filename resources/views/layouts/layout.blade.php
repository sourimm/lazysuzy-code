<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @stack('pageSpecificStyles')
</head>

<body   
    @unless(empty($body_class))
        class="{{$body_class}}"
    @endunless 
>
    <div class="main">    
        @component('components.navbar') 
        @endcomponent

        <div class="main_content">
            @yield("middle_content")
        </div> 

        @component('components.footer') 
        @endcomponent
    </div>

    @component('components.authmodal') 
    @endcomponent

    <script src="{{ mix('js/manifest.js')}}"></script>
    <script src="{{ mix('js/vendor.js')}}"></script>
    <script src="{{ mix('js/app.js')}}"></script>
    @stack('pageSpecificScripts')
</body>

</html>