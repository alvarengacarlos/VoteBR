<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ElectorController extends Controller
{
    public function login() {
        return view("elector.login");
    }

    public function auth() {
        //fazer requisição
        $token = "kasklfflskd.dsfasdf.sdarfsd";
        $minutes = 60;
        return redirect()->route("elector.dashboard")->cookie("elector-api-token", $token, $minutes);
        
        return back();
    }

    public function dashboard() {
        return view("elector.dashboard");
    }
}
