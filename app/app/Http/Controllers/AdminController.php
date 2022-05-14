<?php

namespace App\Http\Controllers;

use App\Http\Service\AdminService;
use Illuminate\Http\Request;
use App\Exceptions\RequestError;
use Illuminate\Support\MessageBag;

class AdminController extends Controller
{
    public function __construct(AdminService $adminService) {
        $this->adminService = $adminService;
    }

    public function viewLogin(Request $request)
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
        
        $errors = [];
        try {
            $token = $this->adminService->authenticate($email, $password);
            $this->createSession($token); 
                        
            return redirect()->route("admin.dashboard");

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
        session()->put("admin-api-token", $cookie);        
    }

    public function viewDashboard()
    {   
        return view("admin.dashboard");
    }

    public function viewCreateElectionResearch()
    {           
        return view("admin.election-research.create");
    }    
    
    public function viewElectionResearchWithoutStarting()
    {   
        try {         
            $electionResearchArray = $this->adminService->searchElectionResearchWithoutStarting();            
            
            return view("admin.election-research.without-starting", [
                "electionResearchArray" => $electionResearchArray
            ]);
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.dashboard")->withErrors($json);
        }        
    }

    public function viewElectionResearchInProgress()
    {          
        try {         
            $electionResearchArray = $this->adminService->searchElectionResearchInProgress();            
            
            return view("admin.election-research.in-progress", [
                "electionResearchArray" => $electionResearchArray
            ]);
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.dashboard")->withErrors($json);
        } 
    }
    
    public function viewElectionResearchClosed()
    {   
        try {         
            $electionResearchArray = $this->adminService->searchElectionResearchClosed();            
            
            return view("admin.election-research.closed", [
                "electionResearchArray" => $electionResearchArray
            ]);
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.dashboard")->withErrors($json);
        } 
    }
    
    // private function searchElectionResearch(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         "year" => ["required", "string", "size:4"],
    //         "month" => ["required", "string", "size:2"],
    //     ]);

    //     $year = $request->input("year");
    //     $month = $request->input("month");

    //     echo $year;
    //     echo $month;
    // }

    public function httpCreateElectionResearch(Request $request)
    {
        $validatedData = $request->validate([
            "year" => ["required", "string", "size:4"],
            "month" => ["required", "string", "size:2"],
        ]);

        $year = $request->input("year");
        $month = $request->input("month");

        try {         
            $this->adminService->createElectionResearch($year, $month);
            
            return redirect()->route("admin.view-erws");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.view-create-er")->withErrors($json);
        } 
    }

    public function insertCandidate(Request $request)
    {
        $validatedData = $request->validate([
            "nameOfCandidate" => ["required", "string"],
            "numberOfCandidate" => ["required", "string", "size:2"],
            "urlPhoto" => ["required", "url"]
        ]);

        $nameOfCandidate = $request->input("nameOfCandidate");
        $numberOfCandidate = $request->input("numberOfCandidate");
        $urlPhoto = $request->input("urlPhoto");

        try {         
            $this->adminService->insertCandidate($nameOfCandidate, $numberOfCandidate, $urlPhoto);
            
            return redirect()->route("admin.view-erws");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.view-erws")->withErrors($json);
        }
    }

    public function removeCandidate(Request $request)
    {
        $validatedData = $request->validate([
            "numberOfCandidate" => ["required", "string", "size:2"],
        ]);

        $numberOfCandidate = $request->input("numberOfCandidate");

        try {         
            $this->adminService->removeCandidate($numberOfCandidate);
            
            return redirect()->route("admin.view-erws");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.view-erws")->withErrors($json);
        }
    }

    public function beginCollectingVotes()
    {
        try {         
            $this->adminService->beginCollectingVotes();
            
            return redirect()->route("admin.view-erip");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.view-erws")->withErrors($json);
        }
    }

    public function finishElectionResearch()
    {
        try {         
            $this->adminService->finishElectionResearch();
            
            return redirect()->route("admin.view-erc");
        
        } catch (RequestError $e) {
            $json = new MessageBag([$e->getMessage()]);
            return redirect()->route("admin.view-erip")->withErrors($json);
        }
    }
}
