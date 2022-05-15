<?php

namespace App\Http\Service;

use Illuminate\Support\Facades\Http;
use App\Exceptions\RequestError;

class AdminService {

    public function authenticate(string $email, string $password) {
        try {
            $response = Http::admin()->post("/auth", [
                "email" => $email,
                "password" => $password
            ]);
        
        } catch (\Exception $e) {
            throw new RequestError();
        }

        if ($response->serverError()) {
            throw new RequestError();
        }

        if ($response->clientError()) {
            throw new RequestError($response->json()["message"]);
        }
        
        if ($response->successful()) {                        
            $token = $response->json()["token"];            
            return $token;                     
        }
    }    

    private function getToken()
    {
        $cookieInstance = session("admin-api-token");
        $token = $cookieInstance->getValue();
        
        return $token;
    }

    public function searchElectionResearchWithoutStarting()
    {
        $token = $this->getToken();   

        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->get("/search-election-research-without-starting");
            
            $this->checkResponse($response);

            return $response->json()["result"];
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();        
        }
    }

    private function checkResponse($response) {
        $json = $response->json();
        
        if ($response->clientError()) {            
            if (array_key_exists("message", $json)) {
                throw new RequestError($json["message"]);
            }
            throw new RequestError();
        }

        if ($response->serverError()) {
            if (array_key_exists("message", $json)) {
                throw new RequestError($json["message"]);
            }
            throw new RequestError();
        }
        
        if ($response->successful()) {           
            if (!$json) {
                $json = [];
            }

            if (array_key_exists("result", $json)) {
                return $json["result"];                        
            }

            return $json;                        
        }
    }

    public function searchElectionResearchInProgress()
    {
        $token = $this->getToken();   

        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->get("/search-election-research-in-progress");
            
            $this->checkResponse($response);

            return $response->json()["result"];
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        
        }       
    }

    public function searchElectionResearchClosed()
    {
        $token = $this->getToken();   

        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->get("/search-election-research-closed");
            
            $this->checkResponse($response);

            return $response->json()["result"];
        
        }  catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();        
        } 
    }   

    public function createElectionResearch(string $year, string $month) {
        $token = $this->getToken();   
        
        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->post("/create-election-research", [
                "yearElection" => $year,
                "monthElection" => $month
            ]);
            
            $this->checkResponse($response);
        
        } catch (RequestError $e) {            
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }

    public function insertCandidate(string $nameOfCandidate, string $numberOfCandidate, $photoUrl) {
        $token = $this->getToken();   
        
        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->post("/insert-candidate-in-the-election-research", [
                "nameOfCandidate" => $nameOfCandidate,
                "numberOfCandidate" => $numberOfCandidate,
                "photoUrl" => $photoUrl           
            ]);
            
            $this->checkResponse($response);
        
        } catch (RequestError $e) {            
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {            
            throw new RequestError();
        }
    }

    public function removeCandidate(string $numberOfCandidate) {
        $token = $this->getToken();   
        
        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->delete("/remove-candidate-of-election-research", [
                "numberOfCandidate" => $numberOfCandidate,                
            ]);

            $this->checkResponse($response);
        
        } catch (RequestError $e) {             
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }

    public function beginCollectingVotes() {
        $token = $this->getToken();   
        
        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->post("/begin-collecting-votes");

            $this->checkResponse($response);
        
        } catch (RequestError $e) {             
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }  
    
    public function finishElectionResearch() {
        $token = $this->getToken();   
        
        try {
            $response = Http::admin()->withHeaders([
                "token" => $token
            ])->post("/finish-election-research");

            $this->checkResponse($response);
        
        } catch (RequestError $e) {             
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }  
}