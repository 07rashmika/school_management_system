import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { SelectInput } from '@/components/ui/select-input';
import { Textarea } from '@/components/ui/textarea';
import { TextInput } from '@/components/ui/text-input';
import type { Student } from '@/types/models';

export function StudentFields({
    student,
    errors,
}: {
    student?: Student;
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
                        defaultValue={student?.first_name}
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
                        defaultValue={student?.last_name}
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
                        defaultValue={student?.email}
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
                        defaultValue={student?.phone}
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
                        defaultValue={student?.date_of_birth}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.date_of_birth} />
                </div>
                <div>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <SelectInput
                        id="gender"
                        name="gender"
                        defaultValue={student?.gender ?? ''}
                        required
                        className="mt-1"
                    >
                        <option value="" disabled>
                            Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </SelectInput>
                    <InputError message={errors.gender} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Textarea
                    id="address"
                    name="address"
                    defaultValue={student?.address}
                    required
                    rows={2}
                    className="mt-1"
                />
                <InputError message={errors.address} />
            </div>

            <div>
                <InputLabel htmlFor="status">Status</InputLabel>
                <SelectInput
                    id="status"
                    name="status"
                    defaultValue={student?.status ?? 'active'}
                    required
                    className="mt-1"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </SelectInput>
                <InputError message={errors.status} />
            </div>
        </>
    );
}
