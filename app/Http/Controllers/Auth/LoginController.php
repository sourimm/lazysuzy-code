<?php

namespace App\Http\Controllers\Auth;

use Socialite;
use Auth;
use App\Models\User;
use App\Models\SocialIdentity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function index(Request $request)
    {
        return view('auth\signup');
    }
    
    /**
     * Redirect the user to the provider authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    /**
     * Obtain the user information from provider.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($driver)
    {
        try {
            $request->session()->put('state',Str::random(40));
            $user = Socialite::driver($driver)->user();
        } catch (\Exception $e) {
            if ($driver == 'google') {
                $user = Socialite::driver($driver)->stateless()->user();
            }
            else {
                $user = Socialite::driver($driver)->user();
            }
        }

       
        $existingUser = $this->findOrCreateUser($user, $driver);
        Auth::login($existingUser, true);

        return redirect($this->redirectPath());
    }
    
    // explode() - will work on multiple delimeters 
    public function explodeX( $delimiters, $string )
    {
        return explode(chr(1), str_replace($delimiters, chr(1), $string));
    }

    public function findOrCreateUser($providerUser, $provider)
    {

        $account = SocialIdentity::whereProviderName($provider)
                  ->whereProviderId($providerUser->getId())
                  ->first();

        if ($account) {
           return $account->user;
        } else {
           $user = User::whereEmail($providerUser->getEmail())->first();
           $f_l_name = $this->explodeX(array(' ', '_'), $providerUser->getName());

           if (! $user) {
               $user = User::create([
                    'email' => $providerUser->getEmail(),
                    'name'  => $providerUser->getName(),
                    'password' => $provider,
                    'first_name' => $f_l_name[0],
                    'last_name' => $f_l_name[1],
                    'gender' => 'default',
                    'oauth_provider' => $provider,
                    'oauth_uid' => $providerUser->getId(),
                    'picture' => $providerUser->getAvatar(),
                    'locale' => 'en',
                ]);
           }

           $user->identities()->create([
               'provider_id'   => $providerUser->getId(),
               'provider_name' => $provider,
           ]);

           return $user;
       }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}
