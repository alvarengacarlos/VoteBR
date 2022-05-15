<?php

namespace App\Http\Service;

use Illuminate\Support\Facades\Http;
use App\Exceptions\RequestError;

class ElectorService {

    public function authenticate() {
        try {
            $electorEmail = env("API_ELECTOR_EMAIL");
            $electorPass = env("API_ELECTOR_PASSWORD");
            $response = Http::elector()->post("/auth", [
                "email" => $electorEmail,
                "password" => $electorPass
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

    public function searchElectionResearchInProgress()
    {
        $token = $this->getToken();   

        try {
            $response = Http::elector()->withHeaders([
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

    public function vote(string $cpf, string $birthDate, string $numberOfCandidate) {
        $token = $this->getToken();   
        
        try {
            $response = Http::elector()->withHeaders([
                "token" => $token
            ])->post("/vote", [
                "cpf" => $cpf,
                "birthDate" => $birthDate,
                "numberOfCandidate" => $numberOfCandidate
            ]);
            
            $this->checkResponse($response);
        
        } catch (RequestError $e) {            
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }

    private function getToken()
    {
        $cookieInstance = session("elector-api-token");
        $token = $cookieInstance->getValue();
        
        return $token;
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

    public function searchElector(string $cpf, string $year, string $month, string $passwordGenerated) {
        $token = $this->getToken();   
        
        try {
            $response = Http::elector()->withHeaders([
                "token" => $token
            ])->post("/search-elector", [                
                "yearElection" => $year,
                "monthElection" => $month,                
                "cpf" => $cpf
            ]);

            return $this->checkResponse($response);
        
        } catch (RequestError $e) {                       
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();
        }
    }

    public function searchElectionResearchClosed() {
        $token = $this->getToken();   

        try {
            $response = Http::elector()->withHeaders([
                "token" => $token
            ])->get("/search-election-research-closed");
            
            $this->checkResponse($response);

            return $response->json()["result"];
        
        } catch (RequestError $e) {
            throw new RequestError($e->getMessage());
        
        } catch (\Exception $e) {
            throw new RequestError();        
        }   
    }
}