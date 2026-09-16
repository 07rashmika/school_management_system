<?php

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Course;

test('renders the public application form with available courses', function () {
    Course::factory()->count(2)->create();

    $response = $this->get(route('apply.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('apply/create')->has('courses', 2));
});

test('submits an application as a pending record', function () {
    $course = Course::factory()->create();

    $response = $this->post(route('apply.store'), [
        'first_name' => 'Sam',
        'last_name' => 'Rivera',
        'email' => 'sam.rivera@example.com',
        'phone' => '5551112222',
        'date_of_birth' => '2009-03-10',
        'gender' => 'other',
        'address' => '456 Oak Ave',
        'course_id' => $course->id,
    ]);

    $response->assertRedirect(route('apply.create'));
    $response->assertSessionHas('success');

    $application = Application::firstWhere('email', 'sam.rivera@example.com');
    expect($application)->not->toBeNull();
    expect($application->status)->toBe(ApplicationStatus::Pending);
});

test('requires valid input to submit an application', function () {
    $response = $this->post(route('apply.store'), []);

    $response->assertSessionHasErrors(['first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender', 'address', 'course_id']);
});

test('rejects an application for a course that does not exist', function () {
    $response = $this->post(route('apply.store'), [
        'first_name' => 'Sam',
        'last_name' => 'Rivera',
        'email' => 'sam.rivera@example.com',
        'phone' => '5551112222',
        'date_of_birth' => '2009-03-10',
        'gender' => 'other',
        'address' => '456 Oak Ave',
        'course_id' => 999,
    ]);

    $response->assertSessionHasErrors('course_id');
});
