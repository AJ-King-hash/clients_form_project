<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleLanguage
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->cookie('locale', config('app.locale', 'en'));

        if (in_array($locale, ['en', 'ar'])) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
