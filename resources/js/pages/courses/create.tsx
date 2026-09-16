import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { CourseFields } from '@/components/courses/course-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Teacher } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function CoursesCreate({
    teachers,
}: {
    teachers: Pick<Teacher, 'id' | 'first_name' | 'last_name'>[];
}) {
    return (
        <AuthenticatedLayout title="Add Course">
            <Head title="Add Course" />

            <Card className="max-w-2xl p-6">
                <Form {...CourseController.store.form()} className="space-y-4">
                    {({ errors, processing }) => (
                        <>
                            <CourseFields teachers={teachers} errors={errors} />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Create Course'}
                                </Button>
                                <ButtonLink
                                    href={CourseController.index().url}
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
