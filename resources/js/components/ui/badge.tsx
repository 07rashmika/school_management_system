import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const colorClasses = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
} as const;

export function Badge({ color = 'gray', children }: { color?: keyof typeof colorClasses; children: ReactNode }) {
    return (
        <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-xs font-medium', colorClasses[color])}>
            {children}
        </span>
    );
}

const statusColors: Record<string, keyof typeof colorClasses> = {
    active: 'green',
    inactive: 'gray',
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
    completed: 'blue',
    withdrawn: 'gray',
};

export function StatusBadge({ status }: { status: string }) {
    return (
        <Badge color={statusColors[status] ?? 'gray'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}
