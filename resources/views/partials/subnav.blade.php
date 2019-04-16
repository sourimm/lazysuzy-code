<div class="submenu-area d-none d-md-block container-fluid">
    <div class="row">
        <nav class="navbar navbar-light navbar-expand-lg mainmenu">
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    @foreach($departments as $department)
                        <li><a href="#">{{$department->name}} <span class="sr-only">(current)</span></a></li>
                    @endforeach
                </ul>
            </div>
        </nav>
    </div>
</div>