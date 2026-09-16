<?php

namespace Database\Seeders;

use App\Actions\Applications\ApproveApplication;
use App\Models\Application;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseIds = Course::pluck('id');
        $admin = User::first();

        Application::factory()
            ->count(8)
            ->create(fn (): array => ['course_id' => $courseIds->random()]);

        Application::factory()
            ->rejected()
            ->count(4)
            ->create(fn (): array => [
                'course_id' => $courseIds->random(),
                'reviewed_by' => $admin->id,
                'reviewed_at' => now()->subDays(fake()->numberBetween(1, 20)),
            ]);

        Application::factory()
            ->count(5)
            ->create(fn (): array => ['course_id' => $courseIds->random()])
            ->each(fn (Application $application) => (new ApproveApplication)->handle($application, $admin));
    }
}
