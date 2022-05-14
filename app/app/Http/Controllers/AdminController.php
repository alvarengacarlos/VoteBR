<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $adminTokenExists = $request->session()->has("admin-api-token");
        $cookieInstance = $request->session()->get("admin-api-token");

        if ($adminTokenExists && $cookieInstance->getMaxAge() > 0) {
            return redirect()->route("admin.dashboard");
        }
        
        return view("admin.login");
    }
    
    public function auth(Request $request)
    {
        $validatedData = $request->validate([
            "email" => ["required", "email:rfc"],
            "password" => ["required", "string"],
        ]);

        $email = $request->input("email");
        $password = $request->input("password");

        $response = Http::admin()->post("/auth", [
            "email" => $email,
            "password" => $password
        ]);
        
        if ($response->failed() ||
            $response->clientError() ||
            $response->serverError()
        ) {
            $json = $response->json();
            return back()->withErrors($json);
        }

        if ($response->successful()) {
            $token = $response->json()["token"];

            $minutes = 60;
            $cookie = cookie("token", $token, $minutes);
            session()->put("admin-api-token", $cookie);

            return redirect()->route("admin.dashboard");
        }
        
    }

    public function dashboard()
    {
        $token = $this->getToken();
        
        $responseWithoutStarting = Http::admin()->withHeaders([
            "token" => $token
        ])->get("/search-election-research-without-starting");

        $this->verifyIfResponseFail($responseWithoutStarting);
        
        $responseInProcess = Http::admin()->withHeaders([
            "token" => $token
        ])->get("/search-election-research-in-progress");

        $this->verifyIfResponseFail($responseInProcess);

        $responseClosed = Http::admin()->withHeaders([
            "token" => $token
        ])->get("/search-election-research-closed");

        $this->verifyIfResponseFail($responseClosed);
        
        $electionResearchWithoutStartingArray = $responseWithoutStarting->json()["result"];
        $electionResearchInProgressArray = $responseInProcess->json()["result"];
        $electionResearchClosedArray = $responseClosed->json()["result"];
        
        return view("admin.dashboard", [
            "electionResearchWithoutStartingArray" => $electionResearchWithoutStartingArray,
            "electionResearchInProgressArray" => $electionResearchInProgressArray,
            "electionResearchClosedArray" => $electionResearchClosedArray
        ]);
    }

    private function getToken()
    {
        $cookieInstance = session("admin-api-token");
        $token = $cookieInstance->getValue();
        
        return $token;
    }

    private function verifyIfResponseFail($response) {
        if ($response->failed() ||
            $response->clientError() ||
            $response->serverError()
        ) {
            $json = $response->json();
            dd($json);
            return view("admin.dashboard", ["errors" => $json]);
        }
    }

    private function searchElectionResearchWithoutStarting()
    {
        echo [];
    }

    private function searchElectionResearchInProgress()
    {
        echo [];
    }

    private function searchElectionResearchClosed()
    {
        echo [];
    }

    private function searchElectionResearch(Request $request)
    {
        $validatedData = $request->validate([
            "year" => ["required", "string", "size:4"],
            "month" => ["required", "string", "size:2"],
        ]);

        $year = $request->input("year");
        $month = $request->input("month");

        echo $year;
        echo $month;
    }

    public function createElectionResearch(Request $request)
    {
        $validatedData = $request->validate([
            "year" => ["required", "string", "size:4"],
            "month" => ["required", "string", "size:2"],
        ]);

        $year = $request->input("year");
        $month = $request->input("month");

        echo $year;
        echo $month;
    }

    public function insertCandidate(Request $request)
    {
        $validatedData = $request->validate([
            "nameOfCandidate" => ["required", "string"],
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $nameOfCandidate = $request->input("nameOfCandidate");
        $numberOfCandidate = $request->input("numberOfCandidate");

        echo $nameOfCandidate;
        echo $numberOfCandidate;
    }

    public function removeCandidate(Request $request)
    {
        $validatedData = $request->validate([
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $numberOfCandidate = $request->input("numberOfCandidate");

        echo $numberOfCandidate;
    }

    public function beginCollectingVotes()
    {
        echo "Iniciou coleta de votos";
    }

    public function finishElectionResearch()
    {
        echo "Finalizou coleta de votos e pesquisa eleitoral";
    }
}
