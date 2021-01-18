<?php

namespace App\Repository;

use App\Product;

interface ProductQueries {
    public function retrieveById($id): Product;
    public function retrieveByName(string $name): Product;
    public function retrieveAll();

    public function save(array $all);

    public function update(array $input, int $id);

    public function delete(int $id);
}
