import TeacherController from '@/actions/App/Http/Controllers/TeacherController';
import { TeacherFields } from '@/components/teachers/teacher-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Teacher } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function TeachersEdit({ teacher }: { teacher: Teacher }) {
    return (
        <AuthenticatedLayout title={`Edit ${teacher.full_name}`}>
            <Head title={`Edit ${teacher.full_name}`} />

            <Card className="max-w-2xl p-6">
                <Form
                    {...TeacherController.update.form(teacher)}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <TeacherFields teacher={teacher} errors={errors} />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save Changes'}
                                </Button>
                                <ButtonLink
                                    href={TeacherController.show(teacher).url}
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
