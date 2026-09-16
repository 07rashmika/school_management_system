<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $students = Student::query()
            ->search($request->string('search')->value() ?: null)
            ->withCount('enrollments')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('students/index', [
            'students' => $students,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request): RedirectResponse
    {
        $student = Student::create([
            ...$request->validated(),
            'admission_number' => Student::generateAdmissionNumber(),
        ]);

        return redirect()->route('students.show', $student)->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student): Response
    {
        $student->load(['enrollments.course']);

        $availableCourses = Course::query()
            ->whereNotIn('id', $student->enrollments->pluck('course_id'))
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        return Inertia::render('students/show', [
            'student' => $student,
            'availableCourses' => $availableCourses,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student): Response
    {
        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, Student $student): RedirectResponse
    {
        $student->update($request->validated());

        return redirect()->route('students.show', $student)->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student removed successfully.');
    }
}
