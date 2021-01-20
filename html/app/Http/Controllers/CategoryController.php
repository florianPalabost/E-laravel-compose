<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function __construct(private CategoryService $categoryService)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = $this->categoryService->retrieveAll();
        return new JsonResponse(CategoryResource::collection($categories));
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
        ]);

        if ($validator->fails()) {
            return new JsonResponse(['success'=> false, 'errors' => $validator->errors()], 400);
        }

        try {
            $category = $this->categoryService->create($request->all());
            return new JsonResponse(['success' => true, 'category' => $category], 201);
        }catch (\Exception $e) {
            return new JsonResponse(['success'=> false,'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the differents products of a category
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        //
    }



    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $input = $request->all();
        try {
            $isUpdated = $this->categoryService->update($input, $id);
            if ($isUpdated) {
                $category = $this->categoryService->retrieveById($id);
                return new JsonResponse(['success' => true, 'category' => $category]);
            }
            return new JsonResponse(['success' => false, 'error' => 'Category has not been updated'], 500);
        }
        catch (ModelNotFoundException $e) {
            return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $isDeleted = $this->categoryService->destroy($id);
            return new JsonResponse(['success'=> $isDeleted], $isDeleted ? 200:500 );
        }
        catch (ModelNotFoundException $e) {
            return new JsonResponse(['success'=> false, 'error' => $e->getMessage()], 500 );
        }
    }
}
