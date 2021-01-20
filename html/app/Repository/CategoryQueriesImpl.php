<?php

namespace App\Repository;

use App\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryQueriesImpl implements Queries
{
    public function retrieveById($id): Category
    {
        return Category::findOrFail($id);
    }

    public function retrieveByName(string $name): Category
    {
       return Category::where('name', $name)->first();
    }

    public function retrieveAll(): Collection|array
    {
        return Category::all();
    }

    public function save(array $all)
    {
        return Category::create($all);
    }

    public function update(array $input, int $id): int|string
    {
        try {
            if (!empty($id)) {
                return Category::where('id', $id)->update($input);
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
            return Category::destroy($id);
       }
       catch (ModelNotFoundException $e) {
            return $e->getMessage();
       }
    }
}
