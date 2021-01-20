<?php

namespace App\Services;

use App\Category;
use App\Repository\Queries;

class CategoryService {
    public function __construct(private Queries $categoryRepository)
    {

    }

    public function retrieveAll()
    {
        return $this->categoryRepository->retrieveAll();
    }

    public function retrieveById(int $id): Category
    {
        return $this->categoryRepository->retrieveById($id);
    }

    public function create(array $all)
    {
        return $this->categoryRepository->save($all);
    }

    public function update(array $input, int $id)
    {
        return $this->categoryRepository->update($input, $id);
    }

    public function destroy(int $id)
    {
        return $this->categoryRepository->delete($id);
    }
}
