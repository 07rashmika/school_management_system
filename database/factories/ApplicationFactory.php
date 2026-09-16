<?php

namespace Database\Factories;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('##########'),
            'date_of_birth' => fake()->dateTimeBetween('-19 years', '-10 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'address' => fake()->address(),
            'course_id' => Course::factory(),
            'status' => ApplicationStatus::Pending,
        ];
    }

    public function approved(): static
    {
        return $this->state(['status' => ApplicationStatus::Approved]);
    }

    public function rejected(): static
    {
        return $this->state([
            'status' => ApplicationStatus::Rejected,
            'rejection_reason' => fake()->sentence(),
        ]);
    }
}
