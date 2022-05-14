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
        
        } catch (\Exception $e) {
            throw new RequestError();
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        }
    }

    private function checkResponse($response) {
        if ($response->clientError()) {
            throw new RequestError($response->json()["message"]);
        }
        
        if ($response->successful()) {                        
            return $response->json()["result"];                        
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
        
        } catch (\Exception $e) {
            throw new RequestError();
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
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
        
        } catch (\Exception $e) {
            throw new RequestError();
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        }  
    }   

}