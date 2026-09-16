import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { StudentFields } from '@/components/students/student-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Form, Head } from '@inertiajs/react';

export default function StudentsCreate() {
    return (
        <AuthenticatedLayout title="Add Student">
            <Head title="Add Student" />

            <Card className="max-w-2xl p-6">
                <Form {...StudentController.store.form()} className="space-y-4">
                    {({ errors, processing }) => (
                        <>
                            <StudentFields errors={errors} />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Create Student'}
                                </Button>
                                <ButtonLink
                                    href={StudentController.index().url}
                                    variant="secondary"
                                >
                                    Cancel
                                </ButtonLink>
                            </div>
                        </>
                    )}
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
}
