<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $apiUrl = env("API_CONTRACT_URL");

        Http::macro("admin", function () use ($apiUrl) {
            return Http::baseUrl("{$apiUrl}/admin");
        });

        Http::macro("elector", function () use ($apiUrl) {
            return Http::baseUrl("{$apiUrl}/elector");
        });
    }
}
