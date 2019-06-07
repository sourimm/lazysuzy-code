@extends('layouts.layout', ['body_class' => 'homepage-main-div'])

@section('middle_content')
    <div class="homepage">
        
        @include('./partials/brandassoiciation')
        @include('./partials/subnav')
        <div class="d-none">{{ Breadcrumbs::render('/') }}</div>
        <div class="main-container">
            <div class="category-links d-sm-none">
                <span class="-heading float-md-right">Browse by Department</span>
                <div class="-depts row" id="mobileDepartments">
                </div>
            </div>
        </div>
    </div>
    <form method="POST" action="{{ route('login') }}" class="d-none">
            @csrf
         <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
         <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
         <button type="submit" class="btn btn-primary">
           {{ __('Login') }}
         </button>
    </form>
@endsection