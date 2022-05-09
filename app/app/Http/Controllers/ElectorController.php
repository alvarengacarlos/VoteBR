<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ElectorController extends Controller
{
    public function login(Request $request) {
        if ($request->cookie("elector-api-token")) {
            return redirect()->route("elector.dashboard");
        }
        
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

    public function vote(Request $request) {
        $validatedData = $request->validate([
            "cpf" => ["required", "string", "size:11"],
            "birthDate" => ["required", "date:Y-m-d"],
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $cpf = $request->input("cpf");
        $birthDate = $request->input("birthDate");
        $numberOfCandidate = $request->input("numberOfCandidate");

        echo $cpf;
        echo $birthDate;
        echo $numberOfCandidate;  
    }

    public function searchElector(Request $request) {
        $validatedData = $request->validate([
            "yearElection" => ["required", "string", "size:4"],
            "monthElection" => ["required", "string", "size:2"],
            "cpf" => ["required", "string", "size:11"],            
        ]);

        $cpf = $request->input("cpf");
        $year = $request->input("yearElection");
        $month = $request->input("monthElection");

        echo $cpf;
        echo $year;
        echo $month;        
    }

    private function searchElectionResearchInProgress() {
        echo [];
    }

    private function searchElectionResearchClosed() {
        echo [];
    }

}
