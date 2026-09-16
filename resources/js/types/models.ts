export type Status = 'active' | 'inactive';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type EnrollmentStatus = 'active' | 'completed' | 'withdrawn';

export type Gender = 'male' | 'female' | 'other';

export type Teacher = {
    id: number;
    employee_number: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    qualification: string;
    hired_at: string;
    status: Status;
    courses_count?: number;
    courses?: Course[];
    created_at: string;
    updated_at: string;
};

export type Course = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    credit_hours: number;
    teacher_id: number | null;
    teacher?: Teacher | null;
    enrollments?: Enrollment[];
    enrollments_count?: number;
    created_at: string;
    updated_at: string;
};

export type Student = {
    id: number;
    admission_number: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: Gender;
    address: string;
    status: Status;
    enrollments?: Enrollment[];
    enrollments_count?: number;
    created_at: string;
    updated_at: string;
};

export type Enrollment = {
    id: number;
    student_id: number;
    course_id: number;
    status: EnrollmentStatus;
    enrolled_at: string;
    student?: Student;
    course?: Course;
    created_at: string;
    updated_at: string;
};

export type Application = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: Gender;
    address: string;
    course_id: number;
    course?: Course;
    status: ApplicationStatus;
    rejection_reason: string | null;
    student_id: number | null;
    student?: Student | null;
    reviewed_by: number | null;
    reviewer?: { id: number; name: string } | null;
    reviewed_at: string | null;
    created_at: string;
    updated_at: string;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};
