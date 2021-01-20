<?php

namespace App\Repository;

use App\Category;
use App\Product;

interface Queries {
    public function retrieveById($id): Product|Category;
    public function retrieveByName(string $name): Product|Category;
    public function retrieveAll();

    public function save(array $all);

    public function update(array $input, int $id);

    public function delete(int $id);
}
