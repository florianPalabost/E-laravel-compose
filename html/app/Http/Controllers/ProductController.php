<?php

namespace App\Http\Controllers;

use App\Product;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{

    public function __construct(private ProductService $productService)
    {

    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $products = $this->productService->retrieveAll();
        return new JsonResponse(ProductResource::collection($products));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|min:3',
            'price' => 'required'
        ]);

        if ($validator->fails()) {
            return new JsonResponse(['success'=> false, 'errors' => $validator->errors()], 400);
        }

        try {
            $product = $this->productService->create($request->all());
            return new JsonResponse(['success' => true, 'product' => $product], 201);
        }catch (\Exception $e) {
            return new JsonResponse(['success'=> false,'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $product = $this->productService->retrieveById($id);
            return new JsonResponse($product);
        }
        catch (ModelNotFoundException $e) {
            return new JsonResponse(['success' => false, 'error'=> $e->getMessage()], 400);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id) : JsonResponse
    {
        $input = $request->all();
        try {
            $isUpdated = $this->productService->update($input, $id);
            if ($isUpdated) {
                $product = $this->productService->retrieveById($id);
                return new JsonResponse(['success' => true, 'product' => $product]);
            }
            return new JsonResponse(['success' => false, 'error' => 'Product has not been updated'], 500);
        }
        catch (ModelNotFoundException $e) {
            return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $isDeleted = $this->productService->destroy($id);
            return new JsonResponse(['success'=> $isDeleted], $isDeleted ? 200:500 );
        }
        catch (ModelNotFoundException $e) {
            return new JsonResponse(['success'=> false, 'error' => $e->getMessage()], 500 );
        }
    }
}
