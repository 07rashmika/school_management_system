<?php

use App\Models\Application;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;

test('guests are redirected to login when listing courses', function () {
    $this->get(route('courses.index'))->assertRedirect(route('login'));
});

test('lists courses with their teacher and enrollment count', function () {
    $this->actingAs(User::factory()->create());

    $course = Course::factory()->create();
    Enrollment::factory()->create(['course_id' => $course->id, 'student_id' => Student::factory()]);

    $response = $this->get(route('courses.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('courses/index')
        ->has('courses.data', 1)
        ->where('courses.data.0.enrollments_count', 1));
});

test('creates a course', function () {
    $this->actingAs(User::factory()->create());
    $teacher = Teacher::factory()->create();

    $response = $this->post(route('courses.store'), [
        'code' => 'CS101',
        'name' => 'Intro to Computer Science',
        'description' => 'Foundational course.',
        'credit_hours' => 3,
        'teacher_id' => $teacher->id,
    ]);

    $course = Course::firstWhere('code', 'CS101');

    $response->assertRedirect(route('courses.show', $course));
    expect($course->teacher_id)->toBe($teacher->id);
});

test('rejects a duplicate course code', function () {
    $this->actingAs(User::factory()->create());
    Course::factory()->create(['code' => 'CS101']);

    $response = $this->post(route('courses.store'), [
        'code' => 'CS101',
        'name' => 'Another Course',
        'credit_hours' => 3,
    ]);

    $response->assertSessionHasErrors('code');
});

test('prevents deleting a course that has enrollments', function () {
    $this->actingAs(User::factory()->create());

    $course = Course::factory()->create();
    Enrollment::factory()->create(['course_id' => $course->id, 'student_id' => Student::factory()]);

    $response = $this->delete(route('courses.destroy', $course));

    $response->assertRedirect();
    $response->assertSessionHas('error');
    $this->assertDatabaseHas('courses', ['id' => $course->id]);
});

test('prevents deleting a course that has applications', function () {
    $this->actingAs(User::factory()->create());

    $course = Course::factory()->create();
    Application::factory()->create(['course_id' => $course->id]);

    $response = $this->delete(route('courses.destroy', $course));

    $response->assertSessionHas('error');
    $this->assertDatabaseHas('courses', ['id' => $course->id]);
});

test('deletes a course with no enrollments or applications', function () {
    $this->actingAs(User::factory()->create());

    $course = Course::factory()->create();

    $response = $this->delete(route('courses.destroy', $course));

    $response->assertRedirect(route('courses.index'));
    $this->assertDatabaseMissing('courses', ['id' => $course->id]);
});
