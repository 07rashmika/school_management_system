import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import ApplicationController from '@/actions/App/Http/Controllers/ApplicationController';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Application, Course } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

type Stats = {
    total_students: number;
    total_teachers: number;
    total_courses: number;
    pending_applications: number;
    approved_applications: number;
    rejected_applications: number;
};

const statTiles: { key: keyof Stats; label: string; href: string }[] = [
    { key: 'total_students', label: 'Students', href: '/students' },
    { key: 'total_teachers', label: 'Teachers', href: '/teachers' },
    { key: 'total_courses', label: 'Courses', href: '/courses' },
    {
        key: 'pending_applications',
        label: 'Pending Applications',
        href: '/applications?status=pending',
    },
    {
        key: 'approved_applications',
        label: 'Approved Applications',
        href: '/applications?status=approved',
    },
    {
        key: 'rejected_applications',
        label: 'Rejected Applications',
        href: '/applications?status=rejected',
    },
];

export default function Dashboard({
    stats,
    recentApplications,
    topCourses,
}: {
    stats: Stats;
    recentApplications: Application[];
    topCourses: (Course & { enrollments_count: number })[];
}) {
    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statTiles.map((tile) => (
                    <Link key={tile.key} href={tile.href}>
                        <Card className="p-5 transition hover:shadow-md">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {tile.label}
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                                {stats[tile.key]}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Recent Applications
                    </h3>
                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {recentApplications.length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                                No applications yet.
                            </p>
                        )}
                        {recentApplications.map((application) => (
                            <li
                                key={application.id}
                                className="flex items-center justify-between py-3"
                            >
                                <Link
                                    href={
                                        ApplicationController.show(application)
                                            .url
                                    }
                                    className="text-sm"
                                >
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {application.full_name}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {application.course?.name}
                                    </p>
                                </Link>
                                <StatusBadge status={application.status} />
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Top Courses by Enrollment
                    </h3>
                    <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {topCourses.length === 0 && (
                            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
                                No courses yet.
                            </p>
                        )}
                        {topCourses.map((course) => (
                            <li
                                key={course.id}
                                className="flex items-center justify-between py-3 text-sm"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {course.name}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {course.code}
                                    </p>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {course.enrollments_count} enrolled
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
