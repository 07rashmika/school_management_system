import TeacherController from '@/actions/App/Http/Controllers/TeacherController';
import { TeacherFields } from '@/components/teachers/teacher-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Form, Head } from '@inertiajs/react';

export default function TeachersCreate() {
    return (
        <AuthenticatedLayout title="Add Teacher">
            <Head title="Add Teacher" />

            <Card className="max-w-2xl p-6">
                <Form {...TeacherController.store.form()} className="space-y-4">
                    {({ errors, processing }) => (
                        <>
                            <TeacherFields errors={errors} />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Create Teacher'}
                                </Button>
                                <ButtonLink
                                    href={TeacherController.index().url}
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
