import ApplyController from '@/actions/App/Http/Controllers/ApplyController';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { SelectInput } from '@/components/ui/select-input';
import { Textarea } from '@/components/ui/textarea';
import { TextInput } from '@/components/ui/text-input';
import GuestLayout from '@/layouts/guest-layout';
import type { Course } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function ApplyCreate({ courses }: { courses: Course[] }) {
    return (
        <GuestLayout>
            <Head title="Apply for Admission" />

            <div className="mx-auto max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Apply for Admission
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill out the form below to apply. Our admissions team will
                    review your application and get back to you.
                </p>

                <Card className="mt-6 p-6">
                    <Form
                        {...ApplyController.store.form()}
                        resetOnSuccess
                        className="space-y-4"
                    >
                        {({ errors, processing, wasSuccessful }) => (
                            <>
                                {wasSuccessful && (
                                    <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Your application has been submitted
                                        successfully.
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="first_name">
                                            First name
                                        </InputLabel>
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            required
                                            className="mt-1"
                                        />
                                        <InputError
                                            message={errors.first_name}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="last_name">
                                            Last name
                                        </InputLabel>
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            required
                                            className="mt-1"
                                        />
                                        <InputError
                                            message={errors.last_name}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="email">
                                            Email
                                        </InputLabel>
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="mt-1"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="phone">
                                            Phone
                                        </InputLabel>
                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            required
                                            className="mt-1"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="date_of_birth">
                                            Date of birth
                                        </InputLabel>
                                        <TextInput
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            required
                                            className="mt-1"
                                        />
                                        <InputError
                                            message={errors.date_of_birth}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="gender">
                                            Gender
                                        </InputLabel>
                                        <SelectInput
                                            id="gender"
                                            name="gender"
                                            required
                                            defaultValue=""
                                            className="mt-1"
                                        >
                                            <option value="" disabled>
                                                Select gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                            <option value="other">Other</option>
                                        </SelectInput>
                                        <InputError message={errors.gender} />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="address">
                                        Address
                                    </InputLabel>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        required
                                        rows={2}
                                        className="mt-1"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="course_id">
                                        Course applying for
                                    </InputLabel>
                                    <SelectInput
                                        id="course_id"
                                        name="course_id"
                                        required
                                        defaultValue=""
                                        className="mt-1"
                                    >
                                        <option value="" disabled>
                                            Select a course
                                        </option>
                                        {courses.map((course) => (
                                            <option
                                                key={course.id}
                                                value={course.id}
                                            >
                                                {course.code} — {course.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.course_id} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing
                                        ? 'Submitting…'
                                        : 'Submit Application'}
                                </Button>
                            </>
                        )}
                    </Form>
                </Card>
            </div>
        </GuestLayout>
    );
}
