import { FlashMessages } from '@/components/flash-messages';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function GuestLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link
                        href="/apply"
                        className="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                        Sunrise High School
                    </Link>
                    <nav className="flex items-center gap-4 text-sm">
                        <Link
                            href="/apply"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            Apply for Admission
                        </Link>
                        <Link
                            href="/login"
                            className="font-medium text-gray-900 hover:underline dark:text-white"
                        >
                            Admin Login
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl space-y-4 px-4 py-10 sm:px-6">
                <FlashMessages />
                {children}
            </main>
        </div>
    );
}
