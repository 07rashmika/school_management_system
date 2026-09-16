import StudentController from '@/actions/App/Http/Controllers/StudentController';
import { StudentFields } from '@/components/students/student-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Student } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function StudentsEdit({ student }: { student: Student }) {
    return (
        <AuthenticatedLayout title={`Edit ${student.full_name}`}>
            <Head title={`Edit ${student.full_name}`} />

            <Card className="max-w-2xl p-6">
                <Form
                    {...StudentController.update.form(student)}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <StudentFields student={student} errors={errors} />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save Changes'}
                                </Button>
                                <ButtonLink
                                    href={StudentController.show(student).url}
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
