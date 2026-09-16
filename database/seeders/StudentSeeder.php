<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::factory()
            ->count(25)
            ->create()
            ->each(function (Student $student): void {
                Course::query()
                    ->inRandomOrder()
                    ->take(fake()->numberBetween(1, 3))
                    ->pluck('id')
                    ->each(fn (int $courseId) => Enrollment::factory()->create([
                        'student_id' => $student->id,
                        'course_id' => $courseId,
                    ]));
            });
    }
}
