<?php

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;

test('guests are redirected to login when listing students', function () {
    $this->get(route('students.index'))->assertRedirect(route('login'));
});

test('lists students for authenticated admins', function () {
    $this->actingAs(User::factory()->create());

    Student::factory()->count(3)->create();

    $response = $this->get(route('students.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('students/index')->has('students.data', 3));
});

test('includes the computed full name for each student', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create(['first_name' => 'Amara', 'last_name' => 'Okafor']);

    $response = $this->get(route('students.show', $student));

    $response->assertInertia(fn ($page) => $page->component('students/show')->where('student.full_name', 'Amara Okafor'));
});

test('serializes the date of birth as a plain date without a time component', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create(['date_of_birth' => '2010-02-02']);

    $response = $this->get(route('students.show', $student));

    $response->assertInertia(fn ($page) => $page->component('students/show')->where('student.date_of_birth', '2010-02-02'));
});

test('filters students by search term', function () {
    $this->actingAs(User::factory()->create());

    Student::factory()->create(['first_name' => 'Amara', 'last_name' => 'Okafor']);
    Student::factory()->create(['first_name' => 'Diego', 'last_name' => 'Ramirez']);

    $response = $this->get(route('students.index', ['search' => 'Amara']));

    $response->assertInertia(fn ($page) => $page->component('students/index')
        ->has('students.data', 1)
        ->where('students.data.0.first_name', 'Amara'));
});

test('creates a student with a generated admission number', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('students.store'), [
        'first_name' => 'Jamie',
        'last_name' => 'Lee',
        'email' => 'jamie.lee@example.com',
        'phone' => '5551234567',
        'date_of_birth' => '2008-05-01',
        'gender' => 'female',
        'address' => '123 Main St',
        'status' => 'active',
    ]);

    $student = Student::firstWhere('email', 'jamie.lee@example.com');

    $response->assertRedirect(route('students.show', $student));
    expect($student->admission_number)->not->toBeEmpty();
});

test('requires valid input to create a student', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('students.store'), []);

    $response->assertSessionHasErrors(['first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender', 'address', 'status']);
});

test('updates a student', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create();

    $response = $this->put(route('students.update', $student), [
        'first_name' => 'Updated',
        'last_name' => $student->last_name,
        'email' => $student->email,
        'phone' => $student->phone,
        'date_of_birth' => $student->date_of_birth->format('Y-m-d'),
        'gender' => $student->gender,
        'address' => $student->address,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('students.show', $student));
    expect($student->refresh())
        ->first_name->toBe('Updated')
        ->status->value->toBe('inactive');
});

test('deletes a student and their enrollments', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create();
    $enrollment = Enrollment::factory()->create(['student_id' => $student->id, 'course_id' => Course::factory()]);

    $response = $this->delete(route('students.destroy', $student));

    $response->assertRedirect(route('students.index'));
    $this->assertDatabaseMissing('students', ['id' => $student->id]);
    $this->assertDatabaseMissing('enrollments', ['id' => $enrollment->id]);
});
