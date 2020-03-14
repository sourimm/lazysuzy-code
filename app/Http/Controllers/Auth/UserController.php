<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('lazysuzy-web')->accessToken;
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
