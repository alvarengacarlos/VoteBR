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

    private function getToken()
    {
        $cookieInstance = session("admin-api-token");
        $token = $cookieInstance->getValue();
        
        return $token;
    }

}