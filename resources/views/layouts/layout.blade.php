<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>
    @stack('styles')
</head>

<body>
    <div class="main">    
        @component('layouts.components.navbar') 
        @endcomponent

        <div class="main_content">
            @yield("middle_content")
        </div> 

        @component('layouts.components.footer') 
        @endcomponent
    </div>

    @stack('scripts')
</body>

</html>