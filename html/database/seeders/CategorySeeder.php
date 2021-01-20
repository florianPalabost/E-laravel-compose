<?php

namespace Database\Seeders;

use App\Category;
use App\Product;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        Category::factory()
            ->has(Product::factory()->count(random_int(1,10)))
            ->count(10)
            ->create();
    }
}
