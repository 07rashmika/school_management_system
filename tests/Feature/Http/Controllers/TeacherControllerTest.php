<?php

use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;

test('guests are redirected to login when listing teachers', function () {
    $this->get(route('teachers.index'))->assertRedirect(route('login'));
});

test('lists teachers for authenticated admins', function () {
    $this->actingAs(User::factory()->create());

    Teacher::factory()->count(2)->create();

    $response = $this->get(route('teachers.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('teachers/index')->has('teachers.data', 2));
});

test('includes the computed full name for each teacher', function () {
    $this->actingAs(User::factory()->create());

    $teacher = Teacher::factory()->create(['first_name' => 'Priya', 'last_name' => 'Nair']);

    $response = $this->get(route('teachers.show', $teacher));

    $response->assertInertia(fn ($page) => $page->component('teachers/show')->where('teacher.full_name', 'Priya Nair'));
});

test('serializes the hire date as a plain date without a time component', function () {
    $this->actingAs(User::factory()->create());

    $teacher = Teacher::factory()->create(['hired_at' => '2020-01-15']);

    $response = $this->get(route('teachers.show', $teacher));

    $response->assertInertia(fn ($page) => $page->component('teachers/show')->where('teacher.hired_at', '2020-01-15'));
});

test('creates a teacher with a generated employee number', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('teachers.store'), [
        'first_name' => 'Priya',
        'last_name' => 'Nair',
        'email' => 'priya.nair@example.com',
        'phone' => '5559876543',
        'qualification' => 'M.Sc. in Biology',
        'hired_at' => '2020-01-15',
        'status' => 'active',
    ]);

    $teacher = Teacher::firstWhere('email', 'priya.nair@example.com');

    $response->assertRedirect(route('teachers.show', $teacher));
    expect($teacher->employee_number)->not->toBeEmpty();
});

test('requires valid input to create a teacher', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('teachers.store'), []);

    $response->assertSessionHasErrors(['first_name', 'last_name', 'email', 'phone', 'qualification', 'hired_at', 'status']);
});

test('unassigns courses when a teacher is deleted', function () {
    $this->actingAs(User::factory()->create());

    $teacher = Teacher::factory()->create();
    $course = Course::factory()->create(['teacher_id' => $teacher->id]);

    $response = $this->delete(route('teachers.destroy', $teacher));

    $response->assertRedirect(route('teachers.index'));
    $this->assertDatabaseMissing('teachers', ['id' => $teacher->id]);
    expect($course->refresh()->teacher_id)->toBeNull();
});
