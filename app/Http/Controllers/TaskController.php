<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Show Task Dashboard
     */
    public function index(): Response
    {
        Log::info('Get /');
        $startTime = microtime(true);

        // Simple cache-aside logic
        if (Cache::has('tasks')) {
            $data = Cache::get('tasks');
        } else {
            $data = Task::orderBy('created_at', 'asc')->get();
            Cache::add('tasks', $data);
        }

        return Inertia::render('Tasks', [
            'tasks' => $data,
            'elapsed' => microtime(true) - $startTime,
        ]);
    }

    /**
     * Add New Task
     */
    public function store(Request $request)
    {
        Log::info('Post /task');

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:250',
            'description' => 'required|max:1000',
        ]);

        if ($validator->fails()) {
            Log::error('Add task failed.');

            return redirect('/')
                ->withInput()
                ->withErrors($validator);
        }

        $task = new Task;
        $task->name = $request->name;
        $task->description = $request->description;
        $task->save();

        // Clear the cache
        Cache::flush();

        return to_route('tasks.index');
    }

    /**
     * Delete Task
     */
    public function destroy($id)
    {
        Log::info('Delete /task/'.$id);
        Task::findOrFail($id)->delete();

        // Clear the cache
        Cache::flush();

        return to_route('tasks.index');
    }
}
