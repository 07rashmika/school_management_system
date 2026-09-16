<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@school.test',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            TeacherSeeder::class,
            CourseSeeder::class,
            StudentSeeder::class,
            ApplicationSeeder::class,
        ]);
    }
}
