<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/apply')->name('home');

Route::get('/apply', [ApplyController::class, 'create'])->name('apply.create');
Route::post('/apply', [ApplyController::class, 'store'])->name('apply.store');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('students', StudentController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('courses', CourseController::class);

    Route::post('students/{student}/enrollments', [EnrollmentController::class, 'store'])->name('students.enrollments.store');
    Route::delete('enrollments/{enrollment}', [EnrollmentController::class, 'destroy'])->name('enrollments.destroy');

    Route::resource('applications', ApplicationController::class)->only(['index', 'show']);
    Route::post('applications/{application}/approve', [ApplicationController::class, 'approve'])->name('applications.approve');
    Route::post('applications/{application}/reject', [ApplicationController::class, 'reject'])->name('applications.reject');
});

require __DIR__.'/auth.php';
