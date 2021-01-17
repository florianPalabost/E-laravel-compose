<?php

namespace App\Repository;

use App\Product;

interface ProductQueries {
    public function retrieveById($id): Product;
    public function retrieveByName(string $name): Product;
    public function retrieveAll();

//    public function save();
//    public function update();
//    public function delete();
}
