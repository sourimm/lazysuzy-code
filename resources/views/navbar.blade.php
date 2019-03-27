<!-- <a class="navbar-brand mx-auto" href="#"><img id="logo-navbar-middle" src="{{ asset('/images/dark_logo_transparent.png') }}" alt="LazySuzy" class="logo"></a> -->

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><img id="logo-navbar-middle" src="{{ asset('/images/dark_logo_transparent-1.png') }}" alt="LazySuzy" class="logo"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <form class="searchbar-header form-inline my-2 my-lg-0 ml-auto">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <form class="searchbar-body card card-sm">
        <div class="card-body row no-gutters align-items-center">
            <div class="col-auto">
                <i class="fas fa-search search-icon"></i>
            </div>
            <!--end of col-->
            <div class="col">
                <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Find your accent">
            </div>
            <!--end of col-->
            <div class="col-auto">
                <button class="btn btn-lg btn-success" type="submit">Search</button>
            </div>
            <!--end of col-->
        </div>
    </form>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">The Lazy Story</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="far fa-heart -icon"></i></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle user-icon" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-user-circle -icon"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
          <a class="dropdown-item" href="#">Account</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Log Out</a>
        </div>
      </li>
    </ul>
  </div>
</nav>