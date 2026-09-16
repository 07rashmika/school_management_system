import TeacherController from '@/actions/App/Http/Controllers/TeacherController';
import { DeleteButton } from '@/components/delete-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { StatusBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Paginated, Teacher } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

export default function TeachersIndex({
    teachers,
    filters,
}: {
    teachers: Paginated<Teacher>;
    filters: { search?: string };
}) {
    return (
        <AuthenticatedLayout title="Teachers">
            <Head title="Teachers" />

            <div className="flex flex-wrap items-center justify-between gap-4">
                <SearchForm
                    initialValue={filters.search ?? ''}
                    placeholder="Search by name, email, or employee #"
                />
                <ButtonLink href={TeacherController.create().url}>
                    Add Teacher
                </ButtonLink>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Employee #
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Courses
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {teachers.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No teachers found.
                                </td>
                            </tr>
                        )}
                        {teachers.data.map((teacher) => (
                            <tr key={teacher.id}>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {teacher.employee_number}
                                </td>
                                <td className="px-4 py-3">
                                    <Link
                                        href={
                                            TeacherController.show(teacher).url
                                        }
                                        className="font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {teacher.full_name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {teacher.email}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {teacher.courses_count ?? 0}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={teacher.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <ButtonLink
                                            href={
                                                TeacherController.edit(teacher)
                                                    .url
                                            }
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Edit
                                        </ButtonLink>
                                        <DeleteButton
                                            route={TeacherController.destroy(
                                                teacher,
                                            )}
                                            confirmMessage="Delete this teacher? Their courses will become unassigned."
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
                    Showing {teachers.from ?? 0}–{teachers.to ?? 0} of{' '}
                    {teachers.total}
                </p>
                <Pagination links={teachers.links} />
            </div>
        </AuthenticatedLayout>
    );
}
