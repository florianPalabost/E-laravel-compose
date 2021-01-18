<?php

namespace App\Repository;

use App\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    public function retrieveAll(): Collection|array
    {
        return Product::all();
    }

    public function save(array $all)
    {
        return Product::create($all);
    }

    public function update(array $input, int $id): int|string
    {
        try {
            if (!empty($id)) {
                return Product::where('id', $id)->update($input);
            }
            return 'id pass is empty';
        }
        catch (ModelNotFoundException $e) {
            return $e->getMessage();
        }
    }

    public function delete(int $id): int|string
    {
       try {
            return Product::destroy($id);
       }
       catch (ModelNotFoundException $e) {
            return $e->getMessage();
       }
    }
}
