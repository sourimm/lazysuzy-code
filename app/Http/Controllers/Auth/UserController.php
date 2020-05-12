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
        
        $user = false;
        $data = $request->all();
        
        if(isset($data['guest'])){
          $user = User::create([
            'name' => '',
            'email' => '',
            'password' => '',
            'first_name' => '',
            'last_name' => '',
            'oauth_provider' => 'guest',
            'oauth_uid' => '',
            'picture' => 'null',
            'locale' => 'null',
            'user_type' => config('user.user_type.guest')
          ]);
        }
        else{
          $validator = Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
          ]);
          
          if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
          }
          
          $name = explode(' ', $data['name']);
          $userData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'first_name' => isset($name[0]) ? $name[0] : '',
            'last_name' => isset($name[1]) ? implode(' ', array_slice($name, 1)) : '',
            'oauth_provider' => 'basic',
            'oauth_uid' => rand(0, 100),
            'picture' => 'null',
            'locale' => 'null',
            'user_type' => config('user.user_type.default')
          ];
          
          Auth::shouldUse('api');
          if(Auth::check()){
            $user = Auth::user();
            // check if guest using is trying to convert
            if(isset($user->user_type) && $user->user_type == config('user.user_type.guest')){
              if(!$user->update($userData))
                return response()->json(['error' => ['update' => "unable to update user data"]], 401);
              }
              // check if a regular user is trying to create another account
              else if($user->user_type == config('user.user_type.default')){
                $user = User::create($userData);
              }
            }
            else
            $user = User::create($userData);
        }
        
        if($user){
          $success['token'] =  $user->createToken('lazysuzy-web')->accessToken;
          $success['user'] =  $user;
          return response()->json(['success' => $success], $this->successStatus);
        }
        else
          return response()->json(['error' => ['error' => "unknown error"]], 401);
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
        return response()->json(['status' => true], 204);
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
    
    public function update(Request $request){
      $data = $request->all();
      if(Auth::check()){
        $user = Auth::user();
        
        if(isset($data['name'])){
          $name = explode(' ', $data['name']);
          $user->first_name = isset($name[0]) ? $name[0] : '';
          $user->last_name = isset($name[1]) ? implode(' ', array_slice($name, 1)) : '';
          $user->name = $data['name'];
        }
        
        if(isset($data['email'])){
          $validator = Validator::make($data, ['email' => ['required', 'string', 'email', 'max:255', 'unique:users']]);
          
          if ($validator->fails())
            return response()->json(['error' => $validator->errors()], 401);
          
          $user->email = $data['email'];
        }
        
        // set the password only if does not already exists
        if(isset($data['password']) && empty($user->password) && $user->user_type == config('user.user_type.guest')){
          $validator = Validator::make($data, ['password' => ['required', 'string', 'min:8']]);

          $validator = Validator::make($data, [
            'password' => ['required', 'string', 'min:8'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users']
          ]);

                if ($validator->fails()) {
                    if (isset($data['password'])) {
                        $creds = $request->only('email', 'password');
                        if (Auth::guard('web')->attempt(['email' => $data['email'], 'password' => $data['password']], false, false)) {

                            // change the userID in order table to new user's userID here.
                            $user = Auth::guard('web')->user();
                            $success['token'] =  $user->createToken('Laravel Personal Access Client')->accessToken;
                            return response()->json([
                                'success' => $success,
                                'user' => $user
                            ], 200);
                        }
                    }
                    return response()->json(['error' => $validator->errors()], 401);
                }

            $user->password = Hash::make($data['password']);
        }
        
        // if both email and password exist for user change its type
        if(!empty($user->email) && !empty($user->password) && $user->user_type == config('user.user_type.guest'))
          $user->user_type = config('user.user_type.default');
          
        if($user->update()) {
          $success['token'] =  $user->createToken('lazysuzy-web')->accessToken;
          $success['user'] =  $user;
          return response()->json(['success' => $success], $this->successStatus);
        }
        else
          return response()->json(['error' => ['error' => "unknown error"]], 401);
      }
    }
}
