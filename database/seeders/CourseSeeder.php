<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacherIds = Teacher::pluck('id');

        Course::factory()
            ->count(12)
            ->create(fn (): array => ['teacher_id' => $teacherIds->random()]);
    }
}
