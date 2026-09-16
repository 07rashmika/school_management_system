import EnrollmentController from '@/actions/App/Http/Controllers/EnrollmentController';
import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { DeleteButton } from '@/components/delete-button';
import { StatusBadge } from '@/components/ui/badge';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SelectInput } from '@/components/ui/select-input';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Course, Student } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function StudentsShow({
    student,
    availableCourses,
}: {
    student: Student;
    availableCourses: Course[];
}) {
    return (
        <AuthenticatedLayout title={student.full_name}>
            <Head title={student.full_name} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {student.full_name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Admission #{student.admission_number}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={StudentController.edit(student).url}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </ButtonLink>
                    <DeleteButton
                        route={StudentController.destroy(student)}
                        confirmMessage="Delete this student and all their enrollments?"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="p-5 lg:col-span-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Details
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Email
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {student.email}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Phone
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {student.phone}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Date of birth
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {student.date_of_birth}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Gender
                            </dt>
                            <dd className="text-gray-900 capitalize dark:text-white">
                                {student.gender}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Address
                            </dt>
                            <dd className="text-right text-gray-900 dark:text-white">
                                {student.address}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Status
                            </dt>
                            <dd>
                                <StatusBadge status={student.status} />
                            </dd>
                        </div>
                    </dl>
                </Card>

                <Card className="p-5 lg:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Enrolled Courses
                    </h3>

                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {(student.enrollments ?? []).length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                                Not enrolled in any courses yet.
                            </p>
                        )}
                        {(student.enrollments ?? []).map((enrollment) => (
                            <li
                                key={enrollment.id}
                                className="flex items-center justify-between py-3 text-sm"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {enrollment.course?.name}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {enrollment.course?.code} · Enrolled{' '}
                                        {enrollment.enrolled_at}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={enrollment.status} />
                                    <DeleteButton
                                        route={EnrollmentController.destroy(
                                            enrollment,
                                        )}
                                        confirmMessage="Withdraw this student from the course?"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>

                    {availableCourses.length > 0 && (
                        <Form
                            {...EnrollmentController.store.form(student)}
                            resetOnSuccess
                            className="mt-4 flex items-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-800"
                        >
                            {({ processing }) => (
                                <>
                                    <div className="flex-1">
                                        <SelectInput
                                            name="course_id"
                                            required
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Enroll in a course…
                                            </option>
                                            {availableCourses.map((course) => (
                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.code} —{' '}
                                                    {course.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        size="sm"
                                    >
                                        Enroll
                                    </Button>
                                </>
                            )}
                        </Form>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
