import { InputError } from '@/components/ui/input-error';
import { InputLabel } from '@/components/ui/input-label';
import { TextInput } from '@/components/ui/text-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { Form, Head } from '@inertiajs/react';

export default function Login() {
    return (
        <GuestLayout>
            <Head title="Admin Login" />

            <div className="mx-auto max-w-sm">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Admin sign in
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sign in to manage students, teachers, and applications.
                    </p>

                    <Form
                        {...AuthenticatedSessionController.store.form()}
                        resetOnSuccess={['password']}
                        className="mt-6 space-y-4"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div>
                                    <InputLabel htmlFor="email">
                                        Email
                                    </InputLabel>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? 'Signing in…' : 'Sign in'}
                                </Button>
                            </>
                        )}
                    </Form>
                </Card>
            </div>
        </GuestLayout>
    );
}
