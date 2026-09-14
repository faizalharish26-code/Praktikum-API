<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Blog;

// B - BROWSE (Get All)
Route::get('/blogs', function() {
    return response()->json([
        'status' => 'success',
        'data'   => Blog::all()
    ], 200);
});

// R - READ (Get Detail)
Route::get('/blogs/{id}', function($id) {
    $blog = Blog::findOrFail($id);

    return response()->json([
        'status'  => 'success',
        'message' => 'Detail blog ditemukan',
        'data'    => $blog
    ], 200);
});

// A - ADD (Create Data)
Route::post('/blogs', function(Request $request) {
    $validated = $request->validate([
        'title'   => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    $blog = Blog::create($validated);

    return response()->json([
        'status'  => 'success',
        'message' => 'Blog berhasil dibuat',
        'data'    => $blog
    ], 201);
});

// E - EDIT (Update Data)
Route::put('/blogs/{id}', function(Request $request, $id) {
    $blog = Blog::findOrFail($id);

    $validated = $request->validate([
        'title'   => 'sometimes|required|string|max:255',
        'content' => 'sometimes|required|string',
    ]);

    $blog->update($validated);

    return response()->json([
        'status'  => 'success',
        'message' => 'Blog berhasil diperbarui',
        'data'    => $blog
    ], 200);
});

// D - DELETE (Remove Data)
Route::delete('/blogs/{id}', function($id) {
    $blog = Blog::findOrFail($id);
    $blog->delete();

    return response()->json([
        'status'  => 'success',
        'message' => 'Blog berhasil dihapus'
    ], 200);
});