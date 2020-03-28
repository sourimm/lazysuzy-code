<?php

namespace App\Http\Controllers\Auth;

use Dotenv\Parser;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SocialIdentity;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function explodeX($delimiters, $string)
    {
        return explode(chr(1), str_replace($delimiters, chr(1), $string));
    }
    public function findOrCreateUser($providerUser, $provider) {
        $auth_user = null;
        $account = SocialIdentity::whereProviderName($provider)
            ->whereProviderId($providerUser->getId())
            ->first();

        if ($account && $account->user) {
            $auth_user = $account->user;
            Auth::login($auth_user, true);
            $user = Auth::user();
            
            $user['access_token'] = $user->createToken('Laravel Personal Access Client')->accessToken;
            return $user;

        } else {
            //return $this->register(null, $providerUser);
            $user = User::whereEmail($providerUser->getEmail())->first();
            $f_l_name = $this->explodeX(array(' ', '_'), $providerUser->getName());

            if (!$user) {
                $user = User::create([
                    'email' => $providerUser->getEmail(),
                    'name'  => $providerUser->getName(),
                    'password' => $provider,
                    'first_name' => $f_l_name[0],
                    'last_name' => isset($f_l_name[1]) ? $f_l_name[1] : "",
                    'gender' => 'default',
                    'oauth_provider' => $provider,
                    'oauth_uid' => $providerUser->getId(),
                    'picture' => $providerUser->getAvatar(),
                    'locale' => 'en',
                ]);

                $user->identities()->create([
                    'provider_id'   => $providerUser->getId(),
                    'provider_name' => $provider,
                ]);

                $auth_user =  $user;
                $auth_user['access_token'] = $user->createToken('lazysuzy-web')->accessToken;
                
                return $auth_user;
            }

            return null;
        
        }
    }
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('Laravel Personal Access Client')->accessToken;
            return response()->json([
                'success' => $success,
                'user' => $user
            ], $this->successStatus);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function register(Request $request)
    {

        //return $request->all();


        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        
        $input = $data = $request->all();
        $input['password'] = bcrypt($input['password']);
        
        // handle first and last name for USER
        $f_name = null;
        $l_name = null;

        if (strlen($data['name']) > 0) $name  = explode(" ", $data['name']);
        else $name = "";

        if (isset($name[0])) $f_name = $name[0];
        if (isset($name[1])) $l_name = $name[1];
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'first_name' => $f_name,
            'last_name' => $l_name,
            'gender' => 'default',
            'oauth_provider' => 'basic',
            'oauth_uid' => rand(0, 100),
            'picture' => 'null',
            'locale' => 'null',
        ]);
        //=======================================
        
        $success['token'] =  $user->createToken('lazysuzy-web')->accessToken;
        $success['user'] =  $user;
        return response()->json(['success' => $success], $this->successStatus);
    }

    public function logout(Request $request) 
    {

        $value = $request->bearerToken();
        $tokenId = (new \Lcobucci\JWT\Parser())->parse($value)->getHeader('jti');
        $token = $request->user()->tokens->find($tokenId);
       
        if (!isset($token->id)) return true;
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $token->id)
            ->update([
                'revoked' => true
            ]);

        $token->revoke();
        
        foreach ($request->user()->tokens as $token) {
            $token->revoke();
        }
        
        Auth::logout();
        $_COOKIE['__user_id'] = NULL;
        return response()->json(true, 204);
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}
