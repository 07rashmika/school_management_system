import { FlashMessages } from '@/components/flash-messages';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Students', href: '/students' },
    { name: 'Teachers', href: '/teachers' },
    { name: 'Courses', href: '/courses' },
    { name: 'Applications', href: '/applications' },
];

export default function AuthenticatedLayout({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;
    const [mobileOpen, setMobileOpen] = useState(false);

    function isActive(href: string) {
        return currentUrl === href || currentUrl.startsWith(`${href}/`);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="flex">
                <aside
                    className={cn(
                        'fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 dark:border-gray-800 dark:bg-gray-900',
                        mobileOpen ? 'translate-x-0' : '-translate-x-full',
                    )}
                >
                    <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Sunrise High
                        </span>
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                    isActive(item.href)
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {mobileOpen && (
                    <button
                        type="button"
                        aria-label="Close navigation"
                        className="fixed inset-0 z-30 bg-black/30 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
                    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open navigation"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                                    />
                                </svg>
                            </button>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="hidden text-sm text-gray-600 sm:inline dark:text-gray-400">
                                {auth.user.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                Log out
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 space-y-4 p-4 sm:p-6">
                        <FlashMessages />
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
