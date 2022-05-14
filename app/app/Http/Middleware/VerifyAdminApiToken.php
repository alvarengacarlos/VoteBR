<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyAdminApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $adminTokenExists = $request->session()->has("admin-api-token");
        if (!$adminTokenExists) {
            return redirect()->route("admin.login");
        }

        $cookieInstance = $request->session()->get("admin-api-token");                       
        if ($cookieInstance->getMaxAge() == 0) {
            return redirect()->route("admin.login");
        }
        return $next($request);
    }
}
