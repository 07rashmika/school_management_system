<?php

namespace App\Http\Controllers;

use App\Enums\EnrollmentStatus;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    /**
     * Enroll the student in an additional course.
     */
    public function store(Request $request, Student $student): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => [
                'required',
                Rule::exists('courses', 'id'),
                Rule::unique('enrollments')->where('student_id', $student->id),
            ],
        ]);

        $student->enrollments()->create([
            'course_id' => $validated['course_id'],
            'status' => EnrollmentStatus::Active,
            'enrolled_at' => now(),
        ]);

        return back()->with('success', 'Student enrolled in course.');
    }

    /**
     * Withdraw the student from the course.
     */
    public function destroy(Enrollment $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return back()->with('success', 'Enrollment removed.');
    }
}
