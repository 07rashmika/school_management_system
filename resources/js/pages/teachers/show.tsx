import CourseController from '@/actions/App/Http/Controllers/CourseController';
import TeacherController from '@/actions/App/Http/Controllers/TeacherController';
import { DeleteButton } from '@/components/delete-button';
import { StatusBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Teacher } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

export default function TeachersShow({ teacher }: { teacher: Teacher }) {
    return (
        <AuthenticatedLayout title={teacher.full_name}>
            <Head title={teacher.full_name} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {teacher.full_name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Employee #{teacher.employee_number}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={TeacherController.edit(teacher).url}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </ButtonLink>
                    <DeleteButton
                        route={TeacherController.destroy(teacher)}
                        confirmMessage="Delete this teacher? Their courses will become unassigned."
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
                                {teacher.email}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Phone
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {teacher.phone}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Qualification
                            </dt>
                            <dd className="text-right text-gray-900 dark:text-white">
                                {teacher.qualification}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Hired
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {teacher.hired_at}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Status
                            </dt>
                            <dd>
                                <StatusBadge status={teacher.status} />
                            </dd>
                        </div>
                    </dl>
                </Card>

                <Card className="p-5 lg:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Courses Taught
                    </h3>
                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {(teacher.courses ?? []).length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                                Not assigned to any courses yet.
                            </p>
                        )}
                        {(teacher.courses ?? []).map((course) => (
                            <li key={course.id} className="py-3 text-sm">
                                <Link
                                    href={CourseController.show(course).url}
                                    className="font-medium text-gray-900 hover:underline dark:text-white"
                                >
                                    {course.name}
                                </Link>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {course.code}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
