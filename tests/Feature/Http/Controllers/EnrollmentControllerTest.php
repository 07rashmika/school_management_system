<?php

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;

test('enrolls a student in an additional course', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create();
    $course = Course::factory()->create();

    $response = $this->post(route('students.enrollments.store', $student), [
        'course_id' => $course->id,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('enrollments', [
        'student_id' => $student->id,
        'course_id' => $course->id,
        'status' => 'active',
    ]);
});

test('prevents enrolling a student in the same course twice', function () {
    $this->actingAs(User::factory()->create());

    $student = Student::factory()->create();
    $course = Course::factory()->create();
    Enrollment::factory()->create(['student_id' => $student->id, 'course_id' => $course->id]);

    $response = $this->post(route('students.enrollments.store', $student), [
        'course_id' => $course->id,
    ]);

    $response->assertSessionHasErrors('course_id');
});

test('withdraws a student from a course', function () {
    $this->actingAs(User::factory()->create());

    $enrollment = Enrollment::factory()->create();

    $response = $this->delete(route('enrollments.destroy', $enrollment));

    $response->assertRedirect();
    $this->assertDatabaseMissing('enrollments', ['id' => $enrollment->id]);
});
