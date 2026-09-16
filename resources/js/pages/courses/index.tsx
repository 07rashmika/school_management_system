import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { DeleteButton } from '@/components/delete-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Course, Paginated } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

export default function CoursesIndex({
    courses,
    filters,
}: {
    courses: Paginated<Course>;
    filters: { search?: string };
}) {
    return (
        <AuthenticatedLayout title="Courses">
            <Head title="Courses" />

            <div className="flex flex-wrap items-center justify-between gap-4">
                <SearchForm
                    initialValue={filters.search ?? ''}
                    placeholder="Search by name or code"
                />
                <ButtonLink href={CourseController.create().url}>
                    Add Course
                </ButtonLink>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Code
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Teacher
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Credit Hours
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Enrolled
                            </th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {courses.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No courses found.
                                </td>
                            </tr>
                        )}
                        {courses.data.map((course) => (
                            <tr key={course.id}>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {course.code}
                                </td>
                                <td className="px-4 py-3">
                                    <Link
                                        href={CourseController.show(course).url}
                                        className="font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {course.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {course.teacher
                                        ? `${course.teacher.first_name} ${course.teacher.last_name}`
                                        : 'Unassigned'}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {course.credit_hours}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {course.enrollments_count ?? 0}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <ButtonLink
                                            href={
                                                CourseController.edit(course)
                                                    .url
                                            }
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Edit
                                        </ButtonLink>
                                        <DeleteButton
                                            route={CourseController.destroy(
                                                course,
                                            )}
                                            confirmMessage="Delete this course?"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {courses.from ?? 0}–{courses.to ?? 0} of{' '}
                    {courses.total}
                </p>
                <Pagination links={courses.links} />
            </div>
        </AuthenticatedLayout>
    );
}
