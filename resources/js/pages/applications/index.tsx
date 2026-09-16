import ApplicationController from '@/actions/App/Http/Controllers/ApplicationController';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { StatusBadge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SelectInput } from '@/components/ui/select-input';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Application, Paginated } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';

export default function ApplicationsIndex({
    applications,
    filters,
}: {
    applications: Paginated<Application>;
    filters: { search?: string; status?: string };
}) {
    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        router.get(
            '/applications',
            {
                ...filters,
                status: e.target.value || undefined,
                page: undefined,
            },
            { preserveState: true, replace: true },
        );
    }

    return (
        <AuthenticatedLayout title="Applications">
            <Head title="Applications" />

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <SearchForm
                        initialValue={filters.search ?? ''}
                        placeholder="Search applicants"
                    />
                    <SelectInput
                        value={filters.status ?? ''}
                        onChange={handleStatusChange}
                        className="max-w-[10rem]"
                    >
                        <option value="">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </SelectInput>
                </div>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Applicant
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Course
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Submitted
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {applications.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No applications found.
                                </td>
                            </tr>
                        )}
                        {applications.data.map((application) => (
                            <tr key={application.id}>
                                <td className="px-4 py-3">
                                    <Link
                                        href={
                                            ApplicationController.show(
                                                application,
                                            ).url
                                        }
                                        className="font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {application.full_name}
                                    </Link>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {application.email}
                                    </p>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {application.course?.name}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {new Date(
                                        application.created_at,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={application.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <Link
                                        href={
                                            ApplicationController.show(
                                                application,
                                            ).url
                                        }
                                        className="text-sm font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        Review
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {applications.from ?? 0}–{applications.to ?? 0} of{' '}
                    {applications.total}
                </p>
                <Pagination links={applications.links} />
            </div>
        </AuthenticatedLayout>
    );
}
