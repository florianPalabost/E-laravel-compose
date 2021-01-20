<?php

namespace App\Services;

use App\Product;
use App\Repository\Queries;

class ProductService {
    public function __construct(private Queries $productRepository)
    {

    }

    public function retrieveAll()
    {
        return $this->productRepository->retrieveAll();
    }

    public function retrieveById(int $id): Product
    {
        return $this->productRepository->retrieveById($id);
    }

    public function create(array $all)
    {
        return $this->productRepository->save($all);
    }

    public function update(array $input, int $id)
    {
        return $this->productRepository->update($input, $id);
    }

    public function destroy(int $id)
    {
        return $this->productRepository->delete($id);
    }
}
