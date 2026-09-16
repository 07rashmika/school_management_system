<?php

namespace App\Http\Controllers;

use App\Actions\Applications\ApproveApplication;
use App\Enums\ApplicationStatus;
use App\Http\Requests\RejectApplicationRequest;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $status = $request->string('status')->value() ?: null;

        $applications = Application::query()
            ->search($request->string('search')->value() ?: null)
            ->when($status, fn ($query) => $query->where('status', $status))
            ->with('course:id,name')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('applications/index', [
            'applications' => $applications,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application): Response
    {
        $application->load(['course', 'student', 'reviewer']);

        return Inertia::render('applications/show', [
            'application' => $application,
        ]);
    }

    /**
     * Approve the application, creating or reusing a student record and enrolling them.
     */
    public function approve(Application $application, ApproveApplication $action): RedirectResponse
    {
        if ($application->status !== ApplicationStatus::Pending) {
            return back()->with('error', 'This application has already been reviewed.');
        }

        $action->handle($application, Auth::user());

        return back()->with('success', 'Application approved and student enrolled.');
    }

    /**
     * Reject the application with a reason.
     */
    public function reject(RejectApplicationRequest $request, Application $application): RedirectResponse
    {
        if ($application->status !== ApplicationStatus::Pending) {
            return back()->with('error', 'This application has already been reviewed.');
        }

        $application->update([
            'status' => ApplicationStatus::Rejected,
            'rejection_reason' => $request->validated('rejection_reason'),
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);

        return back()->with('success', 'Application rejected.');
    }
}
