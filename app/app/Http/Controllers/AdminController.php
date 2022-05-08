<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function login() {
        return view("admin.login");
    }

    public function auth(Request $request) {
        $validatedData = $request->validate([
            "email" => ["required", "email:rfc"],
            "password" => ["required", "string"],
        ]);
        
        $email = $request->input("email");
        $password = $request->input("password");

        //Fazer requisição
        $token = "asfeoiwurweor.dsaklfjslk.kjsalfjsd";
        
        $minutes = 60;
        return redirect()->route("admin.dashboard")->cookie("admin-api-token", $token, $minutes);
        
        return back();
    }
    
    public function dashboard() {        
        return view("admin.dashboard");
    }
        
    public function createElectionResearch(Request $request) {
        $validatedData = $request->validate([
            "year" => ["required", "string", "size:4"],
            "month" => ["required", "string", "size:2"],
        ]);

        $year = $request->input("year");
        $month = $request->input("month");

        echo $year;
        echo $month;
    }

    public function insertCandidate(Request $request) {
        $validatedData = $request->validate([
            "nameOfCandidate" => ["required", "string"],
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $nameOfCandidate = $request->input("nameOfCandidate");
        $numberOfCandidate = $request->input("numberOfCandidate");

        echo $nameOfCandidate;
        echo $numberOfCandidate;
    }

    public function removeCandidate(Request $request) {
        $validatedData = $request->validate([            
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $numberOfCandidate = $request->input("numberOfCandidate");
        
        echo $numberOfCandidate;
    }

    public function beginCollectingVotes(Request $request) {
        echo "Iniciou coleta de votos";
    }
    /*  
        
        finishElectionResearch
        searchElectionResearch
        searchElectionResearchWithoutStarting
        searchElectionResearchInProgress
        searchElectionResearchClosed
     */
}
