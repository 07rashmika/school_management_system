<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $courses = Course::query()
            ->search($request->string('search')->value() ?: null)
            ->with('teacher:id,first_name,last_name')
            ->withCount('enrollments')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('courses/index', [
            'courses' => $courses,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('courses/create', [
            'teachers' => Teacher::query()->orderBy('first_name')->get(['id', 'first_name', 'last_name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseRequest $request): RedirectResponse
    {
        $course = Course::create($request->validated());

        return redirect()->route('courses.show', $course)->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course): Response
    {
        $course->load(['teacher', 'enrollments.student']);

        return Inertia::render('courses/show', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course): Response
    {
        return Inertia::render('courses/edit', [
            'course' => $course,
            'teachers' => Teacher::query()->orderBy('first_name')->get(['id', 'first_name', 'last_name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        return redirect()->route('courses.show', $course)->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course): RedirectResponse
    {
        if ($course->enrollments()->exists() || $course->applications()->exists()) {
            return back()->with('error', 'This course has enrollments or applications and cannot be deleted.');
        }

        $course->delete();

        return redirect()->route('courses.index')->with('success', 'Course removed successfully.');
    }
}
