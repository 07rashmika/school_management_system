import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { DeleteButton } from '@/components/delete-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { StatusBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Paginated, Student } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

export default function StudentsIndex({
    students,
    filters,
}: {
    students: Paginated<Student>;
    filters: { search?: string };
}) {
    return (
        <AuthenticatedLayout title="Students">
            <Head title="Students" />

            <div className="flex flex-wrap items-center justify-between gap-4">
                <SearchForm
                    initialValue={filters.search ?? ''}
                    placeholder="Search by name, email, or admission #"
                />
                <ButtonLink href={StudentController.create().url}>
                    Add Student
                </ButtonLink>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Admission #
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
                        {students.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No students found.
                                </td>
                            </tr>
                        )}
                        {students.data.map((student) => (
                            <tr key={student.id}>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {student.admission_number}
                                </td>
                                <td className="px-4 py-3">
                                    <Link
                                        href={
                                            StudentController.show(student).url
                                        }
                                        className="font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {student.full_name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {student.email}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {student.enrollments_count ?? 0}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={student.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <ButtonLink
                                            href={
                                                StudentController.edit(student)
                                                    .url
                                            }
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Edit
                                        </ButtonLink>
                                        <DeleteButton
                                            route={StudentController.destroy(
                                                student,
                                            )}
                                            confirmMessage="Delete this student and all their enrollments?"
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
                    Showing {students.from ?? 0}–{students.to ?? 0} of{' '}
                    {students.total}
                </p>
                <Pagination links={students.links} />
            </div>
        </AuthenticatedLayout>
    );
}
