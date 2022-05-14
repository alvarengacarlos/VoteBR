<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyElectorApiToken
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
        $electorTokenExists = $request->session()->has("elector-api-token");
        if (!$electorTokenExists) {
            return redirect()->route("elector.login");
        }

        $cookieInstance = $request->session()->get("elector-api-token");                       
        if ($cookieInstance->getMaxAge() == 0) {
            return redirect()->route("elector.login");
        }
        return $next($request);
    }
}
