<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126036769-1"></script> 
    <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-126036769-1');</script>
    <script type="text/javascript">
        var vglnk = {key: '7c7cd49fe471830c75c9967f05d5f292'};
        (function(d, t) {
            var s = d.createElement(t);
                s.type = 'text/javascript';
                s.async = true;
                s.src = '//cdn.viglink.com/api/vglnk.js';
            var r = d.getElementsByTagName(t)[0];
                r.parentNode.insertBefore(s, r);
        }(document, 'script'));
    </script>
    <script>
        window.intercomSettings = {
        app_id: "es5imqpc"
        };
    </script>

    <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/es5imqpc';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>

    @stack('pageSpecificStyles')
</head>

<body   
    @unless(empty($body_class))
        class="{{$body_class}}"
    @endunless 
>

    @if (Auth::guest())
        <input type="hidden" id="isLoggedIn" name="isLoggedIn" value="0">
    @else
        <input type="hidden" id="isLoggedIn" name="isLoggedIn" value="1">
    @endif

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