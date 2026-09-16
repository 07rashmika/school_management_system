<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->bothify('???###'),
            'name' => fake()->randomElement([
                'Introduction to Programming',
                'Calculus I',
                'World History',
                'English Composition',
                'General Chemistry',
                'Physics for Engineers',
                'Microeconomics',
                'Introduction to Psychology',
                'Database Systems',
                'Statistics',
            ]),
            'description' => fake()->paragraph(),
            'credit_hours' => fake()->numberBetween(1, 6),
            'teacher_id' => Teacher::factory(),
        ];
    }

    public function withoutTeacher(): static
    {
        return $this->state(['teacher_id' => null]);
    }
}
