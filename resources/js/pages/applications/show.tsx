import ApplicationController from '@/actions/App/Http/Controllers/ApplicationController';
import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Application } from '@/types/models';
import { Form, Head, Link } from '@inertiajs/react';

export default function ApplicationsShow({
    application,
}: {
    application: Application;
}) {
    const isPending = application.status === 'pending';

    return (
        <AuthenticatedLayout title={`Application: ${application.full_name}`}>
            <Head title={`Application: ${application.full_name}`} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {application.full_name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Applying for {application.course?.name}
                    </p>
                </div>
                <StatusBadge status={application.status} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="p-5 lg:col-span-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Applicant Details
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Email
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {application.email}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Phone
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {application.phone}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Date of birth
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {application.date_of_birth}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Gender
                            </dt>
                            <dd className="text-gray-900 capitalize dark:text-white">
                                {application.gender}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Address
                            </dt>
                            <dd className="text-right text-gray-900 dark:text-white">
                                {application.address}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Course
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {application.course?.code} —{' '}
                                {application.course?.name}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">
                                Submitted
                            </dt>
                            <dd className="text-gray-900 dark:text-white">
                                {new Date(
                                    application.created_at,
                                ).toLocaleString()}
                            </dd>
                        </div>
                    </dl>
                </Card>

                <div className="space-y-4 lg:col-span-2">
                    {isPending && (
                        <Card className="p-5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Review Application
                            </h3>

                            <Form
                                {...ApplicationController.approve.form(
                                    application,
                                )}
                                className="mt-4"
                            >
                                {({ processing }) => (
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Approving…'
                                            : 'Approve & Enroll Student'}
                                    </Button>
                                )}
                            </Form>

                            <Form
                                {...ApplicationController.reject.form(
                                    application,
                                )}
                                className="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800"
                            >
                                {({ errors, processing }) => (
                                    <>
                                        <div>
                                            <InputLabel htmlFor="rejection_reason">
                                                Rejection reason
                                            </InputLabel>
                                            <Textarea
                                                id="rejection_reason"
                                                name="rejection_reason"
                                                rows={3}
                                                required
                                                className="mt-1"
                                            />
                                            <InputError
                                                message={
                                                    errors.rejection_reason
                                                }
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="danger"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Rejecting…'
                                                : 'Reject Application'}
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </Card>
                    )}

                    {application.status === 'approved' &&
                        application.student && (
                            <Card className="p-5">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Outcome
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    Approved and enrolled as{' '}
                                    <Link
                                        href={
                                            StudentController.show(
                                                application.student,
                                            ).url
                                        }
                                        className="font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {application.student.full_name} (#
                                        {application.student.admission_number})
                                    </Link>
                                    .
                                </p>
                            </Card>
                        )}

                    {application.status === 'rejected' && (
                        <Card className="p-5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Outcome
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                Rejected: {application.rejection_reason}
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
