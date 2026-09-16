<?php

namespace App\Actions\Applications;

use App\Enums\ApplicationStatus;
use App\Enums\EnrollmentStatus;
use App\Enums\Status;
use App\Models\Application;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ApproveApplication
{
    /**
     * Approve the application: create or reuse the student record, enroll them
     * in the applied-for course, and mark the application as approved.
     */
    public function handle(Application $application, User $reviewer): Student
    {
        return DB::transaction(function () use ($application, $reviewer) {
            $student = Student::firstOrCreate(
                ['email' => $application->email],
                [
                    'admission_number' => Student::generateAdmissionNumber(),
                    'first_name' => $application->first_name,
                    'last_name' => $application->last_name,
                    'phone' => $application->phone,
                    'date_of_birth' => $application->date_of_birth,
                    'gender' => $application->gender,
                    'address' => $application->address,
                    'status' => Status::Active,
                ],
            );

            Enrollment::firstOrCreate(
                ['student_id' => $student->id, 'course_id' => $application->course_id],
                ['status' => EnrollmentStatus::Active, 'enrolled_at' => now()],
            );

            $application->update([
                'status' => ApplicationStatus::Approved,
                'student_id' => $student->id,
                'reviewed_by' => $reviewer->id,
                'reviewed_at' => now(),
            ]);

            return $student;
        });
    }
}
