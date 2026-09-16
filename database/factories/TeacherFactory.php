<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_number' => 'TCH'.fake()->unique()->numerify('#####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('##########'),
            'qualification' => fake()->randomElement([
                'B.Ed. in Education',
                'M.A. in Mathematics',
                'M.Sc. in Physics',
                'Ph.D. in Chemistry',
                'M.A. in English Literature',
                'B.Sc. in Computer Science',
            ]),
            'hired_at' => fake()->dateTimeBetween('-10 years', '-1 month')->format('Y-m-d'),
            'status' => Status::Active,
        ];
    }
}
