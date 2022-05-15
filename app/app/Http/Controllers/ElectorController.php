<?php

namespace App\Http\Controllers;

use App\Http\Service\ElectorService;
use Illuminate\Http\Request;
use App\Exceptions\RequestError;
use Illuminate\Support\MessageBag;

class ElectorController extends Controller
{
    public function __construct(ElectorService $electorService) {
        $this->electorService = $electorService;
    }

    public function viewLogin(Request $request)
    {
        $electorTokenExists = $request->session()->has("elector-api-token");
        $cookieInstance = $request->session()->get("elector-api-token");

        if ($electorTokenExists && $cookieInstance->getMaxAge() > 0) {
            return redirect()->route("elector.dashboard");
        }
        
        return view("elector.login");
    }

    public function auth()
    {
        $errors = [];
        try {
            $token = $this->electorService->authenticate();
            $this->createSession($token); 
                        
            return redirect()->route("elector.dashboard");

        } catch(RequestError $e) {
            array_push($errors, $e->getMessage());

        } finally {            
            $json = new MessageBag($errors);            
            return back()->withErrors($json);
        }        
    }
    
    private function createSession($token) {
        $minutes = 60;
        $cookie = cookie("token", $token, $minutes);        
        session()->put("elector-api-token", $cookie);        
    }
    
    public function viewDashboard() {
        try {         
            $electionResearchArray = $this->electorService->searchElectionResearchInProgress();
            
            return view("elector.dashboard", [
                "electionResearchArray" => $electionResearchArray
            ]);
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("elector.login")->withErrors($json);
        }
    }

    public function httpVote(Request $request) {
        $validatedData = $request->validate([
            "cpf" => ["required", "string", "size:11"],
            "birthDate" => ["required", "date:Y-m-d"],
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $cpf = $request->input("cpf");
        $birthDate = $request->input("birthDate");
        $numberOfCandidate = $request->input("numberOfCandidate");

        try {         
            $this->electorService->vote($cpf, $birthDate, $numberOfCandidate);
            
            return redirect()->route("elector.dashboard");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("elector.dashboard")->withErrors($json);
        } 

    }

    public function viewSearchElector() {
        return view("elector.search-elector", [
            "voteOfElector" => null
        ]);
    }

    public function httpSearchElector(Request $request) {
        $validatedData = $request->validate([
            "yearElection" => ["required", "string", "size:4"],
            "monthElection" => ["required", "string", "size:2"],
            "cpf" => ["required", "string", "size:11"],
            "passwordGenerated" => ["required", "string"]            
        ]);

        $cpf = $request->input("cpf");
        $year = $request->input("yearElection");
        $month = $request->input("monthElection");
        $passwordGenerated = $request->input("passwordGenerated");

        try {         
            $voteOfElector = $this->electorService->searchElector($cpf, $year, $month, $passwordGenerated);
            
            return view("elector.search-elector", [
                "voteOfElector" => $voteOfElector
            ]);
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("elector.dashboard")->withErrors($json);
        } 

    }

    private function searchElectionResearchInProgress() {
        echo [];
    }

    private function searchElectionResearchClosed() {
        echo [];
    }

}
