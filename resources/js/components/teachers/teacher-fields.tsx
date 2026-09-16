import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { SelectInput } from '@/components/ui/select-input';
import { TextInput } from '@/components/ui/text-input';
import type { Teacher } from '@/types/models';

export function TeacherFields({
    teacher,
    errors,
}: {
    teacher?: Teacher;
    errors: Partial<Record<string, string>>;
}) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="first_name">First name</InputLabel>
                    <TextInput
                        id="first_name"
                        name="first_name"
                        defaultValue={teacher?.first_name}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.first_name} />
                </div>
                <div>
                    <InputLabel htmlFor="last_name">Last name</InputLabel>
                    <TextInput
                        id="last_name"
                        name="last_name"
                        defaultValue={teacher?.last_name}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.last_name} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={teacher?.email}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <TextInput
                        id="phone"
                        name="phone"
                        defaultValue={teacher?.phone}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.phone} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="qualification">Qualification</InputLabel>
                <TextInput
                    id="qualification"
                    name="qualification"
                    defaultValue={teacher?.qualification}
                    required
                    className="mt-1"
                />
                <InputError message={errors.qualification} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="hired_at">Hire date</InputLabel>
                    <TextInput
                        id="hired_at"
                        name="hired_at"
                        type="date"
                        defaultValue={teacher?.hired_at}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.hired_at} />
                </div>
                <div>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <SelectInput
                        id="status"
                        name="status"
                        defaultValue={teacher?.status ?? 'active'}
                        required
                        className="mt-1"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </SelectInput>
                    <InputError message={errors.status} />
                </div>
            </div>
        </>
    );
}
