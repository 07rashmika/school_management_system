<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with summary statistics.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_students' => Student::query()->count(),
                'total_teachers' => Teacher::query()->count(),
                'total_courses' => Course::query()->count(),
                'pending_applications' => Application::query()->where('status', ApplicationStatus::Pending)->count(),
                'approved_applications' => Application::query()->where('status', ApplicationStatus::Approved)->count(),
                'rejected_applications' => Application::query()->where('status', ApplicationStatus::Rejected)->count(),
            ],
            'recentApplications' => Application::query()
                ->with('course:id,name')
                ->latest()
                ->take(5)
                ->get(),
            'topCourses' => Course::query()
                ->withCount('enrollments')
                ->orderByDesc('enrollments_count')
                ->take(5)
                ->get(['id', 'name', 'code']),
        ]);
    }
}
