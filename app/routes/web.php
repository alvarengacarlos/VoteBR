<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ElectorController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name("welcome");

Route::name("elector.")->prefix("/elector")->group(function () {

    Route::get("/login", [ElectorController::class, "viewLogin"])->name("login");

    Route::post("/auth", [ElectorController::class, "auth"])->name("auth");

    Route::get("/dashboard", [ElectorController::class, "viewDashboard"])
        ->middleware("verify-elector-api-token")
        ->name("dashboard");
    
    Route::post("/view-vote", [ElectorController::class, "viewVote"])
        ->middleware("verify-elector-api-token")
        ->name("view-vote");
    
    Route::post("/view-search-elector", [ElectorController::class, "viewSearchElector"])
        ->middleware("verify-elector-api-token")
        ->name("view-search-elector");

    Route::get("/view-results-in-progress", [ElectorController::class, "viewResultsInProgress"])
        ->middleware("verify-elector-api-token")
        ->name("view-results-in-progress");
    
    Route::get("/view-results-closed", [ElectorController::class, "viewResultsClosed"])
        ->middleware("verify-elector-api-token")
        ->name("view-results-closed");

});

Route::name("admin.")->prefix("/admin")->group(function () {

    //Views
    Route::get("/login", [AdminController::class, "viewLogin"])->name("login");

    Route::post("/auth", [AdminController::class, "auth"])->name("auth");
    
    Route::get("/dashboard", [AdminController::class, "viewDashboard"])
        ->middleware("verify-admin-api-token")
        ->name("dashboard");
        
    Route::get("/view-create-er", [AdminController::class, "viewCreateElectionResearch"])
        ->middleware("verify-admin-api-token")
        ->name("view-create-er");
    
    Route::get("/view-erws", [AdminController::class, "viewElectionResearchWithoutStarting"])
        ->middleware("verify-admin-api-token")
        ->name("view-erws");
    
    Route::get("/view-erip", [AdminController::class, "viewElectionResearchInProgress"])
        ->middleware("verify-admin-api-token")
        ->name("view-erip");
    
    Route::get("/view-erc", [AdminController::class, "viewElectionResearchClosed"])
        ->middleware("verify-admin-api-token")
        ->name("view-erc");

    //Http Requests
    
    Route::post("/http-create-er", [AdminController::class, "httpCreateElectionResearch"])
        ->middleware("verify-admin-api-token")
        ->name("http-create-er");
    
    Route::post("/http-insert-candidate", [AdminController::class, "insertCandidate"])
        ->middleware("verify-admin-api-token")
        ->name("http-insert-candidate");
    
    Route::delete("/http-remove-candidate", [AdminController::class, "removeCandidate"])
        ->middleware("verify-admin-api-token")
        ->name("http-remove-candidate");
    
    Route::post("/http-begin-collecting-votes", [AdminController::class, "beginCollectingVotes"])
        ->middleware("verify-admin-api-token")
        ->name("http-begin-collecting-votes");

    Route::post("/http-finish-election-research", [AdminController::class, "finishElectionResearch"])
        ->middleware("verify-admin-api-token")
        ->name("http-finish-election-research");
});