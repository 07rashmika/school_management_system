import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { CourseFields } from '@/components/courses/course-fields';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import type { Course, Teacher } from '@/types/models';
import { Form, Head } from '@inertiajs/react';

export default function CoursesEdit({
    course,
    teachers,
}: {
    course: Course;
    teachers: Pick<Teacher, 'id' | 'first_name' | 'last_name'>[];
}) {
    return (
        <AuthenticatedLayout title={`Edit ${course.name}`}>
            <Head title={`Edit ${course.name}`} />

            <Card className="max-w-2xl p-6">
                <Form
                    {...CourseController.update.form(course)}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <CourseFields
                                course={course}
                                teachers={teachers}
                                errors={errors}
                            />

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save Changes'}
                                </Button>
                                <ButtonLink
                                    href={CourseController.show(course).url}
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
