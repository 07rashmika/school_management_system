<?php

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Course;
use App\Models\Student;
use App\Models\User;

test('guests are redirected to login when viewing applications', function () {
    $this->get(route('applications.index'))->assertRedirect(route('login'));
});

test('includes the computed full name for an application', function () {
    $this->actingAs(User::factory()->create());

    $application = Application::factory()->create(['first_name' => 'Sam', 'last_name' => 'Rivera']);

    $response = $this->get(route('applications.show', $application));

    $response->assertInertia(fn ($page) => $page->component('applications/show')->where('application.full_name', 'Sam Rivera'));
});

test('filters applications by status', function () {
    $this->actingAs(User::factory()->create());

    Application::factory()->create();
    Application::factory()->rejected()->create();

    $response = $this->get(route('applications.index', ['status' => 'rejected']));

    $response->assertInertia(fn ($page) => $page->component('applications/index')
        ->has('applications.data', 1)
        ->where('applications.data.0.status', 'rejected'));
});

test('approving a pending application creates a student and an active enrollment', function () {
    $admin = User::factory()->create();
    $this->actingAs($admin);

    $course = Course::factory()->create();
    $application = Application::factory()->create(['course_id' => $course->id, 'email' => 'new.student@example.com']);

    $response = $this->post(route('applications.approve', $application));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $application->refresh();
    expect($application->status)->toBe(ApplicationStatus::Approved);
    expect($application->reviewed_by)->toBe($admin->id);

    $student = Student::firstWhere('email', 'new.student@example.com');
    expect($student)->not->toBeNull();

    $this->assertDatabaseHas('enrollments', [
        'student_id' => $student->id,
        'course_id' => $course->id,
        'status' => 'active',
    ]);
});

test('rejecting a pending application requires a reason', function () {
    $this->actingAs(User::factory()->create());
    $application = Application::factory()->create();

    $response = $this->post(route('applications.reject', $application), []);

    $response->assertSessionHasErrors('rejection_reason');
});

test('rejecting a pending application records the reason', function () {
    $this->actingAs(User::factory()->create());
    $application = Application::factory()->create();

    $response = $this->post(route('applications.reject', $application), [
        'rejection_reason' => 'Missing prerequisite coursework.',
    ]);

    $response->assertRedirect();
    $application->refresh();
    expect($application->status)->toBe(ApplicationStatus::Rejected);
    expect($application->rejection_reason)->toBe('Missing prerequisite coursework.');
});

test('does not allow reviewing an application twice', function () {
    $this->actingAs(User::factory()->create());
    $application = Application::factory()->approved()->create();

    $response = $this->post(route('applications.approve', $application));

    $response->assertSessionHas('error');
});

test('reuses an existing student when the same applicant reapplies for another course', function () {
    $this->actingAs(User::factory()->create());

    $existingStudent = Student::factory()->create(['email' => 'returning@example.com']);
    $newCourse = Course::factory()->create();
    $application = Application::factory()->create(['email' => 'returning@example.com', 'course_id' => $newCourse->id]);

    $this->post(route('applications.approve', $application));

    expect(Student::where('email', 'returning@example.com')->count())->toBe(1);
    $this->assertDatabaseHas('enrollments', [
        'student_id' => $existingStudent->id,
        'course_id' => $newCourse->id,
    ]);
});
