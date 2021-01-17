<?php

namespace App\Services;

use App\Repository\ProductQueries;

class ProductService {
    private ProductQueries $productRepository;

    public function __construct(ProductQueries $productQueries)
    {
        $this->productRepository = $productQueries;
    }

    public function retrieveAll()
    {
        return $this->productRepository->retrieveAll();
    }
}
