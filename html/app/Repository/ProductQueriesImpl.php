<?php

namespace App\Repository;

use App\Product;

class ProductQueriesImpl implements ProductQueries
{
    public function retrieveById($id): Product
    {
        return Product::findOrFail($id);
    }

    public function retrieveByName(string $name): Product
    {
       return Product::where('name', $name)->first();
    }

    public function retrieveAll()
    {
        return Product::all();
    }
}
