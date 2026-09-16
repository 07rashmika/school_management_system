import CourseController from '@/actions/App/Http/Controllers/CourseController';
import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { DeleteButton } from '@/components/delete-button';
import { StatusBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Course } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

export default function CoursesShow({ course }: { course: Course }) {
    return (
        <AuthenticatedLayout title={course.name}>
            <Head title={course.name} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {course.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {course.code}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={CourseController.edit(course).url}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </ButtonLink>
                    <DeleteButton
                        route={CourseController.destroy(course)}
                        confirmMessage="Delete this course?"
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
                                Credit hours
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {course.credit_hours}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Teacher
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {course.teacher
                                    ? `${course.teacher.first_name} ${course.teacher.last_name}`
                                    : 'Unassigned'}
                            </dd>
                        </div>
                        {course.description && (
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400">
                                    Description
                                </dt>
                                <dd className="mt-1 text-gray-900 dark:text-white">
                                    {course.description}
                                </dd>
                            </div>
                        )}
                    </dl>
                </Card>

                <Card className="p-5 lg:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Enrolled Students
                    </h3>
                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {(course.enrollments ?? []).length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                                No students enrolled yet.
                            </p>
                        )}
                        {(course.enrollments ?? []).map((enrollment) => (
                            <li
                                key={enrollment.id}
                                className="flex items-center justify-between py-3 text-sm"
                            >
                                <Link
                                    href={
                                        enrollment.student
                                            ? StudentController.show(
                                                  enrollment.student,
                                              ).url
                                            : '#'
                                    }
                                    className="font-medium text-gray-900 hover:underline dark:text-white"
                                >
                                    {enrollment.student?.full_name}
                                </Link>
                                <StatusBadge status={enrollment.status} />
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
