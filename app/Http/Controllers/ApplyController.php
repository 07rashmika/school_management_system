<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApplyController extends Controller
{
    /**
     * Show the public admission application form.
     */
    public function create(): Response
    {
        return Inertia::render('apply/create', [
            'courses' => Course::query()->orderBy('name')->get(['id', 'name', 'code']),
        ]);
    }

    /**
     * Submit a new admission application.
     */
    public function store(ApplicationRequest $request): RedirectResponse
    {
        Application::create($request->validated());

        return redirect()->route('apply.create')->with('success', 'Your application has been submitted. We will contact you once it has been reviewed.');
    }
}
