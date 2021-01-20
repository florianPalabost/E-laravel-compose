<?php

namespace App\Providers;

use App\Category;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Repository\ProductQueriesImpl;
use App\Repository\Queries;
use App\Repository\CategoryQueriesImpl;
use App\Services\CategoryService;
use App\Services\ProductService;
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
        // bind one interface to it impl
//        $this->app->bind(Queries::class, CategoryQueriesImpl::class);

        $this->app->when(ProductService::class)
            ->needs(Queries::class)
            ->give(function () {return new ProductQueriesImpl();});

        $this->app->when(CategoryService::class)
            ->needs(Queries::class)
            ->give(function () {return new CategoryQueriesImpl();});
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
