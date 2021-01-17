<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{

    public function __construct(private ProductService $productService)
    {

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response|JsonResponse
     */
    public function index()
    {
        $products = $this->productService->retrieveAll();
//        $data = [
//            [
//                'product_id' => 1,
//                'name' => 'Toto product',
//                'description' => 'kefkfopzfzopeikfopzeif$pizopfiezop',
//                'price' => '15',
//            ],
//            [
//                'product_id' => 2,
//                'name' => 'Titi product',
//                'description' => 'kefkfopzfzopeikfopzeif$pizopfiezop',
//                'price' => '11',
//            ],
//        ];
//        return new JsonResponse($data);
        return new JsonResponse(ProductResource::collection($products));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
