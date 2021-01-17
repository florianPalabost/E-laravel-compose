<?php

namespace App\Providers;

use App\Repository\ProductQueries;
use App\Repository\ProductQueriesImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // todo dynamically bind one interface to it(their) impl
        $this->app->bind(ProductQueries::class, ProductQueriesImpl::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
