<?php

use App\Models\Application;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;

test('guests are redirected to login when viewing the dashboard', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('shows summary statistics to authenticated admins', function () {
    $this->actingAs(User::factory()->create());

    Student::factory()->count(2)->create();
    $teacher = Teacher::factory()->create();
    $courses = Course::factory()->count(3)->create(['teacher_id' => $teacher->id]);
    Application::factory()->create(['course_id' => $courses->first()->id]);
    Application::factory()->rejected()->create(['course_id' => $courses->first()->id]);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('dashboard')
        ->where('stats.total_students', 2)
        ->where('stats.total_teachers', 1)
        ->where('stats.total_courses', 3)
        ->where('stats.pending_applications', 1)
        ->where('stats.rejected_applications', 1));
});
