import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { SelectInput } from '@/components/ui/select-input';
import { Textarea } from '@/components/ui/textarea';
import { TextInput } from '@/components/ui/text-input';
import type { Course, Teacher } from '@/types/models';

export function CourseFields({
    course,
    teachers,
    errors,
}: {
    course?: Course;
    teachers: Pick<Teacher, 'id' | 'first_name' | 'last_name'>[];
    errors: Partial<Record<string, string>>;
}) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="code">Course code</InputLabel>
                    <TextInput
                        id="code"
                        name="code"
                        defaultValue={course?.code}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.code} />
                </div>
                <div>
                    <InputLabel htmlFor="credit_hours">Credit hours</InputLabel>
                    <TextInput
                        id="credit_hours"
                        name="credit_hours"
                        type="number"
                        min={1}
                        max={12}
                        defaultValue={course?.credit_hours}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.credit_hours} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="name">Course name</InputLabel>
                <TextInput
                    id="name"
                    name="name"
                    defaultValue={course?.name}
                    required
                    className="mt-1"
                />
                <InputError message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={course?.description ?? ''}
                    rows={3}
                    className="mt-1"
                />
                <InputError message={errors.description} />
            </div>

            <div>
                <InputLabel htmlFor="teacher_id">Assigned teacher</InputLabel>
                <SelectInput
                    id="teacher_id"
                    name="teacher_id"
                    defaultValue={course?.teacher_id ?? ''}
                    className="mt-1"
                >
                    <option value="">Unassigned</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.first_name} {teacher.last_name}
                        </option>
                    ))}
                </SelectInput>
                <InputError message={errors.teacher_id} />
            </div>
        </>
    );
}
