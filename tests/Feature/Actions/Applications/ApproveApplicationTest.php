<?php

use App\Actions\Applications\ApproveApplication;
use App\Enums\ApplicationStatus;
use App\Enums\EnrollmentStatus;
use App\Models\Application;
use App\Models\Course;
use App\Models\Student;
use App\Models\User;

test('creates a student, enrolls them, and marks the application approved', function () {
    $admin = User::factory()->create();
    $course = Course::factory()->create();
    $application = Application::factory()->create(['course_id' => $course->id]);

    $student = (new ApproveApplication)->handle($application, $admin);

    expect($student)->toBeInstanceOf(Student::class);
    expect($student->admission_number)->not->toBeEmpty();
    expect($student->email)->toBe($application->email);

    expect($application->refresh())
        ->status->toBe(ApplicationStatus::Approved)
        ->student_id->toBe($student->id)
        ->reviewed_by->toBe($admin->id);

    $this->assertDatabaseHas('enrollments', [
        'student_id' => $student->id,
        'course_id' => $course->id,
        'status' => EnrollmentStatus::Active->value,
    ]);
});

test('generates a unique admission number for each new student', function () {
    $admin = User::factory()->create();
    $course = Course::factory()->create();

    $first = (new ApproveApplication)->handle(Application::factory()->create(['course_id' => $course->id]), $admin);
    $second = (new ApproveApplication)->handle(Application::factory()->create(['course_id' => $course->id]), $admin);

    expect($first->admission_number)->not->toBe($second->admission_number);
});
